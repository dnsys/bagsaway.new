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
        this._mobileMenuActions();
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
        let $header = $("header"),
            $clone = $header.before($header.clone().addClass("clone"));

        $(window).on("scroll", function() {
            let fromTop = $(window).scrollTop();
            $("body").toggleClass("down", (fromTop > 400));
        });
    }

    _triggerAnchors(){
        $(document).on("scroll", this._onScroll.bind(this));

        $(document).on('click', 'a[href^="#"]', (e) => {
            e.preventDefault();
            console.log('123');
            $(document).off("scroll", this._onScroll.bind(this));
            let target = e.currentTarget.hash;
            let $target = $(target);
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top+2
            }, 500, () => {
                window.location.hash = target;
                this._onScroll();
                $(document).on("scroll", this._onScroll.bind(this));
            });
        });
    }

    _onScroll(event){
        let scrollPos = $(document).scrollTop();
        let $menuItems = $('.main-menu__item');
        $menuItems.removeClass("active");
        $menuItems.each((index, elem) => {
            let currLink = $(elem);
            let refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                currLink.addClass("active");
            }
            else{
                currLink.removeClass("active");
            }
        });
    }

    _burgerClick(){
        $(document).on('click', '.header__burger', function () {
            let $this = $(this);
            $this.toggleClass('open');
            $this.parents('.container').siblings('.mobile-menu').slideToggle();
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

    _mobileMenuActions(){
        let $mobileMenu = $('.mobile-menu');

    }
}

new Application();
