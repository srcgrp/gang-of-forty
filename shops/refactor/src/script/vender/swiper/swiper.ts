
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import "./swiper.css"

const initSwiper = (): void => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    new Swiper('.swiper', {
        slidesPerView: 1,
        loop: true,
        speed: 800,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        autoplay: reduceMotion
            ? false
            : {
                  delay: 3500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
              },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
    });
};

export default initSwiper;