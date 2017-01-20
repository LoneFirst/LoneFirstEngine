function unit (x, y, width, height, type, option = null) {
    let tmp = {}
    tmp.width = width
    tmp.height = height
    tmp.co = new co(x, y)
    tmp.middle = tmp.co.sub(width / 2, height / 2)
    tmp.key = guid()
    tmp.set = function (opt) {
        if (opt) {
            for (let key in opt) {
                this[key] = opt[key]
            }
        }
    }
    return tmp
}

function obj (imagedata, x, y, width, height, option = null) {
    let tmp = new unit(x, y, width, height, 'ori')
    tmp.imagedata = imagedata
    tmp.draw = (ca) => {
        ca.ctx.putImageData(tmp.imagedata, tmp.co.x, tmp.co.y)
    }
    tmp.set(option)
    return tmp
}

function rect (x, y, width, height, option = null) {
    let tmp = new unit(x, y, width, height, 'ori')
    tmp.color = 'black'
    tmp.draw = (ca) => {
        ca.ctx.strokeStyle = tmp.color
        ca.ctx.strokeRect(tmp.co.x, tmp.co.y, tmp.width, tmp.height)
    }
    tmp.set(option)
    return tmp
}

function font (x, y, option = null) {
    let tmp = new unit(x, y, 0, 0, 'ori')
    tmp.dtext = ''
    tmp.dfont = '10px sans-serif'
    tmp.freshSize = function () {
        let tmpSpan = document.createElement('span')
        tmpSpan.text = tmp.dtext
        tmpSpan.style.font = tmp.dfont
        tmp.width = tmpSpan.offsetWidth
        tmp.height = tmpSpan.offsetHeight
    }
    Object.defineProperty(tmp, 'text', {
        get: () => {
            return tmp.dtext
        }
        ,set: (newV) => {
              tmp.dtext = newV
              tmp.freshSize()
        }
    })
    Object.defineProperty(tmp, 'font', {
        get: () => {
            return tmp.dfont
        }
        ,set: (newV) => {
            tmp.dfont = newV
            tmp.freshSize()
        }
    })
    tmp.color = 'black'
    tmp.draw = (ca) => {
        ca.ctx.font = tmp.dfont
        ca.ctx.fillStyle = tmp.color
        ca.ctx.fillText(tmp.text, (0.5 + tmp.co.x) << 0, (0.5 + tmp.co.y) << 0)
    }
    tmp.set(option)
    return tmp
}
