import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import {
    collection,
    addDoc,
    doc,
    setDoc,
    deleteDoc,
    getDocs,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    getRedirectResult,
    GithubAuthProvider
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAI-de3F-7nLKo2t1d8g60W6o2e1LQ5huQ",
    authDomain: "examen-90c3e.firebaseapp.com",
    projectId: "examen-90c3e",
    storageBucket: "examen-90c3e.appspot.com",
    messagingSenderId: "564814867588",
    appId: "1:564814867588:web:40ef5d8e1baff4c5c866d1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const providerGit = new GithubAuthProvider();
const provider = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();

let crear = document.getElementById("btnCrear");
let email = document.getElementById("inEmail");
let password = document.getElementById("inPass");
//Crear cuenta
crear.addEventListener('click', function () {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Su cuenta se ha creado exitosamente");
            location.reload()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode + ' + ' + errorMessage)
        });
})

let iniciar = document.getElementById("btnIniciar");
let usuario = document.getElementById("user");
let form = document.getElementById("form")
//Iniciar sesión
iniciar.addEventListener('click', function () {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Has iniciado sesión correctamente " + user.email)

            usuario.innerHTML = `<p class="user">Bienvenido ${user.email} </p>`
            document.getElementById('form').style.display = 'block';
            document.getElementById('reg').style.display = 'none';

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode + ' + ' + errorMessage)
        });
})

let google = document.getElementById("btnGoogle");
//Iniciar sesión con Google
google.addEventListener("click", function () {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            alert("Has iniciado sesión correctamente " + user.email)
            document.getElementById('form').style.display = 'block';
            document.getElementById('reg').style.display = 'none';

            usuario.innerHTML = `<p class="user">Bienvenido ${user.email} </p>`
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
})

let facebook = document.getElementById("btnFace");
//Inciar sesión con Facebook
facebook.addEventListener("click", function () {
  signInWithPopup(auth, providerFacebook)
    .then((result) => {
      const user = result.user;
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      document.getElementById('form').style.display = 'block';
      document.getElementById('reg').style.display = 'none';
      usuario.innerHTML = `<p class="user">Bienvenido ${user.email} </p>`
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = FacebookAuthProvider.credentialFromError(error);
    });
})
