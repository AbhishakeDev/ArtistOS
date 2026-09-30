# Raspberry Pi 4 Setup Guide

> Tested on: Raspberry Pi 4 (4GB RAM) — Raspberry Pi OS Full 64-bit (Bookworm) — 32GB SD card

---

## Prerequisites

- Raspberry Pi 4 (4GB recommended)
- Raspberry Pi OS Full 64-bit (Bookworm) installed and booted
- Internet connection
- Your API credentials ready (see `.env.example`)

---

## Step 1 — Open Terminal

Click the terminal icon on the taskbar or press `Ctrl + Alt + T`

---

## Step 2 — Update the system

```bash
sudo apt update && sudo apt upgrade -y
```

Takes 5–10 minutes on first run.

---

## Step 3 — Install Git

```bash
sudo apt install git -y
```

---

## Step 4 — Install Node.js 18

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

Close the terminal and reopen it, then:

```bash
nvm install 18
nvm use 18
node --version  # should say v18.x.x
```

---

## Step 5 — Install Python dependencies

```bash
sudo apt install python3-pip python3-full -y
pip3 install fastapi "uvicorn[standard]" sqlalchemy psycopg2-binary alembic python-dotenv httpx aiohttp pydantic pydantic-settings openai requests tenacity sqlalchemy-utils python-multipart --break-system-packages
```

---

## Step 6 — Install Docker

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```

**Log out and log back in** after this so the group change takes effect.

---

## Step 7 — Clone the repo

```bash
cd ~
git clone https://github.com/AbhishakeDev/ArtistOS.git
cd ArtistOS
```

---

## Step 8 — Create your .env file

```bash
cp .env.example .env
nano .env
```

Fill in your credentials:

```
SPOTIFY_CLIENT_ID=your_value
SPOTIFY_CLIENT_SECRET=your_value
SPOTIFY_ARTIST_ID=your_value
INSTAGRAM_ACCESS_TOKEN=your_value
META_BUSINESS_ACCOUNT_ID=your_value
```

Press `Ctrl + X` → `Y` → `Enter` to save.

---

## Step 9 — Start the database

```bash
docker-compose up -d
```

Verify it's running:

```bash
docker ps
```

You should see a postgres container listed.

---

## Step 10 — Start the backend

Open a **new terminal tab** (`Ctrl + Shift + T`):

```bash
cd ~/ArtistOS/backend
python3 -m uvicorn app.main:app --reload --port 8000
```

You should see:

```
INFO: Uvicorn running on http://0.0.0.0:8000
```

---

## Step 11 — Install frontend dependencies

Open another **new terminal tab**:

```bash
cd ~/ArtistOS/frontend
npm install
```

Takes a few minutes on the Pi the first time.

---

## Step 12 — Start the frontend

```bash
npm run dev
```

Wait for it to say:

```
✓ Ready on http://localhost:3000
```

---

## Step 13 — Open the app

Open **Chromium** and go to:

```
http://localhost:3000
```

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `docker: command not found` | Log out and back in after Step 6 |
| `nvm: command not found` | Close and reopen terminal after Step 4 |
| `npm install` very slow | Normal on Pi — give it 5 minutes |
| Backend error about missing module | Re-run the `pip3 install` command from Step 5 |
| Port 3000 already in use | `kill $(lsof -t -i:3000)` then retry |
| PostgreSQL connection refused | Make sure Docker is running: `docker ps` |

---

## Performance Tips

- **Use a USB 3.0 SSD** for the database instead of the SD card — point `db_data/` in `docker-compose.yml` to the SSD path for much better speed and SD card longevity
- **Use production mode** for the frontend once you're done developing — faster startup, half the RAM:
  ```bash
  cd ~/ArtistOS/frontend
  npm run build
  npm start
  ```
- The Pi 4 4GB handles this stack comfortably — expect ~1–1.3GB RAM usage with everything running

---

## Accessing from other devices on your network

If you want to open ArtistOS from your phone or laptop on the same WiFi:

1. Find your Pi's local IP:
   ```bash
   hostname -I
   ```
2. Open `http://YOUR_PI_IP:3000` on any device on the same network
