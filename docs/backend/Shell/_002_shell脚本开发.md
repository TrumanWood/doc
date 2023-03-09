---
title: Shell脚本开发
date: 2023-03-05 21:04:15
permalink: /backend/shell/002
categories:
  - 后端
tags:
  - shell
---

# Shell脚本

:::tip

随着处理的逻辑越来越多，若按照之前的方式：```for var in `ls`;do mv ${var} ${var/_finished/} ;done```来处理则显得有些难为自己了，那么如何才能构建更为庞大复杂的脚本呢？

那么现在我们将开启一个新的篇章，使用更为复杂的脚本与处理逻辑来构建shell脚本

:::

## 0x1 Shell数值运算

> ++
>
> --
>
> a++：先对a操作，再+1
>
> ++a：先+1，再对a操作

#### Shell中常见的算术运算命令

| 运算操作符与运算命令 | 意义                                                         | 举例                                                         |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| (())                 | **整数**运算，效率高                                         | `echo $((1+2))` 输出是需要加`$`；<br />`((i=10+5))`;<br />`b=$((3+5))` |
| let                  | 整数运算，类似于`(())`                                       | `let num=5+4`                                                |
| expr                 | 整数运算，还有其他额外功能（统计字符长度、逻辑判断、模式匹配）接收以空格分割的参数来处理<br />`:`：冒号计算字符长度<br />`.*`：任意字符串重复0或者多次(*后面可以自定义) | 计算：`expr 3 \* 5`<br />统计字符长度：`expr length asdasdasd`<br />逻辑判断：`expr 8 \< 6` 0:False; 1:True<br />模式匹配：`expr adasdasd "":" ".*"`  ;<br />`expr yc.jpg.png":"  ".*\.jpg"` |
| bc                   | Linux下的一个计算器程序（适合整数和小数运算）交互式          | 结合管道：`echo "4*4" `<br />`echo {1..100} |tr " " "+" |bc` |
| $[]                  | 整数运算                                                     | `echo $[3+3]`                                                |
| awk                  | 整数运算和小数运算                                           | `echo "2 5" |awk '{print ($1+$2)}'`                          |
| declare              | 定义变量值和属性，-i参数可以用于整形变量做运算               |                                                              |

```sh
# 生成序列
## 1+2+3+...100
## 方式一： seq -s 指定分隔符
seq -s "+" 100
## 方式二：tr 替换
echo {1..100} | tr " " "+"

# 计算序列
## 1.
echo $((`seq -s "+" 100`))
## 2.
seq -s " + " 100 | xargs expr
## 3.
echo `seq -s "+" 100`|bc
```



#### 算术运算符

| 运算符 | 说明                                          | 举例                          |
| :----- | :-------------------------------------------- | :---------------------------- |
| +      | 加法                                          | `expr $a + $b` 结果为 30。    |
| -      | 减法                                          | `expr $a - $b` 结果为 -10。   |
| *      | 乘法                                          | `expr $a \* $b` 结果为  200。 |
| /      | 除法                                          | `expr $b / $a` 结果为 2。     |
| %      | 取余                                          | `expr $b % $a` 结果为 0。     |
| =      | 赋值                                          | a=$b 把变量 b 的值赋给 a。    |
| ==     | 相等。用于比较两个数字，相同则返回 true。     | [ $a == $b ] 返回 false。     |
| !=     | 不相等。用于比较两个数字，不相同则返回 true。 | [ $a != $b ] 返回 true。      |

#### 关系运算符

> IF 中可使用

