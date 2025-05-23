import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "mycpp-note",
  description: "xinghuai的学习笔记",
  base: '/mycppnoteweb/',
  
  // 重点修改的 markdown 配置
  markdown: {
    anchor: {
      // 配置选项见下文
      // slugify: (str) => encodeURIComponent(str.toLowerCase().replace(/\s+/g, '-')),
      // slugify: (str) => str.toLowerCase().replace(/\s+/g, '-'),\
      slugify: (str) =>
  str
    .toLowerCase()
    .replace(/[\s]/g, '-')                     // 空格转 -
    .replace(/[^\w\u4e00-\u9fa5\-]/g, ''),      // 去除非法字符但保留中文和 -
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '#'
    },
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },

    // // 添加以下配置解决模板语法解析问题
    // anchor: {
    //   slugify(str) {
    //     return encodeURIComponent(str)
    //   }
    // },
    config: (md) => {
      // 防止 Markdown 解析器将尖括号视为 HTML 标签
      md.set({
        html: false // 禁用 HTML 标签解析
      })
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: [1 , 2],

    nav: [
      { text: 'home', link: '/' },
      {
        text: 'linux', items: [
          {
            text: '系统编程',
            collapsed: true,
            items: [
              { text: '系统编程-1', link: '/1-linux阶段汇总/1-黑马linux系统编程课堂笔记-结合课件看' },
              { text: '系统编程-2', link: '/1-linux阶段汇总/2-黑马linux系统编程' },
              { text: '系统编程-3', link: '/1-linux阶段汇总/3-黑马linux系统编程' }
            ]
          },
          {
            text: '网络编程',
            collapsed: true,
            items: [
              { text: '网络编程-1', link: '/1-linux阶段汇总/4-黑马linux网络编程' },
              { text: '网络编程-2', link: '/1-linux阶段汇总/5-黑马网络编程' },
              { text: '网络编程-3', link: '/1-linux阶段汇总/6-黑马网络编程' },
              { text: '网络编程-4', link: '/1-linux阶段汇总/7-黑马网络编程' }
            ]
          },
          { text: '练习代码', link: '/1-linux阶段汇总/8-系统+网络代码练习汇总' },
        ]
      },


      {
        text: 'cpp', items: [
          {
            text: 'cpp中级',
            collapsed: true,
            items: [
              { text: 'cpp中级-1', link: '/中高级c++阶段学习笔记-md/1-中级c++笔记-1' },
              { text: 'cpp中级-2', link: '/中高级c++阶段学习笔记-md/1-中级c++笔记-2' },
              { text: '中级面试', link: '/中高级c++阶段学习笔记-md/1-中级面试问题汇总' }
            ]
          },
          {
            text: 'cpp高级',
            collapsed: true,
            items: [
              { text: 'cpp高级-1', link: '/中高级c++阶段学习笔记-md/2-高级c++笔记-1' },
              { text: 'cpp高级-2', link: '/中高级c++阶段学习笔记-md/2-高级c++笔记-2' },
              { text: '回调函数', link: '/中高级c++阶段学习笔记-md/回调函数' },
              { text: '回顾linux的多线程', link: '/中高级c++阶段学习笔记-md/回顾linux的多线程' }
            ]
          },
        ]

      },
      {
        text: '数据结构',
        items: [
          { text: '数据结构-1', link: '/数据结构/1-数据结构' },
          { text: '数据结构-2', link: '/数据结构/2-数据结构(五大算法之后)' },
          {
            text: '老师PDF',
            link: '/public/Cpp版数据结构和算法课程.pdf',
            target: '_blank'  // 可选：在新标签页打开
          },
          { text: '红黑树扩展', link: '/public/红黑树删除节点.pdf' },
          { text: '数据结构小补充', link: '/数据结构/数据结构小补充' }
        ]
      },
      {
        text: '项目', items: [
          { text: '集群聊天服务器', link: '/markdown-examples' },
          { text: 'mprpc框架', link: '/api-examples' }
        ]
      },
      {
        text: 'mysql', items: [
          { text: 'mysql', link: '/施磊数据库核心/1-数据库笔记' },
          { text: '常用命令小总结', link: '/施磊数据库核心/2-常用命令' }
        ]
      },
      { text: '阿秀八股大全', 
        items: [
          { text: 'c++语法', 
            items: [
              { text: 'c++语法-01-20', link: '/阿秀笔记大全/02-interview/01-01-01-basic' },
              { text: 'c++语法-21-40', link: '/阿秀笔记大全/02-interview/01-01-02-basic' },
              { text: 'c++语法-41-60', link: '/阿秀笔记大全/02-interview/01-01-03-basic' },
              { text: 'c++语法-61-80', link: '/阿秀笔记大全/02-interview/01-01-04-basic' },
              { text: 'c++语法-81-100', link: '/阿秀笔记大全/02-interview/01-01-05-basic' },
              { text: 'c++语法-101-120', link: '/阿秀笔记大全/02-interview/01-01-06-basic' },
              { text: 'c++语法-121-140', link: '/阿秀笔记大全/02-interview/01-01-07-basic' },
              { text: 'c++内存管理', link: '/阿秀笔记大全/02-interview/01-02-01-memory' },
              { text: 'c++STL-1', link: '/阿秀笔记大全/02-interview/01-04-01-STL' },
              { text: 'c++其他-2', link: '/阿秀笔记大全/02-interview/01-05-01-other' },
              { text: 'c++其他-3', link: '/阿秀笔记大全/02-interview/01-05-02-other' }
            ]
          },
          { text: '操作系统', 
            items: [
              { text: '操作系统-01-20', link: '/阿秀笔记大全/02-interview/02-01-os' },
              { text: '操作系统-21-40', link: '/阿秀笔记大全/02-interview/02-02-os' },
              { text: '操作系统-41-60', link: '/阿秀笔记大全/02-interview/02-03-os' },
              { text: '操作系统-61-80', link: '/阿秀笔记大全/02-interview/02-04-os' }
            ]
           },
           { text: '计算机网络',
            items: [
              { text: '计算机网络-01-20', link: '/阿秀笔记大全/02-interview/03-01-net' },
              { text: '计算机网络-21-40', link: '/阿秀笔记大全/02-interview/03-02-net' },
              { text: '计算机网络-41-60', link: '/阿秀笔记大全/02-interview/03-03-net' },
              { text: '计算机网络-61-80', link: '/阿秀笔记大全/02-interview/03-04-net' },
              { text: '计算机网络-81-100', link: '/阿秀笔记大全/02-interview/03-05-net' },
              { text: '计算机网络-101-120', link: '/阿秀笔记大全/02-interview/03-06-net' }
            ]
           },
            { text: ' MySQL',
              items: [
                { text: 'MySQL-01-20', link: '/阿秀笔记大全/02-interview/04-01-01-MySQL' },
                { text: 'MySQL-21-40', link: '/阿秀笔记大全/02-interview/04-01-02-MySQL' },
                { text: 'MySQL-41-60', link: '/阿秀笔记大全/02-interview/04-01-03-MySQL' }
              ]
            },
            { text: 'Redis',
              items: [
                { text: 'Redis-01-20', link: '/阿秀笔记大全/02-interview/04-02-01-Redis' },
                { text: 'Redis-21-40', link: '/阿秀笔记大全/02-interview/04-02-02-Redis' }
              ]
            },
            { text: '分布式',
              items: [
                { text: '分布式-1', link: '/阿秀笔记大全/02-interview/05-01-01-distribution' },
                { text: '分布式-2', link: '/阿秀笔记大全/02-interview/05-01-02-distribution' },
                { text: '分布式-3', link: '/阿秀笔记大全/02-interview/05-01-03-distribution' }
              ]
            },
            { text: '海量数据处理',
              items: [
                { text: '海量数据处理-1', link: '/阿秀笔记大全/02-interview/07-01-massive_data' },
                { text: '海量数据处理-2', link: '/阿秀笔记大全/02-interview/07-02-massive_data' }
              ]
            }
        ]
      },
      { text: '小林coding',
        items: [
          { text: '图解网络', 
            items: [
              { text: '基础篇', link: '/小林coding/net/1-base' },
              { text: 'TCP篇', link: '/小林coding/net/tcp_interview'
               }
            ]
           }
        ]
      }


    ],

    sidebar: [
      {
        text: 'linux',
        items: [
          {
            text: '系统编程',
            collapsed: true,
            items: [
              { text: '系统编程-1', link: '/1-linux阶段汇总/1-黑马linux系统编程课堂笔记-结合课件看' },
              { text: '系统编程-2', link: '/1-linux阶段汇总/2-黑马linux系统编程' },
              { text: '系统编程-3', link: '/1-linux阶段汇总/3-黑马linux系统编程' }
            ]
          },
          {
            text: '网络编程',
            collapsed: true,
            items: [
              { text: '网络编程-1', link: '/1-linux阶段汇总/4-黑马linux网络编程' },
              { text: '网络编程-2', link: '/1-linux阶段汇总/5-黑马网络编程' },
              { text: '网络编程-3', link: '/1-linux阶段汇总/6-黑马网络编程' },
              { text: '网络编程-4', link: '/1-linux阶段汇总/7-黑马网络编程' }
            ]
          },
          { text: '练习代码', link: '/1-linux阶段汇总/8-系统+网络代码练习汇总' },
        ]
      },
      {
        text: 'cpp',
        items: [
          {
            text: 'cpp中级',
            collapsed: true,
            items: [
              { text: 'cpp中级-1', link: '/中高级c++阶段学习笔记-md/1-中级c++笔记-1' },
              { text: 'cpp中级-2', link: '/中高级c++阶段学习笔记-md/1-中级c++笔记-2' },
              { text: '中级面试', link: '/中高级c++阶段学习笔记-md/1-中级面试问题汇总' }
            ]
          },
          {
            text: 'cpp高级',
            collapsed: true,
            items: [
              { text: 'cpp高级-1', link: '/中高级c++阶段学习笔记-md/2-高级c++笔记-1' },
              { text: 'cpp高级-2', link: '/中高级c++阶段学习笔记-md/2-高级c++笔记-2' },
              { text: '回调函数', link: '/中高级c++阶段学习笔记-md/回调函数' },
              { text: '回顾linux的多线程', link: '/中高级c++阶段学习笔记-md/回顾linux的多线程' }
            ]
          },
        ]

      },
      {
        text: '数据结构',
        collapsed: true,
        items: [
          { text: '数据结构-1', link: '/数据结构/1-数据结构' },
          { text: '数据结构-2', link: '/数据结构/2-数据结构(五大算法之后)' },
          {
            text: '老师PDF',
            link: '/public/Cpp版数据结构和算法课程.pdf'
          },
          { text: '红黑树扩展', link: '/public/红黑树删除节点.pdf' },
          { text: '数据结构小补充', link: '/数据结构/数据结构小补充' }
        ]
      },
      {
        text: '项目',
        collapsed: true,
        items: [
          { text: '集群聊天服务器', link: '/markdown-examples' },
          { text: 'mprpc框架', link: '/api-examples' }
        ]
      },
      {
        text: 'mysql',
        collapsed: true,
        items: [
          { text: 'mysql', link: '/施磊数据库核心/1-数据库笔记' },
          { text: '常用命令小总结', link: '/施磊数据库核心/2-常用命令' }
        ]
      },
      { text: '阿秀八股大全', 
        collapsed: true,
        items: [
          { text: 'c++语法', 
            items: [
              { text: 'c++语法-01-20', link: '/阿秀笔记大全/02-interview/01-01-01-basic' },
              { text: 'c++语法-21-40', link: '/阿秀笔记大全/02-interview/01-01-02-basic' },
              { text: 'c++语法-41-60', link: '/阿秀笔记大全/02-interview/01-01-03-basic' },
              { text: 'c++语法-61-80', link: '/阿秀笔记大全/02-interview/01-01-04-basic' },
              { text: 'c++语法-81-100', link: '/阿秀笔记大全/02-interview/01-01-05-basic' },
              { text: 'c++语法-101-120', link: '/阿秀笔记大全/02-interview/01-01-06-basic' },
              { text: 'c++语法-121-140', link: '/阿秀笔记大全/02-interview/01-01-07-basic' },
              { text: 'c++内存管理', link: '/阿秀笔记大全/02-interview/01-02-01-memory' },
              { text: 'c++STL-1', link: '/阿秀笔记大全/02-interview/01-04-01-STL' },
              { text: 'c++其他-2', link: '/阿秀笔记大全/02-interview/01-05-01-other' },
              { text: 'c++其他-3', link: '/阿秀笔记大全/02-interview/01-05-02-other' }
            ]
          },
          { text: '操作系统', 
            items: [
              { text: '操作系统-01-20', link: '/阿秀笔记大全/02-interview/02-01-os' },
              { text: '操作系统-21-40', link: '/阿秀笔记大全/02-interview/02-02-os' },
              { text: '操作系统-41-60', link: '/阿秀笔记大全/02-interview/02-03-os' },
              { text: '操作系统-61-80', link: '/阿秀笔记大全/02-interview/02-04-os' }
            ]
           },
           { text: '计算机网络',
            items: [
              { text: '计算机网络-01-20', link: '/阿秀笔记大全/02-interview/03-01-net' },
              { text: '计算机网络-21-40', link: '/阿秀笔记大全/02-interview/03-02-net' },
              { text: '计算机网络-41-60', link: '/阿秀笔记大全/02-interview/03-03-net' },
              { text: '计算机网络-61-80', link: '/阿秀笔记大全/02-interview/03-04-net' },
              { text: '计算机网络-81-100', link: '/阿秀笔记大全/02-interview/03-05-net' },
              { text: '计算机网络-101-120', link: '/阿秀笔记大全/02-interview/03-06-net' }
            ]
           },
            { text: ' MySQL',
              items: [
                { text: 'MySQL-01-20', link: '/阿秀笔记大全/02-interview/04-01-01-MySQL' },
                { text: 'MySQL-21-40', link: '/阿秀笔记大全/02-interview/04-01-02-MySQL' },
                { text: 'MySQL-41-60', link: '/阿秀笔记大全/02-interview/04-01-03-MySQL' }
              ]
            },
            { text: 'Redis',
              items: [
                { text: 'Redis-01-20', link: '/阿秀笔记大全/02-interview/04-02-01-Redis' },
                { text: 'Redis-21-40', link: '/阿秀笔记大全/02-interview/04-02-02-Redis' }
              ]
            },
            { text: '分布式',
              items: [
                { text: '分布式-1', link: '/阿秀笔记大全/02-interview/05-01-01-distribution' },
                { text: '分布式-2', link: '/阿秀笔记大全/02-interview/05-01-02-distribution' },
                { text: '分布式-3', link: '/阿秀笔记大全/02-interview/05-01-03-distribution' }
              ]
            },
            { text: '海量数据处理',
              items: [
                { text: '海量数据处理-1', link: '/阿秀笔记大全/02-interview/07-01-massive_data' },
                { text: '海量数据处理-2', link: '/阿秀笔记大全/02-interview/07-02-massive_data' }
              ]
            }
        ]
      },
      { text: '小林coding',
        collapsed: true,
        items: [
          { text: '图解网络', 
            collapsed: true,
            items: [
              { text: '基础篇', collapsed: true, link: '/小林coding/net/1-base' },
              { text: 'TCP篇', 
                collapsed: true,
                items: [
                  { text: 'tcp.1', link: '/小林coding/net/tcp_interview' },
                  { text: 'tcp.2', link: '/小林coding/net/tcp_feature' },
                  { text: 'tcp.3', link: '/小林coding/net/tcp_tcpdump' },
                  { text: 'tcp.4', link: '/小林coding/net/tcp_queue' },
                  { text: 'tcp.5', link: '/小林coding/net/tcp_optimize' },
                  { text: 'tcp.6', link: '/小林coding/net/tcp_stream' },
                  { text: 'tcp.7', link: '/小林coding/net/isn_deff' },
                  { text: 'tcp.8', link: '/小林coding/net/syn_drop' },
                  { text: 'tcp.9', link: '/小林coding/net/challenge_ack' },
                  { text: 'tcp.10', link: '/小林coding/net/out_of_order_fin' },
                  { text: 'tcp.11', link: '/小林coding/net/time_wait_recv_syn' },
                  { text: 'tcp.12', link: '/小林coding/net/tcp_down_and_crash' },
                  { text: 'tcp.13', link: '/小林coding/net/tcp_unplug_the_network_cable' },
                  { text: 'tcp.14', link: '/小林coding/net/tcp_tw_reuse_close' },
                  { text: 'tcp.15', link: '/小林coding/net/tcp_tls' },
                  { text: 'tcp.16', link: '/小林coding/net/tcp_http_keepalive' },
                  { text: 'tcp.17', link: '/小林coding/net/tcp_problem' },
                  { text: 'tcp.18', link: '/小林coding/net/quic' },
                  { text: 'tcp.19', link: '/小林coding/net/port' },
                  { text: 'tcp.20', link: '/小林coding/net/tcp_no_listen' },
                  { text: 'tcp.21', link: '/小林coding/net/tcp_no_accpet' },
                  { text: 'tcp.22', link: '/小林coding/net/tcp_drop' },
                  { text: 'tcp.23', link: '/小林coding/net/tcp_three_fin' }
                ]
               }
            ]
           }
        ]
      }

    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xinghuaiaaa/mycpp-note' }
    ],

    footer: {
      copyright: "Copyright © 2025-present xinghuai",
    }

  },
  


})
