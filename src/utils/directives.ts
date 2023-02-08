// 自定义指令点击非自身事件（空白处）
const clickOutSide = {
  mounted(el: any, binding: any) {
    function documentHandler(e: any) {
      console.log(e)
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) return false
      // 判断指令中是否绑定了函数
      console.log("判断指令中是否绑定了函数", binding)
      if (binding.value) {
        console.log("有绑定函数，则执行函数")
        // 有绑定函数，则执行函数
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unmounted中可以解除事件监听
    el.__vueClickOutside__ = documentHandler
    document.addEventListener("click", documentHandler)
  },
  unmounted(el: any) {
    document.removeEventListener("click", el.__vueClickOutside__)
    delete el.__vueClickOutside__
  },
}
const directives = {
  install: function (app: any) {
    app.directive("clickOutSide", clickOutSide)
  },
}
export default directives
