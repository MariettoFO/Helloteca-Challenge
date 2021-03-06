// Funtion GET data and fill the form
function getData(){
    try {
        const parameter = window.location.search

        const request = new XMLHttpRequest ()

        if(parameter.substr(0, 4) === '?id=' && (parameter.substr(4) === '1' || parameter.substr(4) === '2')){

            request.open('GET', `https://api7.cloudframework.io/recruitment/fullstack/users?id=${parameter.substr(4)}`)
            request.setRequestHeader('X-WEB-KEY', 'Development')
            request.send()
            request.onload = () => {
                if (request.status === 200) {

                //future dates
                    var today = new Date();
                    today = new Date(today.setDate(today.getDate() + 1)).toISOString().split('T')[0];
                    document.getElementById('loan_date').setAttribute('min', today);

                // Extracting data
                    var data = JSON.parse(request.response)
                    document.getElementById('name').value = data.data.name
                    document.getElementById('surname').value = data.data.surname
                    document.getElementById('email').value = data.data.email
                    document.getElementById('phone').value = data.data.phone
                    document.getElementById('age').value = data.data.age

                } else {
                    location.href = "404.html"
                }
            }

            request.onerror = () => {
                location.href = "404.html"
            }

        } else {
            location.href = "404.html"
        }
    } catch(error) {
        location.href = "404.html"
    }
}

// launch getData when window load first time
window.onload = getData

// POST data once fields are filled
function postData(){
    const parameter = window.location.search

    const post = {
        "id": parseInt(parameter.substr(4)),
        "name": document.getElementById('name').value,
        "surname": document.getElementById('surname').value,
        "email": document.getElementById('email').value,
        "phone": document.getElementById('phone').value.toString(),
        "age": document.getElementById('age').value,
        "loan_amount": document.getElementById('loan_amount').value,
        "loan_date": document.getElementById('loan_date').value,
        "loan_weeks": document.getElementById('loan_weeks').value,
        "check": document.getElementById('check').checked
    }

    fetch(`https://api7.cloudframework.io/recruitment/fullstack/users/${parameter.substr(4)}`, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'X-WEB-KEY': 'Development'
        }
    }).then( res => res.json()).then(data => {
            if (data.status === 400) {
                location.href = "400.html"
            } else if (data.status === 404) {
                location.href = "404.html"
            } else {
                location.href = "contact.html"
            }
        }
    )}


// Validation functions
function validatePhone(){
    let phone = document.getElementById('phone')

    // if phone is biger than 0 or phone has more than 7 numbers
    if(parseInt(phone.value) >= 0 && phone.value.length > 7) {
        phone.title = ""
        phone.classList.add("is-valid")
        phone.classList.remove("is-invalid")
    } else {
        phone.title = "This field can't be empty or the length is incorrect"
        phone.classList.add("is-invalid")
        phone.classList.remove("is-valid")
    }

    return phone.title
}

function validateAge(){
    let age = document.getElementById('age')

    // if age is bigger than 0 (positive number)
    if(parseInt(age.value) >= 0) {
        age.title = ""
        age.classList.add("is-valid")
        age.classList.remove("is-invalid")
    } else {
        age.title = "This field can't be empty"
        age.classList.add("is-invalid")
        age.classList.remove("is-valid")
    }

    return age.title
}

function validateLoanAmount(){
    let loanAmount = document.getElementById('loan_amount')

    // if 10<number<1000
    if(parseFloat(loanAmount.value) > 10 && parseFloat(loanAmount.value) <= 1000) {
        loanAmount.title = ""
        loanAmount.classList.add("is-valid")
        loanAmount.classList.remove("is-invalid")
    } else {
        loanAmount.title = "The value must be bigger than 10 and less than or equal to 1000"
        loanAmount.classList.add("is-invalid")
        loanAmount.classList.remove("is-valid")
    }

    return loanAmount.title
}

function validateCheck(){
    let check = document.getElementById('check')

    // terms checked
    if(check.checked) {
        check.classList.add("is-valid")
        check.classList.remove("is-invalid")
    } else {
        check.classList.add("is-invalid")
        check.classList.remove("is-valid")
    }

    return check.checked
}

function validateLoanWeeks(){
    let loanWeeks = document.getElementById('loan_weeks')

    // change value if it isn't in the correct range
    if(parseInt(loanWeeks.value) < 1) {
        loanWeeks.value = 1
        loanWeeks.classList.add("is-valid")
        loanWeeks.classList.remove("is-invalid")
        loanWeeks.title = ""
    } else if (parseInt(loanWeeks.value) > 20) {
        loanWeeks.value = 20
        loanWeeks.classList.add("is-valid")
        loanWeeks.classList.remove("is-invalid")
        loanWeeks.title = ""
    } else if (loanWeeks.value === ""){
        loanWeeks.classList.add("is-invalid")
        loanWeeks.classList.remove("is-valid")
        loanWeeks.title = "This field can't be empty"
    } else {
        loanWeeks.classList.add("is-valid")
        loanWeeks.classList.remove("is-invalid")
        loanWeeks.title = ""
    }

    return loanWeeks.title
}


// Button send data
function clickSend(){
    if(validatePhone().length > 0 || validateAge().length > 0 || validateLoanAmount().length > 0 || validateLoanWeeks().length > 0 || validateCheck() === false) {
        location.href = "400.html"
    } else {
        postData()
    }
}