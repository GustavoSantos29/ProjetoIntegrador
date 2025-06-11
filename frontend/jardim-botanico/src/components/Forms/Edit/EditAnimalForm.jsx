import React, { useEffect, useState } from 'react';

import TextInput from '../../Inputs/TextInput/TextInput';
import ImageInput from '../../Inputs/ImageInput/ImageInput';
import TextArea from '../../Inputs/TextArea/TextArea';
import SoundInput from '../../Inputs/SoundInput/SoundInput';
import Button from '../../Button/Button';
import Toast from '../../Toast/Toast';
import '../style.css';

const EditAnimalForm = ({ animalId }) => {
  const [toast, setToast] = useState({ visible: false, type: '', message: '' });
  const [imageFile, setImageFile] = useState(null);
  const [soundFile, setSoundFile] = useState(null);


  const [formData, setFormData] = useState({
    nomePopular: '',
    nomeCientifico: '',
    tamanho: '',
    dieta: '',
    comportamento: '',
    reproducao: '',
    habitat: '',
    descricao: '',
    reino: '',
    filo: '',
    classe: '',
    subclasse: '',
    ordem: '',
    subordem: '',
    familia: '',
    subfamilia: '',
    genero: '',
    subgenero: '',
    especie: '',
  });

  const [errors, setErrors] = useState({});

  // Buscar dados do animal para preencher o formulário
  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const res = await fetch(`/api/animais/${animalId}`);
        if (!res.ok) throw new Error('Erro ao buscar animal');
        const data = await res.json();

        setFormData({
          nomePopular: data.nomePopular || '',
          nomeCientifico: data.nomeCientifico || '',
          tamanho: data.tamanho || '',
          dieta: data.dieta || '',
          comportamento: data.comportamento || '',
          reproducao: data.reproducao || '',
          habitat: data.habitat || '',
          descricao: data.descricao || '',
          reino: data.reino || '',
          filo: data.filo || '',
          classe: data.classe || '',
          subclasse: data.subclasse || '',
          ordem: data.ordem || '',
          subordem: data.subordem || '',
          familia: data.familia || '',
          subfamilia: data.subfamilia || '',
          genero: data.genero || '',
          subgenero: data.subgenero || '',
          especie: data.especie || '',
          video: data.video || "",
        });

        if (data.foto) setImageFile(data.foto);
        if (data.audio) setSoundFile(data.audio);
      } catch (error) {
        showToast('warning', 'Erro ao carregar dados do animal!');
        console.error(error);
      }
    };

    fetchAnimal();
  }, [animalId]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const showToast = (type, message) => setToast({ visible: true, type, message });
  const hideToast = () => setToast({ ...toast, visible: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = [
      'nomePopular', 'nomeCientifico', 'tamanho', 'dieta', 'comportamento',
      'reproducao', 'habitat', 'reino', 'filo', 'classe', 'ordem',
      'familia', 'genero', 'especie'
    ];
    const newErrors = requiredFields.reduce((acc, field) => {
      acc[field] = formData[field].trim() === '';
      return acc;
    }, {});
    newErrors.foto = !imageFile;
    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      showToast('warning', 'Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    try {
      const response = await fetch(`/api/animais/${animalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Erro ao editar animal');

      const formImage = new FormData();
      if (imageFile && typeof imageFile !== 'string') {
        formImage.append('imagem', imageFile);
        await fetch(`/api/animais/${animalId}/upload-imagem`, {
          method: 'POST',
          body: formImage
        });
      }

      if (soundFile && typeof soundFile !== 'string') {
        const formAudio = new FormData();
        formAudio.append('som', soundFile);
        await fetch(`/api/animais/${animalId}/upload-som`, {
          method: 'POST',
          body: formAudio
        });
      }

      showToast('success', 'Animal editado com sucesso!');
      
    } catch (error) {
      showToast('warning', 'Erro ao editar animal!');
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <ImageInput
          file={imageFile}
          onFileSelect={(file) => {
            setImageFile(file);
            setErrors((prev) => ({ ...prev, foto: false }));
          }}
          showError={errors.foto}
        />

        <div className="input-section">
          <h2>Dados do animal</h2>
          <TextInput id="nomePopular" label="Nome popular" value={formData.nomePopular} required onChange={(e) => handleChange('nomePopular', e.target.value)} showError={errors.nomePopular} />
          <TextInput id="nomeCientifico" label="Nome científico" value={formData.nomeCientifico} required onChange={(e) => handleChange('nomeCientifico', e.target.value)} showError={errors.nomeCientifico} />
          <TextInput id="tamanho" label="Tamanho" value={formData.tamanho} required onChange={(e) => handleChange('tamanho', e.target.value)} showError={errors.tamanho} />
          <TextInput id="dieta" label="Dieta" value={formData.dieta} required onChange={(e) => handleChange('dieta', e.target.value)} showError={errors.dieta} />
          <TextInput id="comportamento" label="Comportamento" value={formData.comportamento} required onChange={(e) => handleChange('comportamento', e.target.value)} showError={errors.comportamento} />
          <TextInput id="reproducao" label="Reprodução" value={formData.reproducao} required onChange={(e) => handleChange('reproducao', e.target.value)} showError={errors.reproducao} />
          <TextInput id="habitat" label="Habitat" value={formData.habitat} required onChange={(e) => handleChange('habitat', e.target.value)} showError={errors.habitat} />
          <TextArea id="descricao" label="Descrição" value={formData.descricao} onChange={(e) => handleChange('descricao', e.target.value)} />

          <h2>Taxonomia</h2>
          <TextInput id="reino" label="Reino" value={formData.reino} required onChange={(e) => handleChange('reino', e.target.value)} showError={errors.reino} />
          <TextInput id="filo" label="Filo" value={formData.filo} required onChange={(e) => handleChange('filo', e.target.value)} showError={errors.filo} />
          <TextInput id="classe" label="Classe" value={formData.classe} required onChange={(e) => handleChange('classe', e.target.value)} showError={errors.classe} />
          <TextInput id="subclasse" label="Subclasse" value={formData.subclasse} onChange={(e) => handleChange('subclasse', e.target.value)} showError={errors.subclasse} />
          <TextInput id="ordem" label="Ordem" value={formData.ordem} required onChange={(e) => handleChange('ordem', e.target.value)} showError={errors.ordem} />
          <TextInput id="subordem" label="Subordem" value={formData.subordem} onChange={(e) => handleChange('subordem', e.target.value)} showError={errors.subordem} />
          <TextInput id="familia" label="Família" value={formData.familia} required onChange={(e) => handleChange('familia', e.target.value)} showError={errors.familia} />
          <TextInput id="subfamilia" label="Subfamília" value={formData.subfamilia} onChange={(e) => handleChange('subfamilia', e.target.value)} showError={errors.subfamilia} />
          <TextInput id="genero" label="Gênero" value={formData.genero} required onChange={(e) => handleChange('genero', e.target.value)} showError={errors.genero} />
          <TextInput id="subgenero" label="Subgênero" value={formData.subgenero} onChange={(e) => handleChange('subgenero', e.target.value)} showError={errors.subgenero} />
          <TextInput id="especie" label="Espécie" value={formData.especie} required onChange={(e) => handleChange('especie', e.target.value)} showError={errors.especie} />

          <SoundInput
            file={soundFile}
            onFileSelect={(file) => setSoundFile(file)}
          />

        </div>  
      <TextInput id="video" label="Video" value={formData.video} onChange={(e) => handleChange('video', e.target.value)} showError={errors.video} />

        <Button type="submit">Enviar</Button>
      </form>

      <Toast type={toast.type} message={toast.message} visible={toast.visible} onClose={hideToast} />
    </div>
  );
};

export default EditAnimalForm;
