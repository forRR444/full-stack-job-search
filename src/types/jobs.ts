import type { Category } from "./job";
/* ========= ダミーデータ ========= */
export const categories: Category[] = [
  "事務",
  "エンジニア",
  "営業",
  "デザイン",
  "マーケティング",
  "財務・経理",
  "人事",
  "カスタマーサポート",
  "製造",
  "医療・介護",
];
/* ========= 年収 =========*/
export const salarySteps = Array.from({ length: 10 }, (_, i) => (i + 1) * 100);
