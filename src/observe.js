import Observer from './Observer.js'
// 尝试创建 Observer 实例，避免重复侦测value变化的问题
export default function observe(value) {
  // 如果value不是对象，就什么都不做
  if (typeof value != 'object') return
  let ob
  // 看看 __ob__ 是否存在 Observer 实例, 可以判断这个值是不是响应式。
  // 第一次进来 __ob__ 一定是 undefined
  if (typeof value.__ob__ !== 'undefined') {
    // 如果 value 已存在 __ob__ ，已经是响应式数据
    // 就不需要再创建 Observer 的实例
    ob = value.__ob__
  } else {
    // 如果不存在创建个 Observer 实例挂载在 value 上
    // 至于为啥可以看 Observer.js
    ob = new Observer(value)
  }
  // return 的是 Observer 的实例
  return ob
}
