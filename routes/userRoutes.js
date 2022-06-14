const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.post('/', createUserValid, (req, res, next) => {
  try {
    const user = UserService.create(req.body);
    res.data = user
  } catch(err) {
    res.err = err
    res.status(400)
  } finally {
    next()
  }
}, responseMiddleware);

router.get('/', (req, res) => {
  const users = UserService.getAll();
  res.status(200).json(users)
});

router.get('/:id', (req, res) => {
    const user = UserService.search({id: req.params.id})
    if(!user) {
      res.status(404).json({
        error: true,
        message: 'User not found'
      })
    } else {
      res.status(200).json(user)
    }
});

router.put('/:id', updateUserValid, (req, res, next) => {
  try {
    const updatedUser = UserService.updateUser(req.params.id, req.body);
    res.data = updatedUser
  } catch(err) {
    res.err = err
    res.status(400)
  } finally {
    next()
  }
}, responseMiddleware);

router.delete('/:id', (req, res) => {
  try {
    UserService.deleteUser(req.params.id);
    res.status(200).end()
  } catch(err) {
    res.status(400).json({
      error: true,
      message: err.message
    })
  }
})

module.exports = router;