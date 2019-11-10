var tplb = {
    tplbContainer : document.querySelector('.tplb'),        //图片区域
    roundDot : document.querySelector('.roundDot'),     //  圆点区域
    point : document.querySelector('.point'),            //小手区域
    j : 0,          //控制图片的索引
    clicked : true,
    init : function(){
        this.tplbLi = this.tplbContainer.querySelectorAll('.tplb li');      //区域内的图片图片
        this.dot = this.roundDot.querySelectorAll('li');            //小圆点
        var pointChild = this.point.querySelectorAll('.point li .mask');        //箭头
        var self = this;
        this.maxNumber = this.tplbLi.length;
        self.tplbTimer();
        for(var i = 0; i < pointChild.length; i ++){
            pointChild[i].onmouseover = function(e){
                var event = e || window.event;
                event.stopPropagation();
            }
            pointChild[i].onmouseout = function(e){
                var event = e || window.event;
                event.stopPropagation();
            }
            pointChild[i].onmouseup = function(){
                if(!self.clicked){
                    return;
                }
                if(this.parentElement.dataset.bearing == "左"){
                    self.j -= 1;
                }else if(this.parentElement.dataset.bearing == "右"){
                    self.j += 1;
                }
                clearInterval(self.gotime);             //点击清除自动运动定时器
                self.timingSports(self.tplbLi, self.dot, self.maxNumber);       //运动
                self.clicked = false;           //  把开关关上    0.6秒后打开  
                setTimeout(function(){self.tplbTimer();}, 2000);       // 定时器  2秒后再加上
                setTimeout(function(){self.clicked = true}, 600);
            }
        }
        this.tplbContainer.onmouseover = function(){
            clearInterval(self.gotime);
        }
        this.tplbContainer.onmouseout = function(){
            self.tplbTimer();
        }
        for(var i = 0; i < this.dot.length; i ++){
            this.dot[i].index = i;
            this.dot[i].onmouseover = function(){
                self.j = this.index;        //保留索引
                self.timingSports(self.tplbLi, self.dot, self.maxNumber);
            }
        }
    },
    /**
     * 
     * @param {} 每一张图片
     * @param {} 小圆点
     * @param {} 最后一张图的索引
     */
    timingSports : function(tplbLi, dot, maxNumber){
        if(this.j >= maxNumber){
            this.j = 0;
        }
        if(this.j < 0){
            this.j = maxNumber - 1;
        }
        this.movement(tplbLi, this.j, dot); 
    },
    movement : function(obj, j, dot){
        this.clearClass(obj, 'block');
        this.clearClass(dot, 'correct');
        obj[j].classList.add('block');
        dot[j].classList.add('correct');
    },
    clearClass : function (obj, className){
        for(var i = 0; i < obj.length; i ++){
            obj[i].classList.contains(className) ? obj[i].classList.remove(className): "";
        }
    },
    tplbTimer : function(){
        this.gotime ? clearInterval(this.gotime) : "";
        var self = this;
        this.gotime = setInterval(function(){
            self.j ++;
            self.timingSports(self.tplbLi, self.dot, self.maxNumber);
        }, 2000);
    },
};
tplb.init();