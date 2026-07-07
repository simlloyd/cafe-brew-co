const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

const isLoggedIn = () => !!getToken();

const updateNavbar = () => {
    const user = getUser();
    const navAuth = document.getElementById('nav-auth');
    const navCart = document.getElementById('nav-cart');
    const navOrders = document.getElementById('nav-orders');
    const navLogout = document.getElementById('nav-logout');
    const navUser = document.getElementById('nav-user');


if (isLoggedIn() && user) {
    navAuth.style.display = 'none';
    navCart.style.display = 'block';
    navOrders.style.display = 'block';
    navLogout.style.display = 'block';
    navUser.textContent = `Hi, ${user.name}!`;
} else {
    navAuth.style.display = 'block';
    navCart.style.display = 'none';
    navOrders.style.display = 'none';
    navLogout.style.display = 'none';
    navUser.textContent = '';
}

};

document.addEventListener('DOMContentLoaded', updateNavbar);