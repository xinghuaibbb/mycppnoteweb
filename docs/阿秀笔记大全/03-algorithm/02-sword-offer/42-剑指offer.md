---
layout:  post
category:  algorithm
title:  No42、和为S的两个数字
tagline:  by 阿秀
tags:
    - 原创
    - 剑指offer
    - 数据结构与算法
    - 算法
    - 社招
    - 校招
    - 阿秀
excerpt: No42、和为S的两个数字
comment: false
---

<h1 align="center">带你快速刷完67道剑指offer</h1>

<div style="border-color: #24C6DC;
            background-color: #e9f9f3;         
            margin: 1rem 0;
        padding: .25rem 1rem;
        border-left-width: .3rem;
        border-left-style: solid;
        border-radius: .5rem;
        color: inherit;">
  <p>这是六则或许对你有些许帮助的信息:</p>
<p>⭐️1、阿秀与朋友合作开发了一个<span style="font-weight:bold;color:red">编程资源网站</span>，目前已经收录了很多不错的学习资源和黑科技（附带下载地址），如过你想要寻求合适的编程资源，<a href="https://tools.interviewguide.cn/home" style="text-decoration: underline" target="_blank">欢迎体验</a>以及推荐自己认为不错的资源，众人拾柴火焰高，我为人人，人人为我🔥！</p>  <p>2、👉23年5月份阿秀从<a style="text-decoration: underline" href="https://mp.weixin.qq.com/s?__biz=Mzk0ODU4MzEzMw==&mid=2247512170&idx=1&sn=c4a04a383d2dfdece676b75f17224e78" target="_blank">字节跳动离职跳槽到某外企</a>期间，为<span style="font-weight:bold">方便自己找工作，增加上岸几率</span>，我自己从0开发了一个<span style="font-weight:bold;color:red">互联网中大厂面试真题解析网站</span>，包括两个前端和一个后端。能够定向查看某些公司的某些岗位面试真题，比如我想查一下行业为互联网，公司为字节跳动，考察岗位为后端，考察时间为最近一年之类的面试题有哪些？
<div align="center">
</div>网站地址：<a style="text-decoration: underline" href="https://top.interviewguide.cn/" target="_blank">InterviewGuide大厂面试真题解析网站</a>。点此可以查看该网站的视频介绍：<a style="text-decoration: underline" href="https://www.bilibili.com/video/BV1f94y1C7BL" target="_blank">B站视频讲解</a>   如果可以的话求个B站三连，感谢！
    </p>3、😊
    分享一个阿秀自己私藏的<span style="font-weight:bold;color:red">黑科技网站</span>，<a style="text-decoration: underline" href="https://hkjtz.cn/" target="_blank">点此直达</a>，主要是各类小众实用APP、网站等，除此外也包括高清影视、音乐、电视剧、AI、纪录片、英语四六级考试、考研考公、副业等资源。
  </p>
  <p>4、😍免费分享阿秀个人学习计算机以来收集到的免费学习资源，<a style="text-decoration: underline" href="/notes/07-resources/01-free/01-introduce.html" target="_blank">点此白嫖</a>；也记录一下自己以前买过的<a style="text-decoration: underline" href="/notes/07-resources/02-precious.html" target="_blank">不错的计算机书籍、网络专栏和垃圾付费专栏</a>；也记录一下自己以前买过的<a style="text-decoration: underline" href="/notes/07-resources/02-precious.html" target="_blank">不错的计算机书籍、网络专栏和垃圾付费专栏</a>
  </p>
  <p>5、🚀如果你想在校招中顺利拿到更好的offer，阿秀建议你多看看前人<a style="text-decoration: underline" href="https://www.yuque.com/tuobaaxiu/httmmc/npg1k81zeq4wfpyz" target="_blank">踩过的坑</a>和<a style="text-decoration: underline"  target="_blank" href="https://www.yuque.com/tuobaaxiu/httmmc/gge9ppd0mbu2d3dp">留下的经验</a>，事实上你现在遇到的大多数问题你的学长学姐师兄师姐基本都已经遇到过了。
  </p>
  <p>6、🔥 欢迎准备计算机校招的小伙伴加入我的<a  style="text-decoration: underline" href="https://www.yuque.com/tuobaaxiu/httmmc/xg0otqvc17wfx4u9" target="_blank">学习圈子</a>，一个人踽踽独行不如一群人报团取暖，圈子里沉淀了很多过去21/22/23/24/25届学长学姐的<a  style="text-decoration: underline" href="https://www.yuque.com/tuobaaxiu/httmmc/gge9ppd0mbu2d3dp" target="_blank">经验和总结</a>，好好跟着走下去的，最后基本都可以拿到不错的offer！</a>如果你需要《阿秀的学习笔记》网站中📚︎校招八股文相关知识点的PDF版本的话，可以<a style="text-decoration: underline" href="https://www.yuque.com/tuobaaxiu/httmmc/qs0yn66apvkzw0ps" target="_blank">点此下载</a> 。</p>   </div>



## **No42、和为S的两个数字**

<font style="font-weight:normal; color:#4169E1;text-decoration:underline;" target="_blank">[牛客网原题链接](https://www.nowcoder.com/practice/390da4f7a00f44bea7c2f3d19491311b?tpId=13&&tqId=11195&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)</font>

### **题目描述**

输入一个递增排序的数组和一个数字S，在数组中查找两个数，使得他们的和正好是S，如果有多对数字的和等于S，输出两个数的乘积最小的。

**输出描述:**

```
对应每个测试案例，输出两个数，小的先输出
```

### **示例1**

**输入**

~~~
[1,2,4,7,11,15],15
~~~
**返回值**

~~~
[4,11]
~~~



### **1、很简单的一个问题**

~~~cpp
vector<int> FindNumbersWithSum(vector<int> array,int sum) {        
    vector<int>  result;
    if (array.size() == 0)  return result;
    int low = 0, high = array.size() - 1;

    while (low < high) {
        if (array[low] + array[high] == sum) {
            result.push_back(array[low]);
            result.push_back(array[high]);
            return result;
        }
        else if (array[low] + array[high] < sum)  low++;
        else {
            high--;
        }
    }
    return result;
}
~~~



### **二刷：**

### **1、滑动窗口来做**

运行时间：3ms  占用内存：512k

~~~cpp
 vector<int> FindNumbersWithSum(vector<int> array,int sum) {
       int low= 0, high = array.size()-1;
       int minResult = INT_MAX;
       vector<int> result;
       while(low < high){
           int sumTemp = array[low] + array[high];
           if(sumTemp == sum){
               if( array[low] * array[high] < minResult){
                  result.clear();
                  result.push_back(array[low]);
                  result.push_back(array[high]);
                  minResult = array[low] * array[high];//这里其实可以直接返回的，因为同比情况下，两个数字相差越远，他们的乘积越小的，约靠近相差的乘积就越大
               }
               
               low++;
           }else if(sumTemp > sum) high--;
           else
               low++;
       }
       return result;
    }
~~~



### **优化一下**

运行时间：2ms  占用内存：476k

~~~cpp
vector<int> FindNumbersWithSum(vector<int> array,int sum) {
       int low= 0, high = array.size()-1;
       vector<int> result;
       while(low < high){
           int sumTemp = array[low] + array[high];
           if(sumTemp == sum){
               result.push_back(array[low]);
               result.push_back(array[high]);
               return result;

           }else if(sumTemp > sum) high--;
           else
               low++;
       }
       return result;
    }
~~~


<p id = "和为S的两个数字"></p>

