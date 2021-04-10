function getdata() {
  fetch("https://kea2sem-5899.restdb.io/rest/posts?sort=date", {
    method: "GET",
    headers: {
      "x-apikey": "606d6e58f592f7113340ecc4",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      handlePosts(response);
    })
    .catch((err) => {
      console.error(err);
    });
}
getdata();
function handlePosts(post) {
  post.forEach(showPosts);
}

function showPosts(post) {
  if (post.approved == true) {
    console.log(post);
    //grab
    const template = document.querySelector("template.frontpagelist").content;
    //clone
    const copy = template.cloneNode(true);
    //content
    copy.querySelector("h2").textContent = post.title;
    copy.querySelector("h3 span").textContent = post.username;
    copy.querySelector("a.readmore").href = `article.html?article=${post._id}`;
    //append
    document.querySelector(".posts").appendChild(copy);
  }
}
