## 循环创建n个子线程

### 并 循环回收---难点

### 1-loop-pthread.c

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <pthread.h>

// 循环创建子线程, 并验证 是不是共享全局变量

int var = 100;


void *tfn(void *arg)
{
    int i = (int)arg;
    var = 400;
    printf("thread--%d: pid = %d, tid is %lu, var = %d\n", i, getpid(), pthread_self(), var);
    sleep(2);
    printf("test ----%d\n", i);
    return NULL; 
}

int main(int argc, char *argv[])
{   
    pthread_t tid;
    int i=0;
    var = 200;
    while(i<10)
    {
        int ret = pthread_create(&tid, NULL, tfn, (void*)i);
        // int ret = pthread_create(&tid, NULL, tfn, (void*)&i);   // 容易导致 内容错乱
        if(ret < 0)
        {
            fprintf(stderr, "pthread error: %s\n", strerror(ret));
            exit(1);
        }
        i++;
        sleep(1);
    }
    printf("main: pid is %d, tid is %lu, var = %d\n", getpid(), pthread_self(), var);
    
    pthread_exit((void*)0);  // 会退出 当前线程, 也就是只退出了 主线程
    // return 0;//线程不能使用这个   会出现 子线程还未结束, 整体 进程 就退出
}


```



### 2-pthread-join-error.c

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <pthread.h>

// pthread_join 测试
// 错误示范, 局部变量 地址 会被释放, 所以一直返回 0

int var = 100;


void *tfn(void *arg)
{
    int i = (int)arg;
    var = 400;
    printf("thread--%d: pid = %d, tid is %lu, var = %d\n", i, getpid(), pthread_self(), var);
    sleep(2);
    printf("test ----%d\n", i);
    int *r=&i;
    return (void*)r; 
}

int main(int argc, char *argv[])
{   
    pthread_t tid;
    int i=0;
    var = 200;
    
    int *tidret;  

    while(i<10)
    {
        int ret = pthread_create(&tid, NULL, tfn, (void*)i);
        if(ret < 0)
        {
            fprintf(stderr, "pthread_create error: %s\n", strerror(ret));
            exit(1);
        }
        
        ret = pthread_join(tid, (void **)&tidret);
        if(ret < 0)
        {
            fprintf(stderr, "pthread_join error: %s\n", strerror(ret));
            exit(1);
        }
        printf("child %d return %d\n",i, *tidret);

        i++;
        sleep(1);
    }
    printf("main: pid is %d, tid is %lu, var = %d\n", getpid(), pthread_self(), var);
    
    pthread_exit((void*)0);  // 会退出 当前线程, 也就是只退出了 主线程
    // return 0;//线程不能使用这个   会出现 子线程还未结束, 整体 进程 就退出
}


```



### 3-pthread-join-true.c

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <pthread.h>

// pthread_join 测试
// 错误示范, 局部变量 地址 会被释放, 所以一直返回 0
// 这是正确示范   使用malloc 可以防止销毁
 
int var = 100;


void *tfn(void *arg)
{
    int i = (int)arg;
    var = 400;
    printf("thread--%d: pid = %d, tid is %lu, var = %d\n", i, getpid(), pthread_self(), var);
    sleep(1);
    printf("test ----%d\n", i);
    int *r = malloc(sizeof(int *));   
    *r = i;   // 不能传地址, 地址会释放, 传递值  注意不是  r=i
    return (void*)r; 
}

int main(int argc, char *argv[])
{   
    pthread_t tid;
    int i=0;
    var = 200;
    
    // int *tidret;   // 外部容易 内存 泄漏

    while(i<10)
    {
        int *tidret; 

        int ret = pthread_create(&tid, NULL, tfn, (void*)i);
        if(ret < 0)
        {
            fprintf(stderr, "pthread_create error: %s\n", strerror(ret));
            exit(1);
        }
        
        ret = pthread_join(tid, (void **)&tidret);
        if(ret < 0)
        {
            fprintf(stderr, "pthread_join error: %s\n", strerror(ret));
            exit(1);
        }
        printf("child %d return %d\n",i, *tidret);
        free(tidret);
        i++;
        sleep(1);
    }
    printf("main: pid is %d, tid is %lu, var = %d\n", getpid(), pthread_self(), var);
    
    pthread_exit((void*)0);  // 会退出 当前线程, 也就是只退出了 主线程
    // return 0;//线程不能使用这个   会出现 子线程还未结束, 整体 进程 就退出
}


