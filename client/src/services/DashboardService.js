import http from '../utils/http';

export const DashboardService = {
    get: () => {
        return http.get('/dashboard');
    },
}