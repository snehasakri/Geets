import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Book Now", path: "/book" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20 px-4 w-full">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Geet's Salon Logo"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-display text-xl md:text-2xl font-bold text-primary">
                GEET'S
              </span>
              <span className="text-[10px] md:text-xs text-muted-foreground tracking-wider">
                Beauty Salon & Spa
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium transition-colors duration-300 hover:text-primary ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-foreground/80"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button asChild className="btn-rose rounded-full px-6">
              <a
                href="https://wa.me/919876543210?text=Hi, I'd like to book an appointment"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Now
              </a>
            </Button>

            {/* Login / Admin / Logout */}
            {!parsedUser && (
              <Button
                onClick={() => navigate("/login")}
                className="rounded-full px-5"
                variant="outline"
              >
                Login
              </Button>
            )}

            {parsedUser?.role === "admin" && (
              <Button
                onClick={() => navigate("/admin-dashboard")}
                className="rounded-full px-5"
                variant="secondary"
              >
                Admin
              </Button>
            )}

            {parsedUser && (
              <Button
                onClick={handleLogout}
                className="rounded-full px-5"
                variant="destructive"
              >
                Logout
              </Button>
            )}
          </div>

          {/* ✅ Mobile Menu Button (FIXED POSITION) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border animate-fade-in">
          <div className="flex flex-col py-4 px-4 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-accent text-primary"
                    : "text-foreground/80 hover:bg-accent"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <a
              href="https://wa.me/919876543210?text=Hi, I'd like to book an appointment"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 py-3 px-4 bg-primary text-primary-foreground rounded-full text-center font-medium"
            >
              Book on WhatsApp
            </a>

            {/* Mobile Login/Admin/Logout */}
            {!parsedUser && (
              <button
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
                className="py-3 px-4 border rounded-full text-center"
              >
                Login
              </button>
            )}

            {parsedUser?.role === "admin" && (
              <button
                onClick={() => {
                  navigate("/admin-dashboard");
                  setIsOpen(false);
                }}
                className="py-3 px-4 bg-secondary rounded-full text-center"
              >
                Admin Panel
              </button>
            )}

            {parsedUser && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="py-3 px-4 bg-red-500 text-white rounded-full text-center"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;