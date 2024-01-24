import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './componentes/layout/NavBar';
import Container from './componentes/layout/Container';
import Footer from './componentes/layout/Footer';
import Home from './componentes/pages/Home';
import Sobre from './componentes/pages/Sobre';
import Contato from './componentes/pages/Contato';
import Projetos from './componentes/pages/Projetos';
import NovoProjeto from './componentes/pages/NovoProjeto';
import Projeto from './componentes/pages/Projeto';
import Login from './componentes/pages/Login';  // Importe a página de login
import Cadastrar from './componentes/pages/CadastrarUsuario';  // Importe a página de cadastro
import { AuthProvider } from './Auth/AuthContext';


function App() {
  // const isAuthenticated = true
  return (
    <Router>
      <AuthProvider>
      <NavBar/>       
        <Container customClass="min-height">
          <Routes>
            {/* Rotas públicas acessíveis a todos */}
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />

            {/* Página de login e cadastro como rotas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/cadastrar" element={<Cadastrar />} />
            
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/novoprojeto" element={<NovoProjeto />} />
            <Route path="/projeto/:id" element={<Projeto />} />
                        
          </Routes>
        </Container>
        <Footer/>
      </AuthProvider>
    </Router>
  );
}

export default App;
