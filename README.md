# Pixelmon Quest (2D Browser Game)

A lightweight Pokémon-inspired 2D adventure game you can run **directly on the web via GitHub Pages**.

## Play online (no local install)

After you push this repo to GitHub and enable Pages, play here:

```text
https://<your-username>.github.io/<repo-name>/
```

## Publish to GitHub Pages (recommended)

This repo already includes `.github/workflows/deploy-pages.yml`, so deployment is automatic.

1. Push this repository to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Source: GitHub Actions**.
4. Push to `main` (or run the workflow manually from **Actions**).
5. Open the Pages URL:

```text
https://<your-username>.github.io/<repo-name>/
```


## If you see a GitHub Pages 404

Use this checklist:

1. Confirm game files are in the branch you pushed (`index.html`, `game.js`, `style.css`).
2. In **Settings → Pages**, set **Source: GitHub Actions**.
3. In **Actions**, open the latest "Deploy static game to GitHub Pages" run and verify it passed.
4. Wait ~1-2 minutes after a successful deploy, then hard refresh the URL.

This workflow deploys on pushes to `main` **and** `work`, so either branch can publish the site.

## Features

- 3 connected maps:
  - **Leafroot Town**
  - **Misty Route**
  - **Spark City Gym**
- Story NPCs with designed dialog:
  - Professor Pine
  - Scout Aria
  - Ember Grunt
  - Nurse Clover
  - Leader Volt
- Mission system with progression:
  1. Recover notes from Team Ember.
  2. Return notes to the Professor.
  3. Defeat the gym leader for the Thunder Badge.
- Turn-based battle simulation with HP and attack stats.
- HUD for story state, active mission, mission log, and dialog.

## How to play

### Goal
Become the island's top trainer by completing three main missions:

1. Recover Professor Pine's stolen notes.
2. Return notes to Professor Pine.
3. Defeat Leader Volt to earn the Thunder Badge.

### Controls

- Move: `WASD` or Arrow keys
- Interact with NPCs: `E`
- Continue dialog / trigger battles: `Enter`

### Quick mission walkthrough

1. Start in **Leafroot Town** and walk to **Professor Pine**. Press `E` to talk.
2. Go east through the route portal to **Misty Route**.
3. Talk to **Scout Aria**, then find **Ember Grunt** and press `Enter` to battle.
4. After winning, return to **Professor Pine** in Leafroot Town.
5. Head to **Spark City Gym** and battle **Leader Volt**.
6. Win the final fight to complete the main story arc.

### Gameplay tips

- If you lose a battle, you respawn in Leafroot Town with full HP.
- Your active objective appears in the **Active Mission** panel.
- Completed missions are crossed out in the **Mission Log**.

## Optional local run

If you still want local testing:

```bash
npm start
```

Then open:

```text
http://127.0.0.1:8000
```
