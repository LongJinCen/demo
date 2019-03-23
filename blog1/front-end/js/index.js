(function () {
  var baseUrl = 'http://localhost:3000'
  var xhrObj = {
    request: function (method, path, data = {}, callback) {
      const url = baseUrl + path
      switch (method.toLowerCase()) {
        case 'get':
            this.handleGet(method, url, data, callback)
          break;
        case 'post':
            this.handlePost(method, url, data, callback)
          break;
      }
    },
    handleGet: function (method, url, data, callback) {
      var xhr = null
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
      } else {
        xhr = new Window.ActiveObject('Microsoft.XMLHTTP')
      }
      Object.keys(data).map((key, index, arr) => {
        if (index === 0) {
          url = url + '?'
        } else if (index === arr.length - 1) {
          url = url + key + '&' + data[key]
        } else {
          url = url + key + '&' + data[key] + '&'
        }
        
      })
      xhr.open(method, url, true)
      
      xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          callback(xhr.responseText)
        }
      })
      xhr.send()
    },
    handlePost: function (method, url, data, callback) {
      var xhr = null
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
      } else {
        xhr = new Window.ActiveObject('Microsoft.XMLHTTP')
      }
      xhr.open(method, url, true)
      xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          callback(xhr.responseText)
        }
      })
      xhr.send(JSON.stringify(data))
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    xhrObj.request('GET', '/blogMenu', '', getBlogMenu)
  }, false)

  function getBlogMenu(data) {
    data = JSON.parse(data)
    var sideBarRoot = document.getElementsByClassName('side_bar_list')[0]
    sideBarRoot.addEventListener('click', function (event) {
      const target = event.target
      const path = target.innerText
      xhrObj.request('GET','/blog?id=' + path, '', getBlogContent)
    })

    var listHtmlString = ''
    data = data.map((value, index) => {
      const reg = /.txt/
      return value.replace(reg, '')
    })
    data.forEach(value => {
      listHtmlString += '<li>' + value + '</li>'
    });
    sideBarRoot.innerHTML = listHtmlString;
  }

  function getBlogContent(data) {
    var contentRoot = document.getElementsByClassName('textContent')[0]
    contentRoot.innerText = data
  }
})()




