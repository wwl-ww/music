const letters = 'CDEFGAB';
const staffTop = 33;
const staffBottom = 81;
const space = 12;

function staffY(pitch) {
  const degree = letters.indexOf(pitch[0]) + Number(pitch.at(-1)) * letters.length;
  const topDegree = letters.indexOf('F') + 5 * letters.length;
  return staffTop + (topDegree - degree) * space / 2;
}

function ledgerLines(x, y) {
  const lines = [];
  for (let level = staffTop - space; level >= y; level -= space) {
    lines.push('M' + (x - 11) + ' ' + level + 'h22');
  }
  for (let level = staffBottom + space; level <= y; level += space) {
    lines.push('M' + (x - 11) + ' ' + level + 'h22');
  }
  return lines.join(' ');
}

export function renderCounterpointAxis(diagram, { pitch, name, source, reflected }) {
  const title = pitch + ' ' + name + '轴';
  const axisY = staffY(pitch);
  const svg = diagram.querySelector('svg');
  const staffs = Array.from({ length: 5 }, (_, index) =>
    'M4 ' + (staffTop + index * space) + 'H317').join(' ');
  const pairs = source.map(([original], index) => {
    const [image] = reflected[index];
    const x = 63 + index * 55;
    const originalY = staffY(original);
    const imageY = staffY(image);
    const direction = Math.sign(imageY - originalY);
    const arrow = direction ? '<path class="counterpoint-axis-connection" d="M' + x + ' '
      + (originalY + direction * 2) + 'V' + (imageY - direction * 2)
      + '" marker-end="url(#pentatonic-axis-arrow)"/>' : '';
    return {
      label: original + '→' + image,
      markup: [
        '<path d="' + ledgerLines(x - 12, originalY) + ' ' + ledgerLines(x + 12, imageY) + '"/>',
        arrow,
        '<text x="' + (x - 12) + '" y="' + originalY + '">&#xE0A4;</text>',
        '<text class="counterpoint-axis-image" x="' + (x + 12) + '" y="' + imageY + '">&#xE0A4;</text>',
        '<g class="counterpoint-axis-pair"><text x="' + x + '" y="126">' + original[0] + '→' + image[0] + '</text></g>'
      ].join('')
    };
  });
  svg.setAttribute('viewBox', '0 -21 380 155');
  svg.setAttribute('aria-label', title + '。' + pairs.map(({ label }) => label).join('，') + '。');
  svg.innerHTML = [
    '<defs><marker id="pentatonic-axis-arrow" class="counterpoint-axis-arrow" viewBox="0 0 4 4" refX="4" refY="2" markerWidth="4" markerHeight="4" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0L4 2L0 4Z"/></marker></defs>',
    '<path class="inline-staff-lines" d="' + staffs + '"/>',
    '<text x="12" y="69">&#xE050;</text>',
    '<path class="counterpoint-axis-line" d="M42 ' + axisY + 'H319"/>',
    '<text class="counterpoint-axis-label" x="325" y="' + (axisY + 4) + '">' + title + '</text>',
    '<g text-anchor="middle">' + pairs.map(({ markup }) => markup).join('') + '</g>'
  ].join('');
}
