# 4.1 TCP 三次握手与四次挥手面试题

大家好，我是小林。

**任 TCP 虐我千百遍，我仍待 TCP 如初恋。**

巨巨巨巨长的提纲，发车！发车！

![](https://img-blog.csdnimg.cn/1310bf5ed78e4c8186481c47719e0793.png)



> PS：本次文章不涉及 TCP 流量控制、拥塞控制、可靠性传输等方面知识，这些知识在这篇：[你还在为 TCP 重传、滑动窗口、流量控制、拥塞控制发愁吗？看完图解就不愁了](https://mp.weixin.qq.com/s/Tc09ovdNacOtnMOMeRc_uA)

---

# TCP 基本认识

## TCP 头格式有哪些？

我们先来看看 TCP 头的格式，标注颜色的表示与本文关联比较大的字段，其他字段不做详细阐述。

![TCP 头格式](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzYuanBn?x-oss-process=image/format,png)

**序列号**：在建立连接时由计算机生成的随机数作为其初始值，通过 SYN 包传给接收端主机，每发送一次数据，就「累加」一次该「数据字节数」的大小。**用来解决网络包乱序问题。**

**确认应答号**：指下一次「期望」收到的数据的序列号，发送端收到这个确认应答以后可以认为在这个序号以前的数据都已经被正常接收。**用来解决丢包的问题。**

**控制位：**

- *ACK*：该位为 `1` 时，「确认应答」的字段变为有效，TCP 规定除了最初建立连接时的 `SYN` 包之外该位必须设置为 `1` 。
- *RST*：该位为 `1` 时，表示 TCP 连接中出现异常必须强制断开连接。
- *SYN*：该位为 `1` 时，表示希望建立连接，并在其「序列号」的字段进行序列号初始值的设定。
- *FIN*：该位为 `1` 时，表示今后不会再有数据发送，希望断开连接。当通信结束希望断开连接时，通信双方的主机之间就可以相互交换 `FIN` 位为 1 的 TCP 段。

> ## hzh
>
> ### TCP头格式:
>
> ####  序列号（Sequence Number）
>
> - **作用**：用于**数据包重排序**，确保接收方按顺序重组数据，**解决乱序问题**。
>
> #### 确认应答号（Acknowledgment Number）
>
> - **作用**：用于**确认数据传输成功**，实现可靠传输，**解决丢包问题**。
>
> #### 控制位
>
> | 控制位  | 含义及作用                                                   |
> | ------- | ------------------------------------------------------------ |
> | **ACK** | 表示“确认号”字段有效，除初始连接建立外都需设为 `1`。         |
> | **RST** | 表示出现异常，需**强制断开连接**。 1                         |
> | **SYN** | 表示请求建立连接，并携带初始序列号。 1                       |
> | **FIN** | 表示发送方**不再发送数据**，请求断开连接。双方需各自发送一次 `FIN` 才能完全关闭连接。 1 |
>
> 

## 为什么需要 TCP 协议？TCP 工作在哪一层？

`IP` 层是「不可靠」的，它不保证网络包的交付、不保证网络包的按序交付、也不保证网络包中的数据的完整性。

![OSI 参考模型与 TCP/IP 的关系](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzcuanBn?x-oss-process=image/format,png)

如果需要保障网络数据包的可靠性，那么就需要由上层（传输层）的 `TCP` 协议来负责。

因为 TCP 是一个工作在**传输层**的**可靠**数据传输的服务，它能确保接收端接收的网络包是**无损坏、无间隔、非冗余和按序的。**

> ## hzh
>
> TCP 是 工作在**传输层**的**可靠**数据传输的服务，它能确保接收端接收的网络包是**无损坏、无间隔、非冗余和按序的。**

## 什么是 TCP？

TCP 是**面向连接的、可靠的、基于字节流**的传输层通信协议。

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzguanBn?x-oss-process=image/format,png)

- **面向连接**：一定是「一对一」才能连接，不能像 UDP 协议可以一个主机同时向多个主机发送消息，也就是一对多是无法做到的；

- **可靠的**：无论网络链路中出现了怎样的链路变化，TCP 都可以保证一个报文一定能够到达接收端；

- **字节流**：用户消息通过 TCP 协议传输时，消息可能会被操作系统「分组」成多个的 TCP 报文，如果接收方的程序如果不知道「消息的边界」，是无法读出一个有效的用户消息的。并且 TCP 报文是「有序的」，当「前一个」TCP 报文没有收到的时候，即使它先收到了后面的 TCP 报文，那么也不能扔给应用层去处理，同时对「重复」的 TCP 报文会自动丢弃。

> ## hzh
>
> TCP 是一种**面向连接（1 对 1）、可靠传输（确保数据完整送达）、基于字节流（无结构、连续的数据流）**的传输层通信协议。

## 什么是 TCP 连接？

我们来看看 RFC 793 是如何定义「连接」的：

*Connections:
The reliability and flow control mechanisms described above require that TCPs initialize and maintain certain status information for each data stream.  The combination of this information, including sockets, sequence numbers, and window sizes, is called a connection.*

简单来说就是，**用于保证可靠性和流量控制维护的某些状态信息，这些信息的组合，包括 Socket、序列号和窗口大小称为连接。**

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzkuanBn?x-oss-process=image/format,png)

所以我们可以知道，建立一个 TCP 连接是需要客户端与服务端达成上述三个信息的共识。

- **Socket**：由 IP 地址和端口号组成
- **序列号**：用来解决乱序问题等
- **窗口大小**：用来做流量控制

> ## hzh
>
> - **Socket**：由 IP 地址和端口号组成
> - **序列号**：用来解决乱序问题等
> - **窗口大小**：用来做流量控制

## 如何唯一确定一个 TCP 连接呢？

TCP 四元组可以唯一的确定一个连接，四元组包括如下：

- 源地址
- 源端口
- 目的地址
- 目的端口

![TCP 四元组](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzEwLmpwZw?x-oss-process=image/format,png)

源地址和目的地址的字段（32 位）是在 IP 头部中，作用是通过 IP 协议发送报文给对方主机。

源端口和目的端口的字段（16 位）是在 TCP 头部中，作用是告诉 TCP 协议应该把报文发给哪个进程。

> 有一个 IP 的服务端监听了一个端口，它的 TCP 的最大连接数是多少？

服务端通常固定在某个本地端口上监听，等待客户端的连接请求。

因此，客户端 IP 和端口是可变的，其理论值计算公式如下：

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzExLmpwZw?x-oss-process=image/format,png)

对 IPv4，客户端的 IP 数最多为 `2` 的 `32` 次方，客户端的端口数最多为 `2` 的 `16` 次方，也就是服务端单机最大 TCP 连接数，约为 `2` 的 `48` 次方。

当然，服务端最大并发 TCP 连接数远不能达到理论上限，会受以下因素影响：

- **文件描述符限制**，每个 TCP 连接都是一个文件，如果文件描述符被占满了，会发生 Too many open files。Linux 对可打开的文件描述符的数量分别作了三个方面的限制：
  - **系统级**：当前系统可打开的最大数量，通过 `cat /proc/sys/fs/file-max` 查看；
  - **用户级**：指定用户可打开的最大数量，通过 `cat /etc/security/limits.conf` 查看；
  - **进程级**：单个进程可打开的最大数量，通过 `cat /proc/sys/fs/nr_open` 查看；
- **内存限制**，每个 TCP 连接都要占用一定内存，操作系统的内存是有限的，如果内存资源被占满后，会发生 OOM。

> ## hzh
>
> ### TCP 四元组：唯一标识一个连接
>
> 包含以下四个要素：
>
> - **源 IP 地址**（IP 头部，32 位）
> - **源端口号**（TCP 头部，16 位）
> - **目的 IP 地址**（IP 头部，32 位）
> - **目的端口号**（TCP 头部，16 位）
>
> > **作用**：在同一时间内唯一标识一条 TCP 连接。
>
> ------
>
> ### 服务端最大 TCP 连接数（理论值）
>
> 服务端监听端口固定，连接数取决于**客户端 IP + 客户端端口**的组合：
>
> - IPv4 客户端 IP 数：2³²
> - 客户端端口数：2¹⁶----tcp定义 端口号为 16位
> - 理论最大连接数：**2⁴⁸ ≈ 281 万亿**
>
> ------
>
> ### 实际连接数受以下因素限制：
>
> 1. **文件描述符限制**（每个连接都是一个文件）：
>
>    - 系统级：`/proc/sys/fs/file-max`
>    - 用户级：`/etc/security/limits.conf`
>    - 进程级：`/proc/sys/fs/nr_open`
>
> 2. **内存资源限制**：每个连接占用内存，内存不足会导致 OOM。
>
>    
>
> **OOM（Out of Memory）** 是操作系统在**内存耗尽**时发生的一种错误，中文常称为“内存溢出”或“内存不足”。

## UDP 和 TCP 有什么区别呢？分别的应用场景是？

UDP 不提供复杂的控制机制，利用 IP 提供面向「无连接」的通信服务。

UDP 协议真的非常简单，头部只有 `8` 个字节（64 位），UDP 的头部格式如下：

![UDP 头部格式](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzEyLmpwZw?x-oss-process=image/format,png)

- 目标和源端口：主要是告诉 UDP 协议应该把报文发给哪个进程。
- 包长度：该字段保存了 UDP 首部的长度跟数据的长度之和。
- 校验和：校验和是为了提供可靠的 UDP 首部和数据而设计，防止收到在网络传输中受损的 UDP 包。

**TCP 和 UDP 区别：**

*1. 连接*

- TCP 是面向连接的传输层协议，传输数据前先要建立连接。
- UDP 是不需要连接，即刻传输数据。

*2. 服务对象*

- TCP 是一对一的两点服务，即一条连接只有两个端点。
- UDP 支持一对一、一对多、多对多的交互通信

*3. 可靠性*

- TCP 是可靠交付数据的，数据可以无差错、不丢失、不重复、按序到达。
- UDP 是尽最大努力交付，不保证可靠交付数据。但是我们可以基于 UDP 传输协议实现一个可靠的传输协议，比如 QUIC 协议，具体可以参见这篇文章：[如何基于 UDP 协议实现可靠传输？](https://xiaolincoding.com/network/3_tcp/quic.html)

*4. 拥塞控制、流量控制*

- TCP 有拥塞控制和流量控制机制，保证数据传输的安全性。
- UDP 则没有，即使网络非常拥堵了，也不会影响 UDP 的发送速率。

*5. 首部开销*

- TCP 首部长度较长，会有一定的开销，首部在没有使用「选项」字段时是 `20` 个字节，如果使用了「选项」字段则会变长的。
- UDP 首部只有 8 个字节，并且是固定不变的，开销较小。

*6. 传输方式*

- TCP 是流式传输，没有边界，但保证顺序和可靠。
- UDP 是一个包一个包的发送，是有边界的，但可能会丢包和乱序。

*7. 分片不同*

- TCP 的数据大小如果大于 MSS 大小，则会在传输层进行分片，目标主机收到后，也同样在传输层组装 TCP 数据包，如果中途丢失了一个分片，只需要传输丢失的这个分片。
- UDP 的数据大小如果大于 MTU 大小，则会在 IP 层进行分片，目标主机收到后，在 IP 层组装完数据，接着再传给传输层。

**TCP 和 UDP 应用场景：**

由于 TCP 是面向连接，能保证数据的可靠性交付，因此经常用于：

- `FTP` 文件传输；
- HTTP / HTTPS；

由于 UDP 面向无连接，它可以随时发送数据，再加上 UDP 本身的处理既简单又高效，因此经常用于：

- 包总量较少的通信，如 `DNS` 、`SNMP` 等；
- 视频、音频等多媒体通信；
- 广播通信；

> 为什么 UDP 头部没有「首部长度」字段，而 TCP 头部有「首部长度」字段呢？

原因是 TCP 有**可变长**的「选项」字段，而 UDP 头部长度则是**不会变化**的，无需多一个字段去记录 UDP 的首部长度。

> 为什么 UDP 头部有「包长度」字段，而 TCP 头部则没有「包长度」字段呢？

先说说 TCP 是如何计算负载数据长度：

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzEzLmpwZw?x-oss-process=image/format,png)

其中 IP 总长度 和 IP 首部长度，在 IP 首部格式是已知的。TCP 首部长度，则是在 TCP 首部格式已知的，所以就可以求得 TCP 数据的长度。

大家这时就奇怪了问：“UDP 也是基于 IP 层的呀，那 UDP 的数据长度也可以通过这个公式计算呀？为何还要有「包长度」呢？”

这么一问，确实感觉 UDP 的「包长度」是冗余的。

我查阅了很多资料，我觉得有两个比较靠谱的说法：
- 第一种说法：因为为了网络设备硬件设计和处理方便，首部长度需要是 `4` 字节的整数倍。如果去掉 UDP 的「包长度」字段，那 UDP 首部长度就不是 `4` 字节的整数倍了，所以我觉得这可能是为了补全 UDP 首部长度是  `4` 字节的整数倍，才补充了「包长度」字段。
- 第二种说法：如今的 UDP 协议是基于 IP 协议发展的，而当年可能并非如此，依赖的可能是别的不提供自身报文长度或首部长度的网络层协议，因此 UDP 报文首部需要有长度字段以供计算。



> ## HZH
>
> ### UDP 协议简介
>
> - UDP 是**无连接、简单高效**的传输层协议，依赖 IP 提供无连接服务。
> - UDP 头部长度固定为 8 字节，结构包括：
>   - 源端口、目标端口（各 16 位）：指明报文接收进程。
>   - 包长度（16 位）：UDP 首部 + 数据长度。
>   - 校验和（16 位）：用于检测数据在传输过程中是否损坏。
>
> ------
>
> ### TCP 和 UDP 的主要区别
>
> | 方面       | TCP                         | UDP                                    |
> | ---------- | --------------------------- | -------------------------------------- |
> | 连接方式   | 面向连接，先建立连接        | 无连接，随时发送                       |
> | 服务对象   | 一对一                      | 一对一、一对多、多对多                 |
> | 可靠性     | 可靠传输（顺序、无丢包）    | 不保证可靠，尽最大努力交付             |
> | 拥塞和流控 | 有拥塞控制和流量控制        | 无拥塞控制和流量控制                   |
> | 首部大小   | 20 字节起（含可变选项字段） | 固定 8 字节                            |
> | 传输方式   | 面向字节流-流式传输         | 面向数据报（有边界）--一个包一个包发送 |
> | 分片处理   | 传输层分片和重组            | IP 层分片和重组                        |
>
> 
>
> ------
>
> ### 应用场景
>
> - **TCP** 适用于需要可靠传输的场景，如：
>   - 文件传输（FTP）
>   - Web 浏览（HTTP/HTTPS）
> - **UDP** 适合对实时性要求高且能容忍丢包的场景，如：
>   - DNS 查询、SNMP
>   - 视频、音频流媒体
>   - 广播和多播通信
>
> ------
>
> ### 关于 UDP 头部字段的额外说明
>
> - UDP 头部无「首部长度」字段，因为其头部长度固定，不会变化。
> - UDP 有「包长度」字段，而 TCP 没有，因为：
>   - TCP 通过 IP 头部长度和 TCP 头部长度计算数据长度；
>   - UDP 的包长度字段有助于网络设备硬件处理，也可能是历史遗留原因（早期非 IP 协议环境）。
>
> 

## TCP 和 UDP 可以使用同一个端口吗？

答案：**可以的**。

在数据链路层中，通过 MAC 地址来寻找局域网中的主机。在网际层中，通过 IP 地址来寻找网络中互连的主机或路由器。在传输层中，需要通过端口进行寻址，来识别同一计算机中同时通信的不同应用程序。

所以，传输层的「端口号」的作用，是为了区分同一个主机上不同应用程序的数据包。

传输层有两个传输协议分别是 TCP 和 UDP，在内核中是两个完全独立的软件模块。

当主机收到数据包后，可以在 IP 包头的「协议号」字段知道该数据包是 TCP/UDP，所以可以根据这个信息确定送给哪个模块（TCP/UDP）处理，送给 TCP/UDP 模块的报文根据「端口号」确定送给哪个应用程序处理。

