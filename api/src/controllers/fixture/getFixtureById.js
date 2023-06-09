const { getFixtureByIdFromAPI } = require("../../services/fixture/getFixtureById.service");

exports.getFixtureById = async (req, res) => {
  const { id } = req.params;
  try {
    const fixture = await getFixtureByIdFromAPI(id);
    if (fixture) {
      res.status(200).json(fixture);
    } else {
      res.status(404).json({ message: "Fixture not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};
