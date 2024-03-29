# 什么是Zookeeper

	ZooKeeper最早起源于雅虎公司研究院的一个研究小组。当时，研究人员发现，在雅虎内部很多大型的系统需要依赖一个类似的系统进行分布式协调，但是这些系统往往存在分布式单点问题，所以雅虎的开发人员就试图开发一个通用的无单点问题的分布式协调框架。
	
	单体应用在达到性能瓶颈之后，就必须靠分布式集群解决高并发问题，而集群的分布式架构和集群节点之间的交互一定少不了可靠的分布式协调工具，ZooKeeper就是目前极为重要的分布式协调工具。

# Zookeeper优点（CP模型）

	ZooKeeper的核心优势是实现了分布式环境的数据一致性，简单地说：每时每刻我们访问ZooKeeper的树结构时，不同的节点返回的数据都是一致的。也就是说，对ZooKeeper进行数据访问时，无论是什么时间，都不会引起“脏读”“幻读”“不可重复读”问题。


​	 
> 说明:
	        “不可重复读”和“幻读”的区别是：
	        “不可重复读”关注的重点在于记录的更新操作，对同样的记录，再次读取后发现返回的数据值不一样了；
	        “幻读”关注的重点在于记录新增或者删除操作（数据条数发生了变化），同样的条件第一次和第二次查询出来的记录数不一样。

---



[^ 1]:【本文来源】《Java高并发核心编程（卷1）：NIO、Netty、Redis、ZooKeeper》
