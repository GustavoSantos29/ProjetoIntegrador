import React, { useState } from 'react';
import TextInput from '../Inputs/TextInput/TextInput';
import ImageInput from '../Inputs/ImageInput/ImageInput';
import TextArea from '../Inputs/TextArea/TextArea';
import SoundInput from '../Inputs/SoundInput/SoundInput';
import Button from '../Button/Button'
import './style.css'



const Form = () => {
  const [imageFile, setImageFile] = useState(null);
  const [soundFile, setSoundFile] = useState(null);
  const [formData, setFormData] = useState({
    foto: null,
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
    audio:null,
  });

  const [errors, setErrors] = useState({
    foto: false,
    nomePopular: false,
    nomeCientifico: false,
    tamanho: false,
    dieta: false,
    comportamento: false,
    reproducao: false,
    habitat: false,
    descricao: false,
    reino: false,
    filo: false,
    classe: false,
    subclasse: false,
    ordem: false,
    subordem: false,
    familia: false,
    subfamilia: false,
    genero: false,
    subgenero: false,
    especie: false,
    audio: false,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      foto: !imageFile,
      nomePopular: formData.nomePopular.trim() === '',
      nomeCientifico: formData.nomeCientifico.trim() === '',
      tamanho: formData.tamanho.trim() === '',
      dieta: formData.dieta.trim() === '',
      comportamento: formData.comportamento.trim() === '',
      reproducao: formData.reproducao.trim() === '',
      habitat: formData.habitat.trim() === '',
      reino: formData.reino.trim() === '',
      filo: formData.filo.trim() === '',
      classe: formData.classe.trim() === '',
      ordem: formData.ordem.trim() === '',
      familia: formData.familia.trim() === '',
      genero: formData.genero.trim() === '',
      especie: formData.especie.trim() === '',

    }

    const hasError = Object.values(newErrors).some((v) => v);
    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {

      // 1. Envia dados para API (sem foto/som ainda)
      const response = await fetch('/api/animais', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) throw new Error('Erro ao criar animal');
  
      const { id } = await response.json();
  
      // 2. Agora sim, envia foto/som usando o ID
      const formImage = new FormData();
      formImage.append('imagem', imageFile);
      await fetch(`/api/animais/${id}/upload-imagem`, {
        method: 'POST',
        body: formImage
      });

      const formAudio = new FormData();
      formAudio.append('som', soundFile);
      await fetch(`/api/animais/${id}/upload-som`, {
          method: 'POST',
          body: formAudio
      });
      
      console.log('Animal criado com sucesso');
    } catch (error) {
      console.error('Erro ao enviar:', error);
    }
  }

  return (
   
    
    <form onSubmit={handleSubmit} className='form-container'>
      <ImageInput onFileSelect={(file) => setImageFile(file)} showError={errors.foto}/>
      <div className='input-section'>
        <h2>Dados do animal</h2>
        <TextInput id='nomePopular' label='Nome popular' value={formData.nomePopular} required={true} onChange={(e) => handleChange('nomePopular', e.target.value)} showError={errors.nomePopular} />
        <TextInput id='nomeCientifico' label='Nome científico' value={formData.nomeCientifico} required={true} onChange={(e) => handleChange('nomeCientifico', e.target.value)} showError={errors.nomeCientifico} />
        <TextInput id='tamanho' label='Tamanho' value={formData.tamanho} required={true} onChange={(e) => handleChange('tamanho', e.target.value)} showError={errors.tamanho} />
        <TextInput id='dieta' label='Dieta' value={formData.dieta} required={true} onChange={(e) => handleChange('dieta', e.target.value)} showError={errors.dieta} />
        <TextInput id='comportamento' label='Comportamento' value={formData.comportamento} required={true} onChange={(e) => handleChange('comportamento', e.target.value)} showError={errors.comportamento} />
        <TextInput id='reproducao' label='Reprodução' value={formData.reproducao} required={true} onChange={(e) => handleChange('reproducao', e.target.value)} showError={errors.reproducao} />
        <TextInput id='habitat' label='Habitat' value={formData.habitat} required={true} onChange={(e) => handleChange('habitat', e.target.value)} showError={errors.habitat} />
        <TextArea id='descricao' label='Descrição' value={formData.descricao} onChange={(e) => handleChange('descricao', e.target.value)} showError={errors.descricao} />

        <h2>Taxonomia</h2>
        <div className='input-section'>
          <TextInput id='reino' label='Reino' value={formData.reino} required={true} onChange={(e) => handleChange('reino', e.target.value)} showError={errors.reino} />
          <TextInput id='filo' label='Filo' value={formData.filo} required={true} onChange={(e) => handleChange('filo', e.target.value)} showError={errors.filo} />

          <div className='sub-input-section'>
            <TextInput id='classe' label='Classe' value={formData.classe} size='small' required={true} onChange={(e) => handleChange('classe', e.target.value)} showError={errors.classe} />
            <TextInput id='subclasse' label='Subclasse' value={formData.subclasse} size='small' onChange={(e) => handleChange('subclasse', e.target.value)} showError={errors.subclasse} />
            <TextInput id='ordem' label='Ordem' value={formData.ordem} size='small' required={true} onChange={(e) => handleChange('ordem', e.target.value)} showError={errors.ordem} />
            <TextInput id='subordem' label='Subordem' value={formData.subordem} size='small' onChange={(e) => handleChange('subordem', e.target.value)} showError={errors.subordem} />
            <TextInput id='familia' label='Família' value={formData.familia} size='small' required={true} onChange={(e) => handleChange('familia', e.target.value)} showError={errors.familia} />
            <TextInput id='subfamilia' label='Subfamília' value={formData.subfamilia} size='small' onChange={(e) => handleChange('subfamilia', e.target.value)} showError={errors.subfamilia} />
            <TextInput id='genero' label='Gênero' value={formData.genero} size='small' required={true} onChange={(e) => handleChange('genero', e.target.value)} showError={errors.genero} />
            <TextInput id='subgenero' label='Subgênero' value={formData.subgenero} size='small' onChange={(e) => handleChange('subgenero', e.target.value)} showError={errors.subgenero} />
          </div>

          <TextInput id='especie' label='Espécie' value={formData.especie} required={true} onChange={(e) => handleChange('especie', e.target.value)} showError={errors.especie} />
        </div>

        <SoundInput onFileSelect={(file) => setSoundFile(file)}/>
      </div>
      <Button children='Enviar' type='submit' />
    </form>
  )
};

export default Form;
