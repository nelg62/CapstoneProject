"use client";

import React, { useState, useEffect } from "react";
import { useUserContext } from "@/context/UserContext";
import { useCartContext } from "@/context/CartContext";
import { Avatar } from "./ui/avatar";
import { Menu as MenuIcon, ShoppingCart, Adb as AdbIcon } from "lucide-react";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
} from "./ui/menubar";
import { Button } from "./ui/button";
import { Tooltip, TooltipProvider } from "./ui/tooltip";

const pages = ["dashboard", "products", "about"];
const authPages = ["signup", "login"];

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
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

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center">
          {/* <AdbIcon className="text-white hidden md:block mr-2" /> */}
          <Link href="/" className="text-white text-xl font-semibold">
            LOGO
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={handleOpenNavMenu} className="text-white">
            <MenuIcon />
          </button>
          {anchorElNav && (
            <Menubar open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
              <MenubarMenu>
                <MenubarContent>
                  {pages.map((page) => (
                    <MenubarItem key={page}>
                      <Link href={`/${page.toLowerCase()}`}>
                        <Button
                          onClick={handleCloseNavMenu}
                          className="text-black"
                        >
                          {page}
                        </Button>
                      </Link>
                    </MenubarItem>
                  ))}
                  {isClient &&
                    !userState.isAuthenticated &&
                    authPages.map((page) => (
                      <MenubarItem key={page}>
                        <Link href={`/${page.toLowerCase()}`}>
                          <Button
                            onClick={handleCloseNavMenu}
                            className="text-black"
                          >
                            {page}
                          </Button>
                        </Link>
                      </MenubarItem>
                    ))}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          )}
        </div>
        <div className="hidden md:flex space-x-4">
          {pages.map((page) => (
            <Link key={page} href={`/${page.toLowerCase()}`}>
              <Button className="text-white">{page}</Button>
            </Link>
          ))}
          {isClient &&
            !userState.isAuthenticated &&
            authPages.map((page) => (
              <Link key={page} href={`/${page.toLowerCase()}`}>
                <Button className="text-white">{page}</Button>
              </Link>
            ))}
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <Button className="text-white">
              <ShoppingCart />
            </Button>
          </Link>
          <TooltipProvider>
            <Tooltip content="Open settings">
              <button onClick={handleOpenUserMenu}>
                <Avatar
                  src=""
                  alt={userState.username || "User"}
                  className="h-8 w-8"
                />
              </button>
            </Tooltip>
          </TooltipProvider>
          {anchorElUser && (
            <Menubar open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
              <MenubarItem onClick={handleLogout}>
                <Button className="text-black">Logout</Button>
              </MenubarItem>
            </Menubar>
          )}
        </div>
      </div>
    </nav>
  );
}
