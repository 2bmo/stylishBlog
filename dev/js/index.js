let windowWidth = window.innerWidth,
    newsHeaders = document.getElementsByClassName("news__header");
    
$(document).ready(function(){
    $('.slick').slick({
        infinite: true,
        dots: false,
        speed: 400,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 1500
    });
    let slickArrow = document.getElementsByClassName("slick-arrow");
    for (let i=0; i < slickArrow.length; i++) {
        slickArrow[i].innerHTML = "";
    }
    $('#lightgallery').lightGallery();
    $('.videos button').on('click', '[data-my-lightbox]', lity);
    if (windowWidth < 1180) {
        for (let i=0; i < newsHeaders.length; i++) {
            newsHeaders[i].innerHTML = "Рафаэль Надаль проиграл сотой ракетке мира. Испанский теннесист Рафаэль На...";
        }
        $('.news').after($('.slick'));
        $('.left-col .headlines').after($('.right-col .left-right'));
        $('.comments').wrap('<div class="left-right"></div>').after($('.archives'));
    }
    if (windowWidth < 820) {
        $('.page-title form').before('<button id="toggle-menu">Меню</button>');
        $('#toggle-menu').click(function () {
            $('.navigation').toggle(400);
        });
        $('.photos li').addClass('photos__photo_upper');
    }
    if (windowWidth < 480) {
        $('.slick').remove();
        $('.page-title form').after($('#toggle-menu'));
    }
    for (let i=0; i < newsHeaders.length; i++) {
        newsHeaders[i].innerHTML = "Рафаэль Надаль проиграл сотой...";
    }
});