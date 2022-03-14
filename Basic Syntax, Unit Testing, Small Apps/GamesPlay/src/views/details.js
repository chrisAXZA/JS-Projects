import { html } from '../lib.js';

import { getUserData } from '../util.js';
import { allCommentsByGame, commentGame, deleteGame, getGameById } from '../api/data.js';

// const detailsTemplate = (game, isOwner, onDelete) => html`
const detailsTemplate = (game, isOwner, onDelete, createComment, showCommentBtn, comments) => html`
        <section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">
        
                <div class="game-header">
                    <img class="game-img" src=${game.imageUrl} />
                    <h1>${game.title}</h1>
                    <span class="levels">MaxLevel: ${game.maxLevel}</span>
                    <p class="type">${game.category}</p>
                </div>
        
                <p class="text">
                    ${game.summary}
                </p>
        
                <!-- Bonus ( for Guests and Users ) -->
                <div class="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        <!-- list all comments for current game (If any) -->
                        ${comments.length === 0 ? html`<p class="no-comment">No comments.</p>` 
                        : comments.map(commentCard)}
                    </ul>
                    <!-- Display paragraph: If there are no games in the database -->
                </div>
        
                ${isOwner ? html`
                <div class="buttons">
                    <a href="/edit/${game._id}" class="button">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
                </div>` : null}
            </div>
        
            <!-- Bonus -->
            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
            <!-- <article class="create-comment"></article> -->
            ${showCommentBtn ? html`<article class="create-comment"><label>Add new comment:</label>
                <form @submit=${createComment} class="form">
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input class="btn submit" type="submit" value="Add Comment">
                </form></article>` : null}
        </section>
`;

const commentCard = (comment) => html`
<li class="comment">
    <p>${comment.comment}</p>
</li>
`;

export async function detailsPage(ctx) {
    // console.log(ctx.params);
    const gameId = ctx.params.id;
    const game = await getGameById(gameId);

    const userData = getUserData();
    const isOwner = userData && game._ownerId == userData.id;
    const comments = await allCommentsByGame(gameId);

    const showCommentBtn = userData !== null && isOwner === false;

    ctx.render(detailsTemplate(game, isOwner, onDelete, createComment, showCommentBtn, comments));

    async function onDelete() {
        const choice = confirm('Are you sure?');
        if (choice) {
            await deleteGame(gameId);
            ctx.page.redirect('/');
        }
    }

    async function createComment(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const comment = formData.get('comment');
        
        if (comment === '') {
            return alert('Comment can not be empty');
        }

        await commentGame(gameId,comment);

        ctx.page.redirect(`/detail/${gameId}`);
    }
}