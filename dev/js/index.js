let windowWidth = window.innerWidth,
    newsHeaders = document.getElementsByClassName("news__header"),
    headlines = document.getElementsByClassName("headlines");

function vanish(element) {
    element.parentElement.removeChild(element);
}

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
        vanish(headlines[2]);
    }
});