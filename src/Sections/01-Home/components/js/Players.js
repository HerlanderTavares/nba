import styles from '../css/Players.module.scss';
import {css} from '../../../helpers';
import {useContext, useState, memo} from 'react';
import State from '../../../../API/State';

const Icon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <title>Search</title>
      <path d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0034.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 00327.3 362.6l94.09 94.09a25 25 0 0035.3-35.3zM97.92 222.72a124.8 124.8 0 11124.8 124.8 124.95 124.95 0 01-124.8-124.8z" />
    </svg>
  );
};

function Players(props) {
  const state = useContext(State);
  const [input, setInput] = useState('');

  const search = e => {
    setInput(e.target.value);
  };

  return (
    <div className={css(styles, 'players')} id="players">
      <div className={css(styles, 'players__container')}>
        <h2 className={css(styles, 'players__subtitle')}>All Players</h2>

        <div className={css(styles, 'players__body')}>
          <div className={css(styles, 'players__img')}>
            <img src={require('../../../../Images/players.webp')} alt="Two players in a game" />
          </div>
          <div className={css(styles, 'search')}>
            <div className={css(styles, 'search__field')}>
              <Icon />
              <input type="text" className={css(styles, 'search__input')} onChange={search} />
            </div>

            {input == false && (
              <div className={css(styles, 'search__prompt')}>
                <span>
                  Search for your <br /> favourite players!
                </span>
              </div>
            )}

            {input != false && <div className={css(styles, 'search__results')}></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Players);
