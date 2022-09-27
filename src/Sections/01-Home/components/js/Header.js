import styles from '../css/Header.module.scss';
import {css} from '../../../helpers';

export default function Header(props) {
  return (
    <div className={css(styles, 'header')}>
      <div className={css(styles, 'header__container')}>
        <img
          src={require('../../../../Images/logo.png')}
          alt="NBA Logo"
          className={css(styles, 'header__logo')}
        />
        <div className={css(styles, 'header__nav')}>
          <a href="#teams" className={css(styles, 'header__link')}>
            Teams
          </a>
          <a href="#teams" className={css(styles, 'header__link')}>
            Players
          </a>
        </div>
      </div>
    </div>
  );
}
