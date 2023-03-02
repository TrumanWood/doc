# Redis数据类型

```sh
## 查看过期时间
ttl key
-1 : 不过期
-2 : 已过期
>0 : TTL
nil : key不存在

## 获取所有缓存中的key 生产环境禁止使用(keys *)
keys pattern

## 切换数据库(每个数据库相互独立，数据不互通)
## 默认是0（0~15）Redis 默认有16个库 对应 配置文件：databases 16
select index

## 删除全部数据 生产环境禁止使用！
## 删除当前库
flushdb  [ASYNC]
## 删除全部库
flashall [ASYNC]
```



## String

### API

```sh
## 设置、获取、删除
set、 get、 del

## 设置缓存 过期时间可选 设置已经存在的key，会覆盖
set key value [EX]
## e.g
set name zhangsan

## 设置不存在的key（如果已经存在则返回0） 设置已经存在的key，不会覆盖
setnx key value
## e.g.1
setnx name lisi
(integer) 0
## e.g.2
setnx sex man
(integer) 1

## 对value追加
append key value
## e.g
127.0.0.1:6379> append name 1024
(integer) 12
127.0.0.1:6379> get name
"zhangsan1024"

## 获取缓存长度
STRLEN key
## e.g
127.0.0.1:6379> strlen name
(integer) 12

## 获取字符串指定区间值
getrange key start end
## e.g
127.0.0.1:6379> getrange name 0 -1
"zhangsan1024"
127.0.0.1:6379> getrange name 2 3
"an"
127.0.0.1:6379> get name 
"zhangsan1024"

## 修改value部分内容 (offset,str.len]
setrange key offset value
## e.g
127.0.0.1:6379> get name
"zhangsan1024"
127.0.0.1:6379> setrange name 8 0
(integer) 12
127.0.0.1:6379> get name
"zhangsan0024"

## 递增/递减 (只对数字有效)
## 递增
incr key
## 递减
decr key
## 递增指定值
INCRBY key value
## 递减指定值
DECRBY key value
## e.g
127.0.0.1:6379> set age 10
OK
127.0.0.1:6379> incr age
(integer) 11
127.0.0.1:6379> incr name
(error) ERR value is not an integer or out of range
127.0.0.1:6379> decr age
(integer) 10
127.0.0.1:6379> incrby age 10
(integer) 20
127.0.0.1:6379> decrby age 10
(integer) 10

## 批量设值
mset key value [key value ...]
## e.g
127.0.0.1:6379> mset key1 key1 key2 key2
OK

## 批量设值 唯一
msetnx key value [key value ...]
## e.g
## 如果key已存在则返回0
127.0.0.1:6379> msetnx key1 key11 key2 key222
(integer) 0
## 设置成功
127.0.0.1:6379> msetnx key4 key4 key5 key5
(integer) 1

```



## Hash

Hash存储结构类似如下：

```json
user:{
    name:zhangshan,
    age:18,
    sex:man
}
```

### API

```sh
## 存入一个值
hset key feild value
## e.g
127.0.0.1:6379> hset user name zhangshan
(integer) 1

## 获取hash中的属性
hget key feild
## e.g 类似 user.getName()
127.0.0.1:6379>  hget user name
"zhangshan"

## 批量设置属性
hmset key feild value [feild value ...]
## e.g 
127.0.0.1:6379> hmset user age 18 sex man
OK

## 批量获取属性
hmget key feild [feild ...]
## e.g
127.0.0.1:6379> hmget user name age
1) "zhangshan"
2) "18"

## 获取全部信息
hgetall key
## e.g 
127.0.0.1:6379> hgetall user
1) "name"
2) "zhangshan"
3) "age"
4) "18"
5) "sex"
6) "man"

## 获取属性个数
hlen key
## e.g
127.0.0.1:6379> hlen user
(integer) 3

## 获取所有属性名称
hkeys key
## e.g
127.0.0.1:6379> hkeys user
1) "name"
2) "age"
3) "sex"

## 获取所有值
hvals key
## e.g
127.0.0.1:6379> hvals user
1) "zhangshan"
2) "18"
3) "man"

## 对某个属性 递增整数、浮点数
hincrby key feild increment
hincrbyfloat key feild increment
## e.g
127.0.0.1:6379> hincrby user age 1
(integer) 19
127.0.0.1:6379> hincrbyfloat user age 1.1
"20.1"

## 判断属性是否存在 有1， 无：0
hexists key feild
## e.g
127.0.0.1:6379> hexists user key
(integer) 0
127.0.0.1:6379> hexists user name
(integer) 1

## 删除字段
hdell key feild [feild ...]
## e.g 成功删除1： 失败：0
127.0.0.1:6379> hdel user age 
(integer) 1
127.0.0.1:6379> hdel user key
(integer) 0

```



