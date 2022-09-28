import './App.scss';
import {seasonYear} from '../API/API';
import {teamAPI, teamInfoAPI} from '../API/TeamsAPI';
import {playerAPI, playerInfoAPI} from '../API/PlayersAPI';
import {coachesAPI} from '../API/CoachesAPI';
import {useState, useEffect} from 'react';
import State from '../API/State';

import Home from './01-Home/Home';
import Teams from './02-Teams/Teams';
import Players from './03-Players/Players';

export default function App() {
  const [teams, setTeams] = useState(undefined);
  const [teamsInfo, setTeamsInfo] = useState(undefined);
  const [players, setPlayers] = useState(undefined);
  const [playersInfo, setPlayersInfo] = useState(undefined);
  const [coaches, setCoaches] = useState(undefined);
  const [error, setError] = useState({failedLoad: false, message: ''});
  const [screen, setScreen] = useState('teams');
  const [viewTeam, setViewTeam] = useState();
  const [currentYear, setCurrentYear] = useState('');

  const state = {
    teams,
    teamsInfo,
    players,
    playersInfo,
    coaches,
    error,
    setError,
    viewTeam,
    setViewTeam,
    currentYear,
    setCurrentYear,
  };

  useEffect(() => {
    teamAPI(state)
      .then(data => {
        setTeams(data);
        return teamInfoAPI(data);
      })
      .then(data => {
        setTeamsInfo(data);
        return data;
      });

    playerAPI(state)
      .then(data => {
        setPlayers(data);
        return playerInfoAPI(data);
      })
      .then(data => {
        setPlayersInfo(data);
        return data;
      });

    coachesAPI(state).then(data => {
      setCoaches(data);
      return data;
    });

    seasonYear(setCurrentYear);
  }, []);

  return (
    <State.Provider value={state}>
      {screen === 'home' && <Home />}
      {screen === 'teams' && <Teams />}
      {screen === 'players' && <Players />}
    </State.Provider>
  );
}
