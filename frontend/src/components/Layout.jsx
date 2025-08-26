import React from 'react';

const Layout = ({ children, title = "Sistema de Aprobaciones" }) => {
  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand mb-0 h1">
            Flujo Genérico de aprovaciones
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-4">
        <div className="row">
          <div className="col-12">
            {title && (
              <div className="mb-4">
                <h2 className="text-dark">{title}</h2>
                <hr />
              </div>
            )}
            {children}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light py-3 mt-auto">
        <div className="container text-center">
          <small>Sistema de Solicitudes de Aprobación v1.0</small>
        </div>
      </footer>
    </div>
  );
};

export default Layout;