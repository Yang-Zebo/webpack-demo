let uid = 0
export default class Dep {
  constructor() {
    console.log('Dep 构造器')
    this.id = uid++
    // 用数组存储自己的订阅者 subscribes 订阅者
    // 数组里面放的就是 Watcher 的实例
    this.subs = []
  }
  // 添加订阅
  addSub(sub) {
    this.subs.push(sub)
  }
  // 添加依赖
  depend() {
    // 自己指定的一个全局唯一的位置
    if(window.target) {
      this.addSub(window.target)
    }
  }
  notify() {
    console.log('notify')
    // 浅克隆一份
    const subs = this.subs.slice()
    // 遍历
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}