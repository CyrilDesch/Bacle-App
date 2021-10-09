import axios from 'axios';


const bacleURL = {
  root: "https://bacle-node-api.herokuapp.com/",
  search: "https://bacle-node-api.herokuapp.com/search/",
  user: "https://bacle-node-api.herokuapp.com/user/",
}


class BacleAPI {  

  static search(place) {
    return axios.get(bacleURL.search, { params: { q: place } });
  }

}


export { bacleURL };
export default BacleAPI;
