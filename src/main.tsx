import ReactDOM from 'react-dom/client';
import Modal from 'react-modal';
import { preload } from 'swr';
import * as API from '@/api';
import App from './App.tsx';
import './index.css';

preload('/configuration', API.getConfiguration);

const root = document.getElementById('root')!;
Modal.setAppElement(root);
ReactDOM.createRoot(root).render(<App />);
