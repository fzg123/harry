// import "./index.css";
var userLandContaner = document.getElementsByClassName('userLand_contaner')[0];    //扫码登录页面
var accountEntry = document.getElementsByClassName('accountEntry')[0];     //账号密码登录页面
var SweepCodeEntry = document.querySelector('#SweepCodeEntry'); //扫码登录按钮
var accountNumberEntry = document.querySelector('#accountNumberEntry'); //账号登录按钮
var accountEntryInput = accountEntry.getElementsByTagName('input');        //密码输入框与账号输入框
var userremove = accountEntry.getElementsByClassName('userremove');     //取消按钮
var mask = document.getElementsByClassName('mask')[0];                 //蒙层方便进行js操作
var QRCode = document.getElementsByClassName('QRCode')[0];              //两个页面的dom元素
var explain = document.getElementsByClassName('explain')[0];        //两个页面的dom元素
var submit = document.querySelector('#submit');            //提交按钮
var userNumber = document.querySelector('#userNumber');     //账号框
var userPassword = document.querySelector('#userPassword');     //密码框
var passwordWrong = document.querySelector('.passwordWrong');
var userOrPassword = [["付志国", 777], ["邓志鹏", 777], ["鹏鹏", 000], ["谭炜", 223], ["廖辉", "888"]];
var proving = document.querySelector('.accountEntry .proving');     //验证这一整块
accountNumberEntry.onclick = function () {
    fashion(this, SweepCodeEntry, userLandContaner, accountEntry);
}
SweepCodeEntry.onclick = function () {
    fashion(this, SweepCodeEntry, userLandContaner, accountEntry);
}
function fashion(obj, yemian1, yemian2) {
    var decide = obj == accountNumberEntry ? accountEntry : userLandContaner;
    var hide = obj == accountNumberEntry ? userLandContaner : accountEntry;
    var fontColor = obj == accountNumberEntry ? SweepCodeEntry : accountNumberEntry;
    decide.style.display = "block";
    hide.style.display = "none";
    fontColor.firstElementChild.style.color = "#666";
    obj.firstElementChild.style.color = "#e4393c";
}
mask.addEventListener('mouseover', function () {
    off = true;
    this.style.left = "21px";
    this.style.width = "317px";
    QRCode.style.left = "-145px";
    gotime = setTimeout(function () { explain.style.display = "block"; }, 300);
}, true);

mask.addEventListener('mouseout', rebound, true);
function rebound() {
    QRCode.style.left = "0px";
    mask.style.width = "167px";
    mask.style.left = "84px";
    if (window.gotime) {
        clearTimeout(gotime);
    }
    explain.style.display = "none";
}

