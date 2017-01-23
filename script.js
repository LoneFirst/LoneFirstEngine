var ca = new lfg.canvas
ca.material = {
    "bg": {
        "type": "img",
        "src": "./assets/b.png"
    },
    "btn": {
        "type": "audio",
        "src": "./assets/btn.wav"
    },
    "music": {
        "type": "audio",
        "src": "./assets/music.mp3"
    }
}
ca.init()
// var bgm = ca.material.music.play({volume: 0.1, loop: true, autoplay: false})
function t() {
    // this.translate(-50, -50)
    this.scale(1, 1)
    // bgm.pause()
    // ca.material.btn.play()

}

function o() {
    // this.translate(50, 50)
    this.scale(2, 2)
    // bgm.play()
    // ca.material.btn.play()
}
function sq (ctx) {
    let back = ctx.createRadialGradient(25, 25, 0, 25, 25, 50)
    back.addColorStop(0, '#aaf')
    back.addColorStop(1, '#33f')
    ctx.fillStyle = back
    ctx.fillRect(0, 0, 50, 50)
}
ca.addObj(
    new lfg.genius(sq, 100, 100, 50, 50, {
        color: '#f00',
        press: function () {
            this.co.x = ca.mouse.x - this.pressx
            this.co.y = ca.mouse.y - this.pressy
        }
        //  ,onmouseover: o
        //  ,onmouseout: t
        // ,press: function () {
        //     // this.co.x = ca.mouse.x - this.pressx
        //     // this.co.y = ca.mouse.y - this.pressy
        //     this.co.moveTo({x: ca.mouse.x - this.pressx, y: ca.mouse.y - this.pressy}, 20)
        // }
    })
)
for (let i = 1; i < 14; i++) {
    ca.addObj(new lfg.obj(poker('♥'+i), 170 + i * 30, 100, 70, 90, {
        onclick: select
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
