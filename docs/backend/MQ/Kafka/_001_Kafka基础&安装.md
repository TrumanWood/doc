## 以docker方式安装Kafka

以单机安装为演示，仅以快速测试

### 创建docker网络

`docker network create app-zk --driver bridge`

### Zookeeper

1. 拉取ZK：`docker pull zookeeper `

2. 运行ZK①：

   `docker run -d --restart=always --log-driver json-file --log-opt max-size=100m --log-opt max-file=2  --name zookeeper -p 2181:2181 -v /etc/localtime:/etc/localtime zookeeper`

3. 运行ZK②添加网络启动：

   `docker run -d --name zookeeper -p 2181:2181 --network app-zk -v /etc/localtime:/etc/localtime  -e ALLOW_ANONYMOUS_LOGIN=yes zookeeper`

4. 查看log：`docker logs -f zookeeper`

### Kafka

1. 拉取kafka：`docker pull bitnami/kafka`

2. ①`docker run -d --restart=always --log-driver json-file --log-opt max-size=100m --log-opt max-file=2 --name kafka -p 9092:9092 -e KAFKA_BROKER_ID=0 -e KAFKA_ZOOKEEPER_CONNECT=127.0.0.1/kafka -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://127.0.0.1:9092 -e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 -v /etc/localtime:/etc/localtime bitnami/kafka`

   **参数说明**：
   `-e KAFKA_BROKER_ID=0`  在kafka集群中，每个kafka都有一个BROKER_ID来区分自己

   `-e KAFKA_ZOOKEEPER_CONNECT=127.0.0.1:2181/kafka` 配置zookeeper管理kafka的路径`127.0.0.1:2181/kafka`

   `-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://127.0.0.1:9092`  把kafka的地址端口注册给zookeeper，如果是远程访问要改成外网IP,类如Java程序访问出现无法连接。

   `-e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092` 配置kafka的监听端口

   `-v /etc/localtime:/etc/localtime` 容器时间同步虚拟机的时间

3. ② `docker run -d --name kafka --network app-zk -p 9092:9092 -e ALLOW_PLAINTEXT_LISTENER=yes -e KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181 -e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://ip:9092 bitnami/kafka:latest`

   **参数说明**：

   `-e ALLOW_PLAINTEXT_LISTENER`任何人可以访问

   `-e KAFKA_CFG_ZOOKEEPER_CONNECT`连接的ZK 与zk的名称一直

   `-e  KAFKA_CFG_ADVERTISED_LISTENERS`当前IP

4. 查看log `docker logs -f zookeeper`

### Kafka可视化

① kafka-manager图形化管理工具(不好用)

② kafka-map图形化管理工具(好用)

 1. 搜索：`docker search kafka-map`

 2. 下载：`docker pull dushixiang/kafka-map:latest`

 3. 运行：

    `docker run -d --name kafka-map --network app-zk -p 8081:8080 -v /opt/kafka-map/data:/usr/local/kafka-map/data -e DEFAULT_USERNAME=admin -e DEFAULT_PASSWORD=admin--restart always dushixiang/kafka-map:latest`

​	

## 参考资料

[1] [Docker安装Kafka教程（超详细）_乾坤鸟的博客-CSDN博客](https://blog.csdn.net/y393016244/article/details/126405864)

[2] [kafka-map/README-zh_CN.md at master · dushixiang/kafka-map · GitHub](https://github.com/dushixiang/kafka-map/blob/master/README-zh_CN.md)

