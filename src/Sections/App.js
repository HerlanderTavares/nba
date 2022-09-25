import './App.scss';
import {playersAPI, teamsAPI} from '../API/API';
import {useState, useEffect} from 'react';
import State from '../API/State';

import Home from './01-Home/Home.';
import Teams from './02-Teams/Teams';
import Players from './03-Players/Players';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [infoIsLoading, setInfoIsLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState({failedLoad: false, message: ''});

  useEffect(() => {
    teamsAPI(setError).then(data => {
      setTeams(data);
      setIsLoading(false);
      console.log('Finished loading teams');
    });

    playersAPI(setError).then(data => {
      setPlayers(data);
      setInfoIsLoading(false);
      console.log('Finished loading players');
    });
  }, []);

  const state = {
    isLoading: isLoading,
    setIsLoading: setIsLoading,
    infoIsLoading: infoIsLoading,
    setInfoIsLoading: setInfoIsLoading,
    teams: teams,
    setTeams: setTeams,
    players: players,
    setPlayers: setPlayers,
  };

  return <State.Provider value={state}></State.Provider>;
}
