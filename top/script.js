// Importação do Firebase e Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

// Configuração do Firebase (usando variáveis de ambiente no Netlify)
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // 🔒 Chave segura
    authDomain: "a-caverna-e7efa.firebaseapp.com",
    projectId: "a-caverna-e7efa",
    storageBucket: "a-caverna-e7efa.firebasestorage.app",
    messagingSenderId: "104720467285",
    appId: "1:104720467285:web:7ebdfc27fa7cb923f8dbdc",
    measurementId: "G-6XPWT60J3T"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referências às coleções do Firestore
const devocionaisRef = collection(db, "devocionais");
const informesRef = collection(db, "informes");

// Seleção de elementos no HTML
const devocionalList = document.getElementById('devocionalList');
const informeList = document.getElementById('informeList');
const postDevocionalBtn = document.getElementById('postDevocionalBtn');
const postInformeBtn = document.getElementById('postInformeBtn');
const devocionalText = document.getElementById('devocionalText');
const informeText = document.getElementById('informeText');

// 🔹 Função para adicionar um novo devocional ao Firestore
async function addDevocional() {
    const text = devocionalText.value.trim();
    if (text) {
        await addDoc(devocionaisRef, { text, timestamp: new Date() });
        devocionalText.value = ""; // Limpa o campo de texto
    } else {
        alert('Digite um devocional antes de postar!');
    }
}

// 🔹 Função para adicionar um novo informe ao Firestore
async function addInforme() {
    const text = informeText.value.trim();
    if (text) {
        await addDoc(informesRef, { text, timestamp: new Date() });
        informeText.value = ""; // Limpa o campo de texto
    } else {
        alert('Digite um informe antes de postar!');
    }
}

// 🔥 Atualiza a lista de devocionais em tempo real
onSnapshot(query(devocionaisRef, orderBy("timestamp", "desc")), (snapshot) => {
    devocionalList.innerHTML = ""; // Limpa a lista antes de atualizar
    snapshot.forEach((doc) => {
        const postItem = document.createElement('div');
        postItem.classList.add('post-item');
        postItem.textContent = doc.data().text;
        devocionalList.appendChild(postItem);
    });
});

// 🔥 Atualiza a lista de informes em tempo real
onSnapshot(query(informesRef, orderBy("timestamp", "desc")), (snapshot) => {
    informeList.innerHTML = ""; // Limpa a lista antes de atualizar
    snapshot.forEach((doc) => {
        const postItem = document.createElement('div');
        postItem.classList.add('post-item');
        postItem.textContent = doc.data().text;
        informeList.appendChild(postItem);
    });
});

// Eventos dos botões para postar devocional e informe
postDevocionalBtn.addEventListener('click', addDevocional);
postInformeBtn.addEventListener('click', addInforme);
