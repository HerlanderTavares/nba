import styles from '../css/Header.module.scss';
import {css} from '../../../helpers';
import {getMainColor} from 'nba-color';
import {getImg} from '../../../../API/API';
import hexToHsl from 'hex-to-hsl';
import {useContext} from 'react';
import State from '../../../../API/State';

export default function Header(props) {
  const state = useContext(State);
  const {team} = props;

  const {hex} = getMainColor(team.tricode);
  const hsl = hexToHsl(hex);
  const textColor = hsl[2] < 30 ? 'white' : `hsl(${hsl[0]}deg, ${hsl[1]}%, ${hsl[2] - 30}%)`;
  const black = team.tricode === 'BKN' || team.tricode === 'UTA' ? 'black-logo' : '';
  return (
    <div className={css(styles, 'header')} style={{backgroundColor: hex, color: textColor}}>
      <div className={css(styles, 'header__container')}>
        {getImg(team.teamId, 'logo', css(styles, 'logo', black))}
        <div className={css(styles, 'header__title')}>
          <h2 className={css(styles, 'header__name')}>{team.fullName}</h2>
          <span className={css(styles, 'header__standings')}>
            {team.info && `(${team.info.standings.win} - ${team.info.standings.loss})`}
          </span>
        </div>
        <div className={css(styles, 'header__info')}>
          <span
            className={css(styles, 'header__conference')}
          >{`${team.confName}ern Conference`}</span>
          <span className={css(styles, 'header__year')}>
            {`${state.currentYear} - ${state.currentYear + 1}`}
          </span>
        </div>
      </div>
    </div>
  );
}
