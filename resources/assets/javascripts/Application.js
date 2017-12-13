//VENDORS
window.$ = window.jQuery = require('jquery');
require('jquery-ui/ui/widgets/datepicker');
require('bootstrap-sass');
require('jquery-nice-select');
require('slick-carousel');
require('wickedpicker');

class Application{
    constructor(){
        this._langSwitcher();
        this._searchComponent();
        this._sliderReviews();
        this._howItWorksSlider();
        this._accordionAnimate();
        this._stickyHeader();
        this._triggerAnchors();
        this._burgerClick();
        this._datePicker();
        this._timePicker();
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
            dots: false,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false
                    }
                },
            ]
        });
    }

    _howItWorksSlider(){
        let $window = $(window);
        let $carousel = $('.it-works');
        let widthScreen = $window.width();

        $window.ready(this._showSliderScreen(widthScreen, $carousel)).on('resize', () => {
                let widthScreen = $window.width();
                this._showSliderScreen(widthScreen, $carousel);
            }
        );

    }

    _showSliderScreen($widthScreen, $carousel){
        console.log($widthScreen);

        if ($widthScreen <= "890") {
            if (!$carousel.hasClass('slick-initialized')) {
                $carousel.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                });
            }

        } else {
            if ($carousel.hasClass('slick-initialized')) {
                $carousel.slick('unslick');
            }
        }
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

    _burgerClick(){
        $('.header__burger').on('click', function () {
            let $this = $(this);
            $this.toggleClass('open');
        });
    }

    _datePicker(){
        $('.date-picker').datepicker({
            showOtherMonths: true,
            beforeShow: function(input, inst) {
                $('#ui-datepicker-div').addClass('custom-datepicker');
            }
        });
    }

    _timePicker(){
        $('.custom-timepicker').wickedpicker();
    }
}

new Application();
