---
layout:  post
category:  algorithm
title:  No56、删除链表中的重复结点
tagline:  by 阿秀
tags:
    - 原创
    - 剑指offer
    - 数据结构与算法
    - 算法
    - 社招
    - 校招
    - 阿秀
excerpt: No56、删除链表中的重复结点
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
<p id = "删除链表中的重复结点"></p>


## **No56、删除链表中的重复结点**

<font style="font-weight:normal; color:#4169E1;text-decoration:underline;" target="_blank">[牛客网原题链接](https://www.nowcoder.com/practice/fc533c45b73a41b0b44ccba763f866ef?tpId=13&&tqId=11209&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)</font>

### **题目描述**

在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。 例如，链表1->2->3->3->4->4->5 处理后为 1->2->5

### **示例1**

**输入**

~~~
{1,2,3,3,4,4,5}
~~~
**返回值**

~~~
{1,2,5}
~~~



### **1、真的是超级笨，我服了，调试了很多遍才通过的**

大概思想：采用vector保存链表中的不重复元素，然后将链表从表头开始挨个对比，一样就将当前结点保存下来，然后index++，不一样就继续向下遍历，注意边界条件。

~~~cpp
ListNode* deleteDuplication(ListNode* pHead)
{
    if (pHead == nullptr || pHead->next == nullptr) return pHead;
    ListNode* node = (ListNode*)malloc(sizeof(struct ListNode));
    node = pHead;
    vector<int> result;
    result.push_back(node->val);
    node = node->next;
    while (node != nullptr) {
        if (result.size()!=0 && result.back() == node->val) {
            while (node!=nullptr && result.back() == node->val) {
                node = node->next;
            }
            result.pop_back();
        }
        else if (result.size() == 0 || (result.size()!=0 && result.back()!=node->val))
        {
            result.push_back(node->val);
            node = node->next;
        }	
        else
            node = node->next;
    }

    if (result.size() == 0) {
        return nullptr;
    }
    node = pHead;
    int index = 0;
    int len = result.size();
    ListNode* resultNode = (ListNode*)malloc(sizeof(struct ListNode));
    while (node != nullptr) {
        if (index<len && node->val == result[index]) {
            index++;
            resultNode = node;
            break;

        } node = node->next;
    }
    pHead = resultNode;
    while (node != nullptr) {
        if (index < len && node->val == result[index]) {
            index++;
            pHead->next = node;
            pHead = pHead->next;

        } node = node->next;
    }
    pHead->next = nullptr;//最后要设置尾点结束
    return resultNode;
}
~~~



### **2、别人的思路和方法，三指针法，取到原来指针的前一个指针**

1. 首先添加一个头节点，以方便碰到第一个，第二个节点就相同的情况

​    2.设置 pre ，cur指针， pre指针指向当前确定不重复的那个节点，而last指针相当于工作指针，一直往后面搜索。

~~~cpp
if (pHead == nullptr || pHead->next == nullptr) { return pHead; }
	ListNode *Head = (ListNode*)malloc(sizeof(struct ListNode));
	ListNode* pre = (ListNode*)malloc(sizeof(struct ListNode));
	ListNode* cur = (ListNode*)malloc(sizeof(struct ListNode));
	Head->next = pHead;
	pre = Head; //pre相当于原来节点的前一个节点
	cur = Head->next; //cur相当于 原来的节点
	while (cur != nullptr) {
		if (cur->next != nullptr && cur->val == cur->next->val) {
			// 找到最后的一个相同节点
			while (cur->next != nullptr && cur->val == cur->next->val) {
				cur = cur->next;
			}
			pre->next = cur->next; //这里等于cur->next真的很棒
			cur = cur->next;
		}
		else {
			pre = pre->next;
			cur = cur->next;
		}
	}
	return Head->next;
~~~



### **二刷：**

### **1、三指针法，可以将元素开辟到栈上**

~~~cpp
ListNode* deleteDuplication(ListNode* pHead)
{

    if(pHead == nullptr || pHead->next == nullptr) return pHead;
    ListNode dummpyHead(0);
    dummpyHead.next = pHead;
    ListNode *pre = &dummpyHead;
    ListNode *cur = dummpyHead.next;//cur是真正工作的节点
    while(cur != nullptr){
        if(cur->next != nullptr && cur->val == cur->next->val){
            while(cur->next != nullptr && cur->val == cur->next->val)
            {
                cur = cur->next;
            }
            pre->next = cur->next;//这里还不要马上把 pre 赋值过来
            cur = cur->next;
        }else{
            pre = pre->next;
            cur = cur->next;
        }
    }
    return dummpyHead.next;
}
~~~



### **变种：删除链表中的重复结点，保留一个重复点**

在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点保留，返回链表头指针。 例如，链表1->2->3->3->4->4->5 处理后为 1->2->3->4->5

~~~cpp
ListNode* deleteDuplication(ListNode* pHead)
{
    if (pHead == nullptr) return nullptr;
    ListNode* node = (ListNode*)malloc(sizeof(struct ListNode));
    node = pHead;
    while (node != nullptr) {

        if (node->next!=nullptr && node->val == node->next->val) {//这里千万要判断node->next也不为空才可以
            while (node->next != nullptr && node->val == node->next->val) {
                node->next = node->next->next;
            }
        }
        node = node->next;
    }
    return pHead;
}
~~~



### **另一种写法**

~~~cpp
ListNode* deleteDuplication(ListNode* pHead)
{
	if (pHead == nullptr || pHead->next == nullptr) return pHead;
	ListNode dummpyHead(0);
	dummpyHead.next = pHead;
	ListNode* pre = &dummpyHead;
	ListNode* cur = dummpyHead.next;
	while (cur != nullptr) {
		if (cur->next != nullptr && cur->val == cur->next->val) {
			while (cur->next != nullptr && cur->val == cur->next->val)
			{
				cur = cur->next;
			}
			pre->next = cur;
			pre = pre->next;
			cur = cur->next;
		}
		else {
			pre = pre->next;
			cur = cur->next;
		}

	}
	return dummpyHead.next;
}
~~~
