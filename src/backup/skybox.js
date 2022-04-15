//天空盒
    // createCubeMap(){
    //   const path = "/static/academic/";
    //   // const format = ".jpg";  //图像后缀
    //   const directions = ['5.jpg','3.jpg','6.jpg','2.jpg','1.jpg','4.jpg'];
    //   var sky = new THREE.BoxGeometry(5000,5000,5000);
    //   var materialArray = [];
    //   for(var i=0;i<6;i++)
    //       materialArray.push(new THREE.MeshBasicMaterial({
    //         map:THREE.ImageUtils.loadTextureCube(path + directions[i]),
    //         side:THREE.BackSide
    //       }));
    //    var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
    //     var skyBox = new THREE.Mesh( sky, skyMaterial );//创建一个完整的天空盒，填入几何模型和材质的参数
    //     this.scene.add( skyBox );//在场景中加入天空
    // },