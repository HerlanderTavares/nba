import styles from './Players.module.scss';
import {css} from '../helpers';

export default function Players(props) {
  return (
    <div className={css(styles, 'players')}>
      <h1>Players</h1>
    </div>
  );
}
