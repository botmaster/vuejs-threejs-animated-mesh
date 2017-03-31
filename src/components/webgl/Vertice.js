/**
 * Created by pascal on 30/03/2017.
 */

import {TweenMax} from "gsap";

class Vertice {
    constructor(ov) {
        this.vertice = ov;
        this.originVertice = {
            x: ov.x,
            y: ov.y,
            z: ov.z
        };
    }

    animateMe() {
        let max = .18;
        let min = -.18;


        TweenMax.to(this.vertice, Vertice.randomRange(5, 10), {
            x: Vertice.randomRange(this.originVertice.x + min, this.originVertice.x + max),
            y: Vertice.randomRange(this.originVertice.y + min, this.originVertice.y + max),
            z: Vertice.randomRange(this.originVertice.z + (min + 0.1), this.originVertice.z + (max - 0.08)),
            onComplete: () => {
                this.animateMe();
            },
            ease: Power2.easeInOut
        })
    }

    static randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }
}

export default Vertice;
