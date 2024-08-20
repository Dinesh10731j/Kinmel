
import Header from './Components/Header';
import Footer from './Components/Footer';
import {Outlet} from 'react-router-dom';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};


export default App;
