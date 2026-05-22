import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Calculator } from './pages/Calculator';
import { Catalog } from './pages/Catalog';
import { Portfolio } from './pages/Portfolio';
import { About } from './pages/About';
import { Contacts } from './pages/Contacts';
import { Admin } from './pages/Admin';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'calculator', Component: Calculator },
      { path: 'catalog', Component: Catalog },
      { path: 'portfolio', Component: Portfolio },
      { path: 'about', Component: About },
      { path: 'contacts', Component: Contacts },
      { path: '*', Component: NotFound },
    ],
  },
  {
    path: '/admin',
    Component: Admin,
  },
]);