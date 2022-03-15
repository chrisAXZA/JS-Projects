import { page } from './lib.js';
import * as api from './api/data.js';
import { homePage } from './views/home.js';
import { catalogPage } from './views/catalog.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { createPage } from './views/create.js';
import decorateContext, { updateUserNav } from './api/middlewares/decorateContext.js';

page(decorateContext);
page('/', homePage);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/detail/:id', detailsPage);
page('/edit/:id', editPage);
page('/create', createPage);

// page('/search', searchPage);

updateUserNav();

page.start();
