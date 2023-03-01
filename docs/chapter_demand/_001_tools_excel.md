# 与Excel相关的需求
## 导出2亿条数据 <a href="quote-1" name="quote-1-1">[1]</a>
### 关于Excel的基本了解
1. Excel 一个sheet最多有 1 048 576行
2. excel2003限制255个; excel2007无限制
3. excel2003：一个Excel中最多只能包含267386880，即2亿6千7百3拾8万6千8百8拾行

### 需求的难点与解决方案
#### 难点
1. 2亿的数据量大，查询耗时
2. 生成的Excel 文件大，非常消耗服务器资源（内存占用率飙升）
3. 直接导出，容易下载失败（服务器不稳定、请求超时、网络抖动）

#### 解决方案
1. 异步导出
2. 采用导出的excel上传到Oss的数据流转形式。提升导出功能的稳定性和确定性
3. 导出任务分类分级。根据导出的数据量，对导出任务分类，然后不同的并发策略
4. 降低导出大数据量任务的并发数
5. Oss上的数据，要分类分级。导出的数据有时效性，属于临时数据，不需要长期保存


下载中心系统设计:https://www.processon.com/view/6382e4b4e0b34d37c46db1e3




## 参考数据
<a name="quote-1" href="#quote-1-1">[1]</a> 唐成.微信公众号.2亿数据怎么导出到Excel.2022 [https://mp.weixin.qq.com/s/5xAFk0U2Y7iDQTGGXjhNpw](https://mp.weixin.qq.com/s/5xAFk0U2Y7iDQTGGXjhNpw)