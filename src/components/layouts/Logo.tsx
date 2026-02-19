import { Link } from "react-router-dom";

interface LogoProps {
  logoSrc?: string;
  size?: "sm" | "md" | "lg" | "xl";
  subtitle?: string;
  showText?: boolean;
}

const sizeClasses = {
  sm: "h-10 w-auto",
  md: "h-20 w-auto",
  lg: "h-35 w-auto",
  xl: "h-45 w-auto",
};

export const Logo = ({
  logoSrc = "/logo.png",
  size = "lg",
  subtitle,
  showText = false,
}: LogoProps) => {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      {/* Logo Image */}
      <div className="shrink-0">
        <img
          src={logoSrc}
          alt="Logo"
          className={`${sizeClasses[size]} object-contain transition-transform group-hover:scale-105`}
        />
      </div>

      {/* Brand Text (optional) */}
      {showText && (
        <div className="hidden sm:block">
          <h1 className="text-lg font-semibold text-gray-900">
            UpTask
          </h1>
          {subtitle && (
            <p className="text-xs text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </Link>
  );
};