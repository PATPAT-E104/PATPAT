import { Outlet } from 'react-router-dom';
import Footer from './components/common/Footer/Footer';
import Header from './components/common/Header/Header';
import { Reset } from 'styled-reset';
const App = () => {
  return (
    <>
      <Reset />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
