import {def} from './utils.js'
import defineReactive from './defineReactive.js'
import {arrayMethods} from './array'
import observe from './observe'
import Dep from './Dep'


export default class Observer {
  constructor(value) {
    // 每一个 Observer 实例都有一个 dep 实例
    this.dep = new Dep()
    // 类里的 this 指向的是其创建的实例
    // 这里就是给 value 创建一个 __ob__ 的属性，他的值是 Observer 实例 并且不能枚举
    def(value, '__ob__', this, false)
    // 将一个正常的object转换为每个层级的属性都是响应式的 object
    if (Array.isArray(value)) {
      // 如果是数组就将这个数组的原型指向 arrayMethods
      Object.setPrototypeOf(value, arrayMethods)
      // 让数组每一项都进行 observe
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  // 遍历value的每一个key
  walk(value) {
    for (let key in value) {
      defineReactive(value, key)
    }
  }

  // 数组的特殊遍历
  observeArray(arr) {
    for(let i = 0, l = arr.length; i < l; i++) {
      // 让数组每一项都进行 observe，这样遇到数组里面还是数组的情况也会递归调用
      observe(arr[i])
    }
  }
}
