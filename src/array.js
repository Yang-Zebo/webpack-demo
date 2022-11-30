import {def} from './utils'
// vue 重写这七个数组的方法用来对数组进行响应式处理 

const arrayPrototype = Array.prototype

// 以 Array.prototype 为原型创建一个 arrayMethods 对象

export const arrayMethods = Object.create(arrayPrototype)

// 要被改写的七个数组方法
const methodsNeedChange = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse']
methodsNeedChange.forEach(methodName => {
  // 备份原来的方法
  const original = arrayPrototype[methodName]
  // 在 arrayMethods 对象上定义方法
  def(arrayMethods, methodName, function() {
    // 恢复原来的功能(数组方法) 谁调的函数 this 就指向谁
    const result = original.apply(this, arguments)
    // 把数组的 __ob__ 取出
    const ob = this.__ob__
    // push/unshift/splice 三个方法比较特殊他们会插入新项，现在需要把新项也进行 observe
    let inserted = []
    // arguments 是一个类数组
    const arr = [...arguments]
    switch (methodName) {
      case 'push':
      case 'unshift':
        inserted = arr
        break
      case 'splice':
        // splice 插入的新项是从第三个参数开始的
        inserted = arr.slice(2)
        break
    }
    if (inserted.length) {
      ob.observeArray(inserted)
    }
    ob.dep.notify()
    console.log('啦啦啦')
    return result
  }, false)
})
