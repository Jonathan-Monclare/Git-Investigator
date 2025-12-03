import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    width: 500,
    height: 500 * 1.5,
    resizable: false,
    // transparent: true,
    icon: path.join(__dirname, '..', 'icon.png'),

    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

ipcMain.handle('get-package-intel', async (_, name) => {
  try {
    const [npmRes, socketRes] = await Promise.all([
      fetch(`https://registry.npmjs.org/${name}`),
      fetch(`https://api.socket.dev/v0/report/npm/${name}`)
    ]);
    if (!npmRes.ok) throw new Error('NPM package not found');
    const npm = await npmRes.json();
    const sk = await socketRes.json();
    const latestVer = npm['dist-tags']?.latest;

    const licenseText = npm.license;

    let licenseType = 'Not MIT, Apache, and BSD';
    if (licenseText.toLowerCase().includes('mit')) {
      licenseType = 'MIT';
    } else if (licenseText.toLowerCase().includes('apache 2.0')) {
      licenseType = 'Apache-2.0';
    } else if (licenseText.toLowerCase().includes('bsd')) {
      licenseType = 'BSD';
    } else if (licenseText.toLowerCase().includes('standard')) {
      licenseType = 'Standard';
    } else if (licenseText.toLowerCase().includes('no-charge')) {
      licenseType = 'No-charge';
    }

    return {
      name: npm.name,
      version: latestVer,
      released: npm.time?.[latestVer],
      author: (typeof npm.author === 'object' ? npm.author.name : npm.author) || 'Unknown',
      desc: npm.description || 'No descriptions here',
      license: licenseType,
      homepage: npm.homepage,
      security: {
        score: sk.score?.supplyChain ?? 0,
        issues: (sk.issues || []).length
      }
    };
  } catch (e) { return { error: (e as Error).message }; }
});

ipcMain.handle('get-package-intel-deep', async (_, name) => {
  try {
    const [npmRes, socketRes] = await Promise.all([
      fetch(`https://registry.npmjs.org/${name}`),
      fetch(`https://api.socket.dev/v0/report/npm/${name}`)
    ]);
    if (!npmRes.ok) throw new Error('NPM package not found');
    const npm = await npmRes.json();
    const sk = await socketRes.json();
    const latestVer = npm['dist-tags']?.latest;

    const licenseText = npm.license || '';

    console.log(npm)

    let licenseType = 'Not MIT, Apache, and BSD';
    if (licenseText.toLowerCase().includes('mit')) {
      licenseType = 'MIT';
    } else if (licenseText.toLowerCase().includes('apache 2.0')) {
      licenseType = 'Apache-2.0';
    } else if (licenseText.toLowerCase().includes('bsd')) {
      licenseType = 'BSD';
    } else if (licenseText.toLowerCase().includes('standard')) {
      licenseType = 'Standard';
    } else if (licenseText.toLowerCase().includes('no-charge')) {
      licenseType = 'No-charge';
    }

    return {
      name: npm.name,
      version: latestVer,
      updated: npm.time?.modified,
      released: npm.time?.[latestVer],
      author: (typeof npm.author === 'object' ? npm.author.name : npm.author) || 'Unknown',
      desc: npm.description || 'No descriptions here',
      license: licenseType,
      email: npm.author?.email || npm.email || 'Not Found',
      homepage: npm.homepage,
      links: {
        npm: `https://www.npmjs.com/package/${name}`,
        repo: npm.repository?.url?.replace(/^git\+/, '').replace(/\.git$/, ''),
        bugs: npm.bugs?.url
      },
      people: {
        maintainers: (npm.maintainers || []).map((m: any) => m.name),
        contributors: (npm.contributors || []).map((c: any) => c.name),
      },
      security: {
        score: sk.score?.supplyChain ?? 0,
        issues: (sk.issues || []).length
      }
    };
  } catch (e) { return { error: (e as Error).message }; }
});

