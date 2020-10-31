import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    });
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories',
    {
      title: `Novo Repositório ${Date.now()}`,
      url: "http://github.com/sovai",
      techs: [
        "Node.js",
        "Rails"
      ]
    })

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  function handleRemoveRepository(id) {
    api.delete('repositories/' + id );
    const newList = repositories.filter(repository => repository.id !== id) 

    setRepositories([...newList]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
