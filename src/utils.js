// 创建一个对象的属性
export const def = (obj, key, value, enumerable) => {
  Object.defineProperty(obj, key, {
    value,
    enumerable,
    writable: true,
    configurable: true
  })
}
