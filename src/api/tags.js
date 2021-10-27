import axios from '@/api/axios.js';

const getTags = () => {
    return axios.get('/tags');
}

export default {
    getTags
};