/**
 * auth wh.q
 */
// 事件总线（调度中心）
class Event {
  constructor (name) {
    this.name = name;
    this.hash = {};
    this.subscribers = []
  }

  $on (fn) {
    if (this.hash.hasOwnProperty(fn)) return false;
    this.hash[fn] = Symbol();
    this.subscribers.push(fn)
  }

  $off (fn) {
    this.subscribers.forEach((_fn, index) => {
      fn === _fn && this.subscribers.splice(index, 1)
    });
    delete this.hash[fn];
  }

  $once (fn) {
    fn.once = true;
    this.subscribers.push(fn)
  }

  $notify (params) {
    this.subscribers.forEach(fn => {
      fn(params);
      fn.once && this.$off(fn)
    })
  }
}
// 发布管理
class Pub {
  constructor () {
    this.events = []
  }

  $increase (event) {
    this.events.push(event)
  }

  $broadcast (eventName, ...params) {
    this.events.forEach(_event => {
      eventName === _event.name && _event.$notify(...params)
    })
  }
}
// 实例化一个管理类
const publisher = new Pub();
// 挂载在wx上
try {
  wx.event = {
    $get (name) {
      return publisher.events.find(item => item.name === name)
    },
    $on (name, fn) {
      this.$get(name).$on(fn)
    },
    $off (name, fn) {
      this.$get(name).$off(fn)
    },
    $once (name, fn) {
      this.$get(name).$once(fn)
    },
    $remove (name) {
      this.$get(name).subscribers = [];
    },
    $clear () {
      publisher.events = []
    },
    $increase (event) {
      publisher.$increase(event)
    },
    $broadcast (eventName, ...params) {
      publisher.$broadcast(eventName, ...params)
    }
  };
} catch (e) {
  throw new Error('wx-event仅支持在微信小程序端使用！')
}
// 导出自定义event
export default Event;

