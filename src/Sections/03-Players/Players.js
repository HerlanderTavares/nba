import styles from './Players.module.scss';
import {css} from '../helpers';
import {useContext, useEffect, useState} from 'react';
import State from '../../API/State';

import Header from './components/js/Header';
import Main from './components/js/Main';
import LoadingScreen from '../../UI/js/LoadingScreen';

export default function Players(props) {
  const state = useContext(State);
  const [player, setPlayer] = useState();

  const filterPlayer = name =>
    state.players.filter(
      player => `${player.firstName} ${player.lastName}`.toLowerCase() === name.toLowerCase()
    )[0];

  useEffect(() => {
    if (state.players) {
      const steph = filterPlayer('stephen curry');
      const lebron = filterPlayer('lebron james');
      const lavine = filterPlayer('Zach LaVine');
      const tatum = filterPlayer('Jayson Tatum');

      const mitchell = filterPlayer('Walker Kessler');
      const durant = filterPlayer('kevin durant');
      const ja = filterPlayer('Ja Morant');
      const dame = filterPlayer('damian lillard');
      const book = filterPlayer('devin booker');
      const butler = filterPlayer('Jimmy Butler');

      setPlayer(book);
    }
  }, [state.players]);

  const hasLoaded = player && state.teams && state.playersInfo;

  return (
    <div className={css(styles, 'players')}>
      {!hasLoaded && <LoadingScreen className={styles.loading} />}
      {hasLoaded && <Header player={player} />}
      {hasLoaded && <Main player={player} />}
    </div>
  );
}
