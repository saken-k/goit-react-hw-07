import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";
import css from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  return (
    <div className={css.search}>
      <p className={css.p}>Find contacts by name</p>
      <input
        className={css.input}
        type="text"
        value={filter}
        onChange={(evt) => dispatch(changeFilter(evt.target.value))}
      />
    </div>
  );
};

export default SearchBox;
