const {getStageStatisticsByIdFromAPI} = require("../../services/statistics/getStageStatisticsById")

exports.getStageStatisticsById = async (req, res) => {
  const { id } = req.params;
  try {
    const statistics = await getStageStatisticsByIdFromAPI(id);
    if (statistics) {
      res.status(200).json(statistics);
    } else {
      res.status(404).json({ message: "Statistics not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
