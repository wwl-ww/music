// alphaTab 1.9 engraves only beat.notes[0] in numbered notation. Keep its beat,
// beaming and playback layout and replace that single notehead with a chord stack.
const chordGlyph = String.raw`
class NumberedChordGlyph extends GlyphGroup {
	rows;
	lineY;
	anchorX = 0;
	constructor(rows) {
		super(0, 0);
		this.rows = rows;
		this.lineY = rows[0].head.y;
		for (const { head, accidental } of rows) {
			if (accidental) this.addGlyph(accidental);
			this.addGlyph(head);
		}
	}
	doLayout() {
		for (const glyph of this.glyphs) glyph.y = this.lineY;
		super.doLayout();
		const metrics = this.renderer.smuflMetrics;
		const gap = metrics.oneStaffSpace * 0.2;
		const leading = Math.max(0, ...this.rows.map(({ accidental }) => accidental ? accidental.width + metrics.accidentalPadding : 0));
		const digitWidth = Math.max(...this.rows.map(({ head }) => head.width));
		let previousTop = Infinity;
		for (const { head, accidental } of this.rows) {
			if (previousTop !== Infinity) {
				const bottom = Math.max(head.getBoundingBoxBottom(), accidental?.getBoundingBoxBottom() ?? -Infinity);
				const shift = previousTop - gap - bottom;
				head.y += shift;
				if (accidental) accidental.y += shift;
			}
			head.x = leading + (digitWidth - head.width) / 2;
			if (accidental) accidental.x = leading - metrics.accidentalPadding - accidental.width;
			previousTop = Math.min(head.getBoundingBoxTop(), accidental?.getBoundingBoxTop() ?? Infinity);
		}
		this.anchorX = leading + digitWidth / 2;
		this.width = leading + digitWidth;
		this.height = this.getBoundingBoxBottom() - this.getBoundingBoxTop();
	}
}
`;

const headMethods = String.raw`
	get underlineY() {
		const head = this.noteHeads?.rows?.[0].head ?? this.noteHeads;
		return head ? head.y + head.height / 2 + this.renderer.smuflMetrics.numberedBarRendererBarSpacing : this.renderer.getLineY(0);
	}
	makeHead(note, y, isGrace) {
		const beat = this.container.beat;
		if (!note || note.isDead) return new NumberedNoteHeadGlyph(0, y, note ? "X" : "0", isGrace, beat, 0, note);
		const { keySignature: ks, keySignatureType: kst } = this.renderer.bar;
		const oneValues = kst === 1 ? NumberedBeatGlyph._minorKeySignatureOneValues : NumberedBeatGlyph._majorKeySignatureOneValues;
		const spelling = ModelUtils.resolveSpelling(ks, note.displayValue, note.accidentalMode);
		const tonicDegree = ModelUtils.getKeySignatureTonicDegree(ks, kst);
		const effectiveTonic = kst === 1 ? (tonicDegree + 2) % 7 : tonicDegree;
		const digit = (spelling.degree - effectiveTonic + 7) % 7 + 1;
		const octave = Math.floor((note.displayValue - oneValues[ks + 7]) / 12);
		return new NumberedNoteHeadGlyph(0, y, digit, isGrace, beat, octave, note);
	}
	makeChordAccidental(note, y, isGrace) {
		const ks = this.renderer.bar.keySignature;
		const spelling = ModelUtils.resolveSpelling(ks, note.displayValue, note.accidentalMode);
		const offset = spelling.accidentalOffset - ModelUtils.getKeySignatureAccidentalOffset(ks, spelling.degree);
		if (note.accidentalMode === 1 || (!note.hasQuarterToneOffset && offset === 0)) return null;
		const type = note.hasQuarterToneOffset ? (offset > 0 ? 5 : offset < 0 ? 6 : 4) : ModelUtils.accidentalOffsetToType(offset);
		const scale = EngravingSettings.GraceScale;
		const glyph = new AccidentalGlyph(0, y, type, isGrace ? scale * scale : scale);
		glyph.colorOverride = ElementStyleHelper.noteColor(this.renderer.resources, 9, note);
		return glyph;
	}
`;

