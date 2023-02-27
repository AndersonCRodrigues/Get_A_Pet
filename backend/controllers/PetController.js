const Pet = require('../models/Pet');
const ObjectId = require('mongoose').Types.ObjectId;

// helpers
const getUserBYToken = require('../helpers/get-user-by-token');
const getToken = require('../helpers/get-token');

module.exports = class PetController {
  static async create(req, res) {
    const {
      name,
      age,
      weight,
      color,
    } = req.body;

    const images = req.files;

    const available = true;

    // validation
    if (!name) {
      return res.status(422).json({ message: 'O nome é obrigatório!'});
    }

    if (!age) {
      return res.status(422).json({ message: 'A idade é obrigatória!'});
    }

    if (!weight) {
      return res.status(422).json({ message: 'O peso é obrigatório!'});
    }

    if (!color) {
      return res.status(422).json({ message: 'A cor é obrigatória!'});
    }

    if (!images.length) {
      return res.status(422).json({ message: 'A imagem é obrigatória!'});
    }


    // get pet owner
    const user = await getUserBYToken(getToken(req));

    // create a pet
    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });

    pet.images = images.map((image) => image.filename);

    try {

      const newPet = await pet.save();

      return res.status(201).json({
        message: 'Pet cadastrado com sucesso!',
        newPet,
      });

    } catch (error) {
      return res.status(500).json({message: error});
    }
  };

  static async getAll(req, res) {
    const pets = await Pet.find().sort('-createdAt');

    return res.status(200).json({ pets });
  };

  static async getAllUserPets(req, res) {
    // get user from token
    const user = await getUserBYToken(getToken(req));

    const pets = await Pet.find({'user._id': user._id}).sort('-createdAt');

    return res.status(200).json({pets});
  };

  static async getAllUserAdoptions(req, res) {
    // get user from token
    const user = await getUserBYToken(getToken(req));

    const pets = await Pet.find({'adopter._id': user._id}).sort('-createdAt');

    return res.status(200).json({pets});
  };

  static async getPetById(req, res) {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(422).json({message: 'iD inválido!'})
    }

    // check if pet exixts
    const pet = await Pet.findOne({_id:id});

    if (!pet) {
      return res.status(404).json({meddage: 'Pet não encontrado!'})
    }

    return res.status(200).json({pet});
  };

  static async removePetById(req, res) {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(422).json({message: 'iD inválido!'})
    }

    // check if pet exixts
    const pet = await Pet.findOne({_id:id});

    if (!pet) {
      return res.status(404).json({meddage: 'Pet não encontrado!'})
    }

    // check if logged in user registered the pet
    const user = await getUserBYToken(getToken(req));

    if (pet.user._id.toString() !== user._id.toString()) {
      return res.status(422).json({message: 'Houve um problema em precessar sua solicitação!'})
    }

    await Pet.findByIdAndRemove(id);

    return res.status(200).json({message: 'pet removido com sucesso!'});
  };

  static async updatePet(req, res) {
    const { id } = req.params;

    const {
      name,
      age,
      weight,
      color,
      available,
    } = req.body;

    const images = req.files;

    const updateData = {};

    if (!ObjectId.isValid(id)) {
      return res.status(422).json({message: 'iD inválido!'})
    }

    // check if pet exixts
    const pet = await Pet.findOne({_id:id});

    if (!pet) {
      return res.status(404).json({meddage: 'Pet não encontrado!'})
    }

    // check if logged in user registered the pet
    const user = await getUserBYToken(getToken(req));

    if (pet.user._id.toString() !== user._id.toString()) {
      return res.status(422).json({message: 'Houve um problema em precessar sua solicitação!'})
    }

     // validation
     if (!name) {
      return res.status(422).json({ message: 'O nome é obrigatório!'});
    } else {
      updateData.name = name;
    }

    if (!age) {
      return res.status(422).json({ message: 'A idade é obrigatória!'});
    } else {
      updateData.age = age;
    }

    if (!weight) {
      return res.status(422).json({ message: 'O peso é obrigatório!'});
    } else {
      updateData.weight = weight;
    }

    if (!color) {
      return res.status(422).json({ message: 'A cor é obrigatória!'});
    } else {
      updateData.color = color;
    }

    if (images.length) {
      updateData.images = images.map((image) => image.filename);
    }

    await Pet.findByIdAndUpdate(id, updateData);

    return res.status(200).json({message: 'Pet atualizado com sucesso!'});
  };

  static async schedule(req, res) {
    const { id } = req.params;

    // check if pet exixts
    const pet = await Pet.findOne({_id:id});

    if (!pet) {
      return res.status(404).json({meddage: 'Pet não encontrado!'})
    }

    // check if user registred the pet
    const user = await getUserBYToken(getToken(req));

    if (pet.user._id.equals(user._id)) {
      return res.status(422).json({message: 'Você não pode agendar uma visita para seu próprio pet!'})
    }

    // check if user has already schedule a visit
    if (pet.adopter && pet.adopter._id.equals(user._id)) {
      return res.status(422).json({message: 'Você já agendou uma visita para esse pet!'})
    }

    // add user to pet
    pet.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image,
    };

    await Pet.findByIdAndUpdate(id, pet);

    return res.status(200).json({message: `Visita agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}`});
  };

  static async concludeAdoption(req, res) {
    const { id } = req.params;

    // check if pet exixts
    const pet = await Pet.findOne({_id:id});

    if (!pet) {
      return res.status(404).json({meddage: 'Pet não encontrado!'})
    }

    // check if user registred the pet
    const user = await getUserBYToken(getToken(req));

    if (!pet.user._id.equals(user._id)) {
      return res.status(422).json({message: 'Houve um problema em precessar sua solicitação!'})
    }

    pet.available = false;

    await Pet.findByIdAndUpdate(id, pet);

    return res.status(200).json({message: 'Parabéns, ciclo de adoção finalizado com sucesso!'});
  };
};