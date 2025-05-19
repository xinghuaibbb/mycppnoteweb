

ubuntu-3d

hzh    hzh1234

root   huai1234

# 另一个笔记, 某些比day1 详细点

## 0 Unix 环境高级编程

1.操作系统服务

典型的服务: 执行新程序,打开文件,读文件,分配存储区,获得当地时间等等....

2.内核

操作系统可悲定义为一种软件, 控制计算机硬件资源, 提供程序运行环境,   this 操作系统为 内核

3.系统调用

UNIX内核的接口称之为系统调用

其余看github 笔记, 会补充



## 1.命令补充

1.cd -

返回之前所在目录



2.linux 文件类型

ls -l

普通文件 - regular file

目录文件 d directory

符号链接(软连接) l 符号链接文件类似于 Windows 中的快捷方式，它指向另一个文件或目录。 symbolic link

字符设备文件 c 字符设备文件用于与设备进行按字节操作，常见的如终端设备、串口设备等。 character device

块设备文件 b 块设备文件用于与块设备进行按块操作，常见的如硬盘、光盘等。  block device

嵌套子文件 s 套接字文件用于网络通信，可以进行本地或网络服务间的通信。 socket 

命名管道文件FIFO p 命名管道用于进程间通信（IPC），可以在不同的进程之间传输数据。



3.rmdir

删除空目录   对比  rm



4.cp

-a 会把文件属性一起拷贝进去  归档模式

-r 会改变时间等属性

5.cat和tac 

cat倒过来写, 文件也会倒着显示

6.大文件显示

```c++
more：
用于逐屏显示文件内容，即每次显示一屏，按下空格键可以向下翻一屏，按 Enter 键可以逐行翻页。
适合查看较大的文件，但功能较为简单，无法向上翻页。
    常用快捷键：
Space：向下翻一页。
Enter：向下翻一行。
q：退出查看。
    
    
less：
和 more 类似，但功能更强大。less 支持向上和向下翻页，因此在查看长文件时更加灵活。
less 不会一次性读取整个文件，而是按需加载，适合查看超大文件。
    常用快捷键：
Space：向下翻一页。
b：向上翻一页。
Arrow Down/Up：上下翻行。
g：跳到文件头。
G：跳到文件末尾。
q：退出查看。
    
    
    
head：
head 显示文件的前面几行，默认显示前 10 行。它可以通过选项来指定显示的行数。
    也可以通过 -n 选项指定行数:
head -n 20 filename
    
    
    
    
tail：
tail 显示文件的末尾几行，默认显示最后 10 行。和 head 类似，也可以通过选项来指定行数。
tail 的 -f 选项用于实时监视文件的变化，常用于监视日志文件。
    使用 -f 来监控文件的实时更新（通常用于查看实时日志）：
tail -f logfile
```



7.tree(需安装)

与ls差不多   ls -R



8.wc

wc -l     统计字节数-c,字数-w,列数-l



9.od

指定数据显示格式,进制等



10.du   (disply use)

显示 某个目录大小 B为单位



11.df   (disply free)

磁盘剩余空间



12.软硬链接

ln  -s   soft

```c++
在 Linux 中，软链接（symbolic link）和硬链接（hard link）是两种不同的文件链接方式，它们的作用是将一个文件或目录的引用指向另一个文件或目录。以下是对它们的详细解释和比较：

1. 软链接（Symbolic Link 或 symlink）：
软链接类似于 Windows 中的快捷方式，实际上是一个指向另一个文件或目录的指针，指向文件路径。
软链接可以跨文件系统（不同分区）。
软链接可以指向文件或目录。
当软链接指向的原文件被删除或移动后，软链接将变为“悬空链接”（broken link），无法再访问该文件。   
    最好使用绝对路径,这样,软连接可以移动
    
    ln -s target_file link_name
    target_file 是你想要创建软链接的目标文件，link_name 是软链接的名称。
    
    软链接是一个独立的文件，具有自己的 inode。
如果原始文件被删除，软链接将无法使用。
软链接的大小只是路径名的长度，并不是目标文件的大小。
    
2. 硬链接（Hard Link）：
硬链接是将多个文件名指向相同的文件数据块，即硬链接文件和原文件共享同一个 inode。
硬链接只能在同一文件系统（同一分区）中创建，不能跨文件系统。
硬链接只能指向文件，不能指向目录（除非是超级用户，且特殊情况下可以创建目录的硬链接）。
当你修改硬链接文件或原文件，实际内容都会同步修改，因为它们指向相同的数据块。
删除其中一个文件（无论是硬链接还是原文件），文件内容仍然存在，只要有至少一个硬链接指向该数据块。
    
    ln target_file link_name
    
    硬链接和原文件共享相同的 inode。
无论删除原文件或硬链接文件，数据块只会在所有链接删除后才会真正从磁盘上移除。
硬链接的大小与原文件一致，因为它们指向同一数据。
    
```

可以简单地这样理解：

1. **硬链接**：
   - 像给文件 **起了别名**，它直接指向文件的内容。
   - 不管是“原文件”还是“硬链接”，都是真正的文件，只是换了个名字。删除其中一个，数据还在。
2. **软链接**：
   - 更像 **快捷方式**，它只保存目标文件的位置。
   - 如果目标文件被删除，快捷方式就失效了（因为它依赖于目标文件的路径）。

13.stat

stat 文件名

```c++
主要输出字段：
File：文件名。
Size：文件大小（以字节为单位）。
Blocks：文件占用的块数。
IO Block：文件的每块字节大小。
Device：文件所在设备的设备号。
Inode：文件的 inode 号。
Links：文件的硬链接数量。
Access：文件的权限（以八进制和符号格式显示）。
Uid 和 Gid：文件的所有者用户和组的 ID 号。
Access、Modify、Change：文件的最近访问、修改和状态变更的时间戳。
```

`inode`（索引节点）是文件系统中的数据结构，用于存储关于文件的元数据信息。每个文件或目录在文件系统中都有一个对应的 `inode`，其中包含该文件或目录的属性，但不包括文件名或实际数据。文件名和 `inode` 之间的映射通过目录来实现。

硬链接与 `inode`：

硬链接是多个文件名指向同一个 `inode`，即多个文件名共享同一个文件的数据。删除其中一个硬链接并不会删除文件的数据，只有当所有硬链接都被删除时，文件才会真正从文件系统中移除。

每个文件系统的 `inode` 数量是有限的。如果一个文件系统的 `inode` 用尽了，即使还有剩余磁盘空间，也无法再创建新文件



14.ps 显示进程

一般 ps aux 是绑定的

如果使用grep一起, 若有命令.至少两条, 有一条是 grep自己



15.xargs

`xargs` 是从标准输入获取内容，并将其作为参数传递给命令，通常用于批量处理大量输入。

`xargs` 可以将输入中的每一行或每个单词，作为参数传递给一个指定的命令。

它允许将输入的内容分成多次执行，避免命令行长度过长。

通过 `-n` 参数可以指定每次传递的参数数量。

默认以空格分隔, 但是文件名若有空格, 会误拆分



find . -name "*.txt" | xargs rm



`exec` 是直接替换当前进程，用指定的命令取代它，不会创建新的子进程。

`exec` 不会创建新的进程，而是用指定的命令替换当前的进程

find . -name "*.txt" -exec rm {} \;



```shell
print0 是 Unix/Linux 系统中的一个选项，通常用于与 xargs、find 等命令结合使用。它的作用是输出内容时在每个项目之间使用空字符（即 null 字符 \0）作为分隔符，而不是换行符。

为什么使用 -print0？
在处理文件名或其他输出时，文件名中可能会包含空格、换行符等特殊字符，这些字符会导致传统的基于换行符的处理方式出现问题。使用 -print0 可以避免这些问题，因为空字符通常不会出现在文件名中。
    find 与 -print0：
find 命令可以使用 -print0 选项，将输出的文件列表以 \0（空字符）作为分隔符。
    find . -name "*.txt" -print0
    xargs 与 -0（零终止符）选项：
   xargs 命令通常会配合 -print0 使用。xargs -0 表示以空字符作为分隔符来读取输入数据。
find . -name "*.txt" -print0 | xargs -0 rm

```



16.deb包

`deb` 是 Debian 软件包的文件格式，用于在基于 Debian 的 Linux 发行版（如 Ubuntu）中安装软件。`.deb` 文件包含了安装软件所需的二进制文件、库文件、配置文件和脚本。使用 `deb` 包可以通过包管理器（如 `dpkg` 或 `apt`）轻松安装、卸载或升级软件。



在黑马的课中, 一些进程,网络,服务器构建等命令,在最后项目再讲



vim 末行模式  vsp 文件名   可左右分屏   sp 上下分屏

## 2.gcc

## 1.gcc编译4大步骤

预处理(pre-processing) : 展开宏\头文件,替换条件编译,删除注释,空行,空白    输入.c文件 生成.i文件   gcc -E(预处理) 源文件 -o 结果文件

编译(compilation) : 检查语言规范      输入 .i  输出 .s 文件   gcc -S(编译)  源文件 -o 输出文件 

