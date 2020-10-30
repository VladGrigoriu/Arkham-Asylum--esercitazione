const nomeValue = document.getElementById('nomePrigioniero');
const razzaValue = document.getElementById('razzaPrigioniero');
const coloreOcchiValue = document.getElementById('coloreOcchi');
const coloreCapelliValue = document.getElementById('coloreCapelli');
const altezzaValue = document.getElementById('altezzaPrigioniero');
const pesoValue = document.getElementById('pesoPrigioniero');
const dataNascitaValue = document.getElementById('dataNascita');
const livelloPericoloValue = document.getElementById('livelloPericolo');
const buttonAggiungiPrigioniero = document.getElementById('buttonAggiungiPrigioniero')
const formPrigionieri = document.querySelector('#formPrigionieri');
const templatePrigionieri = document.getElementById('templatePrigioniero')
const insertPrigionieri = document.getElementById('insertListaPrigionieri')
const mostraPrigionieri = document.getElementById('buttonMostraPrigioniero')
const formModificaStato = document.getElementById('formModificaStato');


const riferimentoVivi = document.getElementById('numPrigionieriVivi');
const riferimentoMorti = document.getElementById('numPrigionieriMorti');
const riferimentoScappati = document.getElementById('numPrigionieriScappati');



const idPrigionieroStatoValue = document.getElementById('idPrigionieroStato');
const statoPrigionieroValue = document.getElementById('vivo-morto');

const divFascicolo = document.querySelector('.fascicoli');

const formFascicolo = document.getElementById('formFascicolo')

const prigionieroArray = [];
const fascicoliArray = [];
const idFascicoloValue = document.getElementById('idPrigionieroFascicolo');
const carcerazioneValue = document.getElementById('carcerazioneFascicolo');
const scarcerazioneValue = document.getElementById('scarcerazioneFascicolo');
const reatoValue = document.getElementById('reatoCommesso');

const totPrigionieri = document.getElementById('numPrigionieri')

const inputPrigionieri = document.getElementById('inputPrigionieri');




const randomId = (min,max) => {
  const random = Math.floor(Math.random()* (max - min) +min);
  return random;
}




async function getPrigionieri() {

  const response = await fetch("https://denebvoice.com/api_gotham/gothamCity.json")
                                .then( (response ) => response.json())
      const array = response.map( prisoner => {
        prisoner.state = "Vivo";
        prisoner.id = randomId(1, 999);
        prigionieroArray.push(prisoner)
        getNumberOfPrigionieri();
        contaStatoPrigionieri();
    })

  // console.log(prigionieroArray);

}

getPrigionieri()

// console.log(totPrigionieri)

function getNumberOfPrigionieri () {
  const num = prigionieroArray.length;
  // console.log(totPrigionieri)
  totPrigionieri.textContent = num;
  return totPrigionieri
}



function handleAddPrigionieri (e) {
  e.preventDefault();

  if(e.submitter.id == "buttonAggiungiPrigioniero") {

    prigionieriObj = {
      id: randomId(1,99),
      nomePersonaggio: nomeValue.value,
      razza: razzaValue.value,
      caratteristicheFisiche: {
        coloreOcchi: coloreOcchiValue.value,
        coloreCapelli: coloreCapelliValue.value,
        altezza: altezzaValue.value,
        peso: pesoValue.value
      },
      livelloDiPericolo: livelloPericoloValue.value
    }


    // effettuo il push dell'oggetto
    prigionieroArray.push(prigionieriObj);
    console.log(prigionieroArray)
    // invoco la funzione per renderizzare in HTML l'oggetto
    // passo l'oggetto come parametro
    // renderCourse(courseObj);
    // // invoco la funzione per aggiornare la mia interfaccia
    // ui();
    
  }
  getNumberOfPrigionieri();
  showPrisoners();

}


function showPrisoners(e) {
  pulisciDiv()

  prigionieroArray.map( prigioniero => {
    const tmpDiv = document.importNode(templatePrigionieri.content, true);


    tmpDiv.querySelector('.nomePrigionieroLista').textContent = prigioniero.nomePersonaggio;
    tmpDiv.querySelector('.razzaPrigionieroLista').textContent += prigioniero.razza;
    tmpDiv.querySelector('.idPrigionieroLista').textContent += prigioniero.id;

    tmpDiv.querySelector('.coloreOcchiPrigionieroLista').textContent += prigioniero.caratteristicheFisiche.coloreOcchi;
    tmpDiv.querySelector('.coloreCapelliPrigionieroLista').textContent += prigioniero.caratteristicheFisiche.coloreCapelli;
    tmpDiv.querySelector('.pesoPrigionieroLista').textContent += prigioniero.caratteristicheFisiche.peso + 'kg';
    tmpDiv.querySelector('.altezzaPrigionieroLista').textContent += prigioniero.caratteristicheFisiche.altezza + 'cm';
    tmpDiv.querySelector('.pericoloPrigionieroLista').textContent += prigioniero.livelloDiPericolo;

    if (prigioniero.state == "Vivo") {
      tmpDiv.querySelector('.statoPrigioniero').textContent += "vivo";
    } else if (prigioniero.state == "Morto") {
      tmpDiv.querySelector('.statoPrigioniero').textContent += "morto";
    } else {
      tmpDiv.querySelector('.statoPrigioniero').textContent += "scappato";
    }


    fascicoliArray.map( fascicolo => {
      if (prigioniero.id == fascicolo.id) {
        // console.log('ciao')
        const fascicoloBtn = document.createElement('button');
        fascicoloBtn.textContent = 'Fascicolo';
        fascicoloBtn.setAttribute('data-id', prigioniero.id);
        // console.log(fascicoloBtn);
        tmpDiv.querySelector('.singoloPrigioniero').appendChild(fascicoloBtn);
      }
    })


    insertPrigionieri.appendChild(tmpDiv);
  })

}

