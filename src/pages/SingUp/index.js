import { useState,useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";

export default function SignUp(){
    const [name , setNome] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const {signUp,loadingAuth } = useContext(AuthContext);

    async function handleSubmit(e){
        e.preventDefaut();

        if(name !== '' && Email !== '' && Password !== ''){
            await signUp(Email,Password,name)
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Nova Conta</h1>
                <input type="text" value={name} onChange={(e) => setNome(e.target.value)} />
                <input type="text" value={Email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={Password} onChange={(e) => setPassword} />
                <button type="submit">
                    {loadingAuth ? 'Carregando...' : 'cadastrar'}
                </button>
            </form>
    
            <Link to="/">Já possui uma conta? Faça login</Link>
        </div>
    );
}