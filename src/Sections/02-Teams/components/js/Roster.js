import styles from '../css/Roster.module.scss';
import {css} from '../../../helpers';

export default function Roster(props) {
  return (
    <div className={css(styles, 'roster')}>
      <h1>Roster</h1>
    </div>
  );
}
