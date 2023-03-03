---
title: IDEA提升编码速度
date: 2023-03--03 10:18:59
permalink: /utils/idea/002
categories:
  - 工具
tags:
  - IDE
---

## 0x1 IDEA 提升编码速度Live Templates

:::tip

代码生成模板

File → Setting → Edit → Live Templates

:::

<img src="http://qiniu.forlzs.cn/mdimage-20230303101144436.png" class="zoom"/>

### Template text

示例 注释与代码块

```java
/**
 * 
 * @author:      Truman
 * @create:      $date$
 * @description: $description$
 * @link:        <a href="">
 * @1st   Rep:   $date$
 * @2nd   Rep:   TODO
 * @3rd   Rep:   
 * @4th   Rep:   
 * @Final Rep:   
**/

lock.lock();
try {
 
} catch (Exception e) {
  e.printStackTrace();
} finally {
  lock.unlock();
}
```

## Edit variables

> 对变量进行自动赋值，有系统自带方法，也可以自定义方法(`grooveScript`编写)

常见的方法

| 方法名                           | 作用                     | 实例                                                         |
| -------------------------------- | ------------------------ | ------------------------------------------------------------ |
| `date()`                         | 当前日期默认（2023/3/3） | 指定格式 `date("YYYY-MM--dd HH:mm:ss")`  2023-03--03 10:18:59 |
| `fileNameWithoutExtension()`     | 获取当前文件名           | `_002_IDEA`                                                  |
| `filePath()`                     | 绝对路径（从根开始算）   | `D:\note\doc\docs\utils\IDE\_002_IDEA.md`                    |
| `fileRelativePath()`             | 当前项目到文件的相对路径 | `docs\utils\IDE\_002_IDEA.md`                                |
| `user()`                         | 当前系统用户名           | `admin`                                                      |
| `underscoresToCamelCase(String)` | 替换下划线               | `002Idea`(组合使用：`underscoresToCamelCase(fileNameWithoutExtension())`) |

## 0x0 参考资料

1. [gz-郭小敏.【webstrom - Live Template - Edit variables】Edit variables翻译.CSDN.2019(1):1-1](https://blog.csdn.net/github_39570717/article/details/87918212)
