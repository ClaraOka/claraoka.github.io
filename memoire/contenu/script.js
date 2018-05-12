var notes = Array.from(document.querySelectorAll('.notes p'));
var note = notes[0];

var get_cible = function(n) {
  var c = n.getAttribute('data-for');
  return document.querySelector('[data-is="'+ c +'"]');
}

var get_note_pos = function(n) {
  return (document.documentElement.scrollTop + get_cible(n).getBoundingClientRect().top);
};

var prev_pos = 0;
var texte = document.querySelector('section.texte');

var check_interval = setInterval(function() {
  var pos = get_note_pos(note);
  if (Math.abs(pos - prev_pos) < 5) return;
  // le fait que la page soit scrollée influence la position des notes
  // on enregistre l'ancien scroll
  var old_scroll = document.documentElement.scrollTop;
  // on la remonte en haut
  document.documentElement.scrollTo(0,0);
  // on place les notes
  notes.forEach(function(note) {
      var position = get_cible(note).getBoundingClientRect().top;
      note.style.top = position + 'px';
  });
  // puis on ramène à l'ancienne position. c'est instantané
  document.documentElement.scrollTo(0,old_scroll);
  prev_pos = pos;
}, 200);
