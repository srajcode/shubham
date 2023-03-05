(function($) {
    "use strict";
 
    /*****************************
     * Commons Variables
     *****************************/
    var $window = $(window),
        $body = $('body');


        $window.on("load", () => {
            const loader = document.querySelector(".loader");
          
            loader.classList.add("loader--hidden");
            document.body.removeChild(loader);
          
            // loader.addEventListener("transitionend", () => {
            
          });
 
    /****************************
     * Sticky Menu
     *****************************/
    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();
        if (scroll < 100) {
            $(".sticky-header").removeClass("sticky");
        } else {
            $(".sticky-header").addClass("sticky");
        }
    });
 
    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();
        if (scroll < 100) {
            $(".seperate-sticky-bar").removeClass("sticky");
        } else {
            $(".seperate-sticky-bar").addClass("sticky");
        }
    });
 


    /************************************************
     * show filter left pane in category page
     ***********************************************/
    $('.filterby').on('click',function(){
        $('.filterLeftPanel, .mod-filterfeature').addClass('active');
     })

     $('.filterCross-icon').on('click',function(){
        $('.filterLeftPanel, .mod-filterfeature').removeClass('active');
     })




    /************************************************
     * ADDRESS Modal Search
     ***********************************************/
    $('#close').addClass('close');
    $('a[href="#searchLocation"]').on('click', function(event) {
        event.preventDefault();
        $('#searchLocation').addClass('open').removeClass('close');
        $('#searchLocation > input[type="searchLocation"]').focus();
    });
 
    $('#searchLocation, #searchLocation button.close').on('click', function(event) {
        if ( event.target.className == 'close' ) {
            $(this).removeClass('open');
            $('#searchLocation').addClass('close').removeClass('open');
        }
    });
 

        if($('.selectCity').length){
        $('.selectCity').select2({
            placeholder: 'Choose State',
            dropdownParent:"#searchLocation"
            });
        }

    // $('#pincode').css('display','none');
    // $("input[id='lblState']").on("change", function () {
    //     $('#pincode').css('display','none');
    //  });
    //  $("input[id='lblCity']").on("change", function () {
    //     $('#pincode').css('display','');
    //  });

    //  ****************ADDRESS Modal********************/

    //search bar starts in computer******************************************
    $('.searchList').addClass('hideSearchList');
    $(".showHideSearchList").on("focus",function (event){
        event.preventDefault();
        $('.searchList').addClass('showSearchList').removeClass('hideSearchList');
     });
     $(".showHideSearchList").on("blur",function (event){
        event.preventDefault();
        $('.searchList').addClass('hideSearchList').removeClass('showSearchList');
    });
    //search bar ends******************************************        

    // search item inn mobile
    // $('#close').addClass('close');
    $('a[href="#searchItemInMobile"]').on('click', function(event) {
        event.preventDefault();
        $('#searchItemInMobile').addClass('open').removeClass('close');
        // $('#searchItemInMobile > input[type="searchLocation"]').focus();
    });
 
    $('#searchItemInMobile, #searchItemInMobile button.close').on('click', function(event) {
        if ( event.target.className == 'close' ) {
            $(this).removeClass('open');
            $('#searchItemInMobile').addClass('close').removeClass('open');
        }
    });
    // search item inn mobile




    /*****************************
     * Off Canvas Function
     *****************************/
    (function() {
        var $offCanvasToggle = $('.offcanvas-toggle'),
            $offCanvas = $('.offcanvas'),
            $offCanvasOverlay = $('.offcanvas-overlay'),
            $mobileMenuToggle = $('.mobile-menu-toggle');
        $offCanvasToggle.on('click', function(e) {
            e.preventDefault();
            var $this = $(this),
                $target = $this.attr('href');
            $body.addClass('offcanvas-open');
            $($target).addClass('offcanvas-open');
            $offCanvasOverlay.fadeIn();
            if ($this.parent().hasClass('mobile-menu-toggle')) {
                $this.addClass('close');
            }
        });
        $('.offcanvas-close, .offcanvas-overlay').on('click', function(e) {
            e.preventDefault();
            $body.removeClass('offcanvas-open');
            $offCanvas.removeClass('offcanvas-open');
            $offCanvasOverlay.fadeOut();
            $mobileMenuToggle.find('a').removeClass('close');
        });
    })();
 
 
    /**************************
     * Offcanvas: Menu Content
     **************************/
    function mobileOffCanvasMenu() {
        var $offCanvasNav = $('.offcanvas-menu'),
            $offCanvasNavSubMenu = $offCanvasNav.find('.mobile-sub-menu');
 
        /*Add Toggle Button With Off Canvas Sub Menu*/
        $offCanvasNavSubMenu.parent().prepend('<div class="offcanvas-menu-expand"></div>');
 
        /*Category Sub Menu Toggle*/
        $offCanvasNav.on('click', 'li a, .offcanvas-menu-expand', function(e) {
            var $this = $(this);
            if ($this.attr('href') === '#' || $this.hasClass('offcanvas-menu-expand')) {
                e.preventDefault();
                if ($this.siblings('ul:visible').length) {
                    $this.parent('li').removeClass('active');
                    $this.siblings('ul').slideUp();
                    $this.parent('li').find('li').removeClass('active');
                    $this.parent('li').find('ul:visible').slideUp();
                } else {
                    $this.parent('li').addClass('active');
                    $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
                    $this.closest('li').siblings('li').find('ul:visible').slideUp();
                    $this.siblings('ul').slideDown();
                }
            }
        });
    }
    mobileOffCanvasMenu();
 
   
 
 
    /*************************
     *   Hero Slider Active
     **************************/
    var heroSlider = new Swiper('.hero-slider-active.swiper-container', {
        slidesPerView: 1,
        effect: "fade",
        speed: 500,
        watchSlidesProgress: true,
        loop: true,
        autoplay: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
 
 
    /****************************************
     *   Product Slider Active - 4 Grid 2 Rows
     *****************************************/
   
    // all for labels top one
    var productSlider4grid2row = new Swiper('.product-default-slider-4grid-2row.swiper-container', {
        slidesPerView: 6,
        spaceBetween: 10,
        loop:true,
        speed: 500,
        // slidesPerColumn: 1,
 
        navigation: {
            nextEl: '.product-slider-default-2rows .swiper-button-next',
            prevEl: '.product-slider-default-2rows .swiper-button-prev',
        },
 
        breakpoints: {
 
            0: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 6,
            }
        }
    });

 
    /*********************************************
     *   Product Slider Active - 4 Grid Single Rows
     **********************************************/
    // SUGGESTED FOR YOU swipper JS Settings
    var productSlider4grid1row = new Swiper('.product-default-slider-4grid-1row.swiper-container', {
        slidesPerView: 6,
        spaceBetween: 10,
        speed: 500,
        autoplay:{delay:1000,disableOnInteraction:false},
        // slidesPerColumn: 2,
        // slidesPerColumnFill: "col",
        // slidesPerGroup: 6,
        loop:true,
        navigation: {
            nextEl: '.product-slider-default-1row .swiper-button-next',
            prevEl: '.product-slider-default-1row .swiper-button-prev',
        },
 
        breakpoints: {
 
            0: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 6,
            }
        }
    });
    // stop slider on mouse hover
    $('.product-default-slider-4grid-1row.swiper-container').hover(function() {
        (this).swiper.autoplay.stop();
    }, function() {
        (this).swiper.autoplay.start();
    });
 
 
 
 
    /*********************************************
     *   Product Slider Active - 4 Grid Single 3Rows
     **********************************************/
   
    var productSliderListview4grid3row = new Swiper('.product-listview-slider-4grid-3rows.swiper-container', {
        slidesPerView: 4,
        spaceBetween: 30,
        speed: 500,
        slidesPerColumn: 3,
        slidesPerColumnFill: 'row',
 
        navigation: {
            nextEl: '.product-list-slider-3rows .swiper-button-next',
            prevEl: '.product-list-slider-3rows .swiper-button-prev',
        },
 
        breakpoints: {
 
            0: {
                slidesPerView: 1,
            },
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            }
        }
    });
 
 
    /*********************************************
     *   Blog Slider Active - 3 Grid Single Rows
     **********************************************/
    var blogSlider = new Swiper('.blog-slider.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        speed: 500,
        loop:true,
        navigation: {
            nextEl: '.blog-default-slider .swiper-button-next',
            prevEl: '.blog-default-slider .swiper-button-prev',
        },
        breakpoints: {
 
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
        }
    });
 
 
    /*********************************************
     *   Company Logo Slider Active - 7 Grid Single Rows
     **********************************************/
    // CATEGORY ICONS SWIPER IN HEADER
    var companyLogoSlider = new Swiper('.company-logo-slider.swiper-container', {
        slidesPerView: 8,
        speed: 500,
        loop:true,
        autoplay:{delay:1000,disableOnInteraction:false},
 
 
        navigation: {
            nextEl: '.company-logo-slider .swiper-button-next',
            prevEl: '.company-logo-slider .swiper-button-prev',
        },
        breakpoints: {
 
            0: {
                slidesPerView: 3,
            },
            480: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 8,
            },
        }
    });
 
        // stop slider on mouse hover
        $('.company-logo-slider.swiper-container').hover(function() {
            (this).swiper.autoplay.stop();
        }, function() {
            (this).swiper.autoplay.start();
        });
 
 
    /********************************
     *  Product Gallery - Horizontal View
     **********************************/
    var galleryThumbsHorizontal = new Swiper('.product-image-thumb-horizontal.swiper-container', {
        loop: true,
        speed: 1000,
        spaceBetween: 25,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
 
    });
 
    var gallerylargeHorizonatal = new Swiper('.product-large-image-horaizontal.swiper-container', {
        slidesPerView: 1,
        speed: 1500,
        thumbs: {
            swiper: galleryThumbsHorizontal
        }
    });
 
    /********************************
     *  Product Gallery - Vertical View
     **********************************/
    var galleryThumbsvartical = new Swiper('.product-image-thumb-vartical.swiper-container', {
        direction: 'vertical',
        centeredSlidesBounds: true,
        slidesPerView: 4,
        watchOverflow: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        spaceBetween: 25,
        freeMode: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
 
    });
 
    var gallerylargeVartical = new Swiper('.product-large-image-vartical.swiper-container', {
        slidesPerView: 1,
        speed: 1500,
        thumbs: {
            swiper: galleryThumbsvartical
        }
    });


    
    /************************************************
     * show or hide login box
     ***********************************************/
        $('#close_loginModal').on('click',function(){
            $('#modalLoginBox').removeClass('show').css('display','none').removeAttr("role");
        })
        $('a[href=#showLoginModal]').on('click',function(event){
            event.preventDefault();
            $('#modalLoginBox').addClass('show').css('display','block');
        })

        $('a[href=#showRegisterModal]').on('click',function(event){
            event.preventDefault();
            $('#modalsignupBox').addClass('show').css('display','block');
        })
        $('#close_RegisterModal').on('click',function(){
            $('#modalLoginBox').removeClass('show').css('display','none').removeAttr("role");
            $('#modalsignupBox').removeClass('show').css('display','none').removeAttr("role");
        }) 

        /********************************
     *  Product Gallery - Single Slide View
     * *********************************/
    var singleSlide = new Swiper('.product-image-single-slide.swiper-container', {
        loop: true,
        speed: 1000,
        spaceBetween: 25,
        slidesPerView: 4,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
 
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 4,
            },
        }
 
    });
 
    /******************************************************
     * Quickview Product Gallery - Horizontal
     ******************************************************/
    var modalGalleryThumbs = new Swiper('.modal-product-image-thumb', {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
 
      var modalGalleryTop = new Swiper('.modal-product-image-large', {
        thumbs: {
          swiper: modalGalleryThumbs
        }
      });
 
    /********************************
     * Blog List Slider - Single Slide
     * *********************************/
    var blogListSLider = new Swiper('.blog-list-slider.swiper-container', {
        loop: true,
        speed: 1000,
        autoplay:{delay:1000,disableOnInteraction:false,reverseDirection:true},
        slidesPerView: 1,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
 
    });
 
    /********************************
     *  Product Gallery - Image Zoom
     **********************************/
    $('.zoom-image-hover').zoom();
 
 
    /************************************************
     * Price Slider
     ***********************************************/
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 500,
        values: [75, 300],
        slide: function(event, ui) {
            $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    $("#amount").val("$" + $("#slider-range").slider("values", 0) +
        " - $" + $("#slider-range").slider("values", 1));
 
 
 
    /************************************************
     * Animate on Scroll
     ***********************************************/
    AOS.init({
       
        duration: 1000,
        once: true,
        easing: 'ease',
    });
    window.addEventListener('load', AOS.refresh);    
 
    /************************************************
     * Video  Popup
     ***********************************************/
    $('.video-play-btn').venobox();
 
    /************************************************
     * Scroll Top
     ***********************************************/
    $('body').materialScrollTop();
 


 
 
 
})(jQuery);
 

