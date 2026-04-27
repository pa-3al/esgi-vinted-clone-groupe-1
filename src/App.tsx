import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-teal-600 text-white relative z-50">
        <div className="mx-auto px-4 py-3 flex items-center justify-between">
          <NavLink
            to="/"
            className="text-2xl font-bold hover:text-teal-100"
            onClick={closeMenu}
          >
            Vinted Clone
          </NavLink>

          <button
            className="md:hidden p-1 text-white hover:text-teal-200 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <nav className="hidden md:flex items-center gap-4 text-sm">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "text-white font-semibold" : "hover:text-teal-200"
              }
            >
              Accueil
            </NavLink>
            <NavLink
              to="/my-articles"
              className={({ isActive }) =>
                isActive ? "text-white font-semibold" : "hover:text-teal-200"
              }
            >
              Mes annonces
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? "text-white font-semibold" : "hover:text-teal-200"
              }
            >
              Favoris
            </NavLink>
            <NavLink
              to="/publish"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-teal-700 font-semibold px-4 py-1.5 rounded-full"
                  : "bg-white text-teal-700 font-semibold px-4 py-1.5 rounded-full hover:bg-teal-50"
              }
            >
              Publier
            </NavLink>
          </nav>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={closeMenu}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-teal-700 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-end">
          <button
            onClick={closeMenu}
            className="text-white hover:text-teal-200 focus:outline-none"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-6 px-6 py-2">
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold text-lg"
                : "text-teal-100 hover:text-white text-lg"
            }
          >
            Accueil
          </NavLink>
          <NavLink
            to="/my-articles"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold text-lg"
                : "text-teal-100 hover:text-white text-lg"
            }
          >
            Mes annonces
          </NavLink>
          <NavLink
            to="/favorites"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold text-lg"
                : "text-teal-100 hover:text-white text-lg"
            }
          >
            Favoris
          </NavLink>
          <div className="pt-4 border-t border-teal-600">
            <NavLink
              to="/publish"
              onClick={closeMenu}
              className="block w-full bg-white text-teal-700 font-semibold px-4 py-3 rounded-full text-center hover:bg-teal-50"
            >
              Publier
            </NavLink>
          </div>
        </nav>
      </div>

      <main className="max-w-6xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
