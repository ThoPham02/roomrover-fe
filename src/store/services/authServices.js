import axios from '../axios'

export const apiRegister = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'post',
            url: '/users/register',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiLogin = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'post',
            url: '/users/login',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiGetCurrent = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'users/info',
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})