import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import TextInput from '../Inputs/TextInput/TextInput';
import Button from '../Button/Button';
import './style.css';

const AnimalSearch = () => {
    const navigate = useNavigate();
    const [todosAnimais, setTodosAnimais] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [visiveis, setVisiveis] = useState(3);

    useEffect(() => {
        fetch('/api/animais/animais-nomes')
            .then((res) => res.json())
            .then((data) => {
                setTodosAnimais(data);
            })
            .catch((err) => console.error('Erro ao buscar animais:', err));
    }, []);

    function handleVisualizar(id) {
        navigate(`/animal/${id}`);
    }

    const buscaFuzzy = (nome, filtro) => {
        return nome.toLowerCase().includes(filtro.toLowerCase());
    };

    const animaisFiltrados = todosAnimais.filter((animal) =>
        buscaFuzzy(animal.nomePopular, filtro)
    );

    const animaisExibidos = animaisFiltrados.slice(0, visiveis);

    return (
        <div className='animal-search'>
            <h2 className='titulo'>Buscar Animais</h2>

            <TextInput
                className='search'
                type='text'
                value={filtro}
                onChange={(e) => {
                    setFiltro(e.target.value);
                    setVisiveis(10);
                }}
                label='Digite o nome do animal...'
            />

            <ul className='lista-animais'>
                {animaisExibidos.map((animal) => (
                    <li
                        key={animal.id}
                        className='item-animal'
                        onClick={() => handleVisualizar(animal.id)}
                    >
                        {animal.nomePopular}
                    </li>
                ))}
            </ul>

            {animaisFiltrados.length === 0 && (
                <p className='nenhum-resultado'>Nenhum animal encontrado.</p>
            )}

            {visiveis < animaisFiltrados.length && (
                <Button onClick={() => setVisiveis(visiveis + 10)} className='load'>
                    Carregar mais
                </Button>
            )}
        </div>
    );
};

export default AnimalSearch;
