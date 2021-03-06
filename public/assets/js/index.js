$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (event) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000, function () {
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) {
                    return false;
                } else {
                    $target.attr('tabindex', '-1');
                    $target.focus();
                };
            });
        }
    }
});

function isOnScreen(elem) {
    // if the element doesn't exist, abort
    if (elem.length == 0) {
        return;
    }
    var $window = jQuery(window);
    var viewport_top = $window.scrollTop();
    var viewport_height = $window.height();
    var viewport_bottom = viewport_top + viewport_height;
    var $elem = jQuery(elem);
    var top = $elem.offset().top;
    var height = $elem.height();
    var bottom = top + height;

    return (bottom > viewport_top) && (top < viewport_bottom);
}

// Test via a getter in the options object to see if the passive property is accessed
var supportsPassive = false;
try {
    var opts = Object.defineProperty({}, 'passive', {
        get: function () {
            supportsPassive = true;
        }
    });
    window.addEventListener("testPassive", null, opts);
    window.removeEventListener("testPassive", null, opts);
} catch (e) {};

var p = false;
// Is on screen
window.addEventListener('scroll', () => {
    if (isOnScreen($('#about'))) {
        $('header.side li a[href="#about"]').addClass('active');
    } else {
        $('header.side li a[href="#about"]').removeClass('active');
    }

    if (isOnScreen($('#work'))) {
        $('header.side li a[href="#work"]').addClass('active');
        $('header.side *').css({
            'color': 'var(--pink)'
        });
    } else {
        $('header.side li a[href="#work"]').removeClass('active');
        $('header.side *').css({
            'color': 'var(--black)'
        });
    }

    if (isOnScreen($('#scripts'))) {
        $('header.side li a[href="#scripts"]').addClass('active');
    } else {
        $('header.side li a[href="#scripts"]').removeClass('active');
    }

    if (isOnScreen($('#contact'))) {
        $('header.side li a[href="#contact"]').addClass('active');
    } else {
        $('header.side li a[href="#contact"]').removeClass('active');
    }
}, supportsPassive ? {
    passive: true
} : false);

// Work frames
$('.frame a').on('mouseover', (e) => {
    const vid = e.currentTarget.nextElementSibling.id;
    e.currentTarget.style.opacity = "0.1";
    $(`#${vid}`).css('z-index', '2').animate({
        'opacity': 1
    }).get(0).play();
});

$('.frame').on('mouseleave', (e) => {
    const vid = e.currentTarget.children[2].id;
    e.currentTarget.children[1].style.opacity = "1";
    $(`#${vid}`).animate({
        'opacity': 0
    }, 500, () => {
        document.getElementById(vid).currentTime = 0;
    }).css('z-index', '-1').get(0).pause();
});

$('.frame video').on('ended', (e) => {
    const vid = e.currentTarget.id;
    $(`#${vid}`).animate({
        'opacity': 0
    }, 500, () => {
        document.getElementById(vid).currentTime = 0;
    }).css('z-index', '-1').get(0).pause();
});

$(function() {
    $('#contact-form').submit(function(event) {
        event.preventDefault(); // Stops browser from navigating away from page
        var data = $('#contact-form').serialize();
        $.post('/email', data, function(resp) {
            alert('Success! Email sent.');
        });
    });
});