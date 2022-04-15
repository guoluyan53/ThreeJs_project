  //创建精灵贴图
  createSprite( name, position) {
    const html = `
                      <div class="sprite-canvas">
                          <span class="sprite-layer">{{name}}</span>
                      </div>`;
  
    document.getElementById('academy').insertAdjacentHTML("beforeend", html);
    const element = document.body.lastChild;
    element.style.zIndex = -1;
    html2canvas(document.getElementById('academy'), {
      backgroundColor: "transparent"
    }).then(canvas => {
      let texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
  
      let spriteMaterial = new THREE.SpriteMaterial({
        map: texture
      });
      let sprite = new THREE.Sprite(spriteMaterial);
      sprite.name = name;
      sprite.position.set(position);
      sprite.scale.set(60, 60, 60);
      this.scene.add(sprite);
      console.log("已经加载文字");
      // document.body.removeChild();
    });
  },