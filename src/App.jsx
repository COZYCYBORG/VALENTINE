import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AmbientBackground from "./components/AmbientBackground";
import HeartCursor from "./components/HeartCursor";
import CinematicBloomReveal from "./components/CinematicBloomReveal";

const STORAGE_KEY = "if-love-was-a-movie-progress-v1";
const TARGET_DATE_PRIMARY = new Date("2026-02-14T00:00:00");
const TARGET_DATE_SECONDARY = new Date("2027-02-15T00:00:00");
const ENABLE_CINEMATIC_BLOOM = true;

const MOVIES = [
  {
    id: "96",
    title: "96",
    year: "2018",
    genre: "Romance / Drama",
    tagline: "The Nostalgic",
    blurb:
      "You carry old memories like letters in a pocket. You love deeply, quietly, and forever.",
    poster: "96.jpg.jpeg",
    audio: "96.mp3"
  },
  {
    id: "vtv",
    title: "Vinnaithaandi Varuvaayaa",
    year: "2010",
    genre: "Romance / Drama",
    tagline: "The Aesthetic",
    blurb:
      "You romanticize every glance, cloud, and missed chance. Beautiful chaos is your comfort zone.",
    poster: "VTV.jpeg",
    audio: "vtv.mp3"
  },
  {
    id: "sita-ramam",
    title: "Sita Ramam",
    year: "2022",
    genre: "Romance / Period",
    tagline: "The Poetic",
    blurb:
      "You believe love is written, not sent. Loyalty, letters, and longing define your heart.",
    poster: "seetha ramam.jpg.jpeg",
    audio: "Sita Ramam.mp3"
  },
  {
    id: "sms",
    title: "Siva Manasula Sakthi",
    year: "2009",
    genre: "Romance / Comedy",
    tagline: "The Fun Chaos",
    blurb:
      "Your love language is playful roasting, dramatic comebacks, and unexpectedly soft moments.",
    poster: "sms.jpeg",
    audio: "sms.mp3"
  },
  {
    id: "ghilli",
    title: "Ghilli",
    year: "2004",
    genre: "Action / Romance",
    tagline: "The Protective Spark",
    blurb:
      "You show love through action. Fast decisions, fearless loyalty, and a full-throttle heart.",
    poster: "ghilli.jpeg",
    audio: "ghilli.mp3"
  },
  {
    id: "lover",
    title: "Lover",
    year: "2024",
    genre: "Romance / Drama",
    tagline: "The Intense",
    blurb:
      "You feel everything at maximum volume. Deep attachment, raw honesty, and emotional fire.",
    poster: "lover.jpg.jpeg",
    audio: "lover.mp3"
  },
  {
    id: "chennai-express",
    title: "Chennai Express",
    year: "2013",
    genre: "Adventure / Comedy",
    tagline: "The Vibrant Adventurer",
    blurb:
      "Your love story is loud, fun, unpredictable, and always moving. You turn chaos into joy.",
    poster: "Chennai express.jpg.jpeg",
    audio: "chennai express.mp3"
  },
  {
    id: "thiruchitrambalam",
    title: "Thiruchitrambalam",
    year: "2022",
    genre: "Drama / Romance",
    tagline: "The Soul Friend",
    blurb:
      "You trust comfort over performance. Slow-burn affection, small gestures, and true partnership.",
    poster: "THIRUCHITRAMBALAM.png",
    audio: "thiruchitrambalam.mp3"
  },
  {
    id: "varanam-aayiram",
    title: "Vaaranam Aayiram",
    year: "2008",
    genre: "Drama / Romance",
    tagline: "The Inspirational Deep",
    blurb:
      "You grow through love and heartbreak. Your story is about healing, becoming, and rising again.",
    poster: "vaaranam aayiram.jpg.jpeg",
    audio: "vaaranam aayiram.mp3"
  },
  {
    id: "premam",
    title: "Premam",
    year: "2015",
    genre: "Romance / Slice of Life",
    tagline: "The Multi-Phase Cool",
    blurb:
      "You have eras. Your love life evolves, stumbles, recovers, and somehow stays charming.",
    poster: "premam.jpg.jpeg",
    audio: "premam.mp3"
  }
];

const MOVIE_ORDER = MOVIES.map((movie) => movie.id);

