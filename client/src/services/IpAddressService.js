import http from '../utils/http';

export const IpAddressService = {
    getAll: (queryString) => {
        if (queryString) {
            queryString = '?' + queryString;
        }
        return http.get('ip-addresses' + queryString);
    },
    
    get: (id) => {
        return http.get(`ip-addresses/${id}`);
    },
    
    create: (data) => {
        return http.post('ip-addresses', data);
    },
    
    update: (id, data) => {
        return http.put(`ip-addresses/${id}`, data);
    }
}