import api from '../api/index';

export async function fetchData(fn) {
    try {
        const response = await api.get('/api/todos');
        fn(response.data);
    } catch (error) {
        console.error('Ошибка при запросе:', error);
    }
}
