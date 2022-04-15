<template>
    <div class="vmain">
        <div class="vbox">
            <video-player class="vvideoplay" 
              :options="playerOptions"></video-player>
        </div>
        <div class="vlist">
            <p>待完成</p>
            <ul v-for="(item,index) in videodata" :key="index">
                <li @click="change(item.videosrc)">{{item.title}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import 'video.js/dist/video.cjs'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import {videodata} from "@/assets/js/mydata.js"
export default{
    name:'videostudy',
    data(){
        return{
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
                    // src:''
                }],
                // poster:"",  //视屏封面图片
                width:document.documentElement.clientWidth,
                notSupportedMessage:'此视频暂时无法播放，请稍后再试'
            },
            videodata:videodata
        }
    },
    methods:{
        change(src){
            this.playerOptions.sources[0].src = src
        }
    }
}
</script>

<style>
.vmain{
    width:100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;

}
.vbox{
    width: 80%;
    height: 100%;
    background-color: aqua;
}
.vlist{
    width: 20%;
}
.vlist ul li{
    height: 2rem;
    line-height: 2rem;
    font-size: 1rem;
    color: white;
    text-align: center;
}
.vlist p{
    color: rgb(223, 184, 56);
    text-align: center;
    font-size: 1.2rem;
}
.vlist ul li:hover{
    background-color: rgb(61, 87, 78);
    cursor: pointer;
}
</style>