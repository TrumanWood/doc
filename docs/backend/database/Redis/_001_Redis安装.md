---
title: Redis安装
date: 2022-11-13 22:48:13
permalink: /backend/db/redis/001
categories:
  - 后端 
tags:
  - Redis
---

> 6.0.7 存在安全漏洞 

## Window 下的安装

官网下载地址(没有Windows平台的安装方式)： http://redis.io/download
### window平台下载：
github下载地址： https://github.com/MSOpenTech/redis/tags
### Windows 启动：
```sh
redis-server redis.windows.conf
```



### 设置Redis 为服务
设置服务命令
```sh
redis-server --service-install redis.windows-service.conf --loglevel verbose
```
## Linux 下安装

### 安装

1. 下载

   ```sh
   wget https://download.redis.io/releases/redis-5.0.14.tar.gz
   ```

   

2. 解压

   ```sh
   tar -zxvf redis-5.0.14.tar.gz
   ```

   

3. 编译&安装

   ```sh
   make && make install
   ```

   

### 配置 & 启停

1. 自启动

   ```sh
   ### 复制redis_init_script(~/redis/utils/) 配置文件到/etc/init.d
   cp redis_init_script /etc/init.d/
   
   ### 编辑redis_init_script
   cd  /etc/init.d/
   ```

   编辑redis_init_script

   ```sh
   ### 自启动需要配置
   ##chkconfig: 22345 10 90
   ##description: Start and Stop redis
   
   REDISPORT=6379
   
   ### 设置指定的conf 文件
   CONF="/usr/local/redis/redis.conf"
   
   ### 如果设置了密码则需要添加密码，不然不能关闭
   $CLIEXEC -a "123456" -p $REDISPORT shutdown
   ```

   赋权限：

   ```sh
   chmod 777 redis_init_script 
   ```

   

2. redis.conf

   ```sh
   ### 表示允许外界访问
   bind 0.0.0.0
   
   ### 后台启动
   daemonize yes
   
   ### 版本V > 6 将保护模式关闭，可能导致 springboot 配置redis时 无法连接redis
   protected-mode no
   
   ### 访问密码
   requirepass 123456
   
   ### 表示持久化数据存放位置
   dir /usr/local/redis/working
   
   ```

3.  启动 & 停止

   ```sh
   ### 启动
   ./redis_init_script start
   ### 停止
   ./redis_init_script stop
   ```


### 查看redis是否存活

```sh
127.0.0.1:6379> ping
PONG
```