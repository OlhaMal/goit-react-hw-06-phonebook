import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';
import { setFilter } from 'redux/actions';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const handleChange = evt => {
    dispatch(setFilter(evt.target.value));
  };

  return (
    <div className={css.filter}>
      <label className={css.filterLabel}>Find contacts by name</label>
      <input type="text" name="filter" value={filter} onChange={handleChange} />
    </div>
  );
};
