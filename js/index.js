"use strict"
function createTag ( tag, container=document.body){
	var elem = container.appendChild( document.createElement(tag))
	return elem
}
var div = createTag("div")
div.style = `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`
var input = createTag("input", div)
input.type ="number"
input.placeholder = "Enter hash"
input.onchange = function(event){
  document.location.hash = `#${Math.abs(event.target.value)}`
}
var h1 = createTag("h1", div)
var img = createTag("img", div)
localStorage.setItem(
  "history",
  JSON.stringify ([])
)
function changeStorage(){
  var elem = {
    pageId: document.location.hash,
    startTime: new Date().getTime()
  }
  var history = JSON.parse(localStorage["history"])
  history.push(elem)
  localStorage.setItem(
    "history",
    JSON.stringify ( history )
  )
}
window.onhashchange = function(event){
  changeStorage()
  chengeCont(document.location.hash)
}
function chengeCont(hash){
  var num = Number (hash.substr(1))
  fetch(`https://api.github.com/users?since=${num-1}`)
    .then (response => {
      response.json().then (res=>{
          fetch ( res[0].avatar_url )
            .then ( response => {
              response.blob().then ( response => {
                  var urlObject = URL.createObjectURL( response)
                  img.src = res[0].id === num ? urlObject : 'https://media.giphy.com/media/27ZeNo62Sgoak/giphy.gif'
                  h1.innerText = res[0].id === num ? res[0].login : "user removed"
              })
          })
       })
     })
}
