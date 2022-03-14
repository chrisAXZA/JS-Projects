import { page } from './lib.js';
import * as api from './api/data.js';
import { homePage } from './views/home.js';
import { catalogPage } from './views/catalog.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { createPage } from './views/create.js';
// import { myListingsPage } from './views/my-listings.js';
import { searchPage } from './views/search.js';
import decorateContext, { updateUserNav } from './api/middlewares/decorateContext.js';

window.api = api;

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/detail/:id', detailsPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/search', searchPage);

updateUserNav();

page.start();
