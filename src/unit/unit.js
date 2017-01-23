window.lfg = window.lfg || {}

lfg.unit = function (x, y, width, height, type, option = null) {
    this.width = width
    this.height = height
    this.m11 = 1
    this.m22 = 1
    this.tx = 0
    this.ty = 0
    this.co = new lfg.co(x, y)
    this.middle = this.co.sub(width / 2, height / 2)
    this.key = guid()
    if (option) {
        for (let key in option) {
            this[key] = option[key]
        }
    }
    return this
}

lfg.unit.prototype.draw = function () {
    console.error(this.key + ' has not define draw method')
}

lfg.unit.prototype.scale = function (fx, fy, dx = 0, dy = 0) {

}

lfg.obj = function (imagedata, x, y, width, height, option = null) {
    lfg.unit.call(this, x, y, width, height, 'ori', option)
    this.imagedata = imagedata
    if (option) {
        for (let key in option) {
            this[key] = option[key]
        }
    }
    return this
}

lfg.obj.prototype.draw = function (ca) {
    ca.ctx.putImageData(this.imagedata, this.co.x, this.co.y)
}

lfg.genius = function (drawf, x, y, width, height, option = null) {
    lfg.unit.call(this, x, y, width, height, 'ori', option)
    this.drawf = drawf
    if (option) {
        for (let key in option) {
            this[key] = option[key]
        }
    }
    return this
}

lfg.genius.prototype.scale = function (m11, m22) {
    this.m11 = m11
    this.m22 = m22
    this.width *= m11
    this.height *= m22
    // this.middle.x = this.co.x + this.width / 2
    // this.middle.y = this.co.y + this.height / 2
}

lfg.genius.prototype.translate = function (x, y) {
    this.tx = x
    this.ty = y
}

lfg.genius.prototype.draw = function (ca) {
    let tmp = document.createElement('canvas')
    tmp.width = this.width
    tmp.height = this.height
    let ctx = tmp.getContext('2d')
    ctx.translate(this.tx, this.ty)
    ctx.setTransform(this.m11, 0, 0, this.m22, 0, 0)
    this.drawf(ctx)
    let t = ctx.getImageData(0, 0, tmp.width, tmp.height)
    ca.ctx.putImageData(t, this.co.x, this.co.y)
}

lfg.rect = function (x, y, width, height, option = null) {
    lfg.unit.call(this, x, y, width, height, 'ori', option)
    this.color = 'black'
    if (option) {
        for (let key in option) {
            this[key] = option[key]
        }
    }
    return this
}

lfg.rect.prototype.draw = function (ca) {
    ca.ctx.strokeStyle = this.color
    ca.ctx.strokeRect(this.co.x, this.co.y, this.width, this.height)
}

lfg.font = function (x, y, option = null) {
    lfg.unit.call(this, x, y, 0, 0, 'ori', option)
    this.dtext = ''
    this.dfont = '10px sans-serif'
    this.freshSize = function () {
        let thisSpan = document.createElement('span')
        thisSpan.text = this.dtext
        thisSpan.style.font = this.dfont
        this.width = thisSpan.offsetWidth
        this.height = thisSpan.offsetHeight
    }
    Object.defineProperty(this, 'text', {
        get: () => {
            return this.dtext
        }
        ,set: (newV) => {
              this.dtext = newV
              this.freshSize()
        }
    })
    Object.defineProperty(this, 'font', {
        get: () => {
            return this.dfont
        }
        ,set: (newV) => {
            this.dfont = newV
            this.freshSize()
        }
    })
    this.color = 'black'
    if (option) {
        for (let key in option) {
            this[key] = option[key]
        }
    }
    return this
}

lfg.font.prototype.draw = function (ca) {
    ca.ctx.font = this.dfont
    ca.ctx.fillStyle = this.color
    ca.ctx.fillText(this.text, (0.5 + this.co.x) << 0, (0.5 + this.co.y) << 0)
}
