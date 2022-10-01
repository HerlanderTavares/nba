import styles from './Teams.module.scss';
import State from '../../API/State';
import {css} from '../helpers';
import {useContext, useRef, useEffect} from 'react';

import LoadingScreen from '../../UI/js/LoadingScreen';
import Header from './components/js/Header';
import Main from './components/js/Main';
import MenuBar from '../../UI/js/MenuBar';

export default function Teams(props) {
  const state = useContext(State);
  const team = state.viewTeam;

  const teamInfo =
    team && state.teamsInfo ? state.teamsInfo.filter(info => info.id == team.teamId)[0] : undefined;

  const isLoading = !team || !state.teamsInfo || !state.playersInfo;
  const loadingClass = isLoading ? 'loading' : '';

  const page = useRef();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behaviour: 'auto',
    });
  }, []);

  return (
    <div className={css(styles, 'teams', loadingClass)} ref={page}>
      <div className={css(styles, 'teams__startup')}>
        {team && <Header team={{...team, info: teamInfo}} />}
        <MenuBar />
        {isLoading && <LoadingScreen style={{gridRow: 3}} />}
      </div>
      {!isLoading && <Main team={{...team, info: teamInfo}} />}
    </div>
  );
}
