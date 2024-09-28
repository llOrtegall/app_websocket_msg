import { NavBar } from '../components/NavBar';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <section className='flex'>
      <nav className='p-2'>
        <NavBar />
      </nav>
      <main>
        <Outlet />
      </main>
    </section>
  );
}