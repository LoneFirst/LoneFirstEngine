// import core from './src/core.js'



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
ca.addObj(
    new rect(100, 100, 50, 50, {
        key: 'rect',
        color: '#f00',
        onmouseover: o,
        onmouseout: t
        // ,press: function () {
        //     // this.co.x = ca.mouse.x - this.pressx
        //     // this.co.y = ca.mouse.y - this.pressy
        //     this.co.moveTo({x: ca.mouse.x - this.pressx, y: ca.mouse.y - this.pressy}, 20)
        // }
    })
)
for (let i = 1; i < 14; i++) {
    ca.addObj(new obj(poker('♥'+i), 170 + i * 30, 100, 70, 90, {
        key: 'poker' + i,
        onclick: select,
        // press: function () {
        //     this.co.x = ca.mouse.x - this.pressx
        //     this.co.y = ca.mouse.y - this.pressy
        // }
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
ca.obj.poker1.co.bind(ca.obj.rect.middle)
ca.obj.rect.co.on('change', () => {
    console.log('!')
})
// ca.obj.rect.co.bind(ca.obj.poker1.co)
// ca.obj.rect.co.bind(ca.obj.rect.middle)
