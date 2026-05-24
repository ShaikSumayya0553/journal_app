import { Link } from "react-router-dom";

function Navbar() {

  return (
    <div className="bg-white shadow-lg rounded-2xl px-6 py-4 flex items-center justify-between mb-8">

      <h1 className="text-3xl font-bold text-blue-600">
        My Journal
      </h1>

      <div className="flex gap-4">

        <Link
          to="/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold transition duration-300"
        >
          Create Post
        </Link>

        <Link
          to="/"
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-semibold transition duration-300"
        >
          Logout
        </Link>

      </div>

    </div>
  );
}

export default Navbar;