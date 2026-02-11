"use client"

import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/Navbar"

type Question = {
  id: number
  area: string
  text: string
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    area: "Files",
    text: "If you need a document (invoice, contract, employee record), you can find it in under 2 minutes without asking anyone.",
  },
  {
    id: 2,
    area: "Daily work",
    text: "Your team has one place to check what needs to be done today (not just chat messages).",
  },
  {
    id: 3,
    area: "Approvals",
    text: "When someone approves a purchase or discount, it is recorded and easy to check later.",
  },
  {
    id: 4,
    area: "Customers",
    text: "You can see a customer’s latest order and any unpaid balance without digging through chat threads.",
  },
  {
    id: 5,
    area: "Inventory",
    text: "You know what is in stock right now and what needs reordering without doing a manual count.",
  },
  {
    id: 6,
    area: "Payments",
    text: "You can quickly see what is due this week (bills, supplier payables, customer collections).",
  },
  {
    id: 7,
    area: "Payroll",
    text: "Payroll is computed the same way every time using clear rules, not manual edits each cut-off.",
  },
  {
    id: 8,
    area: "Reports",
    text: "You can produce a simple weekly snapshot (sales, cash, stock, expenses) in under 10 minutes.",
  },
]

const OPTIONS = [
  { score: 1, label: "Not at all" },
  { score: 2, label: "Not yet" },
  { score: 3, label: "Sometimes" },
  { score: 4, label: "Mostly" },
  { score: 5, label: "Yes, always" },
] as const

function readinessLabel(avg: number) {
  if (avg >= 4.2) return { title: "Digitally Ready ✅", hint: "You’re running tight systems. Nice." }
  if (avg >= 3.2) return { title: "Getting There ✨", hint: "You’ve got momentum — a few gaps to tighten." }
  if (avg >= 2.2) return { title: "Needs Structure 🧩", hint: "You’ll feel big wins by centralizing your workflows." }
  return { title: "Early Stage 🌱", hint: "Start simple: one system at a time." }
}

