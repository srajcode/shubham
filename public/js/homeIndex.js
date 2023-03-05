
$(document).ready(()=>{


    $('.carouselSuggestedItems').owlCarousel({
    loop:true,
    margin:10,
    dots:false,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    autoHeight: false,
    autoHeightClass: 'owl-height',
    stagePadding:50,
    autoHeight:true,
    responsive:{
        0:{items:1},
        600:{items:3},
        1000:{items:7}
    }
    })



    $('.contentByCategory').owlCarousel({
    loop:true,
    margin:10,
    dots:false,
    nav:true,
    navText:['<span><i class="fa-solid fa-circle-left"></i></span>','<span><i class="fa-solid fa-circle-right"></i></span>'],
    // autoplay:true,
    // autoplayTimeout:1000,
    // autoplayHoverPause:true,
    autoHeight: false,
    // autoHeightClass: 'owl-height',
    stagePadding:30,
    // autoHeight:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:6
        }
    }
    })




    $(function() {
    $('marquee').mouseover(function() {
        $(this).attr('scrollamount',0);
    }).mouseout(function() {
         $(this).attr('scrollamount',5);
    });
    });


    

})

document.querySelector('.loginTag button').onclick=function(){
    var loginModal= document.getElementsByClassName('loginModal');
    loginModal[0].classList.add('loginModal_show');
};

document.getElementById('hideLogin').onclick=function(){
    var loginModal= document.getElementsByClassName('loginModal');
    loginModal[0].classList.remove('loginModal_show');
};

