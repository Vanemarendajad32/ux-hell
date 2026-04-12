import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TARGET_NAME } from "./constants";

type IntroStageProps = {
  onStart: () => void;
};

export default function IntroStage({ onStart }: IntroStageProps) {
  return (
    <div className="space-y-5">
      <DialogHeader>
        <DialogTitle>Name Input Carousel</DialogTitle>
        <DialogDescription>
          Enter the exact target name{" "}
          <span className="font-semibold">{TARGET_NAME}</span>. Direct typing is
          disabled because the text field has been replaced with a character
          carousel.
        </DialogDescription>
      </DialogHeader>

      <div className="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-900">
        Choose one letter at a time, save it to move forward, and use Back if
        you need to fix an earlier slot.
      </div>

      <Button onClick={onStart} type="button">
        Start the game
      </Button>
    </div>
  );
}
