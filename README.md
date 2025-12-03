
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
