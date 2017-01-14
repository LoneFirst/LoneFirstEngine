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
    this.draw = (ca) => {
        ca.ctx.putImageData(this.imagedata, this.co.x, this.co.y)
    }
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
    this.co.bind(this.middle)
    this.draw = (ca) => {
        ca.ctx.strokeStyle = this.color
        ca.ctx.strokeRect(this.co.x, this.co.y, this.width, this.height)
    }
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
    this.draw = (ca) => {
        ca.ctx.font = this.font
        ca.ctx.fillStyle = this.color
        ca.ctx.fillText(this.text, (0.5 + this.co.x) << 0, (0.5 + this.co.y) << 0)
    }
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
