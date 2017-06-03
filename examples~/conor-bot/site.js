'use strict'

var ConorBot = class extends com.flanvas.display.Sprite {
    constructor() {
        super();

        this.addChild(new ConorBot.Noob());
    }
}

ConorBot.Toon = class extends com.flanvas.display.Sprite {
    constructor() {
        super(); 

        this.drawOrigin = true;
        this.graphics.beginFill(0x990000);
        this.graphics.drawCircle(0, 0, 10);
        this.graphics.endFill();

        this.addEventListener(MouseEvent.CLICK, function(event) {
            console.log("what")
        });
    }
}

ConorBot.Noob = class extends ConorBot.Toon {
    constructor() {
        super();

        this.name = "conor";
        this.x = 100;
        this.y = 100;

        this.addEventListener(MouseEvent.CLICK, function() {
            console.log("me");
        });
    }
}

///////////////

window.onload = function() {
    var c = document.getElementById('c');
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    stage.canvas = c;

    stage.addChild(new ConorBot());
};