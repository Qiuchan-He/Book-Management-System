import axios from 'axios'

export async function getBookList(params={}){
    const res = await axios.get('https://mock.apifox.cn/m1/2398938-0-default/api/books',{params})
    const data = res.data
    return data
}

export async function bookAdd(params){
    return axios.post('https://mock.apifox.cn/m1/2398938-0-default/api/books', params)
}

export async function bookDelete(id){
    return axios.delete(`https://mock.apifox.cn/m1/2398938-0-default/api/books/{${id}}`)
}

export async function getCategoryList(params={}){
    const res = await axios.get('https://mock.apifox.cn/m1/2398938-0-default/api/categories',{params})
    const data = res.data
    return data
}

export async function categoryDelete(id){
    return axios.delete(`https://mock.apifox.cn/m1/2398938-0-default/api/categories/{${id}}`)
}

export async function categoryAdd(params){
    return axios.post('https://mock.apifox.cn/m1/2398938-0-default/api/categories', params)
}

export async function getBorrowList(params={}){
    const res = await axios.get('https://mock.apifox.cn/m1/2398938-0-default/api/borrows',{params})
    const data = res.data
    return data
}

export async function borrowDelete(id){
    return axios.delete(`https://mock.apifox.cn/m1/2398938-0-default/api/borrows/${id}}`)
}

export async function borrowAdd(params){
    return axios.post('https://mock.apifox.cn/m1/2398938-0-default/api/borrows',params)
}

export async function getBorrowDetails(id){
    const res = await axios.get(`https://mock.apifox.cn/m1/2398938-0-default/api/borrows/${id}`)
    const data = res.data
    return data
}

export async function getUserList(params={}){
    const res = await axios.get('https://mock.apifox.cn/m1/2398938-0-default/api/users',{params})
    const data = res.data
    return data
}

export async function userDelete(id){
    return axios.delete(`https://mock.apifox.cn/m1/2398938-0-default/api/users/${id}`)
}

export async function userAdd(params){
    return axios.post('https://mock.apifox.cn/m1/2398938-0-default/api/users', params)
}

export async function userUpdate(params){
    return axios.put('https://mock.apifox.cn/m1/2398938-0-default/api/users', params)
}

export async function login(params){
    return axios.post('https://mock.apifox.cn/m1/2398938-0-default/api/login', params)
}

