import { applyInertialScroll } from "./inertialScroll";

const DRAGSCROLL_CLASS_NAME = "dragscroll";
const HIDDEN_CLASS_NAME = "hidden";
const CARD_POPUP_DELAY = 200;

class Slider {
    constructor({ elements, onInit, onResize }) {
        this._elements = elements;
        this._onInit = onInit;
        this._onResize = onResize;
        this.isShown = false;
    }

    init() {
        if (this._onInit) this._onInit();
        if (this._onResize) $(window).on("resize", this._onResize);
        
        this._enableInertialScroll();
        this._show();
        $(window).on("scroll", () => this._show());
    }

    _enableInertialScroll() {
        const { wrapper } = this._elements;
        if (!wrapper.hasClass(DRAGSCROLL_CLASS_NAME)) return;
        applyInertialScroll(wrapper);
    }

    _sliderInViewport() {
        const { slider } = this._elements;
        const sliderFromTop = slider.offset().top + slider.outerHeight() / 3;
        const scrolledFromTop = $(window).scrollTop() + $(window).height();
        return scrolledFromTop > sliderFromTop;
    }

    _show() {
        if (!this._sliderInViewport()) return;

        this._showCardsWithAnimation();
        this.isShown = true;
    }

    _showCardsWithAnimation() {
        const { cards } = this._elements;

        let i = 0;

        const animateInterval = setInterval(() => {
            cards.eq(i).removeClass(HIDDEN_CLASS_NAME);
            if (i >= cards.length) clearInterval(animateInterval);
            i++;
        }, CARD_POPUP_DELAY);
    }
}

export default Slider;