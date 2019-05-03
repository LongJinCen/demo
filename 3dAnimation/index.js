var eles = [].slice.call(document.getElementsByTagName('li'))
eles.forEach(ele => {
    ele.addEventListener('mouseenter', function(e) {
        addClass(this, e, 'in')
    })
    ele.addEventListener('mouseleave', function(e) {
        addClass(this, e, 'out')
    })
});

function addClass (ele, e, type) {
    var y = e.offsetY - ele.offsetWidth / 2,
        x = e.offsetX - ele.offsetHeight / 2
    var key = (Math.round((Math.atan2(y, x) * 180 / Math.PI + 180)/90) + 3) % 4
    var direction  = ''
    switch (key) {
        case 0:
            direction = 'top-'
            break;
        case 1:
            direction = 'right-'
            break;
        case 2:
            direction = 'bottom-'
            break;
        case 3:
            direction = 'left-'
            break;
    }
    ele.className = direction + type
}

