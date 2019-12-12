<template >
  <div>
    <button @click="increment">+</button>
    <button v-on:click="decrement">-</button>
    <p><span>{{num}}</span></p>
  </div>
</template>
<style>
</style>
<script>
    export default{
        props:["num"],
        data(){
            return{
                num:0
            }
        },
        methods:{
            increment(){
                // this.num++;
                //通过emit来触发父组件的自定义方法：对应其自定义名称
                this.$emit("incr");
            },
            decrement(){
                // this.num--;
                this.$emit("decr");
            }
        }
    }
</script>
