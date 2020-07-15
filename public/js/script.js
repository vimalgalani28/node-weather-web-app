const form = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
form.addEventListener('submit' , (event) => {
    event.preventDefault()
    const location = search.value
    messageOne.textContent = "Loading ..."
    messageTwo.textContent = ""
    fetch("http://localhost:3000/weather?search="+encodeURIComponent(location)).then((response) => {
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
            messageTwo.textContent =""
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})