import React, { use } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './style.css'
export default function UserDisplay({ id }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`/api/users/${id}`);
                if (!response.ok) {
                    throw new Error('Erro na requisição');
                }
                const data = await response.json();
                setUser(data);
            } catch (erro) {
                console.log(erro);
                alert('Erro ao buscar os dados do usuário');
                navigate(-1);
            }
        }

        fetchUser();
    }, [id, navigate]);

    function renderUserData(user) {
        const labels = {
            nome: 'Nome',
            email: 'Email',
            observacao: 'Observacao',
        };
        return Object.keys(labels).map((key) => {
            const valor = user[key];
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
        <div className='user-view-page'>
            {user && <div className='user-view-container'>{renderUserData(user)} </div>}
        </div>
    );
}