![img](https://cdn.xiaolincoding.com/gh/xiaolincoder/network/port/tcp%E5%92%8Cudp%E6%A8%A1%E5%9D%97.jpeg)

因此，TCP/UDP 各自的端口号也相互独立，如 TCP 有一个 80 号端口，UDP 也可以有一个 80 号端口，二者并不冲突。

关于端口的知识点，还是挺多可以讲的，比如还可以牵扯到这几个问题：

- 多个 TCP 服务进程可以同时绑定同一个端口吗？
- 重启 TCP 服务进程时，为什么会出现“Address in use”的报错信息？又该怎么避免？
- 客户端的端口可以重复使用吗？
- 客户端 TCP 连接 TIME_WAIT 状态过多，会导致端口资源耗尽而无法建立新的连接吗？

上面这些问题，可以看这篇文章：[TCP 和 UDP 可以使用同一个端口吗？](https://xiaolincoding.com/network/3_tcp/port.html)



> ## hzh
>
> ### 传输层端口号作用
>
> - 端口号用于区分同一台主机上不同应用程序的数据流。
> - 传输层协议有 TCP 和 UDP，分别由内核中独立模块处理。
> - IP 包头的协议号字段指明该包是 TCP 还是 UDP，确定由哪个模块处理。
> - TCP 和 UDP 端口号相互独立，可各自使用相同端口号（如 TCP 80 和 UDP 80 共存无冲突）。

# TCP 连接建立

## TCP 三次握手过程是怎样的？

TCP 是面向连接的协议，所以使用 TCP 前必须先建立连接，而**建立连接是通过三次握手来进行的**。三次握手的过程如下图：

![TCP 三次握手](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4/%E7%BD%91%E7%BB%9C/TCP%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B.drawio.png)

- 一开始，客户端和服务端都处于 `CLOSE` 状态。先是服务端主动监听某个端口，处于 `LISTEN` 状态

![第一个报文 —— SYN 报文](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzE1LmpwZw?x-oss-process=image/format,png)

- 客户端会随机初始化序号（`client_isn`），将此序号置于 TCP 首部的「序号」字段中，同时把 `SYN` 标志位置为 `1`，表示 `SYN` 报文。接着把第一个 SYN 报文发送给服务端，表示向服务端发起连接，该报文不包含应用层数据，之后客户端处于 `SYN-SENT` 状态。 

![第二个报文 —— SYN + ACK 报文](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzE2LmpwZw?x-oss-process=image/format,png)

- 服务端收到客户端的 `SYN` 报文后，首先服务端也随机初始化自己的序号（`server_isn`），将此序号填入 TCP 首部的「序号」字段中，其次把 TCP 首部的「确认应答号」字段填入 `client_isn + 1`, 接着把 `SYN` 和 `ACK` 标志位置为 `1`。最后把该报文发给客户端，该报文也不包含应用层数据，之后服务端处于 `SYN-RCVD` 状态。

![第三个报文 —— ACK 报文](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzE3LmpwZw?x-oss-process=image/format,png)

- 客户端收到服务端报文后，还要向服务端回应最后一个应答报文，首先该应答报文 TCP 首部 `ACK` 标志位置为 `1` ，其次「确认应答号」字段填入 `server_isn + 1` ，最后把报文发送给服务端，这次报文可以携带客户到服务端的数据，之后客户端处于 `ESTABLISHED` 状态。

- 服务端收到客户端的应答报文后，也进入 `ESTABLISHED` 状态。

从上面的过程可以发现**第三次握手是可以携带数据的，前两次握手是不可以携带数据的**，这也是面试常问的题。

一旦完成三次握手，双方都处于 `ESTABLISHED` 状态，此时连接就已建立完成，客户端和服务端就可以相互发送数据了。



> ## hzh
>
> ### TCP 三次握手流程
>
> #### 注意: 一般, Seq表示序列号, Acknum表示确认号,ACK表示确认应答控制位,
>
> 1. **第一次握手（SYN）**
>
>    - 客户端随机生成初始序号 `client_isn`。
>    - 发送 SYN 报文（`SYN=1`，序号=`client_isn`）给服务端。
>    - 客户端进入 `SYN-SENT` 状态。
>
> 2. **第二次握手（SYN+ACK）**
>
>    - 服务端收到 SYN，随机生成 `server_isn`。
>    - 回复报文设置 `SYN=1`，`ACK=1`，序号=`server_isn`，确认号=`client_isn+1`。
>    - 服务端进入 `SYN-RCVD` 状态。
>
> 3. **第三次握手（ACK）**
>
>    - 客户端收到服务端报文，发送 ACK 报文（`ACK=1`，确认号=`server_isn+1`）。
>    - 该报文可以携带应用层数据。
>    - 双方进入 `ESTABLISHED` 状态，连接建立完成。
>
>    ### 注意: 第三次 还会发送 客户端序列号, 这里没写
>
> ------
>
> **重点：**
>
> - 三次握手保证双方都同步了初始序号。
> - 前两次握手报文不携带数据，第三次可以携带数据。
> - 连接建立后，双方即可开始可靠数据传输。
>
> ### 各有各的序号?
>
> 对，TCP 双方各自维护独立的序号：
>
> - **客户端序号（client_isn）**：客户端发送的第一个 SYN 报文中携带，代表客户端初始化的序号。
> - **服务端序号（server_isn）**：服务端回复的 SYN+ACK 报文中携带，代表服务端初始化的序号。
>
> 双方用各自的序号来标识自己发送的数据流，互相确认对方序号，实现可靠、有序的数据传输。
>
> 
>
> ### 不是 同一个序列吗?
>
> 不是的，TCP连接中**客户端和服务端各自维护独立的序列号**，不是同一个序列号。
>
> 具体原因和细节：
>
> - **TCP是全双工通信**，数据可以同时在两个方向独立传输。
> - 所以，客户端有自己的发送序列号（`client_isn`），服务端有自己的发送序列号（`server_isn`）。
> - 每一方的序列号用于标识该方向的数据字节流位置，互不影响。
> - 三次握手时，双方互相确认对方的序号（通过确认号字段`ACK`），保证双方都知道对方下一次要接收的序列号是多少。
>
> 总结：
>
> - 序号是针对单向数据流的标识，
> - 双向数据流分别用各自的序号序列管理，
> - 不是共享同一个序号。
>
> ### establish后, 发送数据 会接着之前的序列号吗
>
> 是的，**连接建立后发送的数据，序列号会紧接着三次握手中使用的序列号继续增加**，这是 TCP 的顺序可靠性保证机制的一部分。



## 如何在 Linux 系统中查看 TCP 状态？

TCP 的连接状态查看，在 Linux 可以通过 `netstat -napt` 命令查看。

![TCP 连接状态查看](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzE4LmpwZw?x-oss-process=image/format,png)

## 为什么是三次握手？不是两次、四次？

相信大家比较常回答的是：“因为三次握手才能保证双方具有接收和发送的能力。”

这回答是没问题，但这回答是片面的，并没有说出主要的原因。

在前面我们知道了什么是 **TCP 连接**：

- 用于保证可靠性和流量控制维护的某些状态信息，这些信息的组合，包括 **Socket、序列号和窗口大小**称为连接。

所以，重要的是**为什么三次握手才可以初始化 Socket、序列号和窗口大小并建立 TCP 连接。**

接下来，以三个方面分析三次握手的原因：

- 三次握手才可以阻止重复历史连接的初始化（主要原因）
- 三次握手才可以同步双方的初始序列号
- 三次握手才可以避免资源浪费

*原因一：避免历史连接*

我们来看看 RFC 793 指出的 TCP 连接使用三次握手的**首要原因**：

*The principle reason for the three-way handshake is to prevent old duplicate connection initiations from causing confusion.*

简单来说，三次握手的**首要原因是为了防止旧的重复连接初始化造成混乱。**

我们考虑一个场景，客户端先发送了 SYN（seq = 90）报文，然后客户端宕机了，而且这个 SYN 报文还被网络阻塞了，服务端并没有收到，接着客户端重启后，又重新向服务端建立连接，发送了 SYN（seq = 100）报文（*注意！不是重传 SYN，重传的 SYN 的序列号是一样的*）。

看看三次握手是如何阻止历史连接的：

![三次握手避免历史连接](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzE5LmpwZw?x-oss-process=image/format,png)

客户端连续发送多次 SYN（都是同一个四元组）建立连接的报文，在**网络拥堵**情况下：

- 一个「旧 SYN 报文」比「最新的 SYN」报文早到达了服务端，那么此时服务端就会回一个 `SYN + ACK` 报文给客户端，此报文中的确认号是 91（90+1）。
- 客户端收到后，发现自己期望收到的确认号应该是 100 + 1，而不是 90 + 1，于是就会回 RST 报文。
- 服务端收到 RST 报文后，就会释放连接。
- 后续最新的 SYN 抵达了服务端后，客户端与服务端就可以正常的完成三次握手了。

上述中的「旧 SYN 报文」称为历史连接，TCP 使用三次握手建立连接的**最主要原因就是防止「历史连接」初始化了连接**。

::: tip

有很多人问，如果服务端在收到 RST 报文之前，先收到了「新 SYN 报文」，也就是服务端收到客户端报文的顺序是：「旧 SYN 报文」->「新 SYN 报文」，此时会发生什么？

当服务端第一次收到 SYN 报文，也就是收到「旧 SYN 报文」时，就会回复 `SYN + ACK` 报文给客户端，此报文中的确认号是 91（90+1）。

然后这时再收到「新 SYN 报文」时，就会回 [Challenge Ack](https://xiaolincoding.com/network/3_tcp/challenge_ack.html) 报文给客户端，**这个 ack 报文并不是确认收到「新 SYN 报文」的，而是上一次的 ack 确认号**，也就是 91（90+1）。所以客户端收到此 ACK 报文时，发现自己期望收到的确认号应该是 101，而不是 91，于是就会回 RST 报文。

:::

**如果是两次握手连接，就无法阻止历史连接**，那为什么 TCP 两次握手为什么无法阻止历史连接呢？

我先直接说结论，主要是因为**在两次握手的情况下，服务端没有中间状态给客户端来阻止历史连接，导致服务端可能建立一个历史连接，造成资源浪费**。

你想想，在两次握手的情况下，服务端在收到 SYN 报文后，就进入 ESTABLISHED 状态，意味着这时可以给对方发送数据，但是客户端此时还没有进入 ESTABLISHED 状态，假设这次是历史连接，客户端判断到此次连接为历史连接，那么就会回 RST 报文来断开连接，而服务端在第一次握手的时候就进入 ESTABLISHED 状态，所以它可以发送数据的，但是它并不知道这个是历史连接，它只有在收到 RST 报文后，才会断开连接。

![两次握手无法阻止历史连接](https://img-blog.csdnimg.cn/img_convert/fe898053d2e93abac950b1637645943f.png)

可以看到，如果采用两次握手建立 TCP 连接的场景下，服务端在向客户端发送数据前，并没有阻止掉历史连接，导致服务端建立了一个历史连接，又白白发送了数据，妥妥地浪费了服务端的资源。

因此，**要解决这种现象，最好就是在服务端发送数据前，也就是建立连接之前，要阻止掉历史连接，这样就不会造成资源浪费，而要实现这个功能，就需要三次握手**。

所以，**TCP 使用三次握手建立连接的最主要原因是防止「历史连接」初始化了连接。**

::: tip

有人问：客户端发送三次握手（ack 报文）后就可以发送数据了，而被动方此时还是 syn_received 状态，如果 ack 丢了，那客户端发的数据是不是也白白浪费了？

不是的，即使服务端还是在 syn_received 状态，收到了客户端发送的数据，还是可以建立连接的，并且还可以正常收到这个数据包。这是因为数据报文中是有 ack 标识位，也有确认号，这个确认号就是确认收到了第二次握手。如下图：

![](https://cdn.xiaolincoding.com/gh/xiaolincoder/network/tcp/相同ack.png)

所以，服务端收到这个数据报文，是可以正常建立连接的，然后就可以正常接收这个数据包了。

:::

*原因二：同步双方初始序列号*

TCP 协议的通信双方，都必须维护一个「序列号」，序列号是可靠传输的一个关键因素，它的作用：  

- 接收方可以去除重复的数据；
- 接收方可以根据数据包的序列号按序接收；
- 可以标识发送出去的数据包中，哪些是已经被对方收到的（通过 ACK 报文中的序列号知道）；

可见，序列号在 TCP 连接中占据着非常重要的作用，所以当客户端发送携带「初始序列号」的 `SYN` 报文的时候，需要服务端回一个 `ACK` 应答报文，表示客户端的 SYN 报文已被服务端成功接收，那当服务端发送「初始序列号」给客户端的时候，依然也要得到客户端的应答回应，**这样一来一回，才能确保双方的初始序列号能被可靠的同步。**

![四次握手与三次握手](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzIwLmpwZw?x-oss-process=image/format,png)

四次握手其实也能够可靠的同步双方的初始化序号，但由于**第二步和第三步可以优化成一步**，所以就成了「三次握手」。

而两次握手只保证了一方的初始序列号能被对方成功接收，没办法保证双方的初始序列号都能被确认接收。

*原因三：避免资源浪费*

如果只有「两次握手」，当客户端发出的 `SYN` 报文在网络中阻塞，客户端没有接收到 `ACK` 报文，就会重新发送 `SYN`报文。**由于没有第三次握手，服务端不清楚客户端是否收到了自己回复的 `ACK` 报文，所以服务端每收到一个 `SYN` 就只能先主动建立一个连接**，这会造成什么情况呢？

如果客户端发送的 `SYN` 报文在网络中阻塞了，重复发送多次 `SYN` 报文，那么服务端在收到请求后就会**建立多个冗余的无效连接，造成不必要的资源浪费。**

![两次握手会造成资源浪费](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzIyLmpwZw?x-oss-process=image/format,png)

即两次握手会造成消息滞留情况下，服务端重复接受无用的连接请求 `SYN` 报文，而造成重复分配资源。

> [!tip]
>
> ### 别看!TCP 是面向字节流的传输协议，不保留所谓的“历史上下文”。
>
> 很多人问，两次握手不是也可以根据上下文信息丢弃`SYN`历史报文吗？
>
> 我这里两次握手是假设「由于没有第三次握手，服务端不清楚客户端是否收到了自己发送的建立连接的 `ACK` 确认报文，所以每收到一个 `SYN` 就只能先主动建立一个连接」这个场景。
>
> 当然你要实现成类似三次握手那样，根据上下文丢弃 syn 历史报文也是可以的，两次握手没有具体的实现，怎么假设都行。
>

*小结*

TCP 建立连接时，通过三次握手**能防止历史连接的建立，能减少双方不必要的资源开销，能帮助双方同步初始化序列号**。序列号能够保证数据包不重复、不丢弃和按序传输。

不使用「两次握手」和「四次握手」的原因：

- 「两次握手」：无法防止历史连接的建立，会造成双方资源的浪费，也无法可靠的同步双方序列号；
- 「四次握手」：三次握手就已经理论上最少可靠连接建立，所以不需要使用更多的通信次数。



> ## hzh
>
> ###  三次握手的真正原因：为什么不是两次或四次？
>
> #### 本质目的：**确保双方状态一致，避免旧连接影响，正确同步初始化信息**
>
> ------
>
> #### 🔹 原因一：防止**旧连接**（历史连接）被误识为新连接（最主要原因）
>
> - TCP 三次握手的首要目的是防止旧的重复 SYN 报文（可能网络延迟、丢失后重现）在网络中“重放”，被误识为新连接，从而引发资源浪费或连接错乱。
>
> - ### 关键点：
>
>   - 若只有两次握手，服务端收到旧 SYN 就会直接进入 `ESTABLISHED`，无法验证客户端是否也准备好了。
>   - 客户端发现返回的 ACK 对不上号，会发 RST 终止连接，但**服务端已分配资源(已发送资源)**，**资源被浪费**。
>
> - **三次握手解决方法：**
>
>   - 第三次由客户端发 ACK，只有真正新的连接才能匹配这个序列，旧的 SYN 没法伪造这个确认过程。
>
> - > acknum 保证了 即使 建立连接后, 服务端还未进入 established , 仍然可以 根据 acknum 是上次加1, 确认这是 发送过来的 数据, 接收即可
>
> ------
>
> #### 🔹 原因二：同步**双方初始序列号**
>
> - TCP 使用序列号（`seq`）确保数据可靠、按序传输。
> - 每一方都需要将自己的初始序列号发送给对方并得到确认，才能正确维护通信状态。
> - **三次握手流程中序列号同步：**
>   1. 客户端 → 服务端：SYN（带初始 seq）
>   2. 服务端 → 客户端：SYN + ACK（带自己初始 seq 和对客户端 seq 的确认 ack）
>   3. 客户端 → 服务端：ACK（确认服务端的初始 seq）
>
> ------
>
> #### 🔹 原因三：避免**资源浪费**
>
> - 没有第三次握手，服务端不确定客户端是否收到 ACK，**只能先假设连接已建立**。
> - 若客户端未收到服务端 ACK，会重发 SYN，导致服务端**建立多个无效连接**，占用资源。
>
> ------
>
> ### 为什么不是两次握手？
>
> | 问题点                   | 说明                              |
> | ------------------------ | --------------------------------- |
> | ❌ 无法阻止历史连接       | 服务端无法识别 SYN 是否为过期连接 |
> | ❌ 无法确认客户端收到 ACK | 导致客户端误判连接失败重发 SYN    |
> | ❌ 无法同步双方序列号     | 只确认了一方，可靠性不足          |
>
> 
>
> ------
>
> ### 为什么不是四次握手？
>
> - 四次握手确实可以同步状态，但**三次已经足够**完成连接确认与序列号同步。
> - 多一次握手只是冗余，并没有额外收益，反而增加延迟与复杂度。
> - 合并了 服务端确认号和初始号步骤
>
> ------
>
> ### 三次握手总结优势
>
> | 优势           | 说明                                   |
> | -------------- | -------------------------------------- |
> | 阻止旧连接重放 | 通过第三次确认有效性，防止历史报文干扰 |
> | 同步双方状态   | 确保双方收发能力和初始信息一致         |
> | 节省资源       | 减少误连接、错误资源分配的可能性       |

## 为什么每次建立 TCP 连接时，初始化的序列号都要求不一样呢？

主要原因有两个方面：

- 为了防止历史报文被下一个相同四元组的连接接收（主要方面）；
- 为了安全性，防止黑客伪造的相同序列号的 TCP 报文被对方接收；

接下来，详细说说第一点。

假设每次建立连接，客户端和服务端的初始化序列号都是从 0 开始：

![](https://cdn.xiaolincoding.com/gh/xiaolincoder/network/tcp/isn相同.png)

过程如下：

- 客户端和服务端建立一个 TCP 连接，在客户端发送数据包被网络阻塞了，然后超时重传了这个数据包，而此时服务端设备断电重启了，之前与客户端建立的连接就消失了，于是在收到客户端的数据包的时候就会发送 RST 报文。
- 紧接着，客户端又与服务端建立了与上一个连接相同四元组的连接；
- 在新连接建立完成后，上一个连接中被网络阻塞的数据包正好抵达了服务端，刚好该数据包的序列号正好是在服务端的接收窗口内，所以该数据包会被服务端正常接收，就会造成数据错乱。

可以看到，**如果每次建立连接，客户端和服务端的初始化序列号都是一样的话，很容易出现历史报文被下一个相同四元组的连接接收的问题**。

如果每次建立连接客户端和服务端的初始化序列号都「不一样」，就有大概率因为历史报文的序列号「不在」对方接收窗口，从而很大程度上避免了历史报文，比如下图：

![](https://cdn.xiaolincoding.com/gh/xiaolincoder/network/tcp/isn不相同.png)

相反，如果每次建立连接客户端和服务端的初始化序列号都「一样」，就有大概率遇到历史报文的序列号刚「好在」对方的接收窗口内，从而导致历史报文被新连接成功接收。

所以，每次初始化序列号不一样很大程度上能够避免历史报文被下一个相同四元组的连接接收，注意是很大程度上，并不是完全避免了（因为序列号会有回绕的问题，所以需要用时间戳的机制来判断历史报文，详细看篇：[TCP 是如何避免历史报文的？](https://xiaolincoding.com/network/3_tcp/isn_deff.html)）。



> ## hzh
>
> ### 1. 防止历史报文被新连接接收（**主要原因**）
>
> - TCP 连接由四元组（源 IP、源端口、目标 IP、目标端口）标识。
> - 如果旧连接未完全清理（如服务端异常断电），网络中残留的旧数据包可能延迟送达。
> - 若新连接与旧连接四元组相同，且 ISN 也相同，就可能出现旧数据包的序列号**刚好落入新连接的接收窗口**，被错误接收，引发数据错乱。
> - 若 ISN 每次不同，旧报文的序列号通常**不在接收窗口范围内**，会被丢弃，从而**降低旧包干扰新连接的概率**。
>
> ------
>
> ### 2. 提高安全性，防止 TCP 序列号被猜测
>
> - 若 ISN 可预测，攻击者可伪造具有合法序列号的 TCP 报文，进行 TCP 会话劫持。
> - 不同的 ISN 提高了伪造的难度，增强连接的安全性。
>
> ------
>
> ### 总结
>
> > 每次初始化不同的序列号，可以 **降低历史报文误收的概率**，也 **提升了连接的安全性**。
> >
> > ### 虽然无法完全避免历史报文的问题，但结合 TCP 时间戳等机制可以进一步缓解。

## 初始序列号 ISN 是如何随机产生的？

起始 `ISN` 是基于时钟的，每 4 微秒 + 1，转一圈要 4.55 个小时。

RFC793 提到初始化序列号 ISN 随机生成算法：ISN = M + F(localhost, localport, remotehost, remoteport)。

- `M` 是一个计时器，这个计时器每隔 4 微秒加 1。
- `F` 是一个 Hash 算法，根据源 IP、目的 IP、源端口、目的端口生成一个随机数值。要保证 Hash 算法不能被外部轻易推算得出，用 MD5 算法是一个比较好的选择。

可以看到，随机数是会基于时钟计时器递增的，基本不可能会随机成一样的初始化序列号。

> ## hzh
>
> ISN 结合**时间递增计数器**和**基于连接信息的哈希值**生成，确保每次初始化序列号既不重复又难以预测。
>
> 这种设计有效防止了序列号碰撞和被攻击者猜测的风险。

## 既然 IP 层会分片，为什么 TCP 层还需要 MSS 呢？

我们先来认识下 MTU 和 MSS

![MTU 与 MSS](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzIzLmpwZw?x-oss-process=image/format,png)

- `MTU`：一个网络包的最大长度，以太网中一般为 `1500` 字节；
- `MSS`：除去 IP 和 TCP 头部之后，一个网络包所能容纳的 TCP 数据的最大长度；

如果在 TCP 的整个报文（头部 + 数据）交给 IP 层进行分片，会有什么异常呢？

当 IP 层有一个超过 `MTU` 大小的数据（TCP 头部 + TCP 数据）要发送，那么 IP 层就要进行分片，把数据分片成若干片，保证每一个分片都小于 MTU。把一份 IP 数据报进行分片以后，由目标主机的 IP 层来进行重新组装后，再交给上一层 TCP 传输层。

这看起来井然有序，但这存在隐患的，**那么当如果一个 IP 分片丢失，整个 IP 报文的所有分片都得重传**。

因为 IP 层本身没有超时重传机制，它由传输层的 TCP 来负责超时和重传。

当某一个 IP 分片丢失后，接收方的 IP 层就无法组装成一个完整的 TCP 报文（头部 + 数据），也就无法将数据报文送到 TCP 层，所以接收方不会响应 ACK 给发送方，因为发送方迟迟收不到 ACK 确认报文，所以会触发超时重传，就会重发「整个 TCP 报文（头部 + 数据）」。

因此，可以得知由 IP 层进行分片传输，是非常没有效率的。

所以，为了达到最佳的传输效能 TCP 协议在**建立连接的时候通常要协商双方的 MSS 值**，当 TCP 层发现数据超过 MSS 时，则就先会进行分片，当然由它形成的 IP 包的长度也就不会大于 MTU，自然也就不用 IP 分片了。

![握手阶段协商 MSS](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzI0LmpwZw?x-oss-process=image/format,png)

经过 TCP 层分片后，如果一个 TCP 分片丢失后，**进行重发时也是以 MSS 为单位**，而不用重传所有的分片，大大增加了重传的效率。

> ## hzh
>
> ### 一、先认识两个关键概念
>
> - **MTU（Maximum Transmission Unit）**：
>    网络层最大传输单元，Ethernet 通常为 1500 字节。
> - **MSS（Maximum Segment Size）**：
>    TCP 可发送的数据最大长度，不包括 TCP 和 IP 头部。
>    一般为 MTU - 40（20 字节 IP 头 + 20 字节 TCP 头） = 1460 字节。
>
> ------
>
> ### 二、如果只依赖 IP 层分片，会有什么问题？
>
> - IP 层分片是**被动的**，当 TCP 报文超过 MTU 时才发生。
> - 一旦 **某个 IP 分片丢失**，**整个 IP 报文都无法重组**，TCP 将不得不重发整个报文，效率极低。
> - IP 层**无重传机制**，重传工作由 TCP 完成，但 TCP 是基于**整个报文是否被确认**来决定是否重传。
>
> ------
>
> ### 三、MSS 的作用和优势
>
> - TCP 在 **三次握手阶段协商 MSS**，确保双方不会发送超过对方可处理的数据段。
> - 发送方按 MSS 尺寸主动分段，使每个 TCP 报文段经过封装后不超过 MTU。
> - 一旦某段丢失，只需重传该 **MSS 尺寸的数据段**，**避免整体重传，提高效率。**
>
> ------
>
> ### 总结
>
> > **MSS 通过避免 IP 层分片，提升了传输效率与可靠性。**
> >  TCP 层主动按 MSS 分段，可以精细控制重传行为，避免因 IP 分片丢失导致整段重发的低效情况。
>
> ### 现代网络实践中怎么做？
>
> 1. **TCP 协议主动协商 MSS，避免触发 IP 分片**
> 2. **路径 MTU 探测（PMTUD）**：动态探测链路最小 MTU，适应性调整分段大小
> 3. **一些网络管理员甚至禁用 IP 分片**，强制所有上层协议控制好报文大小
>
> ------
>
> ### 总结一句话：
>
> > **IP 分片是网络层兜底的“保险丝”，在 TCP 中能不用就不用，依赖它会带来效率和可靠性的问题。**

## 第一次握手丢失了，会发生什么？

当客户端想和服务端建立 TCP 连接的时候，首先第一个发的就是 SYN 报文，然后进入到 `SYN_SENT` 状态。

在这之后，如果客户端迟迟收不到服务端的 SYN-ACK 报文（第二次握手），就会触发「超时重传」机制，重传 SYN 报文，而且**重传的 SYN 报文的序列号都是一样的**。

不同版本的操作系统可能超时时间不同，有的 1 秒的，也有 3 秒的，这个超时时间是写死在内核里的，如果想要更改则需要重新编译内核，比较麻烦。

当客户端在 1 秒后没收到服务端的 SYN-ACK 报文后，客户端就会重发 SYN 报文，那到底重发几次呢？

在 Linux 里，客户端的 SYN 报文最大重传次数由 `tcp_syn_retries`内核参数控制，这个参数是可以自定义的，默认值一般是 5。

```shell
# cat /proc/sys/net/ipv4/tcp_syn_retries
5
```

通常，第一次超时重传是在 1 秒后，第二次超时重传是在 2 秒，第三次超时重传是在 4 秒后，第四次超时重传是在 8 秒后，第五次是在超时重传 16 秒后。没错，**每次超时的时间是上一次的 2 倍**。

当第五次超时重传后，会继续等待 32 秒，如果服务端仍然没有回应 ACK，客户端就不再发送 SYN 包，然后断开 TCP 连接。

所以，总耗时是 1+2+4+8+16+32=63 秒，大约 1 分钟左右。

举个例子，假设 tcp_syn_retries 参数值为 3，那么当客户端的 SYN 报文一直在网络中丢失时，会发生下图的过程：

![](https://cdn.xiaolincoding.com/gh/xiaolincoder/network/tcp/第1次握手丢失.png)

具体过程：

- 当客户端超时重传 3 次 SYN 报文后，由于  tcp_syn_retries 为 3，已达到最大重传次数，于是再等待一段时间（时间为上一次超时时间的 2 倍），如果还是没能收到服务端的第二次握手（SYN-ACK 报文），那么客户端就会断开连接。

> ## hzh
>
> ### 第一次握手（SYN 报文）丢失后，会发生什么？
>
> ### 1. 客户端行为
>
> - 客户端发送第一次握手的 **SYN 报文**，进入 `SYN_SENT` 状态；
>
> - 如果没有收到服务端回应的 **SYN-ACK 报文**，则会触发 **超时重传**；
>
> - **每次重传的序列号相同**（保持连接标识一致）；
>
> - 重传次数由 Linux 参数 `tcp_syn_retries` 控制，默认值是 5。
>
> - ```cpp
>   # cat /proc/sys/net/ipv4/tcp_syn_retries
>   5
>   ```
>
>   
>
> ### 2. 重传时间策略（指数回退）
>
> - 第1次超时：约 1 秒后重发；
> - 第2次超时：再等 2 秒；
> - 第3次超时：再等 4 秒；
> - ...
> - 最后等待一次：再等 32 秒；
> - **总共耗时：1 + 2 + 4 + 8 + 16 + 32 = 63 秒左右**。
>
> ### 3. 如果始终收不到 SYN-ACK
>
> - 客户端会在耗尽重传次数并等待最后一次超时后；
> - 判定连接建立失败，主动断开尝试，连接终止。
>
> ------
>
> ### ✅ 总结一句话：
>
> > 第一次握手（SYN）丢失后，客户端会按指数退避策略重传相同序列号的 SYN 报文，直到超出最大重试次数（默认最多等 63 秒），最终放弃连接尝试。

## 第二次握手丢失了，会发生什么？

当服务端收到客户端的第一次握手后，就会回 SYN-ACK 报文给客户端，这个就是第二次握手，此时服务端会进入 `SYN_RCVD` 状态。

第二次握手的 `SYN-ACK` 报文其实有两个目的：

- 第二次握手里的 ACK，是对第一次握手的确认报文；
- 第二次握手里的 SYN，是服务端发起建立 TCP 连接的报文；

所以，如果第二次握手丢了，就会发生比较有意思的事情，具体会怎么样呢？

因为第二次握手报文里是包含对客户端的第一次握手的 ACK 确认报文，所以，如果客户端迟迟没有收到第二次握手，那么客户端就觉得可能自己的 SYN 报文（第一次握手）丢失了，于是**客户端就会触发超时重传机制，重传 SYN 报文**。

然后，因为第二次握手中包含服务端的 SYN 报文，所以当客户端收到后，需要给服务端发送 ACK 确认报文（第三次握手），服务端才会认为该 SYN 报文被客户端收到了。

那么，如果第二次握手丢失了，服务端就收不到第三次握手，于是**服务端这边会触发超时重传机制，重传 SYN-ACK 报文**。

在 Linux 下，SYN-ACK 报文的最大重传次数由 `tcp_synack_retries`内核参数决定，默认值是 5。

```shell
# cat /proc/sys/net/ipv4/tcp_synack_retries
5
```

因此，当第二次握手丢失了，客户端和服务端都会重传：

- 客户端会重传 SYN 报文，也就是第一次握手，最大重传次数由 `tcp_syn_retries`内核参数决定；
- 服务端会重传 SYN-ACK 报文，也就是第二次握手，最大重传次数由 `tcp_synack_retries` 内核参数决定。

举个例子，假设 tcp_syn_retries  参数值为 1，tcp_synack_retries 参数值为 2，那么当第二次握手一直丢失时，发生的过程如下图：

![](https://cdn.xiaolincoding.com/gh/xiaolincoder/network/tcp/第2次握手丢失.png)

具体过程：

- 当客户端超时重传 1 次 SYN 报文后，由于  tcp_syn_retries 为 1，已达到最大重传次数，于是再等待一段时间（时间为上一次超时时间的 2 倍），如果还是没能收到服务端的第二次握手（SYN-ACK 报文），那么客户端就会断开连接。
- 当服务端超时重传 2 次 SYN-ACK 报文后，由于 tcp_synack_retries 为 2，已达到最大重传次数，于是再等待一段时间（时间为上一次超时时间的 2 倍），如果还是没能收到客户端的第三次握手（ACK 报文），那么服务端就会断开连接。



> ## hzh
>
> ### 第二次握手（SYN-ACK 报文）丢失后，会发生什么？
>
> ### 1. 服务端行为
>
> - 服务端收到客户端的 SYN 后，发送 **SYN-ACK 报文**，进入 `SYN_RCVD` 状态；
> - 如果客户端没收到 SYN-ACK，不会发送 ACK（即第三次握手）；
> - 服务端迟迟收不到 ACK，会以为自己的 SYN-ACK 丢了，于是**服务端重传 SYN-ACK**；
> - 重传次数由 `tcp_synack_retries` 控制，默认值为 5。
>
> ### 2. 客户端行为
>
> - 客户端收不到 SYN-ACK，会误以为自己的 SYN（第一次握手）丢了；
> - 于是**客户端重发 SYN 报文**；
> - 重传次数由 `tcp_syn_retries` 控制，默认值一般为 5。
>
> ### 3. 最终情况
>
> - 若在最大重传次数内仍然无法收到回应，**双方均放弃连接**，自动断开；
> - 整个过程是 **客户端和服务端都会各自重传**，直到成功或放弃。
>
> ------
>
> ### ✅ 总结一句话：
>
> > 第二次握手丢失会导致客户端和服务端都触发重传机制，客户端重发 SYN，服务端重发 SYN-ACK，直到任一方超出最大重试次数，最终放弃连接尝试。
>
> ### 要是 一方重传超过次数, 断开连接了, 另一端也要到达次数才会停止吗?
>
> 非常棒的问题，这深入到了 TCP 三次握手失败后的**状态一致性与资源清理机制**。答案是：
>
> > ✅ 是的，**双方是各自独立地根据自己的重传次数和超时逻辑来判断是否放弃连接尝试**。即：**一方即使先放弃了，另一方也不会立刻停止，只有等自己超时重传次数耗尽后才停止。**

## 第三次握手丢失了，会发生什么？

客户端收到服务端的 SYN-ACK 报文后，就会给服务端回一个 ACK 报文，也就是第三次握手，此时客户端状态进入到 `ESTABLISH` 状态。

因为这个第三次握手的 ACK 是对第二次握手的 SYN 的确认报文，所以当第三次握手丢失了，如果服务端那一方迟迟收不到这个确认报文，就会触发超时重传机制，重传 SYN-ACK 报文，直到收到第三次握手，或者达到最大重传次数。

注意，**ACK 报文是不会有重传的，当 ACK 丢失了，就由对方重传对应的报文**。

举个例子，假设 tcp_synack_retries 参数值为 2，那么当第三次握手一直丢失时，发生的过程如下图：

![](https://cdn.xiaolincoding.com/gh/xiaolincoder/network/tcp/第三次握手丢失.drawio.png)

具体过程：

- 当服务端超时重传 2 次 SYN-ACK 报文后，由于 tcp_synack_retries 为 2，已达到最大重传次数，于是再等待一段时间（时间为上一次超时时间的 2 倍），如果还是没能收到客户端的第三次握手（ACK 报文），那么服务端就会断开连接。

> ## hzh
>
> - **过程**：
>    客户端收到服务端的 SYN-ACK（第二次握手）后，发送确认的 ACK（第三次握手），进入 `ESTABLISHED` 状态。
>
> - **丢失情况**：
>    第三次握手的 ACK 报文丢失，服务端没有收到确认。
>
> - **服务端行为**：
>    服务端等待 ACK，若超时未收到，会重传 SYN-ACK 报文。
>    重传次数受内核参数 `tcp_synack_retries` 控制（默认一般为 5 次）。
>
> - **客户端行为**：
>    客户端不会主动重传 ACK，只有收到重传的 SYN-ACK 报文时，才会重新发送 ACK。
>
> - **结果**：
>
>   - 若在重传次数内收到客户端 ACK，连接建立成功。
>   - 超过最大重传次数，服务端断开连接。
>
> - **设计原因**：
>
>   ####  **ACK 报文本身不重传**，重传由对方通过重发对应报文触发，减少网络冗余。

> ## hzh
>
> ### 三次握手丢包后的重传行为总结
>
> | 握手阶段                  | 报文发送者 | 报文接收者 | 谁会重传？                   | 重传触发条件                                                 |
> | ------------------------- | ---------- | ---------- | ---------------------------- | ------------------------------------------------------------ |
> | **第一次握手（SYN）**     | 客户端     | 服务端     | ✅ **客户端重传**             | 客户端未收到服务端的 SYN-ACK（第二次握手）                   |
> | **第二次握手（SYN-ACK）** | 服务端     | 客户端     | ✅ **双方都重传**             | <ul><li>客户端未收到 SYN-ACK，会重传 SYN（触发服务端再次发 SYN-ACK）</li><li>服务端未收到 ACK，也会重传 SYN-ACK</li></ul> |
> | **第三次握手（ACK）**     | 客户端     | 服务端     | ✅ **客户端重传，但被动触发** | 客户端本身**不主动重传** ACK，只有当服务端重发 SYN-ACK 后，客户端才会再发一次 ACK |

## 什么是 SYN 攻击？如何避免 SYN 攻击？

我们都知道 TCP 连接建立是需要三次握手，假设攻击者短时间伪造不同 IP 地址的 `SYN` 报文，服务端每接收到一个 `SYN` 报文，就进入`SYN_RCVD` 状态，但服务端发送出去的 `ACK + SYN` 报文，无法得到未知 IP 主机的 `ACK` 应答，久而久之就会**占满服务端的半连接队列**，使得服务端不能为正常用户服务。

![SYN 攻击](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzI1LmpwZw?x-oss-process=image/format,png)

先跟大家说一下，什么是 TCP 半连接和全连接队列。

在 TCP 三次握手的时候，Linux 内核会维护两个队列，分别是：

- 半连接队列，也称 SYN 队列；
- 全连接队列，也称 accept 队列；

我们先来看下 Linux 内核的 `SYN` 队列（半连接队列）与 `Accpet` 队列（全连接队列）是如何工作的？

![正常流程](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzI2LmpwZw?x-oss-process=image/format,png)

正常流程：

- 当服务端接收到客户端的 SYN 报文时，会创建一个半连接的对象，然后将其加入到内核的「SYN 队列」；
- 接着发送 SYN + ACK 给客户端，等待客户端回应 ACK 报文；
- 服务端接收到 ACK 报文后，从「SYN 队列」取出一个半连接对象，然后创建一个新的连接对象放入到「Accept 队列」；
- 应用通过调用 `accpet()` socket 接口，从「Accept 队列」取出连接对象。

不管是半连接队列还是全连接队列，都有最大长度限制，超过限制时，默认情况都会丢弃报文。

SYN 攻击方式最直接的表现就会把 TCP 半连接队列打满，这样**当 TCP 半连接队列满了，后续再在收到 SYN 报文就会丢弃**，导致客户端无法和服务端建立连接。

避免 SYN 攻击方式，可以有以下四种方法：

- 调大 netdev_max_backlog；
- 增大 TCP 半连接队列；
- 开启 tcp_syncookies；
- 减少 SYN+ACK 重传次数

> 方式一：调大 netdev_max_backlog

当网卡接收数据包的速度大于内核处理的速度时，会有一个队列保存这些数据包。控制该队列的最大值如下参数，默认值是 1000，我们要适当调大该参数的值，比如设置为 10000：

```bash
net.core.netdev_max_backlog = 10000
```

> 方式二：增大 TCP 半连接队列

增大 TCP 半连接队列，要同时增大下面这三个参数：

- 增大 net.ipv4.tcp_max_syn_backlog
- 增大  listen() 函数中的 backlog
- 增大 net.core.somaxconn

具体为什么是三个参数决定  TCP 半连接队列的大小，可以看这篇：可以看这篇：[TCP 半连接队列和全连接队列满了会发生什么？又该如何应对？](https://xiaolincoding.com/network/3_tcp/tcp_queue.html)

> 方式三：开启 net.ipv4.tcp_syncookies 

开启 syncookies 功能就可以在不使用 SYN 半连接队列的情况下成功建立连接，相当于绕过了 SYN 半连接来建立连接。

![tcp_syncookies 应对 SYN 攻击](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzI5LmpwZw?x-oss-process=image/format,png)

具体过程：

- 当「SYN 队列」满之后，后续服务端收到 SYN 包，不会丢弃，而是根据算法，计算出一个 `cookie` 值；
- 将 cookie 值放到第二次握手报文的「序列号」里，然后服务端回第二次握手给客户端；
- 服务端接收到客户端的应答报文时，服务端会检查这个 ACK 包的合法性。如果合法，将该连接对象放入到「Accept 队列」。 
- 最后应用程序通过调用 `accpet()` 接口，从「Accept 队列」取出的连接。

可以看到，当开启了 tcp_syncookies 了，即使受到 SYN 攻击而导致 SYN 队列满时，也能保证正常的连接成功建立。

net.ipv4.tcp_syncookies 参数主要有以下三个值：

- 0 值，表示关闭该功能；
- 1 值，表示仅当 SYN 半连接队列放不下时，再启用它；
- 2 值，表示无条件开启功能；

那么在应对 SYN 攻击时，只需要设置为 1 即可。

```bash
$ echo 1 > /proc/sys/net/ipv4/tcp_syncookies
```

> 方式四：减少 SYN+ACK 重传次数

当服务端受到 SYN 攻击时，就会有大量处于 SYN_REVC 状态的 TCP 连接，处于这个状态的 TCP 会重传 SYN+ACK，当重传超过次数达到上限后，就会断开连接。

那么针对 SYN 攻击的场景，我们可以减少 SYN-ACK 的重传次数，以加快处于 SYN_REVC 状态的 TCP 连接断开。

SYN-ACK 报文的最大重传次数由 `tcp_synack_retries`内核参数决定（默认值是 5 次），比如将 tcp_synack_retries 减少到 2 次：

```shell
$ echo 2 > /proc/sys/net/ipv4/tcp_synack_retries
```

> ## hzh
>
> ### 什么是 SYN 攻击？
>
> - 利用 TCP 三次握手的特点，攻击者发送大量伪造 IP 的 SYN 报文。
> - 服务器为每个 SYN 报文分配**半连接资源**，回复 SYN+ACK 后等待客户端 ACK。
> - 伪造地址不回应 ACK，导致半连接队列被占满。
> - 结果：正常连接请求被拒，服务不可用。
>
> ### TCP 半连接队列和全连接队列
>
> - **半连接队列**：存放收到 SYN，等待客户端 ACK 的连接请求（SYN_RCVD 状态）。
> - **全连接队列**：完成三次握手，等待应用调用 accept() 的连接。
> - 队列均有最大长度，满时新请求被丢弃。
>
> ### 防御 SYN 攻击的方法
>
> 1. **调大 netdev_max_backlog**
>     增加网卡数据包缓存队列，缓解内核处理压力。
>
>    ```
>    sysctl -w net.core.netdev_max_backlog=10000
>    ```
>
> 2. **增大 TCP 半连接队列容量**
>     同时增大以下三个参数：
>
>    - `net.ipv4.tcp_max_syn_backlog`
>    - `net.core.somaxconn`
>    - listen() 函数 backlog 参数
>
> 3. **开启 TCP SYN Cookies**
>     通过特殊算法避免使用半连接队列，防止队列被占满。
>
>    ```
>    echo 1 > /proc/sys/net/ipv4/tcp_syncookies
>    ```
>
> 4. **减少 SYN+ACK 重传次数**
>     加快半连接超时释放资源，缩短被攻击时半连接的占用时间。
>
>    ```
>    echo 2 > /proc/sys/net/ipv4/tcp_synack_retries
>    ```
>
> ### 半连接队列是 等待第三次握手, 新的是发送 第二次握手?
>
> > #### 对，完全正确！
> >
> > 总结一下：
> >
> > - **半连接队列里的连接**：
> >    已经收到客户端的第一个 SYN，服务器发送了第二次握手（SYN+ACK），现在**在等待客户端的第三次握手（ACK）**，这时连接处于 `SYN_RCVD` 状态。服务器会维护这个状态，等待第三次握手完成。
> > - **新来的 SYN 报文**：
> >    服务器刚收到新的客户端 SYN，这是建立新连接的开始，服务器要处理这条新的连接请求，给它发送第二次握手（SYN+ACK），然后把这个连接放入半连接队列（如果队列未满）或用 SYN Cookies 机制直接回复（如果队列满）。
> >
> > ------
> >
> > #### 所以整个过程是：
> >
> > 1. 客户端发 SYN → 服务器收到，发送 SYN+ACK（第二次握手），连接进入半连接队列，等待第三次握手；
> > 2. 服务器等待客户端的 ACK（第三次握手）来完成连接；
> > 3. 半连接队列里的连接是等待第三次握手的；
> > 4. 新来的 SYN 报文是要发送第二次握手。
> >
> > ------
> >
> > ##### 这也解释了为什么半连接队列会被攻击者通过伪造大量 SYN 报文填满：服务器为这些伪造连接都发送了第二次握手（SYN+ACK），但永远等不到第三次握手（ACK），导致资源被占用。
>
> ### SYN Cookie是啥?
>
> **SYN Cookies 的核心思想是：服务器不为每个 SYN 报文立即分配资源**，而是通过对连接信息计算出一个特殊的“cookie”值，放在第二次握手（SYN+ACK）的序列号里，发送给客户端；
>
> 只有当客户端回复带有正确 cookie 的第三次握手（ACK）时，服务器才根据 cookie 恢复连接状态并分配资源。
>
> ### 也就是多了一种 验证和同步的方式
>
> SYN Cookies 就像是在传统三次握手里，多加了一层“验证”的机制：
>
> - **传统三次握手**：服务器一收到 SYN，就分配资源（放入半连接队列），等待客户端确认；
> - **SYN Cookies**：服务器先用一种算法生成一个“cookie”值（加密签名），把它放进第二次握手（SYN+ACK）报文里，先不分配资源；只有客户端返回带这个 cookie 的第三次握手（ACK）时，服务器才确认这个连接合法，才真正分配资源。

# TCP 连接断开

## TCP 四次挥手过程是怎样的？

天下没有不散的宴席，对于 TCP 连接也是这样，TCP 断开连接是通过**四次挥手**方式。

双方都可以主动断开连接，断开连接后主机中的「资源」将被释放，四次挥手的过程如下图：

![客户端主动关闭连接 —— TCP 四次挥手](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzMwLmpwZw?x-oss-process=image/format,png)


- 客户端打算关闭连接，此时会发送一个 TCP 首部 `FIN` 标志位被置为 `1` 的报文，也即 `FIN` 报文，之后客户端进入 `FIN_WAIT_1` 状态。
- 服务端收到该报文后，就向客户端发送 `ACK` 应答报文，接着服务端进入 `CLOSE_WAIT` 状态。
- 客户端收到服务端的 `ACK` 应答报文后，之后进入 `FIN_WAIT_2` 状态。
- 等待服务端处理完数据后，也向客户端发送 `FIN` 报文，之后服务端进入 `LAST_ACK` 状态。
- 客户端收到服务端的 `FIN` 报文后，回一个 `ACK` 应答报文，之后进入 `TIME_WAIT` 状态
- 服务端收到了 `ACK` 应答报文后，就进入了 `CLOSE` 状态，至此服务端已经完成连接的关闭。
- 客户端在经过 `2MSL` 一段时间后，自动进入 `CLOSE` 状态，至此客户端也完成连接的关闭。

你可以看到，每个方向都需要**一个 FIN 和一个 ACK**，因此通常被称为**四次挥手**。

这里一点需要注意是：**主动关闭连接的，才有 TIME_WAIT 状态。**

> ## hzh
>
> 1. **第一次挥手（客户端 -> 服务端）**  
>    客户端发送一个带有 `FIN` 标志的报文，表示它不再发送数据，但仍可以接收数据。此时客户端进入 `FIN_WAIT_1` 状态。
>
> 2. **第二次挥手（服务端 -> 客户端）**  
>    服务端收到 `FIN` 报文后，发送一个带有 `ACK` 标志的报文作为确认，表示它已收到客户端的关闭请求。此时服务端进入 `CLOSE_WAIT` 状态，客户端进入 `FIN_WAIT_2` 状态。
>
> 3. **第三次挥手（服务端 -> 客户端）**  
>    服务端在处理完剩余数据后，发送一个带有 `FIN` 标志的报文，表示它也准备关闭连接。此时服务端进入 `LAST_ACK` 状态。
>
> 4. **第四次挥手（客户端 -> 服务端）**  
>    客户端收到服务端的 `FIN` 报文后，发送一个带有 `ACK` 标志的报文作为确认。此时客户端进入 `TIME_WAIT` 状态，等待一段时间（通常为 2MSL，**最大报文生存时间的两倍**）以确保服务端收到确认后再关闭连接。服务端在收到 `ACK` 报文后直接进入 `CLOSE` 状态，释放资源。客户端在 `TIME_WAIT` 状态结束后也进入 `CLOSE` 状态。
>
> ### 注意事项：
> - **TIME_WAIT 状态**：**只有主动关闭连接**的一方会进入 `TIME_WAIT` 状态，用于确保最后的 `ACK` 报文能够被对方接收。
> - **资源释放**：四次挥手的设计确保双方都能妥善处理未完成的数据传输，避免资源泄露或数据丢失。
>
> 通过四次挥手，TCP 实现了可靠的连接终止机制。

## 为什么挥手需要四次？

再来回顾下四次挥手双方发 `FIN` 包的过程，就能理解为什么需要四次了。

- 关闭连接时，客户端向服务端发送 `FIN` 时，仅仅表示客户端不再发送数据了但是还能接收数据。
- 服务端收到客户端的 `FIN` 报文时，先回一个 `ACK` 应答报文，而服务端可能还有数据需要处理和发送，等服务端不再发送数据时，才发送 `FIN` 报文给客户端来表示同意现在关闭连接。

从上面过程可知，服务端通常需要等待完成数据的发送和处理，所以服务端的 `ACK` 和 `FIN` 一般都会分开发送，因此是需要四次挥手。

但是**在特定情况下，四次挥手是可以变成三次挥手的**，具体情况可以看这篇：[TCP 四次挥手，可以变成三次吗？](https://xiaolincoding.com/network/3_tcp/tcp_three_fin.html)



> ## hzh
>
> 在正常的 TCP 四次挥手中，双方可能**在关闭连接前还有数据需要发送**，因此需要完整的四次交互来确保数据传输的完整性。
>
> 但如果双方在关闭连接时都**没有剩余的数据需要发送**，服务端可以在收到客户端的 `FIN` 报文后，直接将 `ACK` 和 `FIN` 合并到一个报文中发送，从而减少一次交互，变成三次挥手。
>
> 这种情况的前提是：**双方都没有未完成的任务或数据传输**，连接可以直接关闭。
>
> ### 这也解释了一个疑惑
>
> 挥手 不是 连着的, 是可以进行数据发送的, 只有服务端发完了,才回去理睬 客户端的 FIN 
>
> 是的，这正好解释了一个常见的疑惑：**TCP 四次挥手并不是连续的，而是可以夹杂数据传输的**。
>
> > ### 具体解释：
> >
> > 1. **挥手过程中的数据传输**  
> >    在四次挥手中，服务端在收到客户端的 `FIN` 报文后，进入 `CLOSE_WAIT` 状态。这时，**服务端仍然可以继续发送剩余的数据**，而不会立即响应客户端的关闭请求。只有当服务端确认所有数据都发送完毕后，才会发送自己的 `FIN` 报文，表示准备关闭连接。
> >
> > 2. **为什么会这样设计？**  
> >    TCP 是一个**可靠的**传输协议，设计上需要**确保所有数据都被完整传输**。因此，在挥手过程中，服务端有机会完成未完成的数据传输，而不是立即关闭连接。这种机制保证了数据的完整性。
> >
> > 3. **总结**  
> >    - 四次挥手的过程并不是严格连续的，中间可以夹杂数据传输。
> >    - 服务端只有在确认所有数据发送完毕后，才会响应客户端的 `FIN` 报文并发送自己的 `FIN`。
> >
> > 这也说明了 TCP 的设计是以可靠性为核心的，即使在关闭连接时，也会优先保证数据传输的完整性。
>
> ### TCP 三次握手是连续的
>
> 与四次挥手不同，握手的目的是为了建立连接，确保双方都准备好进行通信，因此它是一个连续的过程，没有中断或数据传输的插入。
>
> ### 握手为什么不能中断？
>
> 如果握手过程中插入其他操作（如数据传输），可能**会导致连接状态不一致**，无法确保双方都已准备好通信。因此，握手必须是连续的，直到连接建立完成。
>
> ### 总结
>
> - **握手是连续的**，因为它的目标是快速、可靠地建立连接。
> - **挥手可以中断**，因为它的目标是优雅地关闭连接，同时允许完成未完成的数据传输。

## 第一次挥手丢失了，会发生什么？

当客户端（主动关闭方）调用 close 函数后，就会向服务端发送 FIN 报文，试图与服务端断开连接，此时客户端的连接进入到 `FIN_WAIT_1` 状态。

正常情况下，如果能及时收到服务端（被动关闭方）的 ACK，则会很快变为 `FIN_WAIT2`状态。

如果第一次挥手丢失了，那么客户端迟迟收不到被动方的 ACK 的话，也就会触发超时重传机制，重传 FIN 报文，重发次数由 `tcp_orphan_retries` 参数控制。

当客户端重传 FIN 报文的次数超过 `tcp_orphan_retries` 后，就不再发送 FIN 报文，则会在等待一段时间（时间为上一次超时时间的 2 倍），如果还是没能收到第二次挥手，那么直接进入到 `close` 状态。

举个例子，假设 tcp_orphan_retries 参数值为 3，当第一次挥手一直丢失时，发生的过程如下图：

![](https://cdn.xiaolincoding.com/gh/xiaolincoder/network/tcp/第一次挥手丢失.png)

具体过程：

- 当客户端超时重传 3 次 FIN 报文后，由于 tcp_orphan_retries 为 3，已达到最大重传次数，于是再等待一段时间（时间为上一次超时时间的 2 倍），如果还是没能收到服务端的第二次挥手（ACK 报文），那么客户端就会断开连接。

> ## hzh
>
> 当客户端超时重传 3 次 FIN 报文后，由于 tcp_orphan_retries 为 3，已达到最大重传次数，于是再等待一段时间（时间为上一次超时时间的 2 倍），如果还是没能收到服务端的第二次挥手（ACK 报文），那么客户端就会断开连接。

## 第二次挥手丢失了，会发生什么？

当服务端收到客户端的第一次挥手后，就会先回一个 ACK 确认报文，此时服务端的连接进入到 `CLOSE_WAIT` 状态。

在前面我们也提了，ACK 报文是不会重传的，所以如果服务端的第二次挥手丢失了，客户端就会触发超时重传机制，重传 FIN 报文，直到收到服务端的第二次挥手，或者达到最大的重传次数。

举个例子，假设 tcp_orphan_retries 参数值为 2，当第二次挥手一直丢失时，发生的过程如下图：

![](https://cdn.xiaolincoding.com/gh/xiaolincoder/network/tcp/第二次挥手丢失.png)

具体过程：

- 当客户端超时重传 2 次 FIN 报文后，由于 tcp_orphan_retries 为 2，已达到最大重传次数，于是再等待一段时间（时间为上一次超时时间的 2 倍），如果还是没能收到服务端的第二次挥手（ACK 报文），那么客户端就会断开连接。

这里提一下，当客户端收到第二次挥手，也就是收到服务端发送的 ACK 报文后，客户端就会处于 `FIN_WAIT2` 状态，在这个状态需要等服务端发送第三次挥手，也就是服务端的 FIN 报文。

对于 close 函数关闭的连接，由于无法再发送和接收数据，所以`FIN_WAIT2` 状态不可以持续太久，而 `tcp_fin_timeout` 控制了这个状态下连接的持续时长，默认值是 60 秒。

这意味着对于调用 close 关闭的连接，如果在 60 秒后还没有收到 FIN 报文，客户端（主动关闭方）的连接就会直接关闭，如下图：

![](https://cdn.xiaolincoding.com/gh/xiaolincoder/network/tcp/fin_wait_2.drawio.png)

但是注意，如果主动关闭方使用 shutdown 函数关闭连接，指定了只关闭发送方向，而接收方向并没有关闭，那么意味着主动关闭方还是可以接收数据的。

此时，如果主动关闭方一直没收到第三次挥手，那么主动关闭方的连接将会一直处于 `FIN_WAIT2` 状态（`tcp_fin_timeout` 无法控制 shutdown 关闭的连接）。如下图：

![](https://cdn.xiaolincoding.com/gh/xiaolincoder/network/tcp/fin_wait_2死等.drawio.png)

> ## hzh
>
> ### 总结
>
> 1. **第二次挥手丢失的处理**：
>
>    - 如果服务端的 `ACK` 报文丢失，客户端会通过超时重传 `FIN` 报文来确保连接关闭。
>    - ### `ACK`不会重传
>    - 重传次数由 `tcp_orphan_retries` 参数控制，达到最大次数后，客户端会直接断开连接。
>
> 2. **`FIN_WAIT2` 状态的持续时间**：-- 这是 客户端 等待第三次 挥手的状态
>
>    - 对于通过 `close` 函数关闭的连接，`tcp_fin_timeout` 参数（默认 60 秒）限制了 `FIN_WAIT2` 状态的持续时间。
>    - 超过该时间仍未收到服务端的 `FIN` 报文，客户端会直接关闭连接。
>
> 3. **`shutdown` 函数的特殊情况**：--- 一般使用 close(), shutdown()效果不一样
>
>    - 如果使用 `shutdown` 函数**关闭发送方向但保持接收方向打开**，`tcp_fin_timeout` 参数无法控制连接的持续时间。
>    - 在这种情况下，连接可能会无限期停留在 `FIN_WAIT2` 状态。
>
> 4. **设计目的**：
>    - TCP 的设计优先保证连接关闭的可靠性，同时提供灵活的关闭方式（`close` 和 `shutdown`），以适应不同的应用场景。
>
> ### close(), shutdown()总结
>
> 1. **`close()`**  
>    - 完全关闭连接（读写方向同时关闭）。  
>    - 适用于不再需要通信的场景。  
>    - 受 `tcp_fin_timeout` 参数控制，`FIN_WAIT2` 状态**有超时时间**。
>
> 2. **`shutdown()`**  
>    - 部分关闭连接（可选择关闭发送、接收或两者）。  
>    - 适用于需要保留部分通信能力的场景（如只关闭发送方向）。 -- 不再发送数据，但仍可以接收数据 
>    - ##### 如果只关闭发送方向，`FIN_WAIT2` 状态可能无限持续，不受 `tcp_fin_timeout` 控制。
>
> **区别**：`close()` 是完全关闭，`shutdown()` 是灵活关闭。
>
> ### shutdown细节
>
> 在调用 `shutdown()` 时，**发送方**是指调用 `shutdown(sock, SHUT_WR)` 的那一方。
>
> #### 具体说明：
>
> - **发送方**：调用 `shutdown(sock, SHUT_WR)` 的一方，表示主动关闭发送方向，**不再发送数据，但仍可以接收数据**。
> - **接收方**：对端（另一方）仍然可以向关闭发送方向的一方发送数据，直到它主动关闭连接。

## 第三次挥手丢失了，会发生什么？

当服务端（被动关闭方）收到客户端（主动关闭方）的 FIN 报文后，内核会自动回复 ACK，同时连接处于 `CLOSE_WAIT` 状态，顾名思义，它表示等待应用进程调用 close 函数关闭连接。

此时，内核是没有权利替代进程关闭连接，必须由进程主动调用 close 函数来触发服务端发送 FIN 报文。

服务端处于 CLOSE_WAIT 状态时，调用了 close 函数，内核就会发出 FIN 报文，同时连接进入 LAST_ACK 状态，等待客户端返回 ACK 来确认连接关闭。

如果迟迟收不到这个 ACK，服务端就会重发 FIN 报文，重发次数仍然由 `tcp_orphan_retries` 参数控制，这与客户端重发 FIN 报文的重传次数控制方式是一样的。

举个例子，假设 `tcp_orphan_retries` = 3，当第三次挥手一直丢失时，发生的过程如下图：

![](https://cdn.xiaolincoding.com/gh/xiaolincoder/network/tcp/第三次挥手丢失.drawio.png)

具体过程：

- 当服务端重传第三次挥手报文的次数达到了 3 次后，由于 tcp_orphan_retries 为 3，达到了重传最大次数，于是再等待一段时间（时间为上一次超时时间的 2 倍），如果还是没能收到客户端的第四次挥手（ACK 报文），那么服务端就会断开连接。
- 客户端因为是通过 close 函数关闭连接的，处于 FIN_WAIT_2 状态是有时长限制的，如果 tcp_fin_timeout 时间内还是没能收到服务端的第三次挥手（FIN 报文），那么客户端就会断开连接。

> ## hzh
>
> - 服务端的重传次数由 `tcp_orphan_retries` 控制，超过限制后会断开连接。
> - 客户端的 FIN_WAIT_2 状态受 `tcp_fin_timeout` 限制，超时后**也会**断开连接。

## 第四次挥手丢失了，会发生什么？

当客户端收到服务端的第三次挥手的 FIN 报文后，就会回 ACK 报文，也就是第四次挥手，此时客户端连接进入 `TIME_WAIT` 状态。

在 Linux 系统，TIME_WAIT 状态会持续 2MSL 后才会进入关闭状态。

然后，服务端（被动关闭方）没有收到 ACK 报文前，还是处于 LAST_ACK 状态。

如果第四次挥手的 ACK 报文没有到达服务端，服务端就会重发 FIN 报文，重发次数仍然由前面介绍过的 `tcp_orphan_retries` 参数控制。

举个例子，假设 tcp_orphan_retries 为 2，当第四次挥手一直丢失时，发生的过程如下：

![](https://cdn.xiaolincoding.com/gh/xiaolincoder/network/tcp/第四次挥手丢失drawio.drawio.png)

具体过程：

- 当服务端重传第三次挥手报文达到 2 时，由于 tcp_orphan_retries 为 2，达到了最大重传次数，于是再等待一段时间（时间为上一次超时时间的 2 倍），如果还是没能收到客户端的第四次挥手（ACK 报文），那么服务端就会断开连接。
- 客户端在收到第三次挥手后，就会进入 TIME_WAIT 状态，开启时长为 2MSL 的定时器，如果途中再次收到第三次挥手（FIN 报文）后，就会重置定时器，当等待 2MSL 时长后，客户端就会断开连接。

> ## hzh
>
> ### 总结
>
> 1. **第四次挥手（ACK 报文）丢失的影响**：
>    - 服务端未收到客户端的第四次挥手（ACK 报文），会继续重传第三次挥手（FIN 报文）。
>    - 重传次数由 `tcp_orphan_retries` 参数控制（如设置为 2，则最多重传 2 次）。
>    - 达到最大重传次数后，服务端会再等待一段时间（时间为上一次超时时间的 2 倍），如果仍未收到 ACK 报文，服务端会断开连接。
>
> 2. **客户端的行为**：
>    - 客户端在收到服务端的第三次挥手（FIN 报文）后，进入 `TIME_WAIT` 状态，启动 2MSL 定时器。
>    - 如果在 `TIME_WAIT` 状态期间**再次收到服务端的 FIN 报文**，客户端会**重置定时器**，重新等待 2MSL。
>    - 2MSL 时间结束后，客户端会断开连接。
>
> **总结**：  
> - 服务端在未收到第四次挥手时，会重传 FIN 报文，重传次数受 `tcp_orphan_retries` 限制，超过后断开连接。  
> - 客户端在 `TIME_WAIT` 状态下会处理重复的 FIN 报文，并在 2MSL 后断开连接。  
> - 这种机制确保了连接关闭的可靠性，即使报文丢失也能最终完成连接的释放。
>
> ### 解释了 为什么`TIME_WAIT`状态后还有2MSL

## 为什么 TIME_WAIT 等待的时间是 2MSL？

`MSL` 是 Maximum Segment Lifetime，**报文最大生存时间**，它是任何报文在网络上存在的最长时间，超过这个时间报文将被丢弃。因为 TCP 报文基于是 IP 协议的，而 IP 头中有一个 `TTL` 字段，是 IP 数据报可以经过的最大路由数，每经过一个处理他的路由器此值就减 1，当此值为 0 则数据报将被丢弃，同时发送 ICMP 报文通知源主机。

MSL 与 TTL 的区别：MSL 的单位是时间，而 TTL 是经过路由跳数。所以 **MSL 应该要大于等于 TTL 消耗为 0 的时间**，以确保报文已被自然消亡。

**TTL 的值一般是 64，Linux 将 MSL 设置为 30 秒，意味着 Linux 认为数据报文经过 64 个路由器的时间不会超过 30 秒，如果超过了，就认为报文已经消失在网络中了**。

TIME_WAIT 等待 2 倍的 MSL，比较合理的解释是：网络中可能存在来自发送方的数据包，当这些发送方的数据包被接收方处理后又会向对方发送响应，所以**一来一回需要等待 2 倍的时间**。

比如，如果被动关闭方没有收到断开连接的最后的 ACK 报文，就会触发超时重发 `FIN` 报文，另一方接收到 FIN 后，会重发 ACK 给被动关闭方，一来一去正好 2 个 MSL。

可以看到 **2MSL 时长** 这其实是相当于**至少允许报文丢失一次**。比如，若 ACK 在一个 MSL 内丢失，这样被动方重发的 FIN 会在第 2 个 MSL 内到达，TIME_WAIT 状态的连接可以应对。

为什么不是 4 或者 8 MSL 的时长呢？你可以想象一个丢包率达到百分之一的糟糕网络，连续两次丢包的概率只有万分之一，这个概率实在是太小了，忽略它比解决它更具性价比。

`2MSL` 的时间是从**客户端接收到 FIN 后发送 ACK 开始计时的**。如果在 TIME-WAIT 时间内，因为客户端的 ACK 没有传输到服务端，客户端又接收到了服务端重发的 FIN 报文，那么 **2MSL 时间将重新计时**。

在 Linux 系统里 `2MSL` 默认是 `60` 秒，那么一个 `MSL` 也就是 `30` 秒。**Linux 系统停留在 TIME_WAIT 的时间为固定的 60 秒**。

其定义在 Linux 内核代码里的名称为 TCP_TIMEWAIT_LEN：

```c
#define TCP_TIMEWAIT_LEN (60*HZ) /* how long to wait to destroy TIME-WAIT 
                                    state, about 60 seconds  */
```

如果要修改 TIME_WAIT 的时间长度，只能修改 Linux 内核代码里 TCP_TIMEWAIT_LEN 的值，并重新编译 Linux 内核。

> ## hzh
>
> ### 总结
>
> 1. **TIME_WAIT 等待时间为 2MSL 的原因**：
>    - **MSL（Maximum Segment Lifetime）** 是报文在网络中的最大生存时间，通常为 30 秒（Linux 默认）。
>    - TIME_WAIT 等待 2MSL 是为了确保：
>      - 网络中所有的报文（包括重传的 FIN 和 ACK）都已自然消亡。
>      - 被动关闭方未收到 ACK 时重发的 FIN 报文能够被处理，一来一回正好需要 2MSL。
>
> 2. **2MSL 的合理性**：
>    - 2MSL 能应对一次报文丢失的情况（如 ACK 丢失后被动方重发 FIN）。
>    - 丢包率较低的网络中，2MSL 已足够可靠，增加到 4 或 8 MSL 性价比不高。
>
> 3. **TIME_WAIT 的计时**：
>    - 从客户端接收到 FIN 并发送 ACK 开始计时。
>    - 如果在 TIME_WAIT 状态期间再次收到 FIN 报文，2MSL 时间会重新计时。
>
> 4. **Linux 系统默认设置**：
>    - Linux 默认 MSL 为 30 秒，因此 TIME_WAIT 为 60 秒（2MSL）。
>    - 定义在内核代码中为 `TCP_TIMEWAIT_LEN`，值为 `60*HZ`（约 60 秒）。
>    - 修改 TIME_WAIT 时间需要更改内核代码并重新编译。
>
> ### 总结一句话：  
>
> TIME_WAIT 等待 2MSL 是为了确保连接关闭的可靠性，处理可能的报文丢失，同时在性能和可靠性之间达成平衡。

## 为什么需要 TIME_WAIT 状态？ 

主动发起关闭连接的一方，才会有 `TIME-WAIT` 状态。

需要 TIME-WAIT 状态，主要是两个原因：

- 防止历史连接中的数据，被后面相同四元组的连接错误的接收；
- 保证「被动关闭连接」的一方，能被正确的关闭；

*原因一：防止历史连接中的数据，被后面相同四元组的连接错误的接收*

为了能更好的理解这个原因，我们先来了解序列号（SEQ）和初始序列号（ISN）。

- **序列号**，是 TCP 一个头部字段，标识了 TCP 发送端到 TCP 接收端的数据流的一个字节，因为 TCP 是面向字节流的可靠协议，为了保证消息的顺序性和可靠性，TCP 为每个传输方向上的每个字节都赋予了一个编号，以便于传输成功后确认、丢失后重传以及在接收端保证不会乱序。**序列号是一个 32 位的无符号数，因此在到达 4G 之后再循环回到 0**。
- **初始序列号**，在 TCP 建立连接的时候，客户端和服务端都会各自生成一个初始序列号，它是基于时钟生成的一个随机数，来保证每个连接都拥有不同的初始序列号。**初始化序列号可被视为一个 32 位的计数器，该计数器的数值每 4 微秒加 1，循环一次需要 4.55 小时**。

给大家抓了一个包，下图中的 Seq 就是序列号，其中红色框住的分别是客户端和服务端各自生成的初始序列号。

![TCP 抓包图](https://img-blog.csdnimg.cn/img_convert/c9ea9b844e87bcd4acd3e320403ecab3.png)

通过前面我们知道，**序列号和初始化序列号并不是无限递增的，会发生回绕为初始值的情况，这意味着无法根据序列号来判断新老数据**。

假设 TIME-WAIT 没有等待时间或时间过短，被延迟的数据包抵达后会发生什么呢？

![TIME-WAIT 时间过短，收到旧连接的数据报文](https://img-blog.csdnimg.cn/img_convert/6385cc99500b01ba2ef288c27523c1e7.png)

如上图：

- 服务端在关闭连接之前发送的 `SEQ = 301` 报文，被网络延迟了。
- 接着，服务端以相同的四元组重新打开了新连接，前面被延迟的 `SEQ = 301` 这时抵达了客户端，而且该数据报文的序列号刚好在客户端接收窗口内，因此客户端会正常接收这个数据报文，但是这个数据报文是上一个连接残留下来的，这样就产生数据错乱等严重的问题。

为了防止历史连接中的数据，被后面相同四元组的连接错误的接收，因此 TCP 设计了 TIME_WAIT 状态，状态会持续 `2MSL` 时长，这个时间**足以让两个方向上的数据包都被丢弃，使得原来连接的数据包在网络中都自然消失，再出现的数据包一定都是新建立连接所产生的。**

*原因二：保证「被动关闭连接」的一方，能被正确的关闭*

在 RFC 793 指出 TIME-WAIT 另一个重要的作用是：

*TIME-WAIT - represents waiting for enough time to pass to be sure the remote TCP received the acknowledgment of its connection termination request.*

也就是说，TIME-WAIT 作用是**等待足够的时间以确保最后的 ACK 能让被动关闭方接收，从而帮助其正常关闭。**

如果客户端（主动关闭方）最后一次 ACK 报文（第四次挥手）在网络中丢失了，那么按照 TCP 可靠性原则，服务端（被动关闭方）会重发 FIN 报文。

假设客户端没有 TIME_WAIT 状态，而是在发完最后一次回 ACK 报文就直接进入 CLOSE 状态，如果该  ACK 报文丢失了，服务端则重传的 FIN 报文，而这时客户端已经进入到关闭状态了，在收到服务端重传的 FIN 报文后，就会回 RST 报文。

![TIME-WAIT 时间过短，没有确保连接正常关闭](https://img-blog.csdnimg.cn/img_convert/3a81c23ce57c27cf63fc2b77e34de0ab.png)

服务端收到这个 RST 并将其解释为一个错误（Connection reset by peer），这对于一个可靠的协议来说不是一个优雅的终止方式。

为了防止这种情况出现，客户端必须等待足够长的时间，确保服务端能够收到 ACK，如果服务端没有收到 ACK，那么就会触发 TCP 重传机制，服务端会重新发送一个 FIN，这样一去一来刚好两个 MSL 的时间。

![TIME-WAIT 时间正常，确保了连接正常关闭](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4/网络/TIME-WAIT连接正常关闭.drawio.png)

客户端在收到服务端重传的 FIN 报文时，TIME_WAIT 状态的等待时间，会重置回 2MSL。

> ## hzh
>
> ### 注意
>
> 要了解第一点, 首先要明白:
>
> 客户端 在接收到 服务端第一次的 FIN 才会进入 `TIME_WAIT`状态, 一旦进入这个状态, 要么 2MSL 没收到新的`FIN`,关闭连接, 要么 收到, 重置 2MSL
>
> ### 总结：为什么需要 TIME_WAIT 状态？
>
> 1. **防止历史连接数据被错误接收**：
>    
>    - TCP 的序列号是 32 位的无符号数，会发生回绕，**无法通过序列号判断新旧数据**。
>    
>    - 如果没有 TIME_WAIT 状态，旧连接的延迟数据包可能被新连接错误接收，导致数据错乱。
>    
>    - TIME_WAIT 状态持续 2MSL，确保旧连接的数据包在网络中自然消失，避免干扰新连接。
>    
>    - ##### 这是在收到第一次FIN,关闭了, 服务端没收到ACK,且重传的FIN 堵塞了, 会发生的情况
>    
>    - > 1. **新连接的建立**：
>      >    - 旧连接关闭后，客户端和服务端再次建立了一个新的 TCP 连接，四元组仍然是 `(IP1, Port1, IP2, Port2)`。
>      >    - 新连接的初始序列号（ISN）随机生成，但**可能**与旧连接的序列号**范围重叠**。
>      > 2. **旧数据包的到达**：
>      >    - 延迟的旧数据包（序列号为 `301`）到达客户端。
>      >    - 如果这个序列号正好落在新连接的接收窗口内，客户端会误以为这是新连接的数据，导致**数据错乱**。
>    
> 2. **确保被动关闭方正确关闭**：
>    - TIME_WAIT 确保主动关闭方的最后一个 ACK 报文（第四次挥手）能被被动关闭方接收。
>    - 如果 ACK 丢失，被动关闭方会重传 FIN 报文，主动关闭方在 TIME_WAIT 状态下可以重新发送 ACK，确保连接优雅关闭。
>    - 如果没有 TIME_WAIT，ACK 丢失后，主动关闭方可能直接进入 CLOSE 状态，收到重传的 FIN 报文后会发送 RST，**导致连接异常终止。**--不够优雅
>
> **总结一句话**：  
> TIME_WAIT 状态的存在是为了防止旧连接数据干扰新连接，并确保被动关闭方能够正确关闭连接，从而保证 TCP 的可靠性和优雅终止。

## TIME_WAIT 过多有什么危害？

过多的 TIME-WAIT 状态主要的危害有两种：

- 第一是占用系统资源，比如文件描述符、内存资源、CPU 资源、线程资源等；
- 第二是占用端口资源，端口资源也是有限的，一般可以开启的端口为 `32768～61000`，也可以通过 `net.ipv4.ip_local_port_range`参数指定范围。

客户端和服务端 TIME_WAIT 过多，造成的影响是不同的。

**如果客户端（主动发起关闭连接方）的 TIME_WAIT 状态过多**，占满了所有端口资源，那么就无法对「目的 IP+ 目的 PORT」都一样的服务端发起连接了，但是被使用的端口，还是可以继续对另外一个服务端发起连接的。具体可以看我这篇文章：[客户端的端口可以重复使用吗？](https://xiaolincoding.com/network/3_tcp/port.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E7%9A%84%E7%AB%AF%E5%8F%A3%E5%8F%AF%E4%BB%A5%E9%87%8D%E5%A4%8D%E4%BD%BF%E7%94%A8%E5%90%97)

因此，客户端（发起连接方）都是和「目的 IP+ 目的 PORT」都一样的服务端建立连接的话，当客户端的 TIME_WAIT 状态连接过多的话，就会受端口资源限制，如果占满了所有端口资源，那么就无法再跟「目的 IP+ 目的 PORT」都一样的服务端建立连接了。

不过，即使是在这种场景下，只要连接的是不同的服务端，端口是可以重复使用的，所以客户端还是可以向其他服务端发起连接的，这是因为内核在定位一个连接的时候，是通过四元组（源 IP、源端口、目的 IP、目的端口）信息来定位的，并不会因为客户端的端口一样，而导致连接冲突。

**如果服务端（主动发起关闭连接方）的 TIME_WAIT 状态过多**，并不会导致端口资源受限，因为服务端只监听一个端口，而且由于一个四元组唯一确定一个 TCP 连接，因此理论上服务端可以建立很多连接，但是 TCP 连接过多，会占用系统资源，比如文件描述符、内存资源、CPU 资源、线程资源等。

> ## hzh
>
> ### 总结：TIME_WAIT 过多的危害
>
> 1. **主要危害**：
>    - **占用系统资源**：TIME_WAIT 状态会占用文件描述符、内存、CPU 和线程资源，可能导致系统性能下降。
>    - **占用端口资源**：端口资源有限（默认范围为 `32768～61000`，可通过 `net.ipv4.ip_local_port_range` 调整），TIME_WAIT 过多可能导致端口耗尽。
>
> 2. **客户端 TIME_WAIT 过多的影响**：
>    
>    - 如果客户端（主动关闭方）对同一个服务端（相同的「目的 IP + 目的 PORT」）发起大量连接，TIME_WAIT 状态可能占满所有端口资源，导致**无法再与该服务端**建立新连接。
>    - **但客户端仍然可以使用相同的端口与其他服务端建立连接**，因为 TCP 通过四元组（源 IP、源端口、目的 IP、目的端口）唯一标识连接，不会因端口重复而冲突。
>    - ##### 同一个端口, 可以连接不同的 服务端,因为ip不一样
>    
> 3. **服务端 TIME_WAIT 过多的影响**：-- 服务端主动关闭连接
>    
>    - 服务端通常只监听一个端口，因此不会因 TIME_WAIT 状态导致端口耗尽。
>    
>      > - #### **服务端监听的端口是固定的**
>      >
>      >   - 服务端通常只监听一个固定的端口（例如 HTTP 服务监听 80 或 443 端口）。
>      >   - 客户端与服务端建立连接时，服务端的端口始终是固定的，而客户端会随机分配一个源端口。
>      >   - 因此，服务端的端口资源不会因为 TIME_WAIT 状态而耗尽。
>      > - 即使服务端的监听端口是固定的（例如 80），**不同客户端的连接会使用不同的源 IP 和源端口**，因此不会发生冲突。
>    - 但大量 TIME_WAIT 状态会占用系统资源（如文件描述符、内存等），可能影响服务端性能。
>    
>      > - 服务端的每个连接都会占用一个文件描述符，**TIME_WAIT 状态过多会导致文件描述符长时间占用，**无法释放，最终可能耗尽系统资源，导致性能下降甚至服务不可用。
>
> **总结一句话**：  
> TIME_WAIT 过多会占用系统资源**，客户端可能因端口**耗尽无法与同一服务端建立新连接，而**服务端(文件描述符)**则主要面临资源消耗问题。

## 如何优化 TIME_WAIT？

这里给出优化 TIME-WAIT 的几个方式，都是有利有弊：

- 打开 net.ipv4.tcp_tw_reuse 和 net.ipv4.tcp_timestamps 选项；
- net.ipv4.tcp_max_tw_buckets
- 程序中使用 SO_LINGER，应用强制使用 RST 关闭。

*方式一：net.ipv4.tcp_tw_reuse 和 tcp_timestamps*

如下的 Linux 内核参数开启后，则可以**复用处于 TIME_WAIT 的 socket 为新的连接所用**。

有一点需要注意的是，**tcp_tw_reuse 功能只能用客户端（连接发起方），因为开启了该功能，在调用 connect() 函数时，内核会随机找一个 time_wait 状态超过 1 秒的连接给新的连接复用。**

```shell
net.ipv4.tcp_tw_reuse = 1
```

使用这个选项，还有一个前提，需要打开对 TCP 时间戳的支持，即

```plain
net.ipv4.tcp_timestamps=1（默认即为 1）
```

这个时间戳的字段是在 TCP 头部的「选项」里，它由一共 8 个字节表示时间戳，其中第一个 4 字节字段用来保存发送该数据包的时间，第二个 4 字节字段用来保存最近一次接收对方发送到达数据的时间。

由于引入了时间戳，我们在前面提到的 `2MSL` 问题就不复存在了，因为重复的数据包会因为时间戳过期被自然丢弃。

*方式二：net.ipv4.tcp_max_tw_buckets*

这个值默认为 18000，**当系统中处于 TIME_WAIT 的连接一旦超过这个值时，系统就会将后面的 TIME_WAIT 连接状态重置**，这个方法比较暴力。

*方式三：程序中使用 SO_LINGER*

我们可以通过设置 socket 选项，来设置调用 close 关闭连接行为。

```c
struct linger so_linger;
so_linger.l_onoff = 1;
so_linger.l_linger = 0;
setsockopt(s, SOL_SOCKET, SO_LINGER, &so_linger,sizeof(so_linger));
```

如果`l_onoff`为非 0，且`l_linger`值为 0，那么调用`close`后，会立该发送一个`RST`标志给对端，该 TCP 连接将跳过四次挥手，也就跳过了`TIME_WAIT`状态，直接关闭。

但这为跨越`TIME_WAIT`状态提供了一个可能，不过是一个非常危险的行为，不值得提倡。

前面介绍的方法都是试图越过 `TIME_WAIT`状态的，这样其实不太好。虽然 TIME_WAIT 状态持续的时间是有一点长，显得很不友好，但是它被设计来就是用来避免发生乱七八糟的事情。

《UNIX 网络编程》一书中却说道：**TIME_WAIT 是我们的朋友，它是有助于我们的，不要试图避免这个状态，而是应该弄清楚它**。

**如果服务端要避免过多的 TIME_WAIT 状态的连接，就永远不要主动断开连接，让客户端去断开，由分布在各处的客户端去承受 TIME_WAIT**。

> ## hzh
>
> 优化 TIME_WAIT 的方法包括**复用连接、限制数量、强制关闭**等，但最推荐的方式是让客户端承担 TIME_WAIT 状态，同时理解其设计目的，合理管理连接资源。
>
> - 允许复用处于 TIME_WAIT 状态的 socket，用于新的连接。
> - 限制系统中 TIME_WAIT 状态的最大数量，超过限制时强制清理
> - 通过设置 `SO_LINGER` 选项，调用 `close()` 时直接发送 `RST` 报文，跳过四次挥手和 TIME_WAIT 状态。
>
> 具体操作记不住

## 服务器出现大量 TIME_WAIT 状态的原因有哪些？

首先要知道 TIME_WAIT 状态是主动关闭连接方才会出现的状态，所以如果服务器出现大量的 TIME_WAIT 状态的 TCP 连接，就是说明服务器主动断开了很多 TCP 连接。

问题来了，**什么场景下服务端会主动断开连接呢？**

- 第一个场景：HTTP 没有使用长连接
- 第二个场景：HTTP 长连接超时
- 第三个场景：HTTP 长连接的请求数量达到上限

接下来，分别介绍下。

*第一个场景：HTTP 没有使用长连接*

我们先来看看 HTTP 长连接（Keep-Alive）机制是怎么开启的。

在 HTTP/1.0 中默认是关闭的，如果浏览器要开启 Keep-Alive，它必须在请求的 header 中添加：

```text
Connection: Keep-Alive
```

然后当服务器收到请求，作出回应的时候，它也被添加到响应中 header 里：

```text
Connection: Keep-Alive
```

这样做，TCP 连接就不会中断，而是保持连接。当客户端发送另一个请求时，它会使用同一个 TCP 连接。这一直继续到客户端或服务器端提出断开连接。

**从 HTTP/1.1 开始，就默认是开启了 Keep-Alive**，现在大多数浏览器都默认是使用 HTTP/1.1，所以 Keep-Alive 都是默认打开的。一旦客户端和服务端达成协议，那么长连接就建立好了。

如果要关闭 HTTP Keep-Alive，需要在 HTTP 请求或者响应的 header 里添加 `Connection:close` 信息，也就是说，**只要客户端和服务端任意一方的 HTTP header 中有 `Connection:close` 信息，那么就无法使用 HTTP 长连接的机制**。

关闭 HTTP 长连接机制后，每次请求都要经历这样的过程：建立 TCP -> 请求资源 -> 响应资源 -> 释放连接，那么此方式就是 **HTTP 短连接**，如下图：

![HTTP 短连接](https://img-blog.csdnimg.cn/img_convert/d6f6757c02e3afbf113d1048c937f8ee.png)

在前面我们知道，只要任意一方的 HTTP header 中有 `Connection:close` 信息，就无法使用 HTTP 长连接机制，这样在完成一次 HTTP 请求/处理后，就会关闭连接。

问题来了，**这时候是客户端还是服务端主动关闭连接呢？**

在 RFC 文档中，并没有明确由谁来关闭连接，**请求和响应的双方都可以主动关闭 TCP 连接。**

不过，**根据大多数 Web 服务的实现，不管哪一方禁用了 HTTP Keep-Alive，都是由服务端主动关闭连接**，那么此时服务端上就会出现 TIME_WAIT 状态的连接。

> 客户端禁用了 HTTP Keep-Alive，服务端开启 HTTP Keep-Alive，谁是主动关闭方？ 

当客户端禁用了 HTTP Keep-Alive，这时候 HTTP 请求的 header 就会有 `Connection:close` 信息，这时服务端在发完 HTTP 响应后，就会主动关闭连接。

为什么要这么设计呢？HTTP 是请求 - 响应模型，发起方一直是客户端，HTTP Keep-Alive 的初衷是**为客户端后续的请求重用连接**，如果我们**在某次 HTTP 请求 - 响应模型中，请求的 header 定义了 `connection：close` 信息，那不再重用这个连接的时机就只有在服务端了**，所以我们在 HTTP 请求 - 响应这个周期的「末端」关闭连接是合理的。

> 客户端开启了 HTTP Keep-Alive，服务端禁用了 HTTP Keep-Alive，谁是主动关闭方？ 

当客户端开启了 HTTP Keep-Alive，而服务端禁用了 HTTP Keep-Alive，这时服务端在发完 HTTP 响应后，服务端也会主动关闭连接。

为什么要这么设计呢？在服务端主动关闭连接的情况下，只要调用一次 close() 就可以释放连接，剩下的工作由内核 TCP 栈直接进行了处理，整个过程只有一次 syscall；如果是要求 客户端关闭，则服务端在写完最后一个 response 之后需要把这个 socket 放入 readable 队列，调用 select / epoll 去等待事件；然后调用一次 read() 才能知道连接已经被关闭，这其中是两次 syscall，多一次用户态程序被激活执行，而且 socket 保持时间也会更长。

因此，**当服务端出现大量的 TIME_WAIT 状态连接的时候，可以排查下是否客户端和服务端都开启了 HTTP Keep-Alive**，因为任意一方没有开启  HTTP Keep-Alive，都会导致服务端在处理完一个 HTTP 请求后，就主动关闭连接，此时服务端上就会出现大量的 TIME_WAIT 状态的连接。

针对这个场景下，解决的方式也很简单，让客户端和服务端都开启 HTTP Keep-Alive 机制。

*第二个场景：HTTP 长连接超时*

HTTP 长连接的特点是，只要任意一端没有明确提出断开连接，则保持 TCP 连接状态。

HTTP 长连接可以在同一个 TCP 连接上接收和发送多个 HTTP 请求/应答，避免了连接建立和释放的开销。

![](https://img-blog.csdnimg.cn/img_convert/d2b20d1cc03936332adb2a68512eb167.png)

可能有的同学会问，如果使用了 HTTP 长连接，如果客户端完成一个 HTTP 请求后，就不再发起新的请求，此时这个 TCP 连接一直占用着不是挺浪费资源的吗？

对没错，所以为了避免资源浪费的情况，web 服务软件一般都会提供一个参数，用来指定 HTTP 长连接的超时时间，比如 nginx 提供的 keepalive_timeout 参数。

假设设置了 HTTP 长连接的超时时间是 60 秒，nginx 就会启动一个「定时器」，**如果客户端在完后一个 HTTP 请求后，在 60 秒内都没有再发起新的请求，定时器的时间一到，nginx 就会触发回调函数来关闭该连接，那么此时服务端上就会出现 TIME_WAIT 状态的连接**。

![HTTP 长连接超时](https://img-blog.csdnimg.cn/img_convert/7e995ecb2e42941342f97256707496c9.png)

当服务端出现大量 TIME_WAIT 状态的连接时，如果现象是有大量的客户端建立完 TCP 连接后，很长一段时间没有发送数据，那么大概率就是因为 HTTP 长连接超时，导致服务端主动关闭连接，产生大量处于 TIME_WAIT 状态的连接。

可以往网络问题的方向排查，比如是否是因为网络问题，导致客户端发送的数据一直没有被服务端接收到，以至于 HTTP 长连接超时。

*第三个场景：HTTP 长连接的请求数量达到上限*

Web 服务端通常会有个参数，来定义一条 HTTP 长连接上最大能处理的请求数量，当超过最大限制时，就会主动关闭连接。

比如 nginx 的 keepalive_requests 这个参数，这个参数是指一个 HTTP 长连接建立之后，nginx 就会为这个连接设置一个计数器，记录这个 HTTP 长连接上已经接收并处理的客户端请求的数量。**如果达到这个参数设置的最大值时，则 nginx 会主动关闭这个长连接**，那么此时服务端上就会出现 TIME_WAIT 状态的连接。

keepalive_requests 参数的默认值是 100，意味着每个 HTTP 长连接最多只能跑 100  次请求，这个参数往往被大多数人忽略，因为当 QPS (每秒请求数) 不是很高时，默认值 100 凑合够用。

但是，**对于一些 QPS 比较高的场景，比如超过 10000 QPS，甚至达到 30000 , 50000 甚至更高，如果 keepalive_requests 参数值是 100，这时候就 nginx 就会很频繁地关闭连接，那么此时服务端上就会出大量的 TIME_WAIT 状态**。

针对这个场景下，解决的方式也很简单，调大 nginx 的 keepalive_requests 参数就行。

> ## hzh
>
> ### 总结：服务器出现大量 TIME_WAIT 状态的原因及解决方法
>
> 1. **原因**：
>    - **服务端主动关闭连接**，导致大量连接进入 TIME_WAIT 状态。
>    - 常见场景：
>      - **HTTP 未使用长连接**：每次请求完成后，服务端主动关闭连接。
>      - **HTTP 长连接超时**：客户端长时间不发送请求，服务端超时关闭连接。
>      - **HTTP 长连接请求数达到上限**：服务端限制每个长连接的最大请求数，达到上限后主动关闭。
>
> 2. **解决方法**：
>    - **启用 HTTP 长连接**：确保客户端和服务端都开启 `Keep-Alive`。
>      - http1.1开始默认打开
>      - 在 HTTP 请求或者响应的 header 里添加 `Connection:close` 信息,可以关闭长连接
>    - **调整超时时间**：增加服务端的长连接超时时间（如 `keepalive_timeout`）。
>    - **提高请求数上限**：增大 `keepalive_requests` 参数值，减少频繁关闭连接的情况。
>
> ### 总结一句话：  
>
> 服务端大量 TIME_WAIT 状态通常是由于主动关闭连接引起的，通过优化长连接配置和参数，可以有效减少 TIME_WAIT 状态的数量。

## 服务器出现大量 CLOSE_WAIT 状态的原因有哪些？

CLOSE_WAIT 状态是「被动关闭方」才会有的状态，而且如果「被动关闭方」没有调用 close 函数关闭连接，那么就无法发出 FIN 报文，从而无法使得 CLOSE_WAIT 状态的连接转变为 LAST_ACK 状态。

所以，**当服务端出现大量 CLOSE_WAIT 状态的连接的时候，说明服务端的程序没有调用 close 函数关闭连接**。

那什么情况会导致服务端的程序没有调用 close 函数关闭连接？这时候通常需要排查代码。

我们先来分析一个普通的 TCP 服务端的流程：

1. 创建服务端 socket，bind 绑定端口、listen 监听端口
2. 将服务端 socket 注册到 epoll
3. epoll_wait 等待连接到来，连接到来时，调用 accpet 获取已连接的 socket
4. 将已连接的 socket 注册到 epoll
5. epoll_wait 等待事件发生
6. 对方连接关闭时，我方调用 close

可能导致服务端没有调用 close 函数的原因，如下。

**第一个原因**：第 2 步没有做，没有将服务端 socket 注册到 epoll，这样有新连接到来时，服务端没办法感知这个事件，也就无法获取到已连接的 socket，那服务端自然就没机会对 socket 调用 close 函数了。

不过这种原因发生的概率比较小，这种属于明显的代码逻辑 bug，在前期 read view 阶段就能发现的了。

**第二个原因**：第 3 步没有做，有新连接到来时没有调用 accpet 获取该连接的 socket，导致当有大量的客户端主动断开了连接，而服务端没机会对这些 socket 调用 close 函数，从而导致服务端出现大量 CLOSE_WAIT 状态的连接。

发生这种情况可能是因为服务端在执行 accpet  函数之前，代码卡在某一个逻辑或者提前抛出了异常。

**第三个原因**：第 4 步没有做，通过 accpet 获取已连接的 socket 后，没有将其注册到 epoll，导致后续收到 FIN 报文的时候，服务端没办法感知这个事件，那服务端就没机会调用 close 函数了。

发生这种情况可能是因为服务端在将已连接的 socket 注册到 epoll 之前，代码卡在某一个逻辑或者提前抛出了异常。之前看到过别人解决 close_wait 问题的实践文章，感兴趣的可以看看：[一次 Netty 代码不健壮导致的大量 CLOSE_WAIT 连接原因分析](https://mp.weixin.qq.com/s?__biz=MzU3Njk0MTc3Ng==&mid=2247486020&idx=1&sn=f7cf41aec28e2e10a46228a64b1c0a5c&scene=21#wechat_redirect)

**第四个原因**：第 6 步没有做，当发现客户端关闭连接后，服务端没有执行 close 函数，可能是因为代码漏处理，或者是在执行 close 函数之前，代码卡在某一个逻辑，比如发生死锁等等。

可以发现，**当服务端出现大量 CLOSE_WAIT 状态的连接的时候，通常都是代码的问题，这时候我们需要针对具体的代码一步一步的进行排查和定位，主要分析的方向就是服务端为什么没有调用 close**。

> ## hzh
>
> 这个第一次看没明白, 弄懂 epoll和accept是干了啥, 会很明白
>
> ### 总结：服务器出现大量 CLOSE_WAIT 状态的原因
>
> 1. **CLOSE_WAIT 状态的本质**：  
>    
>    CLOSE_WAIT 状态表示服务端作为被动关闭方，未及时调用 `close` 函数完成连接关闭。
>    
>    
>    
> 2. **常见原因**：  -- 关于 **epoll** 的原因，只有在服务端使用 **epoll** 作为 I/O 多路复用机制时才会出现。
>    
>    - **未注册监听 socket 到 epoll**：服务端无法感知新连接到来。  
>    - **未调用 `accept` 获取连接 socket**：服务端未处理新连接，导致连接堆积。  
>    - **未将已连接 socket 注册到 epoll**：服务端无法感知客户端关闭连接的事件。  
>    - **未调用 `close` 函数**：代码漏处理或逻辑卡住（如死锁）。
>    
> 3. **解决方法**：  
>    - 检查代码逻辑，确保正确注册监听 socket 和已连接 socket 到 epoll。  
>    - 确保调用 `accept` 和 `close` 函数，及时处理连接关闭。  
>    - 排查代码异常（如逻辑卡住或死锁）。  
>
> **总结一句话**：  
> CLOSE_WAIT 状态过多通常是服务端未及时调用 `close` 函数导致的，需要从代码逻辑入手逐步排查问题。

## 如果已经建立了连接，但是客户端突然出现故障了怎么办？

客户端出现故障指的是客户端的主机发生了宕机，或者断电的场景。发生这种情况的时候，如果服务端一直不会发送数据给客户端，那么服务端是永远无法感知到客户端宕机这个事件的，也就是服务端的 TCP 连接将一直处于   `ESTABLISH` 状态，占用着系统资源。

为了避免这种情况，TCP 搞了个**保活机制**。这个机制的原理是这样的：

定义一个时间段，在这个时间段内，如果没有任何连接相关的活动，TCP 保活机制会开始作用，每隔一个时间间隔，发送一个探测报文，该探测报文包含的数据非常少，如果连续几个探测报文都没有得到响应，则认为当前的 TCP 连接已经死亡，系统内核将错误信息通知给上层应用程序。

在 Linux 内核可以有对应的参数可以设置保活时间、保活探测的次数、保活探测的时间间隔，以下都为默认值：

```shell
net.ipv4.tcp_keepalive_time=7200
net.ipv4.tcp_keepalive_intvl=75  
net.ipv4.tcp_keepalive_probes=9
```

- tcp_keepalive_time=7200：表示保活时间是 7200 秒（2 小时），也就 2 小时内如果没有任何连接相关的活动，则会启动保活机制
- tcp_keepalive_intvl=75：表示每次检测间隔 75 秒；
- tcp_keepalive_probes=9：表示检测 9 次无响应，认为对方是不可达的，从而中断本次的连接。

也就是说在 Linux 系统中，最少需要经过 2 小时 11 分 15 秒才可以发现一个「死亡」连接。

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzMzLmpwZw?x-oss-process=image/format,png)

注意，应用程序若想使用 TCP 保活机制需要通过 socket 接口设置 `SO_KEEPALIVE` 选项才能够生效，如果没有设置，那么就无法使用 TCP 保活机制。

如果开启了 TCP 保活，需要考虑以下几种情况：

- 第一种，对端程序是正常工作的。当 TCP 保活的探测报文发送给对端，对端会正常响应，这样 **TCP 保活时间会被重置**，等待下一个 TCP 保活时间的到来。

- 第二种，对端主机宕机并重启。当 TCP 保活的探测报文发送给对端后，对端是可以响应的，但由于没有该连接的有效信息，**会产生一个 RST 报文**，这样很快就会发现 TCP 连接已经被重置。

- 第三种，是对端主机宕机（*注意不是进程崩溃，进程崩溃后操作系统在回收进程资源的时候，会发送 FIN 报文，而主机宕机则是无法感知的，所以需要 TCP 保活机制来探测对方是不是发生了主机宕机*），或对端由于其他原因导致报文不可达。当 TCP 保活的探测报文发送给对端后，石沉大海，没有响应，连续几次，达到保活探测次数后，**TCP 会报告该 TCP 连接已经死亡**。

TCP 保活的这个机制检测的时间是有点长，我们可以自己在应用层实现一个心跳机制。

比如，web 服务软件一般都会提供 `keepalive_timeout` 参数，用来指定 HTTP 长连接的超时时间。如果设置了 HTTP 长连接的超时时间是 60 秒，web 服务软件就会**启动一个定时器**，如果客户端在完成一个 HTTP 请求后，在 60 秒内都没有再发起新的请求，**定时器的时间一到，就会触发回调函数来释放该连接。**

![web 服务的 心跳机制](https://img-blog.csdnimg.cn/img_convert/2d872f947dedd24800a1867dc4f8b9ce.png)

> ## hzh
>
> ### 服务端怎么感知客户端崩溃了?
>
> ### 总结
>
> 1. **问题**：  
>    客户端宕机或断电时，服务端无法感知，TCP 连接会一直处于 `ESTABLISH` 状态，占用系统资源。
>
> 2. **解决方法**：  
>    - **TCP 保活机制**：通过探测报文检测连接状态，默认检测时间较长（2 小时以上）。  
>    - **应用层心跳机制**：通过定时发送心跳包或设置超时时间（如 HTTP 的 `keepalive_timeout`），快速释放死亡连接。
>
> 3. **推荐**：  
>    - 开启 TCP 保活（`SO_KEEPALIVE`），并根据需求调整保活参数。  
>    - 在应用层实现更灵活的心跳检测机制，适应不同场景需求。

## 如果已经建立了连接，但是服务端的进程崩溃会发生什么？

TCP 的连接信息是由内核维护的，所以当服务端的进程崩溃后，内核需要回收该进程的所有 TCP 连接资源，于是**内核会发送第一次挥手 FIN 报文**，后续的挥手过程也都是在**内核完成**，并不需要进程的参与，所以即使服务端的进程退出了，还是能与客户端完成 TCP 四次挥手的过程。

我自己做了个实验，使用 kill -9 来模拟进程崩溃的情况，发现**在 kill 掉进程后，服务端会发送 FIN 报文，与客户端进行四次挥手**。

::: tip

关于进程崩溃和主机宕机的区别，可以参考这篇：[TCP 连接，一端断电和进程崩溃有什么区别？](https://xiaolincoding.com/network/3_tcp/tcp_down_and_crash.html)

还有一个类似的问题：「拔掉网线后，原本的 TCP 连接还存在吗？」，具体可以看这篇：[拔掉网线后，原本的 TCP 连接还存在吗？](https://xiaolincoding.com/network/3_tcp/tcp_unplug_the_network_cable.html)

:::

> ## hzh
>
> 服务端进程崩溃后，内核会发送 FIN 报文，与客户端完成四次挥手，确保连接的优雅关闭。
>
> 测试 kill 确实还是 服务端, 没有 内核的事
>
> 

> ## hzh测试握手挥手
>
> tcpdump 里 flags 表示 是什么 控制位
>
> S: SYN
>
> S.:SYN-ACK
>
> .:ACK
>
> F:FIN

---

# Socket 编程

## 针对 TCP 应该如何 Socket 编程？

![基于 TCP 协议的客户端和服务端工作](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzM0LmpwZw?x-oss-process=image/format,png)


- 服务端和客户端初始化 `socket`，得到文件描述符；
- 服务端调用 `bind`，将 socket 绑定在指定的 IP 地址和端口;
- 服务端调用 `listen`，进行监听；
- 服务端调用 `accept`，等待客户端连接；
- 客户端调用 `connect`，向服务端的地址和端口发起连接请求；
- 服务端 `accept` 返回用于传输的 `socket` 的文件描述符；
- 客户端调用 `write` 写入数据；服务端调用 `read` 读取数据；
- 客户端断开连接时，会调用 `close`，那么服务端 `read` 读取数据的时候，就会读取到了 `EOF`，待处理完数据后，服务端调用 `close`，表示连接关闭。

这里需要注意的是，服务端调用 `accept` 时，连接成功了会返回一个已完成连接的 socket，后续用来传输数据。

所以，监听的 socket 和真正用来传送数据的 socket，是「两个」socket，一个叫作**监听 socket**，一个叫作**已完成连接 socket**。

成功连接建立之后，双方开始通过 read 和 write 函数来读写数据，就像往一个文件流里面写东西一样。

> ## hzh
>
> 差不多是明白的, 不总结了

## listen 时候参数 backlog 的意义？

Linux 内核中会维护两个队列：

- 半连接队列（SYN 队列）：接收到一个 SYN 建立连接请求，处于 SYN_RCVD 状态；
- 全连接队列（Accpet 队列）：已完成 TCP 三次握手过程，处于 ESTABLISHED 状态；

![ SYN 队列 与 Accpet 队列 ](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzM1LmpwZw?x-oss-process=image/format,png)

```c
int listen (int socketfd, int backlog)
```

- 参数一 socketfd 为 socketfd 文件描述符
- 参数二 backlog，这参数在历史版本有一定的变化

在早期 Linux 内核 backlog 是 SYN 队列大小，也就是未完成的队列大小。

在 Linux 内核 2.2 之后，backlog 变成 accept 队列，也就是已完成连接建立的队列长度，**所以现在通常认为 backlog 是 accept 队列。**

**但是上限值是内核参数 somaxconn 的大小，也就说 accpet 队列长度 = min(backlog, somaxconn)。**

想详细了解 TCP 半连接队列和全连接队列，可以看这篇：[TCP 半连接队列和全连接队列满了会发生什么？又该如何应对？](https://xiaolincoding.com/network/3_tcp/tcp_queue.html)

> ## hzh
>
> listen的两个参数, 一个是socketfd, 一个是 最大监听数

## accept 发生在三次握手的哪一步？

我们先看看客户端连接服务端时，发送了什么？

![socket 三次握手](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4/网络/socket三次握手.drawio.png)

- 客户端的协议栈向服务端发送了 SYN 包，并告诉服务端当前发送序列号 client_isn，客户端进入 SYN_SENT 状态；
- 服务端的协议栈收到这个包之后，和客户端进行 ACK 应答，应答的值为 client_isn+1，表示对 SYN 包 client_isn 的确认，同时服务端也发送一个 SYN 包，告诉客户端当前我的发送序列号为 server_isn，服务端进入 SYN_RCVD 状态；
- 客户端协议栈收到 ACK 之后，使得应用程序从 `connect` 调用返回，表示客户端到服务端的单向连接建立成功，客户端的状态为 ESTABLISHED，同时客户端协议栈也会对服务端的 SYN 包进行应答，应答数据为 server_isn+1；
- ACK 应答包到达服务端后，服务端的 TCP 连接进入 ESTABLISHED 状态，同时服务端协议栈使得 `accept` 阻塞调用返回，这个时候服务端到客户端的单向连接也建立成功。至此，客户端与服务端两个方向的连接都建立成功。

从上面的描述过程，我们可以得知**客户端 connect 成功返回是在第二次握手，服务端 accept 成功返回是在三次握手成功之后。**

> ## hzh
>
> ### 总结
>
> 
>
> - **客户端的 `connect`**：在第一次握手时调用并阻塞, 在第二次握手完成后返回。
> - **服务端的 `accept`**：在收到第一次握手时,调用并阻塞,开始发送第二次握手,  在三次握手完成后返回。
>
> 因此，`accept` 的成功返回标志着三次握手的完成，同时也意味着服务端和客户端之间的双向连接已经完全建立。

## 客户端调用 close 了，连接是断开的流程是什么？

我们看看客户端主动调用了 `close`，会发生什么？

![客户端调用 close 过程](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3hpYW9saW5jb2Rlci9JbWFnZUhvc3QyLyVFOCVBRSVBMSVFNyVBRSU5NyVFNiU5QyVCQSVFNyVCRCU5MSVFNyVCQiU5Qy9UQ1AtJUU0JUI4JTg5JUU2JUFDJUExJUU2JThGJUExJUU2JTg5JThCJUU1JTkyJThDJUU1JTlCJTlCJUU2JUFDJUExJUU2JThDJUE1JUU2JTg5JThCLzM3LmpwZw?x-oss-process=image/format,png)

- 客户端调用 `close`，表明客户端没有数据需要发送了，则此时会向服务端发送 FIN 报文，进入 FIN_WAIT_1 状态；
- 服务端接收到了 FIN 报文，TCP 协议栈会为 FIN 包插入一个文件结束符 `EOF` 到接收缓冲区中，应用程序可以通过 `read` 调用来感知这个 FIN 包。这个 `EOF` 会被**放在已排队等候的其他已接收的数据之后**，这就意味着服务端需要处理这种异常情况，因为 EOF 表示在该连接上再无额外数据到达。此时，服务端进入 CLOSE_WAIT 状态；
- 接着，当处理完数据后，自然就会读到 `EOF`，于是也调用 `close` 关闭它的套接字，这会使得服务端发出一个 FIN 包，之后处于 LAST_ACK 状态；
- 客户端接收到服务端的 FIN 包，并发送 ACK 确认包给服务端，此时客户端将进入 TIME_WAIT 状态；
- 服务端收到 ACK 确认包后，就进入了最后的 CLOSE 状态；
- 客户端经过 `2MSL` 时间之后，也进入 CLOSE 状态；

> ## hzh
>
> ### 总结
>
> 1. **TCP 四次挥手的流程**：
>    - 客户端调用 `close`，发送 `FIN`，进入 `FIN_WAIT_1` 状态。
>    - 服务端收到 `FIN`，进入 `CLOSE_WAIT` 状态。
>    - 服务端调用 `close`，发送 `FIN`，进入 `LAST_ACK` 状态。
>    - 客户端收到服务端的 `FIN`，发送 `ACK`，进入 `TIME_WAIT` 状态。
>    - 服务端收到 `ACK`，进入 `CLOSE` 状态。
>    - 客户端等待 `2MSL` 后，进入 `CLOSE` 状态。
>
> 2. **关键状态**：
>    - **`CLOSE_WAIT`**：服务端收到 `FIN` 后，等待应用程序调用 `close`。
>    - **`TIME_WAIT`**：客户端发送 `ACK` 后，等待 `2MSL` 确保连接完全关闭。
>
> 3. **注意点**：
>    - 服务端未及时调用 `close` 会导致连接长时间停留在 `CLOSE_WAIT` 状态，可能引发资源泄漏。
>    - 客户端进入 `TIME_WAIT` 是 TCP 协议的设计，用于确保网络中没有遗留的报文。
>
> 4. **完整关闭的标志**：
>    - 客户端和服务端都进入 `CLOSE` 状态，连接完全关闭。
>
> ### 为什么需要 `read`？
>
> - TCP 是一个 **全双工协议**，即使客户端关闭了发送方向（通过发送 `FIN`），服务端仍然可以继续向客户端发送数据。
> - 服务端需要通过 `read` 来感知客户端的关闭，并决定是否继续发送数据或关闭连接。
>
> ### 那如果有了readEOF, 服务端还是可以发送一点未处理完的数据吧?
>
> 是的，即使服务端通过 `read` 感知到了客户端发送的 `FIN`（即读取到了 **EOF**），服务端仍然可以继续发送未处理完的数据。这是因为 **TCP 是全双工协议**，即使一方关闭了发送方向，另一方的发送方向仍然是开放的。
>
> ### 总结
>
> - `read` 的作用是让**服务端感知客户端的关闭**（通过读取到 **EOF**）。
> - 在四次挥手中，`read` 是服务端处理 `CLOSE_WAIT` 状态的重要一步。
> - 如果服务端没有调用 `read` 或没有正确处理 **EOF**，可能会导致连接资源未释放，停留在 `CLOSE_WAIT` 状态。
>
> ### 服务器感知客户端的状态可以通过以下方式：
>
> - **正常关闭**：通过 `read` 检测到 EOF 或通过 `epoll` 监听到关闭事件。
> - **异常断开**：通过 `recv` 返回错误或心跳检测超时。
> - **长时间无响应**：通过超时机制感知。

## 没有 accept，能建立 TCP 连接吗？

答案：**可以的**。

accept 系统调用并不参与 TCP 三次握手过程，它只是负责从 TCP 全连接队列取出一个已经建立连接的 socket，用户层通过 accept 系统调用拿到了已经建立连接的 socket，就可以对该 socket 进行读写操作了。

![半连接队列与全连接队列](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP-%E5%8D%8A%E8%BF%9E%E6%8E%A5%E5%92%8C%E5%85%A8%E8%BF%9E%E6%8E%A5/3.jpg)

更想了解这个问题，可以参考这篇文章：[没有 accept，能建立 TCP 连接吗？](https://xiaolincoding.com/network/3_tcp/tcp_no_accpet.html)

## 没有 listen，能建立 TCP 连接吗？

答案：**可以的**。

客户端是可以自己连自己的形成连接（**TCP 自连接**），也可以两个客户端同时向对方发出请求建立连接（**TCP 同时打开**），这两个情况都有个共同点，就是**没有服务端参与，也就是没有 listen，就能 TCP 建立连接。**

更想了解这个问题，可以参考这篇文章：[服务端没有 listen，客户端发起连接建立，会发生什么？](https://xiaolincoding.com/network/3_tcp/tcp_no_listen.html)

---



> ## hzh
>
> ### 没有 `accept`，能建立 TCP 连接吗？
> **答案：可以的。**
>
> - **原因**：  
>   `accept` 系统调用并不参与 TCP 三次握手的过程。三次握手是由内核协议栈自动完成的，`accept` 的作用是从 **全连接队列** 中取出一个已经建立连接的 socket，供用户层使用。
>   
> - **流程**：
>   1. 客户端发起连接请求（发送 `SYN`）。
>   2. 服务端收到请求后，发送 `SYN+ACK`，并将连接放入 **半连接队列**。
>   3. 客户端收到 `SYN+ACK` 后，发送 `ACK`，完成三次握手，连接进入 **全连接队列**。
>   4. 如果服务端应用程序没有调用 `accept`，连接会一直停留在全连接队列中，直到超时或被客户端关闭。
>
> - **结论**：  
>   即使没有调用 `accept`，TCP 连接仍然可以建立，但**服务端应用程序无法获取该连接的 socket，也无法对其进行读写操作。**
>   
> - #### accept 返回的是 连接的 socketfd!!
>
> 此时回看[服务器出现大量 CLOSE_WAIT 状态的原因有哪些？](##服务器出现大量 CLOSE_WAIT 状态的原因有哪些？)
>
> ---
>
> ### 没有 `listen`，能建立 TCP 连接吗？
> **答案：可以的。**
>
> - **原因**：  
>   在某些特殊情况下，TCP 连接**可以在没有服务端**调用 `listen` 的情况下建立。这些情况包括：
>   1. **TCP 自连接**：  
>      客户端向自身发起连接请求（源 IP 和目标 IP 相同，源端口和目标端口不同），可以建立一个 TCP 自连接。
>   2. **TCP 同时打开**：  
>      两个客户端同时向对方发起连接请求（双方同时发送 `SYN`），可以建立连接，而无需服务端调用 `listen`。
>
> - **流程**：
>   - **TCP 自连接**：
>     1. 客户端向自身发起连接请求。
>     2. 内核协议栈处理三次握手，完成连接建立。
>   - **TCP 同时打开**：
>     1. 两个客户端同时发送 `SYN`。
>     2. 双方收到对方的 `SYN` 后，发送 `SYN+ACK`。
>     3. 双方收到 `SYN+ACK` 后，发送 `ACK`，完成连接。
>
> - **结论**：  
>   在特殊情况下（如 TCP 自连接或 TCP 同时打开），即使没有服务端调用 `listen`，TCP 连接仍然可以建立。
>
> ---
>
> ### 总结
> - **没有 `accept`**：TCP 连接可以建立，但服务端应用程序无法获取连接的 socket。
> - **没有 `listen`**：在特殊情况下（如 TCP 自连接或 TCP 同时打开），TCP 连接仍然可以建立。
