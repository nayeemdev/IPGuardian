import { NavLink } from "react-router-dom";

const DropdownLink = ({ children, ...props }) => (
  <NavLink>
    {({ active }) => (
      <NavLink
        {...props}
        className={`w-full text-left block px-4 
      py-2 text-sm leading-5 text-gray-700 ${({ isActive }) =>
        isActive
          ? "bg-gray-100"
          : ""} focus:outline-none transition duration-150 ease-in-out`}
      >
        {children}
      </NavLink>
    )}
  </NavLink>
);

export const DropdownButton = ({ children, ...props }) => (
  <NavLink>
    {({ active }) => (
      <button
        className={`w-full text-left block px-4 py-2 
        text-sm leading-5 text-gray-700 ${active ? "bg-gray-100" : ""}
         focus:outline-none transition duration-150 ease-in-out`}
        {...props}
      >
        {children}
      </button>
    )}
  </NavLink>
);

export default DropdownLink;
