var PlayLayer = cc.Layer.extend({
    bgSprite: null,
    sushiSprites: null,
    scoreLabel:null,
	score:0,
	timeoutLabel:null,
	timeout:3,
    ctor: function() {
        this._super();
        //加载帧图片到缓存
        cc.spriteFrameCache.addSpriteFrames(res.Sushi_plist);

        var size = cc.winSize;
        //创建背景图精灵
        this.bgSprite = new cc.Sprite(res.BackGround_png);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
        });
        this.addChild(this.bgSprite, 0);

        this.schedule(this.update,1,16*1024,1);

        this.sushiSprites = [];

        //添加得分和倒计时
        this.scoreLabel = new cc.LabelTTF('score:0', 'Arial', 20);
        this.scoreLabel.attr({
            x:size.width / 2 + 100,
            y:size.height - 20
        });
        this.addChild(this.scoreLabel, 5);

        // timeout 60
        this.timeoutLabel = cc.LabelTTF.create(this.timeout, 'Arial', 30);
        this.timeoutLabel.x = 20;
        this.timeoutLabel.y = size.height - 20;
        this.addChild(this.timeoutLabel, 5);

        //timer倒计时60
        this.schedule(this.timer,1,this.timeout,1);

        return true;
    },
    update: function() {
        this.addSushi();
        this.removeSushi();
    },
    addSushi: function() {
        var sushi = new SushiSprite(res.Sushi_png);
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
    // removeSushiByindex: function(dx) {
    //     console.log(this.sushiSprites)
	// 	if(isNaN(dx)||dx>this.SushiSprites.length){return false;}  
	// 	for(var i=0,n=0;i<this.length;i++)
	// 	{
	// 		if(this.SushiSprites[i]!=this[dx])
	// 		{
	// 			cc.log("--------------");
	// 			this.SushiSprites[n++]=this.SushiSprites[i];
	// 		}
	// 	}
	// 	this.SushiSprites.length -= 1;
	// },
    removeSushi: function() {
        //移除到屏幕底部的sushi
        for (var i = 0; i < this.sushiSprites.length; i++) {
            cc.log("removeSushi.........");
            if(this.sushiSprites[i].y == 0) {
                cc.log("==============remove:"+i);
                this.sushiSprites[i].removeFromParent();
                this.sushiSprites[i] = undefined;
                this.sushiSprites.splice(i,1);
                i= i-1;
            }
        }
    },
    addScore:function(){
        this.score +=1;
        this.scoreLabel.setString("score:" + this.score);
    },
    timer: function() {
        if (this.timeout == 0) {
            //cc.log('游戏结束');
            var gameOver = new cc.LayerColor(cc.color(225,225,225,100));
            var size = cc.winSize;
            var titleLabel = new cc.LabelTTF("游戏结束", "Arial", 38);
            titleLabel.attr({
                x:size.width / 2,
                y:size.height / 2
            });
            gameOver.addChild(titleLabel, 5);
            var TryAgainItem = new cc.MenuItemFont(
                    '再来一次',
                    function () {
                        cc.log("Menu is clicked!");
                        var trans= cc.TransitionFade.create(1, new PlayScene(),cc.color(255,255,255,255));
                        cc.director.runScene(trans);
                    }, this);
            TryAgainItem.attr({
                x: size.width/2,
                y: size.height / 2 - 60,
                anchorX: 0.5,
                anchorY: 0.5
            });
            var backToMenu = new cc.MenuItemFont(
                        '返回主菜单',
                        function () {
                            cc.log("Menu is clicked!");
                            var trans= cc.TransitionFade.create(1, new StartScene(),cc.color(255,255,255,255));
                            cc.director.runScene(trans);
                        }, this);
            backToMenu.attr({
                x: size.width/2,
                y: size.height / 2 - 60,
                anchorX: 0.5,
                anchorY: 0.5
            });
    
            var menu = new cc.Menu(TryAgainItem);
            var backToMenu = new cc.Menu(backToMenu);
            menu.x = 0;
            menu.y = 0;
            backToMenu.x = 0;
            backToMenu.y = -60;
            gameOver.addChild(menu, 1);
            gameOver.addChild(backToMenu, 1);
            this.getParent().addChild(gameOver);
    
            this.unschedule(this.update);
            this.unschedule(this.timer);
            return;
        }
    
        this.timeout -=1;
        this.timeoutLabel.setString("" + this.timeout);
    
    },
});

var PlayScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new PlayLayer();
        this.addChild(layer);
    }
});