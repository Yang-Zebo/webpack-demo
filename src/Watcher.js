let uid = 0
function parsePatch(str) {
  let segment = str.split('.')
  return (obj) => {
    for(let i = 0, l = segment.length; i < l; i++) {
      if(!obj) return
      obj = obj[segment[i]]
    }
  }
}
export default class Watcher {
  constructor(target, expression, callback) {
    // target 对象, expression 比如 a.b.c.d , callback 回调函数
    this.id = uid++
    this.target = target
    // parsePatch 会返回一个方法，
    // 调用返回的方法（有一个参数就是一个要解析的对象），方法会返回根据路径和对象解析出来的值
    this.getter = parsePatch(expression)
    this.callback = callback
    this.value = this.get()
    console.log('Watcher 构造器')
  }
  get() {
    // 进入依赖收集的阶段，让全局的 window.target 设置为 Watcher 实例
    window.target = this
  }
}