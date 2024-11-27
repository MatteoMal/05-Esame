//Codice per mostrare la password all'utente mentre la inserisce tramite l'icona dell'occhio
var passwordField = document.getElementById("password");
var togglePassword = document.querySelector("#span-1 i");
togglePassword.addEventListener("click", function () {
    if (passwordField.type === "password") {
        passwordField.type = "text";
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");
    }
    else {
        passwordField.type = "password";
        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");
    }
});
var passwordField2 = document.getElementById("confermaPassword");
var togglePassword2 = document.querySelector("#span-2 i");
togglePassword2.addEventListener("click", function () {
    if (passwordField2.type === "password") {
        passwordField2.type = "text";
        togglePassword2.classList.remove("fa-eye");
        togglePassword2.classList.add("fa-eye-slash");
    }
    else {
        passwordField2.type = "password";
        togglePassword2.classList.remove("fa-eye-slash");
        togglePassword2.classList.add("fa-eye");
    }
});
/*
Creo delle funzioni che mi torneranno utili in diversi modi:
  - la funzione passwordRobusta() effettuerà un controllo sulla sicurezza della password che l'utente inserirà, stampandone a video la percentuale
  - la funzione sessoInput() trasformerà la stringa "Maschio" o "Femmina" in un numero in base al sesso inserito dall'utente, così da rispettare i parametri del database e delle API
*/
function passwordRobusta(password) {
    var x = 0;
    var arrRegExp = [/^.[8,20]$/, /[0-9]/, /[a-z]/, /[A-Z]/, /[$-/:-?{-~!"^_`\[\]]/];
    var numeroControlli = arrRegExp.length;
    var incremento = 100 / numeroControlli;
    password = password.trim();
    //Controllo se ci sono spazi
    var check = /\s\S/;
    if (check.test(password)) {
        x = 0;
    }
    else {
        //Ciclo i controlli RegExp
        for (var i = 0; i < numeroControlli; i++) {
            check = arrRegExp[i];
            if (check.test(password)) {
                x = x + incremento;
            }
        }
    }
    return x;
}
//Stampo un alert che comunicherà all'utente la sicurezza della sua password
var button = document.getElementById("bottone2");
button.addEventListener("click", function (event) {
    var password = document.getElementById('password').value;
    var perc = passwordRobusta(password);
    alert('La password ' + '"' + password + '"' + ' ha una robustezza del ' + perc.toString() + '%');
});
//###########
function sessoInput(sesso) {
    //Se l'utente è di sesso femminile verrà inviato al database il numero 1, se invece è di sesso maschile il numero equivalente sarà 0
    var x;
    sesso = sesso.trim();
    if (sesso === 'Maschio') {
        x = 0;
    }
    else {
        x = 1;
    }
    return x;
}
//###################################
//Creo una variabile che conterrà i parametri delle interfacce e successivamente trasformo il tutto in JSON, unendo i dati, pronti ad essere inviati al server
var sesso = document.getElementById('sesso').value;
var Form = {
    "nome": document.getElementById('nome').value,
    "cognome": document.getElementById('cognome').value,
    "sesso": sessoInput(sesso),
    "codiceFiscale": document.getElementById('codiceFiscale').value,
    "partitaIva": document.getElementById('partitaIva').value,
    "cittadinanza": document.getElementById('cittadinanza').value,
    "dataNascita": document.getElementById('dataNascita').value,
    "password": document.getElementById('password').value,
    "nazione": document.getElementById('nazione').value,
    "città": document.getElementById('città').value,
    "provincia": document.getElementById('provincia').value,
    "telefono": document.getElementById('telefono').value,
    "cap": document.getElementById('cap').value,
    "comune": document.getElementById('comune').value,
    "indirizzo": document.getElementById('indirizzo').value,
    "numeroCivico": document.getElementById('numeroCivico').value,
    "località": document.getElementById('località').value
};
var myJSON = JSON.stringify(Form);
//###############################################################################################
//CONTROLLO CHE I CAMPI OBBLIGATORI VENGANO RIEMPITI, CHE NON CI SIANO ERRORI E CHE I REQUISITI PER LA LUNGHEZZA VENGANO RISPETTATI
//Utilizzo delle costanti per riempire i messaggi di errore
var form = document.getElementById('ilMioForm');
var errorePassword = document.getElementById('errorePassword');
var erroreConferma = document.getElementById('erroreConferma');
var erroreNome = document.getElementById('erroreNome');
var erroreCognome = document.getElementById('erroreCognome');
var erroreCodiceFiscale = document.getElementById('erroreCodiceFiscale');
var erroreCittadinanza = document.getElementById('erroreCittadinanza');
var erroreCittà = document.getElementById('erroreCittà');
var erroreProvincia = document.getElementById('erroreProvincia');
var erroreDataNascita = document.getElementById('erroreDataNascita');
var erroreNazione = document.getElementById('erroreNazione');
var erroreTelefono = document.getElementById('erroreTelefono');
/*
Aggiungo un evento al form (e ai tag input per far sì che gli errori appaiano in tempo reale) che impedisce l'invio dei dati al server nel caso in cui siano presenti dei campi vuoti:
- il messaggio cambierà in base al campo del form
- il messaggio scomparirà se il campo è stato riempito e se in generale non ci sono errori
*/
//PASSWORD
//Evento che si verificherà dopo che l'utente avrà provato a inviare i dati
form.addEventListener('submit', function (event) {
    //Creo tre costanti che mi permettono di effettuare i vari controlli sul campo
    var password = document.getElementById('password').value;
    var confermaPassword = document.getElementById('confermaPassword').value;
    var regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?!.* )(?=.*[A-Z]).{5,30}$/;
    if (password.trim() === '') {
        //Se il campo è vuoto impedisco l'invio dei dati e compilo il messaggio
        event.preventDefault();
        errorePassword.innerHTML = '<p class="mb-3 mt-1 ms-3">Questo campo è <strong>obbligatorio</strong>. <br> Per favore inserisci <u>la tua password</u></p>';
    }
    else if (password.trim() !== confermaPassword.trim()) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se le due password sono diverse
        event.preventDefault();
        errorePassword.innerHTML = '<p class="mb-3 mt-1 ms-3">Le due password non coincidono</p>';
        erroreConferma.innerHTML = '<p class="mb-3 mt-1 ms-3">Le due password non coincidono</p>';
    }
    else if (regex.test(password) === false) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se la password non contiene i caratteri richiesti o non rispetta i requisiti di lunghezza
        event.preventDefault();
        errorePassword.innerHTML = '<p class="mb-3 mt-1 ms-3">Questa password non è valida: <br> - lunghezza minima: 5 caratteri <br> - lunghezza massima: 30 caratteri <br> - deve contenere un numero, una lettera minuscola, <br> una maiuscola e uno dei seguenti caratteri: !@#$%^&*</p>';
        erroreConferma.innerHTML = '<p class="mb-3 mt-1 ms-3">Questa password non è valida: <br> - lunghezza minima: 5 caratteri <br> - lunghezza massima: 30 caratteri <br> - deve contenere un numero, una lettera minuscola, <br> una maiuscola e uno dei seguenti caratteri: !@#$%^&*</p>';
    }
    else {
        //Altrimenti lascio il messaggio vuoto e, se tutti gli altri campi sono stati riempiti correttamente, invio i dati
        errorePassword.innerHTML = '';
        erroreConferma.innerHTML = '';
    }
});
//Evento che si verificherà dopo che l'utente avrà scritto qualcosa all'interno dei campi
var passwordInput = document.getElementById('password');
passwordInput.addEventListener('keyup', function (event) {
    var regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?!.* )(?=.*[A-Z]).{5,30}$/;
    //Creo tre costanti che mi permettono di effettuare i vari controlli sul campo
    var passwordValue = document.getElementById('password').value;
    var confermaPasswordValue = document.getElementById('confermaPassword').value;
    if (passwordValue.trim() === '') {
        //Se il campo è vuoto impedisco l'invio dei dati e compilo il messaggio
        event.preventDefault();
        errorePassword.innerHTML = '<p class="mb-3 mt-1 ms-3">Questo campo è <strong>obbligatorio</strong>. <br> Per favore inserisci <u>la tua password</u></p>';
    }
    else if (passwordValue.trim() !== confermaPasswordValue.trim()) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se le due password sono diverse
        event.preventDefault();
        errorePassword.innerHTML = '<p class="mb-3 mt-1 ms-3">Le due password non coincidono</p>';
        erroreConferma.innerHTML = '<p class="mb-3 mt-1 ms-3">Le due password non coincidono</p>';
    }
    else if (regex.test(passwordValue) === false) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se la password non contiene i caratteri richiesti o non rispetta i requisiti di lunghezza
        event.preventDefault();
        errorePassword.innerHTML = '<p class="mb-3 mt-1 ms-3">Questa password non è valida: <br> - lunghezza minima: 5 caratteri <br> - lunghezza massima: 30 caratteri <br> - deve contenere un numero, una lettera minuscola, <br> una maiuscola e uno dei seguenti caratteri: !@#$%^&*</p>';
        erroreConferma.innerHTML = '<p class="mb-3 mt-1 ms-3">Questa password non è valida: <br> - lunghezza minima: 5 caratteri <br> - lunghezza massima: 30 caratteri <br> - deve contenere un numero, una lettera minuscola, <br> una maiuscola e uno dei seguenti caratteri: !@#$%^&*</p>';
    }
    else {
        //Altrimenti lascio il messaggio vuoto e, se tutti gli altri campi sono stati riempiti correttamente, invio i dati
        errorePassword.innerHTML = '';
        erroreConferma.innerHTML = '';
    }
});
//##############
//CONFERMA PASSWORD
//Evento che si verificherà dopo che l'utente avrà provato a inviare i dati
form.addEventListener('submit', function (event) {
    var regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?!.* )(?=.*[A-Z]).{5,30}$/;
    //Creo tre costanti che mi permettono di effettuare i vari controlli sul campo
    var password = document.getElementById('password').value;
    var confermaPassword = document.getElementById('confermaPassword').value;
    if (confermaPassword.trim() === '') {
        //Se il campo è vuoto impedisco l'invio dei dati e compilo il messaggio
        event.preventDefault();
        erroreConferma.innerHTML = '<p class="mb-3 mt-1 ms-3">Questo campo è <strong>obbligatorio</strong>. <br> Per favore conferma <u>la tua password</u></p>';
    }
    else if (password.trim() !== confermaPassword.trim()) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se le due password sono diverse
        event.preventDefault();
        errorePassword.innerHTML = '<p class="mb-3 mt-1 ms-3">Le due password non coincidono</p>';
        erroreConferma.innerHTML = '<p class="mb-3 mt-1 ms-3">Le due password non coincidono</p>';
    }
    else if (regex.test(password) === false) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se la password non contiene i caratteri richiesti o non rispetta i requisiti di lunghezza
        event.preventDefault();
        errorePassword.innerHTML = '<p class="mb-3 mt-1 ms-3">Questa password non è valida: <br> - lunghezza minima: 5 caratteri <br> - lunghezza massima: 30 caratteri <br> - deve contenere un numero, una lettera minuscola, <br> una maiuscola e uno dei seguenti caratteri: !@#$%^&*</p>';
        erroreConferma.innerHTML = '<p class="mb-3 mt-1 ms-3">Questa password non è valida: <br> - lunghezza minima: 5 caratteri <br> - lunghezza massima: 30 caratteri <br> - deve contenere un numero, una lettera minuscola, <br> una maiuscola e uno dei seguenti caratteri: !@#$%^&*</p>';
    }
    else {
        //Altrimenti lascio il messaggio vuoto e, se tutti gli altri campi sono stati riempiti correttamente, invio i dati
        erroreConferma.innerHTML = '';
        errorePassword.innerHTML = '';
    }
});
//Evento che si verificherà dopo che l'utente avrà scritto qualcosa all'interno dei campi
var confermaPasswordInput = document.getElementById('confermaPassword');
confermaPasswordInput.addEventListener('keyup', function (event) {
    var regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?!.* )(?=.*[A-Z]).{5,30}$/;
    //Creo tre costanti che mi permettono di effettuare i vari controlli sul campo
    var passwordValue = document.getElementById('password').value;
    var confermaPasswordValue = document.getElementById('confermaPassword').value;
    if (confermaPasswordValue.trim() === '') {
        //Se il campo è vuoto impedisco l'invio dei dati e compilo il messaggio
        event.preventDefault();
        erroreConferma.innerHTML = '<p class="mb-3 mt-1 ms-3">Questo campo è <strong>obbligatorio</strong>. <br> Per favore conferma <u>la tua password</u></p>';
    }
    else if (passwordValue.trim() !== confermaPasswordValue.trim()) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se le due password sono diverse
        event.preventDefault();
        errorePassword.innerHTML = '<p class="mb-3 mt-1 ms-3">Le due password non coincidono</p>';
        erroreConferma.innerHTML = '<p class="mb-3 mt-1 ms-3">Le due password non coincidono</p>';
    }
    else if (regex.test(passwordValue) === false) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se la password non contiene i caratteri richiesti o non rispetta i requisiti di lunghezza
        event.preventDefault();
        errorePassword.innerHTML = '<p class="mb-3 mt-1 ms-3">Questa password non è valida: <br> - lunghezza minima: 5 caratteri <br> - lunghezza massima: 30 caratteri <br> - deve contenere un numero, una lettera minuscola, <br> una maiuscola e uno dei seguenti caratteri: !@#$%^&*</p>';
        erroreConferma.innerHTML = '<p class="mb-3 mt-1 ms-3">Questa password non è valida: <br> - lunghezza minima: 5 caratteri <br> - lunghezza massima: 30 caratteri <br> - deve contenere un numero, una lettera minuscola, <br> una maiuscola e uno dei seguenti caratteri: !@#$%^&*</p>';
    }
    else {
        //Altrimenti lascio il messaggio vuoto e, se tutti gli altri campi sono stati riempiti correttamente, invio i dati
        erroreConferma.innerHTML = '';
        errorePassword.innerHTML = '';
    }
});
//##############
//NOME
//Evento che si verificherà dopo che l'utente avrà provato a inviare i dati
form.addEventListener('submit', function (event) {
    //Creo una costante che mi permette di effettuare i vari controlli sul campo
    var nome = document.getElementById('nome').value;
    var regex = /^[a-zA-Z]+$/;
    if (nome.trim() === '') {
        //Se il campo è vuoto impedisco l'invio dei dati e compilo il messaggio
        event.preventDefault();
        erroreNome.innerHTML = '<p class="mb-3 mt-1 ms-3">Questo campo è <strong>obbligatorio</strong>. <br> Per favore inserisci <u>il tuo nome</u></p>';
    }
    else if (nome.length < 3) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza minima
        event.preventDefault();
        erroreNome.innerHTML = '<p class="mb-3 mt-1 ms-3">Il nome da te inserito è <strong>troppo corto</strong></p>';
    }
    else if (nome.length > 20) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza massima
        event.preventDefault();
        erroreNome.innerHTML = '<p class="mb-3 mt-1 ms-3">Il nome da te inserito è <strong>troppo lungo</strong></p>';
    }
    else if (regex.test(nome) === false) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non contiene un nome valido e dunque contiene numeri o caratteri speciali
        event.preventDefault();
        erroreNome.innerHTML = '<p class="mb-3 mt-1 ms-3">Il nome da te inserito <strong>non è valido</strong></p>';
    }
    else {
        //Altrimenti lascio il messaggio vuoto e, se tutti gli altri campi sono stati riempiti correttamente, invio i dati
        erroreNome.innerHTML = '';
    }
});
//Evento che si verificherà dopo che l'utente avrà scritto qualcosa all'interno dei campi
var nomeInput = document.getElementById('nome');
nomeInput.addEventListener('keyup', function (event) {
    //Creo una costante che mi permette di effettuare i vari controlli sul campo
    var nomeValue = document.getElementById('nome').value;
    var regex = /^[a-zA-Z]+$/;
    if (nomeValue.trim() === '') {
        //Se il campo è vuoto impedisco l'invio dei dati e compilo il messaggio
        event.preventDefault();
        erroreNome.innerHTML = '<p class="mb-3 mt-1 ms-3">Questo campo è <strong>obbligatorio</strong>. <br> Per favore inserisci <u>il tuo nome</u></p>';
    }
    else if (nomeValue.length < 3) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza minima
        event.preventDefault();
        erroreNome.innerHTML = '<p class="mb-3 mt-1 ms-3">Il nome da te inserito è <strong>troppo corto</strong></p>';
    }
    else if (nomeValue.length > 20) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza massima
        event.preventDefault();
        erroreNome.innerHTML = '<p class="mb-3 mt-1 ms-3">Il nome da te inserito è <strong>troppo lungo</strong></p>';
    }
    else if (regex.test(nomeValue) === false) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non contiene un nome valido e dunque contiene numeri o caratteri speciali
        event.preventDefault();
        erroreNome.innerHTML = '<p class="mb-3 mt-1 ms-3">Il nome da te inserito <strong>non è valido</strong></p>';
    }
    else {
        //Altrimenti lascio il messaggio vuoto e, se tutti gli altri campi sono stati riempiti correttamente, invio i dati
        erroreNome.innerHTML = '';
    }
});
//##############
//COGNOME
//Evento che si verificherà dopo che l'utente avrà provato a inviare i dati
form.addEventListener('submit', function (event) {
    //Creo una costante che mi permette di effettuare i vari controlli sul campo
    var cognome = document.getElementById('cognome').value;
    var regex = /^[a-zA-Z]+$/;
    if (cognome.trim() === '') {
        //Se il campo è vuoto impedisco l'invio dei dati e compilo il messaggio
        event.preventDefault();
        erroreCognome.innerHTML = '<p class="mb-3 mt-1 ms-3">Questo campo è <strong>obbligatorio</strong>. <br> Per favore inserisci <u>il tuo cognome</u></p>';
    }
    else if (cognome.length < 3) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza minima
        event.preventDefault();
        erroreCognome.innerHTML = '<p class="mb-3 mt-1 ms-3">Il cognome da te inserito è <strong>troppo corto</strong></p>';
    }
    else if (cognome.length > 20) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza massima
        event.preventDefault();
        erroreCognome.innerHTML = '<p class="mb-3 mt-1 ms-3">Il cognome da te inserito è <strong>troppo lungo</strong></p>';
    }
    else if (regex.test(cognome) === false) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non contiene un cognome valido e dunque contiene numeri o caratteri speciali
        event.preventDefault();
        erroreCognome.innerHTML = '<p class="mb-3 mt-1 ms-3">Il cognome da te inserito <strong>non è valido</strong></p>';
    }
    else {
        //Altrimenti lascio il messaggio vuoto e, se tutti gli altri campi sono stati riempiti correttamente, invio i dati
        erroreCognome.innerHTML = '';
    }
});
//Evento che si verificherà dopo che l'utente avrà scritto qualcosa all'interno dei campi
var cognomeInput = document.getElementById('cognome');
cognomeInput.addEventListener('keyup', function (event) {
    //Creo una costante che mi permette di effettuare i vari controlli sul campo
    var cognomeValue = document.getElementById('cognome').value;
    var regex = /^[a-zA-Z]+$/;
    if (cognomeValue.trim() === '') {
        //Se il campo è vuoto impedisco l'invio dei dati e compilo il messaggio
        event.preventDefault();
        erroreCognome.innerHTML = '<p class="mb-3 mt-1 ms-3">Questo campo è <strong>obbligatorio</strong>. <br> Per favore inserisci <u>il tuo cognome</u></p>';
    }
    else if (cognomeValue.length < 3) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza minima
        event.preventDefault();
        erroreCognome.innerHTML = '<p class="mb-3 mt-1 ms-3">Il cognome da te inserito è <strong>troppo corto</strong></p>';
    }
    else if (cognomeValue.length > 20) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza massima
        event.preventDefault();
        erroreCognome.innerHTML = '<p class="mb-3 mt-1 ms-3">Il cognome da te inserito è <strong>troppo lungo</strong></p>';
    }
    else if (regex.test(cognomeValue) === false) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non contiene un cognome valido e dunque contiene numeri o caratteri speciali
        event.preventDefault();
        erroreCognome.innerHTML = '<p class="mb-3 mt-1 ms-3">Il cognome da te inserito <strong>non è valido</strong></p>';
    }
    else {
        //Altrimenti lascio il messaggio vuoto e, se tutti gli altri campi sono stati riempiti correttamente, invio i dati
        erroreCognome.innerHTML = '';
    }
});
//##############
//CODICE FISCALE
//Evento che si verificherà dopo che l'utente avrà provato a inviare i dati
form.addEventListener('submit', function (event) {
    var valido = 0;
    //Creo una costante che mi permette di effettuare i vari controlli sul campo
    var codiceFiscale = document.getElementById('codiceFiscale').value;
    var regexp = new RegExp(/^[A-Z]{6}[0-9]{2}[A-Z]{1}[0-9]{2}[A-Z]{1}[0-9]{3}[A-Z]{1}$/);
    valido = (regexp.test(codiceFiscale)) ? 0 : 1;
    if (codiceFiscale.trim() === '') {
        //Se il campo è vuoto impedisco l'invio dei dati e compilo il messaggio
        event.preventDefault();
        erroreCodiceFiscale.innerHTML = '<p class="mb-3 mt-1 ms-3">Questo campo è <strong>obbligatorio</strong>. <br> Per favore inserisci <u>il tuo codice fiscale</u></p>';
    }
    else if (valido !== 0) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non contiene un codice fiscale valido
        event.preventDefault();
        erroreCodiceFiscale.innerHTML = '<p class="mb-3 mt-1 ms-3">Il codice fiscale da te inserito non è valido</p>';
    }
    else {
        //Altrimenti lascio il messaggio vuoto e, se tutti gli altri campi sono stati riempiti, invio i dati
        erroreCodiceFiscale.innerHTML = '';
    }
});
//Evento che si verificherà dopo che l'utente avrà scritto qualcosa all'interno dei campi
var codiceFiscaleInput = document.getElementById('codiceFiscale');
codiceFiscaleInput.addEventListener('keyup', function (event) {
    var valido = 0;
    var codiceFiscaleValue = document.getElementById('codiceFiscale').value;
    var regexp = new RegExp(/^[A-Z]{6}[0-9]{2}[A-Z]{1}[0-9]{2}[A-Z]{1}[0-9]{3}[A-Z]{1}$/);
    valido = (regexp.test(codiceFiscaleValue)) ? 0 : 1;
    if (codiceFiscaleValue.trim() === '') {
        //Se il campo è vuoto impedisco l'invio dei dati e compilo il messaggio
        event.preventDefault();
        erroreCodiceFiscale.innerHTML = '<p class="mb-3 mt-1 ms-3">Questo campo è <strong>obbligatorio</strong>. <br> Per favore inserisci <u>il tuo codice fiscale</u></p>';
    }
    else if (valido !== 0) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non contiene un codice fiscale valido
        event.preventDefault();
        erroreCodiceFiscale.innerHTML = '<p class="mb-3 mt-1 ms-3">Il codice fiscale da te inserito non è valido</p>';
    }
    else {
        //Altrimenti lascio il messaggio vuoto e, se tutti gli altri campi sono stati riempiti, invio i dati
        erroreCodiceFiscale.innerHTML = '';
    }
});
//##############
//CITTADINANZA
//Evento che si verificherà dopo che l'utente avrà provato a inviare i dati
form.addEventListener('submit', function (event) {
    //Creo una costante che mi permette di effettuare i vari controlli sul campo
    var cittadinanza = document.getElementById('cittadinanza').value;
    var regex = /^[a-zA-Z]+$/;
    if (cittadinanza.trim() === '') {
        //Se il campo è vuoto impedisco l'invio dei dati e compilo il messaggio
        event.preventDefault();
        erroreCittadinanza.innerHTML = '<p class="mb-3 mt-1 ms-3">Questo campo è <strong>obbligatorio</strong>. <br> Per favore inserisci <u>la tua cittadinanza</u></p>';
    }
    else if (cittadinanza.length < 2) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza minima
        event.preventDefault();
        erroreCittadinanza.innerHTML = '<p class="mb-3 mt-1 ms-3">La cittadinanza da te inserita è <strong>troppo corta</strong></p>';
    }
    else if (cittadinanza.length > 30) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza massima
        event.preventDefault();
        erroreCittadinanza.innerHTML = '<p class="mb-3 mt-1 ms-3">La cittadinanza da te inserita è <strong>troppo lunga</strong></p>';
    }
    else if (regex.test(cittadinanza) === false) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non contiene una cittadinanza valida e dunque contiene numeri o caratteri speciali
        event.preventDefault();
        erroreCittadinanza.innerHTML = '<p class="mb-3 mt-1 ms-3">La cittadinanza da te inserita <strong>non è valida</strong></p>';
    }
    else {
        //Altrimenti lascio il messaggio vuoto e, se tutti gli altri campi sono stati riempiti correttamente, invio i dati
        erroreCittadinanza.innerHTML = '';
    }
});
//Evento che si verificherà dopo che l'utente avrà scritto qualcosa all'interno dei campi
var cittadinanzaInput = document.getElementById('cittadinanza');
cittadinanzaInput.addEventListener('keyup', function (event) {
    //Creo una costante che mi permette di effettuare i vari controlli sul campo
    var cittadinanzaValue = document.getElementById('cittadinanza').value;
    var regex = /^[a-zA-Z]+$/;
    if (cittadinanzaValue.trim() === '') {
        //Se il campo è vuoto impedisco l'invio dei dati e compilo il messaggio
        event.preventDefault();
        erroreCittadinanza.innerHTML = '<p class="mb-3 mt-1 ms-3">Questo campo è <strong>obbligatorio</strong>. <br> Per favore inserisci <u>la tua cittadinanza</u></p>';
    }
    else if (cittadinanzaValue.length < 2) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza minima
        event.preventDefault();
        erroreCittadinanza.innerHTML = '<p class="mb-3 mt-1 ms-3">La cittadinanza da te inserita è <strong>troppo corta</strong></p>';
    }
    else if (cittadinanzaValue.length > 30) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza massima
        event.preventDefault();
        erroreCittadinanza.innerHTML = '<p class="mb-3 mt-1 ms-3">La cittadinanza da te inserita è <strong>troppo lunga</strong></p>';
    }
    else if (regex.test(cittadinanzaValue) === false) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non contiene una cittadinanza valida e dunque contiene numeri o caratteri speciali
        event.preventDefault();
        erroreCittadinanza.innerHTML = '<p class="mb-3 mt-1 ms-3">La cittadinanza da te inserita <strong>non è valida</strong></p>';
    }
    else {
        //Altrimenti lascio il messaggio vuoto e, se tutti gli altri campi sono stati riempiti correttamente, invio i dati
        erroreCittadinanza.innerHTML = '';
    }
});
//##############
//CITTA'
//Evento che si verificherà dopo che l'utente avrà provato a inviare i dati
form.addEventListener('submit', function (event) {
    //Creo una costante che mi permette di effettuare i vari controlli sul campo
    var città = document.getElementById('città').value;
    var regex = /^[a-zA-Z]+$/;
    if (città.trim() === '') {
        //Se il campo è vuoto impedisco l'invio dei dati e compilo il messaggio
        event.preventDefault();
        erroreCittà.innerHTML = '<p class="mb-3 mt-1 ms-3">Questo campo è <strong>obbligatorio</strong>. <br> Per favore inserisci <u>la tua città</u></p>';
    }
    else if (città.length < 3) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza minima
        event.preventDefault();
        erroreCittà.innerHTML = '<p class="mb-3 mt-1 ms-3">La città da te inserita è <strong>troppo corta</strong></p>';
    }
    else if (città.length > 30) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza massima
        event.preventDefault();
        erroreCittà.innerHTML = '<p class="mb-3 mt-1 ms-3">La città da te inserita è <strong>troppo lunga</strong></p>';
    }
    else if (regex.test(città) === false) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non contiene una città valida e dunque contiene numeri o caratteri speciali
        event.preventDefault();
        erroreCittà.innerHTML = '<p class="mb-3 mt-1 ms-3">La città da te inserita <strong>non è valida</strong></p>';
    }
    else {
        //Altrimenti lascio il messaggio vuoto e, se tutti gli altri campi sono stati riempiti correttamente, invio i dati
        erroreCittà.innerHTML = '';
    }
});
//Evento che si verificherà dopo che l'utente avrà scritto qualcosa all'interno dei campi
var cittàInput = document.getElementById('città');
cittàInput.addEventListener('keyup', function (event) {
    //Creo una costante che mi permette di effettuare i vari controlli sul campo
    var cittàValue = document.getElementById('città').value;
    var regex = /^[a-zA-Z]+$/;
    if (cittàValue.trim() === '') {
        //Se il campo è vuoto impedisco l'invio dei dati e compilo il messaggio
        event.preventDefault();
        erroreCittà.innerHTML = '<p class="mb-3 mt-1 ms-3">Questo campo è <strong>obbligatorio</strong>. <br> Per favore inserisci <u>la tua città</u></p>';
    }
    else if (cittàValue.length < 3) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza minima
        event.preventDefault();
        erroreCittà.innerHTML = '<p class="mb-3 mt-1 ms-3">La città da te inserita è <strong>troppo corta</strong></p>';
    }
    else if (cittàValue.length > 30) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza massima
        event.preventDefault();
        erroreCittà.innerHTML = '<p class="mb-3 mt-1 ms-3">La città da te inserita è <strong>troppo lunga</strong></p>';
    }
    else if (regex.test(cittàValue) === false) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non contiene una città valida e dunque contiene numeri o caratteri speciali
        event.preventDefault();
        erroreCittà.innerHTML = '<p class="mb-3 mt-1 ms-3">La città da te inserita <strong>non è valida</strong></p>';
    }
    else {
        //Altrimenti lascio il messaggio vuoto e, se tutti gli altri campi sono stati riempiti correttamente, invio i dati
        erroreCittà.innerHTML = '';
    }
});
//##############
//PROVINCIA
//Evento che si verificherà dopo che l'utente avrà provato a inviare i dati
form.addEventListener('submit', function (event) {
    //Creo una costante che mi permette di effettuare i vari controlli sul campo
    var provincia = document.getElementById('provincia').value;
    var regex = /^[A-Z]+$/;
    if (provincia.trim() === '') {
        //Se il campo è vuoto impedisco l'invio dei dati e compilo il messaggio
        event.preventDefault();
        erroreProvincia.innerHTML = '<p class="mb-3 mt-1 ms-3">Questo campo è <strong>obbligatorio</strong>. <br> Per favore inserisci <u>la tua provincia</u></p>';
    }
    else if (provincia.length !== 2) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza minima
        event.preventDefault();
        erroreProvincia.innerHTML = '<p class="mb-3 mt-1 ms-3">La provincia deve essere lunga <strong>2 caratteri</strong></p>';
    }
    else if (regex.test(provincia) === false) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non contiene una provincia valida e dunque contiene numeri o caratteri speciali
        event.preventDefault();
        erroreProvincia.innerHTML = '<p class="mb-3 mt-1 ms-3">La provincia da te inserita <strong>non è valida.</strong> <br> Per favore inserisci <u>la sigla in lettere maiuscole</u></p>';
    }
    else {
        //Altrimenti lascio il messaggio vuoto e, se tutti gli altri campi sono stati riempiti correttamente, invio i dati
        erroreProvincia.innerHTML = '';
    }
});
//Evento che si verificherà dopo che l'utente avrà scritto qualcosa all'interno dei campi
var provinciaInput = document.getElementById('provincia');
provinciaInput.addEventListener('keyup', function (event) {
    //Creo una costante che mi permette di effettuare i vari controlli sul campo
    var provinciaValue = document.getElementById('provincia').value;
    var regex = /^[A-Z]+$/;
    if (provinciaValue.trim() === '') {
        //Se il campo è vuoto impedisco l'invio dei dati e compilo il messaggio
        event.preventDefault();
        erroreProvincia.innerHTML = '<p class="mb-3 mt-1 ms-3">Questo campo è <strong>obbligatorio</strong>. <br> Per favore inserisci <u>la tua provincia</u></p>';
    }
    else if (provinciaValue.length !== 2) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza minima
        event.preventDefault();
        erroreProvincia.innerHTML = '<p class="mb-3 mt-1 ms-3">La provincia deve essere lunga <strong>2 caratteri</strong></p>';
    }
    else if (regex.test(provinciaValue) === false) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non contiene una provincia valida e dunque contiene numeri o caratteri speciali
        event.preventDefault();
        erroreProvincia.innerHTML = '<p class="mb-3 mt-1 ms-3">La provincia da te inserita <strong>non è valida.</strong> <br> Per favore inserisci <u>la sigla in lettere maiuscole</u></p>';
    }
    else {
        //Altrimenti lascio il messaggio vuoto e, se tutti gli altri campi sono stati riempiti correttamente, invio i dati
        erroreProvincia.innerHTML = '';
    }
});
//##############
//DATA DI NASCITA
//Evento che si verificherà dopo che l'utente avrà provato a inviare i dati
form.addEventListener('submit', function (event) {
    //Creo una costante che mi permette di effettuare i vari controlli sul campo
    var dataNascita = document.getElementById('dataNascita').value;
    if (dataNascita.trim() === '') {
        //Se il campo è vuoto impedisco l'invio dei dati e compilo il messaggio
        event.preventDefault();
        erroreDataNascita.innerHTML = '<p class="mb-3 mt-1 ms-3">Questo campo è <strong>obbligatorio</strong>. <br> Per favore inserisci <u>la tua data di nascita</u></p>';
    }
    else {
        //Altrimenti lascio il messaggio vuoto e, se tutti gli altri campi sono stati riempiti correttamente, invio i dati
        erroreDataNascita.innerHTML = '';
    }
});
//Evento che si verificherà dopo che l'utente avrà scritto qualcosa all'interno dei campi
var dataNascitaInput = document.getElementById('dataNascita');
dataNascitaInput.addEventListener('keyup', function (event) {
    //Creo una costante che mi permette di effettuare i vari controlli sul campo
    var dataNascitaValue = document.getElementById('dataNascita').value;
    if (dataNascitaValue.trim() === '') {
        //Se il campo è vuoto impedisco l'invio dei dati e compilo il messaggio
        event.preventDefault();
        erroreDataNascita.innerHTML = '<p class="mb-3 mt-1 ms-3">Questo campo è <strong>obbligatorio</strong>. <br> Per favore inserisci <u>la tua data di nascita</u></p>';
    }
    else {
        //Altrimenti lascio il messaggio vuoto e, se tutti gli altri campi sono stati riempiti correttamente, invio i dati
        erroreDataNascita.innerHTML = '';
    }
});
//##############
//NAZIONE
//Evento che si verificherà dopo che l'utente avrà provato a inviare i dati
form.addEventListener('submit', function (event) {
    //Creo una costante che mi permette di effettuare i vari controlli sul campo
    var nazione = document.getElementById('nazione').value;
    var regex = /^[a-zA-Z]+$/;
    if (nazione.trim() === '') {
        //Se il campo è vuoto impedisco l'invio dei dati e compilo il messaggio
        event.preventDefault();
        erroreNazione.innerHTML = '<p class="mb-3 mt-1 ms-3">Questo campo è <strong>obbligatorio</strong>. <br> Per favore inserisci <u>la tua nazione</u></p>';
    }
    else if (nazione.length < 3) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza minima
        event.preventDefault();
        erroreNazione.innerHTML = '<p class="mb-3 mt-1 ms-3">La nazione da te inserita è <strong>troppo corta</strong></p>';
    }
    else if (nazione.length > 30) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza massima
        event.preventDefault();
        erroreNazione.innerHTML = '<p class="mb-3 mt-1 ms-3">La nazione da te inserita è <strong>troppo lunga</strong></p>';
    }
    else if (regex.test(nazione) === false) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non contiene una nazione valida e dunque contiene numeri o caratteri speciali
        event.preventDefault();
        erroreNazione.innerHTML = '<p class="mb-3 mt-1 ms-3">La nazione da te inserita <strong>non è valida</strong></p>';
    }
    else {
        //Altrimenti lascio il messaggio vuoto e, se tutti gli altri campi sono stati riempiti correttamente, invio i dati
        erroreNazione.innerHTML = '';
    }
});
//Evento che si verificherà dopo che l'utente avrà scritto qualcosa all'interno dei campi
var nazioneInput = document.getElementById('nazione');
nazioneInput.addEventListener('keyup', function (event) {
    //Creo una costante che mi permette di effettuare i vari controlli sul campo
    var nazioneValue = document.getElementById('nazione').value;
    var regex = /^[a-zA-Z]+$/;
    if (nazioneValue.trim() === '') {
        //Se il campo è vuoto impedisco l'invio dei dati e compilo il messaggio
        event.preventDefault();
        erroreNazione.innerHTML = '<p class="mb-3 mt-1 ms-3">Questo campo è <strong>obbligatorio</strong>. <br> Per favore inserisci <u>la tua nazione</u></p>';
    }
    else if (nazioneValue.length < 3) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza minima
        event.preventDefault();
        erroreNazione.innerHTML = '<p class="mb-3 mt-1 ms-3">La nazione da te inserita è <strong>troppo corta</strong></p>';
    }
    else if (nazioneValue.length > 30) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza massima
        event.preventDefault();
        erroreNazione.innerHTML = '<p class="mb-3 mt-1 ms-3">La nazione da te inserita è <strong>troppo lunga</strong></p>';
    }
    else if (regex.test(nazioneValue) === false) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non contiene una nazione valida e dunque contiene numeri o caratteri speciali
        event.preventDefault();
        erroreNazione.innerHTML = '<p class="mb-3 mt-1 ms-3">La nazione da te inserita <strong>non è valida</strong></p>';
    }
    else {
        //Altrimenti lascio il messaggio vuoto e, se tutti gli altri campi sono stati riempiti correttamente, invio i dati
        erroreNazione.innerHTML = '';
    }
});
//##############
//TELEFONO
//Evento che si verificherà dopo che l'utente avrà provato a inviare i dati
form.addEventListener('submit', function (event) {
    //Creo una costante che mi permette di effettuare i vari controlli sul campo
    var telefono = document.getElementById('telefono').value;
    var regex = /^[0-9+]+$/;
    if (telefono.trim() === '') {
        //Se il campo è vuoto impedisco l'invio dei dati e compilo il messaggio
        event.preventDefault();
        erroreTelefono.innerHTML = '<p class="mb-3 mt-1 ms-3">Questo campo è <strong>obbligatorio</strong>. <br> Per favore inserisci <u>il tuo numero di telefono</u></p>';
    }
    else if (telefono.length < 9) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza minima
        event.preventDefault();
        erroreTelefono.innerHTML = '<p class="mb-3 mt-1 ms-3">Il numero di telefono da te inserito è <strong>troppo corto</strong></p>';
    }
    else if (telefono.length > 15) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza massima
        event.preventDefault();
        erroreTelefono.innerHTML = '<p class="mb-3 mt-1 ms-3">Il numero di telefono da te inserito è <strong>troppo lungo</strong></p>';
    }
    else if (regex.test(telefono) === false) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non contiene un numero di telefono valido e dunque contiene lettere o caratteri speciali
        event.preventDefault();
        erroreTelefono.innerHTML = '<p class="mb-3 mt-1 ms-3">Il numero di telefono da te inserito <strong>non è valido</strong></p>';
    }
    else {
        //Altrimenti lascio il messaggio vuoto e, se tutti gli altri campi sono stati riempiti correttamente, invio i dati
        erroreTelefono.innerHTML = '';
    }
});
//Evento che si verificherà dopo che l'utente avrà scritto qualcosa all'interno dei campi
var telefonoInput = document.getElementById('telefono');
telefonoInput.addEventListener('keyup', function (event) {
    //Creo una costante che mi permette di effettuare i vari controlli sul campo
    var telefonoValue = document.getElementById('telefono').value;
    var regex = /^[0-9+]+$/;
    if (telefonoValue.trim() === '') {
        //Se il campo è vuoto impedisco l'invio dei dati e compilo il messaggio
        event.preventDefault();
        erroreTelefono.innerHTML = '<p class="mb-3 mt-1 ms-3">Questo campo è <strong>obbligatorio</strong>. <br> Per favore inserisci <u>il tuo numero di telefono</u></p>';
    }
    else if (telefonoValue.length < 9) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza minima
        event.preventDefault();
        erroreTelefono.innerHTML = '<p class="mb-3 mt-1 ms-3">Il numero di telefono da te inserito è <strong>troppo corto</strong></p>';
    }
    else if (telefonoValue.length > 15) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non rispetta la lunghezza massima
        event.preventDefault();
        erroreTelefono.innerHTML = '<p class="mb-3 mt-1 ms-3">Il numero di telefono da te inserito è <strong>troppo lungo</strong></p>';
    }
    else if (regex.test(telefonoValue) === false) {
        //Faccio la stessa cosa (ma con un messaggio diverso) se il campo non contiene un numero di telefono valido e dunque contiene lettere o caratteri speciali
        event.preventDefault();
        erroreTelefono.innerHTML = '<p class="mb-3 mt-1 ms-3">Il numero di telefono da te inserito <strong>non è valido</strong></p>';
    }
    else {
        //Altrimenti lascio il messaggio vuoto e, se tutti gli altri campi sono stati riempiti correttamente, invio i dati
        erroreTelefono.innerHTML = '';
    }
});
