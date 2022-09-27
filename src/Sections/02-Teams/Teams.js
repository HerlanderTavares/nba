import styles from './Teams.module.scss';
import {css} from '../helpers';
import {useContext} from 'react';
import State from '../../API/State';

import LoadingScreen from '../../UI/js/LoadingScreen';
import Header from './components/js/Header';
import Main from './components/js/Main';

export default function Teams(props) {
  const state = useContext(State);

  let team;

  //Test data

  if (state.teams) {
    const gsw = state.teams.filter(team => team.tricode === 'GSW')[0];
    const bkn = state.teams.filter(team => team.tricode === 'BKN')[0];
    const uta = state.teams.filter(team => team.tricode === 'UTA')[0];
    team = gsw;
  }

  const isLoading = state.isLoading.teamsInfo || state.isLoading.playersInfo;
  const loadingClass = isLoading ? 'loading' : '';

  return (
    <div className={css(styles, 'teams', loadingClass)}>
      <div className={css(styles, 'teams__startup')}>
        {team && <Header team={team} />}
        {isLoading && <LoadingScreen style={{gridRow: 2}} />}
      </div>
      {/* {!isLoading && <Main team={team} />} */}
    </div>
  );
}
