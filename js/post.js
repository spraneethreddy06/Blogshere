const posts = JSON.parse(localStorage.getItem("posts")) || [];

const currentPostIndex = localStorage.getItem("currentPostIndex");

const currentPost = posts[currentPostIndex];

const postTitle = document.getElementById("postTitle");
const postAuthor = document.getElementById("postAuthor");
const postDate = document.getElementById("postDate");
const postContent = document.getElementById("postContent");

const commentForm = document.getElementById("commentForm");
const commentInput = document.getElementById("commentInput");
const commentsContainer = document.getElementById("commentsContainer");

const backBtn = document.getElementById("backBtn");


// BACK BUTTON
backBtn.addEventListener("click",()=>{

  window.location.href = "dashboard.html";

});


// DISPLAY POST
postTitle.innerText = currentPost.title;

postAuthor.innerText = `Author: ${currentPost.author}`;

postDate.innerText = currentPost.createdAt;

postContent.innerText = currentPost.content;


// COMMENTS
if(!currentPost.comments){
  currentPost.comments = [];
}


// DISPLAY COMMENTS
function displayComments(){

  commentsContainer.innerHTML = "";

  if(currentPost.comments.length === 0){

    commentsContainer.innerHTML = `
      <p style="margin-top:20px;color:#cbd5e1;">
        No comments yet.
      </p>
    `;

    return;
  }

  currentPost.comments.forEach((comment)=>{

    commentsContainer.innerHTML += `

      <div class="comment-card">

        <h4>${comment.user}</h4>

        <p>${comment.text}</p>

      </div>

    `;

  });

}


// ADD COMMENT
commentForm.addEventListener("submit",(e)=>{

  e.preventDefault();

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const newComment = {

    user:loggedInUser.name,

    text:commentInput.value

  };

  currentPost.comments.push(newComment);

  posts[currentPostIndex] = currentPost;

  localStorage.setItem("posts",JSON.stringify(posts));

  commentForm.reset();

  displayComments();

});


displayComments();