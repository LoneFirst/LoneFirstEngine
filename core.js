// 单位
function unit () {

}

function obj (imagedata, x, y, width, height, option = null) {
    this.type = 'obj'
    this.imagedata = imagedata
    this.co = new co(x, y)
    this.width = width
    this.height = height
    this.middle = new co(x + width / 2, y + height / 2)
    if (option) {
        for (let key in option) {
            this[key] = option[key]
        }
    }
}

// 矩形
function rect (x, y, width, height, option = null) {
    this.type = 'rect'
    this.color = 'black'
    this.co = new co(x, y)
    this.width = width
    this.height = height
    this.middle = new co(x + width / 2, y + height / 2)
    if (option) {
        for (let key in option) {
            this[key] = option[key]
        }
    }
}

function font (x, y, option = null) {
    this.font = '10px sans-serif',
    this.color = 'black'
    this.text = ''
    this.co = new co(x, y)
    if (option) {
        for (let key in option) {
            this[key] = option[key]
        }
    }
}

function polygon (points, x, y, option = null) {
    this.points = points
    this.co = new co(x, y)
    if (option) {
        for (let key in option) {
            this[key] = option[key]
        }
    }
}
function t() {
    this.co.x += 10
    this.co.y += 10
    this.width -= 20
    this.height -= 20
    ca.material.btn.play()
}

function o() {
    this.co.x -= 10
    this.co.y -= 10
    this.width += 20
    this.height += 20
    ca.material.btn.play()
}

