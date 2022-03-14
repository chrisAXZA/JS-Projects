import { deleteAlbum, getAlbumById } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

// const detailsTemplate = (game, isOwner, onDelete) => html`
const detailsTemplate = (album, onDelete, isOwner) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${album.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name:${album.name}</h1>
                <h3>Artist: ${album.artist}</h3>
                <h4>Genre: ${album.genre}</h4>
                <h4>Price: $${album.price}</h4>
                <h4>Date: ${album.date}</h4>
                <p>Description: ${album.description}</p>
            </div>

            <!-- Only for registered user and creator of the album-->
            ${isOwner 
                ? html` <div class="actionBtn">
                <a href="/edit/${album._id}" class="edit">Edit</a>
                <a @click=${onDelete} href="javscript:void(0)" class="remove">Delete</a>
                </div>` 
                : ''}


        </div>
    </div>
</section>
`;


export async function detailsPage(ctx) {
    // console.log(ctx.params);
    const albumId = ctx.params.id;
    const album = await getAlbumById(albumId);

    const userData = getUserData();
    const isOwner = userData && album._ownerId == userData.id;
    // const comments = await allCommentsByGame(listingId);

    // const showCommentBtn = userData !== null && isOwner === false;

    ctx.render(detailsTemplate(album, onDelete, isOwner));

    async function onDelete(event) {
        event.preventDefault();
        const choice = confirm('Are you sure?');
        if (choice) {
          try{
            const response =  await  deleteAlbum(albumId); 
 
            ctx.page.redirect('/catalog');
        
            } catch(err){
             return alert(err.message);
            }
        }
        

        // if (choice) {   
        //     const response =  await  deleteAlbum(albumId);        
        //     // console.log(response);
        // }
        
        // ctx.page.redirect('/catalog');
    }
}