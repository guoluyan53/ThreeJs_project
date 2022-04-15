<template>
    <div id="academy">
      <div class="out" @click="toLogin()">
              <div class="in"></div>
        </div>
    </div>
</template>

<script>
import * as THREE from "three";
import {OBJLoader,MTLLoader} from "three-obj-mtl-loader";
const OrbitControls = require('three-orbit-controls')(THREE);
export default {
    name:'academy',
    data(){
        return{
            scene:'',
            light:'',
            camera:'',
            renderer:'',
            meshfloor:'',
            selectedObjects:[],
            address:[
              {name:"aaaa",
              position:0}
            ],
            cavasHtmlGroup:''
        }
    },
    methods: {
      toLogin(){
            this.$router.push("/map");
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
      this.camera.position.set(0, 40, 450);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0)); // 让相机指向原点

      const pointLight = new THREE.PointLight(0xffffff,1,400);
      pointLight.position.set(0,100,-300);
      const pointLight1 = new THREE.PointLight(0xffffff,1,400);
      pointLight1.position.set(200,100,300);
      const pointLight2 = new THREE.PointLight(0xffffff,1,400);
      pointLight2.position.set(0,200,300);
      const pointLight3 = new THREE.PointLight(0xffffff,1,400);
      pointLight3.position.set(0,200,0);
      // const light1 = new THREE.DirectionalLight(0xffffff)
      this.scene.add(pointLight);
      this.scene.add(pointLight1);
      this.scene.add(pointLight2);
      this.scene.add(pointLight3);
      // this.scene.add(light1);
      this.scene.add(this.camera);

    },
    initRenderer() {
      this.renderer = new THREE.WebGLRenderer({ antialiasing: true, });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth,window.innerHeight); //宽高可根据实际项目要求更改 如果是窗口高度改为innerHeight
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
        controls.enablePan = false;
        controls.enableKeys = true;
        controls.minDistance = 10;
        controls.maxDistance = 450;
        controls.maxPolarAngle = 1.5;
        controls.minPolarAngle = 1;
        controls.keyPanSpeed = 7;
        controls.keys = {
            LEFT:37,
            UP:38,
            RIGHT:39,
            BOTTOM:40
        }
        this.controls =controls;

    },

    //天空盒
    // 加载天空盒
  loaderSky() {
    let skyTexture = new THREE.CubeTextureLoader()
      .setPath("/static/academic/")
      .load([
        "2.jpg", //右
        "4.jpg", //左
        "1.jpg", //上
        "6.jpg", //下
        "5.jpg", //前
        "3.jpg" //后
      ]);

    this.scene.background = skyTexture;
    this.renderer.setClearAlpha(1);
  },
  //鼠标点击实现
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
    if(intersects[0].object.name =="地面" || (intersects[0].object.parent.name=="")){
      this.selectedObjects.pop();
    }
    else{
      if(intersects[0].object.parent.name){
        this.selectedObjects.pop();
        this.selectedObjects.push(intersects[0].object);
        console.log(intersects[0].object);
        this.$router.replace('/house');
      }
    }

  },
  // 创建精灵标签
    sprite(){
      var texture = new THREE.TextureLoader().load("/static/textbac.png");
      // 创建精灵材质对象spriteMaterial
      var spriteMaterial = new THREE.SpriteMaterial({
        // color:0xff00ff,  //设置精灵矩形区域颜色
        // rotation:Math.PI/4,  //旋转精灵对象45度，弧度制
        map:texture,
      });

      // 创建精灵模型对象，不需要几何体geometry参数
      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(50,50,50);
      sprite.position.set(100,50,0);
      this.scene.add(sprite);
    },
   
    // 精灵标签中写文字-----canvas
    writesprite1(){
      let canvas4 = document.createElement('canvas');
      let ctx1 = canvas4.getContext('2d');
      //参考canvas对基本操作的描述
      // ctx4.scale(2, 2)
      canvas4.width = 180
      canvas4.height = 170
      ctx1.fillStyle = '#fff44b'
      ctx1.font = '30px Arial blod'
      ctx1.fillText('前端工作室', 10, 60)
      let texture4 = new THREE.Texture(canvas4)
      texture4.minFilter = THREE.NearestFilter //这语句解决图片的失真问题，最近渲染
      texture4.needsUpdate = true //注意这句不能少
      let material4 = new THREE.SpriteMaterial({
	    map: texture4,
	    // transparent: true,  //透明度得开启    使得图片有透明的色阶背景
	    side: THREE.DoubleSide, //双面打开
	    depthTest: false, //关闭这个深重影方法转动时不会有影子
      })
      // 创建精灵模型对象，不需要几何体geometry参数
      var sprite1 = new THREE.Sprite(material4);
      sprite1.scale.set(60,60,60);
      sprite1.position.set(20,190,-180);
      this.scene.add(sprite1);
    },
    writesprite2(){
      let canvas4 = document.createElement('canvas');
      let ctx1 = canvas4.getContext('2d');
      //参考canvas对基本操作的描述
      // ctx4.scale(2, 2)
      canvas4.width = 180
      canvas4.height = 170
      ctx1.fillStyle = '#fff44b'
      ctx1.font = '30px Arial blod'
      ctx1.fillText('后端工作室', 10, 60)
      let texture4 = new THREE.Texture(canvas4)
      texture4.minFilter = THREE.NearestFilter //这语句解决图片的失真问题，最近渲染
      texture4.needsUpdate = true //注意这句不能少
      let material4 = new THREE.SpriteMaterial({
	    map: texture4,
	    transparent: true,  //透明度得开启    使得图片有透明的色阶背景
	    side: THREE.DoubleSide, //双面打开
	    depthTest: false, //关闭这个深重影方法转动时不会有影子
      })
      // 创建精灵模型对象，不需要几何体geometry参数
      var sprite2 = new THREE.Sprite(material4);
      sprite2.scale.set(60,60,60);
      sprite2.position.set(-140,50,60);
      this.scene.add(sprite2);
    },
    writesprite3(){
      let canvas4 = document.createElement('canvas');
      let ctx1 = canvas4.getContext('2d');
      //参考canvas对基本操作的描述
      // ctx4.scale(2, 2)
      canvas4.width = 180
      canvas4.height = 170
      ctx1.fillStyle = '#fff44b'
      ctx1.font = '30px Arial blod'
      ctx1.fillText('弘毅工作室', 10, 60)
      let texture4 = new THREE.Texture(canvas4)
      texture4.minFilter = THREE.NearestFilter //这语句解决图片的失真问题，最近渲染
      texture4.needsUpdate = true //注意这句不能少
      let material4 = new THREE.SpriteMaterial({
	    map: texture4,
	    transparent: true,  //透明度得开启    使得图片有透明的色阶背景
	    side: THREE.DoubleSide, //双面打开
	    depthTest: false, //关闭这个深重影方法转动时不会有影子
      })
      // 创建精灵模型对象，不需要几何体geometry参数
      var sprite2 = new THREE.Sprite(material4);
      sprite2.scale.set(60,60,60);
      sprite2.position.set(200,50,140);
      this.scene.add(sprite2);
    },
    writesprite4(){
      let canvas4 = document.createElement('canvas');
      let ctx1 = canvas4.getContext('2d');
      //参考canvas对基本操作的描述
      // ctx4.scale(2, 2)
      canvas4.width = 180
      canvas4.height = 170
      ctx1.fillStyle = '#fff44b'
      ctx1.font = '30px Arial blod'
      ctx1.fillText('UI工作室', 10, 60)
      let texture4 = new THREE.Texture(canvas4)
      texture4.minFilter = THREE.NearestFilter //这语句解决图片的失真问题，最近渲染
      texture4.needsUpdate = true //注意这句不能少
      let material4 = new THREE.SpriteMaterial({
	    map: texture4,
	    transparent: true,  //透明度得开启    使得图片有透明的色阶背景
	    side: THREE.DoubleSide, //双面打开
	    depthTest: false, //关闭这个深重影方法转动时不会有影子
      })
      // 创建精灵模型对象，不需要几何体geometry参数
      var sprite2 = new THREE.Sprite(material4);
      sprite2.scale.set(60,60,60);
      sprite2.position.set(170,65,15);
      this.scene.add(sprite2);
    },
    writesprite5(){
      let canvas4 = document.createElement('canvas');
      let ctx1 = canvas4.getContext('2d');
      //参考canvas对基本操作的描述
      // ctx4.scale(2, 2)
      canvas4.width = 180
      canvas4.height = 170
      ctx1.fillStyle = '#fff44b'
      ctx1.font = '30px Arial blod'
      ctx1.fillText('JAVA工作室', 10, 60)
      let texture4 = new THREE.Texture(canvas4)
      texture4.minFilter = THREE.NearestFilter //这语句解决图片的失真问题，最近渲染
      texture4.needsUpdate = true //注意这句不能少
      let material4 = new THREE.SpriteMaterial({
	    map: texture4,
	    transparent: true,  //透明度得开启    使得图片有透明的色阶背景
	    side: THREE.DoubleSide, //双面打开
	    depthTest: false, //关闭这个深重影方法转动时不会有影子
      })
      // 创建精灵模型对象，不需要几何体geometry参数
      var sprite2 = new THREE.Sprite(material4);
      sprite2.scale.set(60,60,60);
      sprite2.position.set(-40,35,110);
      this.scene.add(sprite2);
    },
    // writesprite6(){
    //   let canvas4 = document.createElement('canvas');
    //   let ctx1 = canvas4.getContext('2d');
    //   //参考canvas对基本操作的描述
    //   // ctx4.scale(2, 2)
    //   canvas4.width = 180
    //   canvas4.height = 170
    //   ctx1.fillStyle = '#fff44b'
    //   ctx1.font = '30px Arial blod'
    //   ctx1.fillText('无边工作室', 10, 60)
    //   let texture4 = new THREE.Texture(canvas4)
    //   texture4.minFilter = THREE.NearestFilter //这语句解决图片的失真问题，最近渲染
    //   texture4.needsUpdate = true //注意这句不能少
    //   let material4 = new THREE.SpriteMaterial({
	  //   map: texture4,
	  //   transparent: true,  //透明度得开启    使得图片有透明的色阶背景
	  //   side: THREE.DoubleSide, //双面打开
	  //   depthTest: false, //关闭这个深重影方法转动时不会有影子
    //   })
    //   // 创建精灵模型对象，不需要几何体geometry参数
    //   var sprite2 = new THREE.Sprite(material4);
    //   sprite2.scale.set(60,60,60);
    //   sprite2.position.set(-60,20,-55);
    //   this.scene.add(sprite2);
    // },
    writesprite7(){
      let canvas4 = document.createElement('canvas');
      let ctx1 = canvas4.getContext('2d');
      //参考canvas对基本操作的描述
      // ctx4.scale(2, 2)
      canvas4.width = 200
      canvas4.height = 170
      ctx1.fillStyle = '#fff44b'
      ctx1.font = '30px Arial blod'
      ctx1.fillText('创新工作室', 10, 60)
      let texture4 = new THREE.Texture(canvas4)
      texture4.minFilter = THREE.NearestFilter //这语句解决图片的失真问题，最近渲染
      texture4.needsUpdate = true //注意这句不能少
      let material4 = new THREE.SpriteMaterial({
	    map: texture4,
	    transparent: true,  //透明度得开启    使得图片有透明的色阶背景
	    side: THREE.DoubleSide, //双面打开
	    depthTest: false, //关闭这个深重影方法转动时不会有影子
      })
      // 创建精灵模型对象，不需要几何体geometry参数
      var sprite2 = new THREE.Sprite(material4);
      sprite2.scale.set(60,60,60);
      sprite2.position.set(200,190,-180);
      this.scene.add(sprite2);
    },
    writesprite8(){
      let canvas4 = document.createElement('canvas');
      let ctx1 = canvas4.getContext('2d');
      //参考canvas对基本操作的描述
      // ctx4.scale(2, 2)
      canvas4.width = 180
      canvas4.height = 170
      ctx1.fillStyle = '#fff44b'
      ctx1.font = '30px Arial blod'
      ctx1.fillText('设计工作室', 10, 60)
      let texture4 = new THREE.Texture(canvas4)
      texture4.minFilter = THREE.NearestFilter //这语句解决图片的失真问题，最近渲染
      texture4.needsUpdate = true //注意这句不能少
      let material4 = new THREE.SpriteMaterial({
	    map: texture4,
	    transparent: true,  //透明度得开启    使得图片有透明的色阶背景
	    side: THREE.DoubleSide, //双面打开
	    depthTest: false, //关闭这个深重影方法转动时不会有影子
      })
      // 创建精灵模型对象，不需要几何体geometry参数
      var sprite2 = new THREE.Sprite(material4);
      sprite2.scale.set(60,60,50);
      sprite2.position.set(125,130,-60);
      this.scene.add(sprite2);
    },
    writesprite9(){
      let canvas4 = document.createElement('canvas');
      let ctx1 = canvas4.getContext('2d');
      //参考canvas对基本操作的描述
      // ctx4.scale(2, 2)
      canvas4.width = 180
      canvas4.height = 170
      ctx1.fillStyle = '#fff44b'
      ctx1.font = '30px Arial blod'
      ctx1.fillText('网站工作室', 10, 60)
      let texture4 = new THREE.Texture(canvas4)
      texture4.minFilter = THREE.NearestFilter //这语句解决图片的失真问题，最近渲染
      texture4.needsUpdate = true //注意这句不能少
      let material4 = new THREE.SpriteMaterial({
	    map: texture4,
	    transparent: true,  //透明度得开启    使得图片有透明的色阶背景
	    side: THREE.DoubleSide, //双面打开
	    depthTest: false, //关闭这个深重影方法转动时不会有影子
      })
      // 创建精灵模型对象，不需要几何体geometry参数
      var sprite2 = new THREE.Sprite(material4);
      sprite2.scale.set(60,60,60);
      sprite2.position.set(-130,120,-900);
      this.scene.add(sprite2);
    },


    animate() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
    },
    init() {
      this.initScene();
      this.initCamera();
      this.initRenderer();
      this.initOrbitControls();
      this.sprite();
      this.writesprite1();
      this.writesprite2();
      this.writesprite3();
      this.writesprite4();
      this.writesprite5();
      // this.writesprite6();
      this.writesprite7();
      this.writesprite8();
      this.writesprite9();

      // this.initbg();
      this.scene.background = new THREE.TextureLoader().load("/static/天空.jpg");
      // this.address.forEach((item) => {
      //   this.createSprite(item.name, item.position);
      // });

    },
    /**加载模型 */

    // 创建地板
    createfloor(){
      var loader = new THREE.TextureLoader();
      var that = this;
      loader.load("/static/academic/ground.jpg",function(texture){
        // texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        // texture.repeat.set(100,100);
        var floorGeometry = new THREE.BoxGeometry(800,800,1);
        var floorMaterial = new THREE.MeshBasicMaterial({
          map:texture,
          side:THREE.DoubleSide
        });
        var floor = new THREE.Mesh(floorGeometry,floorMaterial);
        // this.meshfloor.position.y = -0.5;
        floor.rotation.x -= Math.PI /2;
        floor.name = "地面";
        that.scene.add(floor);
      });
    },

    // 导入牌子模型
    paizi(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/academic/带字牌子.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/academic/带字牌子.obj",
          function(obj) {
            obj.position.set(-40,0,140);
            obj.scale.set(0.02, 0.02, 0.02);
           
            that.scene.add(obj);
          },
        );
      });
    },

    // 导入围栏模型
    weilan(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/academic/围栏.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/academic/围栏.obj",
          function(obj) {
            obj.position.set(-15,0,20);
            obj.scale.set(0.05, 0.03, 0.04);
           
            that.scene.add(obj);
          },
        );
      });
    },
    // 导入蓝色城堡
    chengbao(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/academic/蓝色城堡.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/academic/蓝色城堡.obj",
          function(obj) {
            obj.position.set(-130,0,150);
            obj.scale.set(0.08, 0.08, 0.1);
            obj.name = "蓝色城堡";
            that.scene.add(obj);
          },
        );
      });
    },
    // 导入蓝黄房子
    blueyellowhome(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/academic/蓝黄房子.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/academic/蓝黄房子.obj",
          function(obj) {
            obj.position.set(20,0,-110);
            obj.scale.set(0.05, 0.05, 0.05);
            obj.name ="蓝黄房子";
            that.scene.add(obj);
          },
        );
      });
    },
    // 导入绿红建筑
    greenredhome(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/academic/绿红建筑.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/academic/绿红建筑.obj",
          function(obj) {
            obj.position.set(350,0,20);
            obj.scale.set(0.05, 0.05, 0.05);
            obj.name = "绿红建筑";
            that.scene.add(obj);
          },
        );
      });
    },
    // 导入蓝色大厦
    bluebighome(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/academic/蓝色大厦4.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/academic/蓝色大厦4.obj",
          function(obj) {
            obj.position.set(20,0,-120);
            obj.scale.set(0.03, 0.05, 0.03);
            var obj1 = obj.clone();
            obj1.position.set(-250,0,-120);
            obj1.scale.set(0.03,0.05,0.03);
            obj.name = "蓝色大厦";
            obj1.name = "蓝色大厦";
            that.scene.add(obj,obj1);
          },
        );
      });
    },
    // 导入蓝灰房子
    bluegrayhome(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/academic/蓝灰房子.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/academic/蓝灰房子.obj",
          function(obj) {
            obj.position.set(-80,0,-40);
            obj.scale.set(0.05, 0.06, 0.05);
            // var obj1 = obj.clone();
            // obj1.position.set(0,0,-200);
            // obj1.scale.set(0.05, 0.06, 0.05)
            // var obj2 = obj.clone();
            // obj2.position.set(-100,0,-50);
            // obj2.scale.set(0.05, 0.06, 0.05);
            obj.name = "蓝灰房子";
            // obj1.name = "蓝灰房子";
            // obj2.name ="蓝灰房子";
            that.scene.add(obj);
          },
        );
      });
    },
    // 导入红紫小房子
    ppredhome(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/academic/红紫小房子.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/academic/红紫小房子.obj",
          function(obj) {
            obj.position.set(-70,0,170);
            obj.scale.set(0.05, 0.06, 0.05);
            obj.name = "紫红小房子";
            that.scene.add(obj);
          },
        );
      });
    },
  // 加载大城堡
  bighouse(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/academic/蓝红.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/academic/蓝红.obj",
          function(obj) {
            obj.position.set(-20,-20,-200);
            obj.scale.set(0.03,0.04,0.03);
            obj.name = "大城堡";
            that.scene.add(obj);
          },
     
        );
      });
    },
  // 导入绿树2
  greentree2(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/academic/绿树2.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/academic/绿树2.obj",
          function(obj) {
            obj.position.set(50,0,-120);
            obj.scale.set(0.05, 0.05, 0.05);
            var obj1 = obj.clone();
            obj1.position.set(-50,0,-120);
            obj1.scale.set(0.05, 0.05, 0.05)
            obj.traverse(function(child){
              if(child instanceof THREE.Mesh){
                child.material.transparent = true;
              }
            });
            that.scene.add(obj,obj1);
          },
        );
      });
  },
  // 导入绿树1
  greentree1(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/academic/绿树1.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/academic/绿树1.obj",
          function(obj) {
            obj.position.set(100,0,-140);
            obj.scale.set(0.05, 0.05, 0.05);
            var obj1 = obj.clone();
            obj1.position.set(120,0,-130);
            obj1.scale.set(0.05, 0.05, 0.05)
            var obj2 = obj.clone();
            obj2.position.set(150,0,-150);
            obj2.scale.set(0.05, 0.05, 0.05);
            var obj3 = obj.clone();
            obj3.position.set(-100,0,-150);
            obj3.scale.set(0.05, 0.05, 0.05)
            var obj4 = obj.clone();
            obj4.position.set(-150,0,-140);
            obj4.scale.set(0.05, 0.05, 0.05);
            that.scene.add(obj,obj1,obj2,obj3,obj4);
          },
        );
      });
  },
  // 导入大樱花树2颗
  bigflowertree(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/academic/大樱花树.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/academic/大樱花树.obj",
          function(obj) {
            obj.position.set(-490,0,120);
            obj.scale.set(0.04, 0.04, 0.04);
            var obj1 = obj.clone();
            obj1.position.set(5,0,60);
            obj1.scale.set(0.04, 0.04, 0.04)
            that.scene.add(obj,obj1);
          },
        );
      });
  },
  // 导入中樱花树3颗
  middleflowertree(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/academic/中樱花树.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/academic/中樱花树.obj",
          function(obj) {
            obj.position.set(-20,0,-10);
            obj.scale.set(0.04, 0.04, 0.04);
            var obj1 = obj.clone();
            obj1.position.set(-10,0,-130);
            obj1.scale.set(0.04, 0.04, 0.04)
            var obj2 = obj.clone();
            obj2.position.set(300,0,-230);
            obj2.scale.set(0.04, 0.04, 0.04);
            that.scene.add(obj,obj1,obj2);
          },
        );
      });
  },
  // 导入小樱花树4颗
  smallflowertree(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/academic/小樱花树.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/academic/小樱花树.obj",
          function(obj) {
            obj.position.set(-100,0,-120);
            obj.scale.set(0.04, 0.04, 0.04);
            // var obj1 = obj.clone();
            // obj1.position.set(10,0,-80);
            // obj1.scale.set(0.04, 0.04, 0.04)
            // var obj2 = obj.clone();
            // obj2.position.set(100,0,-150);
            // obj2.scale.set(0.04, 0.04, 0.04);
            // var obj3 = obj.clone();
            // obj3.position.set(-100,0,-120);
            // obj3.scale.set(0.04, 0.04, 0.04)
            that.scene.add(obj);
          },
        );
      });
  },
  initmodel(){
      // this.loadfbx();
      this.weilan();
      this.createfloor();
      this.paizi();
      this.chengbao();
      this.blueyellowhome();
      this.greenredhome();
      this.bluebighome();
      this.bluegrayhome();
      this.ppredhome();
      this.bighouse();
      this.greentree1();
      this.greentree2();
      this.bigflowertree();
      this.middleflowertree();
      this.smallflowertree();
      this.loaderSky();
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
    // this.CSSRender = null;
    // window.removeEventListener("resize", this.onResize, false);
    window.removeEventListener("click", this.onclick, false);
  }
}
</script>

<style scoped>
/* #academy{
    height: 600px;
} */
/* #label{
  position: absolute;
  padding: 10px;
  background: rgba(255, 255, 255, 0.6);
  line-height: 1;
  border-radius: 5px;
} */
.sprite-canvas {
  position: absolute;
  width: 1024px;
  height: 1024px;
  font-size: 128px;
  top: 0;
  box-sizing: border-box;
  background-color: transparent;
  color: #fff;
  text-align: center;
}
  .sprite-layer {
    margin-top: 60%;
    background-color: blue;
    padding: 1% 2%;
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