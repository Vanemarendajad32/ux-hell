import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type IntroStageProps = {
  onStart: () => void;
};

export default function IntroStage({ onStart }: IntroStageProps) {
  return (
    <div className="space-y-5">
      <DialogHeader>
        <DialogTitle>Checkbox Hell</DialogTitle>
        <DialogDescription>
          Classic &quot;I am not a robot&quot; challenge, but meaner. Press
          start to begin a tracked session.
        </DialogDescription>
      </DialogHeader>

      <Button onClick={onStart} type="button">
        Start the game
      </Button>
    </div>
  );
}
