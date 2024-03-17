import { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react';
import './searchBox.css';

export type Props = {
  onSearch?: (query?: string) => void;
};

const SearchBox: FC<Props> = ({ onSearch }) => {
  const [search, setSearch] = useState<string>('');

  const clearInput = useCallback(() => {
    setSearch('');
    onSearch?.();
  }, [onSearch]);

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    [],
  );

  const submit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      onSearch?.(search);
    },
    [search, onSearch],
  );

  return (
    <form className="searchBox" autoComplete="off" onSubmit={submit}>
      <svg
        className="searchBox__searchIcon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 512 512"
        role="presentation"
      >
        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
      </svg>
      <input
        value={search}
        className="searchBox__input"
        name="search"
        placeholder="Search"
        onChange={onInputChange}
      />
      {search && (
        <svg
          className="searchBox__xMarkIcon"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 512 512"
          tabIndex={0}
          role="button"
          onClick={clearInput}
        >
          <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
        </svg>
      )}
    </form>
  );
};

export default SearchBox;
