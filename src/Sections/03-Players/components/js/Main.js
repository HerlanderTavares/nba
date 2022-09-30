import styles from '../css/Main.module.scss';
import {css} from '../../../helpers';
import {useContext} from 'react';
import State from '../../../../API/State';
import Stats from '../../../../UI/js/Stats';
import Table from '../../../../UI/js/Table';
import Footer from '../../../../UI/js/Footer';

export default function Main(props) {
  const state = useContext(State);
  const {player} = props;
  const team = state.teams.filter(team => team.teamId === player.teamId)[0];
  const info = state.playersInfo.filter(info => info.id === player.personId)[0].stats;

  console.log(info);

  const careerTotals = {
    points: info?.careerSummary?.points || '--',
    assists: info?.careerSummary?.assists || '--',
    rebounds: info?.careerSummary?.totReb || '--',
    steals: info?.careerSummary?.steals || '--',
    blocks: info?.careerSummary?.blocks || '--',
    threes: info?.careerSummary?.tpm || '--',
  };

  const careerAverage = {
    ppg: info?.careerSummary?.ppg || '--',
    apg: info?.careerSummary?.apg || '--',
    rpg: info?.careerSummary?.rpg || '--',
    spg: info?.careerSummary?.spg || '--',
    bpg: info?.careerSummary?.bpg || '--',
    fg: info?.careerSummary?.fgp + '%' || '--',
  };

  /************** Yearly Stats **************/
  // prettier-ignore
  const keys = ['year', 'games', 'min', 'pts', 'fgm', 'fga', 'fg%', '3ptm', '3pta', '3pt%', 'ftm', 'fta', 'ft%', 'reb', 'ast', 'tov', 'stl', 'blk', '+/-'].map(key => key.toUpperCase());

  const data = info.allSeasons
    .sort((a, b) => b.seasonYear - a.seasonYear)
    .map(season => ({
      year: `${season.seasonYear}-${`${season.seasonYear + 1}`.slice(2)}`,
      games: season.gamesPlayed,
      min: season.min,
      pts: season.ppg,
      fgm: season.fgm,
      fga: season.fga,
      fgp: season.fgp,
      tpm: season.tpm,
      tpa: season.tpa,
      tpp: season.tpp,
      ftm: season.ftm,
      fta: season.fta,
      ftp: season.ftp,
      reb: season.rpg,
      ast: season.apg,
      tov: season.topg,
      stl: season.spg,
      blk: season.bpg,
      plusMinus: season.plusMinus,
    }));

  console.log(keys);
  return (
    <div className={css(styles, 'main')}>
      <div className={css(styles, 'main__container')}>
        <h2 className={css(styles, 'main__subtitle')}>Career Totals</h2>
        <Stats stats={careerTotals} />
        <h2 className={css(styles, 'main__subtitle')}>Career Averages</h2>
        <Stats stats={careerAverage} />
        <h2 className={css(styles, 'main__subtitle')}>Yearly Stats</h2>
        <Table data={{keys, data}} />
      </div>
      <Footer />
    </div>
  );
}
