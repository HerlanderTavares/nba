import styles from '../css/Header.module.scss';
import {calcAge, css, isImage, nbaColor} from '../../../helpers';
import {useContext} from 'react';
import State from '../../../../API/State';
import hexToHsl from 'hex-to-hsl';
import {getMainColor} from 'nba-color';
import {getImg} from '../../../../API/API';
import MenuBar from '../../../../UI/js/MenuBar';

const MainHeader = props => {
  const {player} = props;
  const {team} = props.player;

  const inline = {backgroundColor: props.color, color: props.text};
  const positions = {
    G: 'Guard',
    F: 'Forward',
    C: 'Center',
  };

  return (
    <div className={css(styles, 'header__main')} style={inline}>
      <div className={css(styles, 'header__container')}>
        {getImg(player.personId, 'large', css(styles, 'header__img'))}
        {getImg(team.teamId, 'logo', css(styles, 'header__bkg-logo'))}
        {getImg(team.teamId, 'logo', css(styles, 'header__logo'))}

        <div className={css(styles, 'header__info')}>
          <span>
            {team.fullName} | #{player.jersey} | {positions[player.pos[0]]}
          </span>
          <h1 data-sreen="large">
            {player.firstName} <br /> {player.lastName}
          </h1>
          <h1 data-sreen="small">
            {player.firstName} {player.lastName}
          </h1>
        </div>
      </div>
    </div>
  );
};

const ProfileHeader = props => {
  const {player} = props;
  const inline = {backgroundColor: props.color, color: props.text};

  const info = {
    ppg: player.info?.currentSeason?.ppg || '--',
    apg: player.info?.currentSeason?.apg || '--',
    rpg: player.info?.currentSeason?.rpg || '--',
    country: player.country || '--',
    experience: player.yearsPro || '--',
    // prettier-ignore
    weight: player.weightPounds == false ? '--' : `${player.weightPounds}lbs (${player.weightKilograms}kg)`,
    // prettier-ignore
    height: player.heightFeet == false ? '--' : `${player.heightFeet}'${player.heightInches}" (${player.heightMeters}m)`,
    // prettier-ignore
    age: player.dateOfBirthUTC == false ? '--' : `${calcAge(player.dateOfBirthUTC).age} (${calcAge(player.dateOfBirthUTC).year})`,
    // prettier-ignore
    draft: player.draft.seasonYear == false ? '--' : `${player.draft.seasonYear} R${player.draft.roundNum} Pick ${player.draft.pickNum}`,
  };

  return (
    <div className={css(styles, 'header__profile')} style={inline}>
      <div className={css(styles, 'header__container')}>
        <div className={css(styles, 'header__stats')}>
          <div className={css(styles, 'header__stats-card')}>
            <span className={styles.label}>PPG</span>
            <span>{info.ppg}</span>
          </div>
          <div className={css(styles, 'header__stats-card')}>
            <span className={styles.label}>APG</span>
            <span>{info.apg}</span>
          </div>
          <div className={css(styles, 'header__stats-card')}>
            <span className={styles.label}>RPG</span>
            <span>{info.rpg}</span>
          </div>
        </div>

        <div className={css(styles, 'header__info')}>
          <div className={css(styles, 'header__info-card')}>
            <span>Height</span>
            <span>{info.height}</span>
          </div>
          <div className={css(styles, 'header__info-card')}>
            <span>Weight</span>
            <span>{info.weight}</span>
          </div>
          <div className={css(styles, 'header__info-card')}>
            <span>Country</span>
            <span>{info.country}</span>
          </div>
          <div className={css(styles, 'header__info-card')}>
            <span>Age</span>
            <span>{info.age}</span>
          </div>
          <div className={css(styles, 'header__info-card')}>
            <span>Drafted</span>
            <span>{info.draft}</span>
          </div>
          <div className={css(styles, 'header__info-card')}>
            <span>Experience</span>
            <span>{info.experience} years</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Header(props) {
  const state = useContext(State);
  const team = state.teams.filter(team => team.teamId === props.player.teamId)[0];
  const info = state.playersInfo.filter(info => info.id === props.player.personId)[0].stats;
  const player = {...props.player, team, info};

  const mainColor = nbaColor(team.tricode).color;
  const secondColor = nbaColor(team.tricode, {secondary: true}).color;
  const textColor = nbaColor(team.tricode, {text: true}).color;

  return (
    <div className={css(styles, 'header')}>
      <MainHeader color={mainColor} text={textColor} player={player} />
      <ProfileHeader color={secondColor} player={player} />
      <MenuBar />
    </div>
  );
}
