import fetch from '@/utils/fetch'
// {get} /shops Get list of Shops
export function getShopsAdmin() {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/shops',
      method: 'get',
      params: {
        type: 'toCheck',
      },
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// {put} /shops/:sid Update data of a Shop
export function updateShopAdmin(shopInfo) {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/shops/' + shopInfo.shopId,
      method: 'put',
      data: { ...shopInfo, type: 'manage' },
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// {get} /shops/:sid Get data of a Shop
export function getShop(shopId) {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/shops/' + shopId,
      method: 'get',
      params: {
        type: 'full',
      },
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
