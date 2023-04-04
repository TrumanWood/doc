---
title: RabbitMQ 安装与集群
date: 2023-01-28
permalink: /backend/mq/rabbitmq/001
categories:
  - 后端
tags:
  - MQ
---
## RabbitMQ 安装

RabbitMQ是使用Erlang语言开发的 所以需要先安装Erlang的语言环境，就如Spring与Java一样都是需要版本的对应。

其版本对应关系请查看官网：https://www.rabbitmq.com/news.html

本次试验采用`RabbitMQ3.9.15`，Erlang则使用`23.2.7`

#### 第一步：安装`Erlang`

erlang-23.2.7-1.el7.x86_64.rpm :https://pan.baidu.com/s/1U0P07hEUziD50LNpTSS-vg，提取码：mehn；

官网的下载地址：https://www.erlang.org/downloads;

```sh
## 采用rpm安装
rpm -ivh erlang-23.2.7-1.el7.x86_64.rpm 
## 安装过程……
警告：erlang-23.2.7-1.el7.x86_64.rpm: 头V4 RSA/SHA1 Signature, 密钥 ID 6026dfca: NOKEY
准备中...                          ################################# [100%]
正在升级/安装...
   1:erlang-23.2.7-1.el7              ################################# [100%]
## 查看版本
erl -version
## 出现一下情况表示安装成功
Erlang (SMP,ASYNC_THREADS,HIPE) (BEAM) emulator version 11.1.8
```

#### 第二步：安装`RabbitMQ`

MQ下载地址：https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.9.15/rabbitmq-server-3.9.15-1.el7.noarch.rpm

```sh
## 1. 安装依赖
sudo yum install -y socat
## 2. 安装mq
[root@localhost home]# rpm -iv rabbitmq-server-3.9.15-1.el7.noarch.rpm 
警告：rabbitmq-server-3.9.15-1.el7.noarch.rpm: 头V4 RSA/SHA512 Signature, 密钥 ID 6026dfca: NOKEY
软件包准备中...
rabbitmq-server-3.9.15-1.el7.noarch

##3. 验证是否安装成功
[root@localhost home]# whereis rabbitmqctl
rabbitmqctl: /usr/sbin/rabbitmqctl /usr/share/man/man8/rabbitmqctl.8.gz
```

#### 第三步：RabbitMQ起步

```sh
## 1. 查看RabbitMQ是否是active(running)
service rabbitmq-server status
## 2. 后台启动服务
rabbitmq-server -deched
## 3. 启动服务
rabbitmq-server start_app
## 或者
systemctl start rabbitmq-server
## 4. 关闭服务
rabbitmq-server stop_app

## 1.安装RabbitMQ WEB控制台
rabbitmq-plugins enable rabbitmq_management

## 2. 创建用户名和密码
rabbitmqctl add_user admin admin
Adding user "admin" ...
Done. Don't forget to grant the user permissions to some virtual hosts! See 'rabbitmqctl help set_permissions' to learn more.
## 3.设置用户权限
rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"

## 4.设置用户标签
rabbitmqctl set_user_tags admin administrator
Setting tags for user "admin" to [administrator] ...
```

那么接下来就是打开浏览器访问 `IP:15672`

如果不能访问，请查看[Linux防火墙是否关闭](/backend/linux/001)

#### 第四部：搭建集群

##### 普通集群: 利用Erlang语言自身特性

1. copy `/var/lib/rabbitmq/.erlang.cookie` 到其他的机器中

2. ```sh
   vim /etc/hosts 
   192.168.75.190 rabbitworker0
   192.168.75.191 rabbitworker1
   192.168.75.192 rabbitworker2
   
   [root@localhost ~]# hostnamectl 
      Static hostname: rabbitworker0
   ## 如果发现hostname名字没修改成host文件中的名字，执行命令修改
   hostnamectl set-hostname  rabbitworker0
   ```

3. ```sh
   rabbitmqctl stop_app
   rabbitmqctl reset
   rabbitmqctl join_cluster  rabbitworker1   
   rabbitmqctl start_app
   ```

4. 



