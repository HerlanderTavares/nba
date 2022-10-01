import styles from '../css/Teams.module.scss';
import {css} from '../../../helpers';
import {useContext} from 'react';
import State from '../../../../API/State';
import {getImg} from '../../../../API/API';
import {goToTeam} from '../../../helpers';

const Button = props => {
  const state = useContext(State);

  return (
    <button className={css(styles, 'teams__btn')} onClick={() => goToTeam(props.team, state)}>
      {getImg(props.team.teamId, 'logo')}
    </button>
  );
};

export default function Teams(props) {
  const state = useContext(State);
  const teams = state.teams.map(team => {
    return <Button key={team.tricode} team={team} />;
  });

  return (
    <div className={css(styles, 'teams')} id="teams">
      <div className={css(styles, 'teams__container')}>
        <h2 className={css(styles, 'teams__subtitle')}>All Teams</h2>
        <div className={css(styles, 'teams__grid')}>{teams}</div>
      </div>
    </div>
  );
}