function canvas () {
    this.initTime = Date.now()
    this.loopStart = 0
    this.fps = 0
    this.obj = {
        rect: new rect(100, 100, 50, 50, {
            color: '#f00',
            onmouseover: o,
            onmouseout: t,
            press: function () {
                this.co.x = ca.mouse.x - this.pressx
                this.co.y = ca.mouse.y - this.pressy
            }
        }),
        poker1: new obj(poker('♥1'), 200, 100, 70, 90, {
            onclick: select
            // onmousestay: function () {
            //     this.co.moveTo(new co(200, 50), 1)
            // },
            // onmousenotstay: function () {
            //     this.co.moveTo(new co(200, 100), 1)
            // }
        }),
        poker2: new obj(poker('♥2'), 230, 100, 70, 90, {
            onclick: select
            // onmousestay: function () {
            //     this.co.moveTo(new co(200, 50), 1)
            // },
            // onmousenotstay: function () {
            //     this.co.moveTo(new co(200, 100), 1)
            // }
        }),
        poker3: new obj(poker('♥3'), 260, 100, 70, 90, {
            onclick: select
            // onmousestay: function () {
            //     this.co.moveTo(new co(200, 50), 1)
            // },
            // onmousenotstay: function () {
            //     this.co.moveTo(new co(200, 100), 1)
            // }
        })
    }
    this.material = {
        "bg": {
            "type": "img",
            "src": "./assets/b.png"
        },
        "btn": {
            "type": "audio",
            "src": "./assets/btn.wav"
        }
    }

    // 创建画布
    this.createCanvas = () => {
        if ('cvs' in this) {
            return false
        }
        this.cvs = document.createElement('canvas')
        this.cvs.width = window.innerWidth
        this.cvs.height = window.innerHeight
        this.cvs.style = 'z-index:-1;position:fixed;left:0px;top:0%;bottom:0%;right:0px'
        document.body.append(this.cvs)
        // this.cvs.remove()

        // console.log(this.cvs)

        // this.cvs.remove()
        this.ctx = this.cvs.getContext('2d')

        // document.body.innerHTML += '<canvas id="'+this.canvasId+'" style="z-index:0;position:fixed;left:0px;top:0%;bottom:0%;right:0px" width="'+window.innerWidth+'" height="'+window.innerHeight+'"></canvas>'
        // setTimeout(() => {
        //     this.cvs = document.getElementById(this.canvasId)
        //     this.ctx = this.cvs.getContext('2d')
        // }, 0)
        return this
    }

    this.removeCanvas = () => {
        this.cvs.remove()
    }

    // 从json文件中添加素材
    this.addMaterialFromJson = (json) => {
        for (let key in json) {
            if (key in this.material) {

            } else {
                this.material[key] = json[key]
            }
        }
        return this
    }

    // 添加一个素材
    this.addMaterial = (name, option) => {
        if (name in this.material) {
            console.error(name + 'has been loaded!')
            return false
        } else if (!('type' in option)) {

            return this
        } else {
            this.material[name] = option
            return this
        }
    }

    // 使客户端加载指定素材
    this.loadMaterial = (name) => {
        let tmp = this.material[name]
        if (tmp.type == 'img') {
            this.material[name] = document.createElement(tmp.type)
            this.material[name].src = tmp.src
        } else if (tmp.type == 'audio') {
            this.material[name].play = () => {
                let a = document.createElement('audio')
                a.src="./assets/btn.wav"
                a.play()
            }
        }
        return this
    }

    // 加载所有在列表中但未加载的素材
    this.loadAllMaterial = () => {
        for (key in this.material) {
            if ('type' in this.material[key]) {
                this.loadMaterial(key)
            }
        }
        return this
    }

    // 初始化FPS监视器
    this.FPSMonitorInit = (type = 'DOM') => {
        if ('FPSMonitor' in this) {
            return false
        }
        if (type == 'DOM') {
            this.FPSPanel = document.createElement('p')
            this.FPSPanel.style = 'color:red;font-size:30px;margin:0;'
            document.body.append(this.FPSPanel)
            this.FPSMonitor = setInterval(() => {
                this.FPSPanel.innerHTML = this.fps
                this.fps = 0
            }, 1000)
            return this
        } else if (type == 'obj') {
            this.obj.FPSPanel = new font(0, 20, {
                color: '#f00',
                font: '20px Arial',
                text: '60'
            })
            this.FPSMonitor = setInterval(() => {
                this.obj.FPSPanel.text = this.fps
                this.fps = 0
            }, 1000)
        }
        return this
    }

    // 销毁FPS监视器
    this.FPSMonitorDestroy = () => {
        this.FPSPanel.remove()
        clearInterval(this.FPSMonitor)
        return this
    }

    // 刷新画面
    // 清空画布，之后将this.obj中的成员全部绘制出来
    this.fresh = (cb = null) => {
        if (this.pause) {

        } else {
          // ca.ctx.drawImage(ca.material.bg, 0, 0, ca.cvs.width, ca.cvs.height)
            ca.cvs.width = ca.cvs.width

            // 每次刷新按照包含的对象的类型分别绘制出各个对象
            for (let key in this.obj) {
                if ('font' in this.obj[key]) {
                    let obj = this.obj[key]
                    this.ctx.font = obj.font
                    this.ctx.fillStyle = obj.color
                    this.ctx.fillText(obj.text, (0.5 + obj.co.x) << 0, (0.5 + obj.co.y) << 0)
                } else if ('type' in this.obj[key]) {
                    let obj = this.obj[key]
                    switch (obj.type) {
                      case 'rect':
                          this.ctx.strokeStyle = obj.color
                          this.ctx.strokeRect(obj.co.x, obj.co.y, obj.width, obj.height)
                          break
                      case 'obj':
                          this.ctx.putImageData(obj.imagedata, obj.co.x, obj.co.y)
                      default:

                    }
                }
            }
            if (cb) {
                cb(this)
            }

            this.fps += 1
        }
        requestAnimationFrame(() => {
            this.fresh()
        })
    }

    // 数据修改
    this.move = (cb) => {
        for (let key in this.obj) {
            if ('width' in this.obj[key]) {
                if (this.obj[key].mouseon) {
                    if ('onmousestay' in this.obj[key]) {
                        this.obj[key].onmousestay()
                    }
                } else {
                    if ('onmousenotstay' in this.obj[key]) {
                        this.obj[key].onmousenotstay()
                    }
                }
            }
        }

        // this.obj.rect.co.moveTo(this.mouse, 10)

        if (cb) {
            cb()
        }
    }

    this.onmouseover = (e) => {
        for (let key in this.obj) {
            if ('width' in this.obj[key]) {
                if (this.obj[key].mouseon) {
                    continue
                }
                let obj = this.obj[key]
                if (this.mouse.x > obj.co.x && this.mouse.x < obj.co.x + obj.width && this.mouse.y > obj.co.y && this.mouse.y < obj.co.y + obj.height) {
                    this.obj[key].mouseon = true
                    if ('onmouseover' in obj) {
                        obj.onmouseover()
                    }
                }
            }
        }
    }

    this.onmouseout = (e) => {
        for (let key in this.obj) {
            if ('width' in this.obj[key]) {
                if (!this.obj[key].mouseon) {
                    continue
                }
                let obj = this.obj[key]
                if (this.mouse.x < obj.co.x || this.mouse.x > obj.co.x + obj.width || this.mouse.y < obj.co.y || this.mouse.y > obj.co.y + obj.height) {
                    this.obj[key].mouseon = false
                    if ('onmouseout' in obj) {
                        obj.onmouseout()
                    }
                }
            }
        }
    }

    this.onclick = (e) => {
        for (let key in this.obj) {
            if ('width' in this.obj[key]) {
                if (this.obj[key].mouseon) {
                    if ('onclick' in this.obj[key]) {
                        this.obj[key].onclick()
                    }
                }
            }
        }
    }

    this.onmousedown = (e) => {
        if (e.button == 0) {
            for (let key in this.obj) {
                if ('width' in this.obj[key]) {
                    if (this.obj[key].mouseon) {
                        if ('press' in this.obj[key]) {
                            this.obj[key].bepress = true
                            this.obj[key].pressx = this.mouse.x - this.obj[key].co.x
                            this.obj[key].pressy = this.mouse.y - this.obj[key].co.y
                        }
                    }
                }
            }
        }
    }

    this.onmouseup = (e) => {
        if (e.button == 0) {
            for (let key in this.obj) {
                if ('width' in this.obj[key]) {
                    if (this.obj[key].mouseon) {
                        if ('press' in this.obj[key]) {
                            this.obj[key].bepress = false
                        }
                    }
                }
            }
        }
    }
    // 自动初始化
    this.init = () => {
        this.createCanvas()
        this.FPSMonitorInit('obj')
        this.loadAllMaterial()
        this.fresh()
        this.mouse = {
            x: 0,
            y: 0
        }

        // 右键事件
        this.cvs.oncontextmenu = (e) => {
            return false
        }

        // 鼠标位置
        this.cvs.onmousemove = (e) => {
            this.mouse = {
                x: e.clientX,
                y: e.clientY
            }

            for (let key in this.obj) {
                if ('width' in this.obj[key]) {
                    if (this.obj[key].bepress) {
                        if ('press' in this.obj[key]) {
                            this.obj[key].press()
                        }
                    }
                }
            }
            this.onmouseover(e)
            this.onmouseout(e)
        }

        this.cvs.onclick = (e) => {
            this.onclick(e)
        }

        this.cvs.onmousedown = (e) => {
            this.onmousedown(e)
        }

        this.cvs.onmouseup = (e) => {
            this.onmouseup(e)
        }
        // this.cvs.onmousedown = (e) => {
        //     if (e.button == 2) {
        //         alert('a')
        //     }
        // }
        setInterval(() => {
            this.move()
        }, 20) // 50Hz
    }


}
