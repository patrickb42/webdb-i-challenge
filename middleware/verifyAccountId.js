const { get } = require('../data/accounts');

const verifyAccountId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await get({ id });
    console.log('line 8');
    if (result === undefined) return res.status(404).json({ message: `No account found under id ${id}` });
    req.account = result;
  } catch (error) {
    return res.status(500).json({
      error: error.response,
      message: `error getting account by id ${id}`,
    });
  }
  return next();
};

module.exports = { verifyAccountId };