## List

>  [ ] ->
>
> <-[ ]

### API

```sh
## lpush 链表 头插法 
lpush key value [value ...]
## rpush 链表 尾插法
rpush key value [value ...]
## 获取list值 -1:表示无穷大到最有一位
lrange key start stop
## e.g
127.0.0.1:6379> lpush list1 1 2 3 4 5
(integer) 5
127.0.0.1:6379> lrange list1 0 -1
1) "5"
2) "4"
3) "3"
4) "2"
5) "1"
127.0.0.1:6379> rpush list2 1 2 3 4 5
(integer) 5
127.0.0.1:6379> lrange list2 0 -1
1) "1"
2) "2"
3) "3"
4) "4"
5) "5"

## 取得链表头
lpop key
## 取得链表尾
rpop key
## e.g
127.0.0.1:6379> lpop list1
"5"
127.0.0.1:6379> lrange list1 0 -1
1) "4"
2) "3"
3) "2"
4) "1"
127.0.0.1:6379> rpop list1
"1"
127.0.0.1:6379> lrange list1 0 -1
1) "4"
2) "3"
3) "2"

## 获取链表长度
llen key
## e.g
127.0.0.1:6379> llen list1
(integer) 3

## 获取链表下标的值 [0, len-1]
lindex key index
## e.g
127.0.0.1:6379> lindex list2 1
"3"
127.0.0.1:6379> lindex list1 5
(nil)

## 向链表插入数据
linsert key BEFORE|AFTER pivot value
## e.g
127.0.0.1:6379> lrange list2 0 -1
1) "2"
2) "3"
3) "4"
127.0.0.1:6379> linsert list2 before 3 aaa
(integer) 4
127.0.0.1:6379> linsert list2 after 3 aaa
(integer) 5
127.0.0.1:6379> lrange list2 0 -1
1) "2"
2) "aaa"
3) "3"
4) "aaa"
5) "4"
## 如果有重复 那么则找到第一个 BEFORE|AFTER 插入
127.0.0.1:6379> linsert list2 after aaa bbb
(integer) 6
127.0.0.1:6379> lrange list2 0 -1
1) "2"
2) "aaa"
3) "bbb"
4) "3"
5) "aaa"
6) "4"

## 截取list
ltrim key start stop
## e.g
127.0.0.1:6379> ltrim list2 1 2
OK
127.0.0.1:6379> lrange list2 0 -1
1) "aaa"
2) "bbb"

## 删除count个重复数据
lrem key count value 
127.0.0.1:6379> lpush list2 1 aaa 2 3 aaa  4 5
(integer) 7
127.0.0.1:6379> lrange list2 0 -1
1) "5"
2) "4"
3) "aaa"
4) "3"
5) "2"
6) "aaa"
7) "1"
127.0.0.1:6379> lrem list2 2 aaa
(integer) 2
127.0.0.1:6379> lrange list2 0 -1
1) "5"
2) "4"
3) "3"
4) "2"
5) "1"

```

## Set

> 去重、差集计算、随机抽签

### API 

```sh
## 添加数据
sadd key member [member ...]
## 获取数据
smembers key
## e.g
127.0.0.1:6379> sadd set1 1 2 3 4 6 8 10
(integer) 7
127.0.0.1:6379> sadd set2 2 5 7 9 11
(integer) 5
127.0.0.1:6379> SMEMBERS set1
1) "1"
2) "2"
3) "3"
4) "4"
5) "6"
6) "8"
7) "10"

## 获取set 长度
127.0.0.1:6379> SCARD set1
(integer) 7

## 判断集合是否包含元素
sismember key member
## e.g 包含：1   不包含：0
127.0.0.1:6379> sismember set1 3
(integer) 1
127.0.0.1:6379> sismember set1 9
(integer) 0

## 返回随机count个元素
srandmember key count
## e.g
127.0.0.1:6379> srandmember set1 2
1) "8"
2) "4"

## 将 member 元素从 source 集合移动到 destination 集合
smove source destination member
## e.g
127.0.0.1:6379> smove set1 set2 10
(integer) 1
127.0.0.1:6379> smembers set2
1) "7"
2) "5"
3) "2"
4) "9"
5) "10"
6) "11"
127.0.0.1:6379> smembers set1
1) "1"
2) "2"
3) "3"
4) "4"
5) "6"
6) "8"

## set 差集、交集、并集。 不存在的 key 被视为空集。
## 差集 sdiff 
sdiff key [key ...]
## e.g
127.0.0.1:6379> sdiff set1 set2
1) "1"
2) "3"
3) "4"
4) "6"
5) "8"

##  交集 sinter
sinter key [key ...]
## e.g
127.0.0.1:6379> sinter set1 set2
1) "2"

## 并集 sunion
sunion key [key ...]
## e.g
127.0.0.1:6379> sunion set1 set2
 1) "1"
 2) "2"
 3) "3"
 4) "4"
 5) "5"
 6) "6"
 7) "7"
 8) "8"
 9) "9"
10) "10"
11) "11"

```



