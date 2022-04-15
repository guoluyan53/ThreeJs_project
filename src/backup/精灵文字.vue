 // 精灵标签中写文字-----canvas
    writesprite(){
      let canvas4 = document.createElement('canvas');
      let ctx1 = canvas4.getContext('2d');
      let ctx2 = canvas4.getContext('2d');
      let ctx3 = canvas4.getContext('2d');
      let ctx4 = canvas4.getContext('2d');
      let ctx5 = canvas4.getContext('2d');
      let ctx6 = canvas4.getContext('2d');
      let ctx7 = canvas4.getContext('2d');
      let ctx8 = canvas4.getContext('2d');
      let ctx9 = canvas4.getContext('2d');
      let ctx10 = canvas4.getContext('2d');

      //参考canvas对基本操作的描述
      // ctx4.scale(2, 2)
      canvas4.width = 180
      canvas4.height = 170
      // ctx4.lineWidth = 2
      // ctx4.fillStyle = '#2aedff' // 文字填充颜色
      // ctx4.font = '16px Arial blod'
      // ctx4.shadowOffsetX = 2;
      // ctx4.shadowOffsetY = 2;
      // ctx4.fillText(`插座`, 10, 20)
      ctx1.fillStyle = '#00ff00'
      ctx1.font = '30px Arial blod'
      ctx1.fillText('城堡工作室', 10, 60)

      ctx2.fillStyle = '#00ff00'
      ctx2.font = '30px Arial blod'
      ctx2.fillText('黄的工作室', 10, 60)

      ctx3.fillStyle = '#00ff00'
      ctx3.font = '30px Arial blod'
      ctx3.fillText('边蓝工作室', 10, 60)

      ctx4.fillStyle = '#00ff00'
      ctx4.font = '30px Arial blod'
      ctx4.fillText('绿绿工作室', 10, 60)

      ctx5.fillStyle = '#00ff00'
      ctx5.font = '30px Arial blod'
      ctx5.fillText('红红工作室', 10, 60)

      ctx6.fillStyle = '#00ff00'
      ctx6.font = '30px Arial blod'
      ctx6.fillText('无边工作室', 10, 60)

      ctx7.fillStyle = '#00ff00'
      ctx7.font = '30px Arial blod'
      ctx7.fillText('小城堡工作室', 10, 60)

      ctx8.fillStyle = '#00ff00'
      ctx8.font = '30px Arial blod'
      ctx8.fillText('大厦工作室1', 10, 60)

      ctx9.fillStyle = '#00ff00'
      ctx9.font = '30px Arial blod'
      ctx9.fillText('大厦工作室2', 10, 60)

      ctx10.fillStyle = '#00ff00'
      ctx10.font = '30px Arial blod'
      ctx10.fillText('未蓝工作室', 10, 60)

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
      var sprite1 = new THREE.Sprite(material4);
      sprite1.scale.set(60,60,60);
      sprite1.position.set(10,130,20);
      this.scene.add(sprite1);

      var sprite2 = new THREE.Sprite(material4);
      sprite2.scale.set(60,60,60);
      sprite2.position.set(-90,40,10);
      this.scene.add(sprite2);

      var sprite3 = new THREE.Sprite(material4);
      sprite3.scale.set(60,60,60);
      sprite3.position.set(120,30,10);
      this.scene.add(sprite3);

      var sprite4 = new THREE.Sprite(material4);
      sprite4.scale.set(60,60,60);
      sprite4.position.set(150,40,-10);
      this.scene.add(sprite4);

      var sprite5 = new THREE.Sprite(material4);
      sprite5.scale.set(60,60,60);
      sprite5.position.set(50,20,-15);
      this.scene.add(sprite5);

      var sprite6 = new THREE.Sprite(material4);
      sprite6.scale.set(60,60,60);
      sprite6.position.set(-30,30,-30);
      this.scene.add(sprite6);

      var sprite7 = new THREE.Sprite(material4);
      sprite7.scale.set(60,60,60);
      sprite7.position.set(130,50,-20);
      this.scene.add(sprite7);

      var sprite8 = new THREE.Sprite(material4);
      sprite8.scale.set(60,60,60);
      sprite8.position.set(110,50,5);
      this.scene.add(sprite8);

      var sprite9 = new THREE.Sprite(material4);
      sprite9.scale.set(60,60,60);
      sprite9.position.set(-50,50,-30);
      this.scene.add(sprite9);

      var sprite10 = new THREE.Sprite(material4);
      sprite10.scale.set(60,60,60);
      sprite10.position.set(120,30,-30);
      this.scene.add(sprite10);