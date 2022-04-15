<template>
    <div class="bmain">
        <div class="bookbox">
            <!-- 点击封面跳到PDF页阅读 -->
            <div class="book" v-for="(item,index) in bookdata" 
            :key="index" @click="tobook(item.bookurl)">
                <img :src="item.bookimg" alt="">
                <p class="bookname">{{item.name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import {bookdata} from "@/assets/js/mydata.js"
export default{
    name:'book',
    data(){
        return{
            bookdata:bookdata
        }
    },
    methods:{
        tobook(url){
            window.open(url,"_self")
        }
    }
}
</script>
<style>
.bmain{ 
    width: 100%;
    height: 100%;
    display: flex;
    justify-content:center;
    align-items: center;
}
.bookbox{
    width: 90%;
    max-height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
}
.book{
    width: 8rem;
    height: 10rem;
    background-color: rgb(10, 17, 15);
    text-align: center;
    margin-bottom: 0.5rem;
    cursor: pointer;
}
.book img{
    width: 100%;
    height: 80%;
}
.bookname{
    font-size: 1rem;
    color: white;

}
</style>
