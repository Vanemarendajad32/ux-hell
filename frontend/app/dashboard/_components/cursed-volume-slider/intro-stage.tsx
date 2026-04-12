import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TARGET_VOLUME } from "./constants";

type IntroStageProps = {
  onStart: () => void;
};

export default function IntroStage({ onStart }: IntroStageProps) {
  return (
    <div className="space-y-5">
      <DialogHeader>
        <DialogTitle>Cursed Volume Slider</DialogTitle>
        <DialogDescription>
          Set the volume to exactly{" "}
          <span className="font-semibold">{TARGET_VOLUME}%</span>. The slider
          follows your drag, then betrays you when you let go.
        </DialogDescription>
      </DialogHeader>

      <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
        Watch where the slider settles after release, learn the pattern, then
        aim around the curse.
      </div>

      <Button onClick={onStart} type="button">
        Start the game
      </Button>
    </div>
  );
}
