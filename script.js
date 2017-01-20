var ca = new canvas
ca.init()
// var bgm = ca.material.music.play({volume: 0.1, loop: true, autoplay: false})
function t() {
    this.co.x += 10
    this.co.y += 10
    this.width -= 20
    this.height -= 20
    // bgm.pause()
    // ca.material.btn.play()

}

function o() {
    this.co.x -= 10
    this.co.y -= 10
    this.width += 20
    this.height += 20
    // bgm.play()
    // ca.material.btn.play()
}
let tmp = document.createElement('canvas')
tmp.width = 50
tmp.height = 50
let ctx = tmp.getContext('2d')
ctx.font = '20px Arial'
let back = ctx.createRadialGradient(25, 25, 0, 25, 25, 50)
back.addColorStop(0, '#aaf')
back.addColorStop(1, '#33f')
ctx.fillStyle = back
ctx.fillRect(0, 0, 50, 50)
let squre = ctx.getImageData(0, 0, 50, 50)
ca.addObj(
    new obj(squre, 100, 100, 50, 50, {
        color: '#f00',
        press: function () {
            console.log(this.key + ' be pressed')
            this.co.x = ca.mouse.x - this.pressx
            this.co.y = ca.mouse.y - this.pressy
        }
        // ,press: function () {
        //     // this.co.x = ca.mouse.x - this.pressx
        //     // this.co.y = ca.mouse.y - this.pressy
        //     this.co.moveTo({x: ca.mouse.x - this.pressx, y: ca.mouse.y - this.pressy}, 20)
        // }
    })
)
for (let i = 1; i < 14; i++) {
    ca.addObj(new obj(poker('♥'+i), 170 + i * 30, 100, 70, 90, {
        onclick: select,
        // onmousestay: function () {
        //     this.co.moveTo(new co(200, 50), 1)
        // },
        // onmousenotstay: function () {
        //     this.co.moveTo(new co(200, 100), 1)
        // }

    }))
}
ca.tick = () => {
  // ca.obj.rect.middle.moveTo(ca.mouse, 10)

}
// ca.obj.rect.co.bindList.push(ca.obj.poker1.co)
// ca.obj.poker1.co.bind(ca.obj.rect.middle)
// ca.obj.rect.co.on('change', () => {
//     console.log('!')
// })
// ca.obj.rect.co.bind(ca.obj.poker1.co)
// ca.obj.rect.co.bind(ca.obj.rect.middle)
