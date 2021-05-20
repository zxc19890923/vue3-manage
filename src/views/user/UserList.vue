<template>
  <div class="userList">
    <div class="rightContentTitle">用户信息</div>
    {{name}}
  </div>
</template>
<script>
import { onMounted, reactive , readonly, ref, toRefs, toRef } from 'vue'
export default {
  // 1. created完全初始化之前执行
  setup (props, context) {
    // 2. vue中定义响应式的引用使用，reactive、ref，toRefs
    // 原理：通过proxy对数据进行封装，当数据变化时候，出发模板更新，proxy({value: 'zxc})
    // ref 处理基础类型的数据（string, number, boolean)
    // reactive 处理引用类型数据
    // 3. ref定义的数据在script中必须通过value来进行增删改查 name.value = 'zhangxuchao'，但是在模板中使用直接使用变量即可。
    let name = ref('zxc')
    // 4. 定义引用类型
    const data = reactive({
      userList: [],
      addressList: []
    })
    // 5. 禁止修改 readyonly
    const readyData = readonly(data)

    // 6. toRefs，如果对定义响应式的数据进行结构，直接访问属性就会失去响应性。
    const nameObj = reactive({name: '张旭超'})
    const { name1 } = nameObj  // 如果在模板立马直接使用name1就失去响应性
    // 解决，主意toRefs如果解构的时候没有找到相应的属性，就会报错，不会生成一个响应的变量，
    // 7. toRef 和toRefs不同，他可以给一个对象中创建一个响应式的变量
    const { name2 } = toRefs(nameObj)  // 将对象中的基本数据类型转换为ref，这样访问name2就相当于 ref('张旭超')具有响应性
    const age = toRef(nameObj, 'age')
    onMounted(() => {
      setTimeout(() => {
        name.value = 'zhangxuchao'
        data.userList = [{name: '张旭超'}]
      }, 2000);
    })
    return {
      name,
      data
    }
  },
}
</script>