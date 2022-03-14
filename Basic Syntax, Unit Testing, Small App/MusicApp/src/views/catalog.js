import { getUserData } from '../util.js';
import { getAllAlbums } from '../api/data.js';
import { html } from '../lib.js';

const catalogTemplate = (albums, userData) => html`
        <section id="catalogPage">
            <h1>All Albums</h1>
            ${albums.length === 0 ? html`<p>No Albums in Catalog!</p>` : albums.map(album => albumCard(album, userData ))}        
        </section>
    `;

const albumCard = (album, userData) => html`
 <div class="card-box">
     <img src=${album.imgUrl}>
     <div>
         <div class="text-center">
             <p class="name">Name: ${album.name}</p>
             <p class="artist">Artist: ${album.artist}</p>
             <p class="genre">Genre: ${album.genre}</p>
             <p class="price">Price: $${album.price}</p>
             <p class="date">Release Date: ${album.releaseDate}</p>
         </div>
 

         ${ userData && (userData || album._ownerId === userData.id) 
            ? html` <div class="btn-group"><a href="/detail/${album._id}" id="details">Details</a></div>` 
            : ''} 
 
     </div>
</div>
`;

export async function catalogPage(ctx) {
    const albums = await getAllAlbums();
    const userData = getUserData() || null;

    ctx.render(catalogTemplate(albums, userData));
}
