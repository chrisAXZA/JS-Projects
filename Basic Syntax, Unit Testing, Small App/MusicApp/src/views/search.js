import { getAlbumByName, getAlbumById } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const searchTemplate = (album, onSearch, userData, firstCall) => html`
        <section id="searchPage">
            <h1>Search by Name</h1>
        
            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button @click=${onSearch} class="button-list">Search</button>
            </div>
        
            <h2>Results:</h2>
        
            <!--Show after click Search button-->
            <div class="search-result">
                <!--If have matches-->
        
                ${firstCall === true 
                    ? ''
                    : album.length === 0
                    ? html`<p class="no-result">No result.</p>` 
                    : album.map(album => albumCard(album, userData)) }    


                <!--If there are no matches-->
        
            </div>
        </section>
`;


function albumCard(album, userData) {
    return html`<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>

        ${userData === null ? '' : html`<div class="btn-group">
            <a href="/detail/${album._id}" id="details">Details</a>
        </div>`}
    </div>
</div>
`;
}

export async function searchPage(ctx) {

    const userData = getUserData();

    let firstCall = true;

    ctx.render(searchTemplate(null, onSearch, userData, firstCall));

    async function onSearch() {

        const input = document.getElementById('search-input').value;

        if (input === '') {
            return alert('Field can not be empty!');
        }

        firstCall = false;

        const album = await getAlbumByName(input);

        const userData = getUserData();

        ctx.render(searchTemplate(album, onSearch, userData));

    }
}