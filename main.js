const modal = document.querySelector('.modal')
const payment = document.querySelector('.payment')
var moviePicked = document.getElementById('moviePicked') 
var movieName = document.getElementsByClassName('movie-name')
var paymentMovieName = document.getElementById('payment-header-left') 

function showVer() {
    modal.classList.add('open') 
}

function showPay() {
    payment.classList.add('open') 
}

function closeVer() {
    modal.classList.remove('open')
}

function showPic() {
    
}

document.querySelector('.modal-close').onclick = function() {
    closeVer(); 
}

const missingEmail = document.getElementById("email-input")
const missingTicket = document.getElementById("ticket-input")
document.querySelector('#checkVer').onclick = function() {
        document.querySelector('.modal-btn').onclick = function() {
            if(missingEmail.value !== "" && missingEmail.value.includes('@',0) && (missingTicket.value).trim() !== "") {
                showPay(); 
                closeVer(); 
                document.getElementById('total-price').value = document.getElementById('ticket-input').value*15   
                //
            }
            else if ((missingTicket.value).trim() == "" && missingEmail.value == "") {
                alert('Please type in both ticket number and email')
            }

            else if ((missingTicket.value).trim() == "" && missingEmail.value !== "") {
                alert('Please type in ticket number')
            }
            else if (missingEmail.value == "" && (missingTicket.value).trim() != "") {
                alert('Please fill in your email')
            }
            
        }
    }


// User Input 

const userAcc = document.querySelector('.account')
const newAcc = document.querySelector('.new-account') 

document.getElementById('sign-up-opt').onclick = function() {
    newAcc.classList.add('open')
    userAcc.classList.add('close') 
}

document.getElementById('sign-in-opt').onclick = function() {
    userAcc.classList.remove('close')
    newAcc.classList.remove('open') 
}

document.getElementById('sign-up').onclick = function(){
    let user = document.getElementById('new-user').value
    let pw = document.getElementById('new-pw').value 
    let pwConfirm = document.getElementById('new-pw-confirm').value
    if (user == "" || pw =="" || pwConfirm =="") {
        alert('Please enter all the fields')
    }
    else if (pw !== pwConfirm) {
        alert('Password do not match!')
    }
    else {
       setCookie(user,pw,365) 
       window.location.reload()
    }
}

document.getElementById('login').onclick = function(){
    let user = document.getElementById('used-user').value
    let pw = document.getElementById('used-pw').value 
    if(user == getCookieAcc(pw) && pw == getCookiePW(user)) {
        userAcc.classList.add('close') 
    }
    else {
        alert('Incorrect password or username')
    }  
}

document.getElementById('guess-login').onclick = function() {
    userAcc.classList.add('close')
    document.getElementById('user').textContent = "Guest" 
}

function setCookie(user,pw,time){ 
    let d = new Date() 
    d.setTime(d.getTime() + (time*24*60*60*1000))
    let expires = 'expires=' + d.toUTCString() 
    document.cookie=user+"="+pw+";"+expires+"; path='/'" 
}


//get password 
function getCookiePW(cookieUser) {
    const cookieString = decodeURIComponent(document.cookie) 
    const cookies = cookieString.split(';') 
    for (let i = 0; i<cookies.length; i++) {
        const cookie = cookies[i].trim() 
        if (cookie.startsWith(cookieUser+"=")) {
            const password = cookie.substring(cookieUser.length +1) 
            return password 
        }
    }
    return null 
}
//get username
function getCookieAcc(cookiePW) {
    const cookieString = decodeURIComponent(document.cookie) 
    const cookies = cookieString.split(';') 
    for (let i = 0; i<cookies.length; i++) {
        const cookie = cookies[i].trim() 
        if (cookie.endsWith(cookiePW)) {
            const username = cookie.substring(0, (cookie.length - cookiePW.length -1)) 
            return username
        }
    }
    return null 
}


// Moive API database 

const url = 'https://online-movie-database.p.rapidapi.com/auto-complete?q=game%20of%20thr';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cf4f553115msh2cf07099dea7be5p1f955cjsn1b02f3a45870',
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
};

const movieListContainer = document.getElementById('body-movie-list')

let context = ""; 

fetch(url,options)
.then(response => response.json()) 
.then(data => {
    console.log(data) 
    for(var x = 0; x<data.d.length; x++) {
        if (x == 4) {
            const imageURL = data.d[2].i.imageUrl
        }
        else {
            imageURL = data.d[x].i.imageUrl;
        }
        const genre = data.d[x].s;
        const name = data.d[x].l; 
        // add movie tickets attribute 
        data.d.forEach(movie => {
            movie.tickets = 100; 
        })
        context += `<div class="body-movie-item">
              <img class="img" src="${imageURL}" alt="">
              <p class="movie-desc genre">${genre}</p> 
              <p class="movie-desc movie-name">${name}</p>
              <p class="movie-desc showing-time-option"> <i class="ti-timer"></i> VIEWING TIMES</p>
              <p class="movie-desc showing-time">11:00PM</p> 
           </div>
           `;  
        }
        movieListContainer.innerHTML = context 

        function pickMovie(movieNumber) {
            return function() {
                paymentMovieName.innerHTML = data.d[movieNumber].l 
                moviePicked.src = data.d[movieNumber].i.imageUrl
            }
        }
        var imgBtns = document.getElementsByClassName('img')
        for (var i = 0; i < imgBtns.length; i++) {
            imgBtns[i].addEventListener('click',showVer)
            imgBtns[i].addEventListener('click',pickMovie(i))
          }

    }
)
























  




















