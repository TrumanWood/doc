## 安装Rocketmq

[下载 | RocketMQ (apache.org)](https://rocketmq.apache.org/zh/download)

RocketMQ的安装非常简单，就是上传解压就可以了。

然后我们准备一台CentOS7的Linux机器，快速把RocketMQ给运行起来。我使用的Linux版本如下：

```
[oper@worker1 jdk1.8]$ uname -a
Linux worker1 3.10.0-1127.el7.x86_64 #1 SMP Tue Mar 31 23:36:51 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
```

我们需要创建一个操作用户用来运行自己的程序，与root用户区分开。使用root用户创建一个oper用户，并给他创建一个工作目录。

```
[root@worker1 ~]# useradd oper
[root@worker1 ~]# passwd oper 
设置用户密码
[root@worker1 ~]# mkdir /app
[root@worker1 ~]# chown oper:oper /app
```

运行RocketMQ需要先安装JDK。我们采用目前最稳定的JDK1.8版本。CentOS可以采用课件资料中的jdk-8u171-linux-x64.tar.gz，也可以自行去Oracle官网上下载。然后用FTP上传到oper用户的工作目录下。由oper用户解压到/app/jdk1.8目录下。

```
[oper@worker1 tools]$ tar -zxvf jdk-8u171-linux-x64.tar.gz
[oper@worker1 tools]$ mv jdk1.8.0_171/ /app/jdk1.8
```

配置环境变量。使用 vi ~/.bash_profile编辑文件，在下面加入以下内容：

```
export JAVA_HOME=/app/jdk1.8/
PATH=$JAVA_HOME/bin:$PATH:$HOME/.local/bin:$HOME/bin
export PATH
```

编辑完成后，执行 source ~/.bash_profile让环境变量生效。输入java -version能查看到以下内容表明JDK安装成功了。

```
[oper@worker1 ~]$ java -version
java version "1.8.0_171"
Java(TM) SE Runtime Environment (build 1.8.0_171-b11)
Java HotSpot(TM) 64-Bit Server VM (build 25.171-b11, mixed mode)
```

然后我们把下载的rocketmq-all-4.9.1-bin-release.zip在本地完成解压，并上传到/app/rocketmq目录。完成后，把rocketmq的bin目录也配置到环境变量当中。 vi ~/.bash_profile，加入以下内容，并执行source ~/.bash_profile让环境变量生效：

```
export JAVA_HOME=/app/jdk1.8/
export ROCKETMQ_HOME=/app/rocketmq/rocketmq-all-4.9.1-bin-release
PATH=$ROCKETMQ_HOME/bin:$JAVA_HOME/bin:$PATH:$HOME/.local/bin:$HOME/bin
export PATH
```

这样RocketMQ就安装完成了。我们把他运行起来。

> 这个ROCKETMQ_HOME的环境变量是必须要单独配置的，如果不配置的话，启动NameSever和Broker都会报错。
>
> 这个环境变量的作用是用来加载$ROCKETMQ_HOME/conf下的除broker.conf以外的几个配置文件。所以实际情况中，可以不按这个配置，但是一定要能找到配置文件。

### 启动NameServer

启动NameServer非常简单， 在$ROCKETMQ_HOME/bin目录下有个mqnamesrv。直接执行这个脚本就可以启动RocketMQ的NameServer服务。

但是要注意，RocketMQ默认预设的JVM内存是4G，这是RocketMQ给我们的最佳配置。但是通常我们用虚拟机的话都是不够4G内存的，所以需要调整下JVM内存大小。修改的方式是直接修改runserver.sh。 用vi runserver.sh编辑这个脚本，在脚本中找到这一行调整内存大小为512M

```
JAVA_OPT="${JAVA_OPT} -server -Xms512m -Xmx512m -Xmn256m -
XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=320m"
```

然后我们用静默启动的方式启动NameServer服务：

```
nohup bin/mqnamesrv & 
```

启动完成后，在nohup.out里看到这一条关键日志就是启动成功了。并且使用jps指令可以看到有一个NamesrvStartup进程。

```
Java HotSpot(TM) 64-Bit Server VM warning: Using the DefNew young collector with the CMS
collector is deprecated and will likely be removed in a future release
Java HotSpot(TM) 64-Bit Server VM warning: UseCMSCompactAtFullCollection is deprecated and
will likely be removed in a future release.
The Name Server boot success. serializeType=JSON
```

### 启动Broker

启动Broker的脚本是runbroker.sh。Broker的默认预设内存是8G，启动前，如果内存不够，同样需要调整下JVM内存。vi runbroker.sh，找到这一行，进行内存调整

```
JAVA_OPT="${JAVA_OPT} -server -Xms512m -Xmx512m -Xmn256m"
```

然后我们需要找到$ROCKETMQ_HOME/conf/broker.conf， vi指令进行编辑，在最下面加入一个配置：

```
autoCreateTopicEnable=true
```

然后也以静默启动的方式启动runbroker.sh

```
nohup ./mqbroker &
```

启动完成后，同样是检查nohup.out日志，有这一条关键日志就标识启动成功了。 并且jps指令可以看到一个BrokerStartup进程。

```
The broker[worker1, 192.168.232.128:10911] boot success. serializeType=JSON
```

> 在观察runserver.sh和runbroker.sh时，我们还可以查看到其他的JVM执行参数，这些参数都可以进行定制。例如我们观察到一个比较有意思的地方，nameServer使用的是CMS垃圾回收器，而Broker使用的是G1垃圾回收器。 关于垃圾回收器的知识你还记得吗？

###  关闭RocketMQ服务

要关闭RocketMQ服务可以通过mqshutdown脚本直接关闭

```
# 1.关闭NameServer
sh bin/mqshutdown namesrv
# 2.关闭Broker
sh bin/mqshutdown broker
```

## 以docker形式安装

> 以快速部署测试，以4.9.1版本演示

1. 拉取`docker pull apache/rocketmq:4.9.1`

2. 创建namesrv数据存储路径：`mkdir -p  /home/rocketmq/data/namesrv/logs   /home/rocketmq/data/namesrv/store`

3. 创建namesrv数据存储路径：`mkdir -p  /home/rocketmq/data/broker/logs   /home/rocketmq/data/broker/store /docker/rocketmq/conf /home/rocketmq/conf `

4. 启动namesrv：

   `docker run -d --restart=always --name rmqnamesrv -p 9876:9876 -v /home/rocketmq/data/namesrv/logs:/root/logs -v /home/rocketmq/data/namesrv/store:/root/store -e "MAX_POSSIBLE_HEAP=100000000" apache/rocketmq:4.9.1  sh mqnamesrv `

   **参数说明**：

   - `-restart=always` docker重启时候容器自动重启
   - `-name rmqnamesrv`  把容器的名字设置为rmqnamesrv
     `-p 9876:9876 ` 把容器内的端口9876挂载到宿主机9876上面
     `-v /home/rocketmq/data/namesrv/logs:/root/logs ` 把容器内的/root/logs日志目录挂载到宿主机的` /home/rocketmq/data/namesrv/logs`目录
     `-v /home/rocketmq/data/namesrv/store:/root/store ` 把容器内的/root/store数据存储目录挂载到宿主机的 `/home/rocketmq/data/namesrv`目录
     `rmqnamesrv `容器的名字
     `-e "MAX_POSSIBLE_HEAP=100000000" ` 设置容器的最大堆内存为100000000
     `rocketmqinc/rocketmq ` 使用的镜像名称
     `sh mqnamesrv `启动namesrv服务

5. 创建配置文件`/home/rocketmq/conf/broker.conf`

   ```properties
   # 所属集群名称，如果节点较多可以配置多个
   brokerClusterName = DefaultCluster
   #broker名称，master和slave使用相同的名称，表明他们的主从关系
   brokerName = broker-a
   #0表示Master，大于0表示不同的slave
   brokerId = 0
   #表示几点做消息删除动作，默认是凌晨4点
   deleteWhen = 04
   #在磁盘上保留消息的时长，单位是小时
   fileReservedTime = 48
   #有三个值：SYNC_MASTER，ASYNC_MASTER，SLAVE；同步和异步表示Master和Slave之间同步数据的机制；
   brokerRole = ASYNC_MASTER
   #刷盘策略，取值为：ASYNC_FLUSH，SYNC_FLUSH表示同步刷盘和异步刷盘；SYNC_FLUSH消息写入磁盘后才返回成功状态，ASYNC_FLUSH不需要；
   flushDiskType = ASYNC_FLUSH
   # 设置broker节点所在服务器的ip地址
   brokerIP1 = 127.0.0.1
   # 磁盘使用达到95%之后,生产者再写入消息会报错 CODE: 14 DESC: service not available now, maybe disk full
   diskMaxUsedSpaceRatio=95
   ```

6. 启动broker

   ```sh
   docker run -d  \
   --restart=always \
   --name rmqbroker \
   --link rmqnamesrv:namesrv \
   -p 10911:10911 \
   -p 10909:10909 \
   -v  /home/rocketmq/data/broker/logs:/root/logs \
   -v  /home/rocketmq/data/broker/store:/root/store \
   -v /home/rocketmq/conf/broker.conf:/opt/rocketmq-4.9.1/conf/broker.conf \
   -e "NAMESRV_ADDR=namesrv:9876" \
   -e "MAX_POSSIBLE_HEAP=200000000" \
   apache/rocketmq:4.9.1 \
   sh mqbroker -c /opt/rocketmq-4.9.1/conf/broker.conf 
   ```

   **参数详情**：

   - `-name rmqbroker` 把容器的名字设置为rmqbroker
   - `–link rmqnamesrv:namesrv` 和rmqnamesrv容器通信
     `-p 10911:10911` 把容器的非vip通道端口挂载到宿主机
     `-p 10909:10909 ` 把容器的vip通道端口挂载到宿主机
     `-e “NAMESRV_ADDR=namesrv:9876” ` 指定namesrv的地址为本机namesrv的ip地址:9876
     `-e “MAX_POSSIBLE_HEAP=200000000” rocketmqinc/rocketmq sh mqbroker ` 指定broker服务的最大堆内存
     `rocketmqinc/rocketmq` 使用的镜像名称
     `sh mqbroker -c /opt/rocketmq-4.9.1/conf/broker.conf `指定配置文件启动broker节点

7. 拉取WEB管理控制台`docker pull pangliang/rocketmq-console-ng`

8. 启动控制台：

   ```sh
   docker run -d \
   --restart=always \
   --name rmqadmin \
   -e "JAVA_OPTS=-Drocketmq.namesrv.addr=172.27.128.2:9876 \
   -Dcom.rocketmq.sendMessageWithVIPChannel=false" \
   -p 8082:8080 \
   pangliang/rocketmq-console-ng
   ```

   **参数说明**：

   - `-restart=always` docker重启时候镜像自动重启
   - `-name rmqadmin ` 把容器的名字设置为rmqadmin
     `-e "JAVA_OPTS=-Drocketmq.namesrv.addr=192.168.52.136:9876 ` 设置namesrv服务的ip地址
     `-Dcom.rocketmq.sendMessageWithVIPChannel=false" ` 不使用vip通道发送消息
     `–p 8082:8080 ` 把容器内的端口8080挂载到宿主机上的9999端口



## 参考资料

[1]: [VIP01-RocketMQ整体理解与快速实战_rocketmq vip_liuhehe321的博客-CSDN博客](https://blog.csdn.net/nmjhehe/article/details/120396639)

[2]:  [使用docker安装RocketMQ_docker rocketmq_皓亮君的博客-CSDN博客](https://blog.csdn.net/ming19951224/article/details/109063041)

[3]: [5分钟不到！Docker搭建RocketMQ，史上最快教程！ - 腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1621263)

[4]: [ RocketMQ (apache.org)](https://rocketmq.apache.org/zh/)

