// src/pages/AnimalView.jsx
import { use, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ImageDisplay from '../ImageDisplay/ImageDisplay';
import PlayAudio from '../PlayAudio/PlayAudio';
import './style.css';
import VideoDisplay from '../VideoDisplay/VideoDisplay';

export default function AnimalDispay({id}) {
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
                navigate(-1); // Volta pra tela anterior
            }
        }

        fetchAnimal();
    }, [id, navigate]);

    function renderAnimalData(animal) {
        const labels = {
          nomePopular: 'Nome popular',
          nomeCientifico: 'Nome científico',
          tamanho: 'Tamanho',
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
          especie: 'Espécie'
        }
        console.log(animal.audio);
        return Object.keys(labels).map((key) => {
          const valor = animal[key]
          if (valor === null || valor === '' || valor === undefined) {
            return null
          }
          return (
            <p key={key}>
              <strong>{labels[key]}:</strong> {valor}
            </p>
          )
        })
      }
      

      return (
        <div className="animal-view-page">
          {animal && (
            <div className="animal-view-container">
              <div className="animal-view-image">
                <ImageDisplay name={animal.nomePopular} image={animal.foto} />
              </div>
      
              <div className="animal-view-data">
                <div className="animal-info">
                  {renderAnimalData(animal)}
                  <PlayAudio audio={animal.audio} />
                  <VideoDisplay link={animal.video} />
                </div>
                
              </div>
            </div>
          )}
        </div>
      );
      
}
