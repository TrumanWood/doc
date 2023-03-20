---
title: 初识 JVM 
date: 2023-01-28
permalink: /java/jvm/001
categories:
 - 后端
tags:
  - Java
  - JVM
  - JIT
  - 方法内联
  - 逃逸分析
---

# JVM 基本认识

## JIT 即时编译器

> JIT编译是以 **整个方法为单位** 去进行编译，并编译成机器码
- 如何判断 **热点代码**
  - 方法被频繁调用N次（client端： N = 1500; server端 N = 10000）
  - 循环体被循环N次
  
- 如何去记录N的次数
  - 基于采样的热点探测
    - 基于栈顶计数（不准确）
  - 基于计数器
    - 方法调用计数器： 在方法对象中取存储调用次数
    - 回边计数器：每一次循环回去，都会记录一次次数

## JIT 编译器优化
### 公共子表达式的消除
> 类似 数学的合并同类型
```java
// 优化前
int d = (c*b)*12+a+(a+b*c); 
// 优化后 E为常数 注意： c * b 必须为常量 
int d = E*12+a+(a+E); 
// ==>
int d = E*13+a*2; 
```

### 方法内联
> 省略中间跳板，直达本质
```java
// 优化前
private int add4(int x1， int x2， int x3， int x4) {
    return add2(x1， x2) + add2(x3， x4);
}
private int add2(int x1， int x2) {
    return x1 + x2;
}  

// 优化后 
private int add4(int x1， int x2， int x3， int x4) {
    return x1 + x2 + x3 + x4;
}
```

### 逃逸分析
> 只要一个方法里面的对象，在方法以外能够访问则为逃逸。
> JDK 1.7 默认开启逃逸分析
```
-XX:+DoEscapeAnalysis ： 表示开启逃逸分析
-XX:-DoEscapeAnalysis ： 表示关闭逃逸分析
```

 - 全局变量赋值逃逸
 - 方法返回值逃逸
 - 实例引用逃逸
 - 线程逃逸


```java
public class EscapeAnalysis {
    //全局变量
    public static Object object;

    public void globalVariableEscape(){//全局变量赋值逃逸 
        object = new Object(); 
    } 

    public Object methodEscape(){  //方法返回值逃逸
        return new Object();
    }

    public void instancePassEscape(){ //实例引用发生逃逸
        this.speak(this);
    }

    public void speak(EscapeAnalysis escapeAnalysis){
        System.out.println("Escape Hello");
    }
}
```

### 对象栈上内存分配
> 前提条件： 当前方法没有逃逸才能讨论栈上内存分配
```java
public class EscapeAnalysisTest {
    public static void main(String[] args) {
        long a1 = System.currentTimeMillis();
        for (int i = 0; i < 1000000; i++) {
            alloc();
        }
        // 查看执行时间
        long a2 = System.currentTimeMillis();
        System.out.println("cost " + (a2 - a1) + " ms");
        // 为了方便查看堆内存中对象个数，线程sleep
        try {
            Thread.sleep(100000);
        } catch (InterruptedException e1) {
            e1.printStackTrace();
        }
    }
    // 补：满足条件 不会发生逃逸
    private static void alloc() {
        User user = new User();
    }

    static class User {
    }
}
```

JVM参数运行上诉代码 
```java
// 关闭逃逸分析
-Xmx4G -Xms4G -XX:-DoEscapeAnalysis -XX:+PrintGCDetails -XX:+HeapDumpOnOutOfMemoryError

// 开启逃逸分析
-Xmx4G -Xms4G -XX:+DoEscapeAnalysis -XX:+PrintGCDetails -XX:+HeapDumpOnOutOfMemoryError
```

分析
```shell
## 查看当前运行的JAVA 进程
jps
## 查看当前xxx 进程产生的对象
jmap -histo xxx
```

### 标量替换
> 标量（Scalar）是指一个无法再分解成更小的数据的数据；其实就是 **基本数据类型** 和 **引用数据类型** 存储在栈上，减少GC压力

```java
//有一个类A
public class A{
  public int a=1;
  public int b=2
}
//方法getAB使用类A里面的a，b
// 补： x 没有逃逸
private void getAB(){
  A x = new A();
  x.a;
  x.b;
}
//JVM在编译的时候会直接编译成
private void getAB(){
  a = 1;
  b = 2;
}
//这就是标量替换
```

### 锁消除


## class文件结构
class 文件格式
```java
// JDK 1.8
// The ClassFile Structure
// A class file consists of a single ClassFile structure:
ClassFile {
    u4 magic;
    u2 minor_version;
    u2 major_version;
    u2 constant_pool_count;
    cp_info constant_pool[constant_pool_count-1];
    u2 access_flags;
    u2 this_class;
    u2 super_class;
    u2 interfaces_count;
    u2 interfaces[interfaces_count];
    u2 fields_count;
    field_info fields[fields_count];
    u2 methods_count;
    method_info methods[methods_count];
    u2 attributes_count;
    attribute_info attributes[attributes_count];
}
```

### Class 常量池理解
运行时常量池 与 字符串常量池   class常量池
#### 常量池数据区cp_info
- 字面量
  - 文本字符串
  - 被声明为`final`的常量值
  - 基本数据类型的值（double、float、long）
  - 其他
- 符号引用
  - 类和结构的完全限定名
  - 字段的名称 和 描述符
  - 方法的名称 和 描述符



# 类加载子系统
`加载 -> 连接（验证 -> 准备 -> 解析）-> 初始化 -> 使用 -> 卸载`
- 加载：通过I/O 读入字节码文件，使用到类时才加载（比如main()，new对象）
- 验证： **校验字节码**文件是否正确
- 准备： 给**静态变量**分配内存并赋予**默认值**（final 修饰则直接赋值）
- 解析： 将**符号引用替代为直接引用**，
- 初始化： **静态变量赋值**，**执行静态代码块**
### 加载
### 验证
### 准备
- 开辟空间（分配内存）给`static`修饰的成员变量
- 初始化（给静态成员变量赋初始值（`static`修饰则 赋0/false） `final static`修饰则直接赋值）
### 解析
符号引用替代为直接引用
### 初始化


## JVM内存结构
### JVM运行时数据区
### 虚拟机对象剖析
#### 对象创建
#### 对象布局
#### 对象访问

## 垃圾回收
### 垃圾回收
#### 判断算法
#### 回收算法
#### 垃圾回收器
### GC日志分析

## JVM 优化
### JVM性能监控与故障处理工具


## JMM 与并发
### Java内存模型
### Java与线程
### 线程安全与锁优化
