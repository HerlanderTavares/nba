import styles from './Teams.module.scss';
import State from '../../API/State';
import {css} from '../helpers';
import {useContext, useState, useEffect} from 'react';
import {getMainColor} from 'nba-color';
import hexToHsl from 'hex-to-hsl';

import LoadingScreen from '../../UI/js/LoadingScreen';
import Header from './components/js/Header';
import Main from './components/js/Main';
import MenuBar from '../../UI/js/MenuBar';

export default function Teams(props) {
  const state = useContext(State);
  const [team, setTeam] = useState(undefined);
  const [teamColor, setTeamColor] = useState(null);

  useEffect(() => {
    if (team) {
      const {hex} = getMainColor(team.tricode);
      const hsl = hexToHsl(hex);
      const color = `hsl(${hsl[0]}deg, ${hsl[1]}%, ${hsl[2] - 20}%)`;
      setTeamColor(color);
    }
  }, [team]);

  console.log(teamColor);

  //Test data
  useEffect(() => {
    if (state.teams) {
      const gsw = state.teams.filter(team => team.tricode === 'GSW')[0];
      const bkn = state.teams.filter(team => team.tricode === 'BKN')[0];
      const uta = state.teams.filter(team => team.tricode === 'UTA')[0];
      setTeam(gsw);
    }
  }, [state.teams]);

  const teamInfo =
    team && state.teamsInfo ? state.teamsInfo.filter(info => info.id == team.teamId)[0] : undefined;

  const isLoading = !state.teamsInfo || !state.playersInfo;
  const loadingClass = isLoading ? 'loading' : '';

  return (
    <div className={css(styles, 'teams', loadingClass)}>
      <div className={css(styles, 'teams__startup')}>
        <MenuBar color={teamColor} />
        {team && <Header team={{...team, info: teamInfo}} />}
        {isLoading && <LoadingScreen style={{gridRow: 3}} />}
      </div>
      {!isLoading && <Main team={{...team, info: teamInfo}} />}
    </div>
  );
}