for (let i = 0; i < accountEntryInput.length; i++) {
    accountEntryInput[i].oninput = function () {
        passwordWrong.style.background = "#green";
        passwordWrong.style.opacity = "0";
        if (this.value != "") {
            this.nextElementSibling.style.display = "block"
        } else {
            this.nextElementSibling.style.display = "none"
        }
    }
}
for (var i = 0; i < userremove.length; i++) {
    userremove[i].addEventListener('click', function () {
        this.previousElementSibling.value = "";
        this.style.display = "none"
    }, false);
}
document.body.onload = function () {
    setTimeout(rebound, 3500);
}
submit.onclick = function () {
    proving.style.display = "block";
}
document.onkeydown = function (e) {
    if (e.keyCode != 13) {
        return;
    }
    if (accountEntry.style.display == "block") {
        proving.style.display = "block";
    }

}
function submitBotton(userNumber, userPassword) {
    var t = false;
    for (var i = 0; i < userOrPassword.length; i++) {
        if (userOrPassword[i][0] == userNumber) {
            t = true;
            if (userOrPassword[i][1] == userPassword) {
                window.location.href = "../京东页面 - 副本.html";
            } else {
                t = false;
            }
        }
    }
    if (!t) {
        passwordWrong.style.opacity = "1";
    }
}
(function () {
    var provingCenter = document.querySelector('.proving .proving_center');      //整个图片块
    var smallImg = document.querySelector('.proving_center .smallImg');             //小图片
    var circle = document.querySelector('.proving_foot .circle');             //圆滑动块
    var font = document.querySelector('.proving_foot .font');           //  预留文字块
    var line = document.querySelector('.proving_foot .line');           //滑动的颜色变化
    var removeElement = document.querySelector('.proving_top .removeElement');      //右上角的小叉叉
    var update = document.querySelector('.update');     //更新图片


    var correct = false;
    var draftingLogin = [{
        imgSrc: "url(imgs/登录拖拽/1.png)",
        imgSrcSmall: "url(imgs/登录拖拽/1-1.png)",
        imgSrcSmallLeft: "160",
        imgSrcSmallTop: "50px",
    },
    {
        imgSrc: "url(imgs/登录拖拽/2.png)",
        imgSrcSmall: "url(imgs/登录拖拽/2-1.png)",
        imgSrcSmallLeft: "125",
        imgSrcSmallTop: "32px",
    },
    {
        imgSrc: "url(imgs/登录拖拽/3.png)",
        imgSrcSmall: "url(imgs/登录拖拽/3-1.png)",
        imgSrcSmallLeft: "110",
        imgSrcSmallTop: "52px",
    },
    {
        imgSrc: "url(imgs/登录拖拽/4.png)",
        imgSrcSmall: "url(imgs/登录拖拽/4-1.png)",
        imgSrcSmallLeft: "133",
        imgSrcSmallTop: "48px",
    }
    ];
    init(draftingLogin, provingCenter, smallImg, circle, line);
    function init(library, box, smallImg, yuan, line) {          //第一位是数字， 第二位是整个验证的盒子， 第三个是小图片， 第四个是小圆
        changeLeft(smallImg, yuan, line, 0);
        t = parseInt(Math.random() * draftingLogin.length);
        box.style.background = `${library[t].imgSrc}`;
        smallImg.style.background = `${library[t].imgSrcSmall}`;
        smallImg.style.top = `${library[t].imgSrcSmallTop}`;
        smallImg.onmousedown = document.onmouseup = function () {
            return null;

        }
        smallImg.onmousedown = function () {
            document.addEventListener('mousemove', test2, false);
            document.onmouseup = function () {
                up();
            }
        };
        yuan.addEventListener('mousedown', function () {
            document.addEventListener('mousemove', test2, false);
            document.onmouseup = function () {
                up();
            }
        }, false);

        function up() {
            if (window.temp == 0 || window.temp && (temp <= 3 && temp >= -4)) {
                correct = true;
                clearElement(yuan, line, font);
                setTimeout(function () {
                    proving.style.display = "none";
                    if (userNumber.value != "" && userPassword.value != "") {
                        submitBotton(userNumber.value, userPassword.value);
                    } else {
                        alert("账号或者密码不能为空");
                    }
                }, 1000);
                temp = null;
            } else {
                initialise(circle, smallImg, font);
            }
            // clearElement(yuan, line, font);
            document.removeEventListener('mousemove', test2, false);
            correct ? null : init(library, box, smallImg, yuan, line);
            correct = false;
        };

    }
    function test2(e) {          //鼠标点击移动时， 执行的函数
        var event = e || window.event;
        var pageX = event.pageX - provingCenter.getBoundingClientRect().left - 25;
        if (pageX <= 0) {
            pageX = 0;
        } else if (pageX >= 360 - 50) {
            pageX = 310;
        }

        temp = draftingLogin[t].imgSrcSmallLeft - pageX;
        changeLeft(smallImg, circle, line, pageX);

    }

    function changeLeft(obj1, obj2, obj3, value) {     //改变位置
        obj1.style.left = value + "px";
        obj2.style.left = value + "px";
        obj3.style.display = value ? "block" : "none";
        obj3.style.width = value + 40 + "px";
        obj3.style.background = value ? "#10b2fa" : "green";
    }
    function clearElement(obj1, obj2, obj3) {
        obj1 ? obj1.style.display = "none" : "";
        obj2 ? obj2.style.display = "none" : "";
        if (obj3) {
            obj3.classList.add('state');
            obj3.style.backgroundColor = "#89cbe7";
            obj3.innerHTML = "拼接成功";
        }

    }
    function initialise(circle, smallImg, font) {
        circle.style.left = "1px";
        smallImg.style.left = "0px";
        circle.style.display = "block";
        font.innerHTML = "向右滑动完成拼图";
    }
    removeElement.onclick = function () {
        proving.style.display = "none";
    }
    update.onclick = function () {
        init(draftingLogin, provingCenter, smallImg, circle, line);
    }

    function motion(dom, target) {
        var speed = null, current = null, timer = null, a = null, u = .8;
        clearInterval(timer);
        dom.timer = setInterval(function () {
            current = dom.offsetLeft;
            a = (target - current) / 3;
            speed += a;
            speed *= u;
            if (current == target && Math.abs(speed) < Math.abs(1)) {
                clearInterval(dom.timer);
                dom.style.left = target + "px";
            } else {
                dom.style.left = dom.offsetLeft + speed + "px";
            }
        }, 30);
    }
}())