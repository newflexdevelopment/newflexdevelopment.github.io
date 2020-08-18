// PAGE LOAD
window.onload = function () {
    cookieDarkMode();

    loadHeader();
    // darkModePopup();
    setDarkModeCookie();
    getDarkModeCookie();

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

// DARK MODE COOKIE
function cookieDarkMode() {
    var $body = $('body');

    if ($body.hasClass('dark') == false && Cookies.get("darkMode", {domain: 'localhost'}) === 'true') {
        console.log("DARK MODE = " + $body.hasClass('dark') + ", should be TRUE so TURN DARK MODE ON ");
        $body.toggleClass('dark');
    }

    if ($body.hasClass('dark') == true && Cookies.get("darkMode", {domain: 'localhost'}) === 'false') {
        console.log("DARK MODE = " + $body.hasClass('dark') + ", should be TRUE so TURN DARK MODE ON ");
        $body.toggleClass('dark');
    }
}


function darkMode() {
    // console.log("DARK MODE TOGGLED");
    var $body = $('body');
    $body.toggleClass('dark');

    setDarkModeCookie();
    getDarkModeCookie();
}

function setDarkModeCookie() {
    var $body = $('body');

    if ($body.hasClass('dark') == false) {
        console.log("DARK MODE = " + $body.hasClass('dark'));
        Cookies.set("darkMode", 'false');
    }

    if ($body.hasClass('dark') == true) {
        console.log("DARK MODE = " + $body.hasClass('dark'));
        Cookies.set("darkMode", 'true');
    }
}

function getDarkModeCookie() {
    if (Cookies.get("darkMode", {domain: 'localhost'}) === 'false') {
        console.log("DARK MODE COOKIE FALSE");
    }

    if (Cookies.get("darkMode", {domain: 'localhost'}) === 'true') {
        console.log("DARK MODE COOKIE TRUE");
    }

}


// COOKIE NOTICE

function handleCookiesNotice() {
    // When you close the notice
    $('.js_cookieNotice .js_closeButton').click(function () {
        $(this).closest('.js_cookieNotice').slideUp();
        handleDarkModeNotice();

        // const scrollY = document.body.style.top;
        // document.body.style.position = '';
        // document.body.style.top = '';
        // window.scrollTo(0, parseInt(scrollY || '0') * -1);

        // Add a cookie so it doesn't show for a year
        $.cookie('cookieNotice', 1, {
            expires: 365,
            path: '/'
        });
    });
    // Only show if it hasn't been closed before
    if (!$.cookie('cookieNotice')) {
        $('.js_cookieNotice').slideDown();


        // When the modal is shown, we want a fixed body
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollY}px`;

        // document.getElementById("logo").addEventListener("click", function(event){
        //     event.preventDefault();
        // });

        $("a").click(function (event) {
            event.preventDefault();
        });


    }
}

// handleModalNotice

function handleDarkModeNotice() {
    // When you close the notice
    $('.close').click(function () {
        // Add a cookie so it doesn't show for a year
        $.cookie('darkModeNotice', 1, {
            expires: 365,
            path: '/'
        });
    });
    // Only show if it hasn't been closed before
    if (!$.cookie('darkModeNotice')) {
        // When the modal is shown, we want a fixed body
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollY}px`;
        loadPopup();

    }
}

$(document).ready(function () {
    handleCookiesNotice();

    // handleDarkModeNotice();
});

// DEPENDENCIES
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD (Register as an anonymous module)
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch (e) {
        }
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (arguments.length > 1 && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {},
            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling $.cookie().
            cookies = document.cookie ? document.cookie.split('; ') : [],
            i = 0,
            l = cookies.length;

        for (; i < l; i++) {
            var parts = cookies[i].split('='),
                name = decode(parts.shift()),
                cookie = parts.join('=');

            if (key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, {expires: -1}));
        return !$.cookie(key);
    };

}));


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

// VISITED? COOKIE
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

// function darkModePopup() {
//     var expdate = new Date();
//     var visit;
//     expdate.setTime(expdate.getTime() + (24 * 60 * 60 * 1000 * 365));
//     if (!(visit = getCookie("pageVisits")))
//         visit = 0;
//     visit++;
//     setCookie("pageVisits", visit, expdate, "/", null, false);
//     var message;
//     if (visit === 0 || visit === 1) {
//         loadPopup();
//     }
//     if (visit > 1) {
//         message = "           I see you came back !";
//     }
//     if (visit === 15) {
//         console.log("RESET");
//         resetCounts();
//     }
//
//     // console.log("\n" + "Your browser has visited this page               \n"
//     //     + "                              " + visit + "\n"
//     //     + "                          time(s)." + "\n" + "\n"
//     //     + message);
// }

function resetCounts() {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() + (24 * 60 * 60 * 1000 * 365));
    visit = 0;
    setCookie("pageVisits", visit, expdate, "/", null, false);
    history.go(1);
}

