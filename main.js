/* #################################            BOX  FUNCTIONS         ############################################*/

// wait for html to load in browser before executing javascript code
document.addEventListener("DOMContentLoaded", ready);

function ready() {
  let boxes = document.querySelectorAll(".box");
  let boxInners = document.querySelectorAll(".box__inner");

  function removeActiveClasses(box) {
    let boxInner = box.querySelector(".box__inner");
    if (boxInner) {
      // add width to prevent content squishing,
      // this width is only removed later once we add the active class again,
      // so that we don't have to deal with transitionend events or set a timeout
      boxInner.style.width = box.clientWidth + "px";
      boxInner.classList.remove("box__inner--enter");
    }

    box.classList.remove("box--active");
    box.classList.add("box--inactive");

    let boxHeader = box.querySelector(".box__header");
    if (boxHeader) boxHeader.classList.remove("box-header--active");
  }

  function addActiveClasses(box) {
    box.classList.add("box--active");
    box.classList.remove("box--inactive");

    let boxHeader = box.querySelector(".box__header");
    if (boxHeader) boxHeader.classList.add("box-header--active");

    let boxInner = box.querySelector(".box__inner");
    if (boxInner) {
      // remove width so that boxInner now takes up the width of the parent div (.box)
      boxInner.style.width = "";
      boxInner.classList.add("box__inner--enter");
    }
  }

  boxes.forEach(box => {
    box.addEventListener("click", function(event) {
      let activeBox;
      // reset state by removing all active classes
      boxes.forEach(_box => {
        if (_box.classList.contains("box--active")) {
          removeActiveClasses(_box);
          // save the current active box for later..
          activeBox = _box;
        }
      });

      if (activeBox !== box) {
        addActiveClasses(box);
      }
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

  /* #################################         HYPERLINK TO CONTACT     FUNCTIONS         ############################################*/

  let contactLink = document.querySelector(".contact-link");
  contactLink.addEventListener("click", function() {
    let contactBox = document.querySelector(".contact-box");
    let aboutBox = document.querySelector(".about-box");
    addActiveClasses(contactBox);
    removeActiveClasses(aboutBox);
  });
}

/* #################################         HYPERLINK TO CONTACT     FUNCTIONS         ############################################*/

// let contactLink = document.querySelector(".contact-link");
// contactLink.addEventListener("click", function() {
//   //   //CONTACT BOX
//   //   //Open Contact-Box
//   let contactBox = document.querySelector(".contact-box");
//   let aboutBox = document.querySelector(".about-box");
//   addActiveClasses(contactBox);
//   removeActiveClasses(aboutBox);

//   contactBox.classList.add("box--active");
//   contactBox.classList.remove("box--inactive");

//   //Add Header to Contact-Box
// let contactHeader = document.querySelector(".about__header");
//   contactHeader.classList.remove("box-header--active");

//   //Open Inner Contact-Box
//   let innerContactBox = document.querySelector(".inner__contact-box");
//   innerContactBox.classList.add("box__inner--enter");
//   innerContactBox.style.width = "";

//   //ABOUT BOX
//   //Close About Box
//   aboutBox.classList.remove("box--active");
//   aboutBox.classList.add("box--inactive");

//   //Remove Header from About-Box
//   let aboutHeader = document.querySelector(".contact__header");
//   aboutHeader.classList.add("box-header--active");

//   //Close Inner About-Box
//   let innerAboutBox = document.querySelector(".inner__about-box");
//   innerAboutBox.classList.remove("box__inner--enter");
//   innerAboutBox.style.width = aboutBox.clientWidth + "px";
// });
