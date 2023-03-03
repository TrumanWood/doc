---
title: Shell脚本
date: 2023-03-2 23:37:33
permalink: /backend/shell/001
categories:
 - 后端
tags:
   - shell
---

## 0x1 Shell 脚本

:::tip

::: theorem 什么是shell
Shell 脚本很适合处理纯文本类型数据，且与Linux思想一致，一切皆文件。

Shell ：弱类型语言。
:::

## 0x2 shell 初探

编写shell：

```sh
#!/bin/bash 
echo 'hello world!'
```

运行shell脚本：

```sh
# 方法1  解释器 + 脚本 
sh hello.sh  

# 方法2 赋予脚本权限
chmod +x hello.sh
# 相对路径执行
./hello.sh

# 方式3 source + 脚本 OR . + 脚本 
source hello.sh
. hello.sh

```

### Shebang

> 指定合适的解释器，执行脚本。可采用`cat /etc/shells`查看当前系统支持的shell

- Bourne Shell（`#!/usr/bin/sh`或 `#!/bin/sh`）默认，可不写
- Bourne Again Shell（`#!/bin/bash`）
- C Shell（`#!/usr/bin/csh`）
- K Shell（`#!/usr/bin/ksh`）
- Shell for Root（`#!/sbin/sh`）
- python（`#!/usr/bin/python`）

## 0x3 Bash常用命令(特性)

### history

```sh
## 历史命令长度
echo $HISTSIZE
1000
## 存放用户历史命令的文件
echo $HISTFILE
/root/.bash_history

## history 命令
history -c  ## 清除history纪录（并没有删除.bash_history中的内容）按`↑` 不会有任何纪录
history -r  ## 恢复history纪录

## 调用历史纪录命令 `!+history行号`
[root@iZ2vc301ekb4u2tkdhlgqgZ shellScript]# !726
cd ..

### 执行上一次的命令 `!!` 或者 `↑` `↓`
[root@iZ2vc301ekb4u2tkdhlgqgZ home]# !!
cd ..

```

**其他快捷键：**

ctrl + a（光标到最前）、e（光标到最后）、u、k、l（L快速清屏）



## 0x4 Shell编程基础

### 变量

`''`不识别特殊符号（单引号）

`""`能识别特殊符号（双引号）

连续符号可以不加引号，空格则会引起歧义（无引号）

` `引用执行结果，等同于`$()`（反引号）



> 变量名=值  **不**得用**空格**分割（shell中 空格表示接收参数）

1. 只能以字母、下划线、数字（*不能是变量开头*）定义变量名
2. 变量名 严格区分大小写
3. 默认为字符串类型
4. `$`：读取变量



- 特殊变量`$?`

  - 0 ：表示上次命令执行 <font color="green">**成功**</font > 在后续编码中使用 `if`

  - 1~255 ：<font color="red">错误码</font>


### 父子shell

> `pstree `查看shell层级

- 每次使用 bin/sh 会开启一个子shell执行，因此不保留当前的shell的变量，

- shource 在当前shell环境加载脚本，因此会保留变量

```sh
## 编写一个脚本 make_vars.sh
#!bin/bash
name="张三"

```

测试`bin/sh`执行脚本

```sh
[root@iZ2vc301ekb4u2tkdhlgqgZ shellScript]# name="王大"
[root@iZ2vc301ekb4u2tkdhlgqgZ shellScript]# echo name
name
[root@iZ2vc301ekb4u2tkdhlgqgZ shellScript]# echo $name
王大
[root@iZ2vc301ekb4u2tkdhlgqgZ shellScript]# sh make_vars.sh 
[root@iZ2vc301ekb4u2tkdhlgqgZ shellScript]# echo $name
王大
```

测试`source` OR `.`执行脚本

```sh
[root@iZ2vc301ekb4u2tkdhlgqgZ shellScript]# source make_vars.sh 
[root@iZ2vc301ekb4u2tkdhlgqgZ shellScript]# echo $name
张三
```

### 系统变量

- 系统变量

  - 用户个人配置文件`~/.bash_profile`、`~/.bashrc`（远程登录用户特有文件）
  - 全局配置文件`/etc/profile`、`/etc/bashrc`，且系统建议最好创建在`/etc/profile.d` 避免修改全局配置文件

- 检查环境变量

  - set：输出所有变量（全局+局部[shell脚本中的局部变量]）`set |wc -l`查看变量行数
  - env：只显示全局变量
  - declare：输出所有变量，通set
  - export：显示和设置环境变量值

- 撤销环境变量

  - unset 变量名：删除变量/函数

- 设置只读变量

  - readonly：只有shell结束，只读变量才失效

  ```sh
  readonly name="zhangSan"
  name="liSi"
  -bash: name:只读变量
  ```

- 支持多命令执行，`;`分割

  ```sh
  ls /data;cd /tmp;pwd
  ```

### 特殊变量

> 主要用于Shell脚本中，函数参数传递使用

- `$0`：获取shell脚本**文件名**，以及**脚本路径**
- `$n`：获取shell脚本的**第n个参数**,n在1~9之间，如`$1`，`$2`，`$9` 大于9则需要写，`${10}`，参数空格隔开
- `$#`：获取执行的shell脚本后面的**参数总个数**
- `$*`：获取shell脚本所有参数，不加引号等同于`$@`作用，加上引号`"$*"`作用是 接收所有参数为单个字符串，`"$1 $2..."`
- `$@`：<font color="red">*不加引号，效果同上*</font>。 **加引号**，是接收所有参数为**独立字符串** N分数据，如"$1"  "$2"  "$3" ... 空格保留

<RecoDemo :collapse="true">
  <template slot="code-sh">
    <<< @/docs/backend/shell/code/_001_0x4_var.sh
  </template>
  <template slot="code-result">
    <<< @/docs/backend/shell/code/_001_0x4_var_r.sh
  </template> 
  <template slot="code-diff">
    <<< @/docs/backend/shell/code/_001_0x4_var_2.sh
  </template>
  <template slot="code-diff_result">
    <<< @/docs/backend/shell/code/_001_0x4_var_2_r.sh
  </template> 
</RecoDemo>



## 0x5





## 0x0 参考资料

1. [掌握Shell编程，一篇就够了.知乎.2022](https://zhuanlan.zhihu.com/p/102176365/)
2. [shell中获取时间.CSDN.2020](https://www.cnblogs.com/guanbin-529/p/12702186.html)
3. [Shell脚本入门5---Shell传递参数CSDN.2021](https://blog.csdn.net/ycq4853/article/details/120405282)
4. [菜鸟教程](https://www.runoob.com/linux/linux-shell.html)
5. [b站.讲运维听超哥.带你掌握shell脚本所有核心知识点，全程干货，无废话！.2022](https://www.bilibili.com/video/BV14L4y157Bv)