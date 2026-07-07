'use client';
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/studio") || pathname === "/coming-soon") {
      return;
    }
    const lenis = new Lenis({
        duration: 1.4,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [pathname]);

  if (pathname?.startsWith("/studio") || pathname === "/coming-soon") {
    return null;
  }

  return null;
}