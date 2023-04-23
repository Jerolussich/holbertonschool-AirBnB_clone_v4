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
