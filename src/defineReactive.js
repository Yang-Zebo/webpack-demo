import observe from './observe'


export default function defineReactive(data, key, value) {
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
      console.log(`getter试图访问obj的${ key }属性`)
      return value
    },
    set(newVal) {
      console.log(`setter试图改变obj的${ key }属性`, newVal)
      if (value === newVal) {
        return
      }
      value = newVal
      // 当设置了新值，新值也要被 observe
      childOb = observe(newValue)
    }
  })
}
