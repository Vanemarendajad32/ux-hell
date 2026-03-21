import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(225,29,72,0.12),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(234,88,12,0.15),_transparent_50%),linear-gradient(180deg,_#fff7ed_0%,_#fff1f2_45%,_#ffffff_100%)] text-slate-900">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-20">
        <section className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-rose-600">
            ux-hell
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            UI components demo
          </h1>
          <p className="max-w-2xl text-base text-slate-600">
            Below are usage examples for the Button, Card, Dialog, and Input
            components.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border border-rose-200 bg-white/80 shadow-2xl backdrop-blur">
            <CardHeader className="border-b border-rose-200">
              <CardTitle>Button variants</CardTitle>
              <CardDescription>
                Use different states and sizes to create a clear hierarchy.
              </CardDescription>
              <CardAction>
                <Button variant="outline" size="sm">
                  Quick action
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </CardContent>
            <CardFooter className="justify-between">
              <div className="text-sm text-muted-foreground">Size options</div>
              <div className="flex gap-2">
                <Button size="xs" variant="outline">
                  XS
                </Button>
                <Button size="sm" variant="outline">
                  SM
                </Button>
                <Button size="lg" variant="outline">
                  LG
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card
            size="sm"
            className="justify-between border border-rose-200 bg-white/80 shadow-2xl backdrop-blur"
          >
            <CardHeader>
              <CardTitle>Dialog demo</CardTitle>
              <CardDescription>
                Radix dialog with our own style.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <p className="text-sm text-slate-600">
                Opens a default modal with text and CTA buttons.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Is the project ready?</DialogTitle>
                    <DialogDescription>
                      Confirm that you want to move on from the demo screen. You
                      can always change this later.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Tip: Use the dialog for short, important decisions.
              </div>
            </CardFooter>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="border border-rose-200 bg-white/80 shadow-2xl backdrop-blur">
            <CardHeader className="border-b border-rose-200">
              <CardTitle>Input examples</CardTitle>
              <CardDescription>New form, clean and clear.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="name">
                  Name
                </label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <Input id="email" type="email" placeholder="nimi@firma.ee" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="project">
                  Project
                </label>
                <Input id="project" placeholder="UX Hell 2.0" />
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button size="sm">Save</Button>
            </CardFooter>
          </Card>

          <Card className="border border-rose-200 bg-white/80 shadow-2xl backdrop-blur">
            <CardHeader>
              <CardTitle>Card example</CardTitle>
              <CardDescription>
                Inner layout, gradient instead of an image block.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="h-32 rounded-lg bg-[linear-gradient(135deg,_rgba(225,29,72,0.22),_rgba(234,88,12,0.25),_rgba(245,158,11,0.2))]" />
              <div className="grid gap-1">
                <p className="text-sm font-medium">Project status</p>
                <p className="text-sm text-slate-600">
                  4 tasks, 2 approved, 1 needs a decision.
                </p>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <div className="text-xs text-muted-foreground">
                Last update: 2 hours ago
              </div>
              <Button variant="outline" size="sm">
                Refresh
              </Button>
            </CardFooter>
          </Card>
        </section>
      </main>
    </div>
  );
}
