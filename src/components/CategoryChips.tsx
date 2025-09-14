"use client";

import type { Category } from "@/types/job";

type Props = {
  all: Category[];
  value: Category[];
  onChange: (next: Category[]) => void;
};

export function CategoryChips({ all, value, onChange }: Props) {
  const toggle = (c: Category) => {
    const set = new Set(value);
    set.has(c) ? set.delete(c) : set.add(c);
    onChange(Array.from(set));
  };

  return (
    <ul className="space-y-2">
      {all.map((c) => (
        <li key={c} className="flex items-center gap-2">
          <input
            id={`cat-${c}`}
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300"
            checked={value.includes(c)}
            onChange={() => toggle(c)}
          />
          <label htmlFor={`cat-${c}`} className="text-sm">
            {c}
          </label>
        </li>
      ))}
    </ul>
  );
}
