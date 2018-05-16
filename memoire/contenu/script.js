window.addEventListener('load', function () {
    /**
     * Références dans le texte
     * @type {NodeListOf<Element>}
     */
    var refNodes = document.querySelectorAll('[data-is]');

    /**
     * Références dans le texte, sous forme de tableau
     * @type {Element[]}
     */
    var refList = Array.prototype.slice.call(refNodes);
    if (refList.length === 0) return;

    /**
     * Première référence
     */
    var firstRef = refList[0];

    /**
     * Pour une référence dans le texte, renvoie l'élément note
     * @param {Element} ref
     * @returns {Element | null}
     */
    function getNote(ref) {
        var noteId = ref.getAttribute('data-is');
        return document.querySelector('[data-for="' + noteId + '"]');
    }

    /**
     * Pour une référence dans le texte, renvoie sa position en Y
     * @param {Element} ref
     * @returns {number}
     */
    function getRefPosition(ref) {
        return (document.documentElement.scrollTop + ref.getBoundingClientRect().top);
    }

    /**
     * Position visitée précédemment
     * @type {number}
     */
    var previousPosition = 0;

    /**
     * Drapeau : est-on en train de positionner ?
     * @type {boolean}
     */
    var pendingPositioningWork = false;

    var isFigure = new RegExp('figure');
    var isNote = new RegExp('note');

    /**
     * Il me semble qu'avec la gestion des hauteurs qu'on a ajouté
     * il devient important de signaler, à la fois dans les notes & les figures
     * leur numéro
     * sinon c'est le bordel
     */
    function annotateNotes() {
      var buf = '';
      refList.forEach(function (ref) {
        var note = getNote(ref); // la note que ça concerne
        if (!note) return;
        var s = document.createElement('span');
        var src = note.getAttribute('data-for');
        if (isFigure.test(src)) {
          buf = ('fig.' + src).replace('figure', '');
        }
        if (isNote.test(src)) {
          buf = (src + '.').replace('note', '');
        }
        buf = buf.split('et').join(' & ');
        buf = buf + ' ';
        s.innerText = buf;
        note.prepend(s);
      });
    }

    /**
     * Le gros du travail
     */
    function layoutNotes() {
        var position = getRefPosition(firstRef);
        /**
         * Si moins de 5px de différence avec la valeur précédente
         * on laisse tomber, pas la peine de repositionner tout
         */
        if (Math.abs(position - previousPosition) < 5) return;
        if (pendingPositioningWork) return;

        pendingPositioningWork = true;
        var refPositionY = 0;
        var previousRefPositionY = 0;
        var blockHeight = 0;
        var previousNote = null;
        var remainder = 0;
        /**
         * On remonte en haut, en gardant la position en mémoire
         */
        var previousScrollPosition = document.documentElement.scrollTop;
        document.documentElement.scrollTo(0, 0);

        /**
         * Pour chaque ref
         */
        refList.forEach(function (ref) {
            previousRefPositionY = refPositionY; // la position précédente est conservée
            var position = ref.getBoundingClientRect().top; // la position de la ref actuelle
            var note = getNote(ref); // la note que ça concerne
            refPositionY = position;
            if (previousNote) { // si on a une note précédente de laquelle tenir compte
                blockHeight = previousNote.getBoundingClientRect().height; // on regarde sa hauteur
                var offset = (refPositionY - previousRefPositionY) - blockHeight; // si elle est plus grande que la distance
                remainder = offset < 0 ? (Math.abs(offset) + 20) : 0;             // entre la ref précédente et l'actuelle
                position += remainder;                                            // on décale l'actuelle d'autant, + 20px
            }
            refPositionY += remainder; // mais sinon, on remet cette retenue à zéro
            if (note) {
                note.style.top = position + 'px';
                previousNote = note;
            }
        });

        /**
         * On ramène au scroll d'origine
         */
        document.documentElement.scrollTo(0, previousScrollPosition);
        previousPosition = position;
        pendingPositioningWork = false;
    }

    /**
     * Que l'on déclenche une première fois
     */
    annotateNotes();
    layoutNotes();

    /**
     * Et que l'on déclenchera 200ms après un redimensionnement si l'on est
     * pas déjà en train de faire ce taf
     */
    window.addEventListener('resize', function () {
        setTimeout(layoutNotes, 200);
    });
});
