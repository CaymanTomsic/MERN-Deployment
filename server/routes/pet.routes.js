const PetController = require("../controllers/pet.controller");

module.exports = function(app){
    app.get('/api/test', PetController.serverTest);
    app.get('/api/pets', PetController.getAllPets);
    app.post('/api/pets', PetController.createPet);
    app.get('/api/pets/:id', PetController.getOnePet);
    app.put('/api/pets/:id', PetController.updatePet);
    app.delete('/api/pets/:id', PetController.destroyPet);
};