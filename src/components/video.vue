<template>
    <div class="video" v-show="show">
        <div class="videomodal">
            <!-- <div class="vheader">
                {{title}}
            </div> -->

            <div class="vmain">
                <slot></slot>
            </div>

            <div class="vfoot">
                <button @click="hideModal">关闭</button>
                <!-- <button @click="submit">确定</button> -->
            </div>
        </div>
    </div>
</template>

<script>
// import 'videojs-contrib-hls.js/src/videojs.hlsjs'
export default {
    name:'videomodal',
    props:{
        show:{
            type:Boolean,
            default:false
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
            this.$emit('hideModal')
        },
        submit(){
            this.$emit('submit')
        }
    }
}
</script>

<style scoped>
.video{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
}
.videomodal{
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    box-sizing: border-box;
    /* position: relative; */
}
.vheader{
    background:#8ab488;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: move;
    padding: 0.5rem 0;
    color: white;
    font-size: 1rem;
    letter-spacing: 0.1rem;
}

.vfoot{
    /* display: flex;
    align-items: center;
    justify-content: space-around; */
    /* height: 4rem; */
    background-color: #8ab488;

}
.vfoot button{
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
    z-index: 11;
    right: 1rem;
    top: 1rem;
}
.videoplay{
    width: 50rem;
    height: 81.5vh;
}
/* 更改默认样式 */
</style>
