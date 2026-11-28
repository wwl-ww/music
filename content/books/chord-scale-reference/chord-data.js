function chord(id, suffix, name, family, formula, aliases = []) {
  return { id, suffix, name, family, degrees: formula.split(' '), aliases };
}

const triad = '三和弦';
const seventh = '七和弦';
const suspended = '挂留和弦';
const added = '加音和弦';
const sixth = '六和弦';
const ninth = '九和弦';
const eleventh = '十一和弦';
const thirteenth = '十三和弦';

// Each formula is relative to the root's major scale, retaining compound degrees.
export const chordTypes = [
  chord('major', '', '大三和弦', triad, '1 3 5', ['maj', '大三']),
  chord('minor', 'm', '小三和弦', triad, '1 ♭3 5', ['min', '−', '小三']),
  chord('diminished', 'dim', '减三和弦', triad, '1 ♭3 ♭5', ['°', 'o', '减三']),
  chord('augmented', 'aug', '增三和弦', triad, '1 3 ♯5', ['+', '增三']),

  chord('major-seventh', 'maj7', '大七和弦', seventh, '1 3 5 7', ['M7', 'Δ7', 'Δ', '大大七']),
  chord('dominant-seventh', '7', '属七和弦', seventh, '1 3 5 ♭7', ['dom7', '大小七']),
  chord('minor-seventh', 'm7', '小七和弦', seventh, '1 ♭3 5 ♭7', ['min7', '−7', '小小七']),
  chord('minor-major-seventh', 'm(maj7)', '小大七和弦', seventh, '1 ♭3 5 7', ['mM7', 'mMaj7']),
  chord('diminished-seventh', 'dim7', '减七和弦', seventh, '1 ♭3 ♭5 ♭♭7', ['°7', 'o7']),
  chord('half-diminished-seventh', 'm7(♭5)', '半减七和弦', seventh, '1 ♭3 ♭5 ♭7', ['ø', 'ø7', '减小七']),
  chord('major-seventh-sharp-five', 'maj7(♯5)', '大七升五和弦', seventh, '1 3 ♯5 7', ['M7(♯5)', 'augMaj7', '增大七']),

  chord('suspended-fourth', 'sus4', '挂四和弦', suspended, '1 4 5', ['sus']),
  chord('suspended-second', 'sus2', '挂二和弦', suspended, '1 2 5'),
  chord('dominant-seventh-sus-four', '7sus4', '属七挂四和弦', suspended, '1 4 5 ♭7', ['7sus']),
  chord('dominant-seventh-sus-two', '7sus2', '属七挂二和弦', suspended, '1 2 5 ♭7'),
  chord('add-nine', 'add9', '大三加九和弦', added, '1 3 5 9', ['(add9)']),
  chord('minor-add-nine', 'm(add9)', '小三加九和弦', added, '1 ♭3 5 9', ['madd9']),
  chord('sus-four-add-nine', 'sus4(add9)', '挂四加九和弦', added, '1 4 5 9', ['sus4add9']),

  chord('major-sixth', '6', '大六和弦', sixth, '1 3 5 6'),
  chord('minor-sixth', 'm6', '小六和弦', sixth, '1 ♭3 5 6', ['min6']),
  chord('major-sixth-sharp-eleven', '6(♯11)', '大六加升十一和弦', sixth, '1 3 5 6 ♯11', ['6(add♯11)']),
  chord('minor-sixth-eleven', 'm6(11)', '小六加十一和弦', sixth, '1 ♭3 5 6 11', ['m6(add11)']),
  chord('major-six-nine', '6/9', '大六九和弦', sixth, '1 3 5 6 9', ['6(9)', '69']),
  chord('minor-six-nine', 'm6/9', '小六九和弦', sixth, '1 ♭3 5 6 9', ['m6(9)', 'm69']),

  chord('major-ninth', 'maj9', '大九和弦', ninth, '1 3 5 7 9', ['M9', 'Δ9']),
  chord('dominant-ninth', '9', '属九和弦', ninth, '1 3 5 ♭7 9'),
  chord('minor-ninth', 'm9', '小九和弦', ninth, '1 ♭3 5 ♭7 9', ['min9']),
  chord('minor-major-ninth', 'm(maj9)', '小大九和弦', ninth, '1 ♭3 5 7 9', ['mM9', 'mMaj9']),
  chord('diminished-seventh-add-nine', 'dim7(add9)', '减七加九和弦', ninth, '1 ♭3 ♭5 ♭♭7 9', ['°9', 'o9', 'dim9', '减九']),
  chord('minor-ninth-flat-five', 'm9(♭5)', '小九降五和弦', ninth, '1 ♭3 ♭5 ♭7 9', ['ø9']),
  chord('dominant-seventh-flat-nine', '7(♭9)', '属七降九和弦', ninth, '1 3 5 ♭7 ♭9'),
  chord('dominant-seventh-sharp-nine', '7(♯9)', '属七升九和弦', ninth, '1 3 5 ♭7 ♯9'),
  chord('minor-seventh-flat-nine', 'm7(♭9)', '小七降九和弦', ninth, '1 ♭3 5 ♭7 ♭9'),

  chord('major-eleventh', 'maj11', '大十一和弦', eleventh, '1 3 5 7 9 11', ['M11']),
  chord('minor-eleventh', 'm11', '小十一和弦', eleventh, '1 ♭3 5 ♭7 9 11'),
  chord('dominant-eleventh', '11', '属十一和弦', eleventh, '1 3 5 ♭7 9 11'),
  chord('major-seventh-sharp-eleven', 'maj7(♯11)', '大七升十一和弦', eleventh, '1 3 5 7 ♯11', ['M7(♯11)']),
  chord('dominant-seventh-sharp-eleven', '7(♯11)', '属七升十一和弦', eleventh, '1 3 5 ♭7 ♯11'),
  chord('dominant-seventh-sharp-five-sharp-eleven', '7(♯5,♯11)', '属七升五升十一和弦', eleventh, '1 3 ♯5 ♭7 ♯11', ['7(♯11/♯5)', '7(♯11,♯5)']),
  chord('dominant-seventh-flat-nine-sharp-eleven', '7(♭9,♯11)', '属七降九升十一和弦', eleventh, '1 3 5 ♭7 ♭9 ♯11', ['7(♭9/♯11)']),
  chord('dominant-seventh-sharp-nine-sharp-eleven', '7(♯9,♯11)', '属七升九升十一和弦', eleventh, '1 3 5 ♭7 ♯9 ♯11', ['7(♯9/♯11)']),
  chord('minor-seventh-eleven', 'm7(11)', '小七加十一和弦', eleventh, '1 ♭3 5 ♭7 11', ['m7(add11)']),
  chord('minor-seventh-flat-five-eleven', 'm7(♭5,11)', '半减七加十一和弦', eleventh, '1 ♭3 ♭5 ♭7 11', ['m7(11/♭5)', 'm7(11,♭5)', 'ø7(11)']),
  chord('minor-major-seventh-eleven', 'm(maj7)(11)', '小大七加十一和弦', eleventh, '1 ♭3 5 7 11', ['mM7(11)', 'mMaj7(11)']),
  chord('diminished-seventh-eleven', 'dim7(11)', '减七加十一和弦', eleventh, '1 ♭3 ♭5 ♭♭7 11', ['°7(11)', 'o7(11)']),
  chord('dominant-ninth-sharp-eleven', '9(♯11)', '属九升十一和弦', eleventh, '1 3 5 ♭7 9 ♯11'),

  chord('major-thirteenth', 'maj13', '大十三和弦', thirteenth, '1 3 5 7 9 11 13', ['M13']),
  chord('minor-thirteenth', 'm13', '小十三和弦', thirteenth, '1 ♭3 5 ♭7 9 11 13'),
  chord('dominant-thirteenth', '13', '属十三和弦', thirteenth, '1 3 5 ♭7 9 11 13'),
  chord('major-seventh-thirteen', 'maj7(13)', '大七加十三和弦', thirteenth, '1 3 5 7 13', ['M7(13)', 'maj7(add13)']),
  chord('dominant-seventh-thirteen', '7(13)', '属七加十三和弦', thirteenth, '1 3 5 ♭7 13', ['7(add13)']),
  chord('dominant-seventh-flat-thirteen', '7(♭13)', '属七降十三和弦', thirteenth, '1 3 5 ♭7 ♭13'),
  chord('dominant-seventh-flat-nine-flat-thirteen', '7(♭9,♭13)', '属七降九降十三和弦', thirteenth, '1 3 5 ♭7 ♭9 ♭13', ['7(♭9/♭13)']),
  chord('dominant-seventh-sharp-nine-flat-thirteen', '7(♯9,♭13)', '属七升九降十三和弦', thirteenth, '1 3 5 ♭7 ♯9 ♭13', ['7(♯9/♭13)']),
  chord('minor-seventh-flat-thirteen', 'm7(♭13)', '小七降十三和弦', thirteenth, '1 ♭3 5 ♭7 ♭13'),
  chord('minor-seventh-flat-five-flat-thirteen', 'm7(♭5,♭13)', '半减七降十三和弦', thirteenth, '1 ♭3 ♭5 ♭7 ♭13', ['m7(♭13/♭5)', 'm7(♭13,♭5)', 'ø7(♭13)']),
  chord('minor-seventh-thirteen', 'm7(13)', '小七加十三和弦', thirteenth, '1 ♭3 5 ♭7 13', ['m7(add13)']),
  chord('minor-major-seventh-thirteen', 'm(maj7)(13)', '小大七加十三和弦', thirteenth, '1 ♭3 5 7 13', ['mM7(13)', 'mMaj7(13)']),
  chord('diminished-seventh-flat-thirteen', 'dim7(♭13)', '减七降十三和弦', thirteenth, '1 ♭3 ♭5 ♭♭7 ♭13', ['°7(♭13)', 'o7(♭13)']),
  chord('dominant-ninth-flat-thirteen', '9(♭13)', '属九降十三和弦', thirteenth, '1 3 5 ♭7 9 ♭13'),
  chord('dominant-thirteenth-flat-nine', '13(♭9)', '属十三降九和弦', thirteenth, '1 3 5 ♭7 ♭9 11 13')
];
