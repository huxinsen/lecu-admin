import Cookies from 'js-cookie'

const TokenKey = 'AdminToken'
const UsernameKey = 'AdminUsername'
const LoginTypeKey = 'LoginType'

// token
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// username
export function getUsername() {
  return Cookies.get(UsernameKey)
}

export function setUsername(username) {
  return Cookies.set(UsernameKey, username)
}

export function removeUsername() {
  return Cookies.remove(UsernameKey)
}

// loginType
export function getLoginType() {
  return Cookies.get(LoginTypeKey)
}

export function setLoginType(loginType) {
  return Cookies.set(LoginTypeKey, loginType)
}

export function removeLoginType() {
  return Cookies.remove(LoginTypeKey)
}
