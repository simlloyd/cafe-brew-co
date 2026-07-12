const API_URL = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('adminToken');

const isAdminLoggedIn = () => !!getToken();

// ===== AUTH =====
const adminLogin = async (userData) => {
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (data.token && data.user.role === 'admin') {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
    }
    return data;
};

const adminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.localStorage.href = 'login.html';
};

// ===== PRODUCTS =====
const getProducts = async () => {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    return data;
};

const createProduct = async (productData) => {
    const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify(productData),
    });
    const data = await response.json();
    return data;
};

const updateProduct = async (id, productData) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify(productData),
    });
    const data = await response.json();
    return data;
};

const deleteProduct = async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` },
    });
    const data = await response.json();
    return data;
};

// ===== ORDERS =====
const getAllOrders = async () => {
    const response = await fetch(`${API_URL}/orders`, {
        headers: { 'Authorization': `Bearer ${getToken()}` },
    });
    const data = await response.json();
    return data;
};

const updateOrderStatus = async (id, status) => {
    const response = await fetch(`${API_URL}/orders/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ status }),
    });
    const data = await response.json();
    return data;
};