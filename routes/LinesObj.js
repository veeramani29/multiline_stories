'use strict';
module.exports = class LinesObj {
    constructor(text) {
        this.text = text;
    }
    /**
    Append dynamic props
     */
    addPath(story, layout) {
        switch (layout) {
            case "T":
                this.LayoutT = story;
                break;
            case "L":
                this.LayoutL = story;
                break;
            case "R":
                this.LayoutR = story;
                break;
            case "B":
                this.LayoutB = story;
                break;
        }
    }
    /**
     * Get dynamic props
     */
    getPath(layout) {
        switch (layout) {
            case "T":
                return this.LayoutT;
            case "L":
                return this.LayoutL;
            case "R":
                return this.LayoutR;
            case "B":
                return this.LayoutB;
        }
    }




}
