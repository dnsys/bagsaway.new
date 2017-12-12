//VENDORS
window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');
require('jquery-nice-select');
require('slick-carousel');

class Application{
    constructor(){
        this._langSwitcher();
        this._searchComponent();
        this._sliderReviews();
        this._accordionAnimate();
        this._stickyHeader();
        this._triggerAnchors();
    }

    _langSwitcher(){
        $('select.lang-switch-select').niceSelect();
    }

    _searchComponent(){
        $('select.search-select').niceSelect();
    }

    _sliderReviews(){
        $('.reviews-block').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
        });
    }

    _accordionAnimate(){
        let acc = document.getElementsByClassName("js-accordion-faq");
        let i;

        for (i = 0; i < acc.length; i++) {
            acc[i].onclick = function() {
                let accBody = this.nextElementSibling;
                this.classList.toggle("active");
                if (accBody.style.maxHeight){
                    accBody.style.maxHeight = null;
                } else {
                    accBody.style.maxHeight = accBody.scrollHeight + "px";
                }
            }
        }
    }

    _stickyHeader(){
        $(document).ready(function() {
            let $header = $("header"),
                $clone = $header.before($header.clone().addClass("clone"));

            $(window).on("scroll", function() {
                let fromTop = $(window).scrollTop();
                $("body").toggleClass("down", (fromTop > 400));
            });
        });
    }

    _triggerAnchors(){
        $(document).on("scroll", this._onScroll());
        $('a[href^="#"]').on('click', (e) => {
            e.preventDefault();
            $(document).off("scroll");

            $('a').each(function () {
                $(this).removeClass('active');
            });
            $(this).addClass('active');

            let target = this.hash,
                menu = target;
            let $target = $(target);
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top+2
            }, 500, 'swing', function () {
                window.location.hash = target;
                $(document).on("scroll", this._onScroll());
            });
        });
    }

    _onScroll(event){
        let scrollPos = $(document).scrollTop();
        $('.main-menu__item').each(function () {
            let currLink = $(this);
            let refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.main-menu__item').removeClass("active");
                currLink.addClass("active");
            }
            else{
                currLink.removeClass("active");
            }
        });
    }
}

new Application();
