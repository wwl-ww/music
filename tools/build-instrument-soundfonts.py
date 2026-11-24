"""Pack sampled guitars and bowed strings into the project's two SF3 banks.

The input directory contains the extracted Meta guitar releases under steel/ and
nylon/, the small FreePats clean electric release under clean/, and the VSCO
WAV folders under strings/. Only preset 0 is read from piano-and-strings.sf3.
The score player can use the output directly with alphaTab's SoundFont loader.
"""

import argparse
from collections import defaultdict
from io import BytesIO
from pathlib import Path
import math
import re
import struct

import numpy as np
from scipy import signal
import soundfile as sf


SAMPLE_RATE = 32000
FORMATS = {
    b'phdr': '<20sHHHIII', b'pbag': '<HH', b'pmod': '<HHhHH',
    b'pgen': '<HH', b'inst': '<20sH', b'ibag': '<HH',
    b'imod': '<HHhHH', b'igen': '<HH', b'shdr': '<20sIIIIIBbHH',
}
GUITAR_ROOTS = {40, 41, 43, 45, 48, 50, 53, 55, 57, 59, 60, 64, 65, 67, 70, 73, 77, 81, 84}
PITCH_CLASS = dict(zip('CDEFGAB', (0, 2, 4, 5, 7, 9, 11)))


def chunks(data):
    offset = 0
    while offset < len(data):
        tag, size = struct.unpack_from('<4sI', data, offset)
        yield tag, data[offset + 8:offset + 8 + size]
        offset += 8 + size + size % 2


def unpack_bank(path):
    raw = path.read_bytes()
    if raw[:4] != b'RIFF' or raw[8:12] != b'sfbk':
        raise ValueError(f'Invalid SoundFont: {path}')
    lists = {data[:4]: dict(chunks(data[4:])) for tag, data in chunks(raw[12:]) if tag == b'LIST'}
    tables = {tag: list(struct.iter_unpack(fmt, lists[b'pdta'][tag])) for tag, fmt in FORMATS.items()}
    return lists[b'INFO'], lists[b'sdta'][b'smpl'], tables


def chunk(tag, data):
    return tag + struct.pack('<I', len(data)) + data + b'\0' * (len(data) % 2)


def write_bank(path, title, info, samples, tables):
    info = dict(info)
    info[b'INAM'] = title.encode('ascii') + b'\0'
    notice = (
        b'Modified for the music project: Kawai piano, Meta acoustic guitars, '
        b'FreePats FSBS electric guitar and Versilian Studios VSCO 2 CE bowed strings. '
        b'An ensemble bank includes the remaining Sonic Network SONiVOX presets.\0'
    )
    info[b'ICMT'] = notice
    data = b''.join(chunk(tag, b''.join(struct.pack(fmt, *row) for row in tables[tag])) for tag, fmt in FORMATS.items())
    # alphaTab expects an even smpl size inside sdta. Keep the padding outside
    # the individual sample headers, but inside the declared chunk size.
    samples += b'\0' * (len(samples) % 2)
    contents = (
        chunk(b'LIST', b'INFO' + b''.join(chunk(tag, value) for tag, value in info.items()))
        + chunk(b'LIST', b'sdta' + chunk(b'smpl', samples))
        + chunk(b'LIST', b'pdta' + data)
    )
    path.write_bytes(chunk(b'RIFF', b'sfbk' + contents))


def add_offset(row, **offsets):
    values = list(row)
    for index, offset in offsets.items():
        values[int(index[1:])] += offset
    return tuple(values)


def timecents(seconds):
    return round(1200 * math.log2(seconds)) & 0xffff


def packed_range(low, high):
    return low + 256 * high


def key_number(name, accidental, octave):
    return (int(octave) + 1) * 12 + PITCH_CLASS[name] + bool(accidental)


