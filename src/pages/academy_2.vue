<template>
    <div id="academy">
        学院2
    </div>
</template>

<script>
import * as THREE from "three";
// import {OBJLoader,MTLLoader} from "three-obj-mtl-loader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
// import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
// import { TetrahedronGeometry } from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);
// import 'three-onevent.js';
export default {
    name:'academy_2',
    data(){
        return{
            scene:'',
            light:'',
            camera:'',
            renderer:'',
            meshfloor:'',
            canvas:'',
            context:'',
            selectedObjects:[]
        }
    },
    methods: {
    /**初始化 */
    initScene() {
      this.scene = new THREE.Scene();
      const ambientLight = new THREE.AmbientLight(0xffffff);
      this.scene.add(ambientLight);
      var axesHelper = new THREE.AxesHelper(200);
      this.scene.add(axesHelper);
    },
    initCamera() {
      const aspect = window.innerWidth / innerHeight; //宽高可根据实际项目要求更改 如果是窗口高度改为innerHeight
      this.camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
      this.camera.position.set(0, 50, 300);
      this.camera.lookAt(this.scene.position); // 让相机指向原点

      const pointLight = new THREE.PointLight(0xffffff,1,400);
      pointLight.position.set(0,100,-300);
      const pointLight1 = new THREE.PointLight(0xffffff,1,400);
      pointLight1.position.set(200,100,300);
      const pointLight2 = new THREE.DirectionalLight(0xffffff,1);
      pointLight2.position.set(0,10,300);
      const pointLight3 = new THREE.PointLight(0xffffff,1,400);
      pointLight3.position.set(0,200,0);
      this.scene.add(pointLight);
      this.scene.add(pointLight1);
      this.scene.add(pointLight2);
      this.scene.add(pointLight3);
      this.scene.add(this.camera);

    },
    initRenderer() {
      this.renderer = new THREE.WebGLRenderer({ antialiasing: true,alpha:true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth,innerHeight); //宽高可根据实际项目要求更改 如果是窗口高度改为innerHeight
      // this.renderer.domElement.style.position = 'absolute';
      // this.renderer.domElement.style.top = 0;
      this.container = document.getElementById("academy");
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
        controls.enableKeys = true;
        controls.minDistance = 10;
        controls.maxDistance = 1000;
        controls.maxPolarAngle = 1.5;
        controls.minPolarAngle = 0.0;
        controls.keyPanSpeed = 7;
        controls.keys = {
            LEFT:37,
            UP:38,
            RIGHT:39,
            BOTTOM:40
        }
        this.controls =controls;

    },
     //鼠标点击实现
  onclick(event){
    // event.preventDefault();
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) *2 -1;
    mouse.y =-(event.clientY / window.innerHeight) *2 +1;
    raycaster.setFromCamera(mouse,this.camera);
    var intersects = raycaster.intersectObjects(this.scene.children,true);
    // console.log(intersects);

    if(intersects.length ==0){
      return;
    }
    if(intersects[0].object.name =="地板" || (intersects[0].object.name=="")){
      this.selectedObjects.pop();
    }
    else{
      if(intersects[0].object.name){
        this.selectedObjects.pop();
        this.selectedObjects.push(intersects[0].object);
        console.log(intersects[0].object);
        // this.$router.replace('/house');
      }
    }
  },
    animate() {
      this.renderer.render(this.scene, this.camera);
     requestAnimationFrame(this.animate);
    },
    init() {
      // this.group = new THREE.Group();
      this.initScene();
      this.initCamera();
      this.initRenderer();
      this.initOrbitControls();
    },
  /*加载模型 */

    // 创建地板
    createfloor(){
      this.meshfloor = new THREE.Mesh(
        new THREE.PlaneGeometry(400,400,20,20),
        new THREE.MeshPhongMaterial({
          color:0x00ff00,
          wireframe:false,
          side:THREE.DoubleSide
          })
      );
      this.meshfloor.rotation.x -= Math.PI / 2;
      this.meshfloor.name = "地板";
      this.scene.add(this.meshfloor);
    },
    // 导入城堡
    chengbao(){
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/js/lib/draco/');
    loader.setDRACOLoader(dracoLoader);
    loader.load('/static/academic2/城堡.glb',(gltf)=>{
      gltf.scene.scale.set(100,100,100);
      gltf.scene.position.set(0,5,150);
      gltf.scene.name = "城堡";
      this.scene.add(gltf.scene);
      })
    },
    //导入蓝色房子
    bluehouse(){
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/js/lib/draco/');
    loader.setDRACOLoader(dracoLoader);
    loader.load('/static/academic2/蓝房子.glb',(gltf)=>{
      gltf.scene.scale.set(15,15,15);
      gltf.scene.position.set(80,0,150);
      gltf.name = "蓝色房子";
      this.scene.add(gltf.scene);
      })
    },
    //导入红房子
    redhouse(){
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/js/lib/draco/');
    loader.setDRACOLoader(dracoLoader);
    loader.load('/static/academic2/红房子.glb',(gltf)=>{
      gltf.scene.scale.set(10,10,10);
      gltf.scene.position.set(-80,0,150);
      gltf.name = "红房子";
      this.scene.add(gltf.scene);
      })
    },
    // 导入大厦
    bighouse(){
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/js/lib/draco/');
    loader.setDRACOLoader(dracoLoader);
    loader.load('/static/academic2/大厦.glb',(gltf)=>{
      gltf.scene.scale.set(4,2,4);
      gltf.scene.position.set(120,0,50);
      gltf.scene.rotation.y = Math.PI / 2;
      gltf.name = "大厦";
      this.scene.add(gltf.scene);
      })
    },
    //导入绿房子
    greenhouse(){
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/js/lib/draco/');
    loader.setDRACOLoader(dracoLoader);
    loader.load('/static/academic2/绿房子.glb',(gltf)=>{
      gltf.scene.scale.set(1000,1000,1200);
      gltf.scene.position.set(-100,0,20);
      gltf.name = "绿房子";
      this.scene.add(gltf.scene);
      })
    },
    // 导入home
    home(){
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/js/lib/draco/');
    loader.setDRACOLoader(dracoLoader);
    loader.load('/static/academic2/Home.glb',(gltf)=>{
      gltf.scene.scale.set(100,100,100);
      gltf.scene.position.set(-80,0,-100);
      gltf.name = 'home';
      this.scene.add(gltf.scene);
      })
    },
    // 导入学校
    fangzi(){
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/js/lib/draco/');
    loader.setDRACOLoader(dracoLoader);
    loader.load('/static/academic2/学校.glb',(gltf)=>{
      gltf.scene.scale.set(10,10,10);
      gltf.scene.position.set(100,0,-100);
      gltf.name = '学校';
      this.scene.add(gltf.scene);
      })
    },
    //导入红树
    yeshu(){
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/js/lib/draco/');
    loader.setDRACOLoader(dracoLoader);
    loader.load('/static/academic2/redtree.glb',(gltf)=>{
      gltf.scene.scale.set(200,200,200);
      gltf.scene.position.set(150,0,170);
    //   var obj1 = gltf.scene.clone();
    //   obj1.scale.set(50,50,50);
    //   obj1.position.set(130,0,170);
      this.scene.add(gltf.scene);
      })
    },
    yeshu1(){
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/js/lib/draco/');
    loader.setDRACOLoader(dracoLoader);
    loader.load('/static/academic2/redtree.glb',(gltf)=>{
      gltf.scene.scale.set(200,200,200);
      gltf.scene.position.set(-130,0,170);
    //   var obj1 = gltf.scene.clone();
    //   obj1.scale.set(50,50,50);
    //   obj1.position.set(130,0,170);
      this.scene.add(gltf.scene);
      })
    },
    //导入枫树
    sea(){
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/js/lib/draco/');
    loader.setDRACOLoader(dracoLoader);
    loader.load('/static/academic2/枫树.glb',(gltf)=>{
      gltf.scene.scale.set(250,250,250);
      gltf.scene.position.set(0,0,0);
      this.scene.add(gltf.scene);
      })
    },
    // 导入松树
    fengtree(){
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/js/lib/draco/');
    loader.setDRACOLoader(dracoLoader);
    loader.load('/static/academic2/松树.glb',(gltf)=>{
      gltf.scene.scale.set(100,100,100);
      gltf.scene.position.set(-170,0,140);
      // gltf.scene.rotation.y = Math.PI;
      this.scene.add(gltf.scene);
      })
    },
    // 导入圣诞树
    shengtree(){
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/js/lib/draco/');
    loader.setDRACOLoader(dracoLoader);
    loader.load('/static/academic2/圣诞树.glb',(gltf)=>{
      gltf.scene.scale.set(500,500,500);
      gltf.scene.position.set(-170,0,-140);
    //   gltf.scene.rotation.y = Math.PI;
      this.scene.add(gltf.scene);
      })
    },

    initmodel(){
    //   this.loadMTL();
      this.createfloor();
      this.chengbao();
      this.bluehouse();
      this.redhouse();
      this.bighouse();
      this.greenhouse();
      this.home();
      this.fangzi();
      this.yeshu();
      this.yeshu1();
      this.sea();
      this.fengtree();
      this.shengtree();
    },
  

  },
  mounted() {
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
    // // this.CSSRender = null;
    // window.removeEventListener("resize", this.onResize, false);
    window.removeEventListener("click", this.onclick, false);
  }
}
</script>

<style scoped>
/* #academy{
    height: 600px;
} */
</style>