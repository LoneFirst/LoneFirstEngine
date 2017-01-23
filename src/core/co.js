window.lfg = window.lfg || {}
// 平面坐标
window.lfg.co = function (x = 0, y = 0) {
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
        let sub = new lfg.co(x, y)
        this.bind(sub)
        sub.bind(this)
        return this
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
        //     thisX: target.x
        //     ,thisY: target.y
        // }
        // let bindInterval = setInterval(() => {
        //     if (target.x != this.bindList[n].thisX) {
        //         this.x += target.x - this.bindList[n].thisX
        //         this.bindList[n].thisX = target.x
        //     }
        //     if (target.y != this.bindList[n].thisY) {
        //         this.y += target.y - this.bindList[n].thisY
        //         this.bindList[n].thisY = target.y
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
    return this
}
