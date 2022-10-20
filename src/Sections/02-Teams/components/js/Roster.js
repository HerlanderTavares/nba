import styles from '../css/Roster.module.scss';
import {calcAge, css} from '../../../helpers';
import Table from '../../../../UI/js/Table';
import {getImg} from '../../../../API/API';

const Coaches = props => {
  const {coaches} = props;

  const headCoach = coaches.filter(coach => !coach.isAssistant)[0];
  const assistants = coaches
    .filter(coach => coach.isAssistant)
    .map((coach, i) => (
      <span key={i}>
        {coach.firstName} {coach.lastName}
      </span>
    ));

  return (
    <div className={css(styles, 'coaches')}>
      <div className={css(styles, 'coaches__head')}>
        {getImg(headCoach.personId, 'small')}

        <div className={css(styles, 'coaches__info')}>
          <span className={css(styles, 'coaches__label')} data-label="desktop">
            Coaching Staff
          </span>
          {/* prettier-ignore */}
          <h2>{headCoach.firstName} {headCoach.lastName}</h2>
          <span>Head Coach</span>
        </div>
      </div>
      <div className={css(styles, 'coaches__staff')}>
        <span className={css(styles, 'coaches__label')} data-label="mobile">
          Coaching Staff
        </span>
        {assistants}
      </div>
    </div>
  );
};

export default function Roster(props) {
  const {roster} = props;
  // prettier-ignore
  const keys = ['NO°', 'NAME', 'POS', 'AGE', 'H (m)', 'W (kg)', 'PPG', 'APG', 'RPG', 'SPG', 'BPG', 'FG%', 'FT%', '3PT%']
  const displayAge = date => (date == false ? '' : `${calcAge(date).age} (${calcAge(date).year})`);
  const displayPercentage = num => (num == false || num == undefined || num < 0 ? '' : `${num}%`);

  const rosterData = {
    keys,
    data: roster
      .map(player => ({
        number: player.jersey,
        name: `${player.firstName} ${player.lastName}`,
        position: player.pos,
        age: displayAge(player.dateOfBirthUTC),
        height: player.heightMeters,
        weight: player.weightKilograms,
        ppg: player?.stats?.currentSeason?.ppg,
        apg: player?.stats?.currentSeason?.apg,
        rpg: player?.stats?.currentSeason?.rpg,
        spg: player?.stats?.currentSeason?.spg,
        bpg: player?.stats?.currentSeason?.bpg,
        fgp: displayPercentage(player?.stats?.currentSeason?.fgp),
        ftp: displayPercentage(player?.stats?.currentSeason?.ftp),
        tpp: displayPercentage(player?.stats?.currentSeason?.tpp),
      }))
      .sort((a, b) => {
        if (a.number === '') return 1;
        if (b.number === '') return -1;
        return +a.number - +b.number;
      }),
  };

  return (
    <div className={css(styles, 'roster')}>
      <Table data={rosterData} />
      <Coaches coaches={props.coaches} />
    </div>
  );
}
