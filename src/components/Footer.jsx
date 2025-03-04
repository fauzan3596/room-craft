import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#215147] text-[#AAC2B5] py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start">
          <div className="mb-4">
            {/* Logo (Placeholder) */}
            <img src="/room-craft-logo.png" alt="Logo" className="h-14 w-14" />
          </div>
          <p className="text-sm text-center md:text-left">
            © 2025 RoomCraft, Inc. <br /> All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Design
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Support
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-semibold text-lg mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Careers
              </a>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-semibold text-lg mb-4">Connect</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
