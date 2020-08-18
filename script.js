// PAGE LOAD
window.onload = function () {
    loadHeader();
    displayInfo();
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
function darkMode() {
    console.log("DARK MODE TOGGLED");
    $('.logo').toggleClass('active');
    $('body').toggleClass('dark');
}


// POPUP
function loadPopup() {
    // Get the modal
    var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
    var imgLandscape = document.getElementById("imgLandscape");
    var imgPortrait = document.getElementById("imgPortrait");

    var modalImgL = document.getElementById("img01");
    var modalImgP = document.getElementById("img02");

    f();

    function f() {
        modal.style.display = "block";

        if (document.documentElement.clientWidth <= 800) {
            modalImgL.src = imgPortrait.src;
            // console.log("PORTRAIT");
        } else {
            modalImgP.src = imgLandscape.src;
            // console.log("LANDSCAPE");
        }

        // When the modal is shown, we want a fixed body
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollY}px`;
    }

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

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    };
}

// COOKIE
function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr === -1)
        endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}

/**
 * @return {null}
 */
function getCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) === arg)
            return getCookieVal(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i === 0)
            break;
    }
    return null;
}

function setCookie(name, value) {
    var argv = setCookie.arguments;
    var argc = setCookie.arguments.length;
    var expires = (2 < argc) ? argv[2] : null;
    var path = (3 < argc) ? argv[3] : null;
    var domain = (4 < argc) ? argv[4] : null;
    var secure = (5 < argc) ? argv[5] : false;
    document.cookie = name + "=" + escape(value) +
        ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
        ((path == null) ? "" : ("; path=" + path)) +
        ((domain == null) ? "" : ("; domain=" + domain)) +
        ((secure === true) ? "; secure" : "");
}

function displayInfo() {
    var expdate = new Date();
    var visit;
    expdate.setTime(expdate.getTime() + (24 * 60 * 60 * 1000 * 365));
    if (!(visit = getCookie("visit")))
        visit = 0;
    visit++;
    setCookie("visit", visit, expdate, "/", null, false);
    var message;
    if (visit === 0 || visit === 1) {
        loadPopup();
    }
    if (visit > 1) {
        message = "           I see you came back !";
    }
    if (visit === 15){
        console.log("RESET");
        resetCounts();
    }

    console.log("\n" + "Your browser has visited this page               \n"
        + "                              " + visit + "\n"
        + "                          time(s)." + "\n" + "\n"
        + message);
}

function resetCounts() {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() + (24 * 60 * 60 * 1000 * 365));
    visit = 0;
    setCookie("visit", visit, expdate, "/", null, false);
    history.go(1);
}

