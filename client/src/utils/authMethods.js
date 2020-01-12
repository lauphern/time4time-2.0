import customAxios from './customAxios'

export const login = (user) => {
    return customAxios({
        method: 'post',
        url: '/login',
        data: user
    })
}