## 专治各种“起名”

:::tip

在软件开发过程中，取名是一个头疼的事情，命名困难主要来自：

1. 信息压缩：对类/方法的抽象
2. 预测未来：对类/方法未来的可能变化的不确定性
3. 语言能力：缺少词汇量、语法
4. 不良设计：混乱的职责分布，不清晰的抽象分层、错误的实现

:::

## 命名规则

> 把**类/方法**的名字写全，对读者好一点，可以降低自己被同事打一顿的风险。

类：是什么（名词）

方法：做什么（动词）

以下是可用的、得到**普遍认可**的缩写：

- `configuration -> config`
- `identifier -> id`
- `specification -> spec`
- `statistics -> stats`
- `database -> db (only common in Go)`
- `regular expression -> re/regex/regexp`

**未得到**普遍认可的缩写：

- `request -> req`
- `response -> resp/rsp`
- `service -> svr`
- `object -> obj`
- `metadata -> meta`
- `business -> busi`

## 参考资料

1. [腾讯技术工程.微信公众号.程序员“起名”头痛根治指南.2023](https://mp.weixin.qq.com/s/loaaKlE44P4VxMgLY3f2hw)
