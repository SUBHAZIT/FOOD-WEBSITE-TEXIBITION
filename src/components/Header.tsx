import texibitionLogo from "@/assets/texibition-logo.png";
import { LogOut } from "lucide-react";

interface HeaderProps {
  operatorName: string;
  onLogout: () => void;
}

const Header = ({ operatorName, onLogout }: HeaderProps) => {
  return (
    <header className="bg-black px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-lg">
      <img src={texibitionLogo} alt="TEXIBITION 2K26" className="h-9 md:h-11" />
      <div className="flex items-center gap-3">
        <span className="text-white/80 text-xs uppercase font-heading tracking-wide">
          {operatorName}
        </span>
        <button
          onClick={onLogout}
          className="p-2 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Exit"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default Header;
