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
        let max = .14;
        let min = -.14;


        TweenMax.to(this.vertice, Vertice.randomRange(1.5, 3), {
            x: Vertice.randomRange(this.originVertice.x + min, this.originVertice.x + max),
            y: Vertice.randomRange(this.originVertice.y + min, this.originVertice.y + max),
            z: Vertice.randomRange(this.originVertice.z + min, this.originVertice.z + max),
            onComplete: () => {
                this.animateMe();
            },
            ease: Circ.easeInOut
        })
    }

    static randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }
}

export default Vertice;
