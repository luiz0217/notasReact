import { useState,useEffect,useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { db } from "../../firebaseConnection";
import { collection,getDocs,getDoc,doc,addDoc,updateDoc } from "firebase/firestore";
import { useParams,useNavigate } from "react-router-dom";
import { Toast } from "react-toastify/dist/components";

const listRef = collection(db,'notas');

export default function CriarNota(){
    const navigate = useNavigate();

    const [conteudo,setConteudo] = useState('');
    const [titulo,setTitulo] = useState('');
    const [idNotas,setIdNotas] = useState(false);

    async function LoadID(Lista){
        const docRef = doc(db,"notas",id);
        await getDoc(docRef).then((snpshot) => {
            setConteudo(snpshot.data().assunto);
            setTitulo(snpshot.data().titulo);

            let index = Lista.findIndex(item => item.id === snpshot.data().idNotas);
            setIdNotas(true);

            
        }).catch((error) =>{
            console.log(error);
            setIdNotas(false);
        })
    }


    async function handleRegister(e){
        e.preventDefault();

        if(idNotas){
            
        }
    }
}