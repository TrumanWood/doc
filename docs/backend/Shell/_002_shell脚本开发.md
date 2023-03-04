---
title: Shell脚本开发
date: 2023-03--03 21:04:15
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

## Shell数值运算