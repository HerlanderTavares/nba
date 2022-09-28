import {createContext} from 'react';

const State = createContext({
  teams: undefined,
  teamsInfo: undefined,
  players: undefined,
  playersInfo: undefined,
});

export default State;
