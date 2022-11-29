// 默认创建一个对象
export const def = (obj, key, value, enumerable) => {
  Object.defineProperty(obj, key, {
    value,
    enumerable,
    writable: true,
    configurable: true
  })
}
