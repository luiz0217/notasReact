import { useState,useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth"
import '../../index.css';

export default function Signin() {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const {signIn,loadingAuth} = useContext(AuthContext);

    async function handleSignIn(e) {
        e.preventDefault();

        if (Email !== '' && Password !== '') {
            await signIn(Email,Password);
        }
    }

    return(
      <div>
        <form onSubmit={handleSignIn}>
          <div>
            <h1>Entrar</h1>
            <p>E-mail</p>
            <input type="text" value={Email} onChange={(e) => setEmail(e.target.value)} />
            <p>Senha</p>
            <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} />
            <br/>
            <button type="submit">
              {loadingAuth ? "Carregando..." : "Acessar"}
            </button>
            <br/>
            <Link to="/registrar"> Criar uma conta</Link>
          </div>
        </form>
        
        
      </div>
    )
}