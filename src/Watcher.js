import Dep from './Dep'


let uid = 0
export default class Watcher {
  constructor(target, expression, callback) {
    this.id = uid++
    this.target = target
    this.expression = expression
    this.callback = callback
    this.getter = parsePath(this.expression)
    this.value = this.get()
  }
  update() {
    this.run()
  }
  get() {
    // 进入依赖收集的阶段，让全局的 Dep.target 设置为 Watcher 实例
    Dep.target = this
    let value
    try {
      value = this.getter(this.target)
    } finally {
      Dep.target = null
    }
    return value
  }
  run() {
    this.getAndInvoke(this.callback)
  }
  getAndInvoke(callback) {
    const value = this.get()
    if (value !== this.value || typeof value === 'object') {
      const oldVal = this.value
      this.value = value
      callback.call(this.target, this.value, oldVal)
    }
  }
}
function parsePath(str) {
  let segments = str.split('.')
  return function(obj) {
    for (let key of segments) {
      if (!obj) {
        return
      }
      obj = obj[key]
    }
    return obj
  }
}