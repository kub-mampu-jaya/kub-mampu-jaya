interface LogoProps {
  light?: boolean;
}

export function Logo({ light = false }: LogoProps) {
  const color = light ? "text-white" : "text-black";

  return (
    <div className="flex items-center gap-2">
      <div className={`w-10 h-10 rounded flex items-center justify-center`}>
        <div>
            <img src="/images/logo-pbp.png" />
        </div>
      </div>
      <span className={color}>FNB E-Commerce</span>
    </div>
  );
}
