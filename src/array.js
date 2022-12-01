import {def} from './utils'


const arrayPrototype = Array.prototype
export const arrayMethods = Object.create(arrayPrototype)
const methodsNeedChange = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse']
methodsNeedChange.forEach(methodName => {
  const original = arrayPrototype[methodName]
  def(arrayMethods, methodName, function() {
    const result = original.apply(this, arguments)
    const arr = [...arguments]
    const ob = this['__ob__']
    let inserted = []
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
    return result
  }, false)
})
