import styles from '../css/Hero.module.scss';
import {css} from '../../../helpers';
import {scrollTo} from '../../../helpers';
import Prompt from '../../../../UI/js/Prompt';
import {useContext} from 'react';
import State from '../../../../API/State';

export default function Hero(props) {
  const state = useContext(State);

  return (
    <div className={css(styles, 'hero')}>
      {state.prompt && (
        <Prompt title="Welcome!" onClick={() => state.setPrompt(false)}>
          This is a demo website with minimal error handling. If any error breaks the page please
          just refresh. This website showcases the use of the Fetch API together with React.
        </Prompt>
      )}

      <div className={css(styles, 'hero__container')}>
        <div className={css(styles, 'hero__content')}>
          <h1>NBA season is here</h1>
          <p>
            It's anyone's game. Keep up with the most heated rivalries, competitve matchups, and
            24/7 updates of your favourite teams and players.
          </p>
          <a href="#teams" onClick={scrollTo}>
            Find out more
          </a>
        </div>

        <div className={css(styles, 'hero__img')}></div>
      </div>
    </div>
  );
}
