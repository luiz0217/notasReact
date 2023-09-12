import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { db } from "../../firebaseConnection";
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, orderBy, limit, startAfter, query, onSnapshot } from "firebase/firestore";

import { toast } from "react-toastify";

import { Link } from "react-router-dom";


export default function EditarNota() {

    const queryParameters = new URLSearchParams(window.location.search)
    const Id = queryParameters.get("id")



    const [conteudo, setConteudo] = useState('');
    const [titulo, setTitulo] = useState('');

    const [notas, setNotas] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadNote(id) {
            const docRef = doc(db, "notas", id);
            setLoading(true);
            onSnapshot(docRef, (snapshot) => {
                if (snapshot.exists()) {
                    const noteData = snapshot.data();
                    setNotas({
                        id: snapshot.id,
                        titulo: noteData.titulo,
                        conteudo: noteData.conteudo,
                        });
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


    async function editarNota(id) {
        if (notas !== null){
            const docRef = doc(db, "notas", id);
    
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

    }


    return (
        <div>
            <form onSubmit={() => editarNota(notas.id)}>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <input
                    type="text"
                    value={conteudo}
                    onChange={(e) => setConteudo(e.target.value)}
                />
                <button type="submit">Editar</button>
            </form>

            <Link to="/dashboard">Voltar</Link>
        </div>
    );


}
