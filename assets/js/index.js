const showLogin = document.getElementById('headerLoginButton')
const loginBtn = document.getElementById('buttonLogin');
const divStatoBtn = document.getElementById('headerStatoButton');
const divPrigionieriBtn = document.getElementById('headerPrigionieriButton');
const divGuardieBtn = document.getElementById('headerGuardieButton');
const loginModalContainer = document.getElementById('loginModalContainer');
const mainIndex = document.getElementById('mainIndex');
// const mainStato = document.getElementById('mainStato');
const mainPrigionieri = document.querySelector('.mainPrigionieri');
const mainGuardie = document.querySelector('.mainGuardie');
const divControlBtns = document.querySelector('.controlBtns');

const hideLoginModal = (e) => {
    e.preventDefault();
    loginModalContainer.style.display = 'none';
    showLogin.style.display = 'none';
    mainIndex.style.display = 'flex';
    divControlBtns.style.display = 'flex'
}

const showLoginModal = (e) => {
    // console.log(e)
    e.preventDefault();
    showLogin.style.display = 'none';
    loginModalContainer.style.display = 'flex';
    mainIndex.style.display = 'none';
    divControlBtns.style.display = 'none'
}

const showPrigionieriDiv = (e) => {
    // console.log(e)
    e.preventDefault();
    showLogin.style.display = 'none';
    mainIndex.style.display = 'none';
    mainGuardie.style.display = 'none';
    mainPrigionieri.style.display = 'flex';
}


const showGuardieDiv = (e) => {
    // console.log(e)
    e.preventDefault();
    showLogin.style.display = 'none';
    mainIndex.style.display = 'none';
    mainGuardie.style.display = 'flex';
    mainPrigionieri.style.display = 'none';
}

const showStatoDiv = (e) => {
    e.preventDefault();
    showLogin.style.display = 'none';
    mainIndex.style.display = 'flex';
    mainGuardie.style.display = 'none';
    mainPrigionieri.style.display = 'none';
}


divStatoBtn.addEventListener('click', showStatoDiv);
divPrigionieriBtn.addEventListener('click', showPrigionieriDiv);
divGuardieBtn.addEventListener('click', showGuardieDiv);
showLogin.addEventListener('click', showLoginModal);
loginBtn.addEventListener('click', hideLoginModal);
