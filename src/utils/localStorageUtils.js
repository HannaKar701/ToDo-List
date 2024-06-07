export const setToken = (data) => localStorage.setItem('token', data);
export const clearToken = () => localStorage.removeItem('token');
export let token = localStorage.getItem('token');
