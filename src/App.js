import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";


function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {             
      setRepositories(response.data);   
    });    
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories",
      {
        title:`Desafio React ${Date.now()}`,
        url: "http://github.com/david/perfil-david",
        techs: [
          "React",
          "React Native",
          "Node.js"
        ]
      }
    );
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    console.log(response)
    if(response.status == 204){
      var deleteElement = document.getElementById(id);
      deleteElement.remove();
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => 
        <li key={repository.id} id={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
