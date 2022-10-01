import styles from '../css/Leaders.module.scss';
import {css, goToPlayer} from '../../../helpers';
import {useContext} from 'react';
import {getImg} from '../../../../API/API';
import State from '../../../../API/State';

const Card = props => {
  const state = useContext(State);
  const leader = props.leader;
  const player = leader.player;

  return (
    <button className={css(styles, 'leaders__card')} onClick={() => goToPlayer(player, state)}>
      {getImg(leader.id, 'small')}
      <div className={css(styles, 'leaders__info')}>
        <span className={css(styles, 'leaders__name')}>
          #{leader.jersey} {leader.name}
        </span>
        <span className={css(styles, 'leaders__stat')}>
          {leader.label} {leader.stat}
        </span>
      </div>
    </button>
  );
};

export default function Leaders(props) {
  const state = useContext(State);

  const getPlayer = id => {
    const player = state.players.filter(player => player.personId === id)[0];
    if (player)
      return {
        ...player,
        fullName: `${player.firstName} ${player.lastName}`,
      };
  };

  const leaders = Object.entries(props.leaders)
    .map(leader => ({
      id: leader[1][0],
      name: getPlayer(leader[1][0])?.fullName,
      jersey: getPlayer(leader[1][0])?.jersey,
      label: leader[0].toUpperCase(),
      stat: leader[1][1],
      player: getPlayer(leader[1][0]),
    }))
    .map(leader => <Card key={leader.label} leader={leader} />);

  return <div className={css(styles, 'leaders')}>{leaders}</div>;
}
