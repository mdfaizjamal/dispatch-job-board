"use client";

import { useCallback, useEffect, useState } from "react";
import { seedJobs } from "./jobsData";

const JOBS_KEY = "dispatch.jobs.v1";
const SAVED_KEY = "dispatch.saved.v1";

function readJobs() {
  if (typeof window === "undefined") return seedJobs;
  try {
    const raw = window.localStorage.getItem(JOBS_KEY);
    if (!raw) return seedJobs;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : seedJobs;
  } catch {
    return seedJobs;
  }
}

function readSaved() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SAVED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function nextId(jobs) {
  const nums = jobs
    .map((j) => parseInt(String(j.id).replace(/\D/g, ""), 10))
    .filter((n) => !Number.isNaN(n));
  const max = nums.length ? Math.max(...nums) : 1041;
  return `REQ-${max + 1}`;
}

export function useJobs() {
  const [jobs, setJobs] = useState(seedJobs);
  const [savedIds, setSavedIds] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setJobs(readJobs());
    setSavedIds(readSaved());
    setReady(true);
  }, []);

  const persistJobs = useCallback((next) => {
    setJobs(next);
    window.localStorage.setItem(JOBS_KEY, JSON.stringify(next));
  }, []);

  const persistSaved = useCallback((next) => {
    setSavedIds(next);
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(next));
  }, []);

  const addJob = useCallback(
    (job) => {
      const current = readJobs();
      const id = nextId(current);
      const record = {
        id,
        posted: new Date().toISOString().slice(0, 10),
        ...job,
      };
      const next = [record, ...current];
      persistJobs(next);
      return record;
    },
    [persistJobs]
  );

  const toggleSaved = useCallback(
    (id) => {
      const current = readSaved();
      const next = current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id];
      persistSaved(next);
    },
    [persistSaved]
  );

  const isSaved = useCallback((id) => savedIds.includes(id), [savedIds]);

  return { jobs, savedIds, ready, addJob, toggleSaved, isSaved };
}
