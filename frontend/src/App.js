import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <h1 className="text-center">Welcome to the app!</h1>
      </main>
      <Footer />
    </>
  );
};

export default App;
