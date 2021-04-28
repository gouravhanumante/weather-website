

console.log('This is client side JavaScript')

// fetch('https://puzzle.mead.io/puzzle').then((response)=>{
// response.json().then((data)=>{
//     console.log(data)
// })
// })


// fetch('http://localhost:3000/weather?address=seoni').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {

//             console.log(data)
//         }
//     })
// })


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')

const messageOne=document.querySelector('#para1')
const messageTwo=document.querySelector('#para2')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    let location=search.value
    messageOne.textContent = "Loading"
    console.log(location)
    
    if (location.length===0) {
        return console.log('Enter The Location')
    }
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
        if (data.error) {
            messageOne.textContent=data.error
            messageTwo.textContent=''
            
        } else {
            
            messageOne.textContent=''
            messageTwo.textContent=data.forecast    
        }
    })
})
})
