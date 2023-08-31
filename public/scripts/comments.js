const loadCommentsBtnElement = document.getElementById('load-comments-btn')
const commentsSectionElement = document.getElementById('comments')
const commentsFormElement = document.querySelector('#comments-form form')
const commentTitleElement = document.getElementById('title')
const commentTextElement = document.getElementById('text')

function createCommentsList(comments) {
    const commentListElement = document.createElement('ol')

    for (const comment of comments) {
        const commentElement = document.createElement('li')
        commentElement.innerHTML = `
            <article class="comment-item">
                <h2>${comment.title}  </h2>
                <p>${comment.text} </p>
            </article>
        `;
        commentListElement.appendChild(commentElement)
    }

    return commentListElement
}


async function fetchCommentsForPost() {
    const postId = loadCommentsBtnElement.dataset.postid
    const response = await fetch(`/posts/${postId}/comments`)
    const responseData = await response.json()
    // console.log(responseData)

    const commentsListElement = createCommentsList(responseData)
    commentsSectionElement.innerHTML = ''
    commentsSectionElement.appendChild(commentsListElement)
}

function saveComment(event) {
    event.preventDefault()
    const postId = commentsFormElement.dataset.postid

    const enterTitle = commentTitleElement.value
    const enterText = commentTextElement.value

    const comment = { title: enterTitle, text: enterTitle }

    console.log(enterTitle, enterText)

    fetch(`/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify(comment)
    })
}

loadCommentsBtnElement.addEventListener('click', fetchCommentsForPost)
commentsFormElement.addEventListener('submit', saveComment)