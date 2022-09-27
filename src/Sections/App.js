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
  const [isLoading, setIsLoading] = useState({
    teams: true,
    players: true,
    coaches: true,
    teamsInfo: true,
    playersInfo: true,
  });

  const state = {
    teams,
    teamsInfo,
    players,
    playersInfo,
    coaches,
    isLoading,
    setIsLoading,
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
        setIsLoading(prevState => ({...prevState, teams: false}));
        setTeamsInfo(data);
        return data;
      })
      .then(data => {
        setIsLoading(prevState => ({...prevState, teamsInfo: false}));
        return data;
      });

    playerAPI(state)
      .then(data => {
        setPlayers(data);
        return playerInfoAPI(data);
      })
      .then(data => {
        setIsLoading(prevState => ({...prevState, players: false}));
        setPlayersInfo(data);
        return data;
      })
      .then(data => {
        setIsLoading(prevState => ({...prevState, playersInfo: false}));
        return data;
      });

    coachesAPI(state)
      .then(data => {
        setCoaches(data);
        return data;
      })
      .then(data => setIsLoading(prevState => ({...prevState, coaches: false})));

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
