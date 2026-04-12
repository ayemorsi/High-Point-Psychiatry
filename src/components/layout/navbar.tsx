'use client';

import { ArrowRight, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Insurance', href: '/insurance' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isMenuOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        'glass-nav border-b border-[rgba(26,43,76,0.08)]',
        scrolled && 'shadow-card',
      )}
    >
      <div className="container flex h-20 items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="High Point Psychiatry home"
        >
          <Image
            src="/images/layout/logo.svg"
            alt="High Point Psychiatry"
            width={140}
            height={44}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          {NAV_ITEMS.filter((i) => i.label !== 'Contact').map((link) => {
            const active =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  active
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary',
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            className="hidden h-10 rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:bg-[#031636] lg:flex"
          >
            <Link href="/contact">
              Book Appointment
              <ArrowRight className="ml-1.5 size-4" />
            </Link>
          </Button>

          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(26,43,76,0.15)] bg-white transition-colors hover:bg-surface-low lg:hidden"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="size-5 text-primary" />
            ) : (
              <Menu className="size-5 text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-[rgba(26,43,76,0.08)] bg-white/95 px-6 py-8 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-6">
            {NAV_ITEMS.map((link) => {
              const active =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-lg font-medium transition-colors',
                    active ? 'text-primary' : 'text-muted-foreground',
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-8">
            <Button
              asChild
              className="w-full rounded-full bg-primary py-3 text-base font-semibold text-white shadow-soft"
            >
              <Link href="/contact">
                Book Appointment
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
