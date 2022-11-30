import observe from './observe'
import Dep from './Dep'

export default function defineReactive(data, key, value) {
  const dep = new Dep()
  // 这样可以不传入 value 的情况下继续调用函数
  if (arguments.length === 2) {
    value = data[key]
  }
  // 子元素要进行observe，形成递归（循环调用）
  let childOb = observe(value)
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log(`getter访问${ key }属性`)
      return value
    },
    set(newVal) {
      console.log(`setter改变${ key }属性`)
      if (value === newVal) {
        return
      }
      value = newVal
      // 当设置了新值，新值也要被 observe
      childOb = observe(newVal)
      // 发布订阅模式，通知 dep
      dep.notify()
    }
  })
}
