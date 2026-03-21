import Link from "next/link";
import MotionIcon from "@/components/icons/motion-icon";
import StatesIcon from "@/components/icons/states-icon";
import SurfaceIcon from "@/components/icons/surface-icon";
import UiComponentDemo from "./ui-component-demo";

const palette = {
  primaryGradient: [
    { name: "rose-600", hex: "#e11d48", className: "bg-rose-600" },
    { name: "orange-600", hex: "#ea580c", className: "bg-orange-600" },
    { name: "amber-600", hex: "#d97706", className: "bg-amber-600" },
  ],
  background: [
    { name: "rose-50", hex: "#fff1f2", className: "bg-rose-50" },
    { name: "orange-50", hex: "#fff7ed", className: "bg-orange-50" },
    { name: "amber-50", hex: "#fffbeb", className: "bg-amber-50" },
    { name: "white", hex: "#ffffff", className: "bg-white" },
  ],
  text: [
    {
      name: "slate-900",
      label: "Primary text",
      className: "text-slate-900",
      swatchBgClassName: "bg-slate-900",
      swatchTextClassName: "text-white",
    },
    {
      name: "slate-700",
      label: "Secondary text",
      className: "text-slate-700",
      swatchBgClassName: "bg-slate-700",
      swatchTextClassName: "text-white",
    },
    {
      name: "slate-600",
      label: "Muted text",
      className: "text-slate-600",
      swatchBgClassName: "bg-slate-600",
      swatchTextClassName: "text-white",
    },
    {
      name: "slate-500",
      label: "Placeholder",
      className: "text-slate-500",
      swatchBgClassName: "bg-slate-500",
      swatchTextClassName: "text-white",
    },
  ],
  border: [
    { name: "rose-200", label: "Primary border", className: "border-rose-200" },
    {
      name: "rose-300",
      label: "Annotation border",
      className: "border-rose-300",
    },
    {
      name: "slate-200",
      label: "Subtle border",
      className: "border-slate-200",
    },
    { name: "slate-300", label: "Input border", className: "border-slate-300" },
  ],
};

const spacing = {
  padding: [
    { name: "p-2", value: "0.5rem / 8px" },
    { name: "p-3", value: "0.75rem / 12px" },
    { name: "p-4", value: "1rem / 16px" },
    { name: "p-6", value: "1.5rem / 24px" },
    { name: "p-8", value: "2rem / 32px" },
  ],
  gap: [
    { name: "gap-2", value: "0.5rem / 8px" },
    { name: "gap-3", value: "0.75rem / 12px" },
    { name: "gap-4", value: "1rem / 16px" },
    { name: "gap-6", value: "1.5rem / 24px" },
  ],
};

const typography = [
  {
    name: "Heading 1",
    className: "text-3xl sm:text-5xl font-bold",
    size: "3rem / 48px",
  },
  {
    name: "Heading 2",
    className: "text-2xl sm:text-4xl font-bold",
    size: "2.25rem / 36px",
  },
  {
    name: "Heading 3",
    className: "text-xl sm:text-3xl font-bold",
    size: "1.875rem / 30px",
  },
  {
    name: "Heading 4",
    className: "text-lg sm:text-2xl font-bold",
    size: "1.5rem / 24px",
  },
  {
    name: "Heading 5",
    className: "text-base sm:text-xl font-semibold",
    size: "1.25rem / 20px",
  },
  {
    name: "Heading 6",
    className: "text-sm sm:text-lg font-semibold",
    size: "1.125rem / 18px",
  },
  { name: "Body text", className: "text-sm sm:text-base", size: "1rem / 16px" },
  {
    name: "Small text",
    className: "text-xs sm:text-sm",
    size: "0.875rem / 14px",
  },
  {
    name: "Extra small",
    className: "text-[11px] sm:text-xs",
    size: "0.75rem / 12px",
  },
];

