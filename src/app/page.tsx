"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  async function addJob() {
    await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "エンジニア",
        category: "IT",
        salary: 500,
      }),
    });
    const updated = await fetch("/api/jobs").then((res) => res.json());
    setJobs(updated);
  }

  return (
    <div>
      <h1>求人一覧</h1>
      <button onClick={addJob}>求人を追加</button>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            {job.title} - {job.category} - {job.salary}
          </li>
        ))}
      </ul>
    </div>
  );
}
