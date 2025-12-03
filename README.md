<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 269106b (snapshot)

# Git Investigator (GI) - v0.1.0 (MVP)
![](./logo.png)

Git Investigator is a developer tool designed for quick, command-line-style analysis of open-source packages. It provides detailed metadata and security intelligence for packages from NPM, PyPI, and C++ repositories on GitHub.

This project is currently a **Minimum Viable Product (MVP)**. Feedback and contributions are highly encouraged. Please open an issue to report bugs or suggest new features.

---

## Usage

GI is operated via a simple command syntax: `[source] find: [target]`.

### Supported Sources

| Prefix / Command       | Source             | Search Type | Description                                                                         |
|------------------------|--------------------|-------------|-------------------------------------------------------------------------------------|
| `npm:`        | NPM                | Standard    | Fetches essential metadata for an NPM package.                                      |
| `dnpm:`       | NPM                | Deep        | Retrieves a comprehensive report, including detailed security analysis from Socket.dev. |
| `py:`         | PyPI               | Standard    | Fetches essential metadata for a Python package from PyPI.                          |
| `dpy:`        | PyPI               | Deep        | Retrieves a comprehensive report for a Python package, including security analysis. |
| `cpp:`        | C++ (GitHub)       | Standard    | Fetches repository metadata directly from the GitHub API. Requires `owner/repo` format. |

### Examples

-   **NPM:** Get a quick overview of the `gsap` package.
    ```
    npm: gsap
    ```

-   **PyPI (Deep):** Perform a detailed analysis on the `pandas` library.
    ```
    dpy: pandas
    ```

-   **C++ (GitHub):** Get repository statistics for `OpenCV`.
    ```
    cpp: opencv/opencv
    ```

---

## Project Vision

The current implementation serves as the foundational layer. The long-term vision for Git Investigator is to evolve into an indispensable tool for dependency management and risk assessment. It aims to provide a unified, efficient interface for developers to evaluate the quality, security, and maintenance status of any open-source component before its adoption into a project.
<<<<<<< HEAD
=======
=======
# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
>>>>>>> 5197ae9 (snapshot)
>>>>>>> 269106b (snapshot)
