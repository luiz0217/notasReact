import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";

import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, limit, startAfter, quer, onSnapshot } from 'firebase/firestore'
import { db } from "../../firebaseConnection";

const listRef = collection(db, "notas");

export default function Notas() {
    const { logout } = useContext(AuthContext)

    const [notas, setNotas] = useState([])
    const [loading, setLoading] = useState(true);

    const [isEmpty, setIsEmpty] = useState(false)
    const [lastDocs, setLastDocs] = useState()

    useEffect(() => {
        async function loadNotes() {
            setLoading(true)
            onSnapshot(collection(db, "notas"), (snapshot) => {
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

        loadNotes();

        return () => { }
    }, [])


    async function updateState(querySnapshot) {
        const isCollectionEmpty = querySnapshot.size === 0;

        if (!isCollectionEmpty) {
            let lista = [];

            querySnapshot.forEach((doc) => {
                lista.push({
                    titulo: doc.titulo,
                    conteudo: doc.conteudo,
                })
            });

            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]

            setNotas(notas => [...notas, ...lista])
            setLastDocs(lastDoc);

        }
        else {
            setIsEmpty(true);
        }


    }
    if (loading) {
        return (
            <div>
                Buscando notas...
            </div>
        )
    }

    return (
        <div>
            <Link to={"/CriarNota"}><h1>Nova nota</h1></Link>
            <>
                {notas.length === 0 ? (
                    <div>
                        Nenhuma nota encontrada... Tente criar uma!
                    </div>
                ) : (
                    <table>
                        <tbody>
                            {notas.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td data-label="Titulo">{item.titulo}</td>
                                        <a href={"editar?id="+item.id}><p>Visualizar</p></a>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </>
        </div >
    )

}