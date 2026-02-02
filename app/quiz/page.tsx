"use client"

import { useMemo, useState } from "react"
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
      <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_15%,rgba(168,85,247,0.55),rgba(42,0,79,0)_70%),radial-gradient(70%_60%_at_80%_75%,rgba(236,72,153,0.35),rgba(42,0,79,0)_65%)]" />
      <div className="absolute inset-0 bg-[#2a004f]" />

      <div className="relative mx-auto max-w-3xl px-6 py-10">
        <Navbar variant="quiz" />

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/8 text-white/80 text-sm">
            <span className="h-2 w-2 rounded-full bg-orange-400" />
            Digitally Ready Quick Check
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Is your business <span className="text-white/60">Digitally Ready?</span>
          </h1>
          <p className="mt-4 text-white/70">8 quick questions. Choose one answer per item.</p>
        </div>

        <div className="mt-10 rounded-[28px] border border-white/10 bg-white/8 backdrop-blur-xl shadow-2xl shadow-purple-500/10 overflow-hidden">
          <div className="px-6 pt-6">
            <div className="flex items-center justify-between text-sm text-white/70">
              <span>{done ? "Results" : `Question ${step + 1} of ${total}`}</span>
              <span>{progress}%</span>
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
                <div className="px-3 py-1 rounded-full text-xs font-semibold border border-white/10 bg-white/8 text-white/70">
                  {current.area}
                </div>
              </div>

              <h2 className="mt-4 text-xl sm:text-2xl font-semibold text-white leading-snug">{current.text}</h2>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OPTIONS.map((opt) => {
                  const selected = answers[current.id] === opt.score
                  return (
                    <button
                      key={opt.score}
                      onClick={() => pick(opt.score)}
                      className={[
                        "text-left px-4 py-4 rounded-2xl border transition-all",
                        "bg-white/8 hover:bg-white/10 border-white/10",
                        selected ? "ring-2 ring-orange-400/60 border-orange-400/30" : "",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-white font-semibold">{opt.label}</div>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  onClick={back}
                  disabled={step === 0}
                  className="px-5 py-3 rounded-2xl border border-white/10 bg-white/8 text-white/80 hover:bg-white/10 disabled:opacity-40 transition"
                >
                  Back
                </button>
              </div>

              <div className="mt-4 text-center text-xs text-white/50">Tip: Don’t overthink — pick what’s true most of the time.</div>
            </div>
          ) : (
            <div className="px-6 pb-8 pt-6">
                <div className="space-y-6">

                  {/* Top row (full width) */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70 text-xs w-fit">
                    Your result
                  </div>

                  {/* Main aligned row */}
                  <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-6 md:gap-8 items-start">

                    {/* Left */}
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                        {computed.label.title}
                      </h2>

                      <p className="mt-3 text-white/70 leading-relaxed">
                        {computed.label.hint}
                      </p>

                      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="text-white font-semibold">What to improve first</div>
                        <p className="mt-1 text-white/70">
                          Start with your lowest area and create{" "}
                          <span className="text-white">one source of truth</span>.
                        </p>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="relative flex justify-center">

                      <div className="absolute -inset-2 rounded-[28px] bg-gradient-to-r from-fuchsia-500/20 to-orange-500/20 blur-2xl" />

                      <div className="relative rounded-[27px] border border-white/10 bg-white/8 backdrop-blur-xl p-6 text-center">
                        <div className="text-white/60 text-xs uppercase tracking-[0.2em]">
                          Preparedness
                        </div>

                        <div className="mt-3 flex justify-center items-end gap-2 leading-none">
                          <span className="text-6xl font-extrabold bg-gradient-to-r from-fuchsia-400 to-orange-400 bg-clip-text text-transparent">
                            {computed.percent}
                          </span>
                          <span className="text-xl font-bold text-white/70 mb-2">%</span>
                        </div>

                        <div className="mt-2 text-white/70">
                          Digital readiness level
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-between">
                <button
                  onClick={back}
                  className="px-5 py-3 rounded-2xl border border-white/10 bg-white/8 text-white/80 hover:bg-white/10 transition"
                >
                  Review answers
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={reset}
                    className="px-5 py-3 rounded-2xl border border-white/10 bg-white/8 text-white/80 hover:bg-white/10 transition"
                  >
                    Retake
                  </button>

                  <Link
                    href="/#pricing"
                    className="px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white font-semibold transition text-center"
                  >
                    See a plan that fits →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
