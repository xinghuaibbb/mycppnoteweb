---
layout:  post
category:  algorithm
title:  No23、二叉搜索树的后序遍历序列
tagline:  by 阿秀
tags:
    - 原创
    - 剑指offer
    - 数据结构与算法
    - 算法
    - 社招
    - 校招
    - 阿秀
excerpt: No23、二叉搜索树的后序遍历序列
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



## **No23、二叉搜索树的后序遍历序列**

<font style="font-weight:normal; color:#4169E1;text-decoration:underline;" target="_blank">[牛客网原题链接](https://www.nowcoder.com/practice/a861533d45854474ac791d90e447bafd?tpId=13&&tqId=11176&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)</font>

### **题目描述**

从上往下打印出二叉树的每个节点，同层节点从左至右打印。

### **示例1**

**输入**

~~~
{5,4,#,3,#,2,#,1}
~~~
**返回值**

~~~
[5,4,3,2,1]
~~~



### **1、递归写法，树主要的做法就是递归**

~~~cpp
bool VerifySquenceOfBST(vector<int> sequence) {
	if (sequence.empty())  return false;
	if (sequence.size() == 1) return true;
	return VerifySquenceOfBSTCore(sequence, 0, sequence.size()-1);
}

bool VerifySquenceOfBSTCore(vector<int>& sequence, int start, int end) {
	if (start >= end) return true;
	int low = start;
	while (low < end && sequence[low] < sequence[end])  ++low;

	for (int i = low; i < end; ++i) {
		if (sequence[i] <= sequence[end]) return false;
	}

	return  VerifySquenceOfBSTCore(sequence, start,low-1) &&
		VerifySquenceOfBSTCore(sequence, low,end-1);
}

~~~



### **二刷：依然没有思路，值得再看一遍**

1、并没有想象中的难，下次应该仔细想一想的

~~~cpp
    bool VerifySquenceOfBSTCore(vector<int>&sequence,int low,int high){
        if(low >= high) return true;
        int start = low;
        while(start < high && sequence[start] < sequence[high]) ++start;//二叉搜索树，左右根，左子树全部小于根
        //右子树全部打大于根，找到第一个大于根的元素，那么在他之前都是左子树，之后都是右子树
        for(int i = start;i < high; ++i)
            if(sequence[i] <= sequence[high]) return false; //右子树必须全部大于根，否则就是假
        return VerifySquenceOfBSTCore(sequence, low, start-1) //判断当前节点的其左子树
            && VerifySquenceOfBSTCore(sequence, start, high-1);//判断当前节点的其右子树

    }
    bool VerifySquenceOfBST(vector<int> sequence) {

        if(sequence.empty()) return false;//为空，则为假
        if(sequence.size() == 1) return true;//只有一个元素，为真
        
        return VerifySquenceOfBSTCore(sequence,0,sequence.size()-1);
    }
~~~

<p id = "二叉搜索树的后序遍历序列"></p>

