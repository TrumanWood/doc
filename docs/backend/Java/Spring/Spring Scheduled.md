# 定时任务的利弊
定时关闭超期==未支付订单==弊端：
1. 会有时间差，程序不严谨
	比如1H扫描一次，那么在每小时中间的时间就会超时，不严谨
2. 不支持集群
3. 会对DB全表搜索，极其影响数据库性能
适用于：
仅仅适用于小型轻量级项目



