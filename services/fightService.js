const { FightRepository } = require('../repositories/fightRepository');

class FightersService {
    addFight(data) {
        return FightRepository.create(data)
    }
    getAll() {
        return FightRepository.getAll()
    }
}

module.exports = new FightersService();