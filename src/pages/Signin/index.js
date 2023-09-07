import { useState,useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth"

export default function Signin() {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const {signIn,loadingAuth} = useContext(AuthContext);

    async function handleSignIn(e) {
        e.preventDefault();

        if (Email !== '' && password !== '') {
            await signIn(Email,password);
        }
    }

    return(
      <div>
        <form onSubmit={handleSignIn}>
          <h1>Entrar</h1>
          <input type="text" value={Email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">
            {loadingAuth ? "Carregando..." : "Acessar"}
          </button>
        </form>

        <Link to="/registrar"> Criar uma conta</Link>
      </div>
    )
}