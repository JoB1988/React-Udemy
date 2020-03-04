import React from 'react';
import NavBar from './components/navbar';
import Rotas from './rotas';

function App() {
    return (
    <div className='container'>
        {/* Header */}
        <NavBar />
        {/* Rotas, é tipo router-outlet */}
        <Rotas />
    </div>
    )
}

export default App;