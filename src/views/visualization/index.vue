<script setup>
  import {
    onMounted,
    onBeforeUnmount
  } from 'vue'

  import load from './ThreeDimensional/resources/index'
  import {
    cameraType,
    viewType
  } from './ThreeDimensional/Camera'
  import ThreeDimensional from './ThreeDimensional/ThreeDimensional'

  let threeDimensional = null

  const load1 = () => {
    return new Promise((resolve, reject) => {
      resolve('模拟非 3D 相关异步数据')
    })
  }

  async function main() {
    await load1()
    const resources = await load()

    document.querySelector('#loading-3d').style.display = 'none'
    threeDimensional = new ThreeDimensional(document.querySelector('canvas.webgl'), resources)
    const wolrd = threeDimensional.wolrd

    // 设置卡车标记内容
    wolrd.controls.truck.setLabel({
      num: '#333',
      name: '我是一辆卡车'
    })

    // 切换卡车暂停和重启
    const truckRadio = document.querySelectorAll('.truck-status')
    for (const truck of truckRadio) {
      truck.addEventListener('change', evt => {
        const radioValue = evt.target.value
        if (radioValue === 'pause') {
          wolrd.controls.truck.stop()
        } else if (radioValue === 'restart') {
          wolrd.controls.truck.restart()
        }
      })
    }

    // 切换摄像机视角
    const cameraRadio = document.querySelectorAll('.camera')
    for (const camera of cameraRadio) {
      camera.addEventListener('change', evt => {
        const radioValue = evt.target.value
        // console.log(radioValue)
        threeDimensional.camera.setActiveCamera(radioValue)

        if (radioValue === cameraType.STANDARD) {
          document.querySelector('#default-view-button-hook').disabled = false
          document.querySelector('#machine-view-button-hook').disabled = false
        } else {
          document.querySelector('#default-view-button-hook').disabled = true
          document.querySelector('#machine-view-button-hook').disabled = true
        }
      })
    }

    // 切换中央机器显示风格
    const machineRadio = document.querySelectorAll('.machine')
    for (const machine of machineRadio) {
      machine.addEventListener('change', evt => {
        const radioValue = evt.target.value

        if (radioValue === 'origin') {
          wolrd.controls.machine.setOriginMesh()
        } else if (radioValue === 'line') {
          wolrd.controls.machine.setLineMesh()
        }
      })
    }

    // 切换视角
    document.querySelector('#default-view-button-hook').addEventListener('click', evt => {
      threeDimensional.camera.changeViewPosition(viewType.STANDARD)
    })

    document.querySelector('#machine-view-button-hook').addEventListener('click', evt => {
      threeDimensional.camera.changeViewPosition(viewType.MACHINE)
    })

    // 测试释放资源是否有问题
    // window.setTimeout(() => {
    //   threeDimensional.destroy()
    // }, 3 * 1000)
  }

  onMounted(() => {
    console.log('mounted')
    main()
  })

  onBeforeUnmount(() => {
    threeDimensional.destroy()
  })
</script>

