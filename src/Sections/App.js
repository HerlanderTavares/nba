import './App.scss';
import {teamAPI, teamInfoAPI} from '../API/TeamsAPI';
import {playerAPI} from '../API/PlayersAPI';
import {coachesAPI} from '../API/CoachesAPI';
import {useState, useEffect} from 'react';
import State from '../API/State';

import Home from './01-Home/Home';
import Teams from './02-Teams/Teams';
import Players from './03-Players/Players';

export default function App() {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [error, setError] = useState({failedLoad: false, message: ''});
  const [isLoading, setIsLoading] = useState({
    teams: true,
    players: true,
    coaches: true,
    teamsInfo: true,
    playerInfo: true,
  });

  const state = {
    isLoading,
    setIsLoading,
    teams,
    setTeams,
    players,
    setPlayers,
    error,
    setError,
  };

  useEffect(() => {
    teamAPI(state)
      .then(data => {
        setTeams(data);
        setIsLoading(prevState => ({...prevState, teams: false}));
        return data;
      })
      .then(teams => teamInfoAPI(state, teams))
      .then(setIsLoading(prevState => ({...prevState, teamsInfo: false})));

    playerAPI(state).then(data => {
      setPlayers(data);
      setIsLoading(prevState => ({...prevState, players: false}));
    });

    coachesAPI(state).then(data => {
      setCoaches(data);
      setIsLoading(prevState => ({...prevState, coaches: false}));
    });
  }, []);

  if (!isLoading.teamsInfo) console.log(teams);

  return (
    <State.Provider value={state}>
      <h1>Hello world</h1>
    </State.Provider>
  );
}
