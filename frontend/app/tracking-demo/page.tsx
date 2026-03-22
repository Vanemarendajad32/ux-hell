"use client";

import { useMemo, useState } from "react";
import {
  finishSession,
  getPayload,
  startSession,
  type TrackingPayload,
  trackClick,
  trackError,
  trackSubmitAttempt,
} from "@/lib/tracking";

export default function TrackingDemoPage() {
  const [payload, setPayload] = useState<TrackingPayload | null>(null);
  const [apiResult, setApiResult] = useState<string>("");
  const prettyPayload = useMemo(
    () => JSON.stringify(payload, null, 2),
    [payload],
  );

  const refreshPayload = () => {
    setPayload(getPayload());
  };

  const runTrackingAction = (action: () => void) => {
    try {
      action();
      refreshPayload();
      setApiResult("");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown tracking error occurred.";
      setApiResult(message);
    }
  };

  const handleSendToApi = async () => {
    const currentPayload = getPayload();

    if (!currentPayload) {
      setApiResult("No payload available. Start a session first.");
      return;
    }

    const response = await fetch("/api/tracking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentPayload),
    });

    const data = await response.json();
    setApiResult(JSON.stringify(data, null, 2));
  };

  return (
    <div className="min-h-screen bg-zinc-100 px-6 py-10 text-zinc-900">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-xl bg-white p-6 shadow-sm">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            ux-hell tracking demo
          </p>
          <h1 className="text-2xl font-semibold">
            Tracking Foundation Test Page
          </h1>
          <p className="text-sm text-zinc-600">
            Use the buttons below to simulate a registration flow and inspect
            the tracking payload.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-md bg-zinc-900 px-3 py-2 text-sm text-white"
            onClick={() => {
              setPayload(startSession());
              setApiResult("");
            }}
            type="button"
          >
            startSession()
          </button>
          <button
            className="rounded-md bg-zinc-700 px-3 py-2 text-sm text-white"
            onClick={() => runTrackingAction(trackClick)}
            type="button"
          >
            trackClick()
          </button>
          <button
            className="rounded-md bg-red-600 px-3 py-2 text-sm text-white"
            onClick={() => runTrackingAction(trackError)}
            type="button"
          >
            trackError()
          </button>
          <button
            className="rounded-md bg-amber-600 px-3 py-2 text-sm text-white"
            onClick={() => runTrackingAction(trackSubmitAttempt)}
            type="button"
          >
            trackSubmitAttempt()
          </button>
          <button
            className="rounded-md bg-emerald-700 px-3 py-2 text-sm text-white"
            onClick={() => {
              setPayload(finishSession());
            }}
            type="button"
          >
            finishSession()
          </button>
          <button
            className="rounded-md border border-zinc-400 px-3 py-2 text-sm text-zinc-800"
            onClick={refreshPayload}
            type="button"
          >
            getPayload()
          </button>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700">
            Current Payload
          </h2>
          <pre className="overflow-x-auto rounded-md bg-zinc-950 p-4 text-xs text-zinc-100">
            {prettyPayload ?? "null"}
          </pre>
        </div>

        <div className="space-y-2">
          <button
            className="rounded-md border border-zinc-900 px-3 py-2 text-sm font-medium text-zinc-900"
            onClick={handleSendToApi}
            type="button"
          >
            POST payload to /api/tracking
          </button>
          <pre className="overflow-x-auto rounded-md bg-zinc-200 p-4 text-xs text-zinc-900">
            {apiResult || "No API request yet."}
          </pre>
        </div>
      </main>
    </div>
  );
}
