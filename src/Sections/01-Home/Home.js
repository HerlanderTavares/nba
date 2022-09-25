import styles from './Home.module.scss';
import {css} from '../helpers';

export default function Home(props) {
  return <div className={css(styles, 'home')}></div>;
}
