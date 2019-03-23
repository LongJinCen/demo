
function createXHR() {
  var xhr = null
  if (window.XMLHttpRequest) {
    xhr = new window.XMLHttpRequest()
  } else {
    xhr = new window.ActiveObject("Microsoft.XMLHTTP")
  }
  return xhr
}

function request(url, optionsObj) {
  const { method } = optionsObj
  switch (method.toLocaleLowerCase()) {
    case 'get':
      return handleGet(url, optionsObj)
    case 'post':
      return handlePost(url, optionsObj)
    case 'put':
      break;
    case 'delete':
      break;
    default:
      break;
  }
}


function handleGet(url, optionsObj) {
  const { dataObj } = optionsObj 
  var xhr = createXHR()
  var queryData = ''
  Object.keys(dataObj).map((key, index) => {
    if (index === 0) {
      queryData += '?' + key + '=' + dataObj[key]
    } else {
      queryData += '&' + key + '=' + dataObj[key]
    }
  })
  url = encodeURI(url + queryData)
  return new Promise((resolve, reject) => {
    xhr.open('get', url, true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 304) {
          resolve(JSON.parse(xhr.responseText))
        }
      }
    }
    xhr.send()
  })
}

function handlePost(url, optionsObj) {
  const { dataObj } = optionsObj
  return new Promise((resolve, reject) => {
    var xhr = createXHR()
    xhr.open('post', url, true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 304) {
          resolve(JSON.parse(xhr.responseText))
        }
      }
    }
    xhr.send(JSON.stringify(dataObj))
  })
}

function handlePut(url, options) {
  var xhr = createXHR()
}

function handleDelete(url, options) {
  var xhr = createXHR()
}
module.exports = {
  request
}



