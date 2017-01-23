window.lfg = window.lfg || {}

lfg.canvas = function () {
    this.initTime = Date.now()
    this.loopStart = 0
    this.fps = 0
    this.obj = {
    }

    // 储存画布内对象绘制顺序
    this.layer = []

    this.material = {}
    return this
}

lfg.canvas.prototype.loadAllObjs = function () {
    for (let key in this.obj) {
        this.layer.push(key)
    }
}

lfg.canvas.prototype.createCanvas = function () {
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

lfg.canvas.prototype.removeCanvas = function () {
    this.cvs.remove()
}

lfg.canvas.prototype.addMaterialFromJson = function (json) {
    for (let key in json) {
        if (key in this.material) {

        } else {
            this.material[key] = json[key]
        }
    }
    return this
}

// 添加一个素材
lfg.canvas.prototype.addMaterial = function (name, option) {
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
lfg.canvas.prototype.loadMaterial = function (name) {
    let tmp = this.material[name]
    if (tmp.type == 'img') {
        this.material[name] = document.createElement(tmp.type)
        this.material[name].src = tmp.src
    } else if (tmp.type == 'audio') {
        this.material[name].play = (option) => {
            let a = document.createElement('audio')
            a.src = tmp.src
            a.autoplay = true
            for (let key in option) {
                a[key] = option[key]
            }
            // this.material[name].playing = a
            return a
        }
        // this.material[name].pause = () => {
        //     this.material[name].playing.pause()
        // }
        // this.material[name].continue = () => {
        //     this.material[name].playing.play()
        // }
    }
    return this
}

// 加载所有在列表中但未加载的素材
lfg.canvas.prototype.loadAllMaterial = function () {
    for (let key in this.material) {
        if ('type' in this.material[key]) {
            this.loadMaterial(key)
        }
    }
    return this
}

// 初始化FPS监视器
lfg.canvas.prototype.FPSMonitorInit = function (type = 'DOM') {
    if ('FPSMonitor' in this) {
        return false
    }
    if (type == 'DOM') {
        this.FPSPanel = document.createElement('p')
        this.FPSPanel.style = 'color:#ff0000;font-size:20px;font-family:Arial;margin:0;position:fixed;left:0px;top:0px;'
        this.FPSPanel.innerHTML = 60
        document.body.append(this.FPSPanel)
        this.FPSMonitor = setInterval(() => {
            this.FPSPanel.innerHTML = this.fps
            this.fps = 0
        }, 1000)
        return this
    } else if (type == 'obj') {
        this.obj.FPSPanel = new lfg.font(0, 19, {
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
lfg.canvas.prototype.FPSMonitorDestroy = function () {
    this.FPSPanel.remove()
    clearInterval(this.FPSMonitor)
    return this
}

// 刷新画面
// 清空画布，之后将this.obj中的成员全部绘制出来
lfg.canvas.prototype.fresh = function () {
    if (this.pause) {

    } else {
      // ca.ctx.drawImage(ca.material.bg, 0, 0, ca.cvs.width, ca.cvs.height)
        ca.cvs.width = ca.cvs.width

        // 每次刷新按照包含的对象的类型分别绘制出各个对象
        for (let i = 0; i < this.layer.length; i++) {
            let key = this.layer[i]
            let tmp = this.obj[key]
            tmp.draw(this)
        }

        // for (let key in this.obj) {
        //
        // }

        this.fps += 1

    }

    requestAnimationFrame(() => {
        this.fresh()
    })
}

lfg.canvas.prototype.registerObj = function (key, lv = null) {
    this.obj[key].ca = this
    this.obj[key].bepress = false
    if (lv != null && 'length' in this.layer[lv]) {
        this.layer[lv].push(key)
    } else {
        this.layer.push(key)
    }
}

lfg.canvas.prototype.addObj = function (obj) {
    this.obj[obj.key] = obj
    this.registerObj(obj.key)
}

lfg.canvas.prototype.topObj = function (key) {
    for (let i = 0; i < this.layer.length; i++) {
        if (this.layer[i] == key) {
            this.layer.splice(i, 1)
            this.layer.push(key)
            break
        }
    }
}

// 数据修改
lfg.canvas.prototype.move = function () {
    // for (let key in this.obj) {
    //     if ('width' in this.obj[key]) {
    //         if (this.obj[key].mouseon) {
    //             if ('onmousestay' in this.obj[key]) {
    //                 this.obj[key].onmousestay()
    //             }
    //         } else {
    //             if ('onmousenotstay' in this.obj[key]) {
    //                 this.obj[key].onmousenotstay()
    //             }
    //         }
    //     }
    // }
    this.allObj((obj) => {
        obj.press()
    }, (obj) => {
        return 'width' in obj && obj.bepress && 'press' in obj
    })
    // for (let key in this.obj) {
    //     if ('width' in this.obj[key]) {
    //         if (this.obj[key].bepress) {
    //             if ('press' in this.obj[key]) {
    //                 this.obj[key].press()
    //             }
    //         }
    //     }
    // }

    this.onmouseover()
    this.onmouseout()


    if ('tick' in this) {
        this.tick()
    }

}

lfg.canvas.prototype.allObj = function (cb, select = (() => {return true})) {
    for (let key in this.obj) {
        if (select(this.obj[key])) {
            cb(this.obj[key])
            if (!select(this.obj[key])) {
                return
            }
        }
    }
}

lfg.canvas.prototype.pallObj = function (cb, select = (() => {return true})) {
    let lastKey = false
    for (let i = 0; i < this.layer.length; i++) {
        if (select(this.obj[this.layer[i]])) {
            lastKey = this.layer[i]
        }
    }

    if (lastKey) {
        cb(this.obj[lastKey])
    }
}

lfg.canvas.prototype.onmouseover = function () {
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

lfg.canvas.prototype.onmouseout = function () {
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

lfg.canvas.prototype.onclick = function () {
    // for (let key in this.obj) {
    //     if ('width' in this.obj[key]) {
    //         if (this.obj[key].mouseon) {
    //             if ('onclick' in this.obj[key]) {
    //                 this.obj[key].onclick()
    //             }
    //         }
    //     }
    // }
    this.pallObj( (obj) => {
        obj.onclick()
    }, (obj) => {
        return 'width' in obj && obj.mouseon && 'onclick' in obj
    })
}

lfg.canvas.prototype.onmousedown = function (e) {
    if (e.button == 0) {
        // for (let key in this.obj) {
        //     if ('width' in this.obj[key]) {
        //         if (this.obj[key].mouseon) {
        //             if ('press' in this.obj[key]) {
        //                 this.obj[key].bepress = true
        //                 this.obj[key].pressx = this.mouse.x - this.obj[key].co.x
        //                 this.obj[key].pressy = this.mouse.y - this.obj[key].co.y
        //             }
        //         }
        //     }
        // }

        this.pallObj((obj) => {
            obj.bepress = true
            obj.pressx = this.mouse.x - obj.co.x
            obj.pressy = this.mouse.y - obj.co.y
        }, (obj) => {
            return 'width' in obj && obj.mouseon && 'press' in obj
        })
    }
}

lfg.canvas.prototype.onmouseup = function (e) {
    if (e.button == 0) {
        // for (let key in this.obj) {
        //     if ('width' in this.obj[key]) {
        //         if (this.obj[key].mouseon) {
        //             if ('press' in this.obj[key]) {
        //                 this.obj[key].bepress = false
        //             }
        //         }
        //     }
        // }

        this.allObj((obj) => {
            obj.bepress = false
        }, () => {return true})
    }
}

// 自动初始化
lfg.canvas.prototype.init = function () {
    this.createCanvas()
    this.FPSMonitorInit('obj')
    this.loadAllMaterial()
    this.fresh()
    this.mouse = {
        x: 0,
        y: 0
    }

    for (let key in this.obj) {
        this.registerObj(key)
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
