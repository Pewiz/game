function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Información de la carrera */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-blue-400">
              ¡Únete a Ingeniería Civil Informática!
            </h3>
            <p className="text-gray-300 text-sm">
              Desarrolla el futuro de la tecnología con nosotros
            </p>
          </div>

          {/* Enlaces y contacto */}
          <div className="flex flex-col items-center md:items-end space-y-2">
            <div className="flex space-x-4 text-sm">
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Más información
              </a>
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Admisión
              </a>
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Contacto
              </a>
            </div>
            <p className="text-gray-400 text-xs">
              © 2025 Universidad Ejemplo - Todos los derechos reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
