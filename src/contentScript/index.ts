import ReactDOM from 'react-dom/client';
import { createElement } from 'react';
import App from './App';
// Tạo một container để render giao diện
const container = document.createElement('div');
container.id = 'facebook-master-tool';
document.body.appendChild(container);

// Render React vào container
const root = ReactDOM.createRoot(container);
root.render(createElement(App));
