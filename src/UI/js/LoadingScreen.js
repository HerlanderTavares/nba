import styles from '../css/LoadingScreen.module.scss';
import {checkClass, css} from '../../Sections/helpers';
import {PuffLoader} from 'react-spinners';

export default function LoadingScreen(props) {
  const classes = css(styles, 'loading') + checkClass(props.className);

  return (
    <div className={classes} style={props.style}>
      {props.children}
      <PuffLoader size="100px" color={props.color || '#1d4289'} />
    </div>
  );
}
