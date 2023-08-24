console.log('Welcome to Weather App')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()
    // prevents default behaviour, that is prevents reloading the page after submitting the form

    let address = search.value

    let url = `http://localhost:3000/weather?address=${encodeURIComponent(address)}`

    console.log(`fetching data from URL: ${url}`)
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            console.log(data)

            if (data.error) {
                messageOne.textContent = data.error
                return console.log(data.error)
            }

            messageOne.textContent = data.location
            messageTwo.textContent = data.message
            console.log(data.location)
            console.log(data.message)
        })
    })

})