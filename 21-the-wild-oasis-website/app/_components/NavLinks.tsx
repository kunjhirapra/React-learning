import Link from "next/link";
import {JSX} from "react";

function NavLinks({
  link,
  pathname,
}: {
  link: {name: string; href: string; icon: JSX.Element};
  pathname: string;
}) {
  return (
    <li key={link.name}>
      <Link
        className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
          pathname === link.href ? "bg-primary-900" : "text-primary-100"
        }`}
        href={link.href}>
        {link.icon}
        <span>{link.name}</span>
      </Link>
    </li>
  );
}

export default NavLinks;
