<template>
    <div class="screen">
        <div class="screenmodal">
            <div class="sheader">
                <el-menu
                  default-active="1"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b">
                 <router-link to="/screen/videostudy">
                 <el-menu-item index="1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">视频学习</span>
                 </el-menu-item>
                 </router-link>

                 <router-link to="/screen/book">
                 <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">阅读书籍</span>
                 </el-menu-item>
                 </router-link>

                 <router-link to="/screen/floor">
                 <el-menu-item index="3">
                    <i class="el-icon-document"></i>
                    <span slot="title">任务评价</span>
                 </el-menu-item>
                 </router-link>

                <router-link to="/screen/working">
                 <el-menu-item index="4">
                    <i class="el-icon-document"></i>
                    <span slot="title">练习任务</span>
                 </el-menu-item>
                 </router-link>

                 <router-link to="/screen/history">
                 <el-menu-item index="5">
                    <i class="el-icon-document"></i>
                    <span slot="title">历史记录</span>
                 </el-menu-item>
                 </router-link>
                </el-menu>
            </div>
            
            <div class="smain">
                <router-view></router-view>
            </div>

            <div class="sfoot">
                <button @click="hideModal">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
// import 'videojs-contrib-hls.js/src/videojs.hlsjs'
export default {
    name:'screenmodal',
    props:{
        show:{
            type:Boolean,
            default:true
        },
        title:{
            type:String,
            default:''
        }
    },
    data(){
        return{
            
        }
    },
    methods:{
        hideModal(){
            this.$router.push('/house')
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style>
.screen{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
}
.screenmodal{
    width: 60rem;
    height: 85vh;
    background: #476b66;
    border-radius: 10px;
    overflow: hidden;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}
.sheader{
    width:18%;
    height: 100%;
    background-color: #545C64;
}
.smain{
    width: 82%;
}
.sfoot button{
    width: 5rem;
    text-decoration: none;
    outline: none;
    border-radius: 10px;
    background-color: #3a7fd5;
    color: #fff;
    font-size: 1rem;
    border: 0;
    padding: 0.2rem;
    cursor: pointer;
    position: absolute;
    left: 3rem;
    bottom: 2rem;

}
.sideoplay{
    width: 50rem;
    height: 80vh;
}
/* 更改默认样式 */
.sheader .el-submenu .el-menu-item{
    min-width:1rem;
}
</style>
