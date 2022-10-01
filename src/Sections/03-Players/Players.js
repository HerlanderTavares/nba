import styles from './Players.module.scss';
import {css} from '../helpers';
import {useContext, useEffect, useState} from 'react';
import State from '../../API/State';

import Header from './components/js/Header';
import Main from './components/js/Main';
import LoadingScreen from '../../UI/js/LoadingScreen';

export default function Players(props) {
  const state = useContext(State);
  const player = state.viewPlayer;
  const hasLoaded = player && state.teams && state.playersInfo;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behaviour: 'auto',
    });
  }, []);

  return (
    <div className={css(styles, 'players')}>
      {!hasLoaded && <LoadingScreen className={styles.loading} />}
      {hasLoaded && <Header player={player} />}
      {hasLoaded && <Main player={player} />}
    </div>
  );
}