<template>
  <div class="container">
    <div class="canvas-3d-container">
      <canvas class="webgl"></canvas>
    </div>
    <div class="loading-3d" id="loading-3d">资源加载中...</div>

    <div class="ui-layout">
      <div class="desc">场景内物体可以hover和点击</div>
      <hr>
      <div class="hover-container">
        <div class="title">hover的对象</div>
        <div class="type">对象类型：<span id="hover-mesh-hook"></span></div>
        <div class="3d-name">3D的name值：<span id="hover-mesh-3d-name-hook"></span></div>
      </div>
      <hr>
      <div class="change-view-container">
        <div>只有一般视角相机才能使用这两种视角</div>
        <div><button class="button" id="default-view-button-hook">还原默认视角按钮</button></div>
        <div><button class="button" id="machine-view-button-hook">中央机器视角按钮</button></div>
      </div>
      <hr>
      <div class="truck-container">
        <div class="restart">
          <label for="truck-restart">卡车运行启动</label><input checked type="radio" name="truck" id="truck-restart" class="truck-status" value="restart">
        </div>
        <div class="pause">
          <label for="truck-pause">卡车运行暂停</label><input type="radio" name="truck" id="truck-pause" class="truck-status" value="pause">
        </div>
      </div>
      <hr>
      <div class="camera-container">
        <div class="normal">
          <label for="camera-normal">一般视角相机</label><input checked type="radio" name="camera" id="camera-normal" value="standard_camera" class="camera">
        </div>
        <div class="track-truck-rear">
          <label for="camera-truck-rear">卡车行驶视角相机</label><input type="radio" name="camera" id="camera-truck-rear" value="track_truck_rear_camera" class="camera">
        </div>
        <div class="track-truck-flank">
          <label for="camera-truck-flank">卡车侧面视角相机</label><input type="radio" name="camera" id="camera-truck-flank" value="track_truck_flank_camera" class="camera">
        </div>
      </div>
      <hr>
      <div class="machine-container">
        <div class="origin">
          <label for="origin-machine">中央机器原样风格</label><input checked type="radio" name="machine" id="origin-machine" class="machine" value="origin">
        </div>
        <div class="line">
          <label for="line-machine">中央机器线框风格</label><input type="radio" name="machine" id="line-machine" class="machine" value="line">
        </div>
      </div>
    </div>

    <!-- 卡车 3d 物体标签 -->
    <div id="truck-label-hook" class="three-label-container">
      <div class="three-label-container-wrapper">
        <div class="title-container">
          <div class="title-container-wrapper">
            <div class="room-id" id="truck-label-id-hook"></div>
            <div class="room-name" id="truck-label-name-hook"></div>
          </div>
        </div>
        <div class="icon-container">
          <div class="icon-container-wrapper">
            <div class="fan-container">
              <div class="fan-part1"></div>
              <div class="fan-part2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 中央机器 3d 物体标签 -->
    <div id="machine-label-hook" class="three-label-container">
      <div class="three-label-container-wrapper">
        <div class="title-container">
          <div class="title-container-wrapper">
            <div class="room-name" id="machine-label-name-hook">我是中央机器</div>
          </div>
        </div>
        <div class="icon-container">
          <div class="icon-container-wrapper">
            <div class="fan-container">
              <div class="fan-part1"></div>
              <div class="fan-part2"></div>
            </div>
            <div class="cctv-container">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 点击提示框 -->
    <div class="show-click-msg-container" id="click-box-hook">你点击了xxx</div>
  </div>
</template>

<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
    background: url(http://cdn.rback.fun/factory-demo-1/background.png);
    background-position: center;
    background-size: cover;
    position: relative;

    .canvas-3d-container {
      position: relative;
      width: 100%;
      height: 100%;

      .webgl {
        display: block;
      }
    }
  }

  hr {
    margin: 10px 0;
  }

  .loading-3d {
    color: #fff;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    padding: 10px 30px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;

    display: none;
  }

  .ui-layout {
    position: absolute;
    padding: 20px;
    top: 0;
    left: 0;
    width: 300px;
    color: #fff;
    font-size: 20px;
    background: rgba(255, 255, 255, 0.333);

    .desc {
      font-size: 26px;
    }

    .change-view-container {
      .button {
        padding: 10px 20px;
        margin: 10px 0 0 0;
      }
    }
  }

  // 标签
  @keyframes fan-rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .three-label-container {
    width: 200px;
    // height: 100%;
    color: #00deff;
    display: none;

    &.visible {
      display: block;
    }

    .three-label-container-wrapper {
      width: 100%;
      height: 100%;

      .title-container {
        background-image: url('/images/3d-label/text-box.svg#svgView(preserveAspectRatio(none))');
        background-repeat: no-repeat;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;

        .title-container-wrapper {
          text-align: center;
          pointer-events: all;
          cursor: pointer;

          .room-id {
            padding: 2% 0 0 0;
            font-size: 1.4em;
          }

          .room-name {
            font-size: 1.2em;
            padding: 2% 0 5% 0;
          }
        }
      }

      .icon-container {
        .icon-container-wrapper {
          position: relative;

          .fan-container {
            .fan-part1 {
              width: 60px;
              height: 60px;
              margin: 0 auto;
              background-image: url('/images/3d-label/fan-part1.svg#svgView(preserveAspectRatio(none))');
              background-repeat: no-repeat;
              background-repeat: no-repeat;
              background-position: center;
              background-size: 100% 100%;
              animation: fan-rotate 1.3s infinite;
              animation-fill-mode: forwards;
              animation-timing-function: linear;
            }
          }

          .cctv-container {
            position: absolute;
            top: 0;
            right: 0;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .cctv-wrapper {
              width: 40px;
              height: 40px;
              // margin: 0 auto;
              background-image: url('/images/3d-label/cctv.svg#svgView(preserveAspectRatio(none))');
              background-repeat: no-repeat;
              background-repeat: no-repeat;
              background-position: center;
              background-size: 100% 100%;
              pointer-events: all;
              cursor: pointer;
            }
            
          }
        }
      }
    }
  }

  .show-click-msg-container {
    position: fixed;
    left: 50%;
    top: 50%;
    padding: 30px 60px;
    transform: translate(-50%, -50%);
    color: #00deff;
    opacity: 1;
    display: none;

    background-image: url('/images/3d-label/text-box.svg#svgView(preserveAspectRatio(none))');
    background-repeat: no-repeat;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }
</style>