const QUESTIONS = [
  {
    id: "q1",
    heart: "ðŸ˜µ",
    question: "Your crush finally texts back after 3 days. What's your move?",
    options: [
      {
        text: "Wait exactly 3 days to reply. Revenge is a dish best served cold.",
        movieId: "96"
      },
      {
        text: "Screenshot it and analyze with 5 friends before replying 'haha cool'.",
        movieId: "premam"
      },
      {
        text: "Reply instantly because you have zero chill and everyone knows it.",
        movieId: "lover"
      },
      {
        text: "Write a whole essay response, delete it, then send 'k'.",
        movieId: "vtv"
      }
    ]
  },
  {
    id: "q2",
    heart: "ðŸ™‚",
    question: "How do you handle seeing your ex happy with someone new?",
    options: [
      {
        text: "Stalk their profile at 3 AM while listening to sad songs. Healthy!",
        movieId: "96"
      },
      {
        text: "Post a 'living my best life' story within 10 minutes. Subtle.",
        movieId: "sms"
      },
      {
        text: "Genuinely wish them well because you're emotionally mature (allegedly).",
        movieId: "sita-ramam"
      },
      {
        text: "Write a poem about it. No one asked, but here it is.",
        movieId: "vtv"
      }
    ]
  },
  {
    id: "q3",
    heart: "ðŸ˜¤",
    question: "Someone's being rude to your person. Your reaction?",
    options: [
      {
        text: "Violence is never the answer. But it IS a question, and the answer is yes.",
        movieId: "ghilli"
      },
      {
        text: "Kill them with sarcasm. Words hurt more than fists anyway.",
        movieId: "sms"
      },
      {
        text: "Comfort your person later with a heartfelt talk about toxic people.",
        movieId: "thiruchitrambalam"
      },
      {
        text: "Write a passive-aggressive post about 'some people' that night.",
        movieId: "lover"
      }
    ]
  },
  {
    id: "q4",
    heart: "ðŸ˜‰",
    question: "What's your idea of a perfect date?",
    options: [
      {
        text: "Recreating a scene from a movie they don't know is from a movie.",
        movieId: "vtv"
      },
      {
        text: "An adventure where everything goes wrong but you vibe anyway.",
        movieId: "chennai-express"
      },
      {
        text: "Doing absolutely nothing together and calling it comfortable silence.",
        movieId: "thiruchitrambalam"
      },
      {
        text: "An intense 4-hour conversation about life, death, and why they don't text back.",
        movieId: "varanam-aayiram"
      }
    ]
  },
  {
    id: "q5",
    heart: "ðŸ˜",
    question: "Your relationship status on social media says?",
    options: [
      {
        text: "'It's complicated' because drama is your brand.",
        movieId: "premam"
      },
      {
        text: "Nothing. Let them wonder. Mystery is attractive, right? RIGHT?",
        movieId: "sita-ramam"
      },
      {
        text: "A cute couple post every week. You need external validation to survive.",
        movieId: "chennai-express"
      },
      {
        text: "'Single' but you've been emotionally unavailable to 3 different people.",
        movieId: "varanam-aayiram"
      }
    ]
  }
];

const QUIZ_QUESTIONS = [
  {
    id: "q1",
    heart: "\u{1F635}",
    question: "Your crush finally texts back after 3 days. What’s your move?",
    options: [
      { key: "A", text: "Wait exactly 3 days to reply. Revenge is a dish best served cold." },
      { key: "B", text: "Screenshot it and analyze with 5 friends before replying 'haha cool'." },
      { key: "C", text: "Reply instantly because you have zero chill and everyone knows it." },
      { key: "D", text: "Write a whole essay response, delete it, then send 'k'." }
    ]
  },
  {
    id: "q2",
    heart: "\u{1F642}",
    question: "How do you handle seeing your ex happy with someone new?",
    options: [
      { key: "A", text: "Stalk their profile at 3 AM while listening to sad songs. Healthy!" },
      { key: "B", text: "Post a 'living my best life' story within 10 minutes. Subtle." },
      { key: "C", text: "Genuinely wish them well because you're emotionally mature (allegedly)." },
      { key: "D", text: "Write a poem about it. No one asked, but here it is." }
    ]
  },
  {
    id: "q3",
    heart: "\u{1F624}",
    question: "Someone’s being rude to your person. Your reaction?",
    options: [
      { key: "A", text: "Violence is never the answer. But it IS a question, and the answer is yes." },
      { key: "B", text: "Kill them with sarcasm. Words hurt more than fists anyway." },
      { key: "C", text: "Comfort your person later with a heartfelt talk about toxic people." },
      { key: "D", text: "Write a passive-aggressive post about 'some people' that night." }
    ]
  },
  {
    id: "q4",
    heart: "\u{1F609}",
    question: "What’s your idea of a perfect date?",
    options: [
      { key: "A", text: "Recreating a scene from a movie they don't know is from a movie." },
      { key: "B", text: "An adventure where everything goes wrong but you vibe anyway." },
      { key: "C", text: "Doing absolutely nothing together and calling it 'comfortable silence'." },
      { key: "D", text: "An intense 4-hour conversation about life, death, and why they don't text back." }
    ]
  },
  {
    id: "q5",
    heart: "\u{1F60F}",
    question: "Your relationship status on social media says?",
    options: [
      { key: "A", text: "'It's complicated' – because drama is your brand." },
      { key: "B", text: "Nothing. Let them wonder. Mystery is attractive, right? RIGHT?" },
      { key: "C", text: "A cute couple post every week. You need external validation to survive." },
      { key: "D", text: "'Single' but you've been emotionally unavailable to 3 different people." }
    ]
  }
];
const OPTION_KEYS = ["A", "B", "C", "D"];

