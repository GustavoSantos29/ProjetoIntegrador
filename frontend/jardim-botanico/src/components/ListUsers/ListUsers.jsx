import React from 'react';
import Dropdown from '../Dropdowns/Dropdown';
import Button from '../Button/Button';
import Toast from '../Toast/Toast';
import DeleteModal from '../Modal/DeleteModal';
import TextInput from '../Inputs/TextInput/TextInput';
import { useAuth } from '../../context/AuthContext/AuthProvider';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListUsers = () => {
    const { setIsAuthenticated, setIsAdmin } = useAuth();
    const [toast, setToast] = useState({ visible: false, type: '', message: '' });
    const showToast = (type, message) => setToast({ visible: true, type, message });
    const hideToast = () => setToast({ ...toast, visible: false });
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [nameToDelete, setNameToDelete] = useState(null);
    const [users, setUsers] = useState([]);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        async function fetchUsers() {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch('/api/users', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error(error);
                alert('Erro ao buscar a lista de usuários.');
                navigate(-1);
            }
        }

        fetchUsers();
    }, []);

    const buscaFuzzy = (nome, filtro) => {
        return nome.toLowerCase().includes(filtro.toLowerCase());
    };

    const usuariosFiltrados = users.filter((user) => buscaFuzzy(user.nome, filtro));

    function cancelExcluir() {
        setModalVisible(false);
        setIdToDelete(null);
    }

    async function confirmExcluir(id, name) {
        setModalVisible(true);
        setIdToDelete(id);
        setNameToDelete(name);
    }

    function handleVisualizar(id) {
        navigate(`/user/${id}`);
    }

    function handleEditar(id) {
        navigate(`/user/edit/${id}`);
    }

    function handleCreate() {
        navigate('/user/create');
    }
    function handleAnimals() {
        navigate('/animais');
    }

    async function logOut() {
        try {
            await fetch(`/api/users/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            setIsAuthenticated(false);
            setIsAdmin(false);
            navigate('/');
        } catch (error) {
            showToast('warning', 'Erro ao deslogar');
        }
    }

    async function handleExcluir() {
        const id = idToDelete;
        setModalVisible(false);
        setIdToDelete(null);
        try {
            await fetch(`/api/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }).catch(() => {});

            setUsers((prev) => prev.filter((u) => u.id !== id));
            showToast('success', 'Usuário excluído com sucesso!');
        } catch (error) {
            showToast('warning', 'Erro ao excluir usuário!');
        }
        console.log('exlcuir');
    }

    return (
        <div className='animal-list-container'>
            <div className='top-section'>
                <div className='button-section'>
                    <Button
                        type='sumit'
                        children='Sair'
                        className='reset'
                        onClick={() => logOut()}
                    />

                    <Button
                        type='sumit'
                        children='Gerenciar animais'
                        className='reset'
                        onClick={() => handleAnimals()}
                    />

                    <Button
                        type='sumit'
                        children='Criar usuário'
                        className='button-create'
                        onClick={() => handleCreate()}
                    />
                </div>
                <div className='search-section'>
                    <TextInput
                        type='text'
                        className='search'
                        style={{ margin: 0 }}
                        value={filtro}
                        onChange={(e) => {
                            setFiltro(e.target.value);
                        }}
                        label='Buscar usuários'
                    />
                </div>
            </div>
            {users
                .filter((user) => buscaFuzzy(user.nome, filtro))
                .map((user) => (
                    <Dropdown
                        key={user.id}
                        type='usuários'
                        name={user.nome}
                        onView={() => handleVisualizar(user.id)}
                        onDelete={() => confirmExcluir(user.id, user.nome)}
                        onEdit={() => handleEditar(user.id)}
                    />
                ))}
            {users.length == 0 ||
                (usuariosFiltrados.length === 0 && (
                    <p className='not-found'>Nenhum usuário encontrado</p>
                ))}
            <Toast
                type={toast.type}
                message={toast.message}
                visible={toast.visible}
                onClose={hideToast}
            />
            {modalVisible && (
                <DeleteModal
                    visible={modalVisible}
                    children={nameToDelete}
                    onConfirm={handleExcluir}
                    onCancel={cancelExcluir}
                />
            )}
        </div>
    );
};

export default ListUsers;
