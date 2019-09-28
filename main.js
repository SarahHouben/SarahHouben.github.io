/* #################################            BOX  FUNCTIONS         ############################################*/

// wait for html to load in browser before executing javascript code
document.addEventListener("DOMContentLoaded", ready);

function ready() {
  let boxes = document.querySelectorAll(".box");
  let boxInners = document.querySelectorAll(".box__inner");
  boxes.forEach(box => {
    box.addEventListener("click", function(event) {
      function removeActiveClasses(box) {
        let boxInner = box.querySelector(".box__inner");
        if (boxInner) {
          boxInner.classList.remove("box__inner--enter");
          boxInner.style.width = boxInner.clientWidth + "px";
        }

        // set timeout to add the code below to end of event queue ( fixes boxInner width not being set before .box--active being added)
        this.setTimeout(() => {
          box.classList.remove("box--active");
          box.classList.add("box--inactive");

          // wait for transition of .box--active to end before we remove the width of the boxInner
          // prevents the visible squishing of the content when it closes :)
          box.addEventListener("transitionend", function() {
            if (boxInner) boxInner.style.width = "";
          });
        });

        let boxHeader = box.querySelector(".box__header");
        if (boxHeader) boxHeader.classList.remove("box-header--active");
      }

      function addActiveClasses(box) {
        box.classList.add("box--active");
        box.classList.remove("box--inactive");

        let boxHeader = box.querySelector(".box__header");
        if (boxHeader) boxHeader.classList.add("box-header--active");

        let boxInner = box.querySelector(".box__inner");
        if (boxInner) boxInner.classList.add("box__inner--enter");
      }

      // let activeBox;
      // reset state by removing all active classes
      boxes.forEach(_box => {
        if (_box.classList.contains("box--active")) {
          removeActiveClasses(_box);
          // save the current active box for later..
          // activeBox = _box;
        }
      });

      // if clicking on a currently active box, close it ( doesn't work with current implementation )
      // if (activeBox === box) {
      //   removeActiveClasses(box);
      // } else {
      //   addActiveClasses(box);
      // }
    });
  });

  boxInners.forEach(boxInner => {
    boxInner.addEventListener("click", function(event) {
      //  problem: clicking on the content of an active box triggers the box to close
      // stop propogation brevent the event being passed to the parent,
      //  i.e. the event doesn't "bubble", and only triggers an event for the current clicked element
      // in this case the boxInner is the current clicked element
      event.stopPropagation();
    });
  });
}