## Zset

>  带分数的有序集合

```sh
## 添加数据
zadd key score member [score member ...]
## e.g
127.0.0.1:6379> zadd zset1 63 zhangsan 59 lisi 77 wangwu 90 zhaoliu  
(integer) 4

## 查看集合
## 查看key
zrange key start stop
## 查看 key && score
zrange key start stop withscores
## e.g
127.0.0.1:6379> zrange zset1 0 -1
1) "lisi"
2) "zhangsan"
3) "wangwu"
4) "zhaoliu"
127.0.0.1:6379> zrange zset1 0 -1 withscores
1) "lisi"
2) "59"
3) "zhangsan"
4) "63"
5) "wangwu"
6) "77"
7) "zhaoliu"
8) "90"

## 查看集合长度
zcard key
## e.g
127.0.0.1:6379> zcard zset1
(integer) 4

## 查看key的排名,返回名次[0~len-1]
zrank key member
## e.g
127.0.0.1:6379> zrank zset1 zhangsan
(integer) 1

## 查看member的分数
zscore key member
## e.g
127.0.0.1:6379> zscore zset1 zhangsan
"63"

## 查看[min, max]范围内的元素个数
zcount key min max
## e.g
127.0.0.1:6379> zcount zset1 59 77
(integer) 3
## 不包含查询
127.0.0.1:6379> zcount zset1 (59 (77
(integer) 1

## 查询区间[min, max]内的元素
zrangebyscore key min max
zrangebyscore key min max withscores 
zrangebyscore key min max withscores limit offset count
127.0.0.1:6379> zrangebyscore zset1 59 77 
1) "lisi"
2) "zhangsan"
3) "wangwu"
127.0.0.1:6379> zrangebyscore zset1 59 77  withscores 
1) "lisi"
2) "59"
3) "zhangsan"
4) "63"
5) "wangwu"
6) "77"
127.0.0.1:6379> zrangebyscore zset1 59 77  withscores limit 0 2
1) "lisi"
2) "59"
3) "zhangsan"
4) "63"

## 删除元素
zrem key member
127.0.0.1:6379> zrem zset1 lisi
(integer) 1
127.0.0.1:6379> zrange zset1 0 -1 
1) "zhangsan"
2) "wangwu"
3) "zhaoliu"
127.0.0.1:6379> zrange zset1 0 -1 withscores
1) "zhangsan"
2) "63"
3) "wangwu"
4) "77"
5) "zhaoliu"
6) "90"

```

# Redis 常见应用

## 发布与订阅

```sh
## 订阅端
subscribe channel [channel ... ]
## e.g
subscribe stu-backend stu-front food
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "stu-backend"
3) (integer) 1
1) "subscribe"
2) "stu-front"
3) (integer) 2
1) "subscribe"
2) "food"
3) (integer) 3


## 发布端
publish channel message
## e.g:
127.0.0.1:6379> publish stu-backend java 
(integer) 1
## -----------  subscribe  -----------
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "stu-backend"
3) (integer) 1
1) "subscribe"
2) "stu-front"
3) (integer) 2
1) "subscribe"
2) "food"
3) (integer) 3
1) "message"
2) "stu-backend"
3) "java"

## 批量订阅
psubscribe pattern [pattern... ]
## e.g
127.0.0.1:6379> psubscribe stu-*
Reading messages... (press Ctrl-C to quit)
1) "psubscribe"
2) "stu-*"
3) (integer) 1
## -----------   publish  -----------
127.0.0.1:6379> publish stu-backend python
(integer) 2
## ----------- subscribe  -----------
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "stu-backend"
3) (integer) 1
1) "subscribe"
2) "stu-front"
3) (integer) 2
1) "subscribe"
2) "food"
3) (integer) 3
1) "message"
2) "stu-backend"
3) "java"
1) "message"
2) "stu-backend"
3) "python"
## ----------- psubscribe  -----------
Reading messages... (press Ctrl-C to quit)
1) "psubscribe"
2) "stu-*"
3) (integer) 1
1) "pmessage"
2) "stu-*"
3) "stu-backend"
4) "python"
```



