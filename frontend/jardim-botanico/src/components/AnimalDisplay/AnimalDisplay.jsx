// src/pages/AnimalView.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageDisplay from '../ImageDisplay/ImageDisplay';
import PlayAudio from '../PlayAudio/PlayAudio';
import ArticleDisplay from '../ArticleDisplay/ArticleDislpay';
import VideoDisplay from '../VideoDisplay/VideoDisplay';
import './style.css';

export default function AnimalDispay({ id }) {
    const navigate = useNavigate();
    const [animal, setAnimal] = useState(null);

    useEffect(() => {
        async function fetchAnimal() {
            try {
                const response = await fetch(`/api/animais/${id}`);
                if (!response.ok) {
                    throw new Error('Erro na requisição');
                }
                const data = await response.json();
                setAnimal(data);
            } catch (error) {
                console.error(error);
                alert('Erro ao buscar os dados do animal.');
                navigate(-1);
            }
        }

        fetchAnimal();
    }, [id, navigate]);

    function renderAnimalData(animal) {
        const labels = {
            nomePopular: 'Nome popular',
            nomeCientifico: 'Nome científico',
            nAcervo: 'Número do acervo',
            tamanho: 'Tamanho',
            porte: 'Porte',
            dieta: 'Dieta',
            comportamento: 'Comportamento',
            reproducao: 'Reprodução',
            habitat: 'Habitat',
            descricao: 'Descrição',
            reino: 'Reino',
            filo: 'Filo',
            classe: 'Classe',
            subclasse: 'Subclasse',
            ordem: 'Ordem',
            subordem: 'Subordem',
            familia: 'Família',
            subfamilia: 'Subfamília',
            genero: 'Gênero',
            subgenero: 'Subgênero',
            especie: 'Espécie',
        };
        return Object.keys(labels).map((key) => {
            const valor = animal[key];
            if (valor === null || valor === '' || valor === undefined) {
                return null;
            }
            return (
                <p key={key}>
                    <strong>{labels[key]}:</strong> {valor}
                </p>
            );
        });
    }

    return (
        <div className='animal-view-page'>
            {animal && (
                <div className='animal-view-container'>
                    <div className='animal-view-image'>
                        <ImageDisplay name={animal.nomePopular} image={animal.foto} />
                    </div>

                    <div className='animal-view-data'>
                        <div className='animal-info'>
                            {renderAnimalData(animal)}
                            <PlayAudio audio={animal.audio} />
                            <VideoDisplay link={animal.video} />
                            <ArticleDisplay animalId={animal.id} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
