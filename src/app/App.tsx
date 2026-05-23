import { RouterProvider } from 'react-router';
import { EstimateProvider } from './context/EstimateContext';
import { DataProvider } from './context/DataContext';
import { router } from './routes';

export default function App() {
  return (
    <DataProvider>
      <EstimateProvider>
        <RouterProvider router={router} />
      </EstimateProvider>
    </DataProvider>
  );
}