import type { CheckboxOption } from "./types";

export function formatMs(ms: number | null): string {
  if (ms === null) {
    return "0.00";
  }

  return (ms / 1000).toFixed(2);
}

export function isSolved(options: CheckboxOption[]): boolean {
  const checkedOptions = options.filter((option) => option.checked);
  const checkedCorrectOptions = checkedOptions.filter(
    (option) => option.isCorrect,
  );

  return checkedOptions.length === 1 && checkedCorrectOptions.length === 1;
}

export function resetCheckboxStates(
  options: CheckboxOption[],
): CheckboxOption[] {
  return options.map((option) => ({
    ...option,
    checked: false,
    visualChecked: false,
  }));
}
