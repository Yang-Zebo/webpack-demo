export default class Dep {
  constructor() {
    console.log('Dep 构造器')
  }
  notify() {
    console.log('notify')
  }
}