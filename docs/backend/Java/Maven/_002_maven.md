---
title: Maven拉包原理
date: 2023-04-04 08:51:20
permalink: /java/maven/002
categories:
  - 后端
tags:
  - Maven
---

## Maven 仓库

在 Maven 中，仓库指的是存放代码构建的一个位置。从分类上来说，Maven 仓库有两种类型，分别是：
- 本地仓库（Local）
- 远程仓库（Remote）【中央仓库、私服、阿里云 等等】

## 依赖搜索顺序

Maven 是如何搜索依赖的？

1. 首先，在**本地仓库**搜索，如果找不到则继续下一步。
2. 接着，在**中央仓库**搜索，如果找不到则继续下一步。
3. 最后，在**远程仓库**中搜索，如果找不到则抛出错误。如果没有设置远程仓库，那么抛出错误。如果找到了依赖，那么就下载到本地仓库缓存。

总结： `本地仓库 -> 中央仓库 -> 远程仓库`

## 配置信息

> 当我们知道了Maven搜索依赖的顺序之后，还有一个很重要的事情，就只怎么去配置到哪儿去下载依赖。setting.xml

主要的配置：

- repositories
- mirror
- server
- ……

### repositories

> repositories 标签用于定义远程仓库。repositories配置既可以在`setting.xml`也可以在`pom.xml`中配置，拉取依赖，按照声明的顺序从上到下去对应的远程仓库拉取依赖。

```xml
<repositories>
    <repository>
        <!--公司镜像的唯一标识，这个配置要注意，不能与mirrorOf配置的相同，不然会被拦截，重定向到外网的镜像仓库 -->
        <id>nexus</id>
        <!--仓库描述，随意写 -->
        <name>xxxx</name>
        <!-- 公司私有仓库地址，这个很重要不能错-->
        <url>http://xxx:8081/nexus/content/groups/public</url>
        <!-- 是否开启 releases 包的下载及更新策略 -->
        <releases>
            <enabled>true</enabled>
            <updatePolicy>daily</updatePolicy>
        </releases>
        <!-- 是否开启 snapshots 包的下载及更新策略 -->
        <snapshots>
            <enabled>false</enabled>
            <checksumPolicy>warn</checksumPolicy>
        </snapshots>
        <layout>default</layout>
    </repository>
 </repositories>
```

### mirror

> mirror 标签用于定义仓库镜像，其相当于一个拦截器。当 mirror 的 `mirrorOf` 值与 repository 的 `id` 相同时，repository 定义的仓库会被拦截，转而使用 mirror 中定义的仓库地址。

```xml
<!--使用xx公司私有仓库替换Maven默认的中央仓库 -->
<mirrors>
    <mirror>
        <!--自己公司的镜像的唯一标识,在mirror标签中，其实没啥用：如xiaoyaziyun -->
        <id>xiaoyaziyun</id>   
        <!--仓库描述，随意写 -->
        <name>xx公司私有仓库地址</name> 
        <!--xx公司私有仓库地址，这个很重要不能错-->
        <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
        <!--`central`为Maven中央仓库的标识，替换Maven源码内默认的是中央仓库地址-->
        <mirrorOf>central</mirrorOf>
    </mirror>
</mirrors>
```

### server

> 大部分远程仓库无须认证就可以访问，但我们自己搭建的 Maven 仓库，处于安全方面的考虑，我们会设置访问权限。此时，我们需要在 `setting.xml` 文件中配置 server 标签。

```xml
<settings>
    <!--配置远程仓库认证信息-->
     <servers>
        <server>
             <id>shuyi-tech-repo</id>
             <username>admin</username>
             <password>admin123</password>
         </server>
     </servers>
</settings>
```

*这里通过 `server.id` 与 `reposiroty.id` 标签将认证信息与仓库绑定在一起，因此在配置的时候需要保持这两个信息一致，否则可能导致访问失败。*

## 配置优先级

1. 项目 pom.xml 文件
2. `.m2/settings.xml` 文件
3. Maven 安装目录 `/conf/settings.xml` 文件

`pom.xml` > `.m2/settings.xml` > `conf/settings.xml`

## 参考资料

[1]  陈树义.微信工众平台.树哥聊编程.一文带你弄懂 Maven 拉包原理.https://mp.weixin.qq.com/s/RV44ThMhOgxmQebzcrs_JQ .2023.04.04