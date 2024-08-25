import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
// import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store as CustomStore } from '../redux/store';
import App from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <HashRouter>
    <Provider store={CustomStore}>
      <App />
    </Provider>
  </HashRouter>
);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);

// root.render(
//   <StrictMode>
//     <HashRouter>
//       <Provider store={CustomStore}>
//         <App />
//       </Provider>
//     </HashRouter>
//   </StrictMode>
// );
