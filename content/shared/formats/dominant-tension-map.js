import { displayPitch, getTonic, naturalOffsets, spellNote } from './pitch.js';
import { mountScore } from './score.js';
import { mountScoreChoiceButtons } from './score-choice-buttons.js';

const minorOffsets = [0, 2, 3, 5, 7, 8, 10];

export function buildDominantTensionMap(tonic, minor = false) {
  const root = getTonic(tonic);
  const diatonic = (minor ? minorOffsets : naturalOffsets).map((offset, index) =>
    spellNote(root, index, root.tonicPitch + offset).name);
  const scale = diatonic.map(displayPitch);
  const label = `${scale[0]} ${minor ? '小调' : '大调'}`;
  return {
    label,
    scaleName: `${scale[0]} ${minor ? '自然小调' : '大调'}`,
    scale,
    dominant: `${scale[4]}7`,
    target: scale[0] + (minor ? 'm' : ''),
    targetNotes: [scale[0], scale[2], scale[4]].join('–'),
    preparation: `${scale[1]}m7${minor ? '(♭5)' : ''}`,
    third: {
      note: scale[2], role: minor ? '主和弦的小三音' : '主和弦的大三音',
      tension: minor ? '♭13' : '13',
      source: minor ? displayPitch(spellNote(root, 2, root.tonicPitch + 4).name) : ''
    },
    sixth: {
      note: scale[5], role: minor ? '自然小调的第六级（♭6）' : '大调音阶的第六级（6）',
      tension: minor ? '♭9' : '9',
      source: minor ? displayPitch(spellNote(root, 5, root.tonicPitch + 9).name) : ''
    }
  };
}

export function mountDominantTensionMap(host, cases, { tempo = 92 } = {}) {
  const options = cases.map(({ tonic, minor, score }) => ({ ...buildDominantTensionMap(tonic, minor), score }));
  const fields = Object.fromEntries([...host.querySelectorAll('[data-tension-field]')].map(node =>
    [node.dataset.tensionField, node]));
  const setText = (field, text) => { fields[field].textContent = text; };
  const scale = [...host.querySelectorAll('[data-tension-degree]')];
  const addPreparation = host.querySelector('[data-tension-toggle]');
  const preparationCard = addPreparation.closest('label');
  const figure = host.querySelector('[data-tension-score]');
  let current;
  let player;

  function updatePreparation() {
    const included = addPreparation.checked;
    preparationCard.toggleAttribute('data-included', included);
    const notes = current.score(included);
    const progression = [`${current.dominant}(${current.sixth.tension},${current.third.tension})`, current.target];
    if (included) progression.unshift(current.preparation);
    figure.setAttribute('aria-label', progression.join(' → ') + ' 的试听');
    if (player) player.setNotes(notes);
    else player = mountScore(figure, { notes, tempo, notation: 'staff', notationVisible: false });
  }

  mountScoreChoiceButtons(host.querySelector('[data-tension-choices]'), options, option => {
    if (current === option) return;
    current = option;
    setText('scale', option.scaleName);
    scale.forEach((node, index) => { node.textContent = option.scale[index]; });
    for (const degree of ['third', 'sixth']) {
      const { note, role, tension, source } = option[degree];
      setText(`${degree}-note`, note);
      setText(`${degree}-role`, role);
      setText(`${degree}-tension`, `在 ${option.dominant} 上是 ${tension}`);
      setText(`${degree}-alteration`, source ? `${source} 降半音 → ${note}` : '');
      fields[`${degree}-alteration`].hidden = !source;
    }
    setText('target', option.target);
    setText('target-notes', option.targetNotes);
    setText('dominant', option.dominant);
    setText('extensions', `${option.sixth.tension}、${option.third.tension}`);
    setText('preparation', option.preparation);
    updatePreparation();
  });
  addPreparation.disabled = false;
  addPreparation.addEventListener('change', updatePreparation);
}
