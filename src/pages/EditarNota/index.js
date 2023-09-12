import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { db } from "../../firebaseConnection";
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, orderBy, limit, startAfter, quer, onSnapshot } from "firebase/firestore";

import { toast } from "react-toastify";

import { Link } from "react-router-dom";


export default function EditarNota() {

    const queryParameters = new URLSearchParams(window.location.search)
    const Id = queryParameters.get("id")



    const [conteudo, setConteudo] = useState('');
    const [titulo, setTitulo] = useState('');

    const [notas, setNotas] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadNotes(id) {
            const docRef = doc(db, "notas", id);
            setLoading(true)
            onSnapshot(docRef, (snapshot) => {
                const listNotes = []
                snapshot.forEach((doc) => {
                    listNotes.push({
                        id: doc.id,
                        titulo: doc.data().titulo,
                        conteudo: doc.data().conteudo
                    })

                })
                setNotas(listNotes)
                setLoading(false)
            })
        }

        loadNotes(Id);

        return () => { }
    }, [])


    async function editarNotas(id) {
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


    return (
        <div>
            {notas.map((item, index) => {
                return (
                    <form onSubmit={editarNotas(index)}>
                        <input type="text" value={item.titulo} onChange={(e) => setTitulo(e.target.value)} />
                        <input type="text" value={item.conteudo} onChange={(e) => setConteudo(e.target.value)} />
                        <button type="submit">Editar</button>
                    </form>
                )
            })}

            <Link to="/dashboard">Voltar</Link>
        </div>
    );


}
