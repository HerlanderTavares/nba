import styles from '../css/Leaders.module.scss';
import {css} from '../../../helpers';
import {useContext} from 'react';
import {getImg} from '../../../../API/API';
import State from '../../../../API/State';

const Card = props => {
  const leader = props.leader;

  return (
    <button className={css(styles, 'leaders__card')} onClick={() => {}}>
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

  const leadersArr = Object.entries(props.leaders).map(leader => {
    if (leader[1][0] !== undefined || leader[1][0] !== undefined)
      return {
        id: leader[1][0],
        name: getPlayer(leader[1][0])?.fullName,
        jersey: getPlayer(leader[1][0])?.jersey,
        label: leader[0].toUpperCase(),
        stat: leader[1][1],
        player: getPlayer(leader[1][0]),
      };
  });

  const leaders = leadersArr.map(leader => {
    if (leader !== undefined) return <Card key={leader.label} leader={leader} />;
  });

  const noLeaders = leadersArr.every(leader => leader === undefined);
  return (
    <>
      {!noLeaders && <h2 className={css(styles, 'leaders__subtitle')}>Team Leaders</h2>}
      {!noLeaders && <div className={css(styles, 'leaders')}>{leaders}</div>}
    </>
  );
}
