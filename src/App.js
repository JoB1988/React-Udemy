import React from 'react';
import NavBar from './components/navbar';
import Routes from './routes';

function App() {
    return (
    <div className='container'>
        {/* Header */}
        <NavBar />
        {/* Rotas, é tipo router-outlet */}
        <Routes />
    </div>
    )
}

export default App;