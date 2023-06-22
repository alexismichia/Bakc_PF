const express = require("express");
const statisticsRouter = express.Router();

const {getSeasonStatisticsByParticipant} = require("../controllers/statistics/getSeasonStatisticsByParticipant")
const {getStageStatisticsById} = require("../controllers/statistics/getStageStatisticsById")
//participants = coaches, players, teams or referees
statisticsRouter.get("/:participant/:id", getSeasonStatisticsByParticipant)
statisticsRouter.get("/stage/:id", getStageStatisticsById)

module.exports = statisticsRouter;