汇编(assembly) : 将汇编指令翻译成机器指令  输入 .s文件  输出  .o文件    gcc -c(汇编) 源文件  -o 输出文件      

链接(linking) : 数据段合并,数据地址回填   与其它的机器代码和库文件汇集成一个**可执行的**二进制代码文件（无后缀）   gcc 无选项 源文件(多个) -o 输出文件(无后缀)



每个阶段不一定必须要上一阶段的文件类型, 可以直接从 .c 文件开始,只要选项对了就行    每个选项, 是包含前面几步的

快捷记法  ESc 

主要选项:

-I 头文件目录

-g 添加调试,与gdb调试 相关 支持gdb

-On 编译优化 n=0~3       嵌入式场景 很少需要优化, 改变 n

-Wall 显示所有警告信息  不加,基本只报错的  加了,会出现警告信息

-D     可以在命令行 动态 定义宏  不在 程序里定义 在外部定义, 这样就有了  条件选择       结合 #ifdef #endif   可以相当于一个开关 

```c++
编译阶段 消耗时间和系统资源最多
```



```c++
出现  collect2 和 ld  将是gcc 的 连接器 发出的错误  linker
```



## 2.静态库

。Linux下，静态库的扩展名通常是`.a`，而在Windows下则是`.lib`

头文件不能打包成静态库

```c++
ar rcs libmath.a(这里就是路径,可以和主程序不在一个路径) math.o(可以多个编到一个)
一般是将 汇编后的 .o 文件 做成静态库
```

最简单的就是

把函数文件和头文件做成静态库, 主程序调用静态库

 



## 3.动态库(共享库)

动态库 和 一般函数的地址

在程序开始运行时, 一般函数都有了地址, 但动态库还没有,  只有运行到动态库,才会加载到内存,才会有地址   -fPIC(生成与位置无关的代码)

```c++
gcc -c     .o  -fPIC
gcc -shared -o  .so  .o .o ...     静态库没有 -o 就行
```

编译时,不用像静态库, 一块编译.    需要指定库名和路径    -l    -L   -I 

```c++
 gcc .c -o ...  -l库名(去掉后缀,只要名字)    -L库路径  -I头文件目录
```



## 注意:

库名有要求   必须是  lib<库名>   不能随意命名   库名 和 lib(库名) 一定要区分 !!!!!

lib是前缀,是固定的    lib后面才是真实的库名!!!!!

养成习惯, inc: include  放头文件  -I

lib 放库文件  -l  +  -L

resource  放 函数源代码 和 .o 文件

主程序一般放在外边

------



# day1 基本命令

Linux系统： “所见皆文件”


Linux系统目录：

	bin：存放二进制可执行文件
	
	boot：存放开机启动程序
	
	dev：存放设备文件： 字符设备、块设备
	
	home：存放普通用户
	
	etc：用户信息和系统配置文件 passwd、group
	
	lib：库文件：libc.so.6
	
	root：管理员宿主目录（家目录）
	
	usr：用户资源管理目录

Linux系统文件类型： 7/8 种

	普通文件：-
	
	目录文件：d
	
	字符设备文件：c
	
	块设备文件：b
	
	软连接：l
	
	管道文件：p
	
	套接字：s
	
	未知文件。

软连接：快捷方式

	为保证软连接可以任意搬移， 创建时务必对源文件使用 绝对路径。

硬链接：

	ln file  file.hard
	
	操作系统给每一个文件赋予唯一的 inode，当有相同inode的文件存在时，彼此同步。
	
	删除时，只将硬链接计数减一。减为0时，inode 被释放。

创建用户：

	sudo adduser 新用户名		--- useradd

修改文件所属用户：

	sudo chown 新用户名 待修改文件。
	
	sudo chown wangwu a.c

删除用户：

	sudo deluser 用户名

创建用户组：

	sudo addgroup 新组名

修改文件所属用户组：

	sudo chgrp 新用户组名 待修改文件。
	
	sudo chgrp g88 a.c

删除组：

	sudo delgroup 用户组名


使用chown 一次修改所有者和所属组：

	sudo chown 所有者：所属组  待操作文件。


find命令：找文件

	-type 按文件类型搜索  d/p/s/c/b/l/ f:文件
	
	-name 按文件名搜索
	
		find ./ -name "*file*.jpg"
	
	-maxdepth 指定搜索深度。应作为第一个参数出现。
	
		find ./ -maxdepth 1 -name "*file*.jpg"


	-size 按文件大小搜索. 单位：k、M、G
	
		find /home/itcast -size +20M -size -50M
	
	-atime、mtime、ctime 天  amin、mmin、cmin 分钟。
	
	-exec：将find搜索的结果集执行某一指定命令。
	
		find /usr/ -name '*tmp*' -exec ls -ld {} \;
	
	-ok: 以交互式的方式 将find搜索的结果集执行某一指定命令


	-xargs：将find搜索的结果集执行某一指定命令。  当结果集数量过大时，可以分片映射。
	
		find /usr/ -name '*tmp*' | xargs ls -ld 
	
	-print0：
		find /usr/ -name '*tmp*' -print0 | xargs  -0 ls -ld 


grep命令：找文件内容

	grep -r 'copy' ./ -n
	
		-n参数：:显示行号
	
	ps aux | grep 'cupsd'  -- 检索进程结果集。


软件安装：

	1. 联网
	
	2. 更新软件资源列表到本地。  sudo apt-get update
	
	3. 安装 sudo apt-get install 软件名
	
	4. 卸载	sudo apt-get remove 软件名
	
	5. 使用软件包（.deb） 安装：	sudo dpkg -i 安装包名。

tar压缩：

	1. tar -zcvf 要生成的压缩包名	压缩材料。
	
		tar zcvf  test.tar.gz  file1 dir2   使用 gzip方式压缩。
	
		tar jcvf  test.tar.gz  file1 dir2   使用 bzip2方式压缩。

tar解压：

	将 压缩命令中的 c --> x
	
		tar zxvf  test.tar.gz   使用 gzip方式解压缩。
	
		tar jxvf  test.tar.gz   使用 bzip2方式解压缩。

rar压缩：

	rar a -r  压缩包名（带.rar后缀） 压缩材料。
	
		rar a -r testrar.rar	stdio.h test2.mp3

rar解压：

	unrar x 压缩包名（带.rar后缀）

zip压缩：

	zip -r 压缩包名（带.zip后缀） 压缩材料。
	
		zip -r testzip.zip dir stdio.h test2.mp3

zip解压：

	unzip 压缩包名（带.zip后缀） 
	
		unzip  testzip.zip 

# day2 vim+静动库

vim 
跳转到指定行：

	1. 88G （命令模式）
	
	2. :88  (末行模式)

跳转文件首：

	gg （命令模式）

跳转文件尾：

	G（命令模式）

自动格式化程序：

	gg=G（命令模式）

大括号对应：

	% （命令模式）

光标移至行首：

	0 （命令模式）执行结束，工作模式不变。

光标移至行尾：

	$ （命令模式）执行结束，工作模式不变。



删除单个字符：

	x （命令模式）执行结束，工作模式不变。

替换单个字符：

	将待替换的字符用光标选中， r （命令模式），再按欲替换的字符

删除一个单词：

	dw（命令模式）光标置于单词的首字母进行操作。

删除光标至行尾：

	D 或者 d$（命令模式）

删除光标至行首：

	d0 （命令模式）

删除指定区域：

	按 V （命令模式）切换为 “可视模式”，使用 hjkl挪移光标来选中待删除区域。  按 d 删除该区域数据。

删除指定1行：

	在光标所在行，按 dd （命令模式）


删除指定N行：

	在光标所待删除首行，按 Ndd （命令模式）

复制一行：

	yy

粘贴：
	p：向后、P：向前。


查找：
	1. 找 设想 内容：

		命令模式下， 按 “/” 输入欲搜索关键字，回车。使用 n 检索下一个。
	
	2. 找 看到的内容：
	
		命令模式下，将光标置于单词任意一个字符上，按 “*”/ “#” 

单行替换：

	将光标置于待替换行上， 进入末行模式，输入 :s /原数据/新数据

通篇替换：

	末行模式， :%s /原数据/新数据/g   g:不加，只替换每行首个。   sed 

指定行的替换：

	末行模式， :起始行号，终止行号s /原数据/新数据/g   g:不加，只替换每行首个。
	
		:29,35s /printf/println/g

撤销、反撤销：

	u、ctrl+r（命令模式）

分屏：
	sp：横屏分。 Ctrl+ww 切换。

	vsp：竖屏分。Ctrl+ww 切换。

跳转至 man 手册：

	将光标置于待查看函数单词上，使用 K（命令模式）跳转。 指定卷， nK

