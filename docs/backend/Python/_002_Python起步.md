---
title: python中的真假
date: 2022-08-23 09:36:22
permalink: /backend/Python/002
categories:
-
tags:
- 
---

# Python Base
> 动态类型语言
## 解释器
|解释器|说明|
|  ----  | ----  |
|CPython|官方出品，C语言实现 |
| PyPy| Python实现 | 
|stackless |Python的增强版本解释器，不使用CPython的C的栈，采用微线程（协程），并发编程 |
## 基础类型
> Python 中没有常量
>  type() 进行类型检查
>  
### 数字
#### 整数 int
在==python3== 中不在区分long、int，long被重命名为int，所以python3中只有int，且可以表示任意大小的数值。
#### 浮点数 float
#### 布尔 Boolean
#### 复数complex

### 字符串
- ' '
- " "
- ''' '''
- 转义字符
	-  '\' 转义
	-  \ 续行符
	- r 前缀:  R前缀将字符串不要转义（广泛用于路径）
	- f 前缀：F前缀，插值字符串
```python
## 转义 \
a = r'c:\windows\nt'
print(a)
// c:\windows
// t

## 续行符
a = 'c:\windows\\nt'\
'ahsabhjn'
print(a)
// c:\windows\ntahsabhjn

## R 前缀
a = r'c:\windows\nt'
print(a)
//  c:\windows\nt

## F前缀
b = "1243"
c = "abcd"
d = f'{b}---------{c}'
print(d)
// 1243---------abcd
```
	
## Python 内置函数 __import__() (built-in function)
### type()
### isinstance()
### input()
### print()
```python
print(value, ..., sep=' ', end='\n', file=sys.stdout, flush=False)
```
### math
```python
import  math
## 向上取整
print(math.ceil(1.3))
## 向下取整
print(math.floor(1.3))
## 2
## 1
```
### round() 找最近的偶数
```python
round(0.5),round(1.5),round(3.5)
## (0, 2, 4)
```
### max
### min
### range()惰性可迭代对象，计数器，数据范围[x,y)，默认0开始
Return an object that produces a sequence of integers from start (inclusive)
to stop (exclusive) by step.  range(i, j) produces i, i+1, i+2, ..., j-1.
start ==defaults to 0==, and stop is omitted!  range(4) produces 0, 1, 2, 3.
These are exactly the valid indices for a list of 4 elements.
When step is given, it specifies the increment (or decrement).
```python
range(stop) -> range object
range(start, stop[, step]) -> range object

## 找到10内的奇数
# function_1:
for i in range(10):
	if(i & 1):
		print(i)
# function_2:
for i in range(1,10,2):
	print(i)
```

## 内建函数 常用数据结构
### 序列 sequence
- 字符串 str、字节序列 bytes、 bytearray
- 列表 list(底层是**数组**)、元组 tuple

list支持正索引（0 ~ len-1），也支持负索引（-1~ -len）
```python
a0 = list()
a1 = []
a = list(range(5)) ## 惰性对象，从range对象遍历所有元素，组件一个新的列表
b = list([1,2,3,'abc']) ## 立即分配内存 从 [1,2,3,'abc']中遍历所有元素，组件新的列表


```


### 键值对
- 集合 set、 字典 dict 
```python

```