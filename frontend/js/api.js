const API_URL = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

const getProducts = async () => {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    return data;
};

const register = async (userData) => {
    const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
};

const login = async (userData) => {
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
};

const getCart = async () => {
    const response = await fetch(`${API_URL}/cart`, {
        headers: { 'Authorization': `Bearer ${getToken()}` },
    });
    const data = await response.json();
    return data;
};

const addToCart = async (productId, quantity) => {
    const response = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: {
            'Content_Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ productId, quantity }),
    });
    const data = await response.json();
    return data;
};

const removeFromCart = async (productId) => {
    const response = await fetch(`${API_URL}/cart/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` },
    });
    const data = await response.json();
    return data;
};

const placeOrder = async () => {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getToken()}` },
    });
    const data = await response.json();
    return data;
};

const getMyOrders = async () => {
    const response = await fetch(`${API_URL}/orders/my-orders`, {
        headers: { 'Authorization': `Bearer ${getToken()}` },
    });
    const data = await response.json();
    return data;
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
};