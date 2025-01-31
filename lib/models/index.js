import Player from './Player';
import Toptime from './Toptime';
import Map from './Map';

Player.hasMany(Toptime, { foreignKey: 'playerId', as: "playerToptimes" });
Toptime.belongsTo(Player, { foreignKey: 'playerId', as: "player" });

Map.hasMany(Toptime, { foreignKey: 'mapResName', as: "mapToptimes" });
Toptime.belongsTo(Map, { foreignKey: 'mapResName', as: 'map' });

export { Player, Toptime, Map };