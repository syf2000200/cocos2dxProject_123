var PlayerLayer = cc.Layer.extend({
    bgSprite: null,
    ctor: function() {
        this._super();

        var size = cc.winSize;

        var bgSprite = new cc.Sprite(res.BackGround_png);
        bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
        });
        this.addChild(bgSprite, 0);

        this.schedule(this.update,1,16*1024,1);

        return true;
    },
    update: function() {
        this.addSushi();
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
    }
});

var PlayScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new PlayerLayer();
        this.addChild(layer);
    }
});