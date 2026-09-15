import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { img, PHOTO } from "../data/images";
import { SITE } from "../data/site";

/**
 * Password screen shown while the site's copy and photography are still being
 * finalised.
 *
 * - To launch the site, set PREVIEW_LOCK to false.
 * - To change the password, replace PASSWORD_SHA256 with the output of
 *     node -e "console.log(require('crypto').createHash('sha256').update('new-password').digest('hex'))"
 *   Everyone who unlocked with the old password is asked again.
 *
 * This keeps casual visitors out; it is not real security. The check runs in
 * the browser, so a determined visitor can get past it — don't put anything
 * confidential behind it.
 */
export const PREVIEW_LOCK = true;

const PASSWORD_SHA256 = "e6bbd1d399f309467a08fd2622fe1bef8a988f50553b7d9b4b18837d5a09240b";
const STORAGE_KEY = "tajdar.preview.v1";

async function sha256(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await window.crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function wasUnlocked() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === PASSWORD_SHA256;
  } catch {
    return false;
  }
}

function rememberUnlock() {
  try {
    window.localStorage.setItem(STORAGE_KEY, PASSWORD_SHA256);
  } catch {
    // Private mode or blocked storage: the visitor just enters it again next time.
  }
}

export default function PreviewGate({ children }) {
  const [unlocked, setUnlocked] = useState(() => !PREVIEW_LOCK || wasUnlocked());
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const reduceMotion = useReducedMotion();

  if (unlocked) return children;

  async function handleSubmit(event) {
    event.preventDefault();
    if (!password || checking) return;

    if (!window.crypto?.subtle) {
      setError("Please open this preview over a secure (https) connection.");
      return;
    }

    setChecking(true);
    const matches = (await sha256(password)) === PASSWORD_SHA256;
    setChecking(false);

    if (matches) {
      rememberUnlock();
      setUnlocked(true);
    } else {
      setError("That password isn't right. Please try again.");
      setAttempts((n) => n + 1);
      setPassword("");
    }
  }

  return (
    <main className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-16">
      <img
        src={img(PHOTO.heroHall, 1920, 1280, 76)}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full scale-105 object-cover blur-[2px]"
        fetchPriority="high"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/70 via-ink-900/55 to-ink-900/85"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(43_37_35/0.6)_100%)]"
      />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md text-center"
      >
        <div
          aria-hidden="true"
          className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold-300/80 font-display text-3xl text-gold-200 ring-4 ring-gold-300/10"
        >
          T
        </div>

        <p className="mt-6 text-[0.7rem] uppercase tracking-[0.34em] text-gold-300">
          Private preview
        </p>
        <div className="rule-gold mt-4 text-gold-300" aria-hidden="true">
          ✦
        </div>

        <h1 className="mt-4 text-5xl leading-none text-white sm:text-6xl">{SITE.name}</h1>
        <p className="mx-auto mt-5 max-w-sm font-light leading-relaxed text-white/80">
          Our new website is being prepared. Enter the password to preview it.
        </p>

        <motion.form
          key={attempts}
          onSubmit={handleSubmit}
          animate={attempts && !reduceMotion ? { x: [0, -10, 10, -6, 6, 0] } : undefined}
          transition={{ duration: 0.4 }}
          className="mt-8"
          noValidate
        >
          <label htmlFor="preview-password" className="sr-only">
            Password
          </label>
          <div className="relative">
            <input
              id="preview-password"
              type={visible ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              placeholder="Password"
              autoComplete="current-password"
              autoFocus
              aria-invalid={error ? "true" : undefined}
              aria-describedby={error ? "preview-error" : undefined}
              className="w-full rounded-full border border-white/25 bg-white/10 py-3.5 pr-12 pl-6 text-white backdrop-blur-md transition-colors duration-200 placeholder:text-white/50 focus:border-gold-300 focus:ring-4 focus:ring-gold-300/15 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              aria-label={visible ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-white/60 transition-colors hover:text-white"
            >
              {visible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <p id="preview-error" role="alert" className="mt-3 min-h-5 text-sm text-blush-200">
            {error}
          </p>

          <button
            type="submit"
            disabled={!password || checking}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose-500 px-8 py-4 text-sm tracking-[0.12em] text-white uppercase shadow-soft transition-all duration-300 ease-soft hover:bg-rose-600 active:bg-rose-700 disabled:pointer-events-none disabled:opacity-50"
          >
            Enter site
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </motion.form>
      </motion.div>

      <p className="absolute right-0 bottom-6 left-0 text-center text-[0.7rem] tracking-[0.2em] text-white/50 uppercase">
        © {new Date().getFullYear()} {SITE.name}
      </p>
    </main>
  );
}
