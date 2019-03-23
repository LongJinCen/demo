const { get, post, put, _delete, head } = require('./service/test')

post({ name: 'longjincen' }).then((res) => {
  console.log(res, 'res')
})