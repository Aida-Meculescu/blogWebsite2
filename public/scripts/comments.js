const loadCommentsBtnElement = document.getElementById('load-comments-btn');
const commentsSectionElement = document.getElementById('comments');
const commentsFormElement = document.querySelector('#comments-form form');
const commentTitleElement = document.getElementById('title');
const commentTextElement = document.getElementById('text');

function createCommentsList(comments) {
    const commentListElement = document.createElement('ol');

    for (const comment of comments) {
        const commentElement = document.createElement('li');
        commentElement.innerHTML = `
      <article class="comment-item">
        <h2>${comment.title}</h2>
        <p>${comment.text}</p>
      </article>
    `;
        commentListElement.appendChild(commentElement);
    }

    return commentListElement;
}

async function fetchCommentsForPost() {
    try {
        const postId = loadCommentsBtnElement.dataset.postid;
        const response = await fetch(`/posts/${postId}/comments`);

        if (!response.ok) { // check for 400/500 error type
            alert('Fetching comments failed!')
            return
        }
        const responseData = await response.json();

        if (responseData && responseData.length > 0) {
            const commentsListElement = createCommentsList(responseData);
            commentsSectionElement.innerHTML = '';
            commentsSectionElement.appendChild(commentsListElement);
        } else {
            commentsSectionElement.firstElementChild.textContent = 'We could not find any comments. Maybe add one?'
        }

    } catch (error) { // check technical error
        alert('Getting comments failed!')
    }


}

async function saveComment(event) {

    try {
        event.preventDefault();
        const postId = commentsFormElement.dataset.postid;

        const enteredTitle = commentTitleElement.value;
        const enteredText = commentTextElement.value;

        const comment = { title: enteredTitle, text: enteredText };

        const response = await fetch(`/posts/${postId}/comments`, {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) { // this is for a "negative response" like 500 or 400
            fetchCommentsForPost()
        } else {
            alert('Could not send comment!')
        }
    } catch (error) { // this is for a technical error - we do not have an answere like 500 or 400 // the request it`s not sent 
        alert('Could not send request - maybe try again later!')
    }


}

loadCommentsBtnElement.addEventListener('click', fetchCommentsForPost);
commentsFormElement.addEventListener('submit', saveComment);