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
        {!state.isLoading.teams && <Hero />}
        {state.isLoading.teams && <LoadingScreen className={css(styles, 'home__loading')} />}
      </div>
      {!state.isLoading.teams && <Teams />}
      {!state.isLoading.teams && <Players />}
      {!state.isLoading.teams && <Footer />}
    </div>
  );
}
