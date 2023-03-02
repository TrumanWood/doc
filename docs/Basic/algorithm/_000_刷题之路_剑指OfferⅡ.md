---
title: 算法&数据结构 刷题之路
date: 2022-08-25 15:39:13
permalink: /algorithm/st/001
sidebar: 'auto'
categories:
    - 基础
tags:
    - 算法&数据结构
---

## 特殊符号

> Difficulty：
>
> Easy、Medium、Hard
>
> <font color="#ffb400">easy </font>、<font color="#00af9b">Medium </font> 、<font color="#ff2d55">Hard</font>
>
> ```html
> <font color="#ffb400">easy </font>
> <font color="#00af9b">Medium </font> 
> <font color="#ff2d55">Hard</font>
> 
> <!-- Y / N -->
> <font color="#67C23A">N</font>
> <font color="#F56C6C">Y</font>
> ```
>
> 
>
> Symbol:
>
> √ 、× 、  



## [剑指Offer 第二版](https://leetcode.cn/problem-list/xb9nqhhg/)

| Question                                                     |              difficulty              |             isRep              | 1st Rep | 2nd Rep | 3rd Rep（1D） | 4th Rep（7D） | Final Rep | Last Rep              | summary                                                      |
| :----------------------------------------------------------- | :----------------------------------: | :----------------------------: | :-----: | :-----: | :-----------: | :-----------: | :-------: | :-------------------- | :----------------------------------------------------------- |
| [剑指 Offer 24. 反转链表](https://leetcode.cn/problems/fan-zhuan-lian-biao-lcof/) |  <font color="#ffb400">easy</font>   | <font color="#F56C6C">Y</font> |    √    |    √    |       √       |       √       |           | 20220831              | ①：注意指针的指向(**画图**)<br />pre、cur、next<br />②：递归实现 (注意`头结点`处理) |
| [剑指 Offer 10- I. 斐波那契数列](https://leetcode.cn/problems/fei-bo-na-qi-shu-lie-lcof/) |  <font color="#ffb400">easy</font>   | <font color="#67C23A">N</font> |    √    |    √    |       √       |       —       |     —     | 20220827              | **需要取模！**（需要取模 1e9+7（1000000007））               |
| [剑指 Offer 64. 求1+2+…+n](https://leetcode.cn/problems/qiu-12n-lcof/) | <font color="#00af9b">Medium </font> | <font color="#67C23A">N</font> |    √    |    √    |       √       |       —       |     —     | 20220831<br/>20220901 | ①：[等差数列](https://baike.baidu.com/item/%E7%AD%89%E5%B7%AE%E6%95%B0%E5%88%97%E6%B1%82%E5%92%8C%E5%85%AC%E5%BC%8F/7527418?fr=aladdin)：$\frac{n(a_1 + a_n)}2 $<br />②：递归：从后往前加 |
| [剑指 Offer 18. 删除链表的节点](https://leetcode.cn/problems/shan-chu-lian-biao-de-jie-dian-lcof/) |  <font color="#ffb400">easy</font>   | <font color="#F56C6C">Y</font> |    √    |    √    |       √       |               |           | 20220831<br/>20220901 | ①： 操作指针<br />②： 递归                                   |
| [剑指 Offer 06. 从尾到头打印链表](https://leetcode.cn/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/) |  <font color="#ffb400">easy</font>   | <font color="#67C23A">N</font> |    √    |    √    |       —       |       —       |     —     | 20220901              | 两边遍历即可 count                                           |
| [剑指 Offer 22. 链表中倒数第k个节点](https://leetcode.cn/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/) |  <font color="#ffb400">easy</font>   | <font color="#67C23A">N</font> |    √    |    —    |       —       |       —       |     —     | 20220901              | 两边遍历即可 count                                           |
| [剑指 Offer 53 - I. 在排序数组中查找数字 I](https://leetcode.cn/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/) |  <font color="#ffb400">easy</font>   | <font color="#67C23A">N</font> |    √    |    —    |       —       |       —       |     —     | 20220902              | ①：暴力解法 $O(n)$<br />②： 二分查找 $O(logn)$               |
| [剑指 Offer 53 - II. 0～n-1中缺失的数字](https://leetcode.cn/problems/que-shi-de-shu-zi-lcof/) |  <font color="#ffb400">easy</font>   | <font color="#67C23A">N</font> |    √    |    —    |       —       |       —       |     —     | 20220902              | 注意是从 0 ~ n-1                                             |
| [剑指 Offer 04. 二维数组中的查找](https://leetcode.cn/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/) | <font color="#00af9b">Medium </font> | <font color="#F56C6C">Y</font> |    √    |    √    |               |               |           | 20220904              | ① 暴力解法                                                   |
| [剑指 Offer 05. 替换空格](https://leetcode.cn/problems/ti-huan-kong-ge-lcof/) |  <font color="#ffb400">easy</font>   | <font color="#67C23A">N</font> |    √    |    √    |       —       |       —       |     —     | 20220908              |                                                              |
|                                                              |                                      |                                |         |         |               |               |           |                       |                                                              |

