import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../assets/styles/global';
import Home from '../pages/Home';

import light from '../../assets/styles/themes/light';

export default function App() {
  return (
    <ThemeProvider theme={light}>
      <GlobalStyles />
      <Home />
    </ThemeProvider>
  );
}