function fixReductionLines(source) {
  // Position reduction lines against the digits, and join only the levels present on both notes.
  const start = source.indexOf('class NumberedBarRenderer extends LineBarRenderer');
  const end = source.indexOf('class NumberedBarRendererFactory', start);
  if (start < 0 || end < 0) throw new Error('alphaTab numbered bar renderer not found');
  let bars = source.slice(start, end);
  bars = replace(bars, /\t\t\t\tlet barStartX = 0;[\s\S]*?(?=\t\t\t\tif \(container && container\.hasAdditionalNumbers\))/, `				const nextBeat = h.beats[i + 1];
				const nextBarCount = nextBeat ? ModelUtils.getIndex(nextBeat.duration) - 2 : 0;
				const container = this.voiceContainer.getBeatContainer(beat);
				const barStart = cy + this.y + this.voiceContainer.y + (container
					? container.y + container.onNotes.y + container.onNotes.underlineY : this.getLineY(0));
				for (let barIndex = 0; barIndex < barCount; barIndex++) {
					const barEndX = barIndex < nextBarCount ? this.getBeatX(nextBeat, 0) : this.getBeatX(beat, 4);
					const barY = barStart + barIndex * Math.abs(barSpacing);
					LineBarRenderer.paintSingleBar(canvas, cx + this.x + beatLineX, barY, cx + this.x + barEndX, barY, Math.abs(barSize));
				}
`);
  bars = replace(bars, 'const barY = barStart + barIndex * barSpacing;', 'const barY = barStart + barIndex * Math.abs(barSpacing);');
  bars = replace(bars, 'cx + this.x + additionalBarEndX, barY, barSize);', 'cx + this.x + additionalBarEndX, barY, Math.abs(barSize));');
  return source.slice(0, start) + bars + source.slice(end);
}

function replace(source, before, after) {
  const patched = source.replace(before, () => after);
  if (patched === source) throw new Error(`alphaTab numbered chord patch no longer matches: ${before}`);
  return patched;
}

