"use client";

type Props = {
  options: number[];
  value: number;
  onChange: (next: number) => void;
};

export function SalarySelect({ options, value, onChange }: Props) {
  return (
    <select
      className="w-full rounded-md border border-slate-300 bg-white p-2 text-sm"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {options.map((v) => (
        <option key={v} value={v}>
          {v === 1000 ? "1000万円以上" : `${v}万円以上`}
        </option>
      ))}
    </select>
  );
}
