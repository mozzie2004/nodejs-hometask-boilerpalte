const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters
    getAll() {
        return FighterRepository.getAll();
    }

    search(search) {
        const item = FighterRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }

    create(data) {
        console.log(this.search({name: data.name}))
        if(this.search({name: data.name.toLowerCase()})) {
            throw Error('fighter already exists')
        }
        return FighterRepository.create({...data, name: data.name.toLowerCase(), health: data.health || 100});
    }

    updateFighter(id, data) {
        if(this.search({id})) {
            if(data.name && this.search({name: data.name.toLowerCase()}) && this.search({name: data.name.toLowerCase()}).id !== id) {
                throw Error(`fighter with name: ${data.name.toLowerCase()} already exists`)
            }

            const updatedFighter = FighterRepository.update(id, data)
            return updatedFighter
        } else {
            throw Error(`fighter with id: ${id} is missing`)
        }
    }

    deleteFighter(id) {
        if(this.search({id})) { 
            FighterRepository.delete(id)
        } else {
            throw Error(`fighter with id: ${id} is missing`)
        }
    }
}

module.exports = new FighterService();