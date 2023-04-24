# Spring 事务
@Transactional 
默认事务
```java
Propagation propagation() default Propagation.REQUIRED;
```
Spring 事务
```java
REQUIRED(0), // required 默认事务
SUPPORTS(1),
MANDATORY(2),
REQUIRES_NEW(3),
NOT_SUPPORTED(4),
NEVER(5),
NESTED(6);
```
## REQUIRED  required 默认事务
>适用于增删改
>使用当前事务，没有事务则自己新建一个事务，子方法必须运行在一个事务中 ，如果当前存在事务，则加入这个事务，**成为一个整体**

##  SUPPORTS  supports
> 主要用于查询
> 如果有事务，则使用事务，没有则不使用事务
> ##  MANDATORY  mandatory 强制调用方有事务
> 强制调用方必须存在事务，没有则抛异常
> ## REQUIRES_NEW requires_new  创建新事务
> 当前有事务则挂起该事务，新建一个事务使用
> 当前没有事务，则通Required
## NOT_SUPPORTED not_supported 不使用事务
> 主要使用查询
> 当前有事务，则挂起事务，以没有事务的方式去运行
## NEVER never 不使用事务,有事务抛异常
>  如果当前有事务，则抛出异常
## NESTED nested
>  如果当前有事务，则开启子事务（嵌套事务），嵌套事务是独立提交或者回滚的
>  如果当前没有事务，则同required
>  主事务提交，则会携带子事务一起提交
>  如果主事务回滚，则子事务一起回滚，相反，子事务异常，父事务则可以选择回滚或者不回滚
>  ### nested 与  requires_new的区别
>  requires_new 是影响当前方法内的，不影响父事务
>  nested 是与父事务是父子嵌套关系，**父有事 则 子有事** ，子有事，父可帮可不帮
### nested 与 父子使用 required 的区别
required 是同一个事务里面， 会一起回滚
nested 是与父事务是父子嵌套关系，**父有事 则 子有事** ，子有事，父可帮可不帮

## 为什么Application 不用加@EnableTransactionManagement 注解开启事物
@SpringBootApplication 自动扫描 spring.factories 进行自动装配