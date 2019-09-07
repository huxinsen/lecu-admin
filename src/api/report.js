import fetch from '@/utils/fetch'
// {get} /reports Get list of Reports
export function getReports() {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/reports',
      method: 'get',
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// {put} /reports/:rid Update a Report
export function updateReport(reportId) {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/reports/' + reportId,
      method: 'put',
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
