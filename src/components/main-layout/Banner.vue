<template>
    <div class="wrapper">
        <span class="name"> 
            <span class="fa fa-bars"> 手术数据挖掘与分析平台</span>
        </span>
        <span class="out" @click="logOut">
            <span class="fa fa-sign-out"> 退出</span>
        </span>
    </div>
</template>

<script>
export default {
    methods:{
        logOut:function(){
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.wrapper {
    line-height: 42px;
    background-color: #3c8dbc;
    padding: 0px 20px;
    width: 1920px;
    margin: 0 auto;
    box-sizing: border-box;
}
.wrapper > .name {
    font-size: 18px;
    color: #ececec;
    display: inline-block;
    padding-left: 10px;
    
}
.wrapper > .out {
    float: right;
    cursor: pointer;
    color: #e9e9e9;
}
.out:hover {
    color: #ffffff;
}
</style>