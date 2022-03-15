import React from 'react'

export default function UsersList({...props}) {
    const {users, setUsuarios} = props
    const handleBackButton = () =>{
        setUsuarios([])
    }
  return (
    <div>
      {users[0] && ( 
        <div>
          <ul>
            {users.map((usuario) => {
              return (
                <li>
                    {usuario.name} {usuario.birth} {usuario.cpf} 
              </li>
            )})}
          </ul>
          <button onClick={handleBackButton}>Voltar</button>
        </div>
        )}
    </div>
)}