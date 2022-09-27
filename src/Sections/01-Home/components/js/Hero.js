import styles from '../css/Hero.module.scss';
import {css} from '../../../helpers';
import Header from './Header';

export default function Hero(props) {
  return (
    <div className={css(styles, 'hero')}>
      <div className={css(styles, 'hero__container')}>
        <div className={css(styles, 'hero__content')}>
          <h1>NBA season is here</h1>
          <p>
            It's anyone's game. Keep up with the most heated rivalries, competitve matchups, and
            24/7 updates of your favourite teams and players.
          </p>
          <a href="#teams">Find out more</a>
        </div>

        <div className={css(styles, 'hero__img')}></div>
      </div>
    </div>
  );
}