const borderRadiusOptions = [
  {
    label: "xl",
    className: "rounded-xl",
    token: "rounded-xl",
    value: "0.75rem",
  },
  {
    label: "2xl",
    className: "rounded-2xl",
    token: "rounded-2xl",
    value: "1rem",
  },
  {
    label: "3xl",
    className: "rounded-3xl",
    token: "rounded-3xl",
    value: "1.5rem",
  },
  {
    label: "full",
    className: "rounded-full",
    token: "rounded-full",
    value: "9999px",
  },
];

const boxShadowOptions = [
  {
    label: "lg",
    className: "shadow-lg",
    token: "shadow-lg",
    description: "Standard",
  },
  {
    label: "xl",
    className: "shadow-xl",
    token: "shadow-xl",
    description: "Elevated",
  },
  {
    label: "2xl",
    className: "shadow-2xl",
    token: "shadow-2xl",
    description: "Modal",
  },
  {
    label: "inner",
    className: "shadow-inner",
    token: "shadow-inner",
    description: "Inset",
  },
];

const transitions = [
  {
    label: "Fast",
    swatchClassName: "transition-transform hover:scale-105",
    codeClassName: "transition-all",
    duration: "150ms",
  },
  {
    label: "Medium",
    swatchClassName: "transition-all duration-300 hover:scale-105",
    codeClassName: "duration-300",
    duration: "300ms",
  },
  {
    label: "Slow",
    swatchClassName: "transition-all duration-500 hover:scale-105",
    codeClassName: "duration-500",
    duration: "500ms",
  },
];

const opacityScale = [
  { label: "100%", className: "opacity-100" },
  { label: "90%", className: "opacity-90" },
  { label: "70%", className: "opacity-70" },
  { label: "50%", className: "opacity-50" },
  { label: "30%", className: "opacity-30" },
];

