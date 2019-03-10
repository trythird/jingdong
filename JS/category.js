window.onload=function (ev) {
    /*获取左侧栏*/
   var ct_cLeft =document.querySelector(".ct_cLeft");
   /*获取用于滑动的列表*/
   var ulBox = ct_cLeft.querySelector("ul:first-of-type");
   /*获取ulBox中所有li元素*/
   var lis = ulBox.querySelectorAll("li");
   /*获取左侧栏高度*/
   var leftHeight = ct_cLeft.offsetHeight,
       ulBoxHeight = ulBox.offsetHeight;
   /*设置静止状态下的最大top值*/
   var maxTop = 0;
    /*设置静止状态下的最小top值*/
    var minTop = leftHeight-ulBoxHeight;
    /*设置滑动状态下的最大top值*/
    var maxBounceTop =maxTop+50;
    /*设置滑动状态下的最小top值*/
      var minBounceTop = minTop-50;
   /*实现滑动*/
   var startY = 0,
       moveY = 0,
       distanceY = 0,
         currentY = 0;
/*添加滑动事件*/
ulBox.addEventListener("touchstart",function (e) {
    /*获取手指的初始坐标*/
    startY = e.targetTouches[0].clientY;
});
ulBox.addEventListener("touchmove",function (e) {
    moveY = e.targetTouches[0].clientY;
    distanceY = moveY-startY;
    /*判断滑动的时候是否超出当前指定的滑动区间*/
    if(currentY+distanceY > maxBounceTop || currentY+distanceY < minBounceTop){
        return;
    }
    /*先将之前添加的过渡效果清除*/
    ulBox.style.transition="none";
    /*实现偏移*/
    ulBox.style.top =(currentY+distanceY)+"px";

})
    ulBox.addEventListener("touchend",function (e) {
/*判断当前滑动距离是否在静止状态和滑动状态下的最小top值之间*/
        if(distanceY+currentY < minTop){
            currentY = minTop;
        ulBox.style.transition= "top,0.5";
        ulBox.style.top=minTop+"px";
        }
        else if(distanceY+currentY > maxTop){
            currentY =maxTop;
            ulBox.style.transition="top,0.5";
            ulBox.style.top=maxTop+"px";
        }
        currentY +=distanceY;
    })
    /*为每一个li设置添加一个index*/
    for(var i =0;i<lis.length;i++){
        lis[i].index=i;
    }

    /*使用tap事件*/
     itcast.tap(ulBox,function (e) {
         /*绑定移动端的tap事件*/
         /*修改li元素的样式，将所有li元素的active样式清除，再为当前被点击的li元素添加active样式*/
      for(var i=0;i<lis.length;i++){
          lis[i].classList.remove("active");
      }
      /*为当前被点击li元素添加样式*/
      var li = e.target.parentNode;
      var liHeight = li.offsetHeight;
      li.classList.add("active");
         /*移动当前li元素到父容器的最顶端，但是不能超过之前设定的静止状态下的最小top值*/
         /*获取当前li元素的索引值*/
         var index = li.index;
      /*开启过渡*/
      ulBox.style.transition = "top 0.5s";
      /*设置偏移*/
      if( -index*liHeight<minTop){
          ulBox.style.top = minTop + "px";
      }else{
          ulBox.style.top = -index*liHeight+"px";
          currentY = -index*liHeight;
      }
     })
 /*   $(ulBox).on("tap",function (e) {
            /!*绑定移动端的tap事件*!/
            /!*修改li元素的样式，将所有li元素的active样式清除，再为当前被点击的li元素添加active样式*!/
            for(var i=0;i<lis.length;i++){
                lis[i].classList.remove("active");
            }
            /!*为当前被点击li元素添加样式*!/
            var li = e.target.parentNode;
            var liHeight = li.offsetHeight;
            li.classList.add("active");
            /!*移动当前li元素到父容器的最顶端，但是不能超过之前设定的静止状态下的最小top值*!/
            /!*获取当前li元素的索引值*!/
            var index = li.index;
            /!*开启过渡*!/
            ulBox.style.transition = "top 0.5s";
            /!*设置偏移*!/
            if( -index*liHeight<minTop){
                ulBox.style.top = minTop + "px";
            }else{
                ulBox.style.top = -index*liHeight+"px";
                currentY = -index*liHeight;
            }
        });*/
 /*右侧商品栏滑动*/
    var myScroll = new IScroll('.ct_hotCategory',{
        mouseWheel:true,
        scollbars:true
    });
}