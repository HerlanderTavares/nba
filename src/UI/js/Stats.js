import styles from '../css/Stats.module.scss';
import {checkClass, css} from '../../Sections/helpers';

const Field = props => {
  return (
    <div className={css(styles, 'stats__field')}>
      <span className={css(styles, 'stats__label')}>{props.label}</span>
      <span className={css(styles, 'stats__value')}>{props.value}</span>
    </div>
  );
};

export default function DisplayStats(props) {
  const stats = Object.entries(props.stats);

  const displayStats = stats.map((stat, i) => {
    const label = stat[0] == 'FG' ? 'FG%' : stat[0];
    const value = label == 'Standings' ? `#${stat[1]}` : stat[1];

    return <Field key={i} label={label} value={value} />;
  });

  const classes = css(styles, 'stats') + checkClass(props.className);

  return <div className={classes}>{displayStats}</div>;
}
