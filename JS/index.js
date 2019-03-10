window.onload=function(){
    hearEffect();
    timeBack();
    bannerEffect();

}
/* 搜索框滑动效果 */
function hearEffect(){
    /* 头部搜索块的js效果 */
    /* 1.获取当前banner的高度*/
    var banner = document.querySelector(".banner"),
        bannerHeight = banner.offsetHeight;
    /* 2.获取当前屏幕滚动时，banner滚动出屏幕的距离 */
    window.onscroll=function(){
        /* 3.计算比例值，获取透明度，设置背景色透明度*/
        var offsetTop = document.documentElement.scrollTop;
            var opacity = 0;
        search = document.querySelector(".search")

        /* 判断banner是否完全滚出屏幕，如果否，则计算并设置*/
        if(offsetTop < bannerHeight){
            opacity = offsetTop/bannerHeight;
            /* 设置样式 */
            search.style.background= "rgba(21,22,19,"+ opacity +")";
        }
    }
}
/* 计时器效果*/
function timeBack(){
    var spans = document.querySelector(".sk_time").querySelectorAll("span");
    /* 设置初始的倒计时时间，以秒为单位*/
    var totalTime = 6000;
    /* 开始定时器 */
    var timeId = setInterval(function(){
        totalTime--;
        /*得到剩余的时分秒*/
        if(totalTime < 0){
            clearInterval(timeId);
            return;
        }

        var hour = Math.floor(totalTime/3600);
        var minute = Math.floor(totalTime%3600/60);
        var second = Math.floor(totalTime%60);
        /* 赋值 */
        spans[0].innerHTML = Math.floor(hour/10);
        spans[1].innerHTML = Math.floor(hour%10);
        spans[3].innerHTML = Math.floor(minute/10);
        spans[4].innerHTML = Math.floor(minute%10);
        spans[6].innerHTML = Math.floor(second/10);
        spans[7].innerHTML = Math.floor(second%10);
    },1000)
}
/* 轮播图效果*/
function bannerEffect() {
    /* 设置轮播图的面结构*/
    /*a 在开始位置添加原始的最后一张图片
    * b 在结束位置添加原始的第一张图片 */
    var banner = document.querySelector(".banner"),
        imgBox = banner.querySelector("ul:first-of-type");
    var first = imgBox.querySelector("li:first-of-type"),
        last = imgBox.querySelector("li:last-of-type");
    /* cloneNode:复制一个dom元素*/
    imgBox.appendChild(first.cloneNode(true));
    /* insertBefore(需要插入的元素，位置)*/
    imgBox.insertBefore(last.cloneNode(true), imgBox.firstChild);
    /* 2.设置对应的样式*/
    var lis = imgBox.querySelectorAll("li"),
        count = lis.length,
        bannerWidth = banner.offsetWidth;
    /*设置图片盒子的宽度*/
    imgBox.style.width = count * bannerWidth + "px";
    /*设置li元素的宽度即图片*/
    for (var i = 0; i < lis.length; i++) {
        lis[i].style.width = bannerWidth + "px";
    }
    /* 图片索引，图片已有一个宽度的默认偏移*/
    var index = 1;
    /* 设置默认的偏移 */
    imgBox.style.left = -bannerWidth + "px";
    /* 当屏幕变化时，重新计算宽度,同时覆盖全局的宽度值 */
    window.onresize = function () {
         bannerWidth = banner.offsetWidth;
        /*设置图片盒子的宽度*/
        imgBox.style.width = count * bannerWidth + "px";
        /*设置li元素的宽度即图片*/
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.width = bannerWidth + "px";
        }
        /* 设置默认的偏移 */
        imgBox.style.left =(-index*bannerWidth) + "px";
    }
    /* 实现点标记 */
    var setindicators = function(index){
    var indicators=banner.querySelector("ul:last-of-type").querySelectorAll("li");
    /* 先清除其他li元素的active样式*/
    for(var i=0;i<indicators.length;i++){
        indicators[i].classList.remove("active");
    }
    /* 为当前元素添加active样式*/
        indicators[index].classList.add("active");
    }
    /* 实现自动轮播 */
    var timeId;
  var startTime=function(){
      timeId = setInterval(function() {
              index++;
              /* 添加过渡效果 */
              imgBox.style.transition = "left 0.5s ease-in-out"
              /* 设置偏移 */
              imgBox.style.left = (-index * bannerWidth) + "px";
          }
          ,2000)
  }
  startTime();
    /* 实现手动轮播 */
    var startX,moveX,distanceX;
    /* 节流阀，标记当前过渡效果已经完成*/
    var isEnd = true;
    /* 为图片添加触摸事件--触摸开始 */
    imgBox.addEventListener("touchstart",function(e) {
        /* 清除定时器 */
        clearInterval(timeId);
        /* 获取当前手指的触摸位置 */
        startX = e.targetTouches[0].clientX;
    });
    /* 为图片添加触摸事件--滑动过程 */
    imgBox.addEventListener("touchmove",function(e){
        if(isEnd == true){
        /* 记录手指在滑动过程中的位置 */
        moveX = e.targetTouches[0].clientX;
        /* 计算坐标的差异 */
        distanceX = moveX-startX;
            /*清除之前自动轮播的定时器过渡样式清除*/
            imgBox.style.transition = "none";
        /* 实现元素的偏移 left参照的是最原始的坐标
        * 重大细节：本次滑动的操作应该基于之前轮播图已经偏移的距离  */
        imgBox.style.left=(-index*bannerWidth + distanceX)+"px";
    }
    });
    /* 松开手指 */
    imgBox.addEventListener("touchend",function(e) {
        isEnd = false;
        /* 判断滑动距离是否大于100像素，大于则换页*/
        if( Math.abs( distanceX)>100){
            /* 还需要判断滑动的方向 */
            if(distanceX>0){//上一张
                index--;
                /* 添加过渡效果 */
                imgBox.style.transition ="left 0.5s ease-in-out"
                /* 设置偏移 */
                imgBox.style.left =(-index*bannerWidth) + "px";
            }
            else if(distanceX<0){//上一张
                index++;
                /*翻页效果同自动轮播一样*/
                /* 添加过渡效果 */
                imgBox.style.transition ="left 0.5s ease-in-out"
                /* 设置偏移 */
                imgBox.style.left =(-index*bannerWidth) + "px";

            }
        }
        else if(Math.abs(distanceX) > 0 ){//保证用户确实进行了滑动
            /*回弹*/
            imgBox.style.transition ="left 0.5s ease-in-out"
            /* 设置偏移 */
            imgBox.style.left =(-index*bannerWidth) + "px";
        }
        /*将上一次move所产生的数据重置为0*/
        startX = 0;
        moveX = 0;
        distanceX =0;
        clearInterval(timeId);
        /*重新开始计时器*/
        startTime();
    });
    imgBox.addEventListener("webkitTransitionEnd",function(){
        /* 判断index是否为最后一张 */
            if(index==count-1){
                index=1;
                /* 如果一个元素的某个属性之前添加过过渡效果，那么过渡效果会一直存在，如果不想要，则需要清除过渡效果 */
                /* 关闭过渡效果*/
                imgBox.style.transition = "none";
                /* 偏移到指定位置 */
                imgBox.style.left =(-index*bannerWidth) + "px";
            }
        /* 判断index是否为第一张 */
        else if(index== 0) {
                index = count-2;
                /* 如果一个元素的某个属性之前添加过过渡效果，那么过渡效果会一直存在，如果不想要，则需要清除过渡效果 */
                /* 关闭过渡效果*/
                imgBox.style.transition = "none";
                /* 偏移到指定位置 */
                imgBox.style.left = (-index * bannerWidth) + "px";
            }
            /* 设置标记*/
        setindicators(index-1);
            setTimeout(function(){
                isEnd = true;
                clearInterval(timeId);
                startTime();
            },500)

    });
}