查看宏定义：

	将光标置于待查看宏定义单词上，使用 [d 查看定义语句。


在末行模式执行shell命令：

	:!命令		:! ls -l 



gcc编译：

	4步骤： 预处理、编译、汇编、连接。
	
	-I：	指定头文件所在目录位置。
	
	-c：	只做预处理、编译、汇编。得到 二进制 文件！！！
	
	-g：	编译时添加调试语句。 主要支持 gdb 调试。
	
	-Wall： 显示所有警告信息。
	
	-D：	向程序中“动态”注册宏定义。   #define NAME VALUE

### gcc自记笔记

预处理(pre-processing) : 展开宏\头文件,替换条件编译,删除注释,空行,空白    输入.c文件 生成.i文件   gcc -E(预处理) 源文件 -o 结果文件

编译(compilation) : 检查语言规范      输入 .i  输出 .s 文件   gcc -S(编译)  源文件 -o 输出文件 

汇编(assembly) : 将汇编指令翻译成机器指令  输入 .s文件  输出  .o文件    gcc -c(汇编) 源文件  -o 输出文件      

链接(linking) : 数据段合并,数据地址回填   与其它的机器代码和库文件汇集成一个**可执行的**二进制代码文件（无后缀）   gcc 无选项 源文件(多个) -o 输出文件(无后缀)



每个阶段不一定必须要上一阶段的文件类型, 可以直接从 .c 文件开始,只要选项对了就行    每个选项, 是包含前面几步的

快捷记法  ESc 

主要选项:

-I 头文件目录

-g 添加调试,与gdb调试 相关 支持gdb

-On 编译优化 n=0~3       嵌入式场景 很少需要优化, 改变 n

-Wall 显示所有警告信息  不加,基本只报错的  加了,会出现警告信息

-D     可以在命令行 动态 定义宏  不在 程序里定义 在外部定义, 这样就有了  条件选择       结合 #ifdef #endif   可以相当于一个开关 

```c++
编译阶段 消耗时间和系统资源最多
```



```c++
出现  collect2 和 ld  将是gcc 的 连接器 发出的错误  linker
```



静态库制作及使用步骤：

	1. 将 .c 生成 .o 文件
	
		gcc -c add.c -o add.o
	
	2. 使用 ar 工具制作静态库
	
		ar rcs  lib库名.a  add.o sub.o div.o
	
	3. 编译静态库到可执行文件中：
	
		gcc test.c lib库名.a -o a.out


头文件守卫：防止头文件被重复包含

	#ifndef _HEAD_H_
	
	#define _HEAD_H_
	
	......
	
	#endif


动态库制作及使用：

	1.  将 .c 生成 .o 文件， （生成与位置无关的代码 -fPIC）
	
		gcc -c add.c -o add.o -fPIC
	
	2. 使用 gcc -shared 制作动态库
	
		gcc -shared -o lib库名.so	add.o sub.o div.o
	
	3. 编译可执行程序时，指定所使用的动态库。  -l：指定库名(去掉lib前缀和.so后缀)  -L：指定库路径。
	
		gcc test.c -o a.out -lmymath -L./lib
	
	4. 运行可以执行程序 ./a.out 出错！！！！ --- ldd a.out --> "not found"
	
		error while loading shared libraries: libxxx.so: cannot open shared object file: No such file or directory
	
		原因：
			链接器：	工作于链接阶段， 工作时需要 -l 和 -L
	
			动态链接器：	工作于程序运行阶段，工作时需要提供动态库所在目录位置。
	
		解决方式：				
	
			【1】 通过环境变量：  export LD_LIBRARY_PATH=动态库路径
	
				./a.out 成功！！！  （临时生效， 终端重启环境变量失效）
	
			【2】 永久生效： 写入 终端配置文件。  .bashrc  建议使用绝对路径。
	
				1) vi ~/.bashrc
	
				2) 写入 export LD_LIBRARY_PATH=动态库路径  保存
	
				3）. .bashrc/  source .bashrc / 重启 终端  ---> 让修改后的.bashrc生效
	
				4）./a.out 成功！！！ 
	
			【3】 拷贝自定义动态库 到 /lib (标准C库所在目录位置)
	
			【4】 配置文件法
	
				1）sudo vi /etc/ld.so.conf
	
				2) 写入 动态库绝对路径  保存
	
				3）sudo ldconfig -v  使配置文件生效。
	
				4）./a.out 成功！！！--- 使用 ldd  a.out 查看

### 库 自记笔记

。Linux下，静态库的扩展名通常是`.a`，而在Windows下则是`.lib`

头文件不能打包成静态库

```c++
ar rcs libmath.a(这里就是路径,可以和主程序不在一个路径) math.o(可以多个编到一个)
一般是将 汇编后的 .o 文件 做成静态库
```

最简单的就是

把函数文件和头文件做成静态库, 主程序调用静态库



动态库 和 一般函数的地址

在程序开始运行时, 一般函数都有了地址, 但动态库还没有,  只有运行到动态库,才会加载到内存,才会有地址   -fPIC(生成与位置无关的代码)

```c++
gcc -c     .o  -fPIC
gcc -shared -o  .so  .o .o ...     静态库没有 -o 就行
```

编译时,不用像静态库, 一块编译.    需要指定库名和路径    -l    -L   -I 

```c++
 gcc .c -o ...  -l库名(去掉后缀,只要名字)    -L库路径  -I头文件目录
```

### day2 重点注意:

1.

库名有要求   必须是  lib<库名>   不能随意命名   库名 和 lib(库名) 一定要区分 !!!!!

lib是前缀,是固定的    lib后面才是真实的库名!!!!!

养成习惯, inc: include  放头文件  -I

lib 放库文件  -l  +  -L

resource  放 函数源代码 和 .o 文件

主程序一般放在外边

2.

动态库 除了编译时有  连接器     而且   还有一个运行时的  动态连接器   LD_LIBRARY_PATH  变量  具体看上面

注意  临时改变  和 永久改变

 ~/.bashrc

最简单的,就是  直接复制到系统的  lib目录即可



3.

补了 数据段合并

# day3 gdb+makefile

gdb调试工具：   大前提：程序是你自己写的。  ---逻辑错误

基础指令：
	-g：使用该参数编译可以执行文件，得到调试表。

	gdb ./a.out
	
	list： list 1  列出源码。根据源码指定 行号设置断点。
	
	b：	b 20	在20行位置设置断点。
	
	run/r:	运行程序
	
	n/next: 下一条指令（会越过函数）
	
	s/step: 下一条指令（会进入函数）
	
	p/print：p i  查看变量的值。
	
	continue：继续执行断点后续指令。
	
	finish：结束当前函数调用。 
	
	quit：退出gdb当前调试。

其他指令：

	run：使用run查找段错误出现位置。
	
	set args： 设置main函数命令行参数 （在 start、run 之前）
	
	run 字串1 字串2 ...: 设置main函数命令行参数
	
	info b: 查看断点信息表
	
	b 20 if i = 5：	设置条件断点。
	
	ptype：查看变量类型。
	
	bt：列出当前程序正存活着的栈帧。
	
	frame： 根据栈帧编号，切换栈帧。
	
	display：设置跟踪变量
	
	undisplay：取消设置跟踪变量。 使用跟踪变量的编号。


