// PAGE LOAD
window.onload = function () {
    loadHeader()
    loadPopup()
};

function loadHeader() {
    $('#header').addClass("show")
}

// "STICKY" NAVIGATION BAR
document.addEventListener('DOMContentLoaded', function () {
    // When the event DOMContentLoaded occurs, it is safe to access the DOM

    // When the user scrolls the page, execute myFunction
    window.addEventListener('scroll', stickyNavigation);

    // Get the navbar
    var navbar = document.getElementById("navbar");
    var navbarLinks = document.getElementById("nav-link-div");

    var sticky = navbar.offsetTop;

    function stickyNavigation() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky");
            navbarLinks.classList.add("stickyNavLinks");
        } else {
            navbar.classList.remove("sticky");
            navbarLinks.classList.remove("stickyNavLinks");
        }
    }
});


// // TOP SCROLL
// var isBodyClickedTop = false;
//     function scrollToTop() {
//       if(isBodyClickedTop === false){
//         $("html, body").animate({ scrollTop: 0 }, "slow");
//       }
//       isBodyClickedTop = true;
//     }
//
// // BOTTOM SCROLL
// var isBodyClickedBottom = false;
//     function scrollToBottom() {
//
//       if(isBodyClickedBottom === false){
//         $("html, body").animate({ scrollTop: document.body.scrollHeight }, "slow");
//       }
//       isBodyClickedBottom = true;
//     }

// DYNAMIC FOOTER
$(function () {
    $(window).scroll(function () {

        var body = document.body,
            html = document.documentElement;

        var height = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);

        toScroll = $(document).height() - $(window).height() - 250;

        if ($(this).scrollTop() > toScroll) {
            $('#footer').addClass("show");
        } else {
            $('#footer').removeClass("show");
        }
    });
});


// DARK MODE
// $(document).ready(function () {
//     $('.logo').click(function () {
//         $('.logo').toggleClass('active');
//         $('body').toggleClass('dark');
//     })
// });


function darkMode() {
    console.log("DARK MODE TOGGLED");
    $('.logo').toggleClass('active');
    $('body').toggleClass('dark');
}


// POPUP

function loadPopup() {
    // Get the modal
    var modal = document.getElementById("myModal");
    var body = document.getElementsByName("body");

// Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById("myImg");
    console.log("PASS");
    var modalImg = document.getElementById("img01");
    console.log("PASS");
    var captionText = document.getElementById("caption");
    console.log("PASS");


    img.onclick = function () {
        console.log("PASS");

        modal.style.display = "block";

        modalImg.src = this.src;
        captionText.innerHTML = this.alt;

        // When the modal is shown, we want a fixed body
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollY}px`;

    };

// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };

    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);

      }
    }

}