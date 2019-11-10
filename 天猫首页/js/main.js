var searchNavigation  = {
    shopClassifyPaging : document.getElementsByClassName('shopClassifyPaging')[0],
    activity : document.getElementsByClassName('activity')[0],
    shopClassifyPaging_Box : document.getElementsByClassName('shopClassifyPaging_Box')[0],
    activity_box : document.getElementsByClassName('activity_box')[0],
    main_banner : document.querySelector('.main_banner'),
    index_Img : document.querySelector('.index_Img'),
    gotime : null,
    j : 0,
    currently : 0,
    init : function(){
        var self = this;
        this.shopClassifyPaging.addEventListener('mouseover', function(e){
            self.addClass(this, "shopClassifyPaging_color");
            self.removeClass(self.activity, "activity_color");
            self.shopClassifyPaging_Box.style.display = "block";
            self.activity_box.style.display = "none";
        }, false);
        this.activity.addEventListener('mouseover', function(e){
            self.addClass(this, "activity_color");
            self.removeClass(self.shopClassifyPaging, "shopClassifyPaging_color");
            self.activity_box.style.display = "block";
            self.shopClassifyPaging_Box.style.display = "none";
        }, false);
        this.main_banner_li = this.main_banner.querySelectorAll('li');
        this.index_Img_li = this.index_Img.querySelectorAll('li');
        this.gotime = setInterval(function(){
            self.gotimeFun();
        }, 2500);
        for(var i = 0; i < this.index_Img_li.length; i ++){
            this.index_Img_li[i].index = i;
            this.index_Img_li[i].onmouseover = function(){
                clearInterval(self.gotime);
                self.gotime = null;
                self.j = this.index;
                self.changeImg(self.main_banner_li, self.index_Img_li,  self.j, self.currently, ["main_bannerBlock", "index_Img_color"]);
            }
            this.index_Img_li[i].onmouseout = function(){
                self.gotime = setInterval(function(){
                    self.gotimeFun();
                }, 2500);
            }
        }
    },
    addClass : function(obj, className){        //添加类名
        if(! obj.classList.contains(className)){
            obj.classList.add(className); 
        }
    },
    removeClass : function(obj, className){      //删除类名
        if(obj.classList.contains(className)){
            obj.classList.remove(className);
        }
        
    },
    changeImg : function(objs, imgIndex_li , j, currently, className){
        this.removeClass(objs[currently], className[0]);
        this.addClass(objs[j], className[0]);
        this.removeClass(imgIndex_li[currently], className[1]);
        this.addClass(imgIndex_li[j], className[1]);

        this.currently = j;
    },
    gotimeFun : function(){
        this.j ++;
        if(this.j >= this.main_banner_li.length - this.index_Img_li.length){
            this.j = 0;
        }
        this.changeImg(this.main_banner_li, this.index_Img_li,  this.j, this.currently, ["main_bannerBlock", "index_Img_color"]);
    },
    Zseat : (function(){        
    }()),
};
searchNavigation.init();