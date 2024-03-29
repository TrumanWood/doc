---
title: 为什么要使用RabbitMQ
date: 2023-01-28
permalink: /backend/mq/rabbitmq/000
categories:
  - 后端
tags:
  - MQ
---
## **为什么要使用RabbitMQ？**

**1.解耦**

系统A在代码中直接调用系统B和系统C的代码，如果将来D系统接入，系统A还需要修改代码，过于麻烦。

**2.异步**

将消息写入消息队列，非必要的业务逻辑以异步的方式运行，加快响应速度。

**3.削峰**

并发量大的时候，所有的请求直接怼到数据库，造成数据库连接异常

## RabbitMQ原理和架构

![](assets/0.png)



## RabbitMQ 的工作模式

**1、简单模式**

![](./assets/1.png)

**2、主题模式(topic)**

生产者，一个交换机(topicExchange)，模糊匹配路由规则，多个队列，多个消费者。

![](./assets/2.png)

**3、订阅与发布模式(fanout)**

生产者，一个交换机(fanoutExchange)，没有路由规则，多个队列，多个消费者。生产者将消息不是直接发送到队列，而是发送到X交换机，然后由交换机发送给两个队列，两个消费者各自监听一个队列，来消费消息。



![](./assets/3.png)

**4、路由模式(direct)**

生产者，一个交换机(directExchange)，路由规则，多个队列，多个消费者。主要根据定义的路由规则决定消息往哪个队列发送。

![](./assets/4.png)

**5、RPC模式**

对于RPC请求，客户端发送一条带有两个属性的消息：replyTo,设置为仅为请求创建的匿名独占队列，和correlationId,设置为每个请求的唯一id值。请求被发送到rpc_queue队列。RPC工作进程在队列上等待请求。当一个请求出现时，它执行任务，并使用replyTo字段中的队列将结果发回客户机。客户机在回应消息队列上等待数据。当消息出现时，它检查correlationId属性。如果匹配请求中的值，则向程序返回该响应数据。

**6、工作队列**

注释：默认情况下，RabbitMQ将按顺序将每条消息发送给下一个消费者，平均而言，每个消费者将获得相同数量的消息，这种分发消息的方式称为循环法。

![](./assets/6.png)









[RabbitMQ原理和架构图解(附6大工作模式)](https://mp.weixin.qq.com/s?__biz=Mzg2NTg1NTQ2NQ==&mid=2247496376&idx=1&sn=30ffcf9fd4a502c4bac5b2dffe3c42f9&chksm=ce51003ef92689281ed31e6484052a5dad40d5fe3921b78641926e50ab6b0f919fe460f3ca17&scene=126&&sessionid=1664372968#rd)