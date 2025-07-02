import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../Dropdowns/Dropdown';
import Toast from '../Toast/Toast';
import DeleteModal from '../Modal/DeleteModal';
import Button from '../Button/Button';
import TextInput from '../Inputs/TextInput/TextInput';
import QrcodeDisplay from '../QrcodeDisplay/QrcodeDisplay';
import { useAuth } from '../../context/AuthContext/AuthProvider';
import './style.css';

export default function AnimalList() {
    const { setIsAuthenticated, setIsAdmin } = useAuth();
    const { isAdmin } = useAuth();
    const [toast, setToast] = useState({ visible: false, type: '', message: '' });
    const showToast = (type, message) => setToast({ visible: true, type, message });
    const hideToast = () => setToast({ ...toast, visible: false });
    const [showQr, setShowQr] = useState(false);
    const [qrUrl, setQrUrl] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [nameToDelete, setNameToDelete] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [animais, setAnimais] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAnimais() {
            try {
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

    const buscaFuzzy = (nome, filtro) => {
        return nome.toLowerCase().includes(filtro.toLowerCase());
    };

    const animaisFiltrados = animais.filter((animal) => buscaFuzzy(animal.nomePopular, filtro));

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
        navigate('/animal/create');
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
            <div className='top-section'>
                <div className='button-section'>
                    <Button
                        type='sumit'
                        children='Sair'
                        className='reset'
                        onClick={() => logOut()}
                    />

                    {isAdmin && (
                        <Button
                            type='sumit'
                            children='Gerenciar usuários'
                            className='reset'
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
                <div className='search-section'>
                    <TextInput
                        type='text'
                        className='search'
                        style={{ margin: 0 }}
                        value={filtro}
                        onChange={(e) => {
                            setFiltro(e.target.value);
                        }}
                        label='Buscar animal'
                    />
                </div>
            </div>
            {animais
                .filter((animal) => buscaFuzzy(animal.nomePopular, filtro))
                .map((animal) => (
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
            {animais.length == 0 ||
                (animaisFiltrados.length === 0 && (
                    <p className='not-found'>Nenhum animal encontrado</p>
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
            {showQr && <QrcodeDisplay url={qrUrl} onClose={() => setShowQr(false)} />}
        </div>
    );
}
