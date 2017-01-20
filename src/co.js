// 平面坐标
function co (x = 0, y = 0) {
    this.cbs = {
        change: []
    }
    Object.defineProperty(this, 'x', {
        get: () => {
            return this.dx
        }
        ,set: (newV) => {
            for (let key in this.bindList) {
                this.bindList[key].dx += newV - this.dx
            }
            this.dx = newV

        }
    })
    this.x = x
    Object.defineProperty(this, 'y', {
        get: () => {
            return this.dy
        }
        ,set: (newV) => {
            for (let key in this.bindList) {
                this.bindList[key].dy += newV - this.dy
            }
            this.dy = newV
        }
    })
    this.y = y
    this.on = (msg, cb) => {
        this.cbs[msg].push(cb)
    }

    // 平滑的接近一个点
    this.moveTo = (point, maxV) => {
        let xDiff = point.x - this.x
        let yDiff = point.y - this.y
        if ((xDiff * xDiff + yDiff * yDiff) < (maxV * maxV)) {
            // this.set(this.x + xDiff, this.y + yDiff)
            this.x += xDiff
            this.y += yDiff
        } else {
            // this.set(this.x + xDiff * maxV / Math.sqrt(xDiff * xDiff + yDiff * yDiff), this.y + yDiff * maxV / Math.sqrt(xDiff * xDiff + yDiff * yDiff))
            this.x += xDiff * maxV / Math.sqrt(xDiff * xDiff + yDiff * yDiff)
            this.y += yDiff * maxV / Math.sqrt(xDiff * xDiff + yDiff * yDiff)
        }
    }

    this.sub = (x, y) => {
        let tmp = new co(x, y)
        this.bind(tmp)
        tmp.bind(this)
        return tmp
    }

    // this.set = (x, y) => {
    //     for (let key in this.bindList) {
    //         // this.bindList[key].set(this.bindList[key] + x - this.x, this.bindList[key].y + y - this.y)
    //         // this.bindList[key].x += x - this.x
    //         // this.bindList[key].y += y - this.y
    //     }
    //     this.x = x
    //     this.y = y
    //     return this
    // }
    this.bindList = []
    this.bind = (target) => {
        // let n = this.bindList.length
        // this.bindList[n] = {
        //     tmpX: target.x
        //     ,tmpY: target.y
        // }
        // let bindInterval = setInterval(() => {
        //     if (target.x != this.bindList[n].tmpX) {
        //         this.x += target.x - this.bindList[n].tmpX
        //         this.bindList[n].tmpX = target.x
        //     }
        //     if (target.y != this.bindList[n].tmpY) {
        //         this.y += target.y - this.bindList[n].tmpY
        //         this.bindList[n].tmpY = target.y
        //     }
        // }, 20)
        // let bindTarget = {
        //     target: target
        //     ,unbind: () => {
        //         clearInterval(bindInterval)
        //     }
        // }
        // return bindTarget
        target.bindList.push(this)
        return this
    }
}
