//创建StartLayer节点
var StartLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        //创建视图尺寸
        var size = cc.winSize;
        //创建欢迎界面文字
        var helloLabel = new cc.LabelTTF('欢迎界面', "Arial", 38);
        //设置视图尺寸
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2;
        //将已创建文字添加到层中
        this.addChild(helloLabel, 5);

        //创建背景
        var bgSprite = new cc.Sprite(res.BackGround_png);
        //设置背景尺寸
        bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        //将背景添加到层中
        this.addChild(bgSprite, 0);

        //添加开始菜单
        var startItem = new cc.MenuItemImage(
            res.Start_png,
            function() {
                cc.log('开始按钮被点击');
            },
            this
        );
        //设置开始菜单尺寸和锚点位置
        startItem.attr({
            x: size.width / 2,
            y: size.height / 2,
            anchorX: 0.5,
            anchorY: 0.5
        });

        //创建menu节点
        var menu = new cc.Menu(startItem);
        menu.x = 0;
        menu.y = 0 - 80;
        this.addChild(menu, 1);

        return true;
    }
});

//创建场景
var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartLayer();
        //将StartLayer节点添加到场景中
        this.addChild(layer);
    }
});