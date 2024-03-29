// wait for html to load in browser before executing javascript code
document.addEventListener("DOMContentLoaded", ready);

function ready() {
  // ##### Loading function -> fades out loading screen once portrait photo is loaded (largest image used in website)
  let body = document.body;
  function loaded() {
    body.classList.add("loaded");
  }

  var img = document.querySelector(".portrait-img");
  if (img.complete) {
    loaded();
  } else {
    img.addEventListener("load", loaded);
    img.addEventListener("error", function() {
      alert("error");
    });
  }

  /* #################################            BOX  FUNCTIONS         ############################################*/

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
    //Close previously open inner box (flex: 1)
    box.classList.remove("box--active");
    //Show previously open inner box (now closed) clickable again (cursor: pointer)
    box.classList.add("box--inactive");

    //Let Header on outer Box be visible on previously open box
    let boxHeader = box.querySelector(".box__header");
    if (boxHeader) boxHeader.classList.remove("box-header--active");
  }

  function addActiveClasses(box) {
    //Open newly clicked inner box (flex: 8)
    box.classList.add("box--active");
    //Show now open inner box (now closed) is no longer clickable  (cursor: default)
    box.classList.remove("box--inactive");

    //Remove Header from newly clicked (now opening) box (header opacity: 0)
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
    //listen for click event on box ("box" is the clicked boc)
    box.addEventListener("click", function(event) {
      let activeBox;
      // reset state by removing all active classes
      //"_box" is the current value box
      boxes.forEach(_box => {
        //Rule for logo box -->  If logo box is active and clicked again, do not change from active to inactive class
        if (
          box.classList.contains("logo-box") &&
          box.classList.contains("box--active")
        )
          return;

        if (_box.classList.contains("box--active")) {
          removeActiveClasses(_box);
          // save the current active box for later (see below)
          activeBox = _box;
        }
      });

      if (box !== activeBox) {
        //if clicked box is not the already active box, give it active class and open the  clicked box
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

  /* #################################     Functionality of Link in "About box"  which opens "Contact box"     ############################################*/

  let contactLinks = document.querySelectorAll(".contact-link");
  contactLinks.forEach(contactLink => {
    contactLink.addEventListener("click", function() {
      let contactBox = document.querySelector(".contact-box");
      let aboutBox = document.querySelector(".about-box");
      //open contact box
      addActiveClasses(contactBox);
      //close about box
      removeActiveClasses(aboutBox);
    });
  });

  /* #################################     Functionality of Link in "About box"  which opens "Contact box"     ############################################*/

  let projectLink = document.querySelector(".project-link");

  projectLink.addEventListener("click", function() {
    let projectBox = document.querySelector(".portfolio-box");
    let aboutBox = document.querySelector(".about-box");
    //open project box
    addActiveClasses(projectBox);
    //close about box
    removeActiveClasses(aboutBox);
  });
}
