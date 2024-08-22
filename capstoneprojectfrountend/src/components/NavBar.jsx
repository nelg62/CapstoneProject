"use client";

import React, { useState, useEffect } from "react";
import { useUserContext } from "@/context/UserContext";
import { useCartContext } from "@/context/CartContext";
import { Avatar } from "./ui/avatar";
import { Menu as MenuIcon, ShoppingCart, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Tooltip, TooltipProvider } from "./ui/tooltip";

const pages = ["dashboard", "products", "about"];
const authPages = ["signup", "login"];

export default function ResponsiveAppBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { userState, LogoutFunction } = useUserContext();
  const { clearCart } = useCartContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    LogoutFunction();
    clearCart();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="tw-bg-gray-800">
      <div className="tw-container tw-mx-auto tw-px-4 tw-flex tw-justify-between tw-items-center tw-h-16">
        <div className="tw-flex tw-items-center">
          <Link href="/" className="tw-text-white tw-text-xl tw-font-semibold">
            LOGO
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:tw-hidden">
          <button onClick={toggleMenu} className="tw-text-white">
            <MenuIcon />
          </button>
          {menuOpen && (
            <div className="tw-absolute tw-top-16 tw-left-0 tw-right-0 tw-bg-gray-800 tw-z-50">
              {pages.map((page) => (
                <Link key={page} href={`/${page.toLowerCase()}`}>
                  <Button
                    onClick={() => setMenuOpen(false)}
                    className="tw-w-full tw-text-white"
                  >
                    {page}
                  </Button>
                </Link>
              ))}
              {isClient &&
                !userState.isAuthenticated &&
                authPages.map((page) => (
                  <Link key={page} href={`/${page.toLowerCase()}`}>
                    <Button
                      onClick={() => setMenuOpen(false)}
                      className="tw-w-full tw-text-white"
                    >
                      {page}
                    </Button>
                  </Link>
                ))}
            </div>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="tw-hidden md:tw-flex tw-space-x-4">
          {pages.map((page) => (
            <Link key={page} href={`/${page.toLowerCase()}`}>
              <Button className="tw-text-white">{page}</Button>
            </Link>
          ))}
          {isClient &&
            !userState.isAuthenticated &&
            authPages.map((page) => (
              <Link key={page} href={`/${page.toLowerCase()}`}>
                <Button className="tw-text-white">{page}</Button>
              </Link>
            ))}
        </div>

        {/* Cart and Avatar/Logout */}
        <div className="tw-flex tw-items-center tw-space-x-4">
          <Link href="/cart">
            <Button className="tw-text-white">
              <ShoppingCart />
            </Button>
          </Link>

          {/* Avatar with Dropdown for Mobile */}
          <div className="tw-relative">
            <TooltipProvider>
              <Tooltip content="Open settings">
                <button
                  onClick={toggleDropdown}
                  className="tw-flex tw-items-center tw-space-x-2"
                >
                  <Avatar
                    src={userState.avatar || ""}
                    alt={userState.username || "User"}
                    className="tw-h-8 tw-w-8 tw-bg-gray-500 tw-flex tw-items-center tw-justify-center"
                  >
                    {!userState.avatar && (
                      <UserIcon className="tw-text-white" />
                    )}
                  </Avatar>
                </button>
              </Tooltip>
            </TooltipProvider>

            {/* Dropdown for Mobile */}
            <div
              className={`tw-absolute tw-right-0 tw-mt-2 tw-w-48 tw-bg-white tw-rounded-md tw-shadow-lg ${
                dropdownOpen ? "tw-block" : "tw-hidden"
              } md:tw-hidden`}
            >
              <Button
                onClick={handleLogout}
                className="tw-w-full tw-text-white"
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Inline Logout for Desktop */}
          <div className="tw-hidden md:tw-flex tw-items-center tw-space-x-4">
            <Button onClick={handleLogout} className="tw-text-white">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
