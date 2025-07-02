import React from 'react';
import { useState } from 'react';
import TextInput from '../../Inputs/TextInput/TextInput';
import TextArea from '../../Inputs/TextArea/TextArea';
import Toast from '../../Toast/Toast';
import Button from '../../Button/Button';
import '../style.css';

const CreateUserForm = () => {
    const [toast, setToast] = useState({ visible: false, type: '', message: '' });
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        observacao: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: false }));
    };

    const showToast = (type, message) => setToast({ visible: true, type, message });
    const hideToast = () => setToast({ ...toast, visible: false });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredFields = ['nome', 'email', 'senha'];

        const newErrors = requiredFields.reduce((acc, field) => {
            acc[field] = formData[field].trim() === '';
            return acc;
        }, {});

        if (Object.values(newErrors).some(Boolean)) {
            setErrors(newErrors);
            showToast('warning', 'Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error('Erro ao criar usuário');

            showToast('success', 'Usuário criado com sucesso!');

            setFormData({
                nome: '',
                email: '',
                senha: '',
                observacao: '',
            });
            setErrors({});
        } catch (error) {
            showToast('warning', 'Erro ao criar usuário!');
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
                        id='email'
                        label='Email'
                        value={formData.email}
                        required
                        onChange={(e) => handleChange('email', e.target.value)}
                        showError={errors.email}
                    />
                    <TextInput
                        id='senha'
                        label='Senha'
                        value={formData.senha}
                        required
                        onChange={(e) => handleChange('senha', e.target.value)}
                        showError={errors.senha}
                    />
                    <TextArea
                        id='observacao'
                        label='Observação'
                        value={formData.observacao}
                        onChange={(e) => handleChange('observacao', e.target.value)}
                        showError={errors.observacao}
                    />

                    <br />
                    <Button type='submit'>Enviar</Button>
                </div>
            </form>

            <Toast
                type={toast.type}
                message={toast.message}
                visible={toast.visible}
                onClose={hideToast}
            />
        </div>
    );
};

export default CreateUserForm;
