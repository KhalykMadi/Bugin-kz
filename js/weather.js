const COORDS_LS = 'coords'
const API_KEYS = '7a7ca987f57edf8c737cea86af98289e'

const weatherContainer = document.querySelector('.js-weather')

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEYS}&units=metric`)
    .then(function(responce){
        return responce.json()
    })
    .then(function(json){
        let temperature = json.main.temp
        temperature = Math.round(temperature)
        console.log(json)
        weatherContainer.innerText = `${temperature > 0 ? `+${temperature}º` : `-${temperature}º`}`
    })
}

function saveCords(positionObj){
    localStorage.setItem(COORDS_LS, JSON.stringify(positionObj))
}

function succsessCord(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude
    const positionObj = {
        latitude,
        longitude
    } 
    saveCords(positionObj)
    getWeather(latitude, longitude)
}

function ErrorCord(){
    console.log('Error')
}

function newCoords(){
    navigator.geolocation.getCurrentPosition(succsessCord, ErrorCord)
}

function LoadWeather(){
    const coords = localStorage.getItem(COORDS_LS)
    if(coords === null){
        newCoords()
    } else{
        const loaedCoords = JSON.parse(coords)
        console.log(loaedCoords)
        getWeather(loaedCoords.latitude, loaedCoords.longitude)
    }
}

function init(){
    LoadWeather()
}
init()

let popUp = document.querySelector('.pop-up')

document.querySelector(".new-note")
.addEventListener('click', function(){
popUp.style.display = "flex"
})

document.querySelector(".profile")
.addEventListener('click', function(){
popUp.style.display = "flex"
})

document.querySelector('.pop-up')
.addEventListener('click', function(){
popUp.style.display = "none"
})