import AccountVerificationMenu from "./account-verification-menu";
import CheckboxHellMenu from "./checkbox-hell-menu";
import CursedVolumeSliderMenu from "./cursed-volume-slider-menu";
import NameInputCarouselMenu from "./name-input-carousel-menu";

type ChallengesProps = {
  onAttemptRecorded?: () => void;
};

export default function Challenges({ onAttemptRecorded }: ChallengesProps) {
  return (
    <section className="rounded-[2rem] border border-rose-200 bg-gradient-to-br from-white via-rose-50/40 to-orange-50/30 p-4 shadow-xl shadow-rose-100/50 sm:p-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-600">
          Challenges
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-800">
          Choose your next test
        </h2>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <CheckboxHellMenu onAttemptRecorded={onAttemptRecorded} />
        <AccountVerificationMenu onAttemptRecorded={onAttemptRecorded} />
        <CursedVolumeSliderMenu />
        <NameInputCarouselMenu />
      </div>
    </section>
  );
}
