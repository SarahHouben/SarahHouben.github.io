document.addEventListener("DOMContentLoaded", ready);

function ready() {
  let boxes = document.querySelectorAll(".box");
  //   let boxHeaders = document.querySelectorAll(".box-header");
  boxes.forEach(box => {
    box.addEventListener("click", function() {
      // if( box.classList.contains('box--active')) {
      // 	 box.classList.remove('box--active');
      // 	 if( boxInner ) boxInner.classList.remove('box__inner--enter');
      // }
      // else {
      // 	 box.classList.add('box--active');
      // 	 if( boxInner ) boxInner.classList.add('box__inner--enter');
      // }
      function removeActiveClasses(box) {
        box.classList.remove("box--active");
        let boxInner = box.querySelector(".box__inner");
        if (boxInner) boxInner.classList.remove("box__inner--enter");
      }

      function addActiveClasses(box) {
        box.classList.add("box--active");
        // boxHeaders.classList.add("box-header--active");

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

    // box.addEventListener('click', function(){
    // 				box.classList.remove('box--active');

    // 	if( boxInner ) boxInner.classList.remove('box__inner--enter');
    // })
  });
}
