import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
export default axios;
// Now, all Axios requests will be sent to 'http://localhost:5000' by default.
