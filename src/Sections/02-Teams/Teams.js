import styles from './Teams.module.scss';
import {calcAge, css} from '../helpers';
import {useContext, useState, useEffect} from 'react';
import State from '../../API/State';

import LoadingScreen from '../../UI/js/LoadingScreen';
import Header from './components/js/Header';
import Main from './components/js/Main';

export default function Teams(props) {
  const state = useContext(State);
  const [team, setTeam] = useState(undefined);

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

  console.log(isNaN(''));

  return (
    <div className={css(styles, 'teams', loadingClass)}>
      <div className={css(styles, 'teams__startup')}>
        {team && <Header team={{...team, info: teamInfo}} />}
        {isLoading && <LoadingScreen style={{gridRow: 2}} />}
      </div>
      {!isLoading && <Main team={{...team, info: teamInfo}} />}
    </div>
  );
}
