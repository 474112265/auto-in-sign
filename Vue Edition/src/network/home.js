import axios from 'axios'

axios.defaults.baseURL = 'https://www.funblog.top';
axios.defaults.timeout = 5000;

export function PostHomeMultidata() {
  return axios({
    method: 'POST',
    url: '/query.js',
    data: {
      text: '201800002505',
      ip:'000.000.000'
    },
  })
}

export function PostHomeData(type, page) {
  return axios({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
