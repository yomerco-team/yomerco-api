const axios = require('axios')

const functions = {
  add: (num1, num2) => num1 + num2,
  isNull: () => null,
  checkValue: x => x,
  createUser: () => {
    const user = { firstName: 'Cristian' }
    user['lastName'] = 'Ippolito'
    return user
  },
  fetchUser: () => axios.get('https://jsonplaceholder.typicode.com/users/1')
    .then(res => res.data)
    .catch(err => `Error: ${err}`)
}

module.exports = functions
