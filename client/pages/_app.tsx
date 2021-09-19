import type { AppProps /*, AppContext */ } from 'next/app';
import { useState } from 'react';
import Sidebar from 'react-sidebar';
import NavSide from '../components/Nav/NavSide';
import 'tailwindcss/tailwind.css';
import NavBar from '../components/Nav/NavBar';
import { Size } from '../interfaces/enums/Size';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [sidebar, setSidebar] = useState<boolean>(false);
  const handleToggleSidebar = () => setSidebar(!sidebar);

  return (
    <SessionProvider session={session}>
      <Sidebar
        open={sidebar}
        onSetOpen={handleToggleSidebar}
        sidebar={<NavSide onSidebar={handleToggleSidebar} />}
      >
        <NavBar onSidebar={handleToggleSidebar} size={Size.FULL} />
        <Component {...pageProps} />
      </Sidebar>
    </SessionProvider>
  );
}

export default MyApp;
