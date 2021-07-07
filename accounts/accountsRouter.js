const router = require('express').Router();

const {
  validateAccount,
  verifyAccountId,
} = require('../middleware');
const {
  get: getAccounts,
  insert: insertAccount,
  update: updateAccount,
  remove: removeAccount,
} = require('../data/accounts');

router.get('/', async (req, res) => {
  try {
    const result = await getAccounts();
    return (result.length === 0)
      ? res.status(404).json({ message: 'no accounts found' })
      : res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: error.response,
      message: 'Error getting accounts',
    });
  }
});

router.get('/:id', verifyAccountId, async (req, res) => res.status(200).json(req.account));

router.post('/', validateAccount, async (req, res) => {
  try {
    const result = await insertAccount({ account: req.account });
    return (result === undefined)
      ? res.status(500).json({ message: 'Error adding account' })
      : res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: error.response,
      message: 'Error adding account',
    });
  }
});

router.put('/:id', verifyAccountId, validateAccount, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await updateAccount({ id, changes: req.account });
    return (result === undefined)
      ? res.status(500).json({ message: `Error updating id ${id}` })
      : res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: error.response,
      message: `Error updating id ${id}`,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await removeAccount({ id });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: error.response,
      message: `Error removing id ${id}`,
    });
  }
});

module.exports = { router };
