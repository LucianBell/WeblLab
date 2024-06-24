console.log("tá funcionando")

window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById('formSubmitBtn').addEventListener('click', function() {
        
        // Getting values from the form input
        const userName = document.getElementById('exampleInputName1');
        const userMail = document.getElementById('exampleFormControlEmail1');
        const userBday = document.getElementById('exampleFormControlDate');
        const userPhone = document.getElementById('exampleFormPhone');
        const userEvent = document.getElementById('exampleFormEvent');
        const userNumComp = document.getElementById('exampleFormCompanions');

        // Creating the feedback variables
        const feedbackName = document.getElementById('fdk-name');
        const feedbackEmail = document.getElementById('fdk-email');
        const feedbackBday = document.getElementById('fdk-bday');
        const feedbackPhone = document.getElementById('fdk-phone');
        const feedbackEvent = document.getElementById('fdk-event');
        const feedbackCompn = document.getElementById('fdk-companions');

        // Email regex used in the email verification
        let emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');

        // Verification name
        if (userName.value != '' && userName.value.length > 10) {
            feedbackName.classList.remove('null-class')
            feedbackName.classList.remove('bad-fdk')
            feedbackName.classList.add('okay-fdk')
        } else {
            feedbackName.classList.remove('null-class')
            feedbackName.classList.add('bad-fdk')          
            feedbackName.classList.remove('okay-fdk')  
        }
        
        // Verification email
        if (userMail.value != '' && emailRegex.test(userMail.value)) {
            feedbackEmail.classList.remove('null-class')
            feedbackEmail.classList.remove('bad-fdk')
            feedbackEmail.classList.add('okay-fdk')
        } else {
            feedbackEmail.classList.remove('null-class')
            feedbackEmail.classList.add('bad-fdk')          
            feedbackEmail.classList.remove('okay-fdk')  
        }

        // Verification birthday
        const bDayCheck = new Date(userBday.value)
        const currentDay = new Date();
        const usersAge = calculateAge(bDayCheck, currentDay)

        if (userBday.value != '' && usersAge >= 18) {
            feedbackBday.classList.remove('null-class')
            feedbackBday.classList.remove('bad-fdk')
            feedbackBday.classList.add('okay-fdk')
        } else {
            feedbackBday.classList.remove('null-class')
            feedbackBday.classList.add('bad-fdk')          
            feedbackBday.classList.remove('okay-fdk')  
        }

        // Verification phone
        let regexPhone = new RegExp('^[0-9]+$');

        if (userPhone.value == '' || (regexPhone.test(userPhone.value) && userPhone.value.length >= 11)) {
            feedbackPhone.classList.remove('null-class')
            feedbackPhone.classList.remove('bad-fdk')
            feedbackPhone.classList.add('okay-fdk')
        } else {
            feedbackPhone.classList.remove('null-class')
            feedbackPhone.classList.add('bad-fdk')          
            feedbackPhone.classList.remove('okay-fdk')  
        }
        
        // Verification event
        if (userEvent.value != 'Name of the event') {
            feedbackEvent.classList.remove('null-class')
            feedbackEvent.classList.remove('bad-fdk')
            feedbackEvent.classList.add('okay-fdk')
        } else {
            feedbackEvent.classList.remove('null-class')
            feedbackEvent.classList.add('bad-fdk')          
            feedbackEvent.classList.remove('okay-fdk')  
        }

        // Verification number of companions
        if (userNumComp.value >= 0 || userNumComp.value == '') {
            feedbackCompn.classList.remove('null-class')
            feedbackCompn.classList.remove('bad-fdk')
            feedbackCompn.classList.add('okay-fdk')
        } else {
            feedbackCompn.classList.remove('null-class')
            feedbackCompn.classList.add('bad-fdk')          
            feedbackCompn.classList.remove('okay-fdk')  
        }

        // Checking all elements to complete registration
        let isRegistered =  checkRegistration(feedbackName, feedbackEmail, feedbackBday, feedbackPhone, feedbackEvent, feedbackCompn)

        if (isRegistered) {
            window.location.replace('/success.html')
        }
    })
})


function calculateAge(birthdate, today) {
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDifference = today.getMonth() - birthdate.getMonth();
    const dayDifference = today.getDate() - birthdate.getDate();

    // If birth date hasn't occurred yet this year, subtract one from age
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }
    return age;
}

function checkRegistration(feedbackName, feedbackEmail, feedbackBday, feedbackPhone, feedbackEvent, feedbackCompn) {
    let isRegistered = false;

    if (feedbackName.classList.contains('okay-fdk') 
        && feedbackEmail.classList.contains('okay-fdk')
        && feedbackBday.classList.contains('okay-fdk')
        && feedbackPhone.classList.contains('okay-fdk')
        && feedbackEvent.classList.contains('okay-fdk')
        && feedbackCompn.classList.contains('okay-fdk')) {
            isRegistered = true;
    } else {
        isRegistered = false;
    }
    return isRegistered;
}
