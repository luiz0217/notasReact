import {Routes, Route} from 'react-router-dom';

import SignUp from "../pages/SingUp";
import Signin from "../pages/Signin";
//import CriarNota from "../pages/CriarNota";
//import Nota from "../pages/Notas";

import Private from './Private';

function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={<Signin/>} />
            <Route path="/register" element={<SignUp/>} />
        </Routes>
    );
}

export default RoutesApp;