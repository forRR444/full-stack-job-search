import type { Category, Job } from "./job";
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

/* ========= 求人データ =========*/
export const JOBS: Job[] = [
  {
    id: 1,
    title: "経験者歓迎！大手企業でのWebエンジニア募集",
    category: "エンジニア",
    salary: 600,
  },
  {
    id: 2,
    title: "未経験OK！営業アシスタント急募",
    category: "営業",
    salary: 350,
  },
  {
    id: 3,
    title: "グローバル企業でのマーケティングマネージャー",
    category: "マーケティング",
    salary: 800,
  },
  {
    id: 4,
    title: "UI/UXデザイナー募集！急成長中のスタートアップ",
    category: "デザイン",
    salary: 550,
  },
  {
    id: 5,
    title: "大手製造業での生産管理スペシャリスト",
    category: "事務",
    salary: 650,
  },
  {
    id: 6,
    title: "急成長ベンチャーでの経理マネージャー募集",
    category: "財務・経理",
    salary: 700,
  },
  {
    id: 7,
    title: "大手IT企業での人事担当者募集",
    category: "人事",
    salary: 500,
  },
  {
    id: 8,
    title: "外資系企業でのカスタマーサポート担当募集",
    category: "カスタマーサポート",
    salary: 400,
  },
  {
    id: 9,
    title: "看護師募集！大学病院での勤務",
    category: "医療・介護",
    salary: 550,
  },
  {
    id: 10,
    title: "一般事務スタッフ募集！週3日からOK",
    category: "事務",
    salary: 300,
  },
  {
    id: 11,
    title: "Reactエンジニア（在宅可）",
    category: "エンジニア",
    salary: 750,
  },
  { id: 12, title: "デザイナー（正社員）", category: "デザイン", salary: 520 },
  { id: 13, title: "人事のお仕事1", category: "人事", salary: 620 },
  {
    id: 14,
    title: "カスタマーサポートのお仕事",
    category: "カスタマーサポート",
    salary: 480,
  },
  {
    id: 15,
    title: "マーケター募集(未経験者の方もご応募いただけます)",
    category: "マーケティング",
    salary: 680,
  },
];
