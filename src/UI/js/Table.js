import styles from '../css/Table.module.scss';
import {css} from '../../Sections/helpers';
import {useContext} from 'react';
import State from '../../API/State';
import {goToPlayer} from '../../Sections/helpers';

export default function Table(props) {
  const state = useContext(State);

  const openPlayer = player => {
    const viewPlayer = state.players.filter(p => `${p.firstName} ${p.lastName}` === player.name)[0];
    goToPlayer(viewPlayer, state);
  };

  const keys = props.data.keys.map(key => <th key={key}>{key}</th>);
  const data = props.data.data.map(player => {
    const playerStats = [];

    for (const key in player) {
      switch (true) {
        case key === 'number' && player[key] === '0':
        case key === 'number' && player[key] === '00':
          playerStats.push(<td key={key}>#{player[key]}</td>);
          break;
        case player[key] == false:
        case player[key] === undefined:
        case +player[key] < 0:
          playerStats.push(<td key={key}>--</td>);
          break;
        case key === 'name':
          const button = <button onClick={() => openPlayer(player)}>{player[key]}</button>;
          playerStats.push(<td key={key}>{button}</td>);
          break;
        case key === 'number':
          playerStats.push(<td key={key}>#{player[key]}</td>);
          break;
        default:
          playerStats.push(<td key={key}>{player[key]}</td>);
          break;
      }
    }

    return <tr key={player['name']}>{playerStats}</tr>;
  });

  return (
    <div className={css(styles, 'table')}>
      <div className={css(styles, 'table__container')}>
        <table>
          <thead>
            <tr>{keys}</tr>
          </thead>

          <tbody>{data}</tbody>
        </table>
      </div>
    </div>
  );
}
