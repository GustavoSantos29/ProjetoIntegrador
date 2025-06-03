import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../Dropdowns/Dropdown';
import './style.css'
export default function AnimalList() {
  const [animais, setAnimais] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAnimais() {
      try {
        const response = await fetch('/api/animais');
        const data = await response.json();
        setAnimais(data);
        console.log(data);
      } catch (error) {
        console.error(error);
        alert('Erro ao buscar a lista de animais.');
        navigate(-1);
      }
    }

    fetchAnimais();
  }, []);

  function handleVisualizar(id) {
    navigate(`/animal/${id}`);
  }

  function handleEditar(id) {
      navigate(`/animal/edit/${id}`);
  }

  async function handleExcluir(id) {
    console.log("EXCLUIR", id);
    // const confirmDelete = window.confirm('Deseja realmente excluir este animal?');
    // if (!confirmDelete) return;

    // try {
    //   await fetch(`/api/animais/${id}`, { method: 'DELETE' });
    //   setAnimais((prev) => prev.filter((a) => a.id !== id));
    //   alert('Animal excluído com sucesso!');
    // } catch (error) {
    //   alert('Erro ao excluir o animal.');
    // }
  }

  return (
    <div className="animal-list-container" >
      {animais.map((animal) => (
        <Dropdown 
          key={animal.id} 
          name={animal.nomePopular} 
          onView={() => handleVisualizar(animal.id)} 
          onDelete={() => handleExcluir(animal.id)} 
          onEdit={() => handleEditar(animal.id)} 
        />
      ))}
    </div>
  );
}
