import styles from '../css/Main.module.scss';
import {calcAge, css} from '../../../helpers';
import {useContext} from 'react';
import State from '../../../../API/State';

import Stats from '../../../../UI/js/Stats';
import Leaders from './Leaders';
import Roster from './Roster';
import Footer from '../../../../UI/js/Footer';

export default function Main(props) {
  const state = useContext(State);
  const {team} = props;
  const players = state.players;
  const coaches = state.coaches;

  if (team && players) {
    /************** Stats **************/
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

    /************** Roster **************/
    const rosterArr = state.players.filter(player => team.info.roster.includes(player.personId));
    const roster = rosterArr.map(player => ({
      ...player,
      stats: state.playersInfo.filter(info => info.id == player.personId)[0].stats,
    }));
    const teamCoaches = coaches.filter(coach => coach.teamId === team.teamId);

    /************** Leaders **************/
    const leaders = {
      ppg: [team.info.leaders.ppg[0].personId, team.info.leaders.ppg[0].value],
      apg: [team.info.leaders.apg[0].personId, team.info.leaders.apg[0].value],
      rpg: [team.info.leaders.trpg[0].personId, team.info.leaders.trpg[0].value],
      spg: [team.info.leaders.spg[0].personId, team.info.leaders.spg[0].value],
      bpg: [team.info.leaders.bpg[0].personId, team.info.leaders.bpg[0].value],
      fg: [
        team.info.leaders.fgp[0].personId,
        (+team.info.leaders.fgp[0].value * 100).toFixed(1) + '%',
      ],
    };

    return (
      <div className={css(styles, 'main')}>
        <div className={css(styles, 'main__container')}>
          <h2 className={css(styles, 'main__subtitle')}>Team Stats</h2>
          <Stats stats={stats} />
          <h2 className={css(styles, 'main__subtitle')}>Roster</h2>
          <Roster roster={roster} coaches={teamCoaches} />
          <h2 className={css(styles, 'main__subtitle')}>Team Leaders</h2>
          <Leaders leaders={leaders} />
        </div>
        <Footer />
      </div>
    );
  }
}
