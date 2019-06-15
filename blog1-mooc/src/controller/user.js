const login = (username, password) => {
    if(username === "longjincen" && password === "123") {
        return true
    }
    return false
}
module.exports = {
    login
}