import observe from './observe.js'

let obj = {
  a: 1,
  b: {
    c: {
      d: 4
    }
  },
  g: [1, 2, 3]
}
observe(obj)
console.log('obj', obj.b.c);