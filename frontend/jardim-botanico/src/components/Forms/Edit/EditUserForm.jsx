import React, { useEffect, useState } from 'react';

import TextInput from '../../Inputs/TextInput/TextInput';
import TextArea from '../../Inputs/TextArea/TextArea';
import Button from '../../Button/Button';
import Toast from '../../Toast/Toast';
import '../style.css';

const EditUserForm = ({ userId }) => {
    const [toast, setToast] = useState({ visible: false, type: '', message: '' });

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        observacao: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/users/${userId}`);
                if (!res.ok) throw new Error('Erro ao buscar usuário');
                const data = await res.json();

                setFormData({
                    nome: data.nome || '',
                    email: data.email || '',
                    senha: data.senha || '',
                    observacao: data.observacao || '',
                });
            } catch (erro) {
                showToast('warning', 'Erro ao carregar dados do usuário');
                console.log(erro);
            }
        };
        fetchUser();
    }, [userId]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: false }));
    };

    const showToast = (type, message) => setToast({ visible: true, type, message });
    const hideToast = () => setToast({ ...toast, visible: false });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredFields = ['nome', 'email', 'senha'];
        const nweErros = requiredFields.reduce((acc, field) => {
            acc[field] = formData[field].trim() === '';
            return acc;
        }, {});
        if (Object.values(nweErros).some(Boolean)) {
            setErrors(nweErros);
            showToast('warning', 'Por favor preencha todos os campos obrigatórios');
            return;
        }

        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error('Erro ao editar usuário');

            showToast('succes', 'Usuário editado com sucesso !');
        } catch (error) {
            showToast('warning', 'Erro ao editar usuário');
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='form-container'>
                <div className='input-section'>
                    <h2>Dados do usuário</h2>
                    <TextInput
                        id='nome'
                        label='Nome'
                        value={formData.nome}
                        required
                        onChange={(e) => handleChange('nome', e.target.value)}
                        showError={errors.nome}
                    />
                    <TextInput
                        id='senha'
                        label='Senha'
                        value={formData.senha}
                        required
                        onChange={(e) => handleChange('nome', e.target.value)}
                        showError={errors.senha}
                    />
                    <TextArea
                        id='observacao'
                        label='Observacao'
                        value={formData.observacao}
                        onChange={(e) => handleChange('observacao', e.target.value)}
                        showError={errors.observacao}
                    />
                </div>

                <Button type='submit'>Enviar</Button>
            </form>
            <Toast type={toast.type} message={toast.message} visible={toast.visible} onClose={hideToast} />
        </div>
    );
};

export default EditUserForm;
