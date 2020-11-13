const Pet = require('../models/pet.models.js');

module.exports.serverTest = (req, res) =>{
    res.json({
        message: "Everything running correctly"
    });
};

module.exports.createPet = (req, res) =>{
    Pet.create(req.body)
    .then(pet => res.json(pet))
    .catch(err => res.status(400).json({ message: "Something went wrong", error: err }));
};

module.exports.getAllPets = (req, res) =>{
    Pet.find()
    .then(allPets => res.json(allPets))
    .catch(err => res.status(400).json({ message: "Something went wrong", error: err }));
};

module.exports.getOnePet = (req, res) => {
    Pet.findOne({_id:req.params.id})
    .then(pet => res.json({ pet }))
    .catch(err => res.status(400).json({ message: "Something went wrong", error: err }));
};

module.exports.destroyPet = (req, res) =>{
    Pet.deleteOne({_id: req.params.id})
    .then(deleteConfirmation => res.json({ deleteConfirmation }))
    .catch(err => res.status(400).json({ message: "Something went wrong", error: err }));
};

module.exports.updatePet = (req, res) =>{
    Pet.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators: true})
    .then(updatedPet => res.json({ updatedPet }))
    .catch(err => res.status(400).json({ message: "Something went wrong", error: err }));
};