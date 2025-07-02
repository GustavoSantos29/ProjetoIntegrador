import React, { useEffect, useState } from 'react';
import './style.css'
const ArticleDisplay = ({ animalId }) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch(`/api/artigos/${animalId}`, {
                    credentials: 'include',
                });
                if (!res.ok) throw new Error('Erro ao buscar artigos');
                const data = await res.json();
                setArticles(data);
            } catch (error) {
                console.error('Erro ao carregar artigos:', error);
            }
        };

        fetchArticles();
    }, [animalId]);

    if (articles.length === 0) return null;

    return (
        <div className='article-display'>
            <h3>Artigos relacionados:</h3>
            <ul className='article-list'>
                {articles.map((art) => (
                    <li key={art.id}>
                        <a
                            href={art.link.startsWith('http') ? art.link : `https://${art.link}`}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            {art.nome}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArticleDisplay;
