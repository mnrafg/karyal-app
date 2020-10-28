module.exports = async (model, key, value) => {
  return (await model.findOne({ where: { [key]: value } })) === null;
};
