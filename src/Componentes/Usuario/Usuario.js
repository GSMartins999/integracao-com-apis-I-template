import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";

const User = styled.div`
  border: black 1px solid;
  margin-top: 8px;
  width: 350px;
  padding: 8px;
`
function Usuario(props) {
  const [usuario, setUsuario] = useState(props.usuario);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editar, setEditar] = useState(false);
   
  const body = {
    name: nome,
    email: email
  }

  const headers = {headers: {Authorization: "giovanni-souza-krexu"}}
  const getUserById = () => {
    axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`, headers)
    .then((response) => {
      setUsuario(response.data)
    })
    .catch((error) => {
      console.log(error.response)
    })
  }
  const editarUser = () => {
    axios.put(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`, body, { headers: {Authorization: "giovanni-souza-krexu"}})
    .then(()=>{
      alert("Alteração feita com sucesso!!")
      setNome("")
      setEmail("")
      props.getAllUsers()
    })
    .catch((error) => {
      console.log(error.response)
    })
  }
  useEffect(() => {
    getUserById()
  }, [])

  const excluirUser = () => {
    axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`, { headers: {Authorization: "giovanni-souza-krexu"}})
    .then(()=>{
      alert("Excluido com sucesso!!")
      props.getAllUsers()
    })
    .catch((error) => {
      console.log(error.response)
    })
  }
  useEffect(() => {
    getUserById()
  }, [])

  
  return (
    <User>
      {editar ? (
        <div>
          <p>Nome: {usuario.name}</p>
          <p>E-mail: {usuario.email}</p>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={editarUser}>Enviar alterações</button>
        </div>
      ) : (
        <>
          <p><strong>Nome:</strong> {usuario.name}</p>
          <p><strong>E-mail:</strong> {usuario.email}</p>
        </>
      )}
      <button onClick={() => setEditar(!editar)}>Editar</button>
      <button onClick={excluirUser}>Excluir</button>
    </User>
  );
}

export default Usuario;
