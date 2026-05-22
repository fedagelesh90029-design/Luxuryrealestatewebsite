import { RouterProvider } from 'react-router';
import { EstimateProvider } from './context/EstimateContext';
import { router } from './routes';

export default function App() {
  return (
    <EstimateProvider>
      <RouterProvider router={router} />
    </EstimateProvider>
  );
}