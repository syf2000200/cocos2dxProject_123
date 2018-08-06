var PlayerLayer = cc.Layer.extend({
    bgSprite: null,
    sushiSprites: null,
    ctor: function() {
        this._super();

        var size = cc.winSize;

        this.bgSprite = new cc.Sprite(res.BackGround_png);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
        });
        this.addChild(this.bgSprite, 0);

        this.schedule(this.update,1,16*1024,1);

        this.sushiSprites = [];

        return true;
    },
    update: function() {
        this.addSushi();
        this.removeSushi();
    },
    addSushi: function() {
        var sushi = new cc.Sprite(res.Sushi_png);
        var size = cc.winSize;

        var x = sushi.width/2 + size.width/2 * cc.random0To1();
        sushi.attr({
            x: x,
            y: size.height - 30
        });

        this.addChild(sushi, 5);

        var dropAction = cc.MoveTo.create(4, cc.p(sushi.x, -30));
        sushi.runAction(dropAction);

        this.sushiSprites.push(sushi);
    },
    removeSushi : function() {
        //移除到屏幕底部的sushi
        for (var i = 0; i < this.sushiSprites.length; i++) {
            cc.log("removeSushi.........");
            if(0 == this.sushiSprites[i].y) {
                cc.log("==============remove:"+i);
                this.sushiSprites[i].removeFromParent();
                this.sushiSprites[i] = undefined;
                this.sushiSprites.splice(i,1);
                i= i-1;
            }
        }
    },

});

var PlayScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new PlayerLayer();
        this.addChild(layer);
    }
});