import React, { createContext, useContext, useEffect, useState } from 'react';
import instance from '../Conexao-API/Axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)  
  const [message, setMessage] = useState('')
  const [type, setType] = useState()
  
  const signin = async ({email, senha})=>{

    try {
      const response = await instance.post("/login",{
          email,
          senha
      })
      console.log('responseresponse: ',response)
      const token = response.data.token
      setUser(response.data)
      
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`
      
      localStorage.setItem("@Auth:token", token)
      localStorage.setItem("@Auth:user", JSON.stringify(response.data))
    } catch (err) {
      if(err.response.status !== 200 || err.response.status !== 500){
        return {
        menssagem: err.response.data.menssagem,
        type: 'error'
      }
    }

      if(err.response.status === 500){
          return console.log(err.response.data)
      } else {
        return (
          {
            menssagem: err.response.data.menssagem,
            type: 'error'
        }
          
        )

      }
    }
      
  }
  

  const signout = () => {
    // Limpe as informações de autenticação
    setUser(null);
    localStorage.removeItem('@Auth:token');
    localStorage.removeItem('@Auth:user');

    // Redirecione o usuário para a página de login
    window.location.href = '/login';
  };
    useEffect(()=>{
      const loadingStoredData = async ()=>{
        const storedUser = localStorage.getItem("@Auth:user");
        const storedToken = localStorage.getItem("@Auth:token");

        if(storedUser && storedToken){
          setUser(JSON.parse(storedUser))
        }
      }
      loadingStoredData()
    }, [])
    
    const authContextValue = {
      user,
      signed: !!user,
      signin,
      signout
    };
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
