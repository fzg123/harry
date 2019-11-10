// document.body.onload = function (){
// 	document.getElementById('container').style.width = document.documentElement.clientWidth + "px";
// 	window.onresize = function(){
//    		document.getElementById('container').style.width = document.documentElement.clientWidth + "px";
// 	}
// };
var shop = {
	shop : document.getElementsByClassName('shop')[0],
	shopNumber : 0,			
	shopSubtotal : 0,
	init : function(){
		if(!this.shop){return};
		this.initialise();

	},
	initialise : function (){
		var self = this;			//保存当前作用域的this指向
		var input = self.shop.getElementsByTagName('input');					//获取所有复选框
		var shopContent = this.shop.getElementsByClassName('shop-content');		//店铺的集合
		var shopChild = this.shop.getElementsByClassName('shopChild');		//所有单件的集合
		var shopButton = this.shop.getElementsByTagName('button');		//获取每个加减按键
		var shopDelete = this.shop.getElementsByClassName('shopDelete');//获取删除商品按键的元素
		this.textNumber = document.getElementsByName('textNumber');		//获取所有装有商品数量的元素
		var checkAllTwo = document.getElementsByName('checkAll')[0];
		
		this.shopChild = shopChild;				//保持所有shopChild选项到shop对象里面
		var checkAll = document.getElementById('checkAll');
		this.input = input;				//保持所有单品input到shop对象里面
		this.shopNumbers = [];		//每一个商品的数量集合
		this.shopSubtotals = [];		//每个商品的小计集合
		this.derailShop = true;				//监听滚动条变化的开关
		this.ware = this.shop.getElementsByClassName('ware');
		for(var i = 0; i < shopContent.length;  i ++){ 
			(function(i){
				var storeCheck = shopContent[i].getElementsByClassName('storeCheck')[0];
				storeCheck.addEventListener('change', function(){
					var shopChild = shopContent[i].getElementsByClassName('shopChild');
					for(var j = 0; j < shopChild.length; j ++){
						shopChild[j].checked = storeCheck.checked;
					}
				}, false);
			}(i))	
		}
		checkAll.addEventListener('change', function(){
			for(var i = 0; i < input.length; i ++){
					input[i].checked = checkAll.checked;
				}	
		}, false);
		checkAllTwo.addEventListener('change', function(){
			for(var i = 0; i < input.length; i ++){
					input[i].checked = checkAllTwo.checked;
					
					
				}	
		},false);
		for(var i = 0; i < self.input.length; i ++){
			self.input[i].addEventListener('change', function(){self.totalSum('shopNumber','shopSubtotal')}, false);
		}
		self.renovateMoney();
		self.totalSum('shopNumber','shopSubtotal');

		for(var i = 0; i < shopDelete.length; i ++){		//添加删除事件
			(function(i){
				shopDelete[i].addEventListener('click', function(){
					this.parentElement.parentElement.remove();		//找到商品然后remove
					self.totalSum('shopNumber','shopSubtotal');
				}, false);

				self.textNumber[i].addEventListener('change', function(){
					var keep = self.shopNumbers[i];		//暂时保存对应值，以便判断输入后的值 是否合法
					if (this.value <= 0) {
						alert("请输入大于零的数字");
						this.value = keep;
						return;
					}else if(this.value >= 2){			//判断值是否大于等于2， 把加号的颜色变一变
						this.parentElement.parentElement.getElementsByTagName('button')[0].style.color = "black";
					}
					self.renovateMoney();self.totalSum('shopNumber','shopSubtotal');
				}, false);
			}(i))
			
		}
		//给每个加减按钮添加事件 
		for(var i = 0; i < shopButton.length; i ++){		
			shopButton[i].addEventListener('click', function(){
				//获得减号按钮以便操作
				var minusSign = this.parentElement.parentElement.getElementsByTagName('button')[0];	
				if(this.innerText == "+"){
						//获取文本框以便赋值
					var previousNumber = this.parentElement.previousElementSibling.getElementsByTagName('input')[0];
						minusSign.style.color = "black";
					previousNumber.value = 1 * previousNumber.value + 1;		//乘个1  隐式转换
					self.renovateMoney();
					self.totalSum('shopNumber','shopSubtotal');
				}else if(this.innerText == "-"){
					//获取文本框以便赋值
					var nextNumber = this.parentElement.nextElementSibling.getElementsByTagName('input')[0];

					if(1 * nextNumber.value > 1){
						nextNumber.value = nextNumber.value - 1;
						self.renovateMoney();
						self.totalSum('shopNumber','shopSubtotal');
					}else{
						minusSign.style.color = "#ccc";
						
					}
				}

			},false);
		}
		document.onscroll = function(){
			var effect = document.getElementById('effect');
			var checkOut = document.getElementById('checkOut');
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			var scrollTopTarget = 160;		//滚动条滑倒想要执行代码的位置
			if(self.derailShop && scrollTop >= scrollTopTarget){
				checkOut.style.position = "relative";
				checkOut.style.left = "";
				checkOut.style.transform = "";
				checkOut.style.border = "1px solid #ccc";
				self.shop.appendChild(checkOut);
				self.derailShop = false;
				effect.remove();
			}else if(!effect && scrollTop < scrollTopTarget){
				var effect = document.createElement('div');
				effect.id = "effect";
				checkOut.style.border = "";
				self.shop.appendChild(effect);
				effect.appendChild(checkOut);
				self.derailShop = true;
			}			//判断滚动条的位置
		}
	},
	countMoney : function (i){
		//获取单价
		var price = this.ware[i].getElementsByClassName('unitPrice')[0].getElementsByTagName('li')[0];
		//获取数量
		var shopNumber = this.ware[i].getElementsByClassName('number')[0].getElementsByTagName('input')[0];
		var subtotal = this.ware[i].getElementsByClassName('subtotal')[0];//获取小计
		var  minusSign	= shopNumber.parentElement.parentElement.getElementsByTagName('button')[0];//获取减号
		if(this.shopNumbers && this.shopSubtotals){
			this.shopNumbers[i] = shopNumber.value * 1;
			this.shopSubtotals[i] = subtotal;
		}
		// console.log(this.shopNumbers, this.shopSubtotals);
		subtotal.innerText = "￥" + shopNumber.value * price.innerText.substring(1);
		
		if(shopNumber.value == 1){
			minusSign.style.color = "#ccc";
		}
	},
	renovateMoney : function(){
		for(var i = 0; i < this.ware.length; i ++){
			this.countMoney(i);
		}
	},
	totalSum : function(Number, Subtotal){
		var shopNumber = document.getElementById(Number);
		var shopSubtotal = document.getElementById(Subtotal);
		this.shopNumber = 0;
		this.shopSubtotal = 0;
		for(var i = 0; i < this.shopChild.length; i ++){
			if(this.shopChild[i].checked){
				this.shopNumber += this.shopNumbers[i];
				this.shopSubtotal += this.shopSubtotals[i].innerText.substring(1) * 1;
			}
			shopNumber.innerText = this.shopNumber;
			shopSubtotal.innerText =  this.shopSubtotal;
		}
	},
};

shop.init();