export function numberedChords() {
  return {
    name: 'alphatab-numbered-chords',
    enforce: 'pre',
    transform(source, id) {
      if (!/[/\\]alphatab[/\\]dist[/\\]alphaTab\.core\.mjs(?:\?|$)/.test(id)) return;
      const start = source.indexOf('class NumberedNoteHeadGlyph extends Glyph');
      const end = source.indexOf('class NumberedSlurGlyph extends TabSlurGlyph', start);
      if (start < 0 || end < 0) throw new Error('alphaTab numbered glyphs not found');
      let glyphs = source.slice(start, end);
      glyphs = replace(glyphs, 'constructor(x, y, number, isGrace, beat, octaveDots)', '_note;\n\tunderlineCount = 0;\n\tconstructor(x, y, number, isGrace, beat, octaveDots, note = beat.notes[0])');
      glyphs = replace(glyphs, 'this._beat = beat;', 'this._beat = beat;\n\t\tthis._note = note;');
      glyphs = replace(glyphs, 'this._beat.notes.length > 0 ? ElementStyleHelper.applyNote(canvas, 8, this._beat.notes[0])', 'this._note ? ElementStyleHelper.applyNote(canvas, 8, this._note)');
      glyphs = replace(glyphs, 'this._octaveDotsY = this.height / 2 + dotHeight + res.engravingSettings.glyphTop.get(57831);',
        `this._octaveDotsY = this.height / 2 + dotHeight + res.engravingSettings.glyphTop.get(57831)
			+ this.underlineCount * (this.renderer.smuflMetrics.numberedBarRendererBarSpacing + this.renderer.smuflMetrics.numberedBarRendererBarSize);`);
      glyphs = replace(glyphs, 'if (this.container.beat.notes.length > 0)', 'if (this.container.beat.notes.length === 1)');
      glyphs = replace(glyphs, 'class NumberedBeatGlyph extends BeatOnNoteGlyphBase {', `${chordGlyph}\nclass NumberedBeatGlyph extends BeatOnNoteGlyphBase {\n\tchordHeads = new Map();${headMethods}`);
      glyphs = replace(glyphs, 'getNoteX(_note, requestedPosition) {', `getNoteX(note, requestedPosition) {
		const head = this.chordHeads.get(note);
		if (head) return this.noteHeads.x + head.x + head.width * ([0, 0.5, 1][requestedPosition] ?? 0);`);
      glyphs = replace(glyphs, 'if (this.noteHeads && this.container.beat.notes.length > 0) {', `if (this.chordHeads.size) {
			const scale = this.renderer.settings.display.scale;
			for (const [note, head] of this.chordHeads) {
				writer.addNote(note, (cx + this.x + this.noteHeads.x + head.x) * scale,
					(cy + this.y + head.y - head.height / 2) * scale, head.width * scale, head.height * scale);
			}
			return;
		}
		if (this.noteHeads && this.container.beat.notes.length > 0) {`);
      glyphs = replace(glyphs, 'getNoteY(_note, requestedPosition) {\n\t\treturn this._internalGetNoteY(requestedPosition);',
        'getNoteY(note, requestedPosition) {\n\t\treturn this._internalGetNoteY(requestedPosition, this.chordHeads.get(note));');
      glyphs = replace(glyphs, 'getLowestNoteY(requestedPosition) {\n\t\treturn this._internalGetNoteY(requestedPosition);',
        'getLowestNoteY(requestedPosition) {\n\t\treturn this._internalGetNoteY(requestedPosition, this.noteHeads?.rows?.[0].head);');
      glyphs = replace(glyphs, 'getHighestNoteY(requestedPosition) {\n\t\treturn this._internalGetNoteY(requestedPosition);',
        'getHighestNoteY(requestedPosition) {\n\t\treturn this._internalGetNoteY(requestedPosition, this.noteHeads?.rows?.at(-1).head);');
      glyphs = replace(glyphs, '_internalGetNoteY(requestedPosition) {\n\t\tlet g = null;\n\t\tif (this.noteHeads) g = this.noteHeads;\n\t\telse if (this.deadSlapped) g = this.deadSlapped;',
        '_internalGetNoteY(requestedPosition, head) {\n\t\tconst g = head ?? this.noteHeads ?? this.deadSlapped;');
      glyphs = replace(glyphs, /\t\tlet octaveDots = 0;[\s\S]*?(?=\t\t\tif \(this.container.beat.deadSlapped\))/, `		this.chordHeads.clear();
		const beat = this.container.beat;
		if (!beat.isEmpty) {
			const glyphY = sr.getLineY(0);
`);
      glyphs = replace(glyphs, /\t\t\t\tconst noteHeadGlyph = new NumberedNoteHeadGlyph[^\n]*\n\t\t\t\tthis.noteHeads = noteHeadGlyph;\n\t\t\t\tthis.addNormal\(noteHeadGlyph\);/, `				if (beat.notes.length > 1) {
					const rows = [...beat.notes].sort((low, high) => low.displayValue - high.displayValue).map((note, index) => {
						const head = this.makeHead(note, glyphY, isGrace);
						if (index === 0) head.underlineCount = Math.max(0, ModelUtils.getIndex(beat.duration) - 2);
						this.chordHeads.set(note, head);
						return { head, accidental: this.makeChordAccidental(note, glyphY, isGrace) };
					});
					this.noteHeads = new NumberedChordGlyph(rows);
				} else {
					this.noteHeads = this.makeHead(beat.notes[0], glyphY, isGrace);
					this.noteHeads.underlineCount = Math.max(0, ModelUtils.getIndex(beat.duration) - 2);
				}
				this.addNormal(this.noteHeads);`);
      glyphs = replace(glyphs, 'this.onTimeX = this.noteHeads.x + this.noteHeads.width / 2;',
        'this.onTimeX = this.noteHeads.x + (this.noteHeads.anchorX ?? this.noteHeads.width / 2);');
      return fixReductionLines(source.slice(0, start) + glyphs + source.slice(end));
    }
  };
}
