import React, { useState } from 'react';
import TextInput from '../../Inputs/TextInput/TextInput';
import ImageInput from '../../Inputs/ImageInput/ImageInput';
import TextArea from '../../Inputs/TextArea/TextArea';
import SoundInput from '../../Inputs/SoundInput/SoundInput';
import Button from '../../Button/Button';
import Toast from '../../Toast/Toast';
import '../style.css'

const CreateAnimalForm = () => {
  const [toast, setToast] = useState({ visible: false, type: '', message: '' });
  const [imageFile, setImageFile] = useState(null);
  const [soundFile, setSoundFile] = useState(null);
  const [resetImageKey, setResetImageKey] = useState(0);
  const [resetSoundKey, setResetSoundKey] = useState(0);

  const [formData, setFormData] = useState({
    nomePopular: '',
    nomeCientifico: '',
    nAcervo:'',
    tamanho: '',
    porte:'',
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
    video:''
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
    const requiredFields = [
      'nomePopular', 'nomeCientifico', 'reino', 'filo', 'classe', 'ordem',
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
      const response = await fetch('/api/animais', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Erro ao criar animal');

      const { id } = await response.json();
      const formImage = new FormData();
      formImage.append('imagem', imageFile);
      await fetch(`/api/animais/${id}/upload-imagem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: formImage
      });
      await fetch(`/api/animais/${id}/upload-qrcode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      if (soundFile) {
        const formAudio = new FormData();
        formAudio.append('som', soundFile);
        await fetch(`/api/animais/${id}/upload-som`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: formAudio
        });
      }

      showToast('success', 'Animal criado com sucesso!');

      setFormData({
        nomePopular: '',
        nomeCientifico: '',
        nAcervo:'',
        tamanho: '',
        porte:'',
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
        video:''
      });
      setImageFile(null);
      setSoundFile(null);
      setResetImageKey((prev) => prev + 1);
      setResetSoundKey((prev) => prev + 1);
      setErrors({});
    } catch (error) {
      showToast('warning', 'Erro ao criar animal!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <ImageInput onFileSelect={(file) => {setImageFile(file); setErrors((prev) => ({ ...prev, foto: false }));}} showError={errors.foto} resetTrigger={resetImageKey} />

        <div className="input-section">
          <h2>Dados do animal</h2>
          <TextInput id="nomePopular" label="Nome popular" value={formData.nomePopular} required onChange={(e) => handleChange('nomePopular', e.target.value)} showError={errors.nomePopular} />
          <TextInput id="nomeCientifico" label="Nome científico" value={formData.nomeCientifico} required onChange={(e) => handleChange('nomeCientifico', e.target.value)} showError={errors.nomeCientifico} />
          <TextInput id="nAcervo" label="Número do acervo" value={formData.nAcervo} onChange={(e) => handleChange('nAcervo', e.target.value)} showError={errors.nAcervo} />
          <TextInput id="tamanho" label="Tamanho" value={formData.tamanho} onChange={(e) => handleChange('tamanho', e.target.value)} showError={errors.tamanho} />
          <TextInput id="porte" label="Porte" value={formData.porte} onChange={(e) => handleChange('porte', e.target.value)} showError={errors.porte} />
          <TextInput id="dieta" label="Dieta" value={formData.dieta} onChange={(e) => handleChange('dieta', e.target.value)} showError={errors.dieta} />
          <TextInput id="comportamento" label="Comportamento" value={formData.comportamento} onChange={(e) => handleChange('comportamento', e.target.value)} showError={errors.comportamento} />
          <TextInput id="reproducao" label="Reprodução" value={formData.reproducao} onChange={(e) => handleChange('reproducao', e.target.value)} showError={errors.reproducao} />
          <TextInput id="habitat" label="Habitat" value={formData.habitat} onChange={(e) => handleChange('habitat', e.target.value)} showError={errors.habitat} />
          <TextArea id="descricao" label="Descrição" value={formData.descricao} onChange={(e) => handleChange('descricao', e.target.value)}/>
          <h2>Taxonomia</h2>
          <div className="sub-input-section">
            <TextInput id="reino" label="Reino" value={formData.reino} required onChange={(e) => handleChange('reino', e.target.value)} showError={errors.reino} />
            <TextInput id="filo" label="Filo" value={formData.filo} required onChange={(e) => handleChange('filo', e.target.value)} showError={errors.filo} />
            <TextInput id="classe" label="Classe" value={formData.classe} size="small" required onChange={(e) => handleChange('classe', e.target.value)} showError={errors.classe} />
            <TextInput id="subclasse" label="Subclasse" value={formData.subclasse} size="small" onChange={(e) => handleChange('subclasse', e.target.value)} showError={errors.subclasse} />
            <TextInput id="ordem" label="Ordem" value={formData.ordem} size="small" required onChange={(e) => handleChange('ordem', e.target.value)} showError={errors.ordem} />
            <TextInput id="subordem" label="Subordem" value={formData.subordem} size="small" onChange={(e) => handleChange('subordem', e.target.value)} showError={errors.subordem} />
            <TextInput id="familia" label="Família" value={formData.familia} size="small" required onChange={(e) => handleChange('familia', e.target.value)} showError={errors.familia} />
            <TextInput id="subfamilia" label="Subfamília" value={formData.subfamilia} size="small" onChange={(e) => handleChange('subfamilia', e.target.value)} showError={errors.subfamilia} />
            <TextInput id="genero" label="Gênero" value={formData.genero} size="small" required onChange={(e) => handleChange('genero', e.target.value)} showError={errors.genero} />
            <TextInput id="subgenero" label="Subgênero" value={formData.subgenero} size="small" onChange={(e) => handleChange('subgenero', e.target.value)} showError={errors.subgenero} />
            <TextInput id="especie" label="Espécie" value={formData.especie} required onChange={(e) => handleChange('especie', e.target.value)} showError={errors.especie} />
          </div>

          <SoundInput onFileSelect={(file) => setSoundFile(file)} resetTrigger={resetSoundKey} />
        </div>
        <h2>Video</h2>
        <TextInput id="video" label='Vídeo' value={formData.video} onChange={(e) => handleChange('video', e.target.value)} showError={errors.video} />
          <br />
        <Button type="submit">Enviar</Button>
      </form>

      <Toast type={toast.type} message={toast.message} visible={toast.visible} onClose={hideToast} />
    </div>
  );
};

export default CreateAnimalForm;
