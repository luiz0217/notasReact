import {Routes, Route} from 'react-router-dom';

import SignUp from "../pages/SingUp";
import Signin from "../pages/Signin";
import CriarNota from "../pages/CriarNota"
import Notas from "../pages/Notas"

import Private from './Private';

function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={<Signin/>} />
            <Route path="/registrar" element={<SignUp/>} />
            <Route path='/dashboard' element={<Private><Notas/></Private>}/>
            <Route path='/CriarNota' element={<Private><CriarNota/></Private>}/>
        </Routes>
    );
}

export default RoutesApp;