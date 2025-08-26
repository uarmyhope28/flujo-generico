import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import CreateRequest from './pages/CreateRequest';
import RequestList from './pages/RequestList';
import RequestView from './pages/RequestView';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [viewParams, setViewParams] = useState(null);

  const handleNavigate = (view, params = null) => {
    setCurrentView(view);
    setViewParams(params);
    
    // Scroll to top cuando navegamos
    window.scrollTo(0, 0);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      
      case 'create':
        return <CreateRequest onNavigate={handleNavigate} />;
      
      case 'list':
        // Si viewParams es un objeto, se usa como filtros iniciales
        const initialFilters = typeof viewParams === 'object' ? viewParams : {};
        return (
          <RequestList 
            onNavigate={handleNavigate} 
            initialFilters={initialFilters}
          />
        );
      
      case 'view':
        // viewParams contiene el requestId
        return (
          <RequestView 
            requestId={viewParams} 
            onNavigate={handleNavigate} 
          />
        );
      
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="App">
      {renderCurrentView()}
    </div>
  );
}

export default App;