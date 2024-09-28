import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <nav>
        <ul>
          <li><a href='/'>Home</a></li>
          <li><a href='/about'>About</a></li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}