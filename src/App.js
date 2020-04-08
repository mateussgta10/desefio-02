import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  /** */
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);
  /** */


  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories', {
        title:`JS Projeto ${Date.now()}`,
        techs:["JS"],
        likes: 0
    });

    const Repository = response.data;
    setRepositories([...repositories,Repository]);
  }


  async function handleRemoveRepository(id) {
      await api.delete(`/repositories/${id}`);
      // const Repository = response.data;
      // setRepositories([...repositories,Repository]);
      setRepositories(repositories.filter(repository => repository.id !== id));

  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(item => (
          <li key={item.id}>
            {item.title}

            <button onClick={() => handleRemoveRepository(item.id)}>
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
