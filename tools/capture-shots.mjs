/**
 * Génère les captures pleine hauteur affichées dans les maquettes desktop et
 * mobile de la page Projets.
 *
 * Pilote un Chrome en mode headless via le protocole DevTools et enregistre
 * directement en WebP, sans dépendance npm supplémentaire.
 *
 * Usage : node tools/capture-shots.mjs [slug...]
 */
import { spawn } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
];

const OUTPUT_DIR = join(process.cwd(), 'src', 'assets', 'images', 'projects', 'shots');
const PORT = 9333;

const TARGETS = [
  { slug: 'life-rise', url: 'https://life-rise.web.app/' },
  { slug: 'gametime', url: 'https://brice150.github.io/GAMETIME/' },
  { slug: 'simulator', url: 'https://brice150.github.io/Simulator/' },
  { slug: 'portfolio', url: 'http://localhost:4200/' },
];

const VIEWPORTS = {
  desktop: { width: 1280, height: 800, mobile: false, scale: 1 },
  mobile: { width: 390, height: 844, mobile: true, scale: 2 },
};

/** Hauteur maximale capturée, pour éviter des images démesurées. */
const MAX_HEIGHT = { desktop: 3400, mobile: 2600 };

const chromePath = CHROME_CANDIDATES.find((candidate) => existsSync(candidate));

if (!chromePath) {
  console.error('Chrome introuvable. Renseignez son chemin dans CHROME_CANDIDATES.');
  process.exit(1);
}

const requested = process.argv.slice(2);
const targets = requested.length
  ? TARGETS.filter((target) => requested.includes(target.slug))
  : TARGETS;

await mkdir(OUTPUT_DIR, { recursive: true });

const profileDir = join(process.cwd(), '.chrome-capture-profile');
await rm(profileDir, { recursive: true, force: true });

const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--no-first-run',
  '--no-default-browser-check',
  '--force-color-profile=srgb',
  `--user-data-dir=${profileDir}`,
  `--remote-debugging-port=${PORT}`,
  'about:blank',
]);

chrome.stderr.on('data', () => {});

const cleanup = async () => {
  chrome.kill();
  await delay(300);
  await rm(profileDir, { recursive: true, force: true }).catch(() => {});
};

try {
  const browserWsUrl = await waitForDevTools();

  for (const target of targets) {
    for (const [variant, viewport] of Object.entries(VIEWPORTS)) {
      const file = join(OUTPUT_DIR, `${target.slug}-${variant}.webp`);
      process.stdout.write(`→ ${target.slug} (${variant}) … `);

      try {
        const data = await capture(browserWsUrl, target.url, viewport, MAX_HEIGHT[variant]);
        await writeFile(file, Buffer.from(data, 'base64'));
        console.log('ok');
      } catch (error) {
        console.log(`échec : ${error.message}`);
      }
    }
  }
} finally {
  await cleanup();
}

async function waitForDevTools() {
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const response = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      const json = await response.json();
      return json.webSocketDebuggerUrl;
    } catch {
      await delay(250);
    }
  }

  throw new Error('Chrome n’a pas ouvert son port de débogage.');
}

async function capture(browserWsUrl, url, viewport, maxHeight) {
  const browser = await connect(browserWsUrl);
  const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });

  try {
    const { sessionId } = await browser.send('Target.attachToTarget', {
      targetId,
      flatten: true,
    });
    const page = browser.session(sessionId);

    await page.send('Page.enable');
    await page.send('Emulation.setDeviceMetricsOverride', {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: viewport.scale,
      mobile: viewport.mobile,
    });

    const loaded = page.once('Page.loadEventFired');
    await page.send('Page.navigate', { url });
    await Promise.race([loaded, delay(20000)]);

    // Laisse le temps aux polices, images et animations d'entrée de se poser.
    await delay(3500);

    // Les éléments en position fixe se placent mal dans une capture qui déborde
    // du viewport : on les fige en haut et on masque le lien d’évitement.
    await page.send('Runtime.evaluate', {
      expression: `(() => {
        const style = document.createElement('style');
        style.textContent =
          '.skip-link{display:none!important}' +
          'header.bar{position:absolute!important;top:0!important}' +
          // Fige les textes en cours d'animation, qui sinon sont capturés à mi-transition.
          '.rotation-item{animation:none!important;opacity:1!important}';
        document.head.appendChild(style);
      })()`,
    });

    // Fait défiler la page pour déclencher le lazy loading et les révélations.
    await page.send('Runtime.evaluate', {
      expression: `(async () => {
        const step = window.innerHeight;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 220));
        }
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 600));
      })()`,
      awaitPromise: true,
    });

    const { result } = await page.send('Runtime.evaluate', {
      expression: 'Math.ceil(document.documentElement.scrollHeight)',
      returnByValue: true,
    });

    const height = Math.min(Math.max(result.value, viewport.height), maxHeight);

    await page.send('Emulation.setDeviceMetricsOverride', {
      width: viewport.width,
      height,
      deviceScaleFactor: viewport.scale,
      mobile: viewport.mobile,
    });
    await delay(500);

    const shot = await page.send('Page.captureScreenshot', {
      format: 'webp',
      quality: 82,
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: viewport.width, height, scale: 1 },
    });

    return shot.data;
  } finally {
    await browser.send('Target.closeTarget', { targetId }).catch(() => {});
    browser.close();
  }
}

/** Client CDP minimal, bâti sur le WebSocket natif de Node. */
async function connect(wsUrl) {
  const socket = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', () => reject(new Error('WebSocket refusé')), { once: true });
  });

  let nextId = 1;
  const pending = new Map();
  const listeners = new Map();

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);

    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      message.error ? reject(new Error(message.error.message)) : resolve(message.result);
      return;
    }

    const key = `${message.sessionId ?? ''}:${message.method}`;
    listeners.get(key)?.forEach((resolve) => resolve(message.params));
    listeners.delete(key);
  });

  const send = (method, params = {}, sessionId) =>
    new Promise((resolve, reject) => {
      const id = nextId++;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params, sessionId }));
    });

  const once = (method, sessionId) =>
    new Promise((resolve) => {
      const key = `${sessionId ?? ''}:${method}`;
      listeners.set(key, [...(listeners.get(key) ?? []), resolve]);
    });

  return {
    send: (method, params) => send(method, params),
    session: (sessionId) => ({
      send: (method, params) => send(method, params, sessionId),
      once: (method) => once(method, sessionId),
    }),
    close: () => socket.close(),
  };
}
