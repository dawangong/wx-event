# wx-event
小程序端事件总线，兄弟组件通信，子孙组件通信解决方案。

> DOC
### 使用支持
- CommonJS
- ES6 module
```javascript
import Event from 'wx-event'
const { Event } = require('wx-event');
```

### How to use ?
1.创建调度中心(例如：event-manage.js)
```javascript
import Event from 'wx-event'
/* 注册事件 */
wx.event.$increase(new Event('update')) 
```
2.将调度中心引入到app.js中
```javascript
import './utils/event-manage'
```
3.业务中使用
```javascript
/* 事件接收 */
wx.event.$on('date-update', (params => {
      this.setData(params)
    }))
    
/* 事件广播 */ 
wx.event.$broadcast('date-update', params)  
```
> tips: 为了保证this的指向正确，请使用箭头函数。[如何支持ES6?](https://www.babeljs.cn/docs/)
