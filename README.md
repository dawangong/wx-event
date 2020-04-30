# wx-event
小程序端事件总线，兄弟组件通信，子孙组件通信解决方案。

> DOC
### 使用支持
- CommonJS
- ES6 module
```javascript
import Event from 'wx-event';
const { Event } = require('wx-event');
```

### How to use ?
1.创建调度中心(例如：event-manage.js)
```javascript
import Event from 'wx-event';
/* 注册事件 */
wx.event.$increase(new Event('update')); 
```
2.将调度中心引入到app.js中
```javascript
import './utils/event-manage';
```
3.业务中使用
```javascript
/* 事件监听 */
wx.event.$on('update', (params => {
      this.setData(params)
    }));
    
/* 事件广播 */ 
wx.event.$broadcast('update', params);  
```
4.其他api
- $off: 关闭监听
```javascript
wx.event.$off('update');
```
- $once: 一次性监听
```javascript
wx.event.$once('update', (params => {
      this.setData(params)
    }));
```
- $remove: 移除指定事件所有监听
```javascript
wx.event.$remove('update');
```
- $clear: 清空所有事件所有监听
```javascript
wx.event.$clear()
```

> tips: 为了保证this的指向正确，请使用箭头函数。[如何支持ES6?](https://www.babeljs.cn/docs/)