makefile： 管理项目。

	命名：makefile	 Makefile  --- make 命令
	
	1 个规则：
	
		目标：依赖条件
		（一个tab缩进）命令
	
		1. 目标的时间必须晚于依赖条件的时间，否则，更新目标
	
		2. 依赖条件如果不存在，找寻新的规则去产生依赖条件。
	
	ALL：指定 makefile 的终极目标。


	2 个函数：
	
		src = $(wildcard ./*.c): 匹配当前工作目录下的所有.c 文件。将文件名组成列表，赋值给变量 src。  src = add.c sub.c div1.c 
	
		obj = $(patsubst %.c, %.o, $(src)): 将参数3中，包含参数1的部分，替换为参数2。 obj = add.o sub.o div1.o
	
	clean:	(没有依赖)
	
		-rm -rf $(obj) a.out	“-”：作用是，删除不存在文件时，不报错。顺序执行结束。
	
	3 个自动变量：
	
		$@: 在规则的命令中，表示规则中的目标。
	
		$^: 在规则的命令中，表示所有依赖条件。
	
		$<: 在规则的命令中，表示第一个依赖条件。如果将该变量应用在模式规则中，它可将依赖条件列表中的依赖依次取出，套用模式规则。
	
	模式规则：
	
		%.o:%.c
		   gcc -c $< -o %@
	
	静态模式规则：    对于 $(obj) 变量中的每一个目标文件，如果它匹配 ./obj/%.o 的模式，那么它依赖于 ./src/%.c 文件，并且可以通过编译 .c 文件生成 .o 文件。
	
		$(obj):%.o:%.c
		   gcc -c $< -o %@	
	
	伪目标：
	
		.PHONY: clean ALL
	
	参数：
		-n：模拟执行make、make clean 命令。
	
		-f：指定文件执行 make 命令。				xxxx.mk


	作业：编写一个 makefile 可以将其所在目录下的所有独立 .c 文件编译生成同名可执行文件。

open函数：



------

# day4 文件io+文件系统

复习还可以看 xmind

## 文件io

### open函数：

	int open(char *pathname, int flags)	#include <unistd.h>
	
	参数：
		pathname: 欲打开的文件路径名
	
		flags：文件打开方式：	#include <fcntl.h>
	
			O_RDONLY|O_WRONLY|O_RDWR	O_CREAT|O_APPEND|O_TRUNC|O_EXCL|O_NONBLOCK(在非阻塞时使用 ) ....
	
	返回值：
		成功： 打开文件所得到对应的 文件描述符（整数）
	
		失败： -1， 设置errno	
	
	int open(char *pathname, int flags， mode_t mode)		123  775	
	
	参数：
		pathname: 欲打开的文件路径名
	
		flags：文件打开方式：	O_RDONLY|O_WRONLY|O_RDWR	O_CREAT|O_APPEND|O_TRUNC|O_EXCL|O_NONBLOCK ....
	
		mode: 参数3使用的前提， 参2指定了 O_CREAT。	取值8进制数，用来描述文件的 访问权限。 rwx    0664
	
			创建文件最终权限 = mode & ~umask
	
	返回值：
		成功： 打开文件所得到对应的 文件描述符（整数）
	
		失败： -1， 设置errno	

### close函数：

	int close(int fd);

### perror错误处理函数：		与 errno 相关。

	printf("xxx error: %d\n", errno);
	
	char *strerror(int errnum);
	
		printf("xxx error: %s\n", strerror(errno));
	
	void perror(const char *s);
	
		perror("open error");

头文件 stdio.h		
​	
​	

### read函数：

	ssize_t read(int fd, void *buf, size_t count);
	
	参数：
		fd：文件描述符
	
		buf：存数据的缓冲区
	
		count：缓冲区大小
	
	返回值：
	
		0：读到文件末尾。
	
		成功；	> 0 读到的字节数。
	
		失败：	-1， 设置 errno
	
		-1： 并且 errno = EAGIN 或 EWOULDBLOCK, 说明不是read失败，而是read在以非阻塞方式读一个设备文件（网络文件），并且文件无数据。

### write函数：

	ssize_t write(int fd, const void *buf, size_t count);
	
	参数：
		fd：文件描述符
	
		buf：待写出数据的缓冲区
	
		count：数据大小
	
	返回值：
	
		成功；	写入的字节数。
	
		失败：	-1， 设置 errno

### 文件描述符和PCB：

PCB: 进程控制块,  里面有一部分是 文件描述符表

数组的下标

process control block

文件描述符 是指向 文件结构体的 指针

struct file

	PCB进程控制块：本质 结构体。
	
	成员：文件描述符表 : 本质 指针
	
	文件描述符：0/1/2/3/4。。。。/1023     表中可用的最小的。  ulimit -a 可以看信息   想要改变, 需要修改后重新编译内核(网络编程里)
	
	0 - STDIN_FILENO
	
	1 - STDOUT_FILENO
	
	2 - STDERR_FILENO

### 阻塞、非阻塞：  是文件的属性, 但不是常规文件, 是设备文件、网络文件的属性。

不是 read write 的问题

	产生阻塞的场景。 读设备文件。读网络文件。（读常规文件无阻塞概念。）
	
	/dev/tty -- 终端文件。
	
	open("/dev/tty", O_RDWR|O_NONBLOCK)	--- 设置 /dev/tty 非阻塞状态。(默认为阻塞状态)


### fcntl：

想要改变 一个已经打开文件的 打开属性, 需要关闭重新打开, 但 fcntl 有 不用重新打开的 参数

​	int (int fd, int cmd, ...)

	int flgs = fcntl(fd,  F_GETFL); //返回int型   他是一个位图,
	
	flgs |= O_NONBLOCK
	
	fcntl(fd,  F_SETFL, flgs);
	
	获取文件状态： F_GETFL
	
	设置文件状态： F_SETFL

`flags` 通常是按位或（`|=`）的方式添加新的标志，或按位与（`&=`）的方式清除已有标志

正因为是位图,  这个就很好解释了

清楚标志,需要 对标志 取反后 再按位与

至于 flags 的具体值, 不用细究, 值很大



### lseek函数：

	off_t lseek(int fd, off_t offset, int whence);
	
	参数：
		fd：文件描述符
	
		offset： 偏移量   --- 相对于 whence 的偏移量
	
		whence：起始偏移位置： SEEK_SET(起始位置)/SEEK_CUR(偏移位置)/SEEK_END(末尾位置)
	
	返回值：
	
		成功：较起始位置偏移量----------一定是较起始位置
	
		失败：-1 errno
	
	应用场景：	
		1. 文件的“读”、“写”使用同一偏移位置。
		--- 读和写 共享 偏移量,  比如 先写, 写完后, 偏移量在末尾, 然后再的话, 会从末尾开始读 
	
		2. 使用lseek获取文件大小
	
		3. 使用lseek拓展文件大小：要想使文件大小真正拓展，必须引起IO操作。
	
			使用 truncate 函数，直接拓展文件。	int ret = truncate("dict.cp", 250);

### iocntl(linux c一站式)

`ioctl`用于向设备发控制和配置命令，有些命令也需要读写一些数据，但这些数据是不能用`read`/`write`读写的，称为Out-of-band数据。

`read`/`write`读写的数据是in-band数据，是I/O操作的主体，而`ioctl`命令传送的是控制信息，其中的数据是辅助的数据。

**Out-of-band 数据**（OOB 数据）是指在网络通信中，不通过常规数据流（即不在主数据通道内）传输的控制信息或特殊数据。与常规数据（in-band 数据）不同，Out-of-band 数据通常用于传输重要的控制信息、错误信号、或紧急数据，以确保快速处理或响应。

### 传入参数：

	1. 指针作为函数参数。
	
	2. 同常有const关键字修饰。
	
	3. 指针指向有效区域， 在函数内部做读操作。

### 传出参数：

	1. 指针作为函数参数。
	
	2. 在函数调用之前，指针指向的空间可以无意义，但必须有效。
	
	3. 在函数内部，做写操作。
	
	4。函数调用结束后，充当函数返回值。

### 传入传出参数：

	1. 指针作为函数参数。
	
	2. 在函数调用之前，指针指向的空间有实际意义。
	
	3. 在函数内部，先做读操作，后做写操作。
	
	4. 函数调用结束后，充当函数返回值。

### 稍微灰色难懂

```c++
#include <stdio.h>

void add(int x, int y) {   // 传入函数：仅用来接受输入参数并进行操作
    printf("Sum: %d\n", x + y);
}

void square(int x, int *result) {  // 传出参数：通过指针修改外部数据
    *result = x * x;
}

void updateValue(int *x) {   // 传入传出参数：通过指针既接受输入也修改数据
    *x = *x + 1;
}

int main() {
    int a = 5, b = 3, result;
    add(a, b);  // 调用传入函数

    square(a, &result);  // 调用传出函数
    printf("Square: %d\n", result);

    updateValue(&a);  // 调用传入传出函数
    printf("Updated Value: %d\n", a);

    return 0;
}

```

 

```c++
void aaa();

 int aaa(int *p, struct stat *p2, strcut student *p3);   //无指针时, 只能返回一个数, 有指针时, 将有更多的数 可以利用

 bbb()
 {
	aaa();
 }
```



## 文件系统

### stat/lstat 函数： 符号穿透的区别

	int stat(const char *path, struct stat *buf);
	
	参数：
		path： 文件路径
	
		buf：（传出参数） 存放文件属性。
	
	返回值：
	
		成功： 0
	
		失败： -1 errno
	
	获取文件大小： buf.st_size
	
	获取文件类型： buf.st_mode
	
	获取文件权限： buf.st_mode
	
	符号穿透：stat会。lstat不会。

### truncate

```c++
truncate() 函数是用于调整文件大小的系统调用，它可以将文件截断为指定的大小。如果文件的当前大小大于指定大小，那么多余的部分会被丢弃；如果文件的当前大小小于指定大小，则会根据需要进行扩展，通常填充为零。
    
       int truncate(const char *path, off_t length);	成功：0；失败：-1设置errno为相应值
```



### link/unlink:

	int link(const char *oldpath,  const char *newpath);	成功：0；失败：-1设置errno为相应值    ---- 硬链接
	int unlink(const char *pathname);	成功：0；失败：-1设置errno为相应值    让文件具备了 被删除的条件
	
	隐式回收。---- 不能依赖这个特性
	也可以理解  malloc 和 free
	
	symlink    --- 符号链接 symbolic link  或者 软链接 soft link
	int symlink(const char *oldpath, const char *newpath);	成功：0；失败：-1设置errno为相应值
	
	readlink 
	ssize_t readlink(const char *path, char *buf, size_t bufsiz);	成功：返回实际读到的字节数；失败：-1设置errno为相应值。
	
	rename  --- 比 mv 更底层, 比 unlink 更
	 int rename(const char *oldpath, const char *newpath); 成功：0；失败：-1设置errno为相应值


​	 



### 目录操作函数：

```c++
getcwd  --- 命令行的 pwd命令   
		char *getcwd(char *buf, size_t size);	成功：buf中保存当前进程工作目录位置。失败返回NULL。
chdir  --- 改变工作目录  cd命令
    		int chdir(const char *path); 	成功：0；失败：-1设置errno为相应值
    
```

### 文件目录权限:

```c++
注意: DIR *  ,  RETURN VALUE
       The opendir() and fdopendir() functions return a pointer to the directory stream.  On error, NULL is returned, and errno is set appropriately.
看 man 3 opendir
```



	DIR * opendir(char *name);      已经是标准库函数了 man 3  不是fd
	头文件 dirent.h     dentry   都是 directory entry 单词
	#include <sys/types.h>
	#include <dirent.h>
	
	int closedir(DIR *dp);
	#include <sys/types.h>
	#include <dirent.h>
	
	​	struct dirent *readdir(DIR * dp);
	​	
			struct dirent {
				ino_t d_ino; (inode)
			....  (重点记两个)
			char dname[256];  (dir name 静态的,有限制) 
		}
	#include <dirent.h>
	
	写目录函数 没有, 因为 写目录, 就是创建目录, mkdir命令


​	


​	

​	

------

## 文件io 补充与实例

### 1.int argc int *argv[]

在C或C++程序中，`int argc, char *argv[]`是用来接收命令行参数的，它们通常在程序的`main`函数定义中使用。这两个参数提供了执行程序时传递给程序的命令行输入的访问方式。

**`argc`**（Argument Count）: 这个变量表示传递给程序的命令行参数的数量，包括程序本身的名称。所以，如果程序名是`program`并且调用时使用了两个参数（比如`program arg1 arg2`），那么`argc`的值将是3。

**`argv`**（Argument Vector）: 这是一个指针数组，每个元素指向一个以null结尾的字符串，这些字符串代表了传递给程序的每一个命令行参数。`argv[0]`通常是程序的名称，`argv[1]`是第一个参数，依此类推，直到`argv[argc-1]`。`argv[argc]`是一个空指针，标志着数组的结束。



### 2.极其简单的makefile

`  1 src = $(wildcard *.c)                                                                                                                               2 target = $(patsubst %.c, %, $(src))                                                                                                                   3                                                                                                                                                     4 ALL: $(target)                                                                                                                                      5                                                                                                                                                     6 %:%.c                                                                                                                                               7     gcc $< -o $@                                                                                                                                    8                                                                                                                                                     9 clean :                                                                                                                                            10     -rm -f $(target)                                                                                                                               11                                                                                                                                                    12 .PHONY: clean ALL  `



这个适用于 基本所有场景

注意:

make 单个文件时, make .c的文件名   不能加后缀, 

**不需要 `.c` 后缀**：
因为规则已经定义了目标文件与源文件的映射关系（`%` 与 `%.c`），只需要输入目标名称即可。

### 3.open mode权限快速法

umask 022    ~umask 755   

mode 664    则 最终 就是  755 与 664 按位与  

写成  rwx r-x r-x   &   rw- rw- r--    =   rw- r-- r--   得到644    这个形式, 直接按位对比  

### 4.open close read write perror实例:实现cp

有open 就得有close 

```c++
#include <stdio.h>  // perror
#include <fcntl.h>  // open 
#include <unistd.h> //read, write, close
#include <errno.h> // errno 值
#include <stdlib.h>  // exit(1)头文件

int main(int argc, char *argv[])
{
    int fd1=open(argv[1], O_RDONLY);  //读出源数据
    if(fd1 == -1)   // io函数 错误会返回-1
    {
        perror("open argv[1] error");
        exit(1);  // 没这个的话,不会自动退出
    }


    int fd2=open(argv[2], O_WRONLY | O_CREAT | O_TRUNC, 0664);   // 打开目标文件,写入模式,创建新文件,设置权限, 若已经有文件, 截断数据0字符

    if(fd2 == -1)   // io函数 错误会返回-1
    {
        perror("open argv[2] error");

        exit(1);  // 没这个的话,不会自动退出
    }
    int n = 0;
    char buf[1024];  // 设置缓冲区
    while ((n = read(fd1, buf, 1024)) != 0)   // read 读到末尾,返回0
    {
        if(n < 0)   // io函数 错误会返回-1
        {
            perror("read  error");
            break;  // 可以直接exit, 也可以退出循环,后面就是 close
        }
        write( fd2, buf, n);
    }


    close(fd1);
    close(fd2);

    return 0;

}
```



buf 是用户程序的缓冲区

实际 read 无用户级缓冲区

### 5.perror与errno.h

**`errno` 的作用**：

- 当一个系统调用或标准库函数失败时（返回值通常为 `-1` 或 `NULL`），它会设置全局变量 `errno` 为一个特定的错误代码。
- 不同的错误代码对应不同的错误类型，例如 `ENOENT` 表示文件不存在，`EACCES` 表示权限被拒绝等。

**`perror` 的作用**：

- `perror` 会读取当前的 `errno` 值，并查找该值对应的错误描述（通常由操作系统提供）。

- 它会打印一条格式为：

  ```
  
  <用户提供的字符串>: <系统定义的错误描述>
  ```
  
- 如果用户提供的字符串为 `NULL`，则只打印错误描述



### 6.read和fputc函数

**`read` 的特点**

- **直接性**：`read` 是一个系统调用，直接从文件描述符读取数据，没有额外的缓冲区管理。

- **批量处理**：`read` 通常用于一次性读取大块数据（如 1024 字节），可以减少系统调用的次数。

- 缺点

  ：

  - 每次调用 `read` 都需要陷入内核（上下文切换），开销较高。
  - 不适合逐字符操作，逐字符调用 `read` 会非常慢。

 **`fputc` 的特点**

- **缓冲机制**：`fputc` 是标准库函数，使用用户空间的缓冲区，可以将多次小写操作（逐字符）合并成一次系统调用，减少性能开销。

- **适合逐字符写入**：因为 `fputc` 自动处理缓冲区，在写入多个字符时性能相对较好。

- 缺点

  ：

  - 在单次调用上，`fputc` 较 `read` 更慢，因为它需要额外的标准库缓冲管理。
  - 不适合大块数据的处理。

**批量处理场景（`read` 更快）**： 如果你需要读取大块数据（如 1 KB 或更大），`read` 是更快的选择，因为它直接调用内核接口，不依赖缓冲机制。

**逐字符处理场景（`fputc` 更快）**： 如果需要逐字符写入文件，`fputc` 的缓冲机制能减少系统调用次数，性能比逐字符使用 `read` 配合写入要高。



### 7.strace命令   

shell中使用strace命令跟踪程序执行，查看调用的系统函数。



### 8.阻塞实例1

```c++
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>


int main()
{
    char buf[10];
    int n;

    n = read(STDIN_FILENO, buf, 10);  // STDIN_FILENO = 0, 可以使用0
    if (n < 0)
    {
        perror("read stdin error");
        exit(1);
    }
    write(STDOUT_FILENO, buf, n);
    return 0;

}
```

gcc 后, 执行程序, 会阻塞等待, 读取键盘输入, 并输出 输入



### 9.阻塞实例2

读终端肯定是要 打开文件的

非阻塞, 

```c++
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <string.h>

int main(int argc, char *argv[])
{
    int fd,n;
    char buf[10];

    fd = open("/dev/tty", O_RDONLY | O_NONBLOCK);

    if (fd < 0)
    {
            perror("open error");
            exit(1);
    }

tryagain:
    n = read(fd, buf, 10);
    if (n < 0)
    {
        if(errno != EAGAIN)   // 注意 是errno的值,不是 n 的值
        {
            perror("read error");
            exit(1);
        }
        else{
            write(STDOUT_FILENO, "try again\n", strlen("try again\n"));
            sleep(2);
            goto tryagain;
        }
    }

    write(STDOUT_FILENO, buf, n);
    close(fd);

    return 0;
}
```



### 10.fcntl 改文件状态实例

```c++
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <string.h>

int main(int argc, char *argv[])
{
    int flags,n;
    char buf[10];

    flags = fcntl(STDIN_FILENO, F_GETFL); // 获取状态, fcntl 返回int型   是位图
    printf("flags=%d\n", flags);
    flags |= O_NONBLOCK;  
    flags = fcntl(STDIN_FILENO, F_SETFL, flags);  // 重新设置状态
    printf("flags=%d\n", flags);
    if (flags == -1)
    {
            perror("fcntl error");
            exit(1);
    }

tryagain:
    n = read(STDIN_FILENO, buf, 10);
    if (n < 0)
    {
        if(errno != EAGAIN)// 注意 是errno的值,不是 n 的值
        {
            perror("read error");
            exit(1);
        }
        else{
            write(STDOUT_FILENO, "try again\n", strlen("try again\n"));
            sleep(2);
            goto tryagain;
        }
    }
    write(STDOUT_FILENO, buf, n);

    return 0;
}
```



### 11.位图

位图（Bitmap）是一种使用位（bit）作为基本存储单位的结构，用于高效地表示、存储和操作大量布尔状态（如存在/不存在、开/关）。位图在内存管理、集合操作、图像处理等领域中被广泛使用

位图的每一位（bit）可以表示一个二进制状态：

- 0 表示 "否" 或 "不存在"；
- 1 表示 "是" 或 "存在"。

多个位被组织成连续的存储空间。通常以字节（8 位）为单位进行存储和操作。



很好理解

加入 一个 8个 二进制位   0000 0000

0000 0001 代表一个状态

0000 0010 代表一个状态

0000 0100 代表一个状态

...

这样, 还可以混合, 

**位图的优点**

1. **节省内存**： 使用位而不是字节存储数据，节省大量空间。例如：
   - 如果需要表示 1000 个布尔状态，用位图只需 1000/8 = 125 字节，而用整型数组可能需要 4000 字节（假设每个整型占 4 字节）。
2. **操作高效**：
   - 按位操作（如 AND、OR、XOR）可以在硬件层面并行处理多个位。
   - 查找、插入、删除等操作的时间复杂度为 O(1)。



### 12.lseek 实例-1

读写 问题

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>


int main(int argc, char *argv[])
{
    int fd,n;
    char ch;
    char msg[] = "It is a lseek test!\n";

    fd = open("lseek.txt", O_RDWR | O_CREAT, 0644);

    if (fd < 0)
    {
        perror("open error");
        close(fd);
        exit(1);
    }

    write(fd, msg, strlen(msg) ); // 这里的写导致偏移量在末尾, 需要 lseek 矫正, 才能读到后续

    off_t new_offset = lseek(fd, 0, SEEK_SET); // 返回off_t 类型,用于检测是否出错
    if (new_offset < 0)
    {
        perror("lseek error");
        close(fd);
        exit(1);
    }


    while((n = read (fd, &ch, 1))) // 这次使用单个字符读取, 因此需要引用
    {
        if (n < 0)  // 不是设备或者网络文件, 不用考虑阻塞非阻塞
        {
            perror("read error");
            close(fd);
            exit(1);
        }
        else{
            write(1, &ch, n);
        }
    }


    close(fd);
    return 0;
}

```

### 13.lseek 实例-2

读取文件大小

展示了 两种 返回类型的 使用

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>


int main(int argc, char *argv[])
{
    int fd,n;
    char ch;
    char msg[] = "It is a lseek test!\n";

    fd = open(argv[1], O_RDONLY);

    if (fd < 0)
    {
        perror("open error");
        close(fd);
        exit(1);
    }

  //  off_t new_offset = lseek(fd, 0, SEEK_END); // 返回off_t 类型,用于检测是否出错, off_t 是long int型
    int new_offset = lseek(fd, 0, SEEK_END);  
    if (new_offset < 0)
    {
        perror("lseek error");
        close(fd);
        exit(1);
    }
//    printf("size = %ld", new_offset); // %d 不能 用于 off_t类型
   printf("size = %d", new_offset);


    close(fd);
    return 0;
}
```

### 14.lssek 实例-3

拓展文件大小

但是 此程序得到的 是拓展的大小

ls -l  得到的还是原来的  大小

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>


int main(int argc, char *argv[])
{
    int fd,n;
    char ch;
    char msg[] = "It is a lseek test!\n";

    fd = open(argv[1], O_RDONLY);

    if (fd < 0)
    {
        perror("open error");
        close(fd);
        exit(1);
    }

  //  off_t new_offset = lseek(fd, 0, SEEK_END); // 返回off_t 类型,用于检测是否出错, off_t 是long int型
    int new_offset = lseek(fd, 80, SEEK_END);
    if (new_offset < 0)
    {
        perror("lseek error");
        close(fd);
        exit(1);
    }
//    printf("size = %ld", new_offset); // %d 不能 用于 off_t类型
   printf("size = %d", new_offset);


    close(fd);
    return 0;
}
```

### 15.lseek 实例-4

拓展文件大小

必须 io 操作, 才会 ls -l 得到拓展

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>


int main(int argc, char *argv[])
{
    int fd,n;
    char ch;
    char msg[] = "It is a lseek test!\n";

    fd = open(argv[1], O_RDWR); // write需要修改权限, 仅lseek 拓展,只读也可以

    if (fd < 0)
    {
        perror("open error");
        close(fd);
        exit(1);
    }

  //  off_t new_offset = lseek(fd, 0, SEEK_END); // 返回off_t 类型,用于检测是否出错, off_t 是long int型
    int new_offset = lseek(fd, 79, SEEK_END);
    if (new_offset < 0)
    {
        perror("lseek error");
        close(fd);
        exit(1);
    }
//    printf("size = %ld", new_offset); // %d 不能 用于 off_t类型
   printf("size = %d", new_offset);
   write(fd, "\0", 1); // 只在末尾 写入一个, 不能用单引号, 会被转换成 整型, ascii码
   new_offset = lseek(fd, 0, SEEK_END);
   printf("size = %d", new_offset);

    close(fd);
    return 0;
}
```

### 16.按不同进制查看文件

od -tcx filename 查看文件的16进制表示形式

od -tcd filename 查看文件的10进制表示形式    



### 17.函数原型-const

文件带有 const 的函数原型, 必须存在, 是只读, 不能创建



### 18.truncate 拓展文件

int truncate(const char *path, off_t length);

返回 0, 表示成功

这个更快,更方便, 无需自己io操作

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>


int main(int argc, char *argv[])
{
    int ret = truncate("trunc.txt", 250);
    printf("ret = %d", ret);
    return 0;
}
```

------

## 文件系统 补充与实例

### 1.inode

**Inode**（索引节点）是类 Unix 文件系统（如 ext4、NTFS 等）中用于存储文件的元数据（metadata）结构。每个文件和目录都有一个唯一的 inode，它包含有关该文件的详细信息，

但不包括文件的名称和数据内容。文件的名称和实际数据内容保存在其他地方。

文件名单独存储, 根据文件名得到 inode 编号, 从inode里 得到 盘符, 这样就找到了 文件内容

**文件名和 inode 的关系**

在类 Unix 系统中，文件名和 inode 是分开存储的：

- **文件名** 存储在目录中。目录实际上是一个特殊的文件，其中存储了文件名和对应的 inode 编号的映射。
- **inode** 存储了文件的元数据（例如，文件的权限、大小、时间戳、文件类型等），但不包含文件名和文件内容。

**从文件名得到 inode 编号**

当你通过文件名访问文件时，系统会查找相应的目录条目，目录条目中包含文件名和它对应的 inode 编号。具体过程如下：

- 用户请求访问某个文件（例如，`/home/user/file.txt`）。
- 操作系统查找 `/home/user/` 目录中的条目，找到 `file.txt` 这个文件名对应的 inode 编号。
- 系统根据 inode 编号来访问文件的元数据和内容。

**从 inode 得到文件的内容**

一旦获得了 inode 编号，操作系统可以执行以下操作：

- **inode** 中包含文件的元数据以及指向实际文件内容的数据块的指针（这些指针指向磁盘上的数据块）。
- 操作系统根据这些指针找到文件的数据块位置，进而访问文件内容。

### 2.dentry

**dentry**（目录项）是类 Unix 文件系统中的一种数据结构，用于表示文件系统中目录中的文件或子目录的条目。它是一个重要的概念，特别是在文件路径解析和文件系统的工作方式上，负责连接文件路径和文件系统中的实际 inode。

**dentry 的作用:**

1. **路径解析**：`dentry` 负责将文件路径（如 `/home/user/file.txt`）中的每个目录部分与文件系统中的 inode 进行映射。它帮助文件系统实现路径解析的过程，即根据路径找到文件或目录对应的 inode。
2. **缓存机制**：dentry 提供了一个缓存机制，用于存储文件系统中目录项的映射关系。当操作系统需要访问一个路径时，它会先检查是否已经缓存了这个路径的对应 `dentry`，从而提高文件路径解析的效率。
3. **目录结构表示**：每个 `dentry` 对应着一个文件路径中的特定目录项（如一个文件或目录），并包含该目录项的相关信息，包括它与 inode 的映射关系。

### 3.dentry和inode

dentry和 inode

 紧密相关，但它们的作用不同。

- **dentry** 存储路径解析所需的信息，即文件名与对应 inode 的映射关系，帮助快速查找和解析路径。
- **inode** 存储文件的元数据和数据块的指针，代表文件的实际数据。



硬链接,实际就是不同的文件名,相同的inode, 删除硬链接, 计数减1, 实际就是删除 dentry, 当全部 dentry 被删除, 将没有目录项映射inode, 那么inode映射的这块磁盘空间就是 没人用的, 但是数据仍在, 因此 格式化 并未删除数据, 需要覆盖, 才能 真正意义上的 删除.



### 4.stat 实例-1

读取 文件大小, 并使用 宏函数, 解析 mode_t 参数

但是 当 测试软链接时, 并不显示是 link, 还是目录

因为 stat 自带  符号穿透

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <sys/stat.h>


int main(int argc, char *argv[])
{
    struct stat stat_1;

    int ret = stat(argv[1], &stat_1);
    if(ret < 0)
    {
        perror("stat error");
        exit(1);
    }
    if(S_ISREG(stat_1.st_mode))
    {
        printf("is regular file!\n");
    }
    else if(S_ISLNK(stat_1.st_mode))
    {
        printf("is link!\n");
    }
    else if(S_ISDIR(stat_1.st_mode))
    {
        printf("is directory!\n");
    }
    printf("file size = %ld", stat_1.st_size);

    return 0;
}

```

### 5.lstat 实例-1

不带符号穿透, 可识别 软链接

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <sys/stat.h>


int main(int argc, char *argv[])
{
    struct stat stat_1;

    int ret = stat(argv[1], &stat_1);
    if(ret < 0)
    {
        perror("stat error");
        exit(1);
    }
    if(S_ISREG(stat_1.st_mode))
    {
        printf("is regular file!\n");
    }
    else if(S_ISLNK(stat_1.st_mode))
    {
        printf("is link!\n");
    }
    else if(S_ISDIR(stat_1.st_mode))
    {
        printf("is directory!\n");
    }
    printf("file size = %ld", stat_1.st_size);

    return 0;
}

```



### 6.st_mode

里面有很多值, 在手册  man inode 里 有详细使用

S_IS..
S_IFMT & st_mode0   ---   位图      不止有 文件类型,还有更多别的信息, 权限,uid,等等

共两使用方式

### 7.穿透符号链接

cat , vim 会穿透符号链接

ls -l 不穿透

ls -lL 则是穿透



### 8.特殊权限位,课件有,了解一下,未讲

**UID** 是用户的实际身份，用于标识用户本身。

**EUID** 是进程的有效身份，用于控制进程权限。

多数情况下，EID和UID相同。但是，当文件的setID被设置后两个ID则有可能不一样。



在 Linux 系统中，**特殊权限位**指的是文件或目录的特定权限，除了常规的读、写、执行权限之外，还有以下三种特殊权限：

1. **SUID (Set User ID) 位**

- **作用**： 当一个可执行文件设置了 SUID 位，普通用户执行该文件时，会以文件所有者的权限运行，而不是执行者本身的权限。
- **使用场景**： 用于需要临时获得更高权限的程序。例如，`passwd` 命令需要修改 `/etc/shadow` 文件（只有 root 用户有权限）。
- 表示方法：
  - 在权限位中，所有者的执行权限 `x` 被替换为 `s`。
  - 如：`-rwsr-xr-x` 表示该文件设置了 SUID。

`chmod u+s 文件名`
`chmod u-s 文件名`



2. **SGID (Set Group ID) 位**

- 作用

  ：

  - 对文件：类似 SUID，但作用在文件的组上，执行者会以文件所属组的权限运行程序。
  - 对目录：新创建的文件或目录将继承父目录的组，而不是默认的用户主组。

- 使用场景

  ：

  - 文件：与 SUID 类似，但作用在组权限上。
  - 目录：便于协作开发，确保共享目录中的文件拥有统一的组。

- 表示方法

  ：

  - 在权限位中，组的执行权限 `x` 被替换为 `s`。
  - 如：`-rwxr-sr-x` 表示该文件设置了 SGID。

chmod g+s 文件名

chmod g-s 文件名



3. **Sticky 位**

- **作用**： Sticky 位用于目录，表示只有文件的所有者或目录的所有者可以删除或移动目录内的文件，其他用户即使有写权限也不能删除。

- **使用场景**： 通常用于共享目录，例如 `/tmp`，防止用户删除其他用户的文件。

- 表示方法

  ：

  - 在权限位中，其他用户的执行权限 `x` 被替换为 `t`。
  - 如：`drwxrwxrwt` 表示设置了 Sticky 位。

chmod +t 目录名

chmod -t 目录名



### 9.link 实例-1

实现 mv    也算是 重命名

rename 也可以实现

两个的 底层原理 不同, 但都是 一行 即可

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>

int main(int argc, char *argv[])
{

    link(argv[1], argv[2]);

    unlink(argv[1]);
    return 0;
}
```

执行:    ./link-mv test-1 test-2



### 10.unlink 实例2

用于理解: 什么时候释放, 出现错误 会不会释放, unlink后,写到了哪里, 没有close(fd), 但是隐式回收了

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>

int main(int argc, char *argv[])
{

    int fd,ret;
    char *p = "it's a test!\n";
    
    fd = open("test-unlink.txt", O_RDWR | O_CREAT | O_TRUNC);
    if(fd < 0)
    {
		perror("open error");
        exit(1);
    }
    
    ret = write(fd, p, strlen(p));
    if(ret < 0)
    {
        perror("write erroe");
        exit(1);
    }
    printf("write success!\n");
    
    
    
    getchar();   // 在等待时, 还是可以看到 该文件内容的
    
    ret = unlink("test-unlink.txt");  // unlink 不能使用fd 文件描述符
    if(ret < 0)
    {
        perror("unlink error");
    }
    
    close(fd);
    
    return 0;
}
```

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>

int main(int argc, char *argv[])
{

    int fd,ret;
    char *p = "it's a test!\n";
    
    fd = open("test-unlink.txt", O_RDWR | O_CREAT | O_TRUNC);
    if(fd < 0)
    {
		perror("open error");
        exit(1);
    }
    
    ret = write(fd, p, strlen(p));
    if(ret < 0)
    {
        perror("write erroe");
        exit(1);
    }
    printf("write success!\n");
        
    ret = unlink("test-unlink.txt");  // unlink 不能使用fd 文件描述符
    if(ret < 0)
    {
        perror("unlink error");
    }
    
    
    getchar();   // 在等待时, 已经无法看到文件内容

    
    close(fd);
    
    return 0;
}
```



重点:

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>

int main(int argc, char *argv[])
{

    int fd,ret;
    char *p = "it's a test!\n";
    
    fd = open("test-unlink.txt", O_RDWR | O_CREAT | O_TRUNC);
    if(fd < 0)
    {
		perror("open error");
        exit(1);
    }
    
    ret = unlink("test-unlink.txt");  // unlink 不能使用fd 文件描述符
    if(ret < 0)
    {
        perror("unlink error");
    }
    
    ret = write(fd, p, strlen(p));   // 并没有报错, 因为fd 仍然可用 文件并未完全关闭, unlink 没有立即释放
    if(ret < 0)
    {
        perror("write erroe");
        exit(1);
    }
    printf("write success!\n");
    char buf[10];
    lseek(fd, 0, SEEK_SET);
    int n ;
    while(n = read(fd, buf, 10))   //仍然可以读到内容, 但是文件名没了, cat 文件名看不到的
    {
            write(1, buf, n);
    }
    
    getchar();   // 在等待时, 已经无法看到文件内容

    
    close(fd);
    
    return 0;
}
```

​	`unlink` 删除了文件 `test-unlink.txt`，但此时文件描述符 `fd` 仍然有效。`unlink` 只是从文件系统中移除了文件名，并没有立刻释放文件内容。在文件被关闭之前，数据依然可以通过文件描述符访问。



```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>

int main(int argc, char *argv[])
{

    int fd,ret;
    char *p = "it's a test!\n";
    
    fd = open("test-unlink.txt", O_RDWR | O_CREAT | O_TRUNC);
    if(fd < 0)
    {
		perror("open error");
        exit(1);
    }
    
	p[3] = 'H';   //出现段错误, 此时 文件会存在, 程序退出
    
    ret = write(fd, p, strlen(p));   
    if(ret < 0)
    {
        perror("write erroe");
        exit(1);
    }
    printf("write success!\n");
        
	ret = unlink("test-unlink.txt");  // unlink 不能使用fd 文件描述符
    if(ret < 0)
    {
        perror("unlink error");
    }
    
    
    getchar();   

    
    close(fd);
    
    return 0;
}
```

但是, 我们想要 仅在程序运行时文件存在, 程序不管因为什么方式退出, 都要销毁文件	

所以,一打开文件, 就进行 unlink , 这样的话, 后续写入 并不会报错, 因为写到 缓冲区

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>

int main(int argc, char *argv[])
{

    int fd,ret;
    char *p = "it's a test!\n";
    
    fd = open("test-unlink.txt", O_RDWR | O_CREAT | O_TRUNC);
    if(fd < 0)
    {
		perror("open error");
        exit(1);
    }
    
    ret = unlink("test-unlink.txt");  // unlink 不能使用fd 文件描述符
    if(ret < 0)
    {
        perror("unlink error");
    }
    
    ret = write(fd, p, strlen(p));   
    if(ret < 0)
    {
        perror("write erroe");
        exit(1);
    }
    printf("write success!\n");
        

    
    
    getchar();   // 在等待时, 已经无法看到文件内容
	p[3] = 'H';   //出现段错误, 此时 文件不会存在, 程序退出
    
    close(fd);   // 这个并不会执行, 但是 fd仍然被关闭了, 这就是隐式回收, 程序关闭, 会自动会收, 但是不要依赖这个
    
    return 0;
}
```



### 11.opendir, closedir, readdir 实例-1

实现 ls 命令  

ls : 查看目录里面的东西

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <dirent.h>

int main(int argc, char *argv[])
{
    DIR *dp;
    struct dirent *sdp;
    dp = opendir(argv[1]);  // man 3 opendir
    if(dp == NULL)
    {
        perror("opendir error!");
        exit(1);
    }
    while((sdp = readdir(dp)) != NULL)   // man 3 readdir  readdir每读一次,会自动向后移动
    {
        if(strcmp(sdp->d_name,".") !=0 && strcmp(sdp->d_name,"..") !=0)   // 注意字符串比较, 不要直接等于或者不等于, 那样比较的是 是不是同一个内存地址,因为他是指针, 要用函数 strcmp, 比较字符串整体
        {
                printf("dir name = %s\t", sdp->d_name);
        }

    }
    printf("\n");
    closedir(dp);   // 特别注意 close 和 closedir 用错会报错
    return 0;
}
```

未排序的

### 12.strcmp

`strcmp` 函数用于比较两个字符串，并返回一个整数值，指示它们的相对顺序

**返回值为 `0`**：表示 `str1` 和 `str2` 相等。

**返回值小于 `0`**：表示 `str1` 小于 `str2`（按照字典顺序进行比较）。

**返回值大于 `0`**：表示 `str1` 大于 `str2`（按照字典顺序进行比较）。

------

# day5 递归遍历目录

​	
​	./a.out ls.c  /home/itcast/28_Linux  ./abc/
​	
​			/home/itcast/28_Linux/testdir/

### 递归遍历目录：ls-R.c

	1. 判断命令行参数，获取用户要查询的目录名。	int argc, char *argv[1]
	
		argc == 1  --> ./
	
	2. 判断用户指定的是否是目录。 stat  S_ISDIR(); --> 封装函数 isFile() {   }
	
	3. 读目录： read_dir() { 
	
		opendir（dir）
	
		while （readdir（））{
	
			普通文件，直接打印
	
			目录：
				拼接目录访问绝对路径。sprintf(path, "%s/%s", dir, d_name) 
	
				递归调用自己。--》 opendir（path） readdir closedir
		}
	
		closedir（）
	
		}
		read_dir() --> isFile() ---> read_dir()

### dup 和 dup2：(重点) duplicate(复制,重复)

重定向  (命令行 > , 追加 >>)

	unistd.h
	
	int dup(int oldfd);		文件描述符复制。
	
		oldfd: 已有文件描述符
	
		返回：新文件描述符。
	
	int dup2(int oldfd, int newfd); 文件描述符复制。重定向。
	dup2  === dupto  

```c++
本质上, 连个 都是复制文件描述符, 新旧文件描述符 都指向同一个 内容,，dup 和 dup2 复制的文件描述符会指向同一块磁盘空间。


dup 是自动选择 文件描述符, 不能使用 被占用的 fd
dup2 是自定义, 可以使用被占用的fd, 会关闭被占用的fd, 再复制

dup2注意:
如果 oldfd 和 newfd 是相同的，则函数什么也不做，直接返回。
可以将一个描述符复制到指定的值。
如果 newfd 已经被使用，会在复制前先关闭。
```

### fcntl 函数实现 dup：

	int fcntl(int fd, int cmd, ....)
	
	cmd: F_DUPFD   --- DUPFD ===dup fd
	
	参3:  	被占用的，返回最小可用的。
	
		未被占用的， 返回=该值的文件描述符。

===================================================================================================

## day5 补充与实例

### 1.ls -R实例实现

综合运用 stat, opendir, readdir,closedir, 递归

实现递归遍历目录

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <dirent.h>
#include <sys/stat.h>

void read_dir(char *dir);
void isFile(char *name);

void read_dir(char *dir)
{
    char path[256];
    DIR *dp;
    struct dirent *sdp;

    dp = opendir(dir);
    if(dp == NULL)
    {
        perror("open error");
        return;
    }

    while((sdp = readdir(dp)) != NULL)
    {
        // 忽略 "." 和 ".."
        if(strcmp(sdp->d_name, ".") == 0 || strcmp(sdp->d_name, "..") == 0)
        {
            continue;
        }
        if(strlen(dir)+strlen(sdp->d_name)+1 < 256)
        {
            // 使用 snprintf 防止缓冲区溢出, 拼接文件路径
            snprintf(path,sizeof(path),"%s/%s", dir, sdp->d_name);  //不加这个判断也行, 用sprintf, 这个报错 加了也会报, 很烦

            isFile(path); // 递归调用
        }
        else
        {
            printf("directory too long : %s/%s",dir,sdp->d_name);
        }
    }

    closedir(dp);
}

void isFile(char *name)
{
    struct stat sb;

    // 获取文件状态
    if(stat(name, &sb) < 0)  // 这里stat会穿透, 软连接,会显示原始的文件大小, 防止这个bug 就是用 lstat
    {
        perror("stat error");
        return;
    }

    // 如果是目录，则递归调用
    if(S_ISDIR(sb.st_mode))
    {
        read_dir(name);
    }

    // 打印文件名和文件大小
    printf("%10s\t%ld\n", name, sb.st_size);
}

int main(int argc, char *argv[])
{
    if(argc == 1) // 如果没有参数，默认显示当前目录
    {
        isFile(".");
    }
    else
    {
        isFile(argv[1]); // 如果有参数，显示指定目录
    }

    return 0;
}

```

### 2.主调 回调

**主调函数（Caller Function）：**
主调函数是程序中调用其他函数的函数。它控制程序的流程，并在适当的时机调用其他函数，包括回调函数。主调函数通常是高阶函数（函数的参数是其他函数）或执行一些逻辑的控制流程。

**回调函数（Callback Function）：**
回调函数是作为参数传递给另一个函数（主调函数）并在主调函数内部被调用的函数。回调函数可以延迟执行，也可以根据主调函数的逻辑在某些条件下被触发。回调函数通常用于提高程序的灵活性。

### 3.利用主回调,优化递归

修改 这部分

```c++
void read_dir(char *dir, const void (*func)(char *))//----------------------修改处
{
    char path[256];
    DIR *dp;
    struct dirent *sdp;

    dp = opendir(dir);
    if(dp == NULL)
    {
        perror("open error");
        return;
    }

    while((sdp = readdir(dp)) != NULL)
    {
        // 忽略 "." 和 ".."
        if(strcmp(sdp->d_name, ".") == 0 || strcmp(sdp->d_name, "..") == 0)
        {
            continue;
        }
        if(strlen(dir)+strlen(sdp->d_name)+1 < 256)
        {
            // 使用 snprintf 防止缓冲区溢出
            snprintf(path,sizeof(path),"%s/%s", dir, sdp->d_name);  //不加这个判断也行, 用sprintf, 这个报错 加了也会报, 很烦

            //isFile(path); // 递归调用
			func(path);  //----------------------修改处
        }
        else
        {
            printf("directory too long : %s/%s",dir,sdp->d_name);
        }
    }

    closedir(dp);
}
void isFile(char *name)
{
    struct stat sb;

    // 获取文件状态
    if(stat(name, &sb) < 0)  // 这里stat会穿透, 软连接,会显示原始的文件大小, 防止这个bug 就是用 lstat
    {
        perror("stat error");
        return;
    }

    // 如果是目录，则递归调用
    if(S_ISDIR(sb.st_mode))
    {
        read_dir(name, isFile);//----------------------修改处
    }

    // 打印文件名和文件大小
    printf("%10s\t%ld\n", name, sb.st_size);
}
```



### 4.dup dup2 实例-1

```c++
#include <unistd.h>
#include <fcntl.h>
#include <stdio.h>
#include <errno.h>

int main(int argc, char *argv[])
{
    int fd = open(argv[1], O_RDWR);
    int newfd = dup(fd);
    printf("newfd = %d\n", newfd); // 4, man dup  是一个复制版
    return 0;
}
```

### 5.dup2 实例-2

```c++
#include <unistd.h>
#include <fcntl.h>
#include <stdio.h>
#include <errno.h>

int main(int argc, char *argv[])
{
    int fd1 = open(argv[1], O_RDWR);
    int fd2 = open(argv[2], O_RDWR);
    int fdret = dup2(fd1, fd2);
    printf("fdret = %d\n", fdret); 
    
    int ret = write(fd2, "1234567", 7); // 
    printf("ret = %d\n", ret);
    
    dup2(fd1, 1); // 实现cat 1 > fd1  将屏幕输出重定向到文件, 将w文件fd,复制给 STDOUT_FILENO
    printf("-----------------------jijij\n"); // printf调用STDOUT_FILENO的时候, 实际上是 fd1, 而不再是1
    return 0;
}

//本程序fd1,fd2,STDOUT_FILENO 都是fd1
```

### 6.fcntl dup 实例-3

```c++
#include <unistd.h>
#include <fcntl.h>
#include <stdio.h>
#include <errno.h>

int main(int argc, char *argv[])
{
    int fd1 = open(argv[1], O_RDWR);
	int newfd = fcntl(fd1, F_DUPFD, 0); //0被占用,使用可用的最小fd, 也可以自定义一个
    printf("fcntl newfd = %d\n", newfd);
    
    int newfd2 = fcntl(fd1, F_DUPFD, 7); //也可以自定义一个未被占用的
    printf("fcntl newfd2 = %d\n", newfd2);
    return 0;
}

```



 
