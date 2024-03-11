import { FC } from 'react';
import SearchBox, { Props as SearchBoxProps } from '@/components/SearchBox';
import './navbar.css';

type Props = SearchBoxProps;

const Navbar: FC<Props> = (props) => {
  return (
    <nav className="navbar">
      <h2>TMDB</h2>
      <SearchBox {...props} />
    </nav>
  );
};

export default Navbar;