```



## 使用 pthread_cancel函数取消线程

### 使用默认系统调用 作为取消点

### 使用 指定的pthread_testcancel()作为取消点



### pthread-cancel.c

```c++
#include <stdio.h>
#include <unistd.h>
#include <pthread.h>
#include <stdlib.h>
void *tfn1(void *arg)
{
    printf("thread 1 returning\n");
    return (void *)111;
}
void *tfn2(void *arg)
{
    printf("thread 2 exiting\n");
    pthread_exit((void *)222);
}
void *tfn3(void *arg)
{
    while (1)
    {
        // printf("thread 3: I'm going to die in 3 seconds ...\n");  
        // sleep(1); //这两句 会进入系统调用, 到达 取消点, 若没有这两句, 需手动添加取消点
        pthread_testcancel(); //自己添加取消点*/
    }
    return (void *)666;
}
int main(void)
{
    pthread_t tid;
    void *tret = NULL;
    pthread_create(&tid, NULL, tfn1, NULL);
    pthread_join(tid, &tret);
    printf("thread 1 exit code = %d\n\n", (int)tret);


    pthread_create(&tid, NULL, tfn2, NULL);
    pthread_join(tid, &tret);
    printf("thread 2 exit code = %d\n\n", (int)tret);


    pthread_create(&tid, NULL, tfn3, NULL);
    sleep(3);
    pthread_cancel(tid);
    pthread_join(tid, &tret);
    printf("thread 3 exit code = %d\n", (int)tret);


    return 0;
}
```



## 设置 线程分离, 并 jion回收, 查看出错

### pthread-detach.c

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <pthread.h>

void *tf(void *arg)
{
    printf("exit ----- \n");
    return NULL;
}


int main(int argc, char *argv[])
{   
    pthread_t tid;

    int ret = pthread_create(&tid, NULL, tf, NULL);
    if(ret != 0)
    {
        fprintf(stderr, "pthread_create error: %s\n", strerror(ret));
        exit(1);
    }

    ret = pthread_detach(tid);
    if(ret != 0)
    {
        fprintf(stderr, "pthread_detach error: %s\n", strerror(ret));
        exit(1);
    }

    sleep(2);  // 不等待,看不出区别
    ret = pthread_join(tid, NULL);
    if(ret != 0)
    {
        fprintf(stderr, "pthread_join error: %s\n", strerror(ret));
        exit(1);
    }
    printf("main----\n");

    pthread_exit(NULL);
}


```



## 使用线程 属性设置 分离态

### pthread-attr.c

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <pthread.h>

void *fn(void *arg)
{
    printf("child-----\n");
    return NULL;
}


int main(int argc, char *argv[])
{   
    pthread_t tid;
    
    pthread_attr_t attr;
    pthread_attr_init(&attr);
    pthread_attr_setdetachstate(&attr, PTHREAD_CREATE_DETACHED);

    int ret = pthread_create(&tid, &attr, fn, NULL);
    if(ret != 0)
    {
        fprintf(stderr, "pthread_create error: %s\n", strerror(ret));
        exit(1);
    }

    ret = pthread_join(tid, NULL);
    if(ret != 0)
    {
        fprintf(stderr, "pthread_join error: %s\n", strerror(ret));
        exit(1);
    }


    pthread_attr_destroy(&attr);
    pthread_exit(NULL);
}


```



## 简单的 互斥锁(4个)

读写锁差不多,不写案例

### 不使用锁的效果

### 正常加锁解锁

### tyrlock 替换进去看效果

### 营造死锁的 问题



### 1-mutex-no-lock.c

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <pthread.h>

// 无锁, 多个线程 会抢占资源, 不能按照顺序打印

void *fn(void *arg)
{
    while(1)
    {
        printf("hello--2\n");
    sleep(rand()%3);
    printf("world--2\n");
    sleep(rand()%3);
    }
    return NULL;
}


int main(int argc, char *argv[])
{   
    pthread_t tid;
    srand(time(NULL));

    int ret = pthread_create(&tid, NULL, fn, NULL);
    if(ret < 0 )
    {
        fprintf(stderr, "pthread_create error: %s\n", strerror(ret));
        exit(1);
    }
    while(1)
    {
        printf("HELLO--1\n");
        sleep(rand()%3);
        printf("WORLD--1\n");
        sleep(rand()%3);
    }
    

    pthread_join(tid, NULL);
    pthread_exit(NULL);

}

```



### 2-mutex-lock.c

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <pthread.h>

// 无锁, 多个线程 会抢占资源, 不能按照顺序打印
// 加锁,  会 一个线程 一会占用 

pthread_mutex_t mutex;  // 定义一个全局, 可以使得 所有线程 都能加锁解锁

void *fn(void *arg)
{
    while(1)
    {
        pthread_mutex_lock(&mutex);
        printf("hello--2\n");
        sleep(rand()%3);
        printf("world--2\n");
        pthread_mutex_unlock(&mutex);
        sleep(rand()%3);
    }
    return NULL;
}


int main(int argc, char *argv[])
{   
    pthread_t tid;
    srand(time(NULL));
    pthread_mutex_init(&mutex, NULL);

    int ret = pthread_create(&tid, NULL, fn, NULL);
    if(ret < 0 )
    {
        fprintf(stderr, "pthread_create error: %s\n", strerror(ret));
        exit(1);
    }
    while(1)
    {
        pthread_mutex_lock(&mutex);
        printf("HELLO--1\n");
        sleep(rand()%3);
        printf("WORLD--1\n");
        pthread_mutex_unlock(&mutex);
        sleep(rand()%3);
        
    }
    
    
    pthread_join(tid, NULL);
    pthread_mutex_destroy(&mutex);
    pthread_exit(NULL);

}


