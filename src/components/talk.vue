<template>
    <div class="talk" v-show="talkshow">
        <div class="talktext" v-text="talkdata[i]"></div>
        <button @click="next()">{{nexttext}}</button>
    </div>
</template>

<script>
import {talkdata} from '../assets/js/mydata.js'
export default {
    name:'talk',
    props:{
        talkshow:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return{
            talkdata:talkdata,
            i:0,
            nexttext:'next'
        }
    },
    methods:{
        next(){
            this.i++;
            if(this.i==talkdata.length-1){
                this.nexttext = "关闭"
            }
            if(this.i>=talkdata.length){
                this.talkshow = false
            }
        }
    }
}
</script>

<style scoped>
.talk{
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 15rem;
    height: 5rem;
    background-color: white;
    border-radius: 10px;
    /* border: 1px solid blue; */
    box-shadow: 0 0 10px #333;
    z-index: 10;
    padding: 0.5rem;
}
.talk button{
    width: 4rem;
    height: 1.5rem;
    font-size: 1rem;
    border-radius: 10px;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    background-color:#3a7fd5;
    color: white;
    border: none;
    position: absolute;
    right: 1rem;
    bottom: 0.5rem;
}
</style>