| 运算符在[]中使用 | 在[[]] 或者 (())中可使用 | 说明                                                         | 举例                       |
| :--------------- | ------------------------ | :----------------------------------------------------------- | :------------------------- |
| -eq              | == 或 =                  | 检测两个数是否相等，相等返回 true。 等价与 ==                | [ $a -eq $b ] 返回 false。 |
| -ne              | !=                       | 检测两个数是否不相等，不相等返回 true。 等价与 !=            | [ $a -ne $b ] 返回 true。  |
| -gt              | >                        | 检测左边的数是否大于右边的，如果是，则返回 true。 等价与 >   | [ $a -gt $b ] 返回 false。 |
| -lt              | <                        | 检测左边的数是否小于右边的，如果是，则返回 true。 等价与<    | [ $a -lt $b ] 返回 true。  |
| -ge              | >=                       | 检测左边的数是否大于等于右边的，如果是，则返回 true。等价与>= | [ $a -ge $b ] 返回 false。 |
| -le              | <=                       | 检测左边的数是否小于等于右边的，如果是，则返回 true。 等价与<= | [ $a -le $b ] 返回 true。  |

#### 布尔运算符

| 运算符[]中使用 | [[]]、(())中使用 | 说明                                                | 举例                                     |
| :------------- | ---------------- | :-------------------------------------------------- | :--------------------------------------- |
| !              | !                | 非运算，表达式为 true 则返回 false，否则返回 true。 | [ ! false ] 返回 true。                  |
| -o             | \|\|             | 或运算，有一个表达式为 true 则返回 true。           | [ $a -lt 20 -o $b -gt 100 ] 返回 true。  |
| -a             | &&               | 与运算，两个表达式都为 true 才返回 true。           | [ $a -lt 20 -a $b -gt 100 ] 返回 false。 |

```sh
[root@iZ2vc301ekb4u2tkdhlgqgZ shellScript]#  [ ! -f make_vars ] && echo "ok" || echo no
ok
```



#### 逻辑运算符

| 运算符 | 说明                  | 举例                                       |
| :----- | :-------------------- | :----------------------------------------- |
| &&     | 逻辑的 AND 与 -a 一样 | [[ $a -lt 100 && $b -gt 100 ]] 返回 false  |
| \|\|   | 逻辑的 OR 与 -o 一样  | [[ $a -lt 100 \|\| $b -gt 100 ]] 返回 true |

#### 字符串运算符

| 运算符 | 说明                                                       | 举例                     |
| :----- | :--------------------------------------------------------- | :----------------------- |
| =      | 检测两个字符串是否相等，相等返回 true。(等号 左右得有空格) | [ $a = $b ] 返回 false。 |
| !=     | 检测两个字符串是否不相等，不相等返回 true。                | [ $a != $b ] 返回 true。 |
| -z     | 检测字符串**长度**是否**为0**，为0返回 true。              | [ -z $a ] 返回 false。   |
| -n     | 检测字符串**长度**是否**不为 0**，不为 0 返回 true。       | [ -n "$a" ] 返回 true。  |
| $      | 检测字符串是否不为空，不为空返回 true。                    | [ $a ] 返回 true。       |

```sh
[root@iZ2vc301ekb4u2tkdhlgqgZ shellScript]# test -z "" && echo ok || echo no
ok
[root@iZ2vc301ekb4u2tkdhlgqgZ shellScript]# test -n "" && echo ok || echo no
no
```



#### 文件测试运算符

