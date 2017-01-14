// 平面坐标
function co (x = 0, y = 0) {
    this.x = x
    this.y = y

    // 平滑的接近一个点
    this.moveTo = (point, maxV) => {
        let xDiff = point.x - this.x
        let yDiff = point.y - this.y
        if ((xDiff * xDiff + yDiff * yDiff) < (maxV * maxV)) {
            this.x += xDiff
            this.y += yDiff
        } else {
            this.x += xDiff * maxV / Math.sqrt(xDiff * xDiff + yDiff * yDiff)
            this.y += yDiff * maxV / Math.sqrt(xDiff * xDiff + yDiff * yDiff)
        }
    }

    this.bindList = []
    this.bind = (target) => {
        let n = this.bindList.length
        this.bindList[n] = {
            tmpX: target.x
            ,tmpY: target.y
        }
        let bindInterval = setInterval(() => {
            if (target.x != this.bindList[n].tmpX) {
                this.x += target.x - this.bindList[n].tmpX
                this.bindList[n].tmpX = target.x
            }
            if (target.y != this.bindList[n].tmpY) {
                this.y += target.y - this.bindList[n].tmpY
                this.bindList[n].tmpY = target.y
            }
        }, 20)
        let bindTarget = {
            target: target
            ,unbind: () => {
                clearInterval(bindInterval)
            }
        }
        return bindTarget
    }
}
