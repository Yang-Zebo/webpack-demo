import observe from './observe'
import Dep from './Dep'


export default function defineReactive(data, key, value = data[key]) {
  const dep = new Dep()
  let childOb = observe(value)
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log(`getter访问${ key }属性`)
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
      }
      return value
    },
    set(newVal) {
      console.log(`setter改变${ key }属性`)
      if (value === newVal) return
      value = newVal
      childOb = observe(newVal)
      dep.notify()
    }
  })
}
