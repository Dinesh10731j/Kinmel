import { NavLink, Outlet } from "react-router-dom";

const Account = () => {
  return (
    <>
      <section className="flex justify-between px-3 py-2">
        <section>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? "text-black font-bold" : "text-gray-500"
            }
          >
            Home
          </NavLink>
          <span> / </span>
          <NavLink
            to={"/account"}
            className={({ isActive }) =>
              isActive ? "text-black font-bold" : "text-gray-500"
            }
          >
            My Account
          </NavLink>
        </section>
        <section>
          <h1>Hi,<span className="text-[#DB4444]">Dinesh Tamang</span></h1>
        </section>
      </section>
      <section className=" flex flex-col md:flex-row justify-evenly mt-10">
        <section className="flex flex-col gap-6">
          <section className="px-3 py-2">
            <h1 className="text-xl md:text-3xl">Manage My Account</h1>
            <ul className="list-none px-6 py-2">
              <li>
                <NavLink
                  to={"/account/my-profile"}
                  className={({ isActive }) =>
                    isActive ? "text-[#DB4444]" : "text-gray-500"
                  }
                >
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={""}
                  className={({ isActive }) =>
                    isActive ? "text-[#DB4444]" : "text-gray-500"
                  }
                >
                  Address Book
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={""}
                  className={({ isActive }) =>
                    isActive ? "text-[#DB4444]" : "text-gray-500"
                  }
                >
                  My Payment Options
                </NavLink>
              </li>
            </ul>
          </section>
          <section className="px-3 py-2">
            <h1 className="text-xl md:text-3xl">My Orders</h1>
            <ul className="list-none px-6 py-2">
              <li>
                <NavLink
                  to={""}
                  className={({ isActive }) =>
                    isActive ? "text-[#DB4444]" : "text-gray-500"
                  }
                >
                  My Returns
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={""}
                  className={({ isActive }) =>
                    isActive ? "text-[#DB4444]" : "text-gray-500"
                  }
                >
                  My Cancellations
                </NavLink>
              </li>
            </ul>
          </section>
        </section>
        <section>
          <Outlet />
        </section>
      </section>
    </>
  );
};

export default Account;
