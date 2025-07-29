function Header() {
  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Universidad (placeholder) */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-900 font-bold text-xl">U</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Universidad Ejemplo</h1>
              <p className="text-blue-200 text-sm">Facultad de Ingeniería</p>
            </div>
          </div>

          {/* Información de la carrera */}
          <div className="text-right">
            <h2 className="text-lg font-semibold">Taller de Programación</h2>
            <p className="text-blue-200">Ingeniería Civil Informática</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
