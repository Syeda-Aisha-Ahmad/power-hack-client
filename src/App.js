import { RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './Layout/Layout';
import { router } from './Router/Router';

function App() {
  return (
    <div className="App max-w-[1350px] mx-auto">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
