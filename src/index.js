import observe from './observe.js'


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
obj.a = 10
obj.b.c.d = 10
obj.e[2].f = 5
obj.e.splice(1,1,4)
console.log('obj', obj)