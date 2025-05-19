---
layout:  post
category:  algorithm
title:  No53、表示数值的字符串
tagline:  by 阿秀
tags:
    - 原创
    - 剑指offer
    - 数据结构与算法
    - 算法
    - 社招
    - 校招
    - 阿秀
excerpt: No53、表示数值的字符串
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

## **No53、表示数值的字符串**

<font style="font-weight:normal; color:#4169E1;text-decoration:underline;" target="_blank"> [牛客网原题链接](https://www.nowcoder.com/practice/6f8c901d091949a5837e24bb82a731f2?tpId=13&&tqId=11206&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)</font>

### **题目描述**

请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。例如，字符串"+100","5e2","-123","3.1416"和"-1E-16"都表示数值。 但是"12e","1a3.14","1.2.3","+-5"和"12e+4.3"都不是。

### **示例1**

**输入**

```
"123.45e+6"
```

**返回值**

```
true
```

**示例2**

**输入**

```
"1.2.3"
```

**返回值**

```
false
```

### **1、看的写法，很好**

~~~cpp
bool isNumeric(char* string)
{
    // 正反标记符号、小数点、e是否出现过
    bool sign = false, decimal = false, hasE = false;
    for (int i = 0; i < strlen(string); ++i) {
        if (string[i] == 'e' || string[i] == 'E') {
            if (i == strlen(string) - 1) return false; // e后面一定要接数字
            if (hasE) return false;  // 不能同时存在两个e
            hasE = true;
        }
        else if (string[i] == '+' || string[i] == '-') {
            // 第二次出现+-符号，则必须紧接在e之后
            if (sign && string[i - 1] != 'e' && string[i - 1] != 'E') return false;
            // 第一次出现+-符号，且不是在字符串开头，则也必须紧接在e之后
            if (!sign && i > 0 && string[i - 1] != 'e' && string[i - 1] != 'E') return false;
            sign = true;
        }
        else if (string[i] == '.') {
            // e后面不能接小数点，小数点不能出现两次
            if (hasE || decimal) return false;
            decimal = true;
        }
        else if (string[i] < '0' || string[i] > '9') // 不合法字符
            return false;
    }
    return true;

}
~~~



### **二刷：**

### **1、还是不会**

运行时间：2ms  占用内存：380k

1、e后面必须是数字 只能有一个e

2、正负号只能出现一次，即使出现第二次了，那他的前面也要是 e/ E ,出现第一次的话必须在开头或者在E的后面

3、小数点也只能出现一次，且不能再E的后面

4、合法字符的判断 除了 e +-  . 以及数字之外 其余的字符都是错的。

~~~cpp
bool isNumeric(char* string)
{
    bool sign = false, decimal = false,hasE = false;//正负号 小数点 e
    int len = strlen(string);
    for(int i = 0; i < len; ++i){
        if(string[i] == 'e' || string[i] == 'E'){
            if( i == len - 1) return false;//e 的后面必须要出现数字 对应 12e
            if(hasE) return false;//只能有一个e
            hasE = true;

        }else if(string[i] == '+' || string[i] == '-'){                
            if(!sign && i>0 && string[i-1] !='e' && string[i-1] != 'E')// 12e+5 如果第一次出现，且不是在开头，那么也要紧跟在e/E之后
                return false;
            if(sign && string[i-1] !='e' && string[i-1] !='E')// +5e-6  第二次出现，那也要跟在 e/E之后
                return false;
            sign = true;
        }else if(string[i] == '.'){
            if(decimal) return false; 
            if(hasE) return false;// E后面不能跟小数点  12e+4.3

            decimal = true;

        }else if(string[i] < '0' || string[i] > '9')//不合法字符
            return false;

    }
    return true;
}
~~~


<p id = "表示数值的字符串"></p>

