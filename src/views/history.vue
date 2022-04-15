<template>
    <div class="history">
        <Video1 :show="show" :title="title" @hideModal='hideModal'>
         <video-player class="videoplay" :options="playerOptions"></video-player>
       </Video1>
        <div class="alvideo">
            <p>已观看视频：</p>
            <div v-text="alvideo" @click="showlook()"></div>
        </div>
        <div class="albook">
            <p>已阅读书籍：</p>
            <div v-text="albook"></div>
        </div>
    </div>
</template>

<script>
import 'video.js/dist/video.cjs'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import Video1 from "../components/video"
export default {
    name:'history',
    data(){
        return{
            alvideo:'java第一节学习',
            albook:'无',
            title:"java第一节学习",
            show:false,
            playerOptions:{
                playbackRates:[0.7,1.0,1.5,2.0], //播放速度
                autoplay:false,  //如果true，浏览器准备好时开始回放
                controls:true,  //控制条
                preload:'auto', //视频预加载
                muted:false,    //默认情况下将会消除任何音频
                loop:false,    //导致视频一结束就重新开始
                language:'zh-CN',  //
                aspectRatio:'16:9', //将播放器置于流畅模式，并在计算播放器的动态大小时使用
                fluid:true, //适用
                sources:[{
                    type:'video/mp4',
                    src:require("../assets/images/kaichang.mp4")
                }],
                // poster:"",  //视屏封面图片
                width:document.documentElement.clientWidth,
                notSupportedMessage:'此视频暂时无法播放，请稍后再试'
            },
        }
    },
    methods:{
        hideModal(){
      // 取消弹窗回调
      this.show = false
    },
    showlook(){
        this.show = true
    }
    },
    components:{
        Video1
    }
}
</script>
<style scoped>
.history{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.alvideo{
    width: 40%;
    height: 90%;
    color: white;
}
.albook{
    width: 40%;
    color: white;
}
.alvideo p{
    color: rgb(233, 176, 19);
    font-size: 1.2rem;
    margin-bottom: 1rem;
}
.albook p{
    color:  rgb(233, 176, 19);
    font-size: 1.2rem;
    margin-bottom: 1rem;
}
.alvideo div{
    cursor: pointer;
}
.albook div{
    cursor: pointer;
}
</style>
