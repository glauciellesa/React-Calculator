import { createRoot } from 'react-dom/client';
import Calculator from './component/Calculator';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(<Calculator />);
