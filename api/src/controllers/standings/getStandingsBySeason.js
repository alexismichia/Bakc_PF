const standingService = require('../../services/standings/getStandings.service');

exports.getStandingsBySeason = async (req, res) => {
    const { id } = req.params;
    const { league_id } = req.query; 
    try {
        const standing = await standingService.getStandingsBySeasonAndLeague(id, league_id); 
        if (standing) {
            res.status(200).json(standing);
        } else {
            res.status(404).json({ message: 'Standings not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};
