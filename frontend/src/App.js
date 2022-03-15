import "./App.css"
import { useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import UsersList from "./components/UsersList"

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [name, setName] = useState("")
  const [cpf, setCpf] = useState("")
  const [birth, setBirth] = useState("")

  const handleButtonClick = () => {
    axios.get("http://localhost:1234/user").then((el) => {
      setUsuarios(el.data.resultados)
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const response = await axios.post("http://localhost:1234/register", {
      name,
      cpf,
      birth,
    })

    if (response.data.codigoErro) {
      notify(response.data.mensagem, "error")
    } else {
      notify("Cadastrado com sucesso", "success")
    }
  }

  const notify = (message, type) => {
    if (type === "error") {
      toast.error(message)
    } else {
      toast.success(message)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          <ToastContainer />
        </div>
        <UsersList users={usuarios}
        setUsuarios = {setUsuarios}/>
        {!usuarios.length && (<div className="register">
        <h1 className="title"> Cadastro de Usuários </h1>
        <form className="forms" onSubmit={handleFormSubmit}>
          <input type="text" name="name" placeholder="Nome Completo" onKeyUp={(e) => setName(e.target.value)}></input>
          <input type="text" name="cpf" placeholder="CPF" onKeyUp={(e) => setCpf(e.target.value)}></input>
          <input type="text" name="birth" placeholder="Data de Nascimento" onKeyUp={(e) => setBirth(e.target.value)}></input>
          <input type="submit" value="Registrar" />
        </form>
        <button onClick={handleButtonClick}>Listar Usuários</button>
        </div>)}  
      </header>
    </div>
  )
}

export default App