import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../Dropdowns/Dropdown';
import Toast from '../Toast/Toast';
import DeleteModal from '../Modal/DeleteModal';
import Button from '../Button/Button';
import QrcodeDisplay from '../QrcodeDisplay/QrcodeDisplay';
import './style.css'

export default function AnimalList() {
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

  function cancelExcluir() {
    setModalVisible(false);
    setIdToDelete(null);
  }

  async function confirmExcluir(id, name) {
    setModalVisible(true);
    setIdToDelete(id);
    setNameToDelete(name);
  }
  

  useEffect(() => {
    async function fetchAnimais() {
      try {
        const token = sessionStorage.getItem('token');
        const response = await fetch('/api/animais',{
          headers: {
          'Authorization': `Bearer ${token}`
        }
      });
        const data = await response.json();
        setAnimais(data);
        console.log(data);
      } catch (error) {
        console.error(error);
        alert('Erro ao buscar a lista de animais.');
        navigate(-1);
      }
    }

    fetchAnimais();
  }, []);

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
          'Authorization': `Bearer ${token}`
        }
      }).catch(() => {});

      await fetch(`/api/animais/${id}/delete-som`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).catch(() => {});

      await fetch(`/api/animais/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setAnimais((prev) => prev.filter((a) => a.id !== id));
      showToast('success', 'Animal excluído com sucesso!');
    } catch (error) {
      showToast('warning', 'Erro ao excluir animal!');
    }
  }

  function handleShowQr(url) {
    setQrUrl(url);
    setShowQr(true);
  }

  return (
    <div className="animal-list-container" >
      <Button type="sumit" children='Criar novo animal' className="button-create" onClick={()=> handleCreate()}/>
      {animais.map((animal) => (
        <Dropdown 
          key={animal.id} 
          name={animal.nomePopular} 
          onView={() => handleVisualizar(animal.id)} 
          onDelete={() => confirmExcluir(animal.id, animal.nomePopular)} 
          onEdit={() => handleEditar(animal.id)} 
          onQr={() => handleShowQr(animal.qrcode)} 
        />
      ))}
      <Toast type={toast.type} message={toast.message} visible={toast.visible} onClose={hideToast} />
      {modalVisible && (
        <DeleteModal visible={modalVisible} children={nameToDelete} onConfirm={handleExcluir} onCancel={cancelExcluir}
        />
      )}
     {showQr && (
        <QrcodeDisplay url={qrUrl} onClose={() => setShowQr(false)}/>
      )}
    </div>
  );
}
