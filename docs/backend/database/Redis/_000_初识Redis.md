---
title: Redis初相识
date: 2022-11-13 22:48:13
permalink: /backend/db/redis
categories:
  - 后端
tags:
  - Redis
---

## 什么是Redis

	Redis是Remote Dictionary Server（远程字典服务器）的缩写，最初是作为数据库的工具来使用的，是目前使用广泛、高效的开源缓存。Redis使用C语言开发，将数据保存在内存中，可以看成是一款纯内存的数据库，所以它的数据存取速度非常快。

Redis通过键-值对（Key-Value Pair）的形式来存储数据，类似于Java中的Map（映射）。

## Redis数据类型

Redis的Key（键）只能是String（字符串）类型
	1. Value（值）则可以是String类型、
	2. Map类型、
	3. List（列表）类型、
	4. Set（集合）类型、
	5. SortedSet（有序集合）类型。

## 主要应用场景

Redis的主要应用场景是缓存（数据查询、短连接、新闻内容、商品内容等）、
分布式会话（Session）、
聊天室的在线好友列表、
任务队列（秒杀、抢购、12306等）、
应用排行榜、
访问统计、
数据过期处理（可以精确到毫秒）。



## Redis优点

（1）速度快。不需要等待磁盘的IO，而是在内存之间进行数据存储和查询，速度非常快。当然，缓存的数据总量不能太大，因为受到物理内存空间大小的限制。
（2）丰富的数据结构，有String、List、Hash、Set、SortedSet五种类型。
（3）单线程，避免了线程切换和锁机制的性能消耗。
（4）可持久化。支持RDB与AOF两种方式，将内存中的数据写入外部的物理存储设备。
（5）支持发布/订阅。
（6）支持Lua脚本。
（7）支持分布式锁。在分布式系统中，不同的节点需要访问同一个资源时，往往需要通过互斥机制来防止彼此干扰，并且保证数据的一致性。在这种情况下，需要用到分布式锁。分布式锁和Java的锁用于实现不同线程之间的同步访问，原理上是类似的。
（8）支持原子操作和事务。Redis事务是一组命令的集合。一个事务中的命令要么都执行，要么都不执行。如果命令在运行期间出现错误，不会自动回滚。
（9）支持主-从（Master-Slave）复制与高可用（Redis Sentinel）集群（3.0版本以上）。
（10）支持管道。Redis管道是指客户端可以将多个命令一次性发送到服务器，然后由服务器一次性返回所有结果。管道技术的优点是，在批量执行命令的应用场景中，可以大大减少网络传输的开销，提高性能。

---



## 常见NoSQL

| 类型         | DB               |
| ------------ | ---------------- |
| 键值对数据库 | Redis、Memcache  |
| 列存储数据库 | Hbase、Cassandra |
| 文档型数据库 | MongoDB、CouchDB |
| 图形数据库   | Neo4j、FlockDB   |

## Redis、Memcache、Ecache区别

| DB       | 优点                                                         | 缺点                                  |
| -------- | ------------------------------------------------------------ | ------------------------------------- |
| Redis    | 基于内存快、支持集群、数据类型多样、可持久化、主从同步，故障转移 | 单线程不能发挥多核优势                |
| Memcache | 基于内存、支持集群、多核多线程、内存使用率高                 | 只支持Str类型、不能持久化（无法容灾） |
| Ecache   | 基于Java开发，基于JVM缓存、简单轻便（Mybatis、hibernate）    | 不支持集群、不支持分布式              |



---


## 参考资料
1. 【本文来源】《Java高并发核心编程（卷1）：NIO、Netty、Redis、ZooKeeper》



