const express = require('express')

const teamRouter = express.Router()

const {getTeam} = require('../controllers/team/getTeamByCountry.js')
const {getTeamById} = require('../controllers/team/getTeamById.js')    
const {getTeamBySeason} = require('../controllers/team/getTeamBySeason.js')
const {getTeamByName} = require('../controllers/team/getTeamByName.js')

// const { getTeams } = require('../controllers/team/getTeams.js')
const {getTeamSquads} = require("../controllers/team/getTeamSquads.js")




teamRouter.get('/country/:id', getTeam)
teamRouter.get('/:id', getTeamById)
teamRouter.get('/season/:id', getTeamBySeason)
teamRouter.get('/search/:name', getTeamByName)
teamRouter.get("/squads/:id", getTeamSquads)
// teamRouter.get("", getTeams)

module.exports = teamRouter