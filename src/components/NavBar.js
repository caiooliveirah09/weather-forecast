import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="w-full h-10 fixed z-20 text-gray-100 mb-4 uppercase font-semibold text-sm mt-3 ml-3">
      <nav className="">
        <Link className="mr-5" to="/">
          página inicial
        </Link>
        <Link className="mr-5" to="/search">
          buscar cidade
        </Link>
        <Link to="/contact">contato</Link>
      </nav>
    </div>
  );
}

export default NavBar;
