const form= document.querySelector("form")
//console.log(form.elements);
form.elements.username.focus();
/*form.elements.title.addEventListener("blur",()=>
{
    form.elements.title.value="";
})*/

form.addEventListener("submit", e=>{
    e.preventDefault()
    console.log(form.elements.username.value);
    console.log(form.elements.title.value);
    console.log(form.elements.content.value);

    const payload={
        date:Date.now(),
        title:form.elements.title.value,
        username:form.elements.username.value,
        content:form.elements.content.value,
    }
    document.querySelector("button[type=submit]").disabled=true;



fetch("https://kea2sem-5899.restdb.io/rest/posts", {
  method: "POST",
  headers: {
    "x-apikey": "606d6e58f592f7113340ecc4",
    "Content-Type": "application/json"
  },
  body: 
  JSON.stringify(payload)
})
.then(response => {
  console.log(response);
  document.querySelector("button[type=submit]").disabled=false;
    form.elements.username.value = ""
    form.elements.title.value = ""
    form.elements.content.value = ""
    document.querySelector("#message").classList.add("animate");

})
.catch(err => {
  console.error(err);
});
})