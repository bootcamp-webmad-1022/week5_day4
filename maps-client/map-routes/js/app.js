const ironhack = {
    coords: { lat: 41.39770923787243, lng: 2.1904346252331703 },
    title: 'Ironhack BCN'
}

let myMap

function init() {
    renderMap()
    getRouteDetails()
}


function getRouteDetails() {

    const routeDetails = { origin: ironhack.coords, destination: 'Fabrik Madrid', travelMode: 'DRIVING' }

    const service = new google.maps.DirectionsService()

    service.route(
        routeDetails,
        routeResult => {
            printDetails(routeResult)
            drawRoute(routeResult)
        }
    )
}


function drawRoute(route) {
    const renderer = new google.maps.DirectionsRenderer()
    renderer.setDirections(route)
    renderer.setMap(myMap)
}


function printDetails({ routes }) {

    const currentRoute = routes[0].legs[0]
    const { distance, duration, steps } = currentRoute

    let code = `<h2>Ruta de ${distance.text} y ${duration.text}</h2><hr>`

    steps.forEach(({ instructions, duration }) => code += `<p>${instructions} (${duration.text})</p>`)

    document.querySelector('#routeDetails').innerHTML += code
}


function renderMap() {

    myMap = new google.maps.Map(
        document.querySelector('#map'),
        { zoom: 6, center: ironhack.coords, styles: mapStyles.retro }
    )
}