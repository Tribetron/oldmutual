/**
 * importing products from old mutual database.
 */
import axios from 'axios';
// import _products1 from './data.json';

const API_PATH = 'http://10.70.12.38:4000/products';

var data;
axios.get(API_PATH)
  .then(function (response) {
      data = response.data;
  })
  .catch(function (error) {
    // handle error
  })
  .then(function () {
    // always executed
  });

  setTimeout(function(){ console.log(data); }, 3000);

const TIMEOUT = 100;

export default {
    getProducts: (cb, timeout) => setTimeout(() => cb(data),3000 || TIMEOUT),
    buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), 3000 || TIMEOUT)
}


