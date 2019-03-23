// 获取滚动条距离
function getScrollOffset () {
  var location = null
  if (window.pageXOffset && window.pageYOffset) {
    location = {
      x: window.pageXOffset,
      y: window.pageYOffset
    }
  } else {
    location = {
      x: document.body.scrollLeft + document.documentElement.scrollLeft,
      y: document.body.scrollTop + document.documentElement.scrollTop
    }
  }
  return location
}
// 获取元素的位置
function getElementOffset (Ele) {
  var result = null
  var location = null
  if (Ele.getBoundingClientRect) {
    location = Ele.getBoundingClientRect()
    result = {
      topLeftCorner: {
        x: location.left,
        y: location.top
      },
      rightBottomCorner: {
        x: location.right,
        y: location.bottom
      }
    }
  } else {
    result = {
      topLeftCorner: {
        x: location.offsetLeft,
        y: location.offsetTop
      }
    }
  }
  return result
}

// 查看当前的可视窗口的尺寸 也就是html的尺寸
function getInnerSize () {
  var innerSize = {}
  if (window.innerHeight && window.innerWidth) {
    innerSize.widthIncludeScroll = window.innerWidth
    innerSize.height = window.innerHeight
  }
  if (document.documentElement.clientHeight && document.documentElement.clientWidth) {
    innerSize.widthNotIncludeScroll = document.documentElement.clientWidth
    innerSize.height = document.documentElement.clientHeight
  }
  if (document.body.clientWidth && document.body.clientHeight) {
    innerSize.widthNotIncludeScroll = document.body.clientWidth
    innerSize.documentHeight = document.body.clientHeight
  }
  return innerSize
}
var lis = document.getElementsByTagName('li')
const waterFlow = {
  page: 0,
  lastEle: null,
  offsetTop: 0,
  canRequest: true,
  getLastLi: function (lis) {
    var result = getElementOffset(lis[0])
    var minHeightElement = lis[0]
    var current = null
    for ( var i = 0; i < lis.length; i++ ) {
      current = getElementOffset(lis[i])
      if (result.rightBottomCorner.y > current.rightBottomCorner.y) {
        result = current
        minHeightElement = lis[i]
      }
    }
    return minHeightElement
  },
  getData: function (callback) {
    var xhr = null
    var that = this
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHttp')
    }
    xhr.open('GET', 'http://localhost/mywater/src/js/getPics.php?cpage='+that.page, true)
    xhr.onreadystatechange = function () {
      if(xhr.readyState === 4 && xhr.status === 200) {
        that.page ++
        callback.call(that, JSON.parse(xhr.responseText))
      }
    }
    xhr.send()
  },
  render: function (data) {
    for (var i = 0; i < data.length; i++) {
      this.lastEle = this.getLastLi(lis)
      var div = document.createElement('div')
      div.className = 'warpper'
      var p = document.createElement('p')
      p.innerText = data[i].title
      var img = document.createElement('img')
      img.src = data[i].preview
      div.appendChild(img)
      div.appendChild(p)
      this.lastEle.appendChild(div)
    }
    this.lastEle = this.getLastLi(lis)
    this.offsetTop = getElementOffset(this.lastEle).rightBottomCorner.y
    this.canRequest = true
  }
}
document.addEventListener('DOMContentLoaded', function () {
  waterFlow.getData(waterFlow.render)
  window.onscroll = function () {
    if (getScrollOffset().y + getInnerSize().height >= waterFlow.offsetTop) {
      if (waterFlow.canRequest) {
        waterFlow.getData(waterFlow.render)
        waterFlow.canRequest = false
      }
    }
  }
}, false)