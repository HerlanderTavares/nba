import styles from '../css/Main.module.scss';
import {calcAge, css} from '../../../helpers';
import {useContext} from 'react';
import State from '../../../../API/State';

import Stats from '../../../../UI/js/Stats';
import Leaders from './Leaders';
import Table from '../../../../UI/js/Table';

export default function Main(props) {
  const state = useContext(State);
  const {team} = props;
  const players = state.players;

  if (team && players) {
    const stats = {
      Standings: team.info.standings.confRank,
      Conference: team.confName,
      PPG: team.info.stats.ppg.avg,
      APG: team.info.stats.apg.avg,
      RPG: (+team.info.stats.orpg.avg + +team.info.stats.drpg.avg).toFixed(1),
      SPG: team.info.stats.spg.avg,
      BPG: team.info.stats.bpg.avg,
      FG: +team.info.stats.fgp.avg * 100 + '%',
    };

    const rosterArr = state.players.filter(player => team.info.roster.includes(player.personId));
    const rosterInfo = rosterArr.map(player => ({
      ...player,
      stats: state.playersInfo.filter(info => info.id == player.personId)[0].stats,
    }));

    const roster = {
      // prettier-ignore
      keys: ['NO°', 'NAME', 'POS', 'AGE', 'H (m)', 'W (kg)', 'PPG', 'APG', 'RPG', 'SPG', 'BPG', 'FG%', 'FT%', '3PT%'],
      data: rosterInfo
        .map(player => ({
          number: player.jersey,
          name: `${player.firstName} ${player.lastName}`,
          position: player.pos,
          age:
            player.dateOfBirthUTC == false
              ? ''
              : `${calcAge(player.dateOfBirthUTC).age} (${calcAge(player.dateOfBirthUTC).year})`,
          height: player.heightMeters,
          weight: player.weightKilograms,
          ppg: player?.stats?.currentSeason?.ppg,
          apg: player?.stats?.currentSeason?.apg,
          rpg: player?.stats?.currentSeason?.rpg,
          spg: player?.stats?.currentSeason?.spg,
          bpg: player?.stats?.currentSeason?.bpg,
          fgp: player?.stats?.currentSeason?.fgp,
          ftp: player?.stats?.currentSeason?.ftp,
          tpp: player?.stats?.currentSeason?.tpp,
        }))
        .sort((a, b) => {
          if (a.number === '') return 1;
          if (b.number === '') return -1;
          return +a.number - +b.number;
        }),
    };

    console.log(roster);

    /* 
    - jersey number
    - name
    - pos
    - age
    - h
    - weight
    - ppg
    - apg
    - rpg
    - spg
    - bpg
    - fgp
    - ftp
    - tpp
    */

    const leaders = {
      ppg: [team.info.leaders.ppg[0].personId, team.info.leaders.ppg[0].value],
      apg: [team.info.leaders.apg[0].personId, team.info.leaders.apg[0].value],
      rpg: [team.info.leaders.trpg[0].personId, team.info.leaders.trpg[0].value],
      spg: [team.info.leaders.spg[0].personId, team.info.leaders.spg[0].value],
      bpg: [team.info.leaders.bpg[0].personId, team.info.leaders.bpg[0].value],
      fg: [team.info.leaders.fgp[0].personId, +team.info.leaders.fgp[0].value * 100 + '%'],
    };

    return (
      <div className={css(styles, 'main')}>
        <div className={css(styles, 'main__container')}>
          <h2 className={css(styles, 'main__subtitle')}>Team Stats</h2>
          <Stats stats={stats} />
          <h2 className={css(styles, 'main__subtitle')}>Roster</h2>
          <Table data={roster} />
          <h2 className={css(styles, 'main__subtitle')}>Team Leaders</h2>
          <Leaders leaders={leaders} />
        </div>
      </div>
    );
  }
}