function pulisciDiv() {
  insertPrigionieri.innerHTML = "";
}

function handleShowFascicolo(e) {
  // show section class fascicolo

  divFascicolo.style.display = 'block';
  const idCard = e.target.dataset.id

  const singlePrig = prigionieroArray.find( x => x.id == +idCard)
  const singleFasc = fascicoliArray.find( x => x.id == +idCard);

  divFascicolo.querySelector('h2').textContent = "Fascicolo di " + singlePrig.nomePersonaggio;
  console.log(singlePrig);

  divFascicolo.querySelector('.dataCarcerazione').textContent = "Data Carcerazione: " + singleFasc.dataCarcerazione;
  divFascicolo.querySelector('.dataScarcerazione').textContent = "Data Scarcerazione: " + singleFasc.dataScarcerazione;
  divFascicolo.querySelector('.reatoCommesso').textContent = "Reato commesso: " + singleFasc.reato;

}


function handleAddFascicolo (e) {

  e.preventDefault();

  if(e.submitter.id === "buttonAggiungiFascicolo"){
    fascicoloObj = {
      id: idFascicoloValue.value,
      dataCarcerazione: carcerazioneValue.value,
      dataScarcerazione: scarcerazioneValue.value,
      reato: reatoValue.value
    }
    const find = fascicoliArray.find( x => x.id == +fascicoloObj.id)
    const idFind = fascicoliArray.indexOf(find);
    if (find == undefined) {
      fascicoliArray.push(fascicoloObj)
    }else {
      fascicoliArray[idFind] = fascicoloObj;
    }
    
    console.log(fascicoliArray);
  }

  showPrisoners();
}



function filterPrigionieri(e) {
  // creare le constanti interne
  // term è il termine che viene inserito nella input e deve essere minuscolo
  const term = e.target.value.toLowerCase();

  // lista dove sono presenti gli elementi
  const list = document.getElementById('insertListaPrigionieri');

  // task si riferisce al singolo elemento
  const tasks = document.getElementsByClassName('singoloPrigioniero');

  // trasformo la mia collezione <div> html in array e lo ciclo in forEach

  // for (i = 0; i < tasks.length; i++) {

  //   let title = tasks[i].querySelector('.insertListaPrigionieri .nomePrigionieroLista')
  //   title.innerText.toLowerCase().indexOf(term) > -1 ? tasks[i].style.display = 'block' : tasks[i].style.display = 'none';

  // }

  Array.from(tasks).forEach( task => {
    // crea una variabile per identificare l'emento interno a task
    let title = task.querySelector('.insertListaPrigionieri .nomePrigionieroLista')

    //controllo se il valore è maggiore di -1
    title.textContent.toLowerCase().indexOf(term) > -1 ? task.style.display = 'block' : task.style.display = 'none';
  })


}


function modificaStato(e) {
  e.preventDefault();

  
  if(e.submitter.id == "buttonCambiaStato") {


    // const idPrigionieroStatoValue = document.getElementById('idPrigionieroStato');
    // const statoPrigionieroValue = document.getElementById('vivo-morto');

    const singlePrig = prigionieroArray.find( x => x.id == +idPrigionieroStatoValue.value)
    console.log(singlePrig);
    singlePrig.state = statoPrigionieroValue.value;



    
    console.log(singlePrig);
    // fascicoloObj = {
    //   id: idFascicoloValue.value,
    //   dataCarcerazione: carcerazioneValue.value,
    //   dataScarcerazione: scarcerazioneValue.value,
    //   reato: reatoValue.value
    // }
  }
  contaStatoPrigionieri();
  showPrisoners();
}

function contaStatoPrigionieri() {
  let contVivo = 0;
  let contMorto = 0;
  let contScappato = 0;

  prigionieroArray.map( prigioniero => {
    if(prigioniero.state === "Vivo"){
      contVivo++;
  
    }else if(prigioniero.state === "Morto"){
      contMorto++;
    }else if(prigioniero.state === "Scappato"){
      contScappato++;
    }
  })

  
 riferimentoVivi.textContent = contVivo;
 riferimentoMorti.textContent = contMorto;
 riferimentoScappati.textContent = contScappato;


  // console.log(contVivo)
  // console.log(contMorto)
  // console.log(contScappato)
  
}


//console.log(formPrigionieri);
mostraPrigionieri.addEventListener('click', showPrisoners);
formPrigionieri.addEventListener('submit', handleAddPrigionieri);
inputPrigionieri.addEventListener('keyup', filterPrigionieri);

//buttonAggiungiFascicolo.addEventListener('submit',handleAddFascicolo)
formModificaStato.addEventListener('submit', modificaStato);
formFascicolo.addEventListener('submit',handleAddFascicolo);
insertPrigionieri.addEventListener('click', handleShowFascicolo)
