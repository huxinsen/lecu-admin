import fetch from '@/utils/fetch'
// {get} /commodities/:cid Get data of a Commodity
export function getCommodity(commodityId) {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/commodities/' + commodityId,
      method: 'get',
      params: {
        type: 'admin',
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
// {get} /commodities/ Get list of Commodities
export function getCommoditiesAdmin(shopId) {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/commodities',
      method: 'get',
      params: {
        shopId,
        type: 'admin',
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