# 持久化

## RDB

> 快照模式，每个特定的时间保存缓冲中的数据

### 优点：

单独保存到一个文件中、恢复快、方便灾备、子进程进行保存（I/O操作），父进程不操作I/O

### 缺点：

可能在最后一次备份的时候出错，导致数据丢失（可以容忍数据丢失 可忽略）

如果数据集比较大（子进程与父进程一模一样），那么CPU的占用就会很高（如果CPU、内存 硬件性能高 则忽略）

非实时同步

### 相关配置 redis.conf

```sh
## 如果1个缓存更新，则15分钟后备份
## 如果10个缓存更新，则5分钟后备份
## 如果10000个缓存更新，则1分钟后备份
## 如果3个缓存更新，则10s后备份

save 900 1
save 300 10
save 60 10000
save 10 3

## yes：如果save过程出错，则停止写操作
## no：可能造成数据不一致
stop-writes-on-bgsave-error

## yes：开启rdb压缩模式
## no：关闭，会节约cpu损耗，但是文件会大，道理同nginx
rdbcompression

## 校验的规则（CRC64）
## yes: 开启  大约有10%的性能损耗
## no:  关闭
rdbchecksum yes
```



## AOF

> 全量备份，已日志的方式纪录（写操作）

### 优点

### 缺点：

相同数据集，文件大小相同时： AOF > RDB (费空间 )

 # Redis 主从

读写分离,当时当master节点挂了之后则，不会选举salve 成为master

1 master +  奇数slave（1、3、5）

## 配置redis.conf

```sh
## 在salve节点牌子
replicaof <masterip> <masterport>
## e.g 
replicaof 192.168.75.100 6379

## 配置密码
masterauth password
## e.g
masterauth 123456

## slave 节点是否只读
replica-read-only yes
```



# Redis 哨兵模式

sentinel.conf

```sh
cp sentinel.conf /usr/local/redis/

## Base
## 更改bind 地址（或者注释掉）
# 127.0.01 192.168.1.1

protected-mode no
port 26379
daemonize yes
pidfile /var/run/redis-sentinel.pid
logfile /usr/local/redis/sentinel/redis-sentinel.log
dir /usr/local/redis/sentinel

## core
sentinel monitor test-master 192.168.75.100 6379 2
sentinel auth-pass test-master 123456
sentinel down-after-milliseconds test-master 1000
sentinel parallel-syncs test-master 1
sentinel failover-timeout testmaster 180000
```



# Redis 集群

槽 slot（16384）



# Redis 缓存穿透

> 查询缓存、数据库中没有的数据，导致大量请求打到DB上

## 解决方案

1. 缓存空对象（实现简单，一定要添加过期时间）
   1. 缺点：可能存在大量无用值
2. 布隆过滤器
   1. 不在的一定不在，存在的不一定存在（有部分误判率）
   2. 缺点：不能实时更新，需要重启

# Redis 缓存穿刺(缓存击穿)

> 缓存击穿强调**单个key数据过期 + 高并发** 导致大量请求到DB上

## 解决方案

1. 如有必要，隔离
   1. 机房、环境、集群、进程、线程、资源等
2. 保证热点数据在缓存中
   1. 排查宕机，慢查询
   2. 缓存优化、扩容
   3. 设置缓存永不过期
   4. 定时任务刷新缓存与过期时间
3. 防止缓存中没有热点数据
   1. 将高并发降为地并发（分布式锁）
      - 数据库唯一键
      - 数据库悲观锁
      - 基于redis的setnx原理
      - 基于Redisson实现
      - 基于Zookeeper实现

# Redis缓存雪崩

> 某一个时间大量的key 过期，而恰好大量请求过来到DB上

## 雪崩预防

1. 永不过期
2. 过期时间错开
3. 多缓存结合（二级缓存Memcache，同样的key放在不同的cache层，过期时间不一样）
4. 采购第三方Redis
5. 互斥锁，由高并发转换成低并发，保护DB
6. 热点隔离，实时热点发现系统；
7. 水平扩容数据库，压力平摊，保护DB
8. 提前压测，得出阈值，限流处理，保护服务与DB

# Redis 批量操作--pipeline







[^ 1]:redis 命令： http://redisdoc.com/
[^ 2]: redis 备份: https://redis.io/docs/manual/persistence/
[^ 3]: 哨兵模式: https://redis.io/docs/manual/sentinel/
