import MyComponent from './src/views/TestComponent.vue'

// 为组件提供 install 方法，用于按需引入
MyComponent.install = function (Vue:any) {
  Vue.component(MyComponent.name, MyComponent)
}

export default MyComponent
