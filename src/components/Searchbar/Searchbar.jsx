import css from './Searchbar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import PropTypes from 'prop-types';

export function Searchbar({ onSubmit }) {
  const onSubmitForm = e => {
    e.preventDefault();
    const value = e.target.elements.searchQuery.value;
    onSubmit(value);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmitForm}>
        <button className={css.SearchFormButton} type="submit">
          <IconContext.Provider value={{ size: '2em' }}>
            <div>
              <AiOutlineSearch />
            </div>
          </IconContext.Provider>
        </button>
        <input
          type="text"
          className={css.SearchFormInput}
          name="searchQuery"
          placeholder="Search images and photos"
          autoFocus
          autoComplete="off"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
