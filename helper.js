function btmdjx(width, height) {
    let tmp = document.createElement('canvas')
    tmp.width = width
    tmp.height = height
    let ctx = tmp.getContext('2d')
    ctx.strokeRect(0, 0, width, height)
    return ctx.getImageData(0, 0, width, height)
}

function poker(t, width = 70, height = 90) {
    let tmp = document.createElement('canvas')
    tmp.width = width
    tmp.height = height
    let ctx = tmp.getContext('2d')
    ctx.font = '20px Arial'
    ctx.strokeRect(0, 0, width, height)
    if (t.charAt(0) == '♥' || t.charAt(0) == '♦') {
        ctx.fillStyle = '#f00'
        ctx.fillText(t, 3, 20)
    } else if (t == 'RedJoker') {
        ctx.fillStyle = '#f00'
        t = 'Joker'
        ctx.fillText(t, 3, 20)
    } else if (t == 'back') {
        let back = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width)
        back.addColorStop(0, '#aaf')
        back.addColorStop(1, '#33f')
        ctx.fillStyle = back
        ctx.fillRect(0, 0, width, height)
    } else {
        ctx.fillText(t, 3, 20)
    }

    return ctx.getImageData(0, 0, width, height)
}

function select() {
    if (this.selected) {
        this.co.y += 10
        this.selected = false
    } else {
        this.co.y -= 10
        this.selected = true
    }
}
// for (let i = 0;i<4;i++) {
//     let t = '♠♥♣♦'.charAt(i)
//
//     for (let j = 1;j<14;j++) {
//         switch (j) {
//           case 11:
//             a = 'J'
//             break;
//           case 12:
//             a = 'Q'
//             break;
//           case 13:
//             a = 'K'
//             break;
//           default:
//             a = j
//         }
//         ca.ctx.putImageData(poker(t+a), j * 30, i * 100)
//     }
// }
