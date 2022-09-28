import styles from './Home.module.scss';
import {css} from '../helpers';
import {useContext} from 'react';
import State from '../../API/State';

import Hero from './components/js/Hero';
import Teams from './components/js/Teams';
import Players from './components/js/Players';
import Header from './components/js/Header';
import LoadingScreen from '../../UI/js/LoadingScreen';
import Footer from '../../UI/js/Footer';

export default function Home(props) {
  const state = useContext(State);

  return (
    <div className={css(styles, 'home')}>
      <div className={css(styles, 'home__hero')}>
        <Header />
        {state.teams && <Hero />}
        {!state.teams && <LoadingScreen className={css(styles, 'home__loading')} />}
      </div>
      {state.teams && <Teams />}
      {state.teams && <Players />}
      {state.teams && <Footer />}
    </div>
  );
}
