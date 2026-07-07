export const LAUNCH_AT_UTC = "2026-06-22T17:00:00.000Z";

export function getLaunchDate() {
  return new Date(LAUNCH_AT_UTC);
}

export function getLaunchDisplayText() {
  const launch = getLaunchDate();
  const date = launch.toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const time = launch.toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `Website goes live ${date} at ${time} UTC`;
}

export function isSiteLive(now = Date.now()) {
  return now >= getLaunchDate().getTime();
}