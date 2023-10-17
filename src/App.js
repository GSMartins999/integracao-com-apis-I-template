import React, { useEffect, useState } from "react";
import AddUsuario from "./Componentes/AddUsuario/AddUsuario";
import Usuario from "./Componentes/Usuario/Usuario";
import axios from "axios";


function App() {
  const [usuarios, setUsuarios] = useState([])

  

  const getAllUsers = () => {
    axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users", {headers: { Authorization: "giovanni-souza-krexu"}})
    //O .then serve para nos retornar algo, no caso eles no retorno o .data da api.
    .then((response) => {
    setUsuarios(response.data)
  })
  //O ponto catch serve para tratarmos erros no nosso programa. É necessário colocar o .response após o parâmetro indicado
  .catch((error) =>{
    console.log(error.response)
  })}


  //Usamos o useEffect para retornamos uma função assim que abrimos a página
  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <>
      <p>Para esta aula usaremos a <a href="https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro" target="_blank" rel="noreferrer">API Labenusers</a></p>
      <AddUsuario getAllUsers={getAllUsers}/>
      <hr/>
      {usuarios.map((usuario) => {
        return <Usuario key={usuario.id} usuario={usuario} />
      })}
    </>
  )
}

export default App;