const MOVIE_SCORE_PROFILE = {
  "96": {
    q1: { A: 2, D: 1 },
    q2: { A: 2 },
    q3: { C: 1 },
    q4: { C: 2 },
    q5: { A: 2, B: 1 }
  },
  vtv: {
    q1: { D: 2 },
    q2: { D: 2, A: 1 },
    q3: { C: 1, D: 1 },
    q4: { D: 2 },
    q5: { D: 2 }
  },
  "sita-ramam": {
    q1: { A: 1, D: 1 },
    q2: { D: 2 },
    q3: { D: 1 },
    q4: { D: 2, A: 1 },
    q5: { B: 2, D: 1 }
  },
  sms: {
    q1: { B: 2, C: 1 },
    q2: { B: 2, C: 1 },
    q3: { B: 2 },
    q4: { C: 2, B: 1 },
    q5: { C: 2 }
  },
  ghilli: {
    q1: { C: 2 },
    q2: { B: 1 },
    q3: { A: 2 },
    q4: { B: 2 },
    q5: { A: 2 }
  },
  lover: {
    q1: { D: 2 },
    q2: { A: 2, D: 1 },
    q3: { D: 2 },
    q4: { D: 2 },
    q5: { D: 2, A: 1 }
  },
  "chennai-express": {
    q1: { B: 2, C: 1 },
    q2: { B: 2 },
    q3: { B: 2 },
    q4: { B: 2 },
    q5: { C: 2 }
  },
  thiruchitrambalam: {
    q1: { B: 1 },
    q2: { C: 2 },
    q3: { C: 2, B: 1 },
    q4: { C: 2 },
    q5: { B: 2 }
  },
  "varanam-aayiram": {
    q1: { A: 1 },
    q2: { A: 2, C: 1 },
    q3: { C: 2 },
    q4: { A: 1, D: 1 },
    q5: { D: 2, B: 1 }
  },
  premam: {
    q1: { B: 2, C: 1 },
    q2: { C: 2 },
    q3: { B: 2, C: 1 },
    q4: { B: 2, C: 1 },
    q5: { C: 2, D: 1 }
  }
};
const initialScores = () =>
  MOVIE_ORDER.reduce((acc, movieId) => ({ ...acc, [movieId]: 0 }), {});

const allowedStages = new Set(["landing", "prologue", "quiz", "result"]);

const assetUrl = (filename) => {
  if (!filename) return "";
  const normalized = String(filename).replace(/^\/+/, "");
  return `/${encodeURI(normalized)}`;
};

const getCountdownTarget = (nowMs = Date.now()) =>
  nowMs < TARGET_DATE_PRIMARY.getTime() ? TARGET_DATE_PRIMARY : TARGET_DATE_SECONDARY;

const readSavedProgress = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeSavedProgress = (payload) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage write failures (private mode / blocked storage).
  }
};

const clearSavedProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage clear failures.
  }
};

const normalizeProgress = (parsed) => {
  if (!parsed || typeof parsed !== "object") {
    return null;
  }

  const nextStage = allowedStages.has(parsed.stage) ? parsed.stage : "landing";
  const safeQuestionIndex = Number.isInteger(parsed.questionIndex)
    ? Math.max(0, Math.min(QUIZ_QUESTIONS.length - 1, parsed.questionIndex))
    : 0;
  const safeAnswers = Array.isArray(parsed.answers)
    ? parsed.answers.slice(0, QUIZ_QUESTIONS.length)
    : [];
  const safeScores =
    parsed.scores && typeof parsed.scores === "object"
      ? { ...initialScores(), ...parsed.scores }
      : initialScores();
  const safeResultId = MOVIE_ORDER.includes(parsed.resultId) ? parsed.resultId : null;

  // Force a valid stage if persisted data is stale.
  let correctedStage = nextStage;
  if (nextStage === "quiz" && safeQuestionIndex >= QUIZ_QUESTIONS.length) {
    correctedStage = safeResultId ? "result" : "landing";
  }
  if (nextStage === "result" && !safeResultId) {
    correctedStage = "landing";
  }

  return {
    stage: correctedStage,
    questionIndex: safeQuestionIndex,
    answers: safeAnswers,
    scores: safeScores,
    resultId: safeResultId,
    envelopeOpen: Boolean(parsed.envelopeOpen)
  };
};

