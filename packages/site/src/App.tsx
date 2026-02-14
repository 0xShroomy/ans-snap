import type { FunctionComponent, ReactNode } from 'react';
import { useContext } from 'react';

import { Footer, Header } from './components';
import { ToggleThemeContext } from './Root';

export type AppProps = {
  children: ReactNode;
};

export const App: FunctionComponent<AppProps> = ({ children }) => {
  const toggleTheme = useContext(ToggleThemeContext);

  return (
    <>
      <div className="relative z-0 flex min-h-screen w-full flex-col">
        <Header handleToggleClick={toggleTheme} />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </>
  );
};
