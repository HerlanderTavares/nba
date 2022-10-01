import styles from '../css/Prompt.module.scss';
import {css} from '../../Sections/helpers';

export default function Prompt(props) {
  return (
    <>
      <div className={css(styles, 'prompt__bkg')}></div>
      <div className={css(styles, 'prompt')}>
        <h2>{props.title}</h2>
        <p>{props.children}</p>
        <button onClick={props.onClick}>OK</button>
      </div>
    </>
  );
}
