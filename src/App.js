import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './componentes/pages/Home';
import Sobre from './componentes/pages/Sobre';
import Contato from './componentes/pages/Contato';
import NovoProjeto from './componentes/pages/NovoProjeto';

import Container from './componentes/layout/Container';

import NavBar from './componentes/layout/NavBar';
import Footer from './componentes/layout/Footer';

import Projetos from './componentes/pages/Projetos';
import Projeto from './componentes/pages/Projeto';
import Login from './componentes/layout/Login';

function App() {
  return (
    <Login/>
    // <Router>
    //   <NavBar/>
    //   <Container customClass="min-height">
    //   <Routes>
    //     <Route path='/' element={<Home/>}/>
    //     <Route path='/sobre' element={<Sobre/>}/>
    //     <Route path='/contato' element={<Contato/>}/>
    //     <Route path='/projetos' element={<Projetos/>}/>
    //     <Route path='/novoprojeto' element={<NovoProjeto/>}/>
    //     <Route path='/projeto/:id' element={<Projeto/>}/>
    //   </Routes>
    //   </Container>
    //   <Footer/>
    // </Router>
  );
}

export default App;
