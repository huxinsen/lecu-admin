import fetch from '@/utils/fetch'
// {post} {post} /session/:type Login:type Login
export function login(username, password) {
  return fetch({
    url: '/session/admin',
    method: 'post',
    data: {
      username,
      password,
    },
  })
}
