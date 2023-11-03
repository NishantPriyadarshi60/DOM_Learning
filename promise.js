
function createPost(post) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Post created: ${post}`);
        resolve(post);
      }, 1000); 
    });
  }
  

  function updateLastUserActivityTime(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lastActivityTime = new Date().toISOString();
        console.log(`Last activity time updated for user ${userId}: ${lastActivityTime}`);
        resolve(lastActivityTime);
      }, 1000);
    });
  }
  

  function deletePost(postId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Post deleted: ${postId}`);
        resolve(postId);
      }, 1000); 
    });
  }
  
  
  const userId = 1;
  const posts = [];
  

  createPost("New post content")
    .then((post) => {
      posts.push(post);
      return updateLastUserActivityTime(userId);
    })
    .then((lastActivityTime) => {
      console.log(`Last Activity Time: ${lastActivityTime}`);
      console.log("All Posts:", posts);
  
   
      return deletePost(posts.pop());
    })
    .then((deletedPost) => {
      console.log(`Post Deleted: ${deletedPost}`);
      console.log("Remaining Posts:", posts);
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
  