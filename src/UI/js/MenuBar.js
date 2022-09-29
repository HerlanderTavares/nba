import styles from '../css/MenuBar.module.scss';
import {css} from '../../Sections/helpers';
import {useContext} from 'react';
import State from '../../API/State';

const Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <title>Chevron Back</title>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="48"
      d="M328 112L184 256l144 144"
    />
  </svg>
);

export default function MenuBar(props) {
  const state = useContext(State);

  return (
    <div className={css(styles, 'menu-bar')} style={{backgroundColor: props.color || null}}>
      <div className={css(styles, 'container')}>
        <button>
          <Icon /> Back
        </button>

        <button>
          <img src={require('../../Images/logo.png')} alt="" />
        </button>
      </div>
    </div>
  );
}