export default function StylebookPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(225,29,72,0.12),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(234,88,12,0.15),_transparent_50%),linear-gradient(180deg,_#fff7ed_0%,_#fff1f2_45%,_#ffffff_100%)] text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16">
        <nav className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-rose-200 bg-white/70 px-4 py-3 shadow-lg backdrop-blur sm:px-6 sm:py-4">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-rose-700">
              UI Hell
            </span>
            <span className="text-sm font-semibold text-slate-700">
              Stylebook
            </span>
          </div>
          <Link
            href="/"
            className="text-sm font-semibold text-rose-600 underline-offset-4 transition-colors hover:text-rose-700 hover:underline"
          >
            Back to home
          </Link>
        </nav>
        <header className="relative overflow-hidden rounded-3xl border border-rose-200 bg-white/80 p-6 shadow-2xl backdrop-blur sm:p-10">
          <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-rose-500 via-orange-500 to-amber-400 opacity-30 blur-2xl" />
          <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 opacity-25 blur-2xl" />
          <p className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-rose-700">
            UI Hell
          </p>
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Design System Visual Style Guide
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-600">
            A practical stylebook for colors, typography, motion, and
            components. Use these rules consistently to build loud, readable,
            and intentionally dramatic interfaces.
          </p>
        </header>

        <section className="rounded-[2.5rem] border border-rose-200/80 bg-white/70 p-6 shadow-2xl backdrop-blur sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-600">
                Foundations
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Color system
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Define your gradients, surfaces, and text hierarchy here. Every
                component should borrow from these tokens.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-8 sm:mt-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-rose-200 bg-white p-6 shadow-xl sm:p-8">
              <h3 className="text-xl font-bold text-slate-900">
                Color palette
              </h3>
              <div className="mt-6">
                <p className="text-sm font-semibold text-slate-700">
                  Primary gradient
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {palette.primaryGradient.map((swatch) => (
                    <div
                      key={swatch.name}
                      className="rounded-2xl border border-rose-200 p-3"
                    >
                      <div
                        className={`mb-3 flex h-24 items-center justify-center rounded-2xl ${swatch.className} font-semibold text-white shadow-lg`}
                      >
                        Aa
                      </div>
                      <p className="mt-3 text-sm font-semibold text-slate-800">
                        {swatch.name}
                      </p>
                      <p className="text-xs text-slate-500">{swatch.hex}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-rose-200 p-4">
                  <p className="text-sm font-semibold text-slate-700">
                    Main gradient
                  </p>
                  <div className="mt-3 flex h-24 items-center justify-center rounded-2xl bg-gradient-to-r from-rose-600 to-orange-600 font-semibold text-white shadow-lg">
                    Aa
                  </div>
                  <p className="mt-3 text-sm text-slate-700">rose → orange</p>
                </div>
              </div>
              <div className="mt-6 sm:mt-8">
                <p className="text-sm font-semibold text-slate-700">
                  Background colors
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {palette.background.map((swatch) => (
                    <div
                      key={swatch.name}
                      className="rounded-2xl border border-rose-200 p-3"
                    >
                      <div
                        className={`mb-3 flex h-24 items-center justify-center rounded-2xl ${swatch.className} border border-slate-200 font-semibold text-slate-900 shadow-lg`}
                      >
                        Aa
                      </div>
                      <p className="mt-3 text-sm font-semibold text-slate-800">
                        {swatch.name}
                      </p>
                      <p className="text-xs text-slate-500">{swatch.hex}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-rose-200 bg-white p-6 shadow-xl sm:p-8">
              <h3 className="text-xl font-bold text-slate-900">
                Text and borders
              </h3>
              <div className="mt-6">
                <p className="text-sm font-semibold text-slate-700">
                  Text colors
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {palette.text.map((item) => (
                    <div key={item.name}>
                      <div
                        className={`mb-3 flex h-24 items-center justify-center rounded-2xl shadow-lg ${item.swatchBgClassName} ${item.swatchTextClassName} font-semibold`}
                      >
                        Aa
                      </div>
                      <div className="text-sm font-semibold text-slate-900">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500">{item.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-rose-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Usage on bg-white
                    </p>
                    <div className="mt-3 grid gap-2">
                      {palette.text.map((item) => (
                        <p
                          key={`white-${item.name}`}
                          className={`text-sm font-semibold ${item.className}`}
                        >
                          Aa Example text ({item.name})
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Usage on bg-rose-50
                    </p>
                    <div className="mt-3 grid gap-2">
                      {palette.text.map((item) => (
                        <p
                          key={`rose-${item.name}`}
                          className={`text-sm font-semibold ${item.className}`}
                        >
                          Aa Example text ({item.name})
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-sm font-semibold text-slate-700">
                  Border colors
                </p>
                <div className="mt-3 grid gap-3">
                  {palette.border.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between rounded-xl border border-rose-200 bg-white px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-10 w-10 rounded-xl border-4 ${item.className} bg-rose-50`}
                        />
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            {item.label}
                          </p>
                          <p className="text-xs text-slate-500">{item.name}</p>
                        </div>
                      </div>
                      <div
                        className={`h-10 w-24 rounded-xl border-4 ${item.className} bg-white`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-rose-200/80 bg-white/70 p-6 shadow-2xl backdrop-blur sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-600">
                Foundations
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Spacing and type
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Keep rhythm consistent by using a shared spacing scale and
                predictable type sizes.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-8 sm:mt-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-rose-200 bg-white p-5 shadow-xl sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                Spacing and layout
              </h3>
              <div className="mt-6 grid gap-6 sm:gap-8 lg:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Padding scale
                  </p>
                  <div className="mt-3 space-y-2 sm:space-y-3">
                    {spacing.padding.map((item) => (
                      <div
                        key={item.name}
                        className="rounded-lg border border-rose-200 bg-rose-50"
                      >
                        <div
                          className={`m-1 rounded border border-rose-300 bg-white sm:m-2 ${item.name}`}
                        >
                          <div className="text-xs font-mono text-slate-600">
                            {item.name} ({item.value})
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Gap scale
                  </p>
                  <div className="mt-3 grid gap-3 sm:gap-4">
                    {spacing.gap.map((item) => (
                      <div
                        key={item.name}
                        className="rounded-2xl border border-rose-200 bg-white px-3 py-3 sm:px-4 sm:py-4"
                      >
                        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500 sm:text-xs sm:tracking-[0.2em]">
                          <span>{item.name}</span>
                          <span className="text-[11px] font-medium normal-case tracking-normal text-slate-500">
                            {item.value}
                          </span>
                        </div>
                        <div className={`mt-3 flex flex-wrap ${item.name}`}>
                          <div className="h-10 w-10 rounded-2xl bg-rose-600 sm:h-12 sm:w-12" />
                          <div className="h-10 w-10 rounded-2xl bg-orange-600 sm:h-12 sm:w-12" />
                          <div className="h-10 w-10 rounded-2xl bg-amber-600 sm:h-12 sm:w-12" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 sm:mt-8">
                <p className="text-sm font-semibold text-slate-700">
                  Layout patterns
                </p>
                <div className="mt-4 rounded-3xl border border-rose-200 bg-white p-4 shadow-xl sm:p-6">
                  <div className="space-y-6 sm:space-y-8">
                    <div>
                      <h4 className="mb-4 text-base font-bold text-slate-900 sm:text-lg">
                        Flexbox Layouts
                      </h4>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="rounded-xl border border-rose-200 p-3 sm:p-4">
                          <div className="mb-2 text-[10px] font-mono text-slate-500 sm:text-xs">
                            flex justify-between items-center
                          </div>
                          <div className="flex items-center justify-between rounded-lg bg-rose-50 p-2 sm:p-3">
                            <div className="h-6 w-12 rounded bg-rose-600 sm:h-8 sm:w-16" />
                            <div className="h-6 w-12 rounded bg-orange-600 sm:h-8 sm:w-16" />
                            <div className="h-6 w-12 rounded bg-amber-600 sm:h-8 sm:w-16" />
                          </div>
                        </div>
                        <div className="rounded-xl border border-rose-200 p-3 sm:p-4">
                          <div className="mb-2 text-[10px] font-mono text-slate-500 sm:text-xs">
                            flex flex-col gap-3
                          </div>
                          <div className="flex flex-col gap-3 rounded-lg bg-rose-50 p-2 sm:p-3">
                            <div className="h-5 w-full rounded bg-rose-600 sm:h-6" />
                            <div className="h-5 w-full rounded bg-orange-600 sm:h-6" />
                            <div className="h-5 w-full rounded bg-amber-600 sm:h-6" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-4 text-base font-bold text-slate-900 sm:text-lg">
                        Grid Layouts
                      </h4>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="rounded-xl border border-rose-200 p-3 sm:p-4">
                          <div className="mb-2 text-[10px] font-mono text-slate-500 sm:text-xs">
                            grid grid-cols-3 gap-4
                          </div>
                          <div className="grid grid-cols-3 gap-4 rounded-lg bg-rose-50 p-2 sm:p-3">
                            <div className="h-12 rounded bg-rose-600 sm:h-16" />
                            <div className="h-12 rounded bg-orange-600 sm:h-16" />
                            <div className="h-12 rounded bg-amber-600 sm:h-16" />
                          </div>
                        </div>
                        <div className="rounded-xl border border-rose-200 p-3 sm:p-4">
                          <div className="mb-2 text-[10px] font-mono text-slate-500 sm:text-xs">
                            grid grid-cols-2 gap-6
                          </div>
                          <div className="grid grid-cols-2 gap-6 rounded-lg bg-rose-50 p-2 sm:p-3">
                            <div className="h-16 rounded bg-rose-600 sm:h-20" />
                            <div className="h-16 rounded bg-orange-600 sm:h-20" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-4 text-base font-bold text-slate-900 sm:text-lg">
                        Container Widths
                      </h4>
                      <div className="space-y-3">
                        <div className="mx-auto max-w-md rounded-lg bg-rose-100 p-3 text-center">
                          <div className="text-xs font-mono text-slate-600">
                            max-w-md (28rem / 448px)
                          </div>
                        </div>
                        <div className="mx-auto max-w-2xl rounded-lg bg-orange-100 p-3 text-center">
                          <div className="text-xs font-mono text-slate-600">
                            max-w-2xl (42rem / 672px)
                          </div>
                        </div>
                        <div className="mx-auto max-w-4xl rounded-lg bg-amber-100 p-3 text-center">
                          <div className="text-xs font-mono text-slate-600">
                            max-w-4xl (56rem / 896px)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-rose-200 bg-white p-6 shadow-xl sm:p-8">
              <h3 className="text-xl font-bold text-slate-900">Typography</h3>
              <div className="mt-6 grid gap-4">
                {typography.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50/50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className={`text-slate-900 ${item.className}`}>
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500">{item.className}</p>
                    </div>
                    <span className="text-xs text-slate-500">{item.size}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-rose-200/80 bg-white/70 p-6 shadow-2xl backdrop-blur sm:p-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-rose-500">
              <SurfaceIcon />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-600">
                Surface
              </p>
              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                Border Radius &amp; Shadows
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Use a consistent rounding scale and shadow hierarchy to signal
                elevation.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-rose-200 bg-white p-6 shadow-xl sm:mt-8 sm:p-8">
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-bold text-slate-900">
                Border Radius
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {borderRadiusOptions.map((item) => (
                  <div key={item.token} className="text-center">
                    <div
                      className={`mb-3 flex h-24 items-center justify-center bg-gradient-to-r from-rose-600 to-orange-600 shadow-lg ${item.className}`}
                    >
                      <span className="font-bold text-white">{item.label}</span>
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      {item.token}
                    </div>
                    <div className="text-xs font-mono text-slate-500">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-bold text-slate-900">
                Box Shadow
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {boxShadowOptions.map((item) => (
                  <div key={item.token} className="text-center">
                    <div
                      className={`mb-3 flex h-24 items-center justify-center rounded-2xl border border-slate-200 bg-white ${item.className}`}
                    >
                      <span className="font-bold text-slate-900">
                        {item.label}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      {item.token}
                    </div>
                    <div className="text-xs text-slate-500">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-rose-200/80 bg-white/70 p-6 shadow-2xl backdrop-blur sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-600">
                Components
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                UI building blocks
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                These are the reusable patterns that should inherit the
                foundations above.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-3">
            <div className="rounded-3xl border border-rose-200 bg-white p-6 shadow-xl">
              <p className="text-sm font-semibold text-slate-700">Buttons</p>
              <div className="mt-4 grid gap-3">
                <button className="bg-gradient-to-r from-rose-600 to-orange-600 text-white py-3 px-6 font-bold rounded-2xl shadow-lg">
                  Primary button
                </button>
                <button className="rounded-xl border-2 border-slate-300 text-slate-700 py-3 px-6 font-semibold hover:border-slate-400 hover:bg-slate-50">
                  Secondary button
                </button>
                <button className="text-slate-500 hover:text-slate-700 underline text-sm text-left">
                  Text button
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-rose-200 bg-white p-6 shadow-xl">
              <p className="text-sm font-semibold text-slate-700">Cards</p>
              <div className="mt-4 grid gap-4">
                <div className="rounded-2xl border border-rose-200 p-5 shadow-lg">
                  <h3 className="text-lg font-semibold">Card title</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Card content goes here with some text.
                  </p>
                </div>
                <div className="rounded-3xl border border-rose-200 p-6 shadow-2xl">
                  <h3 className="text-lg font-semibold">Elevated card</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    This card has more padding and shadow.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-rose-200 bg-white p-6 shadow-xl">
              <p className="text-sm font-semibold text-slate-700">
                Form inputs
              </p>
              <div className="mt-4 grid gap-3">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Input field
                </label>
                <input
                  placeholder="Type something..."
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3.5 text-sm text-slate-700 transition-all focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
                />
                <input
                  disabled
                  placeholder="Disabled input"
                  className="w-full cursor-not-allowed rounded-xl border-2 border-slate-200 bg-slate-200 px-4 py-3.5 text-sm text-slate-500"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-rose-200/80 bg-white/70 p-6 shadow-2xl backdrop-blur sm:p-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-orange-500">
              <MotionIcon />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-600">
                Motion
              </p>
              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                Transitions &amp; Motion
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Keep motion deliberate and short, with clear affordances on
                hover and focus.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-rose-200 bg-white p-6 shadow-xl sm:mt-8 sm:p-8">
            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-bold text-slate-900">
                  Transition Duration
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {transitions.map((item) => (
                    <div key={item.label} className="text-center">
                      <div
                        className={`mb-3 flex h-20 items-center justify-center rounded-2xl bg-gradient-to-r from-rose-600 to-orange-600 ${item.swatchClassName}`}
                      >
                        <span className="font-bold text-white">
                          {item.label}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-slate-900">
                        {item.codeClassName}
                      </div>
                      <div className="text-xs font-mono text-slate-500">
                        {item.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-bold text-slate-900">
                  Common Transition Effects
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="cursor-pointer rounded-xl border border-rose-200 p-4 transition-shadow hover:shadow-lg">
                    <div className="mb-1 font-semibold text-slate-900">
                      Shadow Transition
                    </div>
                    <div className="text-xs font-mono text-slate-500">
                      transition-shadow
                    </div>
                  </div>
                  <div className="cursor-pointer rounded-xl border border-rose-200 p-4 transition-colors hover:bg-rose-50">
                    <div className="mb-1 font-semibold text-slate-900">
                      Color Transition
                    </div>
                    <div className="text-xs font-mono text-slate-500">
                      transition-colors
                    </div>
                  </div>
                  <div className="cursor-pointer rounded-xl border border-rose-200 p-4 transition-transform hover:scale-105">
                    <div className="mb-1 font-semibold text-slate-900">
                      Scale Transform
                    </div>
                    <div className="text-xs font-mono text-slate-500">
                      hover:scale-105
                    </div>
                  </div>
                  <div className="cursor-pointer rounded-xl border border-rose-200 p-4 transition-opacity hover:opacity-70">
                    <div className="mb-1 font-semibold text-slate-900">
                      Opacity Transition
                    </div>
                    <div className="text-xs font-mono text-slate-500">
                      hover:opacity-70
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-rose-200/80 bg-white/70 p-6 shadow-2xl backdrop-blur sm:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-600">
              Depth
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Opacity &amp; Layering
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Set clarity and hierarchy through opacity steps and z-index
              layering.
            </p>
          </div>

          <div className="mt-6 rounded-3xl border border-rose-200 bg-white p-6 shadow-xl sm:mt-8 sm:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-bold text-slate-900">
                  Opacity Scale
                </h3>
                <div className="space-y-3">
                  {opacityScale.map((item) => (
                    <div
                      key={item.label}
                      className={`relative flex h-12 items-center justify-center rounded-lg bg-rose-600 ${item.className}`}
                    >
                      <span className="font-semibold text-white">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-bold text-slate-900">
                  Z-Index Layers
                </h3>
                <div className="relative h-64 rounded-xl bg-slate-100 p-4">
                  <div className="absolute left-8 top-8 z-10 flex h-32 w-32 items-center justify-center rounded-xl bg-rose-600 shadow-lg">
                    <span className="font-bold text-white">z-10</span>
                  </div>
                  <div className="absolute left-12 top-12 z-20 flex h-32 w-32 items-center justify-center rounded-xl bg-orange-600 shadow-lg">
                    <span className="font-bold text-white">z-20</span>
                  </div>
                  <div className="absolute left-16 top-16 z-30 flex h-32 w-32 items-center justify-center rounded-xl bg-amber-600 shadow-lg">
                    <span className="font-bold text-white">z-30</span>
                  </div>
                  <div className="absolute left-20 top-20 z-50 flex h-32 w-32 items-center justify-center rounded-xl bg-rose-700 shadow-xl">
                    <span className="font-bold text-white">z-50</span>
                  </div>
                </div>
                <div className="mt-3 text-xs font-mono text-slate-500">
                  Base: z-10, Modal: z-50, Tooltip: z-50
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-rose-200/80 bg-white/70 p-6 shadow-2xl backdrop-blur sm:p-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500">
              <StatesIcon />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-600">
                States
              </p>
              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                Interactive States
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Consistent hover, focus, and disabled styles improve affordance
                and clarity.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-rose-200 bg-white p-6 shadow-xl sm:mt-8 sm:p-8">
            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-bold text-slate-900">
                  Hover States
                </h3>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                  <button className="bg-gradient-to-r from-rose-600 to-orange-600 text-white py-3 px-6 rounded-xl hover:shadow-xl transition-shadow">
                    Hover for Shadow
                  </button>
                  <button className="bg-gradient-to-r from-rose-600 to-orange-600 text-white py-3 px-6 rounded-xl hover:scale-105 transition-transform">
                    Hover to Scale
                  </button>
                  <button className="bg-gradient-to-r from-rose-600 to-orange-600 text-white py-3 px-6 rounded-xl hover:opacity-90 transition-opacity">
                    Hover for Opacity
                  </button>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-bold text-slate-900">
                  Focus States
                </h3>
                <div className="space-y-3 max-w-md">
                  <input
                    type="text"
                    placeholder="Focus to see ring"
                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all"
                  />
                  <div className="text-xs text-slate-500 font-mono">
                    focus:border-rose-500 focus:ring-4 focus:ring-rose-100
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-bold text-slate-900">
                  Disabled States
                </h3>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                  <button
                    disabled
                    className="bg-slate-300 text-slate-500 py-3 px-6 rounded-xl cursor-not-allowed"
                  >
                    Disabled Button
                  </button>
                  <input
                    type="text"
                    disabled
                    placeholder="Disabled input"
                    className="border-2 border-slate-200 bg-slate-100 text-slate-500 rounded-xl px-4 py-3 cursor-not-allowed"
                  />
                </div>
                <div className="mt-3 text-xs text-slate-500 font-mono">
                  bg-slate-300 text-slate-500 cursor-not-allowed
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-bold text-slate-900">
                  Cursor Types
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="border border-rose-200 rounded-xl p-4 cursor-pointer">
                    <div className="font-semibold text-slate-900">Pointer</div>
                    <div className="text-xs text-slate-500">cursor-pointer</div>
                  </div>
                  <div className="border border-rose-200 rounded-xl p-4 cursor-not-allowed opacity-60">
                    <div className="font-semibold text-slate-900">
                      Not Allowed
                    </div>
                    <div className="text-xs text-slate-500">
                      cursor-not-allowed
                    </div>
                  </div>
                  <div className="border border-rose-200 rounded-xl p-4 cursor-default">
                    <div className="font-semibold text-slate-900">Default</div>
                    <div className="text-xs text-slate-500">cursor-default</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-rose-200/80 bg-white/70 p-6 shadow-2xl backdrop-blur sm:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-600">
              Annotations
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Annotation Styles
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Styles used for UX Hell callouts and teaching moments.
            </p>
          </div>

          <div className="mt-6 rounded-3xl border border-rose-200 bg-white p-6 shadow-xl sm:mt-8 sm:p-8">
            <div className="relative">
              <button className="bg-gradient-to-r from-rose-600 to-orange-600 text-white py-4 px-8 rounded-2xl shadow-lg">
                Example Button
              </button>

              <div className="mt-6 w-full max-w-xs translate-x-0 sm:absolute sm:right-0 sm:top-0 sm:ml-4 sm:translate-x-full">
                <div className="rounded-xl border-2 border-rose-300 bg-rose-100 p-4 shadow-xl">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-600 font-bold text-white">
                      !
                    </div>
                    <div>
                      <div className="mb-1 font-bold text-rose-900">
                        Bad UX Pattern
                      </div>
                      <div className="text-sm text-rose-800">
                        This is an example of an annotation explaining what
                        makes this element a bad UX pattern.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -left-2 top-6 hidden h-4 w-4 -rotate-45 transform bg-rose-100 border-b-2 border-l-2 border-rose-300 sm:block" />
              </div>

              <div className="mt-24 text-xs font-mono text-slate-500">
                bg-rose-100 border-2 border-rose-300 rounded-xl p-4 shadow-xl
                <br />
                Icon: w-6 h-6 bg-rose-600 text-white rounded-full
                <br />
                Arrow: w-4 h-4 transform -rotate-45
              </div>
            </div>
          </div>
        </section>

        <UiComponentDemo />
      </div>
    </div>
  );
}
