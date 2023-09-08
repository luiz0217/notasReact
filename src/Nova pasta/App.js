import {useState, useEffect} from 'react';
import {db, auth} from './firebaseConnection';

import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';

import{
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
}from 'firebase/auth';

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idPost, setIdPost] = useState('');

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [posts, setPosts] = useState('');

  useEffect(() => {
    async function consultarPosts(){
      const dados = onSnapshot(collection(db, 'posts'), (snapshot) => {
        let listaPosts = [];
        snapshot.forEach((doc) => {
          listaPosts.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          })
        })
        setPosts(listaPosts);
      })
    }
    consultarPosts();
  }, [])

  async function adicionarPost(){
    await addDoc(collection(db, 'posts'), {
      titulo: titulo,
      autor: autor
    }).then(() => {
      setIdPost('');
      setTitulo('');
      setAutor('');
    }).catch((error) => {
      console.log(error);
    })
  }

  async function buscarPost(id){
    const postsReferencia = collection(db,"post");
    await getDocs(postsReferencia).then((snapshot) => {
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor
        })
      })
      setPosts(lista); 
    }).catch((error) => {
      console.log(error);
    })
  }

  async function editarPost(id){
    const dados = doc(db, 'post', idPost);
    
    await updateDoc(dados, {
      titulo: titulo,
      autor: autor
    }).then(() => {
      setIdPost('');
      setTitulo('');
      setAutor('');
    }).catch((error) => {
      console.log(error);
    })
  }

  async function excluirPost(id){
    const dados = doc(db, 'post', idPost);
    await deleteDoc(dados).then(() => {
      alert('Post excluído com sucesso!');
    })
  }

  return(
    <container>
      <h1>Blog</h1>
      <div>
        <label>Título</label>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      </div>
      <div>
        <label>Autor</label>
        <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} />
      </div>
      <div>
        <button onClick={adicionarPost}>Adicionar</button>
      </div>
      <h1>Lista de Posts</h1>
      <div>
        <ul>
          {posts && posts.map((item, index) => {})}
        </ul>
      </div>
      <div>
        <label>ID</label>
        <input type="text" value={idPost} onChange={(e) => setIdPost(e.target.value)} />
      </div>
      <div>
        <button onClick={buscarPost}>Buscar</button>
      </div>
      <div>
        <button onClick={editarPost}>Editar</button>
      </div>
      <div>
        <button onClick={excluirPost}>Excluir</button>
      </div>
      <h1>Posts</h1>
      <div>
        <ul>
          {posts && posts.map((item, index) => {
            return(
              <li key={index}>
                <span>Autor: {item.autor}</span>
                <br></br>
                <span>Título: {item.titulo}</span>
                
              </li>
            )
          })}
        </ul>
      </div>

      

    </container>
  );
  
}

export default App;