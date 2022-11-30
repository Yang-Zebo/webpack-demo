import {def} from './utils.js'
import defineReactive from './defineReactive.js'
import array from './array'


export default class Observer {
  constructor(value) {
    // 类里的 this 指向的是其创建的实例
    // 这里就是给 value 创建一个 __ob__ 的属性，他的值是 Observer 实例 并且不能枚举
    def(value, '__ob__', this, false)
    // 将一个正常的object转换为每个层级的属性都是响应式的 object
    this.walk(value)
  }
  // 遍历value的每一个key
  walk(value) {
    for (let key in value) {
      defineReactive(value, key)
    }
  }
}
