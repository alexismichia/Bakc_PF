const { getFixtureByNameFromAPI } = require("../../services/fixture/getFixtureByName.service");

exports.getFixtureByName = async (req, res) => {
  const { name } = req.params;
  try {
    const fixture = await getFixtureByNameFromAPI(name);
    if (fixture) {
      res.status(200).json(fixture);
    } else {
      res.status(404).json({ message: "Fixture not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
