const loggedInUser = JSON.parse(
  localStorage.getItem("loggedInUser")
);

if(!loggedInUser){
  window.location.href = "login.html";
}

const welcomeUser = document.getElementById("welcomeUser");
const logoutBtn = document.getElementById("logoutBtn");

const postForm = document.getElementById("postForm");
const postsContainer = document.getElementById("postsContainer");
const searchInput = document.getElementById("searchInput");
const postImage = document.getElementById("postImage");
const imagePreview = document.getElementById("imagePreview");
welcomeUser.innerText = `Hi, ${loggedInUser.name}`;
const profileName = document.getElementById("profileName");
const totalPosts = document.getElementById("totalPosts");
const totalLikes = document.getElementById("totalLikes");

profileName.innerText = loggedInUser.name;
let posts = JSON.parse(localStorage.getItem("posts")) || [];
// IMAGE PREVIEW
let selectedImage = "";

postImage.addEventListener("change",(e)=>{

  const file = e.target.files[0];

  if(!file) return;

  const reader = new FileReader();

  reader.onload = function(event){

    selectedImage = event.target.result;

    imagePreview.src = selectedImage;

    imagePreview.style.display = "block";

  };

  reader.readAsDataURL(file);

});

// LOGOUT
logoutBtn.addEventListener("click",()=>{

  localStorage.removeItem("loggedInUser");

  window.location.href = "login.html";

});




// DISPLAY POSTS
function displayPosts(searchTerm = ""){

  if(!postsContainer) return;

  postsContainer.innerHTML = "";

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(
      searchTerm.toLowerCase()
    )
  );

  if(filteredPosts.length === 0){

    postsContainer.innerHTML = `
      <div class="empty-post">
        No blog posts found.
      </div>
    `;

    return;
  }

  filteredPosts
    .slice()
    .reverse()
    .forEach((post,index)=>{

      postsContainer.innerHTML += `

  <div class="post-card">

    ${post.image ? `
      <img src="${post.image}" alt="Post Image">
    ` : ""}

    <h3>${post.title}</h3>

    <p>
      ${post.content.substring(0,150)}...
    </p>

    <div class="post-actions">

  <button
    class="btn"
    onclick="viewPost(${posts.indexOf(post)})"
  >
    Read More
  </button>

  <button
    class="btn like-btn"
    onclick="likePost(${posts.indexOf(post)})"
  >
    ❤️ ${post.likes || 0}
  </button>

  <button
    class="btn save-btn"
    onclick="savePost(${posts.indexOf(post)})"
  >
    🔖 Save
  </button>

  <button
    class="btn edit-btn"
    onclick="editPost(${posts.indexOf(post)})"
  >
    Edit
  </button>

  <button
    class="btn delete-btn"
    onclick="deletePost(${posts.indexOf(post)})"
  >
    Delete
  </button>

</div>

  </div>

`;

    });

}




// CREATE POST
postForm.addEventListener("submit",(e)=>{

  e.preventDefault();

  const title = document
    .getElementById("postTitle").value;

  const content = document
    .getElementById("postContent").value;

  const newPost = {

  title,
  content,
  image:selectedImage,
  author: loggedInUser.name,
  createdAt: new Date().toLocaleString(),
  comments: []

};

  posts.push(newPost);

  localStorage.setItem(
    "posts",
    JSON.stringify(posts)
  );

  postForm.reset();
imagePreview.style.display = "none";

selectedImage = "";
  showToast("Post Published!");
updateProfileStats();
  displayPosts();

});




// DELETE POST
function deletePost(index){

  posts.splice(index,1);

  localStorage.setItem(
    "posts",
    JSON.stringify(posts)
  );

  showToast("Post Deleted!");
updateProfileStats();
  displayPosts();

}




// EDIT POST
function editPost(index){

  const post = posts[index];

  const newTitle = prompt(
    "Edit Title",
    post.title
  );

  const newContent = prompt(
    "Edit Content",
    post.content
  );

  if(newTitle && newContent){

    posts[index].title = newTitle;

    posts[index].content = newContent;

    localStorage.setItem(
      "posts",
      JSON.stringify(posts)
    );

    showToast("Post Updated!");
updateProfileStats();
    displayPosts();

  }

}




// VIEW POST
function viewPost(index){

  localStorage.setItem(
    "currentPostIndex",
    index
  );

  window.location.href = "post.html";

}




// SEARCH POSTS
if(searchInput){

  searchInput.addEventListener("input",(e)=>{

    displayPosts(e.target.value);

  });

}

// LIKE POST
function likePost(index){

  if(!posts[index].likes){
    posts[index].likes = 0;
  }

  posts[index].likes++;

  localStorage.setItem(
    "posts",
    JSON.stringify(posts)
  );
updateProfileStats();
  displayPosts();

}



// SAVE POST
function savePost(index){

  let savedPosts = JSON.parse(
    localStorage.getItem("savedPosts")
  ) || [];

  savedPosts.push(posts[index]);

  localStorage.setItem(
    "savedPosts",
    JSON.stringify(savedPosts)
  );

  showToast("Post Saved!");

}
// UPDATE PROFILE STATS
function updateProfileStats(){

  totalPosts.innerText = posts.length;

  let likes = 0;

  posts.forEach(post=>{

    likes += post.likes || 0;

  });

  totalLikes.innerText = likes;

}

updateProfileStats();
displayPosts();