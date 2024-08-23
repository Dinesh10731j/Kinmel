import { NavLink } from "react-router-dom";

const Error404 = () => {
  return (
    <>
      <section className="mb-4 px-3 py-2">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb flex space-x-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-black font-bold" : "text-gray-500"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li className="text-gray-500">
            <NavLink
                to="*"
                className={({ isActive }) =>
                  isActive ? "text-black font-bold" : "text-gray-500"
                }
              >
              404 Error
              </NavLink>
            </li>
          </ol>
        </nav>
      </section>

      <section className="flex flex-col justify-center items-center pb-2 py-20">
        <h1 className="text-3xl md:text-7xl font-bold py-20 ">404 - Page Not Found</h1>
        <p className="text-gray-500 mb-4 py-4">Sorry, the page you're looking for doesn't exist.</p>
        <NavLink
          to="/"
          className="bg-[#DB4444] px-7 py-2 md:px-12 md:py-2 rounded-md text-[#FFFF]"
        >
          Go Back to Home
        </NavLink>
      </section>
    </>
  );
};

export default Error404;