| 操作符      | 说明                                                         | 举例                      |
| :---------- | :----------------------------------------------------------- | :------------------------ |
| **-e file** | 检测文件（包括目录）是否存在，如果是，则返回 true。          | [ -e $file ] 返回 true。  |
| **-f file** | 检测文件是否是普通文件（既不是目录，也不是设备文件），如果是，则返回 true。 | [ -f $file ] 返回 true。  |
| **-d file** | 检测文件是否是目录，如果是，则返回 true。                    | [ -d $file ] 返回 false。 |
| -b file     | 检测文件是否是块设备文件，如果是，则返回 true。              | [ -b $file ] 返回 false。 |
| -c file     | 检测文件是否是字符设备文件，如果是，则返回 true。            | [ -c $file ] 返回 false。 |
| -S          | 文件名是否Socket文件                                         |                           |
| -p file     | 检测文件是否是有名**管道**（**pipe**），如果是，则返回 true。 | [ -p $file ] 返回 false。 |
| -L file     | 该文件名是否为一个连结档                                     |                           |
|  |  | |
|  |  | |
| -r file     | 检测文件是否**可读**，如果是，则返回 true。                  | [ -r $file ] 返回 true。  |
| -w file     | 检测文件是否**可写**，如果是，则返回 true。                  | [ -w $file ] 返回 true。  |
| -x file     | 检测文件是否**可执行**，如果是，则返回 true。                | [ -x $file ] 返回 true。  |
| -g file     | 检测文件是否设置了 SGID 位，如果是，则返回 true。            | [ -g $file ] 返回 false。 |
| -k file     | 检测文件是否设置了粘着位(Sticky Bit)，如果是，则返回 true。  | [ -k $file ] 返回 false。 |
| -s file     | 检测文件是否为空（文件大小是否大，则返回 true。            | [ -u $file ] 返回 false。 |
|于0），不为空返回 true。     | [ -s $file ] 返回 true。  ||
| -u file     | 检测文件是否设置了 SUID 位，如果是||
```sh
[root@iZ2vc301ekb4u2tkdhlgqgZ shellScript]# test -d make_vars.sh && echo ok || echo no
no
[root@iZ2vc301ekb4u2tkdhlgqgZ shellScript]# test -e make_vars.sh && echo ok || echo no
ok
[root@iZ2vc301ekb4u2tkdhlgqgZ shellScript]# test -f make_vars.sh && echo ok || echo no
ok
```



## 0x2 流程控制

#### 分支

> 条件判断中，取变量必须**带引号**

| 条件测试语句      | 说明                                                      | 举例                                      |
| ----------------- | --------------------------------------------------------- | ----------------------------------------- |
| test 测试表达式   | test 空格 表达式                                          | `test -d make_vars.sh `                   |
| [  测试表达式 ]   | 和test等价，必须是：中括号空格test空格中括号              | `[ -f hello.txt ] && echo "已存在"  `     |
| [[  测试表达式 ]] | 必须是：中括号空格test空格中括号，只有[[]]支持 **通配符** | ` [[] -f hello.txt ]] && echo "已存在"  ` |
| ((测试表达式))    |                                                           |                                           |



```sh
## 格式要求  if[空格 空格]
if [ 条件 ]
	then
		do something
elif test 条件
	then
		do something
else
	do something
fi

if[ 条件1 ] && [ 条件2 ] ...
	then
		do something
fi
```

```sh
#!/bin/bash
## 查看available 的数值（可用内存）
## NR==2 获取第二行 （N行）
## NF N列
FreeMem=`free -m|awk 'NR==2 {print $NF}'`
if [ "$FreeMem" -lt "1024" ]
	then
		echo "当前内存${FreeMem}"
fi		
```



#### 循环

break 命令

```sh
##while
while 条件
	do
		do somethng
done


```

## 0x3 监控

#### 本地监控

```sh
## 监控服务进程或者进程数
ps -ef|grep nginx|wc -l
netstat -tunlp | grep nginx | wc -l
ss -tunlp | grep nginx | wc -l
## 端口检测
lsof -i tcp:80
```



#### 远程监控

```sh
# 端口检测
## nmap 端口扫描工具
yum install telnet nmap nc -y
telnet
nc
# 客户端模拟用户访问
wget
curl
```



## 0x4 函数

> 与Linux 的别名类似;`alias catnetwork="cat /etc/sysconfig/network-scripts/ifcfg-eth0"`

需要先定义后执行：

```sh
sayHello(){
	echo "hello"
}
syaHello

function sayHello(){
	echo "hello"
	return 返回值
}
syaHello

function sayHello{
	echo "hello"
	return 返回值
}
syaHello
```

