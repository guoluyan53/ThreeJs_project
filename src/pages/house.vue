<template>
    <div id="house">
      <videoModel :show="show" :title="title" @hideModal='hideModal' @submit="submit">
         <video-player class="videoplay" :options="playerOptions"></video-player>
      </videoModel>
      <!-- <screenModal :show="show" @hideModal='hideModal'> -->
      <!-- </screenModal> -->
      <talkShow :show="talkshow"></talkShow>
      <div class="out" @click="toLogin()">
              <div class="in"></div>
      </div>
    </div>
</template>

<script>
import 'video.js/dist/video.cjs'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import videoModel from '../components/video'
import screenModal from '../components/screen'
import talkShow from '../components/talk'
import * as THREE from "three";
import { OBJLoader, MTLLoader } from "three-obj-mtl-loader";
const OrbitControls = require('three-orbit-controls')(THREE);
export default {
    name:'house',
    components:{
      videoModel,
      screenModal,
      talkShow
    },
    data() {
    return {
      title:'这是弹窗',
      show:false,
      talkshow:false,
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
      /**场景 */
      scene: null,
      /**相机 */
      camera: null,
      /**渲染 */
      renderer: null,
      /**控制器 */
      controls: null,
      selectedObjects:[],

    }
  },
  methods:{
    hideModal(){
      // 取消弹窗回调
      this.show = false
    },
    submit(){
      // 确认弹窗回调
      this.show = false
    },
    toLogin(){
            this.$router.push("/academy");
        },
      /**初始化 */
    initScene() {
      this.scene = new THREE.Scene();
      const ambientLight = new THREE.AmbientLight(0xffffff);
      this.scene.add(ambientLight);
      // var axesHelper = new THREE.AxesHelper(200);
      // this.scene.add(axesHelper);
    },
    initCamera() {
      const aspect = window.innerWidth / innerHeight; //宽高可根据实际项目要求更改 如果是窗口高度改为innerHeight
      this.camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
      this.camera.position.set(50, 80, 300);
      this.camera.lookAt(this.scene.position); // 让相机指向原点

      const pointLight = new THREE.RectAreaLight(0xffffff,1,500,500);
      pointLight.position.set(0,500,0);
      const pointLight1 = new THREE.RectAreaLight(0xffffff,1,500,500);
      pointLight1.position.set(-500,0,0);
      const pointLight2 = new THREE.RectAreaLight(0xb6dfff,1,500,500);
      pointLight2.position.set(500,0,0);
      const po = new THREE.PointLight(0xfaf459,1,300);
      // po.position.set(300,500,0);
      this.scene.add(po);
      this.scene.add(pointLight);
      this.scene.add(pointLight1);
      this.scene.add(pointLight2);
      this.scene.add(this.camera);

    },
    initRenderer() {
      this.renderer = new THREE.WebGLRenderer({ antialiasing: true,alpha:true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth,window.innerHeight); //宽高可根据实际项目要求更改 如果是窗口高度改为innerHeight
      // this.renderer.domElement.style.position = 'absolute';
      // this.renderer.domElement.style.top = 0;
      this.container = document.getElementById("house");
      this.container.appendChild(this.renderer.domElement);
    },
    // 初始化控制器
    initOrbitControls(){
        let controls = new OrbitControls(this.camera,this.renderer.domElement);
        controls.enableDamping = true;
        controls.enableZoom = true;
        controls.autoRotate = false;
        controls.autoRotateSpeed = 3;
        controls.enablePan = true;
        controls.enableKeys = false;
        controls.minDistance = 10;
        controls.maxDistance = 500;
        controls.maxPolarAngle = 1.5;
        controls.minPolarAngle = 1.0;
        // controls.minAzimuthAngle =Math.PI*0;
        // controls.maxAzimuthAngle =Math.PI*0.5;
        
        controls.keyPanSpeed = 7;
        controls.keys = {
            LEFT:37,
            UP:38,
            RIGHT:39,
            BOTTOM:40
        }
        this.controls =controls;

    },

    //点击事件
    onclick(event){
    // event.preventDefault();
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) *2 -1;
    mouse.y =-(event.clientY / window.innerHeight) *2 +1;
    raycaster.setFromCamera(mouse,this.camera);
    var intersects = raycaster.intersectObjects(this.scene.children,true) ;
    // console.log(intersects);

    if(intersects.length ==0){
      return;
    }
    if(intersects[0].object.name =="地面" || (intersects[0].object.parent.name=="" || intersects[0].object.name =="左墙" ||intersects[0].object.name =="对墙")){
      this.selectedObjects.pop();
    }
    else{
      if(intersects[0].object.parent.name=="控制台"){
        window.open("/#/screen","_self")
      }
      // if(intersects[0].object.parent.name=="指导人"){
      //   this.$router.push('/academy')
      // }
      if(intersects[0].object.parent.name){
        this.show = true
        // this.selectedObjects.pop();
        // this.selectedObjects.push(intersects[0].object);
        // console.log(intersects[0].object);
      }
    }
  },

    animate() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
    //   this.requestId = requestAnimationFrame(this.animate);
    },
    // 窗口变动触发的方法
    // onWindowResize(){
    //     this.camera.aspect = window.innerWidth / window.innerHeight;
    //     this.camera.updataProjectMatrix();
    // },
    init() {
      // this.group = new THREE.Group();
      this.initScene();
      this.initCamera();
      this.initRenderer();
      this.initOrbitControls();
    //   this.onWindowResize();
    //   document.addEventListener('resize',onWindowResize,false);
    },

    //添加模型
    // 创建地板
    createfloor(){
      this.meshfloor = new THREE.Mesh(
      new THREE.PlaneGeometry(400,400,20,20),
      new THREE.MeshLambertMaterial({
        color:0xb3cc8b,
        wireframe:false,
        side:THREE.DoubleSide
        })
      );
      this.meshfloor.rotation.x -= Math.PI / 2;
      this.meshfloor.name = "地面";
      this.scene.add(this.meshfloor);
    },
    // 创建墙体
    createwall(width,height,depth,angle,material,x,y,z,name){
        var cubeGeometry = new THREE.BoxGeometry(width,height,depth);
        var cube = new THREE.Mesh(cubeGeometry,material);
        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = z;
        cube.rotation.y += angle*Math.PI;
        cube.name = name;
        this.scene.add(cube);
    },
    // 导入书架
    bookjia() {
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/studio/book/修改书架.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/studio/book/修改书架.obj",
          function(obj) {
            obj.position.set(-170,0,-20);
            obj.scale.set(0.7,0.7,0.7);
            obj.rotation.y = Math.PI/2;
            that.scene.add(obj);
          });
      });
    },
    // 导入电脑桌子
    computerdesk() {
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/studio/电脑桌子.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/studio/电脑桌子.obj",
          function(obj) {
            obj.position.set(0,-20,25);
            obj.scale.set(0.09,0.09,0.09);
            that.scene.add(obj);
          });
      });
    },
    //导入桌子
    commondesk() {
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/studio/桌子.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/studio/桌子.obj",
          function(obj) {
            obj.position.set(25,-19,30);
            obj.scale.set(0.09,0.09,0.1);
            that.scene.add(obj);
          });
      });
    },
    //导入白色椅子
    whitechair() {
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/studio/椅子.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/studio/椅子.obj",
          function(obj) {
            obj.position.set(0,-23,0);
            obj.scale.set(0.08,0.08,0.08);
            var obj1 = obj.clone();
            obj1.position.set(0,-23,50);
            obj1.scale.set(0.09,0.09,0.09);
            obj1.rotation.y = Math.PI/2;
            that.scene.add(obj,obj1);
          });
      });
    },
    //导入台灯
    tablelamp() {
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/studio/台灯.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/studio/台灯.obj",
          function(obj) {
            obj.position.set(-330,-18,120);
            obj.scale.set(0.08,0.09,0.08);
            obj.rotation.y = Math.PI
            that.scene.add(obj);
          });
      });
    },
    //导入电脑
    computer() {
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/studio/电脑.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/studio/电脑.obj",
          function(obj) {
            obj.position.set(0,-12,0);
            obj.scale.set(0.08,0.08,0.08);
            var obj2 = obj.clone();
            obj2.position.set(210,-107,40);
            obj2.scale.set(0.18,0.18,0.18);
            obj2.name = "控制台";
            obj2.rotation.y = Math.PI*0.5;
            that.scene.add(obj,obj2);
          });
      });
    },
    //导入小凳子
    smallchair() {
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/studio/book/凳子.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/studio/book/凳子.obj",
          function(obj) {
            obj.position.set(-10,-20,10);
            obj.scale.set(0.08,0.08,0.08);
            that.scene.add(obj);
          });
      });
    },
    //导入垃圾桶
     rubbish() {
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/studio/垃圾桶.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/studio/垃圾桶.obj",
          function(obj) {
            obj.position.set(-10,-20,0);
            obj.scale.set(0.08,0.09,0.08);
            that.scene.add(obj);
          });
      });
    },
    //导入时钟
    rubbish() {
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/studio/时钟.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/studio/时钟.obj",
          function(obj) {
            obj.position.set(0,0,-8);
            obj.scale.set(0.08,0.08,0.08);
            that.scene.add(obj);
          });
      });
    },
    //导入桌上装饰小球
     ball() {
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/studio/桌子上装饰.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/studio/桌子上装饰.obj",
          function(obj) {
            obj.position.set(0,-20,25);
            obj.scale.set(0.09,0.09,0.09);
            that.scene.add(obj);
          });
      });
    },
    //导入桌上装饰闹钟
     alarm() {
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/studio/桌上装饰2.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/studio/桌上装饰2.obj",
          function(obj) {
            obj.position.set(0,-10,3);
            obj.scale.set(0.08,0.08,0.08);
            that.scene.add(obj);
          });
      });
    },
    //导入书本
     book() {
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/studio/书.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/studio/书.obj",
          function(obj) {
            obj.position.set(-168,8,-43);
            obj.scale.set(0.07,0.07,0.07);
            obj.rotation.y = Math.PI*1.5;
            that.scene.add(obj);
          });
      });
    },
    //导入人物
     mananer() {
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/studio/人物.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/studio/人物.obj",
          function(obj) {
            obj.position.set(90,-15,80);
            obj.scale.set(0.06,0.07,0.07);
            obj.rotation.y = Math.PI*1.8;
            obj.name = "指导人";
            that.scene.add(obj);
          });
      });
    },
    // 导入书架上的书
    book11(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/studio/book/book1.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/studio/book/book1.obj",
          function(obj) {
            obj.position.set(-170,15,-15);
            obj.scale.set(0.6,0.6,0.6);
            obj.name = "书11";
            obj.rotation.y = Math.PI/2;
            that.scene.add(obj);
          });
      });
    },
    book12(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/studio/book/book1_2.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/studio/book/book1_2.obj",
          function(obj) {
            obj.position.set(-170,15,-35);
            obj.scale.set(0.6,0.6,0.6);
            obj.name = "书12";
            obj.rotation.y = Math.PI/2;
            that.scene.add(obj);
          });
      });
    },
    book21(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/studio/book/book2_1.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/studio/book/book2_1.obj",
          function(obj) {
            obj.position.set(-170,10,-20);
            obj.scale.set(0.6,0.6,0.6);
            obj.name = "书21";
            obj.rotation.y = Math.PI/2;
            that.scene.add(obj);
          });
      });
    },
    book22(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/studio/book/book2_2.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/studio/book/book2_2.obj",
          function(obj) {
            obj.position.set(-170,10,-35);
            obj.scale.set(0.6,0.6,0.6);
            obj.name = "书22";
            obj.rotation.y = Math.PI/2;
            that.scene.add(obj);
          });
      });
    },
    book31(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/studio/book/book3_1.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/studio/book/book3_1.obj",
          function(obj) {
            obj.position.set(-170,5,-20);
            obj.scale.set(0.6,0.6,0.6);
            obj.name = "书31";
            obj.rotation.y = Math.PI/2;
            that.scene.add(obj);
          });
      });
    },
    book32(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/studio/book/book3_2.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/studio/book/book3_2.obj",
          function(obj) {
            obj.position.set(-170,5,-35);
            obj.scale.set(0.6,0.6,0.6);
            obj.name = "书32";
            obj.rotation.y = Math.PI/2;
            that.scene.add(obj);
          });
      });
    },
    book41(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/studio/book/book4_1.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/studio/book/book4_1.obj",
          function(obj) {
            obj.position.set(-170,0,-20);
            obj.scale.set(0.6,0.6,0.6);
            obj.name = "书41";
            obj.rotation.y = Math.PI/2;
            that.scene.add(obj);
          });
      });
    },
    book42(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/studio/book/book4_2.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/studio/book/book4_2.obj",
          function(obj) {
            obj.position.set(-170,0,-35);
            obj.scale.set(0.6,0.6,0.6);
            obj.name = "书42";
            obj.rotation.y = Math.PI/2;
            that.scene.add(obj);
          });
      });
    },
    // 创建文字
    // createtext(){
    //     var loader = new THREE.FontLoader();
    //     var newtext;
    //     loader.load("/static/optimer_regular.typeface.json",function(font){
    //             newtext = new THREE.TextGeometry('个人中心',{
    //             font:font,
    //             size:1,
    //             height:0.5
    //         });
    //     });
    //     var material_text = new THREE.MeshLambertMaterial({color:0x9933ff});
    //     var text = new THREE.Mesh(newtext,material_text);
    //     this.scene.add(text);
    //     text.position.set(0,0,0);
    // },
    initmodel(){
        this.createfloor();
        this.createwall(10,200,400,0,new THREE.MeshLambertMaterial({color:0xb3cc8b}),-200,100,0,"左墙");
        this.createwall(10,200,400,1.5,new THREE.MeshLambertMaterial({color:0xb3cc8b}),0,100,-200,"对墙");
        this.bookjia();
        this.book11();
        this.book12();
        this.book21();
        this.book22();
        this.book31();
        this.book32();
        this.book41();
        this.book42();
        this.computerdesk();
        this.commondesk();
        this.whitechair();
        this.tablelamp();
        this.computer();
        this.smallchair();
        this.rubbish();
        this.ball();
        this.alarm();
        this.book();
        this.mananer();
        // this.createtext();
    }
  },
  mounted(){
    this.init();
    this.initmodel();
    this.animate();
    document.getElementsByTagName("canvas")[0].style.verticalAlign = "bottom"; //解决canvas底部留白问题
    window.addEventListener("click", this.onclick, false);
    // window.addEventListener("resize", this.onResize, false);
  },
  destroyed() {
    // cancelAnimationFrame(this.requestId);
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    // this.CSSRender = null;
    // window.removeEventListener("resize", this.onResize, false);
    window.removeEventListener("click", this.onclick, false);
  }
}
</script>

<style scoped>
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