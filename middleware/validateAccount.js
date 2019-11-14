const validateAccount = (req, res, next) => {
  const { name, budget } = req.body;

  req.account = { name, budget };
  return (name === undefined || budget === undefined)
    ? res.status(400).json({ message: 'Accounts must have a budget and a unique name' })
    : next();
};

module.exports = { validateAccount };
