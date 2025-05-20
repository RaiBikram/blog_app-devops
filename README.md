 ## GitHub Action (CI/CD)
---
## ⚙️ Continuous Integration (CI)

This project uses **Continuous Integration (CI)** to ensure code quality, reliability, and fast feedback throughout development.

### ✅ What is CI?

**CI** is a development practice where every code change is automatically:

* **Linted** for code style and syntax issues
* **Tested** to catch bugs and regressions
* **Built** to verify that the application compiles or bundles successfully

> These steps are triggered on every commit or pull request using [GitHub Actions](https://docs.github.com/en/actions) (or your CI platform of choice).

### 🛠️ CI Pipeline Includes:

| Step    | Description                         |
| ------- | ----------------------------------- |
| `Lint`  | Static code analysis and formatting |
| `Test`  | Automated unit/integration tests    |
| `Build` | Compile or bundle the application   |

---

## ⬅️ Shift Left Testing

### ✅ What is Shift Left?

**Shift Left** is a testing approach where quality checks and validations happen **early** in the development lifecycle—ideally while the code is being written.

### 🚀 Why Shift Left?

* 🐞 Catch bugs early
* 💸 Reduce cost of fixing issues
* ⚡ Speed up delivery
* ✅ Improve software quality

### 🔍 Key Practices in Shift Left:

| Practice                 | Purpose                                    |
| ------------------------ | ------------------------------------------ |
| ✅ Unit Testing           | Write tests during/just after writing code |
| 🧪 Test-Driven Dev (TDD) | Define behavior before implementation      |
| 🔁 CI Integration        | Run tests & lint checks on every push/PR   |
| 🧹 Linting               | Ensure code quality from the start         |
| 🔍 Code Reviews          | Detect logic or style issues early         |

### 📊 Traditional vs Shift Left

| Approach               | When Testing Happens | Risk of Bugs | Feedback Speed |
| ---------------------- | -------------------- | ------------ | -------------- |
| 🕒 Traditional (Right) | After development    | High         | Slow           |
| ⬅️ Shift Left          | During development   | Low          | Fast           |

---

## ⚡ Parallel Jobs for Faster Feedback

The CI pipeline runs separate jobs for **lint**, **test**, and **build** in parallel. This means:

* Faster results since jobs run simultaneously
* Easy to spot which step failed
* If any job fails, the whole pipeline fails, preventing faulty code from merging
---




