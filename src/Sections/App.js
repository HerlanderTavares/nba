import './App.scss';
import {seasonYear} from '../API/API';
import {teamAPI, teamInfoAPI} from '../API/TeamsAPI';
import {playerAPI, playerInfoAPI} from '../API/PlayersAPI';
import {coachesAPI} from '../API/CoachesAPI';
import {useState, useEffect} from 'react';
import State from '../API/State';

import {Routes, Route, Navigate} from 'react-router-dom';

import Home from './01-Home/Home';
import Teams from './02-Teams/Teams';
import Players from './03-Players/Players';

export default function App() {
  const [teams, setTeams] = useState(undefined);
  const [teamsInfo, setTeamsInfo] = useState(undefined);
  const [players, setPlayers] = useState(undefined);
  const [playersInfo, setPlayersInfo] = useState(undefined);
  const [coaches, setCoaches] = useState(undefined);

  const [prompt, setPrompt] = useState(true);
  const [error, setError] = useState({failedLoad: false, message: ''});
  const [currentYear, setCurrentYear] = useState('');

  const [viewTeam, setViewTeam] = useState();
  const [viewPlayer, setViewPlayer] = useState();

  const [screen, setScreen] = useState('home');

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
    viewPlayer,
    setViewPlayer,
    currentYear,
    setCurrentYear,
    screen,
    setScreen,
    prompt,
    setPrompt,
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
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/team" element={<Teams />} />
        <Route path="/player" element={<Players />} />
      </Routes>
    </State.Provider>
  );
}
