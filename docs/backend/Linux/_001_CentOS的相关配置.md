---
title: 为什么要使用RabbitMQ
date: 2023-01-28
permalink: /backend/linux/001
categories:
  - 后端
tags:
  - Linux
---

## 修改IP

```sh
cd /etc/sysconfig/network-scripts/

## 找到对应的网卡
vim ifcfg-ens33 
## 修改配置
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
#BOOTPROTO=dhcp
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens33
UUID=108c10f9-8607-43bd-8dc1-96924cbace4e
DEVICE=ens33

ONBOOT=yes
NETWORING=yes
## 静态ip
BOOTPROTO=static
## **.**.75.** 需要与VMware 子网地址保持一直 如图1-1
GATEWAY=192.168.75.2
DNS1=119.29.29.29
DNS2=182.254.116.116
## 图1-1最后一位地址不要与其他虚拟机冲突
IPADDR=192.168.75.190
NETMASK=255.255.255.0

```

<img src="http://qiniu.forlzs.cn/mdimage-20230328150854832.png" alt="image-20230328150854832" style="zoom: 67%;" />

图1-1