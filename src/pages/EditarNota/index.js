import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { db } from "../../firebaseConnection";
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, orderBy, limit, startAfter, query, onSnapshot } from "firebase/firestore";

import { toast } from "react-toastify";

import { Link } from "react-router-dom";


export default function EditarNota() {

    const queryParameters = new URLSearchParams(window.location.search)
    const Id = queryParameters.get("id")
    console.log(Id);


    const [conteudo, setConteudo] = useState('');
    const [titulo, setTitulo] = useState('');

    //const [notas, setNotas] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadNote(id) {
            const docRef = doc(db, "notas", id);
            setLoading(true);
            onSnapshot(docRef, (snapshot) => {
                if (snapshot.exists()) {
                    const noteData = snapshot.data();
                    setTitulo(noteData.titulo);
                    setConteudo(noteData.conteudo);

                    setLoading(false);
                } else {
                    // Handle the case where the document does not exist
                    setLoading(false);
                }
            });
        }

        loadNote(Id);

        return () => { }
    }, [])


    async function editarNota(id,e) {
            e.preventDefault();
            const docRef = doc(db, "notas",id);
            
            await updateDoc(docRef, {
                titulo: titulo,
                conteudo: conteudo,
            })
                .then(() => {
                    console.log("Notas Atualizado");
                    setTitulo("");
                    setConteudo("");
                })
                .catch((error) => {
                    console.log(error);
                });
        

    }


    return (
        <div>
            <form>

                <h1>Titulo</h1>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <h1>Conteúdo</h1>
                <input
                    type="text"
                    value={conteudo}
                    onChange={(e) => setConteudo(e.target.value)}
                />
                <br />
                <button onClick={(e) => editarNota(Id,e)}>Editar</button>

            </form>

            <Link to="/dashboard">Voltar</Link>
        </div>
    );


}
