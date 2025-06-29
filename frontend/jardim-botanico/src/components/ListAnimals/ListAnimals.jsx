import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../Dropdowns/Dropdown';
import Toast from '../Toast/Toast';
import DeleteModal from '../Modal/DeleteModal';
import Button from '../Button/Button';
import QrcodeDisplay from '../QrcodeDisplay/QrcodeDisplay';
import { useAuth } from '../../context/AuthContext/AuthProvider';
import './style.css';

export default function AnimalList() {
    const { isAdmin } = useAuth();
    const [toast, setToast] = useState({ visible: false, type: '', message: '' });
    const showToast = (type, message) => setToast({ visible: true, type, message });
    const hideToast = () => setToast({ ...toast, visible: false });
    const [showQr, setShowQr] = useState(false);
    const [qrUrl, setQrUrl] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [nameToDelete, setNameToDelete] = useState(null);

    const [animais, setAnimais] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAnimais() {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch('/api/animais', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await response.json();
                setAnimais(data);
            } catch (error) {
                console.error(error);
                alert('Erro ao buscar a lista de animais.');
                navigate(-1);
            }
        }

        fetchAnimais();
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
        navigate(`/animal/${id}`);
    }

    function handleEditar(id) {
        navigate(`/animal/edit/${id}`);
    }

    function handleCreate() {
        navigate('/create');
    }

    async function handleExcluir() {
        const id = idToDelete;
        setModalVisible(false);
        setIdToDelete(null);
        const token = sessionStorage.getItem('token');
        try {
            await fetch(`/api/animais/${id}/delete-imagem`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }).catch(() => {});

            await fetch(`/api/animais/${id}/delete-som`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }).catch(() => {});

            await fetch(`/api/animais/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            setAnimais((prev) => prev.filter((a) => a.id !== id));
            showToast('success', 'Animal excluído com sucesso!');
        } catch (error) {
            showToast('warning', 'Erro ao excluir animal!');
        }
    }

    function handleUsers() {
        navigate('/users');
    }

    function handleShowQr(url) {
        setQrUrl(url);
        setShowQr(true);
    }

    return (
        <div className='animal-list-container'>
            <div className='button-section'>
                {isAdmin && (
                    <Button
                        type='sumit'
                        children='Gerenciar usuários'
                        className='button-create reset'
                        onClick={() => handleUsers()}
                    />
                )}
                <Button
                    type='sumit'
                    children='Criar animal'
                    className='button-create'
                    onClick={() => handleCreate()}
                />
            </div>
            {animais.map((animal) => (
                <Dropdown
                    key={animal.id}
                    type='animal'
                    name={animal.nomePopular}
                    onView={() => handleVisualizar(animal.id)}
                    onDelete={() => confirmExcluir(animal.id, animal.nomePopular)}
                    onEdit={() => handleEditar(animal.id)}
                    onQr={() => handleShowQr(animal.qrcode)}
                />
            ))}
            {animais.length == 0 && <p>Nenhum animal cadastrado</p>}
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
            {showQr && <QrcodeDisplay url={qrUrl} onClose={() => setShowQr(false)} />}
        </div>
    );
}
