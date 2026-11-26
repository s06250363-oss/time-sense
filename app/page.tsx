"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);
  const [targetTime, setTargetTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [round, setRound] = useState(1);
  const [bestError, setBestError] = useState<number | null>(null);
  const [newBest, setNewBest] = useState(false);

  useEffect(() => {
    if (!started || startTime === null) return;

    const timer = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setCurrentTime(elapsed);
    }, 10);

    return () => clearInterval(timer);
  }, [started, startTime]);

  useEffect(() => {
  const savedBest = localStorage.getItem("time-game-best");

  if (savedBest !== null) {
    setBestError(Number(savedBest));
  }

  setTargetTime(Math.random() * 12 + 3);
}, []);

  const handleClick = () => {
    if (!started) {
      setStarted(true);
      setStartTime(Date.now());
      setCurrentTime(0);
    } else if (startTime !== null) {
      const endTime = Date.now();
      const elapsed = (endTime - startTime) / 1000;

      const currentDifference = elapsed - targetTime;
      const currentError = Math.abs(currentDifference);

     if (bestError === null || currentError < bestError) {
  setBestError(currentError);
  setNewBest(true);

  localStorage.setItem(
    "time-game-best",
    currentError.toString()
  );
} else {
  setNewBest(false);
}

      setElapsedTime(elapsed);
      setStarted(false);
      setStartTime(null);
    }
  };

  const handleRetry = () => {
  setElapsedTime(null);
  setTargetTime(Math.random() * 12 + 3);
  setCurrentTime(0);
  setNewBest(false);
  setRound(round + 1);
};

  const timerOpacity =
    currentTime < 1.5
      ? 1
      : Math.max(0, 1 - (currentTime - 1.5) / 1);

  const difference =
    elapsedTime !== null ? elapsedTime - targetTime : 0;

  const error =
    elapsedTime !== null ? Math.abs(difference) : 0;
      const accuracy =
    elapsedTime !== null
      ? (1 - error / targetTime) * 100
      : 0;

  const resultText =
    error < 0.05
      ? "PERFECT"
      : error < 0.1
      ? "GREAT"
      : error < 0.25
      ? "GOOD"
      : error < 0.5
      ? "NICE"
      : error < 1
      ? "CLOSE"
      : "MISS";

  return (
    <main className="min-h-screen bg-[#f5f1e8] flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-[#172A46]">
          TIME SENSE
        </h1>

        <p className="mt-3 text-[#68727F]">
          目標の時間を体感で当てよう。
        </p>

        {/* Always-visible rank table */}
        <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm font-bold tracking-widest text-[#C9A24A]">
            RANK
          </p>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-bold text-[#172A46]">
                PERFECT
              </span>
              <span className="text-[#68727F]">
                ±0.05秒未満
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-bold text-[#172A46]">
                GREAT
              </span>
              <span className="text-[#68727F]">
                ±0.10秒未満
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-bold text-[#172A46]">
                GOOD
              </span>
              <span className="text-[#68727F]">
                ±0.25秒未満
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-bold text-[#172A46]">
                NICE
              </span>
              <span className="text-[#68727F]">
                ±0.50秒未満
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-bold text-[#172A46]">
                CLOSE
              </span>
              <span className="text-[#68727F]">
                ±1.00秒未満
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-bold text-[#172A46]">
                MISS
              </span>
              <span className="text-[#68727F]">
                ±1.00秒以上
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10">
          {elapsedTime === null ? (
            <>
              <p className="mb-2 text-sm font-bold tracking-widest text-[#68727F]">
  ROUND {round}
</p>

<p className="mb-4 text-2xl font-bold text-[#172A46]">
  目標：{targetTime.toFixed(3)}秒
</p>

<p className="mb-6 text-sm text-[#68727F]">
  BEST{" "}
  <span className="font-bold text-[#172A46]">
    {bestError !== null
      ? `${bestError.toFixed(3)}秒`
      : "-"}
  </span>
</p>

              {started && (
                <p
                  className="mb-8 text-5xl font-bold text-[#172A46]"
                  style={{ opacity: timerOpacity }}
                >
                  {currentTime.toFixed(3)}
                </p>
              )}

              <button
                onClick={handleClick}
                className="w-full rounded-2xl bg-[#172A46] px-6 py-5 text-xl font-bold text-white active:scale-95"
              >
                {started ? "STOP" : "START"}
              </button>
            </>
          ) : (
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="rounded-2xl bg-[#f5f1e8] px-6 py-8">
                <p className="text-sm font-bold tracking-widest text-[#68727F]">
                  RESULT
                </p>

                <p className="mt-3 text-6xl font-black tracking-tight text-[#172A46]">
                  {resultText}
                </p>

                <p className="mt-3 text-lg text-[#68727F]">
                  {difference === 0
                    ? "ぴったり"
                    : difference > 0
                    ? `${error.toFixed(3)}秒遅い`
                    : `${error.toFixed(3)}秒早い`}
                </p>
              </div>
              {newBest && (
  <div className="mt-5 rounded-xl border-2 border-[#C9A24A] bg-[#f5f1e8] px-4 py-3">
    <p className="text-2xl font-black tracking-widest text-[#C9A24A]">
      NEW BEST!
    </p>
  </div>
)}

              {/* BEST */}
              <div className="mt-8">
                <p className="text-sm text-[#68727F]">
                  BEST
                </p>

                <p className="mt-1 text-3xl font-bold text-[#172A46]">
                  {bestError !== null
                    ? `${bestError.toFixed(3)}秒`
                    : "-"}
                </p>
              </div>

              {/* RESULT DETAILS */}
              <div className="mt-8">
                <p className="text-sm text-[#68727F]">
                  目標
                </p>

                <p className="mt-1 text-2xl font-bold text-[#172A46]">
                  {targetTime.toFixed(3)}秒
                </p>

                <p className="mt-6 text-sm text-[#68727F]">
                  実測
                </p>

                <p className="mt-1 text-5xl font-bold text-[#172A46]">
                  {elapsedTime.toFixed(3)}秒
                </p>
                                <p className="mt-6 text-sm text-[#68727F]">
                  精度
                </p>

                <p className="mt-1 text-3xl font-bold text-[#172A46]">
                  {accuracy.toFixed(3)}%
                </p>
              </div>

              <button
                onClick={handleRetry}
                className="mt-8 w-full rounded-xl bg-[#172A46] px-6 py-4 text-lg font-bold text-white active:scale-95"
              >
                もう一回
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}