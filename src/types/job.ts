/* ========= 型定義 ========= */
export type Category =
  | "事務"
  | "エンジニア"
  | "営業"
  | "デザイン"
  | "マーケティング"
  | "財務・経理"
  | "人事"
  | "カスタマーサポート"
  | "製造"
  | "医療・介護";

export type Job = {
  id: number;
  title: string;
  category: Category;
  salary: number; // salary: 万円
};
