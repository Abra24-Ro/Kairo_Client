import { Link } from "react-router-dom";
import clsx from "clsx";

type FooterLink = {
  text: string;
  to: string;
  toLabel?: string;
};

type AuthFooterLinkProps = {
  primary: FooterLink;
  secondary?: FooterLink;
  className?: string;
};

export const AuthFooterLink = ({
  primary,
  secondary,
  className,
}: AuthFooterLinkProps) => {
  return (
    <div
      className={clsx(
        "mt-6 text-center space-y-2 text-sm text-gray-500",
        className
      )}
    >
      {/* Primary link */}
      <p>
        {primary.text}{" "}
        <Link
          to={primary.to}
          className="font-medium text-indigo-600 hover:text-indigo-500 transition"
        >
          {primary.toLabel ?? primary.to}
        </Link>
      </p>

 
      {secondary && (
        <Link
          to={secondary.to}
          className="
            inline-block
            text-sm text-gray-400
            hover:text-indigo-500
            transition
          "
        >
          {secondary.text}
        </Link>
      )}
    </div>
  );
};
