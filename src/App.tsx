import { useState, useCallback } from 'react';
import Home from '@/components/HomeView';
import Navbar from '@/components/Navbar';
import './App.css';

function App() {
  const [search, setSearch] = useState<string>();
  const onSearch = useCallback((query?: string) => setSearch(query), []);

  const mode = search !== '' && search != null ? 'searching' : 'trending';

  return (
    <div className="App">
      <Navbar onSearch={onSearch} />
      <Home mode={mode} search={search} />
    </div>
  );
}

export default App;
