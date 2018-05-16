window.addEventListener('load', function() {
  var notes = Array.prototype.slice.call(document.querySelectorAll('.notes p'));
  var note = notes[0];

  var cibles = Array.prototype.slice.call(document.querySelectorAll('[data-is]'));
  var cible = cibles[0];

  var get_cible = function(n) {
    var c = n.getAttribute('data-for');
    return document.querySelector('[data-is="'+ c +'"]');
  }

  var get_note = function(cible) {
    var note = cible.getAttribute('data-is');
    return document.querySelector('[data-for="'+ note +'"]');
  }

  var get_note_pos = function(n) {
    return (document.documentElement.scrollTop + get_cible(n).getBoundingClientRect().top);
  };

  var get_cible_pos = function(cible) {
    return (document.documentElement.scrollTop + cible.getBoundingClientRect().top);
  };

  var prev_pos = 0;
  var texte = document.querySelector('section.texte');

  var check_interval = setInterval(position_notes, 200);

  var positioning = false;

  function position_notes() {
    var pos = get_cible_pos(cible);
    if (Math.abs(pos - prev_pos) < 5) return;
    if (positioning) return;
    positioning = true;
    var hauteur_cible = 0;
    var hauteur_cible_precedente = 0;
    var hauteur_bloc = 0;
    var note_precedente = null;
    var retenue_precedente = 0;
    clearInterval(check_interval);
    var old_scroll = document.documentElement.scrollTop;
    document.documentElement.scrollTo(0,0);

    cibles.forEach(function(cible, index) {
        hauteur_cible_precedente = hauteur_cible;
        var position = cible.getBoundingClientRect().top;
        var note = get_note(cible);
        hauteur_cible = position;

        if (note_precedente) {
          hauteur_bloc = note_precedente.getBoundingClientRect().height;
          console.log(hauteur_bloc, cible);
          var decalage = (hauteur_cible - hauteur_cible_precedente) - hauteur_bloc;
          if (decalage < 0) {
            retenue_precedente = Math.abs(decalage) + 20;
            position += retenue_precedente;
          }
        }

        hauteur_cible += retenue_precedente;
        note.style.top = position + 'px';
        note_precedente = note;
    });

    document.documentElement.scrollTo(0,old_scroll);
    prev_pos = pos;
    positioning = false;
  };

  window.addEventListener('resize', function() { setTimeout(position_notes, 200); });
});
