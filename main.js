document.addEventListener("DOMContentLoaded", ready);

function ready() {
  let boxes = document.querySelectorAll(".box");
  boxes.forEach(box => {
    box.addEventListener("click", function() {
      function removeActiveClasses(box) {
        box.classList.remove("box--active");

        let boxHeader = box.querySelector(".box__header");
        boxHeader.classList.remove("box-header--active");

        let boxInner = box.querySelector(".box__inner");
        if (boxInner) boxInner.classList.remove("box__inner--enter");
      }

      function addActiveClasses(box) {
        box.classList.add("box--active");

        let boxHeader = box.querySelector(".box__header");
        boxHeader.classList.add("box-header--active");

        let boxInner = box.querySelector(".box__inner");
        if (boxInner) boxInner.classList.add("box__inner--enter");
      }

      let activeBox;
      boxes.forEach(_box => {
        if (_box.classList.contains("box--active")) {
          removeActiveClasses(_box);
          activeBox = _box;
        }
      });

      if (activeBox === box) {
        removeActiveClasses(box);
      } else {
        addActiveClasses(box);
      }
    });
  });
}
