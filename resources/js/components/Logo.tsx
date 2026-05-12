interface LogoProps {
  variant?: "light" | "dark";
}

export function Logo({ variant = "dark" }: LogoProps) {

  const logoSrc =
    variant === "light"
      ? "/images/Logo KUP putih.png"
      : "/images/Logo KUP hitam.png";

  const textColor =
    variant === "light"
      ? "text-white"
      : "text-black";

  return (
    <div className="flex items-center gap-2">
      <div className="flex h-20 w-20 items-center justify-center rounded">
        <img
          src={logoSrc}
          alt="Logo"
          className="h-full w-full object-contain"
        />
      </div>

      <span className={textColor}>
        FNB E-Commerce
      </span>
    </div>
  );
}
