import React from 'react';
import Dropdown from '../Dropdowns/Dropdown';
import Button from '../Button/Button';
import Toast from '../Toast/Toast';
import DeleteModal from '../Modal/DeleteModal';
import { useAuth } from '../../context/AuthContext/AuthProvider';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListUsers = () => {
    const { isAdmin } = useAuth();
    const [toast, setToast] = useState({ visible: false, type: '', message: '' });
    const showToast = (type, message) => setToast({ visible: true, type, message });
    const hideToast = () => setToast({ ...toast, visible: false });
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [nameToDelete, setNameToDelete] = useState(null);

    const [users, setUsers] = useState([]);

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
        navigate(`/users/${id}`);
    }

    function handleEditar(id) {
        navigate(`/users/edit/${id}`);
    }

    function handleCreate() {
        navigate('/users/create');
    }
    function handleAnimals() {
        navigate('/');
    }

    async function handleExcluir() {
         const id = idToDelete;
         setModalVisible(false);
         setIdToDelete(null);
         const token = sessionStorage.getItem('token');
         try {
          await fetch(`/api/users/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
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
            <div className='button-section'>
                {isAdmin && (
                    <Button
                        type='sumit'
                        children='Gerenciar animáis'
                        className='button-create reset'
                        onClick={() => handleAnimals()}
                    />
                )}
                <Button
                    type='sumit'
                    children='Criar usuário'
                    className='button-create'
                    onClick={() => handleCreate()}
                />
            </div>
            {users.map((user) => (
                <Dropdown
                    key={user.id}
                    type='usuários'
                    name={user.nome}
                    onView={() => handleVisualizar(user.id)}
                    onDelete={() => confirmExcluir(user.id, user.nome)}
                    onEdit={() => handleEditar(user.id)}
                />
            ))}
            {users.length == 0 && <p>Nenhum usuário cadastrado</p>}
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
