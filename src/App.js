import React from 'react';
import { Routes, Route } from 'react-router'

// components
import { Orders } from './pages/Orders'
import { Menu } from './pages/Menu'
import { NewSaucer } from './pages/NewSaucer'
import { Sidebar } from './ui/Sidebar'

function App() {
  return (
    <div className="md:flex min-h-screen">
      <Sidebar />

      <div className='md:w-3/5 xl:w-4/5'>
        <Routes>
          <Route path='/' element={<Orders />} exact />
          <Route path='/menu' element={<Menu />} exact />
          <Route path='/new-saucer' element={<NewSaucer />} exact />
        </Routes>
      </div>
    </div>
  );
}

export default App;

