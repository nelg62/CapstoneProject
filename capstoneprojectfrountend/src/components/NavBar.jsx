"use client";

import React, { useState, useEffect, useRef } from "react";
import { useUserContext } from "@/context/UserContext";
import { useCartContext } from "@/context/CartContext";
import { Avatar } from "./ui/avatar";
import { Menu as MenuIcon, ShoppingCart, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Tooltip, TooltipProvider } from "./ui/tooltip";
import CustomizedBadges from "./cartIcon";

const pages = ["Dashboard", "Products", "About"];
const authPages = ["Signup", "Login"];

export default function ResponsiveAppBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { userState, LogoutFunction } = useUserContext();
  const { clearCart } = useCartContext();
  const [isClient, setIsClient] = useState(false);

  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
          <Link
            href="/dashboard"
            className="tw-text-white tw-text-xl tw-font-semibold"
          >
            LOGO
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:tw-hidden">
          <button onClick={toggleMenu} className="tw-text-white">
            <MenuIcon />
          </button>
          {menuOpen && (
            <div
              ref={menuRef}
              className="tw-absolute tw-top-16 tw-left-0 tw-right-0 tw-bg-gray-800 tw-z-50"
            >
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
          <CustomizedBadges />

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
              ref={dropdownRef}
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
