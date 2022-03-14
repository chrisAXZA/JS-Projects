import { page, render } from '../../lib.js';
import { getUserData } from '../../util.js';
import { logout } from '../api.js';

const root = document.getElementById('main-content');

document.getElementById('logoutBtn').addEventListener('click', onLogout);

export default function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

export function updateUserNav() {
    const user = getUserData();

    if (user) {
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'inline-block';
        // document.querySelector('#user span').textContent = `Welcome, ${user.email}`;
    } else {
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('user').style.display = 'none';
    }
}

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}
