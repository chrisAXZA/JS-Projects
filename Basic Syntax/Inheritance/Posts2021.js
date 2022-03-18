function solution() {
    class Post {
        constructor(title, content) {
            this.title = title;
            this.content = content;
        }

        // toString = function () {
        toString() {
            // const result = `Post: ${this.title}\nContent: ${this.content}`;

            return `Post: ${this.title}\nContent: ${this.content}`;
        };
    }

    class SocialMediaPost extends Post {
        constructor(title, content, likes, dislikes) {
            super(title, content);
            this.likes = likes;
            this.dislikes = dislikes;
            this.comments = [];
        }

        addComment(comment) {
            this.comments.push(comment);
        };

        // toString = function () {
        toString() {
            // const result = [
            //     `Post: ${this.title}`,
            //     `Content: ${this.content}`,
            //     `Rating: ${this.likes - this.dislikes}`,
            // ];
            // if (this.comments.length) {
            //     result.push('Comments:');
            //     this.comments.forEach(com => result.push(` * ${com}`));
            // }

            // return result.join('\n');

            // console.log(baseToString);
            let baseToString = super.toString();
            let comments = this.comments.map(c => ` * ${c}`).join('\n');
            let fullComments = this.comments.length > 0
                ? '\nComments:\n' + comments
                : '';

            return `${baseToString}
Rating: ${this.likes - this.dislikes}${fullComments}`;
        }
    }

    class BlogPost extends Post {
        constructor(title, content, views) {
            super(title, content);
            this.views = views;
        }

        view() {
            // return this.views++;

            // this.views = this.views + 1;
            this.views++;

            return this;
        }

        toString() {
            // const result = [
            //     `Post: ${this.title}`,
            //     `Content: ${this.content}`,
            //     `Views: ${this.views}`,
            // ];
            // return result.join('\n');

            let baseToString = super.toString();
            return `${baseToString}\nViews: ${this.views}`;
        }
    }

    return { Post, SocialMediaPost, BlogPost };
}

const classes = solution();
let post = new classes.Post("Post", "Content");

console.log(post.toString());

// Post: Post
// Content: Content

let scm = new classes.SocialMediaPost("TestTitle", "TestContent", 25, 30);

scm.addComment("Good post");
scm.addComment("Very good post");
scm.addComment("Wow!");

console.log(scm.toString());

let b = new classes.BlogPost("TestTitle", "TestContent", 25);
b.view().view().view();
console.log(b.toString());
