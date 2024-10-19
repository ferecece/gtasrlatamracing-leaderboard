import Player from './Player';
import RaceToptime from './RaceToptime';
import RaceMap from './RaceMap';

Player.hasMany(RaceToptime, { foreignKey: 'playerID', as: "playerToptimes" });
RaceToptime.belongsTo(Player, { foreignKey: 'playerID', as: "player" });

RaceMap.hasMany(RaceToptime, { foreignKey: 'mapResName', as: "mapToptimes" });
RaceToptime.belongsTo(RaceMap, { foreignKey: 'mapResName', as: 'raceMap' });

export { Player, RaceToptime, RaceMap };