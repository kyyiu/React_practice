 # 豆瓣电影   
   
## 练习的一些技术
  * react
  * ant design
  * 跨域请求（jsonp）
  * es6
  
### 注意：豆瓣的api每日有限次数
 
 
 ## 遇到的一些问题
 * import in body of module; reorder to top  import/first
 * 原因 import 必须在其它所有业务代码前面（eslint 暴出）解决：import语句应该放在最前面，至少要放到const定义变量的前面。