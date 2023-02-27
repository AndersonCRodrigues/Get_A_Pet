import React, { useState } from 'react'
import './Form.css';
import Input from './Input';
import Select from './Select';

function PetForm({petData, btnText, handleSubmit}) {

  const [pet, setPet] = useState(petData || {color: 'Branco'});
  const [preview, setPreview] = useState([]);

  const colors = ['Branco', 'Preto', 'Cinza', 'Caramelo', 'Mesclado', 'Tricolor'];

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPet({...pet, [name]: value});
  };

  const onFileChange = ({ target }) => {
    const { files } = target;
    setPreview(Array.from(files));
    setPet({...pet, images: files});
  };

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(pet);
  };

  return (
    <form onSubmit={submit} className='form_container'>
      <div className='preview_pet_images'>
        {preview.length > 0
          ? preview.map((image, index) => (
            <img
              key={`${pet.name}_${index}`}
              src={URL.createObjectURL(image)}
              alt={pet.name}
              />
          ))
          : pet.images
          && pet.images.map((image, index) => (
            <img
            key={`${pet.name}_${index}`}
            src={`${process.env.REACT_APP_URL}${image}.png`}
            alt={pet.name}
            />
          ))
        }
      </div>
      <Input
        text='Imagens do Pet'
        type='file'
        name='image'
        handleChange={onFileChange}
        multiple={true}
      />
      <Input
        text='Nome do Pet'
        type='text'
        name='name'
        placeholder='Digite o nome do Pet'
        handleChange={handleChange}
        value={pet.name || ''}
      />
        <Input
        text='Idade do Pet'
        type='text'
        name='age'
        placeholder='Digite a idade do Pet'
        handleChange={handleChange}
        value={pet.age || ''}
      />
        <Input
        text='Peso do Pet'
        type='text'
        name='weight'
        placeholder='Digite o peso do Pet em Kilos'
        handleChange={handleChange}
        value={pet.weight || ''}
      />
      <Select
        name='color'
        text='Seleciona uma cor'
        options={colors}
        handleChange={handleChange}
        value={pet.color || ''}
      />
      <input type="submit" value={btnText}/>
    </form>
  )
}

export default PetForm