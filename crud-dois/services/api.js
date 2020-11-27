
const axios = require('axios')

// Pode ser algum servidor executando localmente: 
// http://localhost:3000

const api = axios.create();

module.exports = api;