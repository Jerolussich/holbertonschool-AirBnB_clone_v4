window.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const amenities_h4 = document.querySelector('.amenities h4')


    let amenities_list = []

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {

            if (e.target.checked === true) {
                amenities_list.push(checkbox.getAttribute('data-name'))
            }
            else {
                amenities_list.forEach((name, idx) => {

                    if (name === checkbox.getAttribute('data-name')) {
                        amenities_list.splice(idx, 1)
                    }
                });
            }
            amenities_h4.innerHTML = amenities_list
        })
    })

    fetch('http://127.0.0.1:5001/api/v1/status/')
        .then(r => r.json())
        .then(data => {

            const api_status = document.querySelector('#api_status')
            if (data.status === 'OK') {
                api_status.classList.add('available')
            }
            else {
                api_status.classList.remove('available')
            }
    })})

    fetch('http://localhost:5001/api/v1/places_search/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})})

    .then(r => r.json())
    .then(data => {
    

        const data_saved = data
        console.log(data_saved)
        //creates section and article
        const section = document.querySelector('.places')
        const article = document.createElement('article')
        section.appendChild(article)

        data_saved.forEach(place => { 

        //creates div.title_box
        const div_title_box = document.createElement('div')
        div_title_box.classList.add('title_box')

        //create h2 with data
        const h2_place_name = document.createElement('h2')
        h2_place_name.innerHTML = place.name

        //append elements
        article.appendChild(div_title_box)
        div_title_box.appendChild(h2_place_name)
        
        //create div.price_by_night
        const div_price_by_night = document.createElement('div')
        div_price_by_night.classList.add('price_by_night')
        div_price_by_night.innerHTML = place.price_by_night

        //create div.information
        const div_information = document.createElement('div')
        div_information.classList.add('information')


        article.appendChild(div_information)

        //create div.max_guest and add content
        const div_max_guest = document.createElement('div')
        div_max_guest.classList.add('max_guest')
        div_max_guest.innerHTML = place.max_guest

        div_information.appendChild(div_max_guest)

        //create div.number_rooms and add content
        const div_number_rooms = document.createElement('div')
        div_number_rooms.classList.add('number_rooms')
        div_number_rooms.innerHTML = place.number_rooms
        
        div_information.appendChild(div_number_rooms)

        //create div.number_bathrooms and add content
        const div_number_bathrooms = document.createElement('div')
        div_number_bathrooms.classList.add('number_bathrooms')
        div_number_bathrooms.innerHTML = place.number_bathrooms

        div_information.appendChild(div_number_bathrooms)

        //create div.user and add content
        const div_user = document.createElement('div')
        div_user.classList.add('user')
        div_user.innerHTML = 'Owner:'

        article.appendChild(div_user)

        //create div.description and add content
        const div_description = document.createElement('div')
        div_description.classList.add('description')
        div_description.innerHTML = `Description: ${place.description}`

        article.appendChild(div_description)

        })
    })
