import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="shadow-md">
      <nav className="w-[90%] max-w-5xl mx-auto py-4 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl tracking-wide font-medium">
            <span className="text-green-500 ">i</span>Tracker
          </h1>
        </Link>
        <ul className="flex gap-8">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;
