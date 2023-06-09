const { Players } = require("../../db");
const { getPlayerIdFromAPI } = require("../../services/Player/getPlayersByID.service");

exports.getPlayerById = async (req, res) => {
  const { id } = req.params;
  try {
    let playerIds = [];

    // Verificar si id es un array o un solo valor
    if (Array.isArray(id)) {
      playerIds = id;
    } else {
      playerIds.push(id);
    }

    const existingPlayers = await Players.findAll({
      where: {
        id: playerIds
      }
    });

    const existingPlayerIds = existingPlayers.map(player => player.id);

    const newPlayerDataPromises = playerIds.map(async (playerId) => {
      if (existingPlayerIds.includes(playerId)) {
        // El jugador ya existe en la base de datos, no es necesario llamar al servicio
        const existingPlayer = existingPlayers.find(player => player.id === playerId);
        return existingPlayer;
      } else {
        // El jugador no existe en la base de datos, llamar al servicio para obtener los datos
        const player = await getPlayerIdFromAPI(playerId);
        if (player) {
          try {
            const existingPlayer = await Players.findOne({
              where: { id: player.id }
            });

            if (existingPlayer) {
              // El jugador ya existe en la base de datos, omitir la creación
              return existingPlayer;
            }

            const newPlayer = await Players.create({
              id: player.id,
              sport_id: player.sport_id,
              country_id: player.country_id,
              nationality_id: player.nationality_id,
              city_id: player.city_id,
              position_id: player.position_id,
              detailed_position_id: player.detailed_position_id,
              type_id: player.type_id,
              common_name: player.common_name,
              firstname: player.firstname,
              lastname: player.lastname,
              name: player.name,
              display_name: player.display_name,
              image_path: player.image_path,
              height: player.height,
              weight: player.weight,
              date_of_birth: player.date_of_birth,
              gender: player.gender,
            });

            return newPlayer;
          } catch (error) {
            console.log(`Error al crear el jugador con ID: ${player.id}`, error);
            return null;
          }
        }
      }
    });

    const newPlayers = await Promise.all(newPlayerDataPromises);
    const filteredPlayers = newPlayers.filter(player => player !== null);
    res.status(200).json(filteredPlayers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};