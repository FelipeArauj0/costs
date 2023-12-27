import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './componentes/pages/Home';
import Sobre from './componentes/pages/Sobre';
import Contato from './componentes/pages/Contato';
import NovoProjeto from './componentes/pages/NovoProjeto';

import Container from './componentes/layout/Container';

import NavBar from './componentes/layout/NavBar';
import Footer from './componentes/layout/Footer';

import Projetos from './componentes/pages/Projetos';

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={
          <Container customClass="min-height">
            <Home/>
          </Container>
        }/>
        <Route path='/sobre' element={
          <Container customClass="min-height">
            <Sobre/>
          </Container>} 
        />
        <Route path='/contato' element={
          <Container customClass="min-height">
            <Contato/>
          </Container>}
        />
        <Route path='/projetos' element={
          <Container customClass="min-height">
            <Projetos/>
          </Container>}
        />
        <Route path='/novoprojeto' element={
          <Container customClass="min-height">
            <NovoProjeto/>
          </Container>}
        />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
