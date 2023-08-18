"use client";

import { cartContext } from "@/context/CartContext";
import { cn } from "@/helpers/classnames";
import { Navbar } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

const navLinks = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/blog",
    text: "Blog",
  },
  {
    href: "/store",
    text: "Store",
  },
  {
    href: "/cart",
    text: "Cart",
  },
];

const Header = () => {
  const pathname = usePathname();
  const { totalQuantityProduct } = useContext(cartContext);
  // hook exclusivo de Next, emite la página actual que se está visitando
  return (
    <Navbar fluid rounded>
      <Navbar.Brand>
        <img
          alt="Flowbite Logo"
          className="mr-3 h-6 sm:h-9"
          src="https://flowbite.com/docs/images/logo.svg"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Strapi
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {navLinks.map((navLink) => (
          <Navbar.Link
            key={navLink.href}
            href={navLink.href}
            active={pathname == navLink.href}
            as={Link} // as indica el comportamiento del Navbar.Link, en este caso será como Link de Next
            className={cn(
              pathname == navLink.href && "md:text-blue-500 bg-gray-950"
            )}
          >
            <span className="relative">
              {navLink.text}
              {navLink.text === "Cart" && (
                <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-5">
                  {totalQuantityProduct}
                </div>
              )}
            </span>
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;
