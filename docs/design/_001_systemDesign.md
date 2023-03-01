---
title: 系统架构设计
date: 2022-09-22 15:39:13
permalink: /system/design
sidebar: 'auto'
categories:
 - 系统设计
tags:
  - 系统设计
  - 面向对象
# keys:
#  - 'e10adc3949ba59abbe56e057f20f883e'
---

# 系统架构设计
## 系统设计 VS 面向对象设计
形式上：
- 面向对象设计手把手的 Coding
- 系统设计高屋建瓴的“扯淡”

考察的知识点上：
- 面向对象设计：Class, Object, Method, Inheritance, Interface …
- 系统设计考的是：Database, Schema, SQL, NoSQL, Memcached, File System, Distributed System, Latency, Scalbility, Master Slave, Load Balancer, Web Server, Message Queue, Sharding, Consistent Hashing, QPS …

## 系统设计问题的 4S 分析法
> 分析套路。将模糊需求逐步清晰

- **S**cenario 场景
  - 说人话：需要设计哪些功能，设计得多牛
  - Ask / Features / QPS / DAU / Interfaces
- **S**ervice 服务
  - 说人话：将大系统拆分为小服务
  - Split / Application / Module
- **S**torage 存储 
  - 说人话：数据如何存储与访问
  - Schema / Data / SQL / NoSQL / File System （先怎么取 再怎么存）
- **S**cale 升级 
  - 说人话：解决缺陷，处理可能遇到的问题
  - Sharding / Optimize / Special Case

## 参考资料
[1] 企业架构标准 [https://www.opengroup.org/togaf](https://www.opengroup.org/togaf)