import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV } from '@/content/site';
import { Container } from '@/components/primitives';
import { Logo } from '@/components/Logo';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setMenuOpen(false), [pathname]);

  // Lock body scroll behind the mobile menu.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ease-soft ${
        scrolled || menuOpen
          ? 'border-b border-sand-300 bg-cream-100/92 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <Container width="wide">
        <div className="flex h-20 items-center justify-between">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative font-sans text-[0.8125rem] tracking-[0.1em] uppercase transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-bronze-500 after:transition-all after:duration-500 ${
                    isActive
                      ? 'text-ink-900 after:w-full'
                      : 'text-ink-500 after:w-0 hover:text-ink-900 hover:after:w-full'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center lg:flex">
            <Link
              to="/contact"
              className="border border-ink-900/25 px-6 py-2.5 font-sans text-[0.8125rem] tracking-[0.1em] uppercase transition-all duration-500 ease-soft hover:border-bronze-500 hover:text-bronze-600"
            >
              Plan an Event
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="-mr-2 flex h-10 w-10 items-center justify-center lg:hidden"
          >
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 block h-px w-6 bg-ink-900 transition-all duration-400 ease-soft ${
                  menuOpen ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-6 bg-ink-900 transition-all duration-400 ease-soft ${
                  menuOpen ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="border-t border-sand-300 bg-cream-100 lg:hidden"
      >
        <Container>
          <nav aria-label="Primary mobile" className="flex flex-col py-6">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `border-b border-sand-300/60 py-4 font-display text-2xl transition-colors ${
                    isActive ? 'text-bronze-600' : 'text-ink-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-7">
              <Link
                to="/contact"
                className="block bg-ink-900 px-6 py-3.5 text-center font-sans text-[0.8125rem] tracking-[0.12em] text-cream-50 uppercase"
              >
                Plan an Event
              </Link>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
