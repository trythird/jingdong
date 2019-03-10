
/* 使用zepto实现轮播图 */
/*1.收尾添加照片*/
/* 2.重新设置图片盒子宽度和图片宽度*/
/*3.开启定时器，自动轮播*/
/*4.添加移动端的滑动事件，实现手动轮播*/
/*5.添加过渡效果结束之后的监听*/
$(function(){
    var banner = $(".banner");
    var bannerWidth = banner.width();
    var imgBox = banner.find("ul:first-of-type");
    var indicators = banner.find("ul:eq(1)").find("li");
    /*收尾添加照片，clone复制一份*/
    var first = imgBox.find("li:first-of-type"),
        last = imgBox.find("li:last-of-type");
    imgBox.append(first.clone());
    last.clone().insertBefore(first);
    /*设置图片盒子的宽度*/
    var lis = imgBox.find("li"),
        count = lis.length;
    imgBox.width(count*bannerWidth);
    /*设置imgBox每个li的宽度*/
    lis.each(function(index,value){
        $(lis[index]).width(bannerWidth);
    });
    /* 设置默认偏移*/
    imgBox.css("left",-bannerWidth);
    var index= 1;
    var imgAnimation = function(){
        imgBox.animate(
            /*zepto中直接可以使用animate函数来实现
           * 1.添加动画效果的样式-- 对象
           * 2.动画的耗时
           * 3.动画的速度函数 animation-timing-function
           * 4.重点：当前动画执行完毕之后的回调，相当于JS完成时的监听*/
            {"left":-index*bannerWidth},
            500,
            "ease-in-out",
            function(){
                //动画执行完判断当前索引是否是首张或尾张
                if (index==count-1) {
                    index=1;
                    /*瞬间偏移到index为1的位置，即非过渡效果*/
                    imgBox.css("left", -index*bannerWidth);
                }
                else if (index==0) {
                    index=count-2;
                    imgBox.css("left", -index*bannerWidth);
                }
                /* 设置点标记 */
                indicators.removeClass("active").eq(index-1).addClass("active");
            }
        );};
    /*定时器开启*/
    var timeStart =function () {
  setInterval(function(){
        index++;
        /*开启过渡*/
        /*设置定位*/
        imgAnimation();
    },2000)
    }
    timeStart();
/*添加滑动事件*/
imgBox.on("swipeLeft",function () {
clearTimeout(timeId);
index++;
    imgAnimation();
    timeStart()
});
imgBox.on("swipeRight",function () {
    clearTimeout(timeId);
    index--;
    imgAnimation();
    timeStart()
});
    /*懒加载*/
    $(".test-lazyload").picLazyLoad();
} )