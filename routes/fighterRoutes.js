const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

router.get('/', (req, res, next) => {
  try {
    const fighters = FighterService.getAll();
    res.data = fighters
  } catch(err) {
    res.err = err
  } finally {
    next()
  }
}, responseMiddleware);

router.post('/', createFighterValid, (req, res, next) => {
  try {
    const fighter = FighterService.create(req.body);
    res.data = fighter
  } catch(err) {
    res.err = err
    res.status(400)
  } finally {
    next()
  }
}, responseMiddleware);

router.get('/:id', (req, res) => {
  const fighter = FighterService.search({id: req.params.id})
  if(!fighter) {
    res.status(404).json({
      error: true,
      message: 'Fighter not found'
    })
  } else {
    res.status(200).json(fighter)
  }
});

router.put('/:id', updateFighterValid, (req, res, next) => {
try {
  const updatedFighter = FighterService.updateFighter(req.params.id, req.body);
  res.data = updatedFighter
} catch(err) {
  res.err = err
  res.status(400)
} finally {
  next()
}
}, responseMiddleware);

router.delete('/:id', (req, res) => {
try {
  FighterService.deleteFighter(req.params.id);
  res.status(200).end()
} catch(err) {
  res.status(400).json({
    error: true,
    message: err.message
  })
}
})

module.exports = router;