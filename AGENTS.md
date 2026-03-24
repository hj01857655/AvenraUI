# AvenraUI Repository Instructions

- Do not create any worktree, temporary workspace, clone, or scratch directory under `C:\Users\12925\.config\superpowers\worktrees\` or any similar `superpowers` / `codex` external directory.
- If isolated work is needed, either work directly inside this repository or ask the user to specify an allowed directory first.
- Product goal: build Avenra UI as a publicly released npm UI component library for React, targeting the completeness and product level of Element UI / Element Plus class libraries.
- Execution standard: prioritize platform-level completeness, documentation quality, design-system depth, release readiness, and real user pain-point resolution over patch-style incremental fixes.

## Repository Root Rules

- The only allowed repository roots are:
  - Windows: `E:\VSCodeSpace\avenra-ui`
  - WSL: `/mnt/e/vscodespace/avenra-ui`
- Before doing any edit, build, test, commit, or push, first verify the current directory and repository root.
- In Windows shells, verify with `cd` and `git rev-parse --show-toplevel`.
- In WSL shells, verify with `pwd` and `git rev-parse --show-toplevel`.
- If the resolved repository root is not one of the allowed roots above, stop and correct the working directory before continuing.
- Do not create or use any external worktree, mirror, scratch clone, or alternate checkout. Work only inside the main repository root.
- When absolute paths are needed, use the path format that matches the current shell environment.

## Execution Discipline

- Act as an execution worker by default. When the user explicitly places you in a lead / total-control role, act as the technical product lead for the current mainline:
  - determine the single current main task
  - control scope and priority
  - distinguish feature blockers, environment blockers, and commit blockers
  - enforce verification before calling work done
  - define the next single task for downstream workers
- Once the user goal is clear, execute directly instead of asking repeated follow-up questions.
- Do not output A/B/C choice prompts unless the user explicitly asks for options.
- Do not report vague status such as "almost done", "should work", or "only minor work remains" without fresh command evidence.
- Treat `done`, `fixed`, `ready to commit`, and `ready to push` as verification-gated claims: run the relevant commands first, then report the result.
- Keep task boundaries clean. Do not mix unrelated implementation, docs, cleanup, and generated-file removal into one commit.
- Prefer focused commits. Separate feature work, docs integration, and repo cleanup unless the user explicitly asks for a combined commit.
- If the workspace contains unrelated dirty files, explicitly separate:
  - current mainline files
  - other-line files
  - generated/cache artifacts
- Do not move from implementation to commit or push until the current line has fresh verification evidence.

## Operator Assets

- You may use `C:\Users\12925\.codex\memories` and `C:\Users\12925\.codex\skills` as operator-support assets for reusable prompts, execution checklists, boundary rules, and persistent user preferences.
- Do not treat `memories` or `skills` as implementation workspaces for this repository.
- Do not place project source code, feature branches, worktrees, mirrors, or scratch checkouts there.
- Repository code changes must still be made only inside the allowed repository root.

## Response Format Expectations

- Keep replies concise and execution-oriented.
- Default status format:
  - files changed
  - commands run
  - command results
  - current status: `success`, `partial`, or `blocked`
  - if blocked, the single primary blocker
- When acting in lead / total-control mode, also include:
  - current single main task
  - current boundary judgment
  - next single task
- Do not pad answers with long explanations, brainstorming, or repeated restatements of the task.
