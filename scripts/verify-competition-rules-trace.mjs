#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

function read(root, file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function section(markdown, heading, nextHeading) {
  const after = markdown.split(heading)[1] || "";
  return nextHeading ? after.split(nextHeading)[0] || "" : after;
}

function tableRows(markdownSection) {
  return markdownSection
    .split("\n")
    .filter((line) => line.startsWith("| "))
    .filter((line) => !line.includes("---"))
    .filter((line) => !line.includes("Week 5 requirement"))
    .filter((line) => !line.includes("Judging question"));
}

function bullets(markdownSection) {
  return markdownSection.split("\n").filter((line) => line.startsWith("- "));
}

export function verifyCompetitionRulesTrace(root = process.cwd()) {
  const file = path.join(root, "COMPETITION_RULES_TRACE.md");
  const failures = [];

  if (!fs.existsSync(file)) {
    return {
      checked: false,
      briefRequirementRows: 0,
      judgingQuestionRows: 0,
      aboveBriefProofBullets: 0,
      blockerBullets: 0,
      failures: ["Missing COMPETITION_RULES_TRACE.md."],
    };
  }

  const markdown = read(root, "COMPETITION_RULES_TRACE.md");
  const briefRequirementRows = tableRows(section(markdown, "## Brief Requirements", "## Judging Questions")).length;
  const judgingQuestionRows = tableRows(section(markdown, "## Judging Questions", "## Above-The-Brief Proof")).length;
  const aboveBriefProofBullets = bullets(section(markdown, "## Above-The-Brief Proof", "## Current Blockers")).length;
  const blockerBullets = bullets(section(markdown, "## Current Blockers")).length;

  const requiredText = [
    "This file maps the Week 5 brief to the exact artifact that satisfies each rule or judging question.",
    "Build a folder-based AI coach",
    "Pick a specific domain",
    "Make it portable into a Claude Project",
    "Coach, not knowledge base",
    "Submit a public GitHub repo link",
    "Include 2-3 sentences describing who the coach is and who it coaches",
    "Respect Premium/VIP eligibility",
    "Does it actually coach?",
    "Is the domain specific enough?",
    "Is the methodology clean and useful?",
    "Does the README make it easy for someone else to use?",
    "ICM_TRACE.md",
    "JUDGE_SCORECARD.md",
    "JUDGE_FAQ.md",
    "PITCH_REEL.md",
    "landing/reel.html",
    "scripts/verify-competition-rules-trace.mjs",
    "scripts/verify-publication-ready.mjs",
    "Intentionally blocked until final approval and clean public Week 5 repo URL insertion.",
  ];

  for (const text of requiredText) {
    if (!markdown.includes(text)) {
      failures.push(`COMPETITION_RULES_TRACE.md is missing required text: ${text}`);
    }
  }

  if (briefRequirementRows !== 12) {
    failures.push(`Expected 12 brief requirement rows, found ${briefRequirementRows}.`);
  }

  if (judgingQuestionRows !== 4) {
    failures.push(`Expected 4 judging question rows, found ${judgingQuestionRows}.`);
  }

  if (aboveBriefProofBullets < 13) {
    failures.push(`Expected at least 13 above-the-brief proof bullets, found ${aboveBriefProofBullets}.`);
  }

  if (blockerBullets !== 5) {
    failures.push(`Expected 5 current blocker bullets, found ${blockerBullets}.`);
  }

  const forbiddenText = [
    ["PRIVATE", "_"].join(""),
    [".cloak", "browser"].join(""),
    [".o", "mx"].join(""),
    ["docs", "plans"].join("/"),
    ["out", "put"].join("") + "/",
    ["/", "Users", "/"].join(""),
    ["Si", "mon"].join(""),
  ];

  for (const text of forbiddenText) {
    if (markdown.includes(text)) {
      failures.push(`COMPETITION_RULES_TRACE.md contains public-unsafe local/private text: ${text}`);
    }
  }

  return {
    checked: true,
    briefRequirementRows,
    judgingQuestionRows,
    aboveBriefProofBullets,
    blockerBullets,
    failures,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const summary = verifyCompetitionRulesTrace();
  console.log(JSON.stringify(summary, null, 2));
  if (summary.failures.length > 0) {
    process.exitCode = 1;
  }
}
