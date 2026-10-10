// Launch: October 10, 2026 at 6:00 PM IST
const SCHEDULED = new Date('2026-10-10T18:00:00+05:30').getTime();

// Dev-only rehearsal: http://localhost:5173/?launchIn=10 reveals in 10s. Stripped from production builds.
const rehearsalSeconds = import.meta.env.DEV
  ? Number(new URLSearchParams(window.location.search).get('launchIn'))
  : NaN;

export const LAUNCH_TIMESTAMP = Number.isFinite(rehearsalSeconds) && rehearsalSeconds > 0
  ? Date.now() + rehearsalSeconds * 1000
  : SCHEDULED;
