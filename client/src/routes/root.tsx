import { NavBar } from '../components/NavBar';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <section className='flex'>
      <nav className='h-screen p-2 bg-gray-800 text-white'>
        <NavBar />
      </nav>
      <main>
        <Outlet />
      </main>
    </section>
  );
}