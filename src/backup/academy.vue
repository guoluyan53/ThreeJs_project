<template>
    <div id="academy">
        学院
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
            meshfloor:''
        }
    },
    methods: {
    /**初始化 */
    initScene() {
      this.scene = new THREE.Scene();
      const ambientLight = new THREE.AmbientLight(0xcccccc);
      this.scene.add(ambientLight);
      var axesHelper = new THREE.AxesHelper(200);
      this.scene.add(axesHelper);
    },
    initCamera() {
      const aspect = window.innerWidth / innerHeight; //宽高可根据实际项目要求更改 如果是窗口高度改为innerHeight
      this.camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
      this.camera.position.set(0, 100, 700);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0)); // 让相机指向原点

      const pointLight = new THREE.PointLight(0xffffff,1,100);
      pointLight.position.set(0,100,-300);
      this.scene.add(pointLight);
      this.scene.add(this.camera);
    },
    initRenderer() {
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, 1080); //宽高可根据实际项目要求更改 如果是窗口高度改为innerHeight
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
    animate() {
      this.renderer.render(this.scene, this.camera);
      this.requestId = requestAnimationFrame(this.animate);
    },
    init() {
      // this.group = new THREE.Group();
      this.initScene();
      this.initCamera();
      this.initRenderer();
      this.initOrbitControls();
    },
    /**加载模型 */

    // 创建地板
    createfloor(){
      this.meshfloor = new THREE.Mesh(
        new THREE.PlaneGeometry(400,400,20,20),
        new THREE.MeshPhongMaterial({
          color:0xffff,
          wireframe:false,
          side:THREE.DoubleSide
          })
      );
      this.meshfloor.rotation.x -= Math.PI / 2;
      this.scene.add(this.meshfloor);
    },

    // 导入牌子模型
    paizi(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/academic/立牌子.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/academic/立牌子.obj",
          function(obj) {
            obj.position.set(-15,0,100);
            obj.scale.set(0.02, 0.01, 0.02);
           
            that.scene.add(obj);
          },
        //   called while loading is progressing
          function(xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          },
        //   called when loading has errors
          function(error) {
            console.log("An error happened");
          }
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
            obj.position.set(0,0,0);
            obj.scale.set(0.03, 0.02, 0.02);
           
            that.scene.add(obj);
          },
        //   called while loading is progressing
        //   function(xhr) {
        //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        //   },
        // //   called when loading has errors
        //   function(error) {
        //     console.log("An error happened");
        //   }
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
            obj.position.set(0,0,0);
            obj.scale.set(0.02, 0.02, 0.02);
           
            that.scene.add(obj);
          },
        //   called while loading is progressing
        //   function(xhr) {
        //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        //   },
        // //   called when loading has errors
        //   function(error) {
        //     console.log("An error happened");
        //   }
        );
      });
    },
    // 导入绿红房子
    greenredhome(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/academic/绿红房子.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/academic/绿红房子.obj",
          function(obj) {
            obj.position.set(0,0,0);
            obj.scale.set(0.03, 0.02, 0.02);
           
            that.scene.add(obj);
          },
        //   called while loading is progressing
        //   function(xhr) {
        //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        //   },
        // //   called when loading has errors
        //   function(error) {
        //     console.log("An error happened");
        //   }
        );
      });
    },
    // 导入蓝色大厦
    bluebighome(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/academic/蓝色大厦.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/academic/蓝色大厦.obj",
          function(obj) {
            obj.position.set(0,0,0);
            obj.scale.set(0.032, 0.02, 0.02);
           
            that.scene.add(obj);
          },
        //   called while loading is progressing
        //   function(xhr) {
        //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        //   },
        // //   called when loading has errors
        //   function(error) {
        //     console.log("An error happened");
        //   }
        );
      });
    },
    // 导入蓝色大厦2
    bluebighome2(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/academic/蓝色大厦.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/academic/蓝色大厦.obj",
          function(obj) {
            obj.position.set(-200,0,-150);
            obj.scale.set(0.03, 0.02, 0.02);
           
            that.scene.add(obj);
          },
        //   called while loading is progressing
        //   function(xhr) {
        //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        //   },
        // //   called when loading has errors
        //   function(error) {
        //     console.log("An error happened");
        //   }
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
            obj.position.set(0,0,0);
            obj.scale.set(0.035, 0.02, 0.02);
           
            that.scene.add(obj);
          },
        //   called while loading is progressing
        //   function(xhr) {
        //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        //   },
        // //   called when loading has errors
        //   function(error) {
        //     console.log("An error happened");
        //   }
        );
      });
    },
    bluegrayhome2(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/academic/蓝灰房子.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/academic/蓝灰房子.obj",
          function(obj) {
            obj.position.set(0,0,-200);
            obj.scale.set(0.035, 0.02, 0.02);
           
            that.scene.add(obj);
          },
        //   called while loading is progressing
        //   function(xhr) {
        //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        //   },
        // //   called when loading has errors
        //   function(error) {
        //     console.log("An error happened");
        //   }
        );
      });
    },
    bluegrayhome3(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/academic/蓝灰房子.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/academic/蓝灰房子.obj",
          function(obj) {
            obj.position.set(-200,0,-100);
            obj.scale.set(0.035, 0.02, 0.02);
            
            that.scene.add(obj);
          },
        //   called while loading is progressing
        //   function(xhr) {
        //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        //   },
        // //   called when loading has errors
        //   function(error) {
        //     console.log("An error happened");
        //   }
        );
      });
    },
  //加载大城堡
  bighouse(){
      let that = this;
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      mtlLoader.load("/static/academic/蓝红建筑.mtl", function(materials) {
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
          "/static/academic/蓝红建筑.obj",
          function(obj) {
            obj.position.set(0,-5,50);
            obj.scale.set(0.03, 0.02, 0.02);
            that.scene.add(obj);
          },
     
        );
      });
    },

    initmodel(){
      this.createfloor();
      this.paizi();
      this.chengbao();
      this.blueyellowhome();
      this.greenredhome();
      this.bluebighome();
      this.bluebighome2();
      this.bluegrayhome();
      this.bluegrayhome2();
      this.bluegrayhome3();
      this.bighouse();
      // this.loadPlant();
    },
    // loadPlant() {
    //   let that = this;
    //   let objLoader = new OBJLoader();
    //   let mtlLoader = new MTLLoader();
    //   mtlLoader.load("/static/academic/绿树2.mtl", function(materials) {
    //     // materials.preload();
    //     objLoader.setMaterials(materials);
    //     objLoader.load(
    //       "/static/academic/绿树2.obj",
    //       function(obj) {
    //         obj.position.set(0, 0,0);
    //         obj.scale.set(0.01, 0.01, 0.01);
    //         that.scene.add(obj);
    //       },
    //     //   called while loading is progressing
    //       function(xhr) {
    //         console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    //       },
    //     //   called when loading has errors
    //       function(error) {
    //         console.log("An error happened");
    //       }
    //     );
    //   });
    // },


 
  },
  mounted() {
    this.init();
    this.initmodel();
    // this.loadPlant();
    this.animate();
    document.getElementsByTagName("canvas")[0].style.verticalAlign = "bottom"; //解决canvas底部留白问题
    // window.addEventListener("click", this.clickModel, false);
    // window.addEventListener("resize", this.onResize, false);
  },
//   destroyed() {
//     cancelAnimationFrame(this.requestId);
//     this.scene = null;
//     this.camera = null;
//     this.renderer = null;
//     this.controls = null;
//     this.CSSRender = null;
//     window.removeEventListener("resize", this.onResize, false);
//     window.removeEventListener("click", this.clickModel, false);
//   }
}
</script>

<style scoped>
/* #academy{
    height: 600px;
} */
</style>