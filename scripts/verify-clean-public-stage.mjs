#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { publicBundleFiles } from "./public-bundle-files.mjs";

const root = process.cwd();

function runNode(args, options = {}) {
  const result = spawnSync(process.execPath, args, {
    cwd: options.cwd || root,
    encoding: "utf8",
  });

  if (result.status !== 0) {
    throw new Error(
      `${process.execPath} ${args.join(" ")} failed with exit ${result.status ?? 1}.\n${result.stderr || result.stdout}`,
    );
  }

  return result;
}

function countFiles(dir) {
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".DS_Store") continue;
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += countFiles(absolute);
    } else {
      count += 1;
    }
  }
  return count;
}

function assertOutsideRoot(target) {
  const relative = path.relative(root, target);
  if (!relative || (!relative.startsWith("..") && !path.isAbsolute(relative))) {
    throw new Error("Clean-stage target must be outside this working folder.");
  }
}

export function verifyCleanPublicStage() {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "startline-clean-public-stage-"));
  const target = path.join(tempRoot, "startline-coach");
  let targetRemoved = false;

  try {
    assertOutsideRoot(target);

    runNode(["scripts/stage-public-repo.mjs", "--target", target, "--write"]);
    const verification = runNode(["scripts/verify-public-bundle.mjs"], { cwd: target });
    const verificationSummary = JSON.parse(verification.stdout.trim());
    const stagedFileCount = countFiles(target);

    const failures = [];
    if (verificationSummary.failures?.length) {
      failures.push(...verificationSummary.failures);
    }
    if (verificationSummary.requiredFiles !== publicBundleFiles.length) {
      failures.push(
        `Expected ${publicBundleFiles.length} required files, verifier saw ${verificationSummary.requiredFiles}.`,
      );
    }
    if (stagedFileCount < publicBundleFiles.length) {
      failures.push(`Expected at least ${publicBundleFiles.length} staged files, found ${stagedFileCount}.`);
    }
    if (fs.existsSync(path.join(target, "output"))) {
      failures.push("Clean-stage target contains generated output directory.");
    }

    return {
      status: failures.length === 0 ? "pass" : "fail",
      checked: true,
      stagedFiles: stagedFileCount,
      requiredFiles: publicBundleFiles.length,
      targetOutsideRoot: true,
      targetRemoved,
      publicBundleWarnings: verificationSummary.warnings || [],
      failures,
      cleanup: () => {
        fs.rmSync(tempRoot, { recursive: true, force: true });
        targetRemoved = !fs.existsSync(tempRoot);
      },
    };
  } catch (error) {
    fs.rmSync(tempRoot, { recursive: true, force: true });
    throw error;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const summary = verifyCleanPublicStage();
    summary.cleanup();
    const printable = {
      ...summary,
      targetRemoved: true,
    };
    delete printable.cleanup;
    console.log(JSON.stringify(printable, null, 2));
    if (printable.failures.length > 0) {
      process.exitCode = 1;
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
