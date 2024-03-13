import { useState, useCallback } from 'react';
import useSWRImmutable from 'swr/immutable';
import Home from '@/components/HomeView';
import Navbar from '@/components/Navbar';
import * as API from '@/api';
import './App.css';

function App() {
  const [search, setSearch] = useState<string>();

  const { data, isLoading } = useSWRImmutable(
    '/configuration',
    API.getConfiguration,
  );

  const onSearch = useCallback((query?: string) => setSearch(query), []);

  const mode = search !== '' && search != null ? 'searching' : 'trending';

  return (
    <div className="App">
      <Navbar onSearch={onSearch} />
      {isLoading === false && data && (
        <Home
          mode={mode}
          search={search}
          imgPrefix={`${data.images.secure_base_url}${data.images.poster_sizes[0]}`}
        />
      )}
    </div>
  );
}

export default App;