function FloatingHearts() {
  const hearts = [
    {
      emoji: "\u2764\uFE0F",
      left: "6%",
      top: "14%",
      duration: "16.5s",
      delay: "0.2s",
      dx1: "6px",
      dy1: "-4px",
      dx2: "-8px",
      dy2: "-9px",
      dx3: "5px",
      dy3: "-3px",
      mobile: true
    },
    {
      emoji: "\u{1F498}",
      left: "17%",
      top: "34%",
      duration: "17.8s",
      delay: "0.9s",
      dx1: "-5px",
      dy1: "-6px",
      dx2: "7px",
      dy2: "-10px",
      dx3: "-4px",
      dy3: "-4px",
      mobile: true
    },
    {
      emoji: "\u{1F496}",
      left: "14%",
      top: "69%",
      duration: "18.4s",
      delay: "1.4s",
      dx1: "7px",
      dy1: "-5px",
      dx2: "-6px",
      dy2: "-11px",
      dx3: "5px",
      dy3: "-4px",
      mobile: true
    },
    {
      emoji: "\u{1F497}",
      left: "50%",
      top: "92%",
      duration: "19.2s",
      delay: "0.6s",
      dx1: "6px",
      dy1: "-5px",
      dx2: "-7px",
      dy2: "-10px",
      dx3: "4px",
      dy3: "-3px",
      mobile: false
    },
    {
      emoji: "\u{1FA77}",
      left: "88%",
      top: "13%",
      duration: "17.1s",
      delay: "1.1s",
      dx1: "-6px",
      dy1: "-4px",
      dx2: "8px",
      dy2: "-8px",
      dx3: "-5px",
      dy3: "-3px",
      mobile: false
    },
    {
      emoji: "\u{1F49D}",
      left: "88%",
      top: "38%",
      duration: "18.9s",
      delay: "1.7s",
      dx1: "6px",
      dy1: "-6px",
      dx2: "-9px",
      dy2: "-10px",
      dx3: "5px",
      dy3: "-4px",
      mobile: false
    },
    {
      emoji: "\u{1F49E}",
      left: "84%",
      top: "57%",
      duration: "20.1s",
      delay: "0.8s",
      dx1: "-7px",
      dy1: "-5px",
      dx2: "8px",
      dy2: "-9px",
      dx3: "-5px",
      dy3: "-4px",
      mobile: false
    },
    {
      emoji: "\u{1F49F}",
      left: "92%",
      top: "80%",
      duration: "21.4s",
      delay: "1.9s",
      dx1: "5px",
      dy1: "-4px",
      dx2: "-7px",
      dy2: "-9px",
      dx3: "4px",
      dy3: "-3px",
      mobile: false
    }
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {hearts.map((heart, index) => (
        <span
          key={`${heart.emoji}-${index}`}
          className={`emoji-heart absolute -translate-x-1/2 -translate-y-1/2 select-none ${heart.mobile ? "text-[3.2rem] sm:text-[3.8rem]" : "hidden text-[3.4rem] sm:inline-block sm:text-[4.2rem]"}`}
          style={{
            left: heart.left,
            top: heart.top,
            ["--dur"]: heart.duration,
            ["--delay"]: heart.delay,
            ["--dx1"]: heart.dx1,
            ["--dy1"]: heart.dy1,
            ["--dx2"]: heart.dx2,
            ["--dy2"]: heart.dy2,
            ["--dx3"]: heart.dx3,
            ["--dy3"]: heart.dy3
          }}
          aria-hidden="true"
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
}
function ImageWithFallback({ src, alt, className }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-rose/35 via-deepRose/25 to-wine/40 text-white/90 ${className}`}
      >
        <span className="font-script text-4xl">Love Reel</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
}

function PrologueLoveCard({ envelopeOpen, onOpen }) {
  const innerHearts = useMemo(
    () =>
      Array.from({ length: 5 }, (_, index) => ({
        id: index,
        left: `${18 + index * 16}%`,
        top: `${24 + (index % 3) * 20}%`,
        dx: `${(Math.random() * 22 - 11).toFixed(1)}px`,
        dy: `${(-8 - Math.random() * 16).toFixed(1)}px`,
        duration: Number((5.5 + Math.random() * 2.4).toFixed(2)),
        delay: Number((index * 0.25).toFixed(2))
      })),
    []
  );

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <motion.span
        className="pointer-events-none absolute -left-2 -top-2 z-20 select-none text-5xl drop-shadow-[0_0_14px_rgba(94,23,235,0.65)]"
        animate={{ y: [0, -5, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        {"\u{1F49D}"}
      </motion.span>

      <motion.button
        type="button"
        onClick={onOpen}
        className="relative w-full overflow-hidden rounded-3xl border border-[#8f6cff]/70 bg-gradient-to-br from-[#5e17eb]/90 to-[#1800ad]/90 p-6 text-white shadow-[0_0_30px_rgba(94,23,235,0.45),inset_0_0_20px_rgba(255,255,255,0.08)] sm:p-8"
        whileHover={{ scale: 1.01 }}
        animate={envelopeOpen ? { scale: 0.98, opacity: 0.9 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <div className="pointer-events-none absolute inset-0 z-0">
          {innerHearts.map((heart) => (
            <motion.span
              key={heart.id}
              className="absolute text-3xl opacity-20 blur-[0.2px]"
              style={{ left: heart.left, top: heart.top }}
              animate={{
                x: [0, heart.dx, 0],
                y: [0, heart.dy, 0],
                opacity: [0.14, 0.3, 0.14]
              }}
              transition={{
                duration: heart.duration,
                delay: heart.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {"\u2665"}
            </motion.span>
          ))}
        </div>

        <div className="relative z-10">
          <p className="mb-2 text-center text-xs uppercase tracking-[0.22em] text-[#f2e9ff]/90">
            Secret Love Card
          </p>
          <p className="text-center font-script text-3xl leading-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.25)] sm:text-4xl">
            Answer honestly. We&apos;re about to expose you.
          </p>
          <p className="mt-3 text-center text-base text-[#e8ddff]/95 sm:text-lg">Tap to open (if you dare)</p>
        </div>
      </motion.button>
    </div>
  );
}
function App() {
  const [stage, setStage] = useState("landing");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [scores, setScores] = useState(initialScores);
  const [resultId, setResultId] = useState(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [heartPopFx, setHeartPopFx] = useState({ index: null, nonce: 0 });
  const [musicNotice, setMusicNotice] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const fadeTimerRef = useRef(null);

  const resultMovie = useMemo(
    () => MOVIES.find((movie) => movie.id === resultId) ?? null,
    [resultId]
  );

  const stopActiveFade = () => {
    if (fadeTimerRef.current) {
      clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  };

  const fadeTo = (audio, targetVolume, durationMs = 500) =>
    new Promise((resolve) => {
      if (!audio) {
        resolve();
        return;
      }

      stopActiveFade();
      const startVolume = Number.isFinite(audio.volume) ? audio.volume : 0;
      const delta = targetVolume - startVolume;
      if (Math.abs(delta) < 0.01 || durationMs <= 0) {
        audio.volume = Math.max(0, Math.min(1, targetVolume));
        resolve();
        return;
      }

      const steps = Math.max(1, Math.round(durationMs / 40));
      let step = 0;
      fadeTimerRef.current = setInterval(() => {
        step += 1;
        const progress = step / steps;
        // Use a slower ease-in curve for fade-in so BGM starts naturally.
        const easedProgress = delta > 0 ? progress * progress : progress;
        audio.volume = Math.max(0, Math.min(1, startVolume + delta * easedProgress));
        if (step >= steps) {
          stopActiveFade();
          resolve();
        }
      }, 40);
    });

  useEffect(() => {
    const normalized = normalizeProgress(readSavedProgress());
    if (!normalized) {
      return;
    }

    setStage(normalized.stage);
    setQuestionIndex(normalized.questionIndex);
    setAnswers(normalized.answers);
    setScores(normalized.scores);
    setResultId(normalized.resultId);
    setEnvelopeOpen(normalized.envelopeOpen);
  }, []);

  useEffect(() => {
    const payload = { stage, questionIndex, answers, scores, resultId, envelopeOpen };
    writeSavedProgress(payload);
  }, [stage, questionIndex, answers, scores, resultId, envelopeOpen]);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const target = getCountdownTarget(now);
      const diff = target.getTime() - now;
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      setCountdown({ days, hours, mins, secs });
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => () => stopActiveFade(), []);

  useEffect(() => {
    if (stage !== "result" || !resultMovie) {
      return;
    }

    if (!resultMovie.audio) {
      setMusicNotice("Attach BGM files and map them in MOVIES.audio to auto-play the soundtrack.");
      return;
    }

    const audio = new Audio(assetUrl(resultMovie.audio));
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    audio
      .play()
      .then(async () => {
        await fadeTo(audio, 0.7, 1500);
        setIsPlaying(true);
        setMusicNotice("");
      })
      .catch(() => setMusicNotice("Tap Play Music to start audio (browser autoplay policy)."));

    return () => {
      fadeTo(audio, 0, 250).finally(() => {
        audio.pause();
        audio.currentTime = 0;
      });
      setIsPlaying(false);
      audioRef.current = null;
    };
  }, [resultMovie, stage]);

  const currentQuestion = QUIZ_QUESTIONS[questionIndex];

  useEffect(() => {
    if (stage === "quiz" && !currentQuestion) {
      setStage(resultId ? "result" : "landing");
    }
  }, [currentQuestion, resultId, stage]);

  const handleStart = () => {
    setEnvelopeOpen(false);
    setStage("prologue");
  };

  const handleOpenEnvelope = () => {
    setEnvelopeOpen(true);
    setTimeout(() => setStage("quiz"), 700);
  };

  const getOptionKey = (option, optionIndex) => {
    if (option?.key && OPTION_KEYS.includes(option.key)) return option.key;
    return OPTION_KEYS[optionIndex] ?? "A";
  };

  const getMovieQuestionPoints = (movieId, questionId, optionKey) => {
    return MOVIE_SCORE_PROFILE[movieId]?.[questionId]?.[optionKey] ?? 0;
  };

  const scoreChoice = (baseScores, questionId, optionKey) => {
    const next = { ...baseScores };
    for (const movieId of MOVIE_ORDER) {
      next[movieId] = (next[movieId] ?? 0) + getMovieQuestionPoints(movieId, questionId, optionKey);
    }
    return next;
  };

  const getAnswerMap = (answerList) => {
    return answerList.reduce((acc, answer) => {
      const fallbackKey = OPTION_KEYS[answer.optionIndex] ?? "A";
      acc[answer.questionId] = OPTION_KEYS.includes(answer.optionKey) ? answer.optionKey : fallbackKey;
      return acc;
    }, {});
  };

  const youthToneBoost = (movieId, answerMap) => {
    const chaosSignals =
      Number(answerMap.q1 === "C") +
      Number(answerMap.q3 === "C") +
      Number(answerMap.q4 === "B" || answerMap.q4 === "C") +
      Number(answerMap.q5 === "C");
    const heartbreakSignals =
      Number(answerMap.q1 === "D") +
      Number(answerMap.q2 === "A" || answerMap.q2 === "D") +
      Number(answerMap.q4 === "A") +
      Number(answerMap.q5 === "D");

    let boost = 0;
    if (chaosSignals >= 2 && (movieId === "premam" || movieId === "sms")) {
      boost += 3;
    }
    if (heartbreakSignals >= 2 && movieId === "lover") {
      boost += 3;
    }
    if (chaosSignals >= 2 && movieId === "sita-ramam") {
      boost -= 1;
    }
    if (heartbreakSignals >= 2 && movieId === "sita-ramam") {
      boost -= 1;
    }
    return boost;
  };

  const resolveWinner = (nextScores, nextAnswers) => {
    let bestScore = -Infinity;
    for (const movieId of MOVIE_ORDER) {
      bestScore = Math.max(bestScore, nextScores[movieId] ?? 0);
    }

    let tied = MOVIE_ORDER.filter((movieId) => (nextScores[movieId] ?? 0) === bestScore);
    if (tied.length <= 1) return tied[0] ?? MOVIE_ORDER[0];

    const answerMap = getAnswerMap(nextAnswers);
    const q1Key = answerMap.q1;
    const q5Key = answerMap.q5;

    if (q1Key && q5Key) {
      const perfectBookend = tied.filter(
        (movieId) =>
          getMovieQuestionPoints(movieId, "q1", q1Key) === 2 &&
          getMovieQuestionPoints(movieId, "q5", q5Key) === 2
      );
      if (perfectBookend.length === 1) return perfectBookend[0];
      if (perfectBookend.length > 1) tied = perfectBookend;
    }

    if (q5Key) {
      const endingPriority = tied.filter(
        (movieId) => getMovieQuestionPoints(movieId, "q5", q5Key) === 2
      );
      if (endingPriority.length === 1) return endingPriority[0];
      if (endingPriority.length > 1) tied = endingPriority;
    }

    let bestBoost = -Infinity;
    let boosted = tied;
    for (const movieId of tied) {
      const boost = youthToneBoost(movieId, answerMap);
      if (boost > bestBoost) {
        bestBoost = boost;
        boosted = [movieId];
      } else if (boost === bestBoost) {
        boosted.push(movieId);
      }
    }

    if (boosted.length === 1) return boosted[0];
    return MOVIE_ORDER.find((movieId) => boosted.includes(movieId)) ?? boosted[0];
  };

  const handleAnswer = (optionIndex) => {
    if (busy) return;
    const option = currentQuestion.options[optionIndex];
    if (!option) return;
    const optionKey = getOptionKey(option, optionIndex);

    setSelectedOptionIndex(optionIndex);
    setHeartPopFx({ index: optionIndex, nonce: Date.now() });
    setBusy(true);
    const nextScores = scoreChoice(scores, currentQuestion.id, optionKey);
    const nextAnswers = [...answers, { questionId: currentQuestion.id, optionIndex, optionKey }];
    const nextIndex = questionIndex + 1;

    setScores(nextScores);
    setAnswers(nextAnswers);

    setTimeout(() => {
      if (nextIndex >= QUIZ_QUESTIONS.length) {
        const winner = resolveWinner(nextScores, nextAnswers);
        setResultId(winner);
        setStage("result");
      } else {
        setQuestionIndex(nextIndex);
      }
      setSelectedOptionIndex(null);
      setBusy(false);
    }, 320);
  };

  const handleRestart = () => {
    if (audioRef.current) {
      fadeTo(audioRef.current, 0, 350).finally(() => {
        audioRef.current?.pause();
        if (audioRef.current) audioRef.current.currentTime = 0;
      });
    }
    setStage("landing");
    setQuestionIndex(0);
    setAnswers([]);
    setScores(initialScores());
    setResultId(null);
    setEnvelopeOpen(false);
    setMusicNotice("");
    setIsPlaying(false);
    clearSavedProgress();
  };

  const handleShare = async () => {
    const text = resultMovie
      ? `I got "${resultMovie.title}" in If Love Was a Movie. What's your cinematic love diagnosis?`
      : "Try this cinematic love quiz!";
    if (navigator.share) {
      try {
        await navigator.share({
          title: "If Love Was a Movie",
          text
        });
      } catch {
        // User dismissed share dialog.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setMusicNotice("Result text copied to clipboard.");
    } catch {
      setMusicNotice("Sharing is unavailable in this browser.");
    }
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.volume = 0;
      try {
        await audioRef.current.play();
        await fadeTo(audioRef.current, 0.7, 1300);
        setIsPlaying(true);
      } catch {
        setMusicNotice("Audio could not play. Check file path/format.");
      }
    } else {
      await fadeTo(audioRef.current, 0, 350);
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const isPrimaryCountdownTarget = Date.now() < TARGET_DATE_PRIMARY.getTime();

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent px-3 py-6 font-display text-[#2f2b2c] sm:px-6 sm:py-8 lg:px-10">
      <AmbientBackground />
      <FloatingHearts />
      {stage === "result" && (
        <CinematicBloomReveal active={ENABLE_CINEMATIC_BLOOM} className="z-[12]" />
      )}
      <HeartCursor />

      <div className="relative z-20 mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl items-center justify-center sm:min-h-[calc(100vh-4rem)]">
        <AnimatePresence mode="wait">
          {stage === "landing" && (
            <motion.section
              key="landing"
              className="relative w-full max-w-3xl rounded-3xl border border-rose/20 bg-white/70 p-5 shadow-xl backdrop-blur sm:p-8 lg:p-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55 }}
            >
              <div className="mb-8 text-center">
                <motion.div
                  className="mb-2 text-4xl font-extrabold tracking-tight text-deepRose text-stroke sm:text-6xl lg:text-7xl [font-family:'Brick_Sans',sans-serif]"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  If Love Was
                </motion.div>
                <div className="text-[2.6rem] leading-none text-rose sm:text-[4.2rem] lg:text-[4.8rem] [font-family:'Brick_Sans',sans-serif]">
                  A Movie
                </div>
                <p className="mt-4 text-lg text-[#3e3a3b] sm:text-2xl lg:text-3xl [font-family:'Dancing_Script',cursive]">
                  A Cinematic Valentine&apos;s Experience
                </p>
              </div>

              <motion.div
                className="pointer-events-none absolute right-4 top-5 text-5xl sm:right-7 sm:top-8 sm:text-6xl"
                animate={{ y: [0, -12, 0], rotate: [0, 5, -3, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                {"\u{1F498}"}
              </motion.div>

              <div className="mb-8 text-center">
                <button
                  type="button"
                  onClick={handleStart}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-deepRose px-7 py-3.5 text-base font-bold text-white shadow-glow transition hover:scale-[1.02] hover:bg-[#c2191f] sm:px-8 sm:py-4 sm:text-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M8 5.14v13.72c0 .78.84 1.26 1.5.86l10.2-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14Z" />
                  </svg>
                  <span>Start the Premiere</span>
                </button>
              </div>
              <div className="mx-auto mb-8 flex max-w-md flex-col items-center gap-4 rounded-2xl border border-rose/20 bg-blush/70 p-4">
                <p className="font-script text-3xl text-wine">The Premiere Countdown</p>
                <div className="grid w-full grid-cols-4 gap-2 text-center">
                  {[
                    { key: "days", label: "DAYS" },
                    { key: "hours", label: "HRS" },
                    { key: "mins", label: "MIN" },
                    { key: "secs", label: "SEC" }
                  ].map((item) => (
                    <motion.div
                      key={item.key}
                      className="rounded-xl bg-white/85 py-2 shadow-sm"
                      animate={{ scale: item.key === "secs" ? [1, 1.02, 1] : 1 }}
                      transition={{ duration: 1, repeat: item.key === "secs" ? Infinity : 0 }}
                    >
                      <div className="text-2xl font-extrabold text-deepRose">
                        {String(countdown[item.key]).padStart(2, "0")}
                      </div>
                      <div className="text-xs font-bold text-[#6a6163]">{item.label}</div>
                    </motion.div>
                  ))}
                </div>
                <p className="text-sm text-[#746c6e]">
                  {isPrimaryCountdownTarget ? "Valentine's Day 2026" : "February 15, 2027"}
                </p>
              </div>


            </motion.section>
          )}

          {stage === "prologue" && (
            <motion.section
              key="prologue"
              className="relative w-full max-w-xl px-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <PrologueLoveCard envelopeOpen={envelopeOpen} onOpen={handleOpenEnvelope} />
            </motion.section>
          )}

          {stage === "quiz" && currentQuestion && (
            <motion.section
              key={`quiz-${questionIndex}`}
              className="w-full max-w-3xl rounded-3xl border border-rose/15 bg-white/75 p-5 shadow-xl backdrop-blur sm:p-8 lg:p-10"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
            >
              <div className="mb-6 text-center">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-deepRose">
                  Scene {questionIndex + 1} of {QUIZ_QUESTIONS.length}
                </p>
                <p className="mt-2 text-6xl">{currentQuestion.heart}</p>
                <h2 className="mx-auto mt-2 max-w-2xl text-xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {currentQuestion.options.map((option, idx) => (
                  <motion.button
                    key={`${currentQuestion.id}-${idx}`}
                    type="button"
                    onClick={() => handleAnswer(idx)}
                    className={`relative z-10 overflow-visible rounded-2xl border border-rose/35 bg-white p-4 text-left text-base font-medium leading-snug shadow-sm transition-colors duration-200 hover:border-deepRose hover:bg-[#ff3131] hover:text-white disabled:cursor-not-allowed disabled:opacity-70 sm:min-h-[132px] sm:p-5 sm:text-lg lg:min-h-[144px] lg:text-xl ${
                      selectedOptionIndex === idx
                        ? "z-30 shadow-[0_18px_36px_rgba(0,0,0,0.45)]"
                        : ""
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={busy}
                  >
                    {selectedOptionIndex === idx && (
                      <span className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl bg-black/25 blur-xl" />
                    )}

                    {heartPopFx.index === idx && (
                      <motion.span
                        key={heartPopFx.nonce}
                        className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-white/85"
                        initial={{ scale: 1, opacity: 0.9 }}
                        animate={{ scale: 1.33, opacity: 0 }}
                        transition={{ duration: 0.42, ease: "easeOut" }}
                      />
                    )}

                    {heartPopFx.index === idx && (
                      <motion.span
                        key={`${heartPopFx.nonce}-heart`}
                        className="pointer-events-none absolute left-1/2 top-1/2 text-white"
                        initial={{ x: "-50%", y: "-50%", scale: 0.55, opacity: 1 }}
                        animate={{ x: "-50%", y: "-125%", scale: 1.4, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        {"\u2665"}
                      </motion.span>
                    )}

                    {option.text}
                  </motion.button>
                ))}
              </div>

              <div className="mx-auto mt-8 h-3 w-full max-w-sm overflow-hidden rounded-full bg-[#efe7e6]">
                <motion.div
                  className="h-full rounded-full bg-deepRose"
                  animate={{ width: `${((questionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  transition={{ duration: 0.35 }}
                />
              </div>
            </motion.section>
          )}

          {stage === "result" && resultMovie && (
            <motion.section
              key="result"
              className="relative w-full max-w-5xl p-3 sm:p-6 lg:p-8"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
            >
              <motion.div
                className="relative z-10 mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/80 bg-black shadow-[0_28px_80px_rgba(30,6,56,0.4)]"
                initial={{ scale: 0.9, filter: "blur(12px)", opacity: 0 }}
                animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 0.85, ease: "easeOut" }}
              >
                <div className="relative">
                  <ImageWithFallback
                    src={assetUrl(resultMovie.poster)}
                    alt={resultMovie.title}
                    className="h-[21rem] w-full object-cover sm:h-[24rem] md:h-[28rem]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                  <div className="absolute bottom-0 w-full p-4 text-white sm:p-6">
                    <p className="text-xs uppercase tracking-[0.25em] text-rose">Your Love Diagnosis</p>
                    <h3 className="mt-2 text-3xl font-extrabold sm:text-4xl">{resultMovie.title}</h3>
                    <p className="mt-1 text-xs text-white/80 sm:text-sm">
                      {resultMovie.year} • {resultMovie.genre}
                    </p>
                    <p className="mt-3 text-base font-semibold text-rose sm:mt-4 sm:text-lg">
                      {resultMovie.tagline}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/95 sm:mt-2 sm:text-base">
                      {resultMovie.blurb}
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="relative z-10 mx-auto mt-5 flex w-full max-w-md flex-col gap-3 sm:mt-6 sm:flex-row">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex-1 rounded-2xl border border-deepRose bg-white px-4 py-3 text-base font-bold text-deepRose transition hover:bg-deepRose hover:text-white sm:text-lg"
                >
                  Share the Result
                </button>
                <button
                  type="button"
                  onClick={toggleMusic}
                  className="rounded-2xl border border-rose/40 bg-white px-4 py-3 text-sm font-bold text-[#2f2b2c] transition hover:bg-blush sm:text-base"
                >
                  Play/Pause Music
                </button>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="rounded-2xl border border-rose/40 bg-white px-4 py-3 text-sm font-bold text-[#2f2b2c] transition hover:bg-blush sm:text-base"
                >
                  Restart
                </button>
              </div>

              <p className="relative z-10 mt-3 text-center text-sm text-[#f0ddd0]">
                Now Playing: {resultMovie.title} {isPlaying ? "• Playing" : "• Paused"}
              </p>

              {musicNotice && (
                <p className="relative z-10 mt-4 text-center text-sm text-[#e8d2c4]">{musicNotice}</p>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="pointer-events-none absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-rose/15 blur-3xl"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute -left-24 -top-16 h-64 w-64 rounded-full bg-deepRose/10 blur-3xl"
        animate={{ scale: [1.06, 1, 1.06] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
    </main>
  );
}

export default App;










