import observe from './observe.js'
import Watcher from './Watcher'

let obj = {
  a: 1,
  b: {
    c: {
      d: 4
    }
  },
  e: [1, 2, { f: 3 }]
}
observe(obj)
new Watcher(obj, 'b.c.d', (newVal, oldVal) => {
  console.log('新值为', newVal)
  console.log('旧值', oldVal)
})
obj.b.c.d = 10
console.log('obj', obj)