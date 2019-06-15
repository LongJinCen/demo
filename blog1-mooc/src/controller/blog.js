const getList = (author, keyword) => {
    return [
        {
            id:1,
            title: 'fafs',
            content: 'fjalfjklsdjfkldsfs',
            createTime: 123456789,
            author: 'zhangsan'
        },
        {
            id:2,
            title: 'cvbnm',
            content: 'vjksjfkl;sjf',
            createTime: 123456789,
            author: 'zhangsan1'
        }
    ]
}

const getDetail = (id) => {
    return {
        id:1,
        title: 'fafs',
        content: 'fjalfjklsdjfkldsfs',
        createTime: 123456789,
        author: 'zhangsan'
    }
}

const newBlog = (data) => {
    return {
        id: 3
    }
}

const updateBlog = (id, data) => {
    return true
}

const delBlog = (id) => {
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}