(function(document) {
  function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  docReady(function() {
    var images, image, id, clone;
    var i, len;
    var clone_cls = 'clone-image';
    var bound;

    images = document.getElementsByClassName('image');
    len = images.length;

    for (i = 0; i < len; i++) {
      image = images[i];

      // Mouse enter event
      image.addEventListener('mouseenter', function() {
        id = uniqueId();
        //-----
        this.setAttribute('data-clone-id', id);
        //-----
        clone = document.createElement('IMG');
        clone.src = this.src;
        clone.classList.add(clone_cls);
        clone.id = id;
        //-----
        bound = this.getBoundingClientRect();
        clone.style.top = (bound.top + pageYOffset) + 'px';
        // clone.style.right = document.body.offsetWidth - (bound.right + pageXOffset) + 'px';
        clone.style.left = (bound.left + pageXOffset) + 'px';
        document.body.appendChild(clone);
      });
      // Mouse leave event
      image.addEventListener('mouseleave', function() {
        id = this.getAttribute('data-clone-id');
        if (id) {
          this.removeAttribute('data-clone-id');
          clone = document.getElementById(id);
          if (typeof clone !== 'undefined') {
            clone.remove();
          }
        }
      });
    }

    function uniqueId() {
      var name, num, str, test;
      //-----
      name = 'clone';
      do {
        num = Math.floor(Math.random() * 100000);
        str = name + num;
        test = document.getElementById(str);
      } while (test && test.length);

      return str;
    }
  });
})(document);
