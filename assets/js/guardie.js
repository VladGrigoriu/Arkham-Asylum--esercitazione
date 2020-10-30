const buttonAggiungiGuardia = document.getElementById('buttonAggiungiGuardia')
const formGuardie = document.querySelector('#formGuardie');
const templateGuardie = document.getElementById('templateGuardie')
const insertGuardie = document.getElementById('insertListaGuardie')
const mostraGuardie = document.getElementById('buttonMostraGuardie')

// variabili form
const nomeGuardiaValue = document.getElementById('nomeGuardia');
const dataValue = document.getElementById('dataNascitaGuardia');
const competenzaValue = document.getElementById('competenza');
const totGuardie = document.getElementById('numGuardie')



const guardieArray = [];

const randomIdGuardie = (min,max) => {
  const random = Math.floor(Math.random()* (max - min) +min);
  return random;
}


function getNumberOfGuardie() {
  const num = guardieArray.length;
  return totGuardie.textContent = num
}
//





async function getGuardie() {

  const response = await fetch('../../guardie.json')
                                .then( (response ) => response.json())
      const array = response.map( guardie => {
        guardie.id = randomIdGuardie(1, 99);
        guardieArray.push(guardie)
        getNumberOfGuardie();
    })

   console.log(guardieArray);

}

getGuardie();



function handleAddGuardie (e) {
    e.preventDefault();


    if(e.submitter.id == "buttonAggiungiGuardia") {
        guardiaObj = {
            id: randomIdGuardie(1, 99),
            nome: nomeGuardiaValue.value,
            dataDiNascita: dataValue.value,
            livello: competenzaValue.value
        }
        guardieArray.push(guardiaObj)
        console.log(guardiaObj.data);
    }
    console.log(guardieArray.length);
    getNumberOfGuardie();
    showGuards();
}

function pulisciDiv2() {
  insertGuardie.innerHTML = "";
}

function showGuards (e) {
  pulisciDiv2()
    guardieArray.map( guardia => {
        const tmpDiv = document.importNode(templateGuardie.content, true);

        tmpDiv.querySelector('.nomeGuardieLista').textContent = guardia.nome;
        tmpDiv.querySelector('.nascitaGuardieLista').textContent += guardia.dataDiNascita;
        tmpDiv.querySelector('.esperienzaGuardieLista').textContent += guardia.livello;

        insertGuardie.appendChild(tmpDiv);
      })
}


mostraGuardie.addEventListener('click', showGuards);
formGuardie.addEventListener('submit', handleAddGuardie);