function BentoSurface({
  className = "",
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return
        const r = ref.current.getBoundingClientRect()
        // Update CSS variables directly on the DOM element to avoid React re-renders
        ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`)
        ref.current.style.setProperty("--my", `${e.clientY - r.top}px`)
      }}
      className={[
        "relative rounded-[32px] border border-white/10",
        "bg-white/[0.06] backdrop-blur-xl",
        "shadow-[0_40px_100px_-60px_rgba(168,85,247,0.55)]",
        "overflow-hidden",
        "group", // Added group for hover detection if needed
        className,
      ].join(" ")}
    >
      {/* Mobile-optimized: Only show dynamic gradient on hover (desktop) to save resources */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(420px 320px at var(--mx, 50%) var(--my, 50%), rgba(168,85,247,0.18), transparent 60%), radial-gradient(520px 360px at calc(var(--mx, 50%) + 140px) calc(var(--my, 50%) + 120px), rgba(249,115,22,0.12), transparent 60%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.06] to-transparent" />
      {children}
    </div>
  )
}


export default function QuizPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [done, setDone] = useState(false)

  const current = QUESTIONS[step]
  const total = QUESTIONS.length

  const readinessPercent = useMemo(() => {
    const scores = QUESTIONS.map((q) => answers[q.id]).filter(Boolean) as number[]
    if (!scores.length) return 0
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length
    return Math.round(((avg - 1) / 4) * 100)
  }, [answers])

  const progress = useMemo(() => {
    if (done) return readinessPercent
    return Math.round(((step + 1) / total) * 100)
  }, [step, total, done, readinessPercent])

  const computed = useMemo(() => {
    const scores = QUESTIONS.map((q) => answers[q.id]).filter(Boolean) as number[]
    const totalScore = scores.reduce((a, b) => a + b, 0)
    const avg = scores.length ? totalScore / scores.length : 0

    const lowest = QUESTIONS.reduce(
      (acc, q) => {
        const s = answers[q.id]
        if (!s) return acc
        if (!acc || s < acc.score) return { area: q.area, score: s }
        return acc
      },
      null as null | { area: string; score: number }
    )

    return {
      totalScore,
      avg,
      percent: readinessPercent,
      label: readinessLabel(avg),
      lowestArea: lowest?.area,
    }
  }, [answers, readinessPercent])

  function pick(score: number) {
    const qid = current.id
    setAnswers((prev) => ({ ...prev, [qid]: score }))

    if (step < total - 1) setStep((s) => s + 1)
    else setDone(true)
  }

  function back() {
    if (done) setDone(false)
    else setStep((s) => Math.max(0, s - 1))
  }

  function reset() {
    setAnswers({})
    setStep(0)
    setDone(false)
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[#22003d]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_20%_10%,rgba(168,85,247,0.38),transparent_60%),radial-gradient(900px_700px_at_80%_20%,rgba(249,115,22,0.22),transparent_60%),radial-gradient(900px_700px_at_40%_90%,rgba(236,72,153,0.18),transparent_60%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="relative mx-auto max-w-3xl px-6 py-10">
        <Navbar variant="quiz" />

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.06] text-white/80 text-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_0_6px_rgba(249,115,22,0.15)]" />
            Digitally Ready Quick Check
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Is your business <span className="text-white/55">Digitally Ready?</span>
          </h1>
          <p className="mt-4 text-white/65">8 quick questions. Choose one answer per item.</p>
        </div>

        <BentoSurface className="mt-10">
          <div className="px-6 pt-6">
            <div className="flex items-center justify-between text-sm text-white/70">
              <span>{done ? "Results" : `Question ${step + 1} of ${total}`}</span>
              <span className="tabular-nums">{progress}%</span>
            </div>

            <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 to-orange-400 transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {!done ? (
            <div className="px-6 pb-6 pt-6">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-full text-xs font-semibold border border-white/10 bg-white/[0.06] text-white/70">
                  {current.area}
                </div>
              </div>

              <h2 className="mt-4 text-xl sm:text-2xl font-semibold text-white leading-snug">
                {current.text}
              </h2>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OPTIONS.map((opt) => {
                  const selected = answers[current.id] === opt.score
                  return (
                    <button
                      key={opt.score}
                      onClick={() => pick(opt.score)}
                      className={[
                        "group relative text-left px-4 py-4 rounded-2xl border transition-all",
                        "border-white/10 bg-white/[0.05] hover:bg-white/[0.07]",
                        "hover:shadow-[0_20px_60px_-40px_rgba(168,85,247,0.6)]",
                        "focus:outline-none focus:ring-2 focus:ring-orange-400/40",
                        selected ? "ring-2 ring-orange-400/50 border-orange-400/30" : "",
                      ].join(" ")}
                    >
                      {/* tiny hover glow */}
                      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute inset-0 bg-[radial-gradient(260px_180px_at_30%_20%,rgba(168,85,247,0.22),transparent_65%)]" />
                      </div>

                      <div className="relative flex items-center justify-between gap-3">
                        <div className="text-white font-semibold">{opt.label}</div>
                        <div
                          className={[
                            "h-7 w-7 rounded-full border border-white/10 bg-white/[0.06] grid place-items-center",
                            selected ? "border-orange-400/40 bg-orange-400/10" : "",
                          ].join(" ")}
                        >
                          <span className="text-xs text-white/70">{opt.score}</span>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  onClick={back}
                  disabled={step === 0}
                  className="px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.06] text-white/80 hover:bg-white/[0.08] disabled:opacity-40 transition"
                >
                  Back
                </button>
              </div>

              <div className="mt-4 text-center text-xs text-white/50">
                Tip: Don’t overthink — pick what’s true most of the time.
              </div>
            </div>
          ) : (
            <div className="px-6 pb-8 pt-6">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.06] text-white/70 text-xs w-fit">
                  Your result
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-6 md:gap-8 items-start">
                  {/* Left */}
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                      {computed.label.title}
                    </h2>
                    <p className="mt-3 text-white/70 leading-relaxed">{computed.label.hint}</p>

                    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <div className="text-white font-semibold">What to improve first</div>
                      <p className="mt-1 text-white/70">
                        Start with your lowest area and create{" "}
                        <span className="text-white">one source of truth</span>.
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="relative flex justify-center">
                    <div className="absolute -inset-6 rounded-[32px] bg-gradient-to-r from-fuchsia-500/15 to-orange-500/15 blur-3xl" />

                    <div className="relative rounded-[28px] border border-white/10 bg-white/[0.06] backdrop-blur-xl px-8 py-7 text-center w-full max-w-[320px]">
                      <div className="text-white/60 text-[11px] uppercase tracking-[0.22em]">
                        Preparedness
                      </div>

                      <div className="mt-4 flex justify-center items-baseline gap-2 leading-none">
                        <span className="text-7xl font-extrabold bg-gradient-to-r from-fuchsia-400 to-orange-400 bg-clip-text text-transparent tabular-nums">
                          {computed.percent}
                        </span>
                        <span className="text-2xl font-bold text-white/70">%</span>
                      </div>

                      <div className="mt-3 text-white/70">Digital readiness level</div>

                      <div className="mt-5 flex items-center justify-center gap-2">
                        <div className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] text-white/70">
                          {computed.lowestArea ?? "—"}
                        </div>
                        <div className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] text-white/70">
                          {total} questions
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-between">
                <button
                  onClick={back}
                  className="px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.06] text-white/80 hover:bg-white/[0.08] transition"
                >
                  Review answers
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={reset}
                    className="px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.06] text-white/80 hover:bg-white/[0.08] transition"
                  >
                    Retake
                  </button>

                  <Link
                    href="/#solutions"
                    className="px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white font-semibold transition text-center shadow-[0_18px_50px_-30px_rgba(249,115,22,0.8)]"
                  >
                    See a plan that fits →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </BentoSurface>
      </div>
    </main>
  )
}
