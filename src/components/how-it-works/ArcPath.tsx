"use client";

import Image from "next/image";
import { IconStream } from "./IconStream";
import { Reveal, StepIcon, steps } from "./shared";

/* 4 — Semi-circular arc layout */
export function Variant04ArcMobile() {
  return (
    <>
      <div className="mt-14 space-y-3 min-[900px]:hidden">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.05}>
            <div className="rounded-xl border border-white/8 bg-[#131211] p-4">
              <h3 className="text-[15px] font-medium">{step.title}</h3>
              <p className="mt-1 text-[13px] text-white/45">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="relative mt-14 hidden min-[900px]:block min-[900px]:pb-12">
        <div className="mx-auto h-[400px] w-full max-w-[1080px]" aria-hidden />
        <div className="absolute inset-x-0 top-20 mx-auto h-[400px] max-w-[1080px]">
          <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
            <div className="relative flex h-20 w-[min(520px,92vw)] items-center justify-center min-[1200px]:h-24 min-[1200px]:w-[min(580px,92vw)]">
              <div
                className="pointer-events-none absolute inset-x-0 top-1/2 flex h-9 -translate-y-1/2 items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] min-[1200px]:h-10"
                aria-hidden
              >
                <IconStream />
              </div>

              <div className="relative z-10 flex items-center justify-center px-4 py-2 min-[1200px]:px-5">
                <div
                  className="absolute inset-0 rounded-[1.75rem] bg-[#0a0908]"
                  aria-hidden
                />
                <Image
                  src="/images/habitrades-mark.svg"
                  alt=""
                  width={88}
                  height={76}
                  className="relative z-10 h-20 w-auto object-contain opacity-90 min-[1200px]:h-24"
                />
              </div>
            </div>
          </div>
          {steps.map((step, i) => {
            const positions = [
              { left: "3%", top: "56%" },
              { left: "20%", top: "16%" },
              { left: "50%", top: "0%" },
              { left: "80%", top: "16%" },
              { left: "97%", top: "56%" },
            ];
            const pos = positions[i];
            return (
              <div
                key={step.title}
                className="absolute w-[200px] -translate-x-1/2 text-center min-[1200px]:w-[220px]"
                style={{ left: pos.left, top: pos.top }}
              >
                <span className="mx-auto grid size-14 place-items-center rounded-full border border-white/12 bg-[#0a0908] text-white min-[1200px]:size-16">
                  {i === 0 ? (
                    <Image
                      src="/images/agent.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="size-6 object-contain min-[1200px]:size-7"
                    />
                  ) : i === 2 ? (
                    <Image
                      src="/images/hype.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="size-6 object-contain min-[1200px]:size-7"
                    />
                  ) : (
                    <StepIcon name={step.icon} size={24} />
                  )}
                </span>
                <h3 className="mt-4 text-[15px] font-medium leading-[1.25] min-[1200px]:text-[16px]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.4] text-white/45 min-[1200px]:text-[14px]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}