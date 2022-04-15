<template>
    <div class="index">
        <div class="bggif"></div>
        <div class="out" @click="toLogin()">
              <div class="in"></div>
              <div class="text">开启学习之旅</div>
        </div>
    </div>
</template>

<script>
export default {
    name:'index',
    methods:{
        toLogin(){
            this.$router.push("/login");
        }
    }
}
</script>

<style scoped>
.bggif{
    width: 100vw;
    height:100vh;
    background: url("../assets/images/indexbg.gif");
    background-size:100% 100%;
}
.out{
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: #1b1b1b;
    border: 5px solid #54ffff;
    box-shadow:0 0 10px #54ffff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    cursor: pointer;
}
.in{
    width: 3rem;
    height: 3rem;
    background: url("../assets/images/电源.png");
    background-size: 100% 100%;
    border-radius: 50%;
}
.text{
            display: none;
            position: absolute;
            width:7rem;
            left: 5rem;
            bottom: 3rem;
            font-size: 1rem;
            text-align: center;
            /* background: rgba(255,255,255,0.1); */
            transition: all 1s linear;
            transition-timing-function: ease-in-out;
            color: #54ffff;
        }
        .out:hover .text{
            display: block;
            /* transition: all 0.3s linear; */
            transition-property: all;
            transition-duration: 1s;
            transition-timing-function: ease-in-out;
        }
</style>