import {def} from './utils'
// vue 重写这七个数组的方法用来对数组进行响应式处理 

const arrayPrototype = Array.prototype

// 以 Array.prototype 为原型创建一个 arrayMethods 对象

const arrayMethods = Object.create(arrayPrototype)
console.log('arrayMethods', arrayMethods)

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
    console.log(11)
  }, false)
})
