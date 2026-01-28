"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ELMS Activity 1 - Interactive Abstract Illustrations (React + Tailwind)
// Dark theme - Minimal UI - Mobile-friendly - Clickable - Animated

const cx = (...xs) => xs.filter(Boolean).join(" ");

const fade = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const pop = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1 },
};

const Glow = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
    <div className="absolute -right-40 top-24 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
    <div className="absolute left-1/2 top-[60%] h-96 w-96 -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
  </div>
);

const Tooltip = ({ label, children }) => (
  <span className="group relative inline-flex">
    {children}
    <span className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 w-max -translate-x-1/2 rounded-xl border border-white/10 bg-neutral-950/95 px-3 py-2 text-xs text-neutral-200 opacity-0 shadow-lg shadow-black/30 transition group-hover:opacity-100">
      {label}
    </span>
  </span>
);

const Pill = ({ children, active }) => (
  <span
    className={cx(
      "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
      active
        ? "border-white/20 bg-white/10 text-white"
        : "border-white/10 bg-white/5 text-neutral-200"
    )}
  >
    {children}
  </span>
);

const Btn = ({ children, onClick, active, title }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={cx(
      "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition",
      active
        ? "border-white/20 bg-white/10 text-white"
        : "border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10"
    )}
  >
    {children}
  </button>
);

const Card = ({ title, subtitle, children }) => (
  <section className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5 shadow-lg shadow-black/20">
    <header className="mb-4">
      <h2 className="text-base font-bold text-white">{title}</h2>
      {subtitle ? (
        <p className="mt-1 text-sm text-neutral-300">{subtitle}</p>
      ) : null}
    </header>
    {children}
  </section>
);

