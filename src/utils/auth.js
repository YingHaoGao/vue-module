// localStore 存储信息

// 导入token
const Token = 'Token';
// 导入user用户对象
const User = 'User';

export function getToken() {
    return localStorage.getItem(Token);
}
export function setToken(token) {
    return localStorage.setItem(Token,token);
}
export function removeToken() {
    return localStorage.removeItem(Token);
}

export function getUser() {
    return localStorage.getItem(User);
}
export function setUser(user) {
    return localStorage.setItem(User,user);
}
export function removeUser() {
    return localStorage.removeItem(User);
}