def unpack_samples(path):
    original, rate = sf.read(path, always_2d=True, dtype='float32')
    samples = original.mean(axis=1)
    divisor = math.gcd(rate, SAMPLE_RATE)
    return signal.resample_poly(samples, SAMPLE_RATE // divisor, rate // divisor)


def snip_attack(samples, lead_seconds):
    scan = samples[:SAMPLE_RATE]
    maximum = np.max(np.abs(scan))
    onset = np.flatnonzero(np.abs(scan) > 0.055 * maximum)[0]
    return samples[max(0, onset - round(SAMPLE_RATE * lead_seconds)):]


def encode_sample(samples):
    destination = BytesIO()
    sf.write(destination, samples, SAMPLE_RATE, format='OGG', subtype='VORBIS')
    return destination.getvalue()


def guitar_sample(path, level, amp=None):
    samples = snip_attack(unpack_samples(path), 0.002)[:round(2.65 * SAMPLE_RATE)]
    if amp:
        highpass = signal.butter(2, 100, 'highpass', fs=SAMPLE_RATE, output='sos')
        samples = signal.sosfilt(highpass, samples)
        samples = np.tanh(samples * (3.5 if amp == 'overdrive' else 9))
        speaker = signal.butter(2, 3600 if amp == 'overdrive' else 2950, fs=SAMPLE_RATE, output='sos')
        samples = signal.sosfilt(speaker, samples)
    samples *= level / max(0.015, np.max(np.abs(samples)))
    samples[:32] *= np.linspace(0, 1, 32)
    tail = min(len(samples) // 4, round(0.18 * SAMPLE_RATE))
    samples[-tail:] *= np.linspace(1, 0, tail)
    return encode_sample(samples)


def bow_sample(path, key, level):
    samples = snip_attack(unpack_samples(path), 0.018)
    samples = samples[:round(2.8 * SAMPLE_RATE)].copy()
    # Check and correct small tuning offsets over the sustain, using the
    # autocorrelation near the expected period rather than the loudest overtone.
    steady = samples[round(0.45 * SAMPLE_RATE):round(1.4 * SAMPLE_RATE)]
    nominal_frequency = 440 * 2 ** ((key - 69) / 12)
    nominal_period = SAMPLE_RATE / nominal_frequency
    acf = signal.correlate(steady, steady, mode='full', method='fft')[len(steady) - 1:]
    begin = max(2, round(nominal_period * 0.96))
    end = round(nominal_period * 1.04) + 1
    lag = begin + np.argmax(acf[begin:end])
    pitch_correction = int(np.clip(round(1200 * math.log2(lag / nominal_period)), -28, 28))

    fade = min(len(samples) // 10, round(0.16 * SAMPLE_RATE))
    loop_head = min(round(0.62 * SAMPLE_RATE), len(samples) // 3)
    gain = np.linspace(0, 1, fade)
    tail = samples[-fade:].copy()
    samples[-fade:] = tail * (1 - gain) + samples[loop_head:loop_head + fade] * gain
    samples *= min(0.68 / np.max(np.abs(samples)), level / max(0.004, np.std(steady)))
    samples[:160] *= np.linspace(0, 1, 160)
    return encode_sample(samples), loop_head + fade, len(samples), pitch_correction


def pitch_zones(roots):
    for index, key in enumerate(roots):
        low = 0 if index == 0 else (roots[index - 1] + key) // 2 + 1
        high = 127 if index == len(roots) - 1 else (key + roots[index + 1]) // 2
        yield key, low, high


def meta_sources(folder):
    spec = next(folder.rglob('*.sfz'))
    samples = defaultdict(dict)
    rules = spec.read_text(encoding='utf-8').split('<master> lochan=1 hichan=1', 1)[1].split('<master>', 1)[0]
    for key, filename in re.findall(r'<region> key=(\d+) sample=(\S+)', rules):
        velocity = int(re.search(r'_Vel0([123])', filename)[1])
        samples[int(key)].setdefault(velocity, spec.parent / 'ogg' / filename)
    return samples


def bow_sources(folder, solo=False):
    notes = defaultdict(dict)
    for path in sorted(folder.glob('*.wav')):
        match = re.search(r'_([A-G])(#?)(\d+)_(p|f|v[123])(?=_|\.)', path.name)
        name, accidental, octave, layer = match.groups()
        key = key_number(name, accidental, octave) + (0 if solo else 12)
        velocity = 1 if layer in ('p', 'v1') else 2
        notes[key].setdefault(velocity, path)
    return notes


class Instruments:
    def __init__(self, samples, tables):
        self.samples = bytearray(samples)
        self.tables = tables
        self.sources = {}

    def sample_id(self, path, key, layer, style):
        identifier = (path, key, layer, style)
        if identifier in self.sources:
            return self.sources[identifier]
        if style == 'bow':
            data, start_loop, end_loop, correction = bow_sample(path, key, 0.105 if layer == 1 else 0.145)
        else:
            level = (0.39, 0.52, 0.64)[layer - 1]
            data = guitar_sample(path, level, amp=style)
            start_loop = end_loop = correction = 0
        start = len(self.samples)
        self.samples.extend(data)
        index = len(self.tables[b'shdr'])
        name = path.stem.encode('ascii', errors='replace')[:20]
        self.tables[b'shdr'].append((name, start, start + len(data), start_loop, end_loop, SAMPLE_RATE, key, correction, 0, 17))
        self.sources[identifier] = index
        return index

    def add(self, program, name, notes, style=None, slow=False, cutoff=None):
        if not notes:
            raise ValueError(f'No samples found for {name}')
        t = self.tables
        label = name.encode('ascii')
        t[b'phdr'].append((label, program, 0, len(t[b'pbag']), 0, 0, 0))
        t[b'pbag'].append((len(t[b'pgen']), 0))
        t[b'pgen'].append((41, len(t[b'inst'])))
        t[b'inst'].append((label, len(t[b'ibag'])))
        is_bow = style == 'bow'
        bounds = {1: (0, 60 if is_bow else 48), 2: (61, 127) if is_bow else (49, 96), 3: (97, 127)}
        for key, low, high in pitch_zones(sorted(notes)):
            layers = notes[key]
            for layer, path in sorted(layers.items()):
                velocity = bounds[layer] if len(layers) > 1 else (0, 127)
                sample = self.sample_id(path, key, layer, style)
                effects = [
                    (43, packed_range(low, high)), (44, packed_range(*velocity)),
                    (34, timecents(0.09 if slow else 0.012 if is_bow else 0.003)),
                    (38, timecents(0.27 if slow else 0.16 if is_bow else 0.085)),
                ]
                if is_bow:
                    effects.append((54, 1))
                if cutoff is not None:
                    effects.append((8, cutoff))
                effects.append((53, sample))
                t[b'ibag'].append((len(t[b'igen']), 0))
                t[b'igen'].extend(effects)

    def add_band(self, samples, band):
        t = self.tables
        added_programs = {row[1:3] for row in t[b'phdr']}
        first_instrument, first_sample = len(t[b'inst']), len(t[b'shdr'])
        initial_offset = len(self.samples)
        self.samples.extend(samples)
        t[b'inst'].extend(add_offset(row, i1=len(t[b'ibag'])) for row in band[b'inst'][:-1])
        t[b'ibag'].extend(add_offset(row, i0=len(t[b'igen'])) for row in band[b'ibag'][:-1])
        t[b'igen'].extend((op, amount + first_sample if op == 53 else amount) for op, amount in band[b'igen'][:-1])
        t[b'shdr'].extend(add_offset(row, i1=initial_offset, i2=initial_offset) for row in band[b'shdr'][:-1])
        for index, preset in enumerate(band[b'phdr'][:-1]):
            if preset[1:3] in added_programs:
                continue
            t[b'phdr'].append((*preset[:3], len(t[b'pbag']), *preset[4:]))
            for bag_index in range(preset[3], band[b'phdr'][index + 1][3]):
                first_generator, modulators = band[b'pbag'][bag_index]
                last_generator = band[b'pbag'][bag_index + 1][0]
                t[b'pbag'].append((len(t[b'pgen']), modulators))
                t[b'pgen'].extend((op, amount + first_instrument if op == 41 else amount)
                                  for op, amount in band[b'pgen'][first_generator:last_generator])

    def write(self, path, title, info):
        t = {tag: list(rows) for tag, rows in self.tables.items()}
        t[b'phdr'].append((b'EOP', 0, 0, len(t[b'pbag']), 0, 0, 0))
        t[b'pbag'].append((len(t[b'pgen']), 0))
        t[b'pgen'].append((0, 0))
        t[b'inst'].append((b'EOI', len(t[b'ibag'])))
        t[b'ibag'].append((len(t[b'igen']), 0))
        t[b'igen'].append((0, 0))
        t[b'shdr'].append((b'EOS', 0, 0, 0, 0, 0, 0, 0, 0, 0))
        write_bank(path, title, info, bytes(self.samples), t)
        print(f'{path.name}: {path.stat().st_size:,} bytes, {len(t[b"phdr"]) - 1} presets', flush=True)


def take_piano(samples, tables):
    bag_count = tables[b'phdr'][1][3]
    generator_count = tables[b'pbag'][bag_count][0]
    instrument_count = 1
    instruments = {amount for op, amount in tables[b'pgen'][:generator_count] if op == 41}
    if instruments != {0}:
        raise ValueError('Expected a single instrument in the Kawai preset')
    instrument_bags = tables[b'inst'][instrument_count][1]
    instrument_generators = tables[b'ibag'][instrument_bags][0]
    sample_ids = {amount for op, amount in tables[b'igen'][:instrument_generators] if op == 53}
    sample_count = max(sample_ids) + 1
    sample_end = max(row[2] for row in tables[b'shdr'][:sample_count])
    tables = {
        b'phdr': tables[b'phdr'][:1], b'pbag': tables[b'pbag'][:bag_count], b'pmod': tables[b'pmod'],
        b'pgen': tables[b'pgen'][:generator_count], b'inst': tables[b'inst'][:instrument_count],
        b'ibag': tables[b'ibag'][:instrument_bags], b'imod': tables[b'imod'],
        b'igen': tables[b'igen'][:instrument_generators], b'shdr': tables[b'shdr'][:sample_count],
    }
    return Instruments(samples[:sample_end], tables)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('sources', type=Path)
    args = parser.parse_args()
    sources = args.sources
    repo = Path(__file__).resolve().parents[1]
    assets = repo / 'content/shared/assets'
    piano_path = assets / 'piano-and-strings.sf3'
    band_path = repo / 'node_modules/@coderline/alphatab/dist/soundfont/sonivox.sf3'
    piano_info, piano_samples, piano = unpack_bank(piano_path)
    band_info, band_samples, band = unpack_bank(band_path)
    for bank in (piano, band):
        if any(mod for _, mod in bank[b'pbag'] + bank[b'ibag']):
            raise ValueError('This packer expects the current banks without modulation tables')
        if any(row[-1] != 17 for row in bank[b'shdr'][:-1]):
            raise ValueError('This packer expects mono Vorbis input SoundFonts')

    bank = take_piano(piano_samples, piano)
    strings = sources / 'strings'
    violin = bow_sources(strings / 'violin-solo', solo=True)
    viola = bow_sources(strings / 'viola-section')
    cello = bow_sources(strings / 'cello-section')
    bass = bow_sources(strings / 'bass-solo')
    upper_section = bow_sources(strings / 'violin-section')
    for program, name, notes in [
        (40, 'Solo Violin', violin), (41, 'Bowed Viola', viola),
        (42, 'Bowed Cello', cello), (43, 'Bowed Contrabass', bass),
    ]:
        bank.add(program, name, notes, style='bow')
    bank.write(piano_path, 'Kawai and VSCO Bowed Strings', piano_info)

    section = {key: notes for key, notes in cello.items() if key < 55}
    section.update({key: notes for key, notes in viola.items() if 55 <= key < 67})
    section.update({key: notes for key, notes in upper_section.items() if key >= 67})
    bank.add(48, 'Bowed String Section', section, style='bow')
    bank.add(49, 'Slow String Section', section, style='bow', slow=True)

    for program, name, folder in [(24, 'Nylon Acoustic', 'nylon'), (25, 'Steel Acoustic', 'steel')]:
        notes = {key: layers for key, layers in meta_sources(sources / folder).items() if key in GUITAR_ROOTS}
        bank.add(program, name, notes)
    electric = {}
    for path in sorted((sources / 'clean').rglob('*.flac')):
        match = re.match(r'([A-G])(#?)(\d+)_', path.name)
        electric[key_number(*match.groups())] = {2: path}
    bank.add(26, 'Jazz Electric Guitar', electric, cutoff=10250)
    bank.add(27, 'Clean Electric Guitar', electric)
    bank.add(29, 'Overdriven Guitar', electric, style='overdrive')
    bank.add(30, 'Distorted Guitar', electric, style='distortion')
    bank.add_band(band_samples, band)
    bank.write(assets / 'ensemble-with-kawai.sf3', 'Kawai, sampled guitars and strings', band_info)


if __name__ == '__main__':
    main()