const Arrow = ({ animated }) => (
  <span className="relative inline-flex h-10 w-10 items-center justify-center" aria-hidden>
    <span className="absolute left-1 right-1 top-1/2 h-[2px] -translate-y-1/2 bg-white/20" />
    <span className="absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-r-2 border-t-2 border-white/20" />
    {animated ? (
      <motion.span
        className="absolute left-1 top-1/2 h-[2px] -translate-y-1/2 bg-white/60"
        initial={{ width: 0, opacity: 0.6 }}
        animate={{ width: "75%", opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
    ) : null}
  </span>
);

const DownArrow = ({ animated }) => (
  <span className="relative inline-flex h-10 w-10 items-center justify-center" aria-hidden>
    <span className="absolute bottom-1 top-1 left-1/2 w-[2px] -translate-x-1/2 bg-white/20" />
    <span className="absolute bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-white/20" />
    {animated ? (
      <motion.span
        className="absolute left-1/2 top-1 w-[2px] -translate-x-1/2 bg-white/60"
        initial={{ height: 0, opacity: 0.6 }}
        animate={{ height: "70%", opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
    ) : null}
  </span>
);

const Node = ({ title, desc, active, onClick, tooltip, badge }) => (
  <Tooltip label={tooltip || title}>
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "w-full rounded-3xl border px-4 py-3 text-left transition",
        active
          ? "border-white/30 bg-white/10 shadow-lg shadow-black/20"
          : "border-white/10 bg-white/5 hover:bg-white/10"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-extrabold tracking-wide text-white">{title}</div>
        {badge ? <Pill active={active}>{badge}</Pill> : null}
      </div>
      {desc ? <div className="mt-1 text-xs text-neutral-300">{desc}</div> : null}
    </button>
  </Tooltip>
);

function Tabs({ tab, setTab }) {
  const tabs = [
    { id: "ipo", label: "IPO" },
    { id: "elements", label: "Elements" },
    { id: "hardware", label: "Hardware" },
    { id: "software", label: "Software" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => (
        <Btn
          key={t.id}
          active={tab === t.id}
          onClick={() => setTab(t.id)}
          title={t.label}
        >
          {t.label}
        </Btn>
      ))}
    </div>
  );
}

function IpoScene({ animateFlow, selection, setSelection, playPulse }) {
  const is = (k) => selection === k;

  // Mobile: vertical flow. Desktop: horizontal flow with storage under process.
  return (
    <Card title="1) Input-Process-Output Model" subtitle="Data -> Work -> Information">
      <div className="grid gap-4">
        {/* Desktop layout */}
        <div className="hidden md:block">
          <div className="flex items-center gap-3">
            <div className="w-56">
              <motion.div variants={pop} initial="hidden" animate="show">
                <Node
                  title="INPUT"
                  badge="Data"
                  desc="Numbers, text, images, sounds"
                  active={is("IPO:INPUT")}
                  onClick={() => setSelection("IPO:INPUT")}
                  tooltip="Raw data enters the system"
                />
              </motion.div>
            </div>
            <Arrow animated={animateFlow || playPulse} />
            <div className="w-56">
              <motion.div variants={pop} initial="hidden" animate="show" transition={{ delay: 0.06 }}>
                <Node
                  title="PROCESS"
                  badge="Compute"
                  desc="Executes instructions to transform data"
                  active={is("IPO:PROCESS")}
                  onClick={() => setSelection("IPO:PROCESS")}
                  tooltip="The system performs operations here"
                />
              </motion.div>
            </div>
            <Arrow animated={animateFlow || playPulse} />
            <div className="w-56">
              <motion.div variants={pop} initial="hidden" animate="show" transition={{ delay: 0.12 }}>
                <Node
                  title="OUTPUT"
                  badge="Info"
                  desc="Result presented to the user"
                  active={is("IPO:OUTPUT")}
                  onClick={() => setSelection("IPO:OUTPUT")}
                  tooltip="Information becomes accessible"
                />
              </motion.div>
            </div>
          </div>

          <div className="mt-3 flex items-start gap-3">
            <div className="w-56" />
            <div className="w-10" />
            <div className="w-56 flex flex-col items-center">
              <DownArrow animated={animateFlow || playPulse} />
              <div className="w-full">
                <motion.div variants={pop} initial="hidden" animate="show" transition={{ delay: 0.18 }}>
                  <Node
                    title="STORAGE"
                    badge="Store"
                    desc="Temporary or permanent keeping"
                    active={is("IPO:STORAGE")}
                    onClick={() => setSelection("IPO:STORAGE")}
                    tooltip="Keeps data so it can be retrieved"
                  />
                </motion.div>
              </div>
              <div className="mt-2 w-full text-xs text-neutral-400">-> feeds back to Process</div>
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden grid gap-3">
          <motion.div variants={pop} initial="hidden" animate="show">
            <Node
              title="INPUT"
              badge="Data"
              desc="Numbers, text, images, sounds"
              active={is("IPO:INPUT")}
              onClick={() => setSelection("IPO:INPUT")}
              tooltip="Raw data enters the system"
            />
          </motion.div>
          <div className="flex justify-center">
            <DownArrow animated={animateFlow || playPulse} />
          </div>
          <motion.div variants={pop} initial="hidden" animate="show" transition={{ delay: 0.06 }}>
            <Node
              title="PROCESS"
              badge="Compute"
              desc="Transforms data by instructions"
              active={is("IPO:PROCESS")}
              onClick={() => setSelection("IPO:PROCESS")}
              tooltip="Operations happen here"
            />
          </motion.div>
          <div className="flex justify-center">
            <DownArrow animated={animateFlow || playPulse} />
          </div>
          <motion.div variants={pop} initial="hidden" animate="show" transition={{ delay: 0.12 }}>
            <Node
              title="STORAGE"
              badge="Store"
              desc="Keeps data for later"
              active={is("IPO:STORAGE")}
              onClick={() => setSelection("IPO:STORAGE")}
              tooltip="Temporary or permanent keeping"
            />
          </motion.div>
          <div className="flex justify-center">
            <DownArrow animated={animateFlow || playPulse} />
          </div>
          <motion.div variants={pop} initial="hidden" animate="show" transition={{ delay: 0.18 }}>
            <Node
              title="OUTPUT"
              badge="Info"
              desc="Result presented to the user"
              active={is("IPO:OUTPUT")}
              onClick={() => setSelection("IPO:OUTPUT")}
              tooltip="Information becomes accessible"
            />
          </motion.div>
        </div>
      </div>
    </Card>
  );
}

function ElementsScene({ selection, setSelection }) {
  const is = (k) => selection === k;

  return (
    <Card title="2) Elements of a Computer System" subtitle="Core parts working together">
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <motion.div variants={fade} initial="hidden" animate="show" className="lg:col-span-3">
          <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm font-extrabold text-white">COMPUTER SYSTEM</div>
          </div>
        </motion.div>

        <motion.div variants={fade} initial="hidden" animate="show" transition={{ delay: 0.03 }}>
          <Node
            title="DATA"
            badge="Facts"
            desc="Numbers, text, images, sounds"
            active={is("E:DATA")}
            onClick={() => setSelection("E:DATA")}
            tooltip="Fundamental representations of facts"
          />
        </motion.div>

        <motion.div variants={fade} initial="hidden" animate="show" transition={{ delay: 0.06 }}>
          <Node
            title="SOFTWARE"
            badge="Instructions"
            desc="System + application programs"
            active={is("E:SOFT")}
            onClick={() => setSelection("E:SOFT")}
            tooltip="Defines instructions executed by hardware"
          />
        </motion.div>

        <motion.div variants={fade} initial="hidden" animate="show" transition={{ delay: 0.09 }}>
          <Node
            title="HARDWARE"
            badge="Devices"
            desc="Executes, stores, moves data"
            active={is("E:HARD")}
            onClick={() => setSelection("E:HARD")}
            tooltip="Physical parts of the system"
          />
        </motion.div>

        <motion.div variants={fade} initial="hidden" animate="show" transition={{ delay: 0.12 }} className="sm:col-span-2 lg:col-span-3">
          <Node
            title="COMMUNICATION"
            badge="Connect"
            desc="Transfers programs + data between systems"
            active={is("E:COMM")}
            onClick={() => setSelection("E:COMM")}
            tooltip="Channels can be wired or wireless"
          />
        </motion.div>
      </div>
    </Card>
  );
}

function HardwareScene({ selection, setSelection }) {
  const is = (k) => selection === k;

  const groups = useMemo(
    () => [
      { title: "INPUT DEVICES", items: ["Keyboard", "Mouse"], key: "H:IN" },
      { title: "OUTPUT DEVICES", items: ["Monitor", "Printer"], key: "H:OUT" },
      { title: "PROCESSING", items: ["Microprocessor (CPU)"], key: "H:CPU" },
      { title: "PRIMARY STORAGE", items: ["RAM", "Cache memory"], key: "H:PRI" },
      {
        title: "SECONDARY STORAGE",
        items: [
          "HDD",
          "SSD",
          "Flash Drive",
        ],
        key: "H:SEC",
      },
    ],
    []
  );

  return (
    <Card title="3) Hardware Components" subtitle="Physical components grouped by role">
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
        {groups.map((g, idx) => (
          <motion.div
            key={g.key}
            variants={fade}
            initial="hidden"
            animate="show"
            transition={{ delay: idx * 0.04 }}
            className={cx(
              "rounded-3xl border p-4 transition",
              is(g.key)
                ? "border-white/30 bg-white/10"
                : "border-white/10 bg-white/5 hover:bg-white/10"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setSelection(g.key)}
                className="text-sm font-extrabold text-white"
              >
                {g.title}
              </button>
              <Pill active={is(g.key)}>{g.items.length}</Pill>
            </div>
            <ul className="mt-3 space-y-2 text-xs text-neutral-200">
              {g.items.map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <span
                    className={cx(
                      "mt-[6px] h-1.5 w-1.5 rounded-full",
                      is(g.key) ? "bg-white" : "bg-white/40"
                    )}
                  />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}

function SoftwareScene({ selection, setSelection, animateFlow, playPulse }) {
  const is = (k) => selection === k;

  return (
    <Card title="4) Software Components" subtitle="Apps vs system software">
      <div className="grid gap-4">
        <motion.div variants={fade} initial="hidden" animate="show">
          <Node
            title="APPLICATION SOFTWARE"
            badge="Apps"
            desc="User-focused programs"
            active={is("S:APP")}
            onClick={() => setSelection("S:APP")}
            tooltip="Example: web browser"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <Pill>Web Browser (Google Chrome)</Pill>
          </div>
        </motion.div>

        <div className="flex items-center justify-center">
          <DownArrow animated={animateFlow || playPulse} />
        </div>

        <motion.div variants={fade} initial="hidden" animate="show" transition={{ delay: 0.05 }}>
          <Node
            title="SYSTEM SOFTWARE"
            badge="OS"
            desc="Provides services and core functions"
            active={is("S:SYS")}
            onClick={() => setSelection("S:SYS")}
            tooltip="Operating system + core parts"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <Pill>Operating System (Windows 10)</Pill>
            <Pill>API</Pill>
            <Pill>Kernel</Pill>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs font-bold text-white/90">API</div>
              <div className="mt-1 text-xs text-neutral-300">Interface used by apps to access OS services</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs font-bold text-white/90">Kernel</div>
              <div className="mt-1 text-xs text-neutral-300">Most important OS processing functions</div>
            </div>
          </div>
        </motion.div>
      </div>
    </Card>
  );
}

export default function ElmsIllustrations() {
  const [tab, setTab] = useState("ipo");
  const [animateFlow, setAnimateFlow] = useState(true);
  const [selection, setSelection] = useState("IPO:PROCESS");
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (!play) return;

    const sequenceByTab = {
      ipo: ["IPO:INPUT", "IPO:PROCESS", "IPO:STORAGE", "IPO:OUTPUT"],
      elements: ["E:DATA", "E:SOFT", "E:HARD", "E:COMM"],
      hardware: ["H:IN", "H:CPU", "H:PRI", "H:SEC", "H:OUT"],
      software: ["S:APP", "S:SYS"],
    };

    const seq = sequenceByTab[tab] || [];
    let i = 0;
    setSelection(seq[0] || null);

    const id = setInterval(() => {
      i = (i + 1) % Math.max(1, seq.length);
      setSelection(seq[i] || null);
    }, 950);

    return () => clearInterval(id);
  }, [play, tab]);

  useEffect(() => {
    const defaults = {
      ipo: "IPO:PROCESS",
      elements: "E:SOFT",
      hardware: "H:CPU",
      software: "S:SYS",
    };
    setSelection(defaults[tab]);
  }, [tab]);

  const playPulse = play;

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white">
      <Glow />

      <div className="relative mx-auto max-w-5xl px-4 py-6 sm:py-8">
        <motion.header variants={fade} initial="hidden" animate="show" className="mb-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
              01 eLMS Activity 1
            </h1>

            <div className="flex flex-wrap items-center gap-2">
              <Btn
                active={animateFlow}
                onClick={() => setAnimateFlow((v) => !v)}
                title="Toggle animations"
              >
                {animateFlow ? "Animate" : "Static"}
              </Btn>
              <Btn
                active={play}
                onClick={() => setPlay((v) => !v)}
                title="Auto-highlight"
              >
                {play ? "Auto" : "Auto"}
              </Btn>
              <Btn active={false} onClick={() => setSelection(null)} title="Clear selection">
                Clear
              </Btn>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <Tabs tab={tab} setTab={setTab} />
            <div className="flex flex-wrap gap-2">
              <Pill active={selection !== null}>Selected</Pill>
              <Pill>Dark</Pill>
            </div>
          </div>
        </motion.header>

        <AnimatePresence mode="wait">
          {tab === "ipo" ? (
            <motion.div key="ipo" variants={fade} initial="hidden" animate="show" exit="hidden">
              <IpoScene
                animateFlow={animateFlow}
                selection={selection}
                setSelection={setSelection}
                playPulse={playPulse}
              />
            </motion.div>
          ) : null}

          {tab === "elements" ? (
            <motion.div key="elements" variants={fade} initial="hidden" animate="show" exit="hidden">
              <ElementsScene selection={selection} setSelection={setSelection} />
            </motion.div>
          ) : null}

          {tab === "hardware" ? (
            <motion.div key="hardware" variants={fade} initial="hidden" animate="show" exit="hidden">
              <HardwareScene selection={selection} setSelection={setSelection} />
            </motion.div>
          ) : null}

          {tab === "software" ? (
            <motion.div key="software" variants={fade} initial="hidden" animate="show" exit="hidden">
              <SoftwareScene
                selection={selection}
                setSelection={setSelection}
                animateFlow={animateFlow}
                playPulse={playPulse}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}