ipcMain.handle('get-pypi-intel', async (_, name) => {
  try {
    const [pypiRes, socketRes] = await Promise.all([
      fetch(`https://pypi.org/pypi/${name}/json`),
      fetch(`https://api.socket.dev/v0/report/pypi/${name}`)
    ]);
    if (!pypiRes.ok) throw new Error('PyPI package not found');
    const py = await pypiRes.json();
    const sk = await socketRes.json();
    const releases = py.releases?.[py.info.version] || [];

    const licenseText = py.info.license || '';

    let licenseType = 'Not MIT, Apache, and BSD';
    if (licenseText.toLowerCase().includes('mit')) {
      licenseType = 'MIT';
    } else if (licenseText.toLowerCase().includes('apache 2.0')) {
      licenseType = 'Apache-2.0';
    } else if (licenseText.toLowerCase().includes('bsd')) {
      licenseType = 'BSD';
    } else if (licenseText.toLowerCase().includes('standard')) {
      licenseType = 'Standard';
    } else if (licenseText.toLowerCase().includes('no-charge')) {
      licenseType = 'No-charge';
    }

    return {
      name: py.info.name,
      version: py.info.version,
      released: releases.length > 0 ? releases[0].upload_time : py.info.created,
      author: py.info.author,
      desc: py.info.summary || 'No descriptions here',
      license: licenseType,
      homepage: py.info.project_urls?.homepage || py.info.homepage || py.info.home_page,

      security: {
        score: sk.score?.supplyChain ?? 0,
        issues: (sk.issues || []).length
      }
    };
  } catch (e) { return { error: (e as Error).message }; }
});

ipcMain.handle('get-pypi-intel-deep', async (_, name) => {
  try {
    const [pypiRes, socketRes] = await Promise.all([
      fetch(`https://pypi.org/pypi/${name}/json`),
      fetch(`https://api.socket.dev/v0/report/pypi/${name}`)
    ]);
    if (!pypiRes.ok) throw new Error('PyPI package not found');
    const py = await pypiRes.json();
    const sk = await socketRes.json();
    const info = py.info;
    const releases = py.releases?.[info.version] || [];

    const licenseText = info.license || '';

    let licenseType = 'Not MIT, Apache, and BSD';
    if (licenseText.toLowerCase().includes('mit')) {
      licenseType = 'MIT';
    } else if (licenseText.toLowerCase().includes('apache 2.0')) {
      licenseType = 'Apache-2.0';
    } else if (licenseText.toLowerCase().includes('bsd')) {
      licenseType = 'BSD';
    } else if (licenseText.toLowerCase().includes('standard')) {
      licenseType = 'Standard';
    } else if (licenseText.toLowerCase().includes('no-charge')) {
      licenseType = 'No-charge';
    }

    const urls = info.project_urls || {};

    console.log(info)

    return {
      name: info.name,
      version: info.version,
      updated: releases.length > 0 ? releases[0].upload_time : null, 
      released: releases.length > 0 ? releases[0].upload_time : info.created,
      author: info.author_email,
      desc: info.summary || info.description,
      license: licenseType,
      email: info.author_email,
      homepage: info.project_urls?.Homepage || info.homepage || info.home_page,
      links: {
        pypi: info.package_url,
        repo: urls.Source || urls.Repository || urls.GitHub || urls['Source Code'] || urls['Source code'] || 'Not Found',
        docs: urls.Documentation || urls.Docs || 'Not Found',
      },
      people: {
        maintainers: [], 
        contributors: [],
      },
      security: {
        score: sk.score?.supplyChain ?? 0,
        issues: (sk.issues || []).length
      }
    };
  } catch (e) { return { error: (e as Error).message }; }
});

ipcMain.handle('get-cpp-intel', async (_, repoName) => {
  try {
    const res = await fetch(`https://api.github.com/repos/${repoName}`);

    console.log(res)

    if (!res.ok) throw new Error('Repo not found');
    const data = await res.json();

    return {
      name: data.full_name, 
      desc: data.description || 'No descriptions here',
      url: data.url,
      htmlUrl: data.html_url,
      stars: data.stargazers_count, 
      forks: data.forks_count,
      forksUrl: data.forks_url,
      updated: data.updated_at,
      license: data.license?.name || 'Unknown',
      vis: data.visibility,
      issues: data.open_issues,
      security: { note: "No automated audit available for C++ raw repos." }
    };
  } catch (e) { return { error: (e as Error).message }; }
});

app.whenReady().then(createWindow)
