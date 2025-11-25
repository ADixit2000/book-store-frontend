import React from "react";
import { Link } from "react-router-dom";
import { LuChartBarIncreasing } from "react-icons/lu";
import { GiArchiveResearch } from "react-icons/gi";
import { RiUserShared2Line } from "react-icons/ri";
import { TbHeart } from "react-icons/tb";
import { FaShoppingCart } from "react-icons/fa";
import avartarImg from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "View Cart", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const [isDropDownOpen, setIsDropdownOpen] = React.useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser, logOut } = useAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
      alert("User logout successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <header className="max-w-screen-lg mx-auto px-2 py-6">
      <nav className="flex justify-between items-center">
        {/* left side */}
        <div className="flex items-center md:gap-16 gap-1">
          <Link to="/">
            <LuChartBarIncreasing className="size-6" />
          </Link>
          {/* sear bar */}
          <div className="relative sm:w-72 w-40 space-x-2">
            <GiArchiveResearch className="absolute inline-block left-3 inset-y-2 top-2 text-gray-600" />
            <input
              type="text"
              placeholder="Search here"
              className="bg-gradient-to-r from-[#D1FFFC] to-[#DBEAE9] p-1 rounded-md md:px-8 px-6 focus:outline-none"
            />
          </div>
        </div>

        {/* right side */}
        <div className="relative flex items-center md:space-x-3 space-x-1">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropDownOpen)}>
                  <img
                    src={avartarImg}
                    alt=""
                    className={`size-7 rounded-full mt-2 ${
                      currentUser ? "ring-2 ring-teal-600" : ""
                    }`}
                  />
                </button>
                {/*{show dropdown} */}
                {isDropDownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-blue-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="block w-full px-4 py-2 text-sm  hover:bg-gradient-to-b from-[#80eee7] to-[#DBEAE9]"
                      >
                        Logout
                      </button>
                    </li>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <RiUserShared2Line className="size-6" />
              </Link>
            )}
          </div>
          <button className="hidden sm:block">
            <TbHeart className="size-6" />
          </button>
          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 px-1 flex items-center rounded-md text-white"
          >
            <FaShoppingCart className="" />
            {cartItems.length > 0 ? (
              <span className="text-sm font-semibold sm:ml-1 ml-1">
                {cartItems.length}
              </span>
            ) : (
              <span className="text-sm font-semibold sm:ml-1 ml-1">0</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
