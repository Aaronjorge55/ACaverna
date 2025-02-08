// Importa o Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";

// Configuração do Firebase (SEUS DADOS)
const firebaseConfig = {
  apiKey: "AIzaSyB4J0x0RevW0XyDEmLb_b9RV_JJh5UCKPE",
  authDomain: "a-caverna-e7efa.firebaseapp.com",
  projectId: "a-caverna-e7efa",
  storageBucket: "a-caverna-e7efa.firebasestorage.app",
  messagingSenderId: "104720467285",
  appId: "1:104720467285:web:7ebdfc27fa7cb923f8dbdc",
  measurementId: "G-6XPWT60J3T"
};

// Inicializa Firebase e Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Verifica se Firebase foi inicializado
console.log("Firebase inicializado com sucesso!");

// Função para postar devocional no Firestore
async function postDevocional() {
    const text = document.getElementById('devocionalText').value;
    if (text.trim() !== "") {
        try {
            await addDoc(collection(db, "devocionais"), { texto: text, timestamp: serverTimestamp() });
            document.getElementById('devocionalText').value = ""; // Limpa o campo
            console.log("✅ Devocional postado!");
            loadDevocionais(); // Atualiza a lista
        } catch (error) {
            console.error("❌ Erro ao postar devocional:", error);
        }
    } else {
        alert("O devocional não pode estar vazio!");
    }
}

// Função para carregar devocionais do Firestore
async function loadDevocionais() {
    try {
        const querySnapshot = await getDocs(collection(db, "devocionais"));
        const devocionalList = document.getElementById('devocionalList');
        devocionalList.innerHTML = ""; // Limpa a lista antes de carregar

        querySnapshot.forEach((doc) => {
            const item = document.createElement('div');
            item.classList.add('devocionalItem');
            item.textContent = doc.data().texto;
            devocionalList.appendChild(item);
        });

        console.log("📜 Devocionais carregados com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao carregar devocionais:", error);
    }
}

// Função para postar um informe no Firestore
async function postInforme() {
    const text = document.getElementById('informeText').value;
    if (text.trim() !== "") {
        try {
            await addDoc(collection(db, "informes"), { texto: text, timestamp: serverTimestamp() });
            document.getElementById('informeText').value = ""; // Limpa o campo
            console.log("✅ Informe postado!");
            loadInformes(); // Atualiza a lista
        } catch (error) {
            console.error("❌ Erro ao postar informe:", error);
        }
    } else {
        alert("O informe não pode estar vazio!");
    }
}

// Função para carregar informes do Firestore
async function loadInformes() {
    try {
        const querySnapshot = await getDocs(collection(db, "informes"));
        const informeList = document.getElementById('informeList');
        informeList.innerHTML = ""; // Limpa a lista antes de carregar

        querySnapshot.forEach((doc) => {
            const item = document.createElement('div');
            item.classList.add('informeItem');
            item.textContent = doc.data().texto;
            informeList.appendChild(item);
        });

        console.log("📜 Informes carregados com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao carregar informes:", error);
    }
}

// Adiciona eventos aos botões de postagem
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('postDevocionalBtn').addEventListener('click', postDevocional);
    document.getElementById('postInformeBtn').addEventListener('click', postInforme);

    loadDevocionais();
    loadInformes();
});
