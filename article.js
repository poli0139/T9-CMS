const urlParams = new URLSearchParams(window.location.search);

const articleId = urlParams.get("article");

fetch(
    "https://kea2sem-5899.restdb.io/rest/posts/"+articleId, 
    {
  method: "GET",
  headers: {
    "x-apikey": "606d6e58f592f7113340ecc4"
  }
})
.then((res)=>res.json())
.then(response => {
    showPost(response);
})
.catch(err => {
  console.error(err);
});

fetch(
    "https://kea2sem-5899.restdb.io/rest/posts/"+articleId + "/comments?max=2", 
    {
  method: "GET",
  headers: {
    "x-apikey": "606d6e58f592f7113340ecc4"
  }
})
.then((res)=>res.json())
.then(response => {
    showComments(response);
})
.catch(err => {
  console.error(err);
});
function showPost(data){
    console.log(data);
    document.querySelector("h2").textContent=data.title;
    document.querySelector("h3 span").textContent=data.username;
    document.querySelector("p").textContent=data.content;
}

function showComments(comments){
    //data.comments 
    //grab the template
    const template = document.querySelector (".single-comment-template").content;
    //loop through data.comments 
    comments.forEach(comment=>{
        console.log(comment);
        const copy = template.cloneNode(true);
        copy.querySelector("h3 span").textContent=comment.username;
        copy.querySelector(".text h2").textContent=comment.content;
        document.querySelector(".comments-sec").appendChild(copy);
    });
        if (comments.length==0){
            const copy = template.cloneNode(true);
            copy.querySelector("h3").textContent="";
            copy.querySelector(".text h2").textContent="There are no comments yet. Be the fist!";
            document.querySelector(".comments-sec").appendChild(copy)
        }
}

const form = document.querySelector(".leave-comment");
//event listener
form.addEventListener("submit", handleSubmit);

function handleSubmit(e){
    e.preventDefault();
    const payload={
    date:Date.now(),
    username:form.elements.username.value,
    content:form.elements.content.value,
    }
    document.querySelector("button[type=submit]").disabled=true;

    console.log(payload);
    fetch(`https://kea2sem-5899.restdb.io/rest/posts/${articleId}/comments`, {
  method: "POST",
  headers: {
    "x-apikey": "606d6e58f592f7113340ecc4",
    "Content-Type": "application/json"
  },
  body: 
  JSON.stringify(payload),
})
.then(res=>res.json())
.then(data=>{
    
    const template = document.querySelector (".single-comment-template").content;
    const copy = template.cloneNode(true);
    copy.querySelector("h3 span").textContent=data.username;
    copy.querySelector(".text h2").textContent=data.content;
    document.querySelector(".comments-sec").appendChild(copy);
    form.elements.username.value = ""
    form.elements.content.value = ""
    document.querySelector(".single-comment").remove();
})
}
