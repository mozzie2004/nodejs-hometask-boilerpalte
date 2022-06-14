const { Router } = require('express');
const FightService = require('../services/fightService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');


const router = Router();

router.post('/', (req, res) => {
  const fight = FightService.addFight(req.body);
  res.status(200).json(fight)
})

router.get('/', (req, res) => {
  const fights = FightService.getAll();
  res.status(200).json(fights)
})

module.exports = router;