import {createContext} from 'react';

const State = createContext({
  teams: [],
  players: [],
  isLoading: true,
});

export default State;
