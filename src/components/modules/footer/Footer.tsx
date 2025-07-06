import { Copyright, GithubIcon, Server } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="mt-auto">
      <footer className="flex w-full  flex-col md:flex-row   md:items-center justify-start gap-2 p-4  border-t">
        <Link to={"/"} className="order-1 max-md:text-center md:order-none">
          LibraHub
        </Link>
        {/* <nav className="order-3 md:order-none flex-1 justify-center grid md:flex">
          <Link
            to={"/books"}
            className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-950 dark:hover:text-gray-50 dark:focus:ring-gray-300"
          >
            All Books
          </Link>
          <Link
            to={"/create-book"}
            className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-950 dark:hover:text-gray-50 dark:focus:ring-gray-300"
          >
            Add Books
          </Link>
          <Link
            to={"/borrow-summary"}
            className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-950 dark:hover:text-gray-50 dark:focus:ring-gray-300"
          >
            Borrow Summary
          </Link>
        </nav> */}
        <div className="order-3 md:order-none flex-1 justify-center grid md:flex">
          <div className="flex items-center gap-1 justify-center">
            <Copyright className="mt-0.5" size={17} /> 2025 LibraHub | All
            rights reserved
          </div>
        </div>
        <div className="order-2 md:order-none flex  justify-center md:max-w-xs items-center md:justify-end gap-4">
          <Link
            to={"https://github.com/smanas1/Assignment04-client"}
            className="inline-flex h-8 items-center rounded-full border border-gray-200 dark:border-gray-800 shadow-sm w-8 hover:scale-125 hover:rotate-12 transition-transform p-2"
          >
            <span className="sr-only">GitHub</span>
            <GithubIcon className="w-4 h-4 fill-github" />
          </Link>
          <Link
            to={"https://github.com/smanas1/Assignment04-server"}
            className="inline-flex h-8 items-center rounded-full border border-gray-200 dark:border-gray-800 shadow-sm w-8 hover:scale-125 hover:rotate-12 transition-transform p-2"
          >
            <span className="sr-only">GitHub</span>
            <Server className="w-4 h-4 fill-github" />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