```



### 3-mutex-trylock.c

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <pthread.h>

// 无锁, 多个线程 会抢占资源, 不能按照顺序打印
// 加锁,  会 一个线程 一会占用 

pthread_mutex_t mutex;  // 定义一个全局, 可以使得 所有线程 都能加锁解锁

void *fn(void *arg)
{
    if((pthread_mutex_trylock(&mutex) == 0))
    {
        printf("thread %ld: acquire lock\n", (long)arg);
        sleep(2);
        pthread_mutex_unlock(&mutex);
    }
    else
    {
        printf("thread %ld: none lock\n", (long)arg);
    }
    return NULL;
}


int main(int argc, char *argv[])
{   
    pthread_t tid,tid2;
    srand(time(NULL));
    pthread_mutex_init(&mutex, NULL);

    int ret = pthread_create(&tid, NULL, fn, (void *)1);
    pthread_join(tid, NULL);   // 这个位置决定了 1结束, 2才会创建, 因此都会打印 拿到锁

    ret = pthread_create(&tid2, NULL, fn, (void *)2);
    // pthread_join(tid, NULL);
    pthread_join(tid2, NULL);

    pthread_mutex_destroy(&mutex);
    pthread_exit(NULL);

}


```



### 4-mutex-si.c

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <pthread.h>



// 反复加锁, 会死锁, 一直阻塞

pthread_mutex_t mutex;  // 定义一个全局, 可以使得 所有线程 都能加锁解锁

void *fn(void *arg)
{
    if((pthread_mutex_lock(&mutex) == 0))
    {
        printf("thread %ld: acquire lock\n", (long)arg);
        sleep(2);
        // pthread_mutex_unlock(&mutex);
    }
    else
    {
        printf("thread %ld: none lock\n", (long)arg);
    }
    return NULL;
}


int main(int argc, char *argv[])
{   
    pthread_t tid,tid2;
    srand(time(NULL));
    pthread_mutex_init(&mutex, NULL);

    int ret = pthread_create(&tid, NULL, fn, (void *)1);
    pthread_join(tid, NULL);   // 这个位置决定了 1结束, 2才会创建, 因此都会打印 拿到锁

    ret = pthread_create(&tid2, NULL, fn, (void *)2);
    // pthread_join(tid, NULL);
    pthread_join(tid2, NULL);

    pthread_mutex_destroy(&mutex);
    pthread_exit(NULL);

}


```



## 条件变量---重点

### 生产者和消费者模型



### producer-customer.c

```c++
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <pthread.h>

pthread_mutex_t mutex;
pthread_cond_t cond_product;

struct product *head;
int i=10,j=10;
struct product
{
    int num;
    struct product *next;
};

void Prr(int ret, char *str)
{
    if(ret < 0)
    {
        fprintf(stderr, "%s error : %s\n",str, strerror(ret));
        exit(1);
    }
}

void *Customer(void *arg)
{
    struct product *stc;
    
    while(i!=0)
    {
        pthread_mutex_lock(&mutex); 
        while(head == NULL) // 为空, 则条件变量, 阻塞等待   不使用if, 解除阻塞后, 需要再次检查, 若是多个customer, 可能为空
        {
            pthread_cond_wait(&cond_product, &mutex);
        }
        stc = head;
        head = head->next;
        printf("customer ------ %d\n", stc->num);
        free(stc);
        pthread_mutex_unlock(&mutex);
        sleep(rand()%4);
        i--;
    }
    return NULL;
}

void *Productor(void *arg)
{
    struct product *st;
    while(j!=0)
    {
        st = malloc(sizeof(struct product));
        st->num = rand()%1000;
        printf("product ------ %d\n", st->num);
        
        pthread_mutex_lock(&mutex);  // st 链表作为 共享资源, 因此改变链表需要加锁

        st->next = head;
        head = st;  // 头插法 head要一直保持在 开头,  新元素 next先指向head, head再指向新元素

        pthread_mutex_unlock(&mutex);
        pthread_cond_signal(&cond_product);  // 解锁并 唤醒
        sleep(rand()%4);
        j--;
    }
    return NULL;
}



int main(int argc, char *argv[])
{   
    pthread_t tid1,tid2;
    
    int ret = pthread_create(&tid1, NULL, Productor, NULL);  // 生产和消费的顺序, 决定了 在哪里  malloc
    Prr(ret,"create");
    ret = pthread_create(&tid2, NULL, Customer, NULL);
    Prr(ret, "create");
    

    pthread_join(tid1, NULL);
    pthread_join(tid2, NULL);
        
    pthread_mutex_destroy(&mutex);
    pthread_cond_destroy(&cond_product);
    pthread_exit(NULL);
}


```



