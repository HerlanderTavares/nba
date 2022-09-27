import styles from '../css/Main.module.scss';
import {css} from '../../../helpers';
import {useContext} from 'react';
import State from '../../../../API/State';

import Stats from '../../../../UI/js/Stats';
import Roster from './Roster';
import Leaders from './Leaders';

export default function Main(props) {
  const state = useContext(State);
  const team = props.team;
  const players = state.players;

  if (team && players) {
    const stats = {
      Standings: team.standings.confRank,
      Conference: team.confName,
      PPG: team.stats.ppg.avg,
      APG: team.stats.apg.avg,
      RPG: (+team.stats.orpg.avg + +team.stats.drpg.avg).toFixed(1),
      SPG: team.stats.spg.avg,
      BPG: team.stats.bpg.avg,
      FG: +team.stats.fgp.avg * 100 + '%',
    };

    const roster = state.players.filter(player => team.roster.includes(player.personId));

    const leaders = {
      ppg: [team.leaders.ppg[0].personId, team.leaders.ppg[0].value],
      apg: [team.leaders.apg[0].personId, team.leaders.apg[0].value],
      rpg: [team.leaders.trpg[0].personId, team.leaders.trpg[0].value],
      spg: [team.leaders.spg[0].personId, team.leaders.spg[0].value],
      bpg: [team.leaders.bpg[0].personId, team.leaders.bpg[0].value],
      fg: [team.leaders.fgp[0].personId, +team.leaders.fgp[0].value * 100 + '%'],
    };

    return (
      <div className={css(styles, 'main')}>
        <div className={css(styles, 'main__container')}>
          <h2 className={css(styles, 'main__subtitle')}>Team Stats</h2>
          <Stats stats={stats} />
          <h2 className={css(styles, 'main__subtitle')}>Roster</h2>
          <Roster />
          <h2 className={css(styles, 'main__subtitle')}>Team Leaders</h2>
          <Leaders />
        </div>
      </div>
    );
  }
}
