function Header() {
  const name = "Taller de Programación - Ingeniería Civil en Informática";
  const linkAdmision = "https://admision.ulagos.cl/Carreras/ingenieria-civil-en-informatica/";

  return (
    <header className="bg-[#00275e] text-white min-h-[70px] xl:min-h-[87px] flex flex-col md:flex-row md:justify-around md:items-center gap-8 md:gap-0">
        {/* Logo Universidad */}
        <div className="flex justify-center md:justify-start">
          <a 
            href="https://www.ulagos.cl/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <img
              src="https://res.cloudinary.com/doq82xcpd/image/upload/v1730396958/hcdm7gwagrz84vth9uem.svg"
              alt="Ulagos Logo"
              className="h-auto max-h-12"
            />
          </a>
        </div>

        {/* Título */}
        <div className="text-center">
          <h1 className="text-xl font-bold ">
            {name}
          </h1>
        </div>

        {/* Botón Admisión */}
        <div className="flex justify-center md:justify-end">
          <a 
            href={linkAdmision} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white "
          >
            <button className="
              bg-[#295494] 
              text-white 
              font-medium 
              text-[13px]
              rounded-[5px]
              border-none
              outline-3 outline-[#295494] outline-offset-[-3px]
              cursor-pointer
              transition-all duration-400
              hover:bg-[#ff4c00] hover:outline-[#ff4c00]
              md:w-[90px] md:py-[9px]
            ">
              Admisión
            </button>
          </a>
        </div>
    </header>
  );
}

export default Header;
