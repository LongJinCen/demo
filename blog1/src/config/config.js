const fileErrorStatusCode = {
  EACCES: 404,
  ECONNREFUSED: 404,
  EEXIST: 404,
  EISDIR: 404,
  
  ENOENT: 404,
  ENOTDIR: 404,
  ENOTEMPTY: 404,
  EPERM: 404,
  ETIMEDOUT: 404
}

module.exports = {
  fileErrorStatusCode
}