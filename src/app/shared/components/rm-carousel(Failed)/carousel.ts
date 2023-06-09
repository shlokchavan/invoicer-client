import {Properties} from './interfaces';

export class Carousel {
    cellsElement: HTMLElement;

    /* The slide length has been limited by the limitSlideLength() method */
    isSlideLengthLimited: boolean;

    isContentImages: boolean = true;
    visibleWidth: number;
    isLazyLoad: boolean = true;
    isContainerLocked: boolean = true;
    alignCells: "left" | "center" = "left";
    initialContainerPosition: number = 0;
    autoplayId: any;
    startTime;
    containerPullLimit = 100;

    get cellLength() {
        return this.cells.cellLength;
    }

    get cellLengthInLightDOMMode() {
        if (this.images) {
            let cellLength = this.numberOfVisibleCells + this.overflowCellsLimit * 2;
            if (cellLength > this.images.length) {
                cellLength = this.images.length;
            }
            return cellLength;
        } else if(this.dataForDOM) {
            let cellLength = this.numberOfVisibleCells + this.overflowCellsLimit * 2;
            if (cellLength > this.dataForDOM.length) {
                cellLength = this.dataForDOM.length;
            }
            return cellLength;
        } else {
            return this.cellLength;
        }
    }

    get lastCellIndex() {
        if(this.images) 
            return this.images.length ? (this.images.length - 1) : (this.cells.cellLength - 1);
        else if(this.dataForDOM)
            return this.dataForDOM.length ? (this.dataForDOM.length - 1) : (this.cells.cellLength - 1);
    }

    get overflowCellsLimit() {
        return this.utils.overflowCellsLimit;
    }

    get cellLimit() {
        if (this.isLightDOM) {
            let cellLimit = this.numberOfVisibleCells + this.overflowCellsLimit * 2;

            if (cellLimit < this.numberOfVisibleCells) {
                cellLimit = this.numberOfVisibleCells;
            }

            return cellLimit;
        } else {
            return this.properties.images ? this.properties.images.length : this.properties.dataForDOM.length;
        }
    }

    get isLightDOM() {
        return this.properties.lightDOM || this.properties.loop;
    }

    get images() {
        return this.properties.images;
    }

    get dataForDOM() {
        return this.properties.dataForDOM;
    }

    get margin() {
        return this.properties.margin;
    }

    get minSwipeDistance() {
        return this.properties.minSwipeDistance;
    }

    get transitionDuration() {
        return this.properties.transitionDuration;
    }

    get transitionTimingFunction() {
        return this.properties.transitionTimingFunction;
    }

    get fullCellWidth() {
        return this.properties.cellWidth + this.margin;
    }

    get numberOfVisibleCells() {
        return this.utils.numberOfVisibleCells;
    }

    get lapCounter() {
        return Math.floor(this.slide.counter / this.cellLengthInLightDOMMode);
    }

    get slideCounter() {
        return this.slide.counter;
    }

    constructor(
        private properties: Properties,
        private utils,
        private cells,
        private container,
        private slide) {

        this.init();
    }

    updateProperties(properties: Properties) {
        this.properties = properties;
    }

    init() {
        this.cellsElement = this.properties.cellsElement;
        this.visibleWidth = this.properties.visibleWidth || this.cellsElement.parentElement.clientWidth;
    }

    destroy() {
        clearInterval(this.autoplayId);
    }

    lineUpCells() {
        this.cells.lineUp();
    }

    handleTouchstart = (event: any) => {
        this.container.handleTouchstart();
        this.slide.handleTouchstart(event);
    }

    handleHorizontalSwipe = (event: any) => {
        this.container.handleHorizontalSwipe();
    }

    handleTouchend = (event: any) => {
        if (this.properties.freeScroll) {
            this.container.handleTouchend();
        } else {
            this.container.handleTouchend(true);
            this.slide.handleTouchend(event);
        }
    }

    handleTransitionend() {
        this.slide.handleTransitionend();
    }

    getImage(index) {
        return this.cells.getImage(index);
    }

    getDOM(index) {
        return this.cells.getDOM(index);
    }

    next(length: number = 1) {
        if (!this.isNextArrowDisabled()) {
            this.slide.next(length);
        }
    }

    prev(length: number = 1) {
        if(!this.isPrevArrowDisabled()) {
            this.slide.prev(length);
        }
    }

    isNextArrowDisabled = () => {
        return this.slide.isNextArrowDisabled();
    }

    isPrevArrowDisabled = () => {
        return this.slide.isPrevArrowDisabled();
    }

    autoplay() {
        this.autoplayId = setInterval(() => {
            this.next();
        }, this.properties.autoplayInterval);
    }

    stopAutoplay() {
        if (this.autoplayId) {
            clearInterval(this.autoplayId);
        }
    }
}