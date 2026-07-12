const getAdminUser = () => {
    const user = localStorage.getItem('adminUser');
    return user ? JSON.parse(user) : null;
};

const checkAdminAuth = () => {
    if (!isAdminLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }
    const user = getAdminUser();
    if(user) {
        const navUser = document.getElementById('nav-user');
        if (navUser) navUser.textContent = `Admin: ${user.name}`;
    }
};