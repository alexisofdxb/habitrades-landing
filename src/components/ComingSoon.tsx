"use client";

import { useEffect, useState } from "react";
import HabitradesLogo from "@/src/components/HabitradesLogo";
import { getLaunchDate, getLaunchDisplayText } from "@/src/lib/launch";

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdown(target: number): CountdownParts {
  const remaining = Math.max(0, target - Date.now());

  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining % 86_400_000) / 3_600_000),
    minutes: Math.floor((remaining % 3_600_000) / 60_000),
    seconds: Math.floor((remaining % 60_000) / 1_000),
  };
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

const launchDate = getLaunchDate();
const emptyCountdown: CountdownParts = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export default function ComingSoon() {
  const [countdown, setCountdown] = useState<CountdownParts | null>(null);

  useEffect(() => {
    const tick = () => setCountdown(getCountdown(launchDate.getTime()));
    tick();
    const interval = window.setInterval(tick, 1_000);
    return () => window.clearInterval(interval);
  }, []);

  const activeCountdown = countdown ?? emptyCountdown;

  const units = [
    { label: "Days", value: pad(activeCountdown.days) },
    { label: "Hours", value: pad(activeCountdown.hours) },
    { label: "Minutes", value: pad(activeCountdown.minutes) },
    { label: "Seconds", value: pad(activeCountdown.seconds) },
  ];

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden px-4 py-10 sm:px-6">
      <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_120%,rgba(183,255,74,0.06),transparent_42%)]" />

      <header className="mx-auto w-full max-w-[1080px]">
        <HabitradesLogo />
      </header>

      <main className="mx-auto flex w-full max-w-[1080px] flex-1 flex-col items-center justify-center py-16 text-center sm:py-20">
        <p className="text-sm tracking-[-0.02em] text-white/40">
          <span className="text-white/30">{`// `}</span>
          Launching soon
        </p>

        <h1 className="mt-6 max-w-[720px] text-[40px] font-medium leading-[1.05] tracking-[-0.06em] text-white sm:text-[56px] sm:tracking-[-0.07em] min-[1200px]:text-[64px]">
          <span className="block">Trade with context.</span>
          <span className="block text-white/40">Risk with intent.</span>
        </h1>

        <p className="mt-6 max-w-[520px] text-base leading-[1.5] tracking-[-0.02em] text-[#858585] sm:text-lg">
          Habitrades is almost live. Agentic trading with habits, risk controls,
          and multi-market execution.
        </p>

        <div className="mt-12 grid w-full max-w-[720px] grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="rounded-2xl bg-[#11100f] px-4 py-5 sm:px-5 sm:py-6"
            >
              <p className="font-mono text-[32px] font-medium leading-none tracking-[-0.04em] text-white sm:text-[40px]">
                {unit.value}
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-white/35">
                {unit.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm tracking-[-0.02em] text-white/45">
          {getLaunchDisplayText()}
        </p>
      </main>

      <footer className="mx-auto w-full max-w-[1080px] text-center text-sm text-white/30">
        © {new Date().getFullYear()} Habitrades by{" "}
        <a
          href="https://anylayer.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/45 transition-colors hover:text-white/70"
        >
          Anylayer
        </a>
      </footer>
    </div>
  );
}