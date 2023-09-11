import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";

import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, limit, startAfter, query } from 'firebase/firestore'
import { db } from "../../firebaseConnection";

const listRef = collection(db, "notas");

export default function Notas() {
    const { logout } = useContext(AuthContext)

    const [notas, setNotas] = useState([])
    const [loading, setLoading] = useState(true);

    const [isEmpty, setIsEmpty] = useState(false)
  const [lastDocs, setLastDocs] = useState()

    useEffect(() => {
        async function loadChamados() {
            const q = query(listRef);

            const querySnapshot = await getDocs(q);
            setNotas([]);

            await updateState(querySnapshot);

            setLoading(false);
        }

        loadChamados();

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

            setNotas(notas => [...notas,...lista])
            setLastDocs(lastDoc);

        }
        else{
            setIsEmpty(true);
        }

        
    }
    if(loading){
        return(
            <div>
                Buscando notas...
            </div>
        )
    }

    return(
        <div>
            <Link to={"/CriarNota"}>Nova nota</Link>
            <>
            {notas.length === 0 ? (
                <div>
                    Nenhuma nota encontrado
                </div>
            ) : (
            <table>
                <tbody>
                    {notas.map((item,index)=>{
                        return(
                            <tr key={index}>
                                <td data-label="Titulo">{item.titulo}</td>
                                <td data-label="Conteudo">{item.conteudo}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            )}
            </>
        </div>
    )

}