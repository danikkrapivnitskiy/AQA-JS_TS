# How to Test AI Systems — Unified Guide

One logical guide to testing LLM and agent systems. Content is **paraphrased** from the linked sources and **merged by topic** — each idea appears once, enriched wherever several authors say the same thing differently.

**Sources:** [Imigo](https://imigo.ai/ru/media/ai-agent-testing) · [Habr / Tarasov](https://habr.com/ru/articles/1042924/) · [Habr / VeronLezh](https://habr.com/ru/articles/1049482/) · [Habr / Sber](https://habr.com/ru/companies/sberbank/articles/1034680/) · [Grazitti / Goldshteyn](https://www.grazitti.com/expert-insights/gregory-goldshteyn/) · [NeuralTrust / IPI](https://neuraltrust.ai/blog/indirect-prompt-injection-complete-guide) · [LinkedIn / Bhargavi](https://www.linkedin.com/posts/bhargavi29_ai-softwaretesting-qa-share-7454242096678600704-oEfx/) · [evaldriven.org](https://evaldriven.org) · [LinkedIn / Kronenberg](https://www.linkedin.com/posts/johnkronenberg_evaluaite-evaldrivendevelopment-qacompany-share-7474073724451794944-b-zD/) · [Test Guild — Adam Sandman on non-deterministic testing](https://testguild.com/a580)

**Not included:** PDF `1779621940530.pdf` (no extractable text); VeronLezh’s image cheat sheet.

---

## 1. Why classic QA breaks — and what replaces it

Classic QA assumes determinism: input A → output B, every time. A bug has an address — step, expected, actual. Press again — same result.

LLM and agent systems break that contract. The shift is not “harder QA” but **different QA**:

| Classic assumption | AI reality | What to do instead |
|-------------------|------------|-------------------|
| One expected string | Many valid answers (“Paris”, “Capital of France is Paris…”) | **Rubric** — correctness, relevance, completeness, tone |
| Same test → same result | Same prompt → different outputs | Measure **frequency** (e.g. 4/10 STT failures = defect, not “cannot reproduce”) |
| Green CI → safe release | Suite covers tiny fraction of real input; model can look correct and lie inside | **Prod monitoring**; testing begins at release, not ends |
| Regressions = code diff | Prompt word change or model provider update → regression, zero repo diff | **Regression tests for prompts and models** |
| Coverage = branches/lines | Input space = all natural language | **Risk-based** coverage; datasets matching real query distribution |
| Eliminate uncertainty | Nondeterminism is built in | **Manage uncertainty** (Bhargavi); statistical proof, not one run (EDD) |

**Question to ask (Goldshteyn):**

- ❌ “Did it return the **right** answer?”  
- ✅ “Good answers **often enough**, and **fails gracefully** when not?”

Use **confidence thresholds**, **output distributions**, **behavioral consistency over time**, property-based testing, golden datasets, statistical sampling, bias/fairness checks.

**What still works from classic QA:** test design, equivalence classes, negatives, risk-based thinking, formalized expectations, clear reports — extended with LLM-as-judge, evals in CI/CD, prod monitoring.

**Examples to remember:**

- **Voice (VeronLezh):** 4/10 identical audio requests misrecognized → whole answer chain changes.  
- **Form agent (VeronLezh):** day 1 OK; day 2 same scenario fails — wrong fields, partial fill, voice ≠ chat — with no code change and green CI yesterday.  
- **Streaming (Goldshteyn):** bad release reaches millions in minutes if quality is only a final gate.

### Reframe goals around risk, not pass/fail (Sandman)

For non-deterministic AI, **100% coverage is impractical**. The question is not “did we test everything?” but **“what risk is acceptable for this use case?”**

| Use case | Typical tolerance (illustrative) |
|----------|----------------------------------|
| E-commerce chatbot | Higher tolerance; metrics + sampling |
| Customer support bot | Medium; safety + escalation matter |
| Medical / healthcare routing | Low; regulatory alignment mandatory |
| Aerospace / air traffic | Very low or zero allowable failure modes |

Set targets by **impact and consequence** — distinguish **fit for purpose** vs **perfect**. Educate managers and sponsors: same system + same input can yield different outputs; binary green/red is often meaningless without thresholds.

---

## 2. What you are testing

### 2.0 Two parallel QA challenges (Sandman)

Teams face **both** at once:

| Challenge | What changed | What you test |
|-----------|--------------|---------------|
| **A — AI-assisted development** | More code, faster (human + AI co-written) | **Deterministic** parts at scale: UI, APIs, data layer, integrations |
| **B — AI in the product** | Chatbots, RAG, agents in the app | **Non-deterministic** parts: generation, decisions, dialog quality |

Volume and velocity went up; classic bottleneck (not enough time to test) got worse. QA must **use AI to do more with the same team** while adding **new eval methods** for AI components.

### 2.1 Purpose

Agent/LLM testing is a **quality control system**, not a formality: how tasks are performed, where logic breaks, behavior after updates, release safety, and whether the system **actually improved** (not just feels better).

Without it: complaints → urgent fixes → new regressions. With scale (users, models, releases) you cannot locate failures (prompt? data? code? tools? model?) without structured evals.

**Four practical benefits:** verify changes before release; shorter debugging; catch regressions after model updates; objective quality metrics.

**Business risk (Imigo):** if the agent serves clients, sales, documents, databases, or internal services, one wrong API call, logic flaw, or bad action chain hits users, revenue, and reputation. Testing also validates **growth** — without metrics you cannot tell if the system truly improved or only seems better.

### 2.2 LLM vs agent

| | LLM | Agent |
|---|-----|-------|
| Typical check | Final answer | Full **behavior** |
| Runtime | Single response | Loop: instruct → tool → change env → adapt |
| Also verify | — | Actions, API calls, data changed, latency, errors |

**Two layers always:**

1. **Model quality** — answers, facts, instruction following.  
2. **Agent scaffold** — routing, memory, tools, security, retries, orchestration.

Real correctness = **model + scaffold together** (Imigo).

### 2.3 Anatomy of one eval

An **eval** = **dataset** + **grader** + **harness** (evaldriven.org). Build **grader and harness before code**; dataset evolves synthetic → production-like.

One test run also includes:

1. **Task** — scenario with clear goal  
2. **Trial** — one attempt  
3. **Grader** — pass/fail logic  
4. **Transcript** — full step/call log  
5. **Result** — **final environment state** (DB, API, UI)  
6. **Harness** — isolated run, log, assert infra  

**Pattern — refund agent (Imigo):**  
Do **not** pass on text “return processed.” Verify: correct **function calls**, **status change**, **DB record**, no **security violation**.

**Pattern — ship eval, not demo (EDD):** demo proves once; eval proves reliability under distribution shift.

### 2.4 Capability vs regression suites

| Suite | Purpose | When it runs |
|-------|---------|--------------|
| **Capability** | Can the agent do new thing X? | New features, new scenarios |
| **Regression** | Does it still do what worked? | Every change — prompt, model, code, index |

Keep them **separate**. Mixing hides whether you regressed or only expanded scope.

### 2.5 Decompose: deterministic vs non-deterministic parts (Sandman)

Like load testing: you load the **API**, not every UI click — use the **right method per layer**.

| Part of system | Usually | How to test |
|----------------|---------|-------------|
| UI flows, forms, navigation | Deterministic | Classic automation + AI-assisted authoring / self-healing |
| Data layer, REST/GraphQL, auth | Deterministic | Contract tests, DB checks, regression |
| LLM replies, RAG, agent tool choices | Non-deterministic | Rubrics, statistical evals, scenario suites (§3–4) |

**Test the entire experience (Sandman):** real user journeys still run through web, mobile, and APIs. The AI layer sits on top — E2E scenarios must verify **integration stability** (UI + data + AI output together), not only the model in isolation.

---

## 3. How to define and measure “correct”

### 3.1 Before you build (EDD)

If you cannot express “correct” as a **deterministic check, rubric, or threshold with justification**, you are not ready to write a prompt or ship.

Every task → eval. Every eval → threshold. Every threshold → documented why.

### 3.2 Graders — three types, one rule

| Type | Use for | Pros | Cons |
|------|---------|------|------|
| **Code** | Schema, DB state, tool calls, tokens, latency, tests pass | Fast, cheap, reproducible | Brittle on open-ended text |
| **Model (LLM-as-judge)** | Tone, completeness, dialog quality | Handles language | Needs human calibration; bias risk |
| **Human** | Rubric design, disputes, auditing judges | Gold standard | Does not scale |

**Rule (Tarasov, Imigo):** prefer **code** when possible; add **LLM judge** for semantics; keep **humans** for critical paths and calibrating judges.

**Rule (EDD #7):** every manual review is a **missing eval** — extract judgment → rubric → automate → evaluate the evaluator.

### 3.3 Metrics

Collect and read **with logs and transcripts** — never scores alone:

- pass@1, pass@k (≥1 success in k tries)  
- Stability across N runs  
- Steps, tool-call count  
- Latency, tokens, **cost per task** (EDD: cost is a metric; correct but unaffordable = fail)  
- Critical error rate  
- Success rate **by task type**  

For production, single-attempt reliability often matters more than pass@k.

**Statistical proof (EDD, VeronLezh):** sample sizes, confidence intervals, regression baselines — measure **distributions**, not anecdotes.

### 3.3a “Fit for purpose” — not a single pass/fail (Sandman)

Tester job: use the right tools, ask the right questions, give **decision-ready metrics**. Leadership decides **yes/no for this use case**.

Example dimensions for a chatbot eval (aggregate across many runs):

| Dimension | Example metric | Business read |
|-----------|----------------|---------------|
| Safety (hate speech, PII) | 99.99% pass | Blocker if below threshold |
| Helpfulness | 89% pass | May ship with known gap |
| Escalation when frustrated | 95% pass | Support cost impact |
| Latency | p95 under 2s | UX / cost |

Wrong tool analogy (Sandman): using a **functional test tool** for **non-deterministic AI** fails the same way using functional tests for **load testing** fails — you need tooling and methods built for statistical, scenario-based evaluation.

### 3.4 Scale non-deterministic testing with agents (Sandman)

**Pattern:** at scale, simulate diverse inputs and aggregate results:

1. **Input side** — agents or generators produce many permutations (safety probes, edge phrasing, adversarial prompts).  
2. **Output side** — graders (code + LLM-as-judge) score each run against rubric dimensions.  
3. **Report** — per-dimension pass rates, not one boolean.

This is how you approximate coverage when exhaustive input space is impossible. Combine with §4 component evals for diagnosis when a dimension fails.

### 3.5 Tools for measurement

- **Promptfoo** (Bhargavi): compare models, LLM-graded evals, weighted assertions.  
- Debugging AI ≈ analyzing **behavior**, not fixing deterministic bugs.

---

## 4. Layer-by-layer testing (component evals)

### 4.1 Why end-to-end alone fails

Success rate, tokens, tool usage, cost — good for **overview**, useless for **diagnosis**.

Example: 85% → 72% — retrieval? tool choice? context pollution after N turns? base model? Errors **multiply** across layers.

**Pattern:** split into **component evals**; re-run when prompt, tool schema, retrieval index, retry logic, or model changes. If a component cannot be evaluated alone, it cannot be trusted alone (EDD #5).

**CI pattern (Tarasov, EDD):** smoke **20–50 cases every PR**; tier full suite nightly (like unit vs integration). If evals do not run on every change, they “do not exist.” Merges can be **gated by eval regression** (Kronenberg comment).

Different layers need different methods — retrieval ≠ structured output.

---

### 4.2 Retrieval precision

**Checks:** does RAG return the right documents/chunks?

**How (Tarasov):**

1. Collect **20–50 questions** with **known relevant sources** in your index.  
2. For each question, run **top-k** retrieval.  
3. Pass if the **correct chunk is in top 3–5**.  
4. Fail if **irrelevant chunks dominate** the top.  

**Metrics:** precision, recall, hit@k — not the same checks as structured-output validation (§4.6).

---

### 4.3 Tool-call schema

**How:** tasks with expected call → assert **name**, **params**, **types**, no extra fields.

---

### 4.4 State consistency

**How:** after N turns, compare agent’s **believed state** vs **actual** (document, workflow, graph). Critical for **long horizons**.

**Example — Unreal Blueprint agent (Tarasov):** after 10–20 steps agent thinks nodes exist that do not, connects missing pins, loops fixing itself — plans from **memory**, not **live graph**. Fix is not “smarter LLM” but **state eval**: periodically compare expected graph, actual graph, agent’s working model → fail as **state consistency loss**.

---

### 4.5 Retry / error propagation

**How:** inject validation error, permission denied, not found → **retry** if retriable, **no retry** if not, error **visible to agent**.

---

### 4.6 Structured output

**How:** validate against schema; parse errors **explicit to agent**; no silent empty/partial results.

---

### 4.7 “I don’t know”

**How:** no answer in context or conflicting data → expect refuse or clarify, not hallucination.

---

### 4.8 Model swap

**How:** same suite, different models, same scaffold → sharp gain = model bottleneck.

---

## 5. Testing by agent type

Test **concrete behavior in real conditions**, not abstract intelligence.

### What is a benchmark?

A **benchmark** is a **public, standardized set of tasks** with a fixed way to run and score them. Examples in this guide: SWE-bench, WebArena, τ-bench. Teams use the same benchmark to **compare models or agent setups** on equal tasks — like a shared exam, not your product’s real homework.

**What benchmarks are good for (Imigo):**

- Orienting — see what “state of the art” looks like for coding, dialog, or browser agents.  
- Comparing models or prompts on **identical** scenarios.  
- Seeding ideas for your **own** internal task set.

**What benchmarks are not:**

- A substitute for **your** evals on **your** data, users, and business rules.  
- Proof that the agent is safe in prod — public tasks rarely match your RAG, tools, or policies.  
- The final quality verdict — Imigo: **final judgment only on your scenarios.**

**Pattern:** use benchmarks to learn and compare; **ship quality decisions** on internal evals (§4, §7).

| Type | What to verify | Methods | Public benchmarks (compare / orient) |
|------|----------------|---------|-------------------------------|
| **Coding** | Tests pass, no regression/vulns, static analysis | Deterministic checks | SWE-bench Verified, Terminal-Bench |
| **Conversational** | Context, rules, tools, **scenario done** | State check, turn limits, LLM rubrics, user simulation | τ-bench, τ²-bench |
| **Research / RAG** | Facts, sources, coverage, no fabrication | Fact-check, reference match, human spot-check | Your golden sets |
| **Browser / OS** | Real UI/env change, not just text | Sandbox, **execution-based** eval | WebArena, OSWorld |

---

## 6. Security and adversarial testing

### 6.1 Defect classes classic QA did not have

Hallucinations, system prompt leakage, **prompt injection** (direct and indirect), toxicity, PII leakage — found by **red teaming**, not UI clicking.

If the agent touches **clients, documents, code, support, or internal DBs**, **security evals run every testing cycle**, not only pre-release (Imigo).

### 6.2 Direct vs indirect prompt injection (IPI)

**Direct:** malicious text in user field (“Ignore previous instructions…”) — often caught by basic guards.

**Indirect (IPI):** payload in **trusted external content** (docs, web, API, email, metadata). User request looks benign; model follows hidden instruction. Often **zero-click** for user (“Summarize this email”).

**Impacts to test for:** data exfiltration (prompts, RAG, PII in context), unauthorized actions (email, delete, bypass HITL — like RCE via AI), IP theft, regulatory/reputational harm.

**Poisoning techniques to simulate:**

1. Hidden instructions in large benign text  
2. Zero-width / invisible HTML-CSS text  
3. Metadata in PDFs/images (EXIF, author)  
4. Multimodal steganography / adversarial patches  

**Attack flow:**

| Step | Who | What happens |
|------|-----|--------------|
| 1 | Attacker | Embeds payload in external source (webpage, shared doc) |
| 2 | User | Benign request: “Summarize / analyze this” |
| 3 | Agent | RAG or tool loads content **including payload** into context |
| 4 | Agent | Model **prioritizes malicious instruction** over system prompt |
| 5 | Agent | Exfiltration, unauthorized API calls, harmful output — often **invisible to user** |

Treat **all external data as untrusted** until verified. No single layer is enough — test **defense in depth**.

### 6.3 Defense layers (test that each works)

**Layer 1 — Input sanitization**

- Strip HTML, CSS, JS, invisible characters (e.g. zero-width spaces).  
- Scrub file metadata (EXIF, author, comments) before LLM ingest.  
- Limit which content types the agent may ingest.  
- Scan documents, APIs, and web content for suspicious instruction patterns.

**Layer 2 — Trust boundaries**

- **Dual-LLM:** a gatekeeper reads and summarizes untrusted data (no sensitive tools); the execution LLM never sees raw external content.  
- **Read-only policy** for external data — informational only, not instructions.  
- **Least-privilege tools** — a summarizer must not delete files or reach sensitive systems.  
- **Context segmentation** — poisoned content in one workflow must not affect others.

**Layer 3 — Output filtering and human review**

Before showing output or executing actions, apply **post-processing**:

- **Output guardrails** — scan for attempts to reveal **system prompts**, request **sensitive data**, or call **unauthorized APIs**.  
- **Human-in-the-loop** for high-impact actions: send email, financial transactions, data deletion.

**Layer 4 — Model-side**

- **Adversarial fine-tuning** on IPI examples so the model learns to ignore embedded malicious instructions.  
- Platform-level monitoring and automated filtering (commercial security layers exist; test whatever you deploy).

**Additional measures**

- **Auditing and logging** — input sources, outputs, data transformations; anomaly detection on unexpected outputs.  
- **Adversarial testing** — simulate IPI in a controlled environment; find gaps in prompt pipeline and reasoning.  
- **Team training** — IPI mechanics, mitigation practices, security-first culture and clear guidelines.

### 6.4 Governance and regulatory alignment (Sandman)

In regulated domains, test **functionality and compliance** — not only “does the button work?”

**Pattern:** ingest regulations and policy (HIPAA, 21 CFR Part 11, sector rules) and compare to **system behavior and requirements**. If the law says B but requirements say A, fix requirements and system before ship — or face fines and audit failure.

Same mindset as §6.2 IPI: external **trusted documents** (regulations, internal policy) must align with what the system actually does.

---

## 7. Building and running the process

### 7.1 Eval-driven workflow (EDD summary)

1. **Evaluation is the product** — evals first, then prompts/agents/code.  
2. **Define correctness before prompt.**  
3. **Statistical proof** — not one green run.  
4. **Evals in CI** — tiered smoke + full.  
5. **Architecture for measurability** — component evals.  
6. **Cost is a metric.**  
7. **Codify human judgment.**  
8. **Ship eval, not demo.**  
9. **Version evals like code** — datasets, thresholds, changelogs.  
10. **Eval gap** — “works on my machine” vs “passes at p < 0.05” is where defensible products live.

**EDD vs other practices (evaldriven.org FAQ):**

| Compared to | Difference |
|-------------|------------|
| **TDD** | TDD uses binary pass/fail on deterministic code. EDD requires **success thresholds** up front: what score is good enough? what regression is acceptable? |
| **MLOps** | MLOps asks “is it still working?” after deploy. EDD asks “how do we know it works at all?” **before** prompt, pipeline, or model choice. |
| **A/B testing** | A/B tests on **real users post-deploy**. Evals catch problems **pre-deploy** without shipping broken experiences. A/B = which version users prefer; evals = whether either version is **good enough to ship**. |
| **“Too slow for CI”** | **Tier evals:** fast smoke on every commit; full suite nightly — same idea as unit vs integration tests. |
| **“Just one API call”** | That call still regresses when the model, prompt, or context changes — simpler integration means **easier** eval, not skip. |
| **“Subjective outputs”** | Usually means criteria are undefined. Use rubrics, LLM-as-judge, consistency across runs. |

### 7.2 Bootstrap the suite

- Start with **20–30 real scenarios** — do not wait for perfect suite.  
- Sources: support fails, typical requests, dev mistakes, disputed cases, manual checks.  
- Each task: expert can judge pass/fail; if fuzzy → rubric + expected actions + allowed deviations.  
- **Isolate runs** — no shared cache/files between trials.

### 7.3 Continuous quality (not a release gate)

End-stage QA only (Goldshteyn / Fox): by the time issues surface, fix cost is high — silent failures, load-only regressions, rushed sign-off, “quality = QA’s job.” A flawed streaming release can reach **millions in minutes.**

**Shift left:** CI/CD runs static analysis, security scans, contract tests, **model eval checks** early — not only at the end.

**Smart regression:** map code changes → affected domains (auth change ≠ full catalog run); prioritize tests that historically caught real bugs; parallelize in CI.

**Prod as quality signal:** observability and real user behavior expose issues pre-prod cannot. Dashboards: flakiness, coverage regression, **model drift** next to deploy health. Devs own tests in Definition of Done. “Culture follows visibility.”

**Proactive loop (Goldshteyn):** production incident → **automatically add regression case** for that scenario → failure surface shrinks over time.

**Automation alone fails (Imigo):** speed without **manual calibration**, **prod monitoring**, **A/B tests**, and **UX analysis** creates false confidence — combine several evaluation layers.

**Read logs, not only scores (Imigo):** bare metrics hide harness bugs, prompt bugs, or **grader** bugs. Regularly read transcripts and validate graders, not only the agent.

### 7.4 Seven typical mistakes

1. Test **only answers**, not **actions** (tools, state, side effects).  
2. Mix **capability** and **regression** suites.  
3. Assert one **golden path** only.  
4. Trust **scores** without logs; do not **validate graders**.  
5. **Unstable / shared** test environment.  
6. Ignore **nondeterminism** (single run).  
7. Never **add cases after incidents**.

### 7.5 Requirements, tests, code, and user reality (Sandman)

AI can surface **four-way mismatches** when you have enough context (codebase, tests, specs, docs):

| Layer | Example mismatch |
|-------|------------------|
| **Requirement** | Says feature A |
| **Test** | Asserts B |
| **Code** | Implements C |
| **User manual / support** | Users expect D |

**How to use this in testing:**

1. Are requirements **well-written**, consistent, with concrete examples?  
2. Do tests **trace to** requirements?  
3. Does code match both?  
4. Do tickets and docs reveal what users **actually** experience?

Human decides the source of truth (often D exposes a spec bug or legacy behavior).

### 7.6 Living knowledge and institutional memory (Sandman)

**Pattern:** AI ingests codebase history, tests, requirements, logs, **support tickets**, forums, pre-sales questions → testers query *why* something was built a certain way and *what* users complain about.

Brownfield advantage: institutional memory that used to leave with the original team can become **searchable context** for QA and refactors. Support data feeds **real scenario** design (§7.2).

### 7.7 Adoption: where to start (Sandman)

Do not add workload without removing drudgery first.

1. **Save time on current work** — self-healing locators, replace spreadsheet collation, AI test generation for deterministic UI/API.  
2. **Then add** non-deterministic evals, compliance checks, scale agent testing.

If the team is overloaded, even “cool” AI features will be ignored. Example pattern: replace 4 hours/day of manual report merging → **then** adopt requirements discipline.

**Experimentation:** tinker with tools; failures are expected in non-deterministic systems — learn and adjust rubrics (growth mindset).

Start **low-risk use cases** to prove value, then expand to higher-stakes domains with stricter thresholds (§1).

### 7.8 Cross-disciplinary team (Sandman)

Expand beyond classic QA:

- **Risk managers** — acceptable risk by use case  
- **Data scientists / ML engineers** — bias, drift, model limits  
- **Compliance / legal** — regulatory alignment (§6.4)  
- **Product / UX / user research** — fit for purpose  

QA becomes **AI-enabled quality engineering** — orchestrating metrics and risk, not only executing scripts.

### 7.9 Communicate value to leadership (Sandman)

Tie quality to **business outcomes**, not only bug counts:

- Support ticket volume after a release  
- NPS / customer satisfaction  
- Time-to-market with controlled risk  
- Avoided fines (finance, healthcare)  

Dashboards should translate eval dimensions into impact leaders understand — quality as **revenue and risk**, not only a cost center.

### 7.10 Fourteen principles — quick map (Sandman / Test Guild)

| # | Principle | See |
|---|-----------|-----|
| 1 | Risk targets, not 100% coverage | §1 |
| 2 | Decompose deterministic / non-deterministic | §2.5 |
| 3 | AI tools + human guardrails | §3, §8–9 |
| 4 | Scale with agents + multi-dimension metrics | §3.4 |
| 5 | Fit for purpose per use case | §3.3a |
| 6 | Governance and compliance | §6.4 |
| 7 | Requirements ↔ tests ↔ code alignment | §7.5 |
| 8 | Full experience E2E | §2.5 |
| 9 | Living knowledge (code, tickets, logs) | §7.6 |
| 10 | Maintenance, self-healing, drift | §9 |
| 11 | Responsible experimentation | §7.7 |
| 12 | Cross-disciplinary collaboration | §7.8 |
| 13 | Spec/markdown-driven future of dev | §8 note below |
| 14 | Business impact communication | §7.9 |

### 7.11 Effective process in one line

Early start → decompose layers → real scenarios (incl. support data) → stable harness → mixed graders → statistical + fit-for-purpose metrics → read logs → fresh task set → autotests + **prod monitoring** → security + compliance every cycle → show value to leadership.

---

## 8. Using AI inside your QA workflow (separate topic)

This is about **generating classic autotests with LLM**, not evals of an AI product (Sber).

**Problem:** vague prompt → wrong language/stack. Model does not know your in-house framework; fine-tune on everything → distorted behavior.

**Pattern:** unified stack → docs for LLM → **RAG** → **MCP** → retrieve relevant chunks only.

**Bad prompt (Sber):** abstract “write autotest with GET… check 200… field success…” — no role, no stack. The model picks Python, Kotlin, or Java by taste; code may not compile in your project.

**Good prompt (Sber)** — role + stack + numbered requirements + failure reporting:

```
You are a senior QA automation engineer on Java. Write a full autotest using:

Technologies: Rest Assured 5.x, JUnit 5 (Jupiter), Maven, Allure, SLF4J

Requirements:
1. GET https://api.example.com
2. Headers: Content-Type and Accept application/json
3. Assert status 200, Content-Type application/json, field result = success
4. Wrap in Allure step; on failure attach full response + request details, log via SLF4J
5. Handle network exceptions; clean Java; provide pom.xml and test class structure
```

**Why RAG + MCP (Sber):** in large orgs the model does not know your in-house framework. Vectorized docs + MCP return **only relevant chunks** — not the whole manual — so generated tests match **your** stack.

**Validate:** run generated tests; optional second model/agent review. Prompt engineering becomes baseline; **domain judgment** stays human. Agents handle routine; humans configure and control.

**On the horizon (Sandman):** development may move toward **spec- / markdown-driven** artifacts — requirements, desired state, and codebase context fed to AI together. Tests and traceability may be generated from the same spec layer; prepare for tighter links between requirements, code, and evals (§7.5).

---

## 9. AI-assisted testing patterns (where AI helps QA)

From Goldshteyn + Bhargavi + Sber + Sandman — merged:

| Pattern | What AI does | You still own |
|---------|--------------|---------------|
| Test generation | User story → cases + edge cases (minutes) | Rubrics, thresholds, review |
| Agentic exploration | Navigate UI, find breaks, self-heal locators | Strategy, critical paths |
| Log analysis | Surface important lines in incidents | Root-cause judgment |
| Autotest authoring | Code from structured prompt + RAG context | Stack, run, verify output |
| Model comparison | Promptfoo, weighted assertions | What “good enough” means |
| Statistical AI evals | Many input permutations + aggregated rubric scores | Thresholds, use-case sign-off |
| Requirements audit | Consistency, gaps vs code/tests/regulations | Final spec truth |
| Compliance check | Compare behavior to policy/regulation text | Legal/compliance sign-off |

### 9.1 Maintenance and self-healing (Sandman)

**Maintenance** is often the largest long-term cost of automation. AI + vision/healing makes **self-healing locators** more realistic than years of “coming soon” — still validate healed tests; do not trust blindly.

**Drift detection:** use AI to flag when requirements, tests, and **production behavior** diverge; suggest updates. Pair with §7.5 four-way alignment and prod monitoring (§7.3).

---

## 10. Reference — public benchmarks and tools

See **§5** for what a benchmark is vs your own evals.

| Name | What it checks | Typical use |
|------|----------------|-------------|
| SWE-bench Verified | Fixing real issues in real repos | Compare coding agents |
| Terminal-Bench | Hard terminal tasks with execution harness | DevOps / coding workflows |
| τ-bench / τ²-bench | Dialogs, domain rules, API behavior | Support, sales, service agents |
| WebArena | Web actions in realistic environment | Browser agents |
| OSWorld | Full OS and GUI control | Computer-use agents |
| Promptfoo | Run and compare LLM outputs with graders | Internal evals, model comparison |
| Evaluaite | Product around EDD principles | Eval workflow tooling (Kronenberg) |
| Statistical AI eval platforms | Large-scale input permutations + rubric aggregation | Non-deterministic chatbot/agent QA (category per Sandman) |

---

## Reading order (if learning top to bottom)

1. §1–2 — why different, two challenges, decompose layers  
2. §3 — correct, fit-for-purpose metrics, scale agents  
3. §7.1–7.2 — EDD workflow + bootstrap  
4. §4 — component evals  
5. §5 — by agent type + benchmarks  
6. §6 — security + compliance  
7. §7.3–7.11 — process, alignment, adoption, 14 principles map  
8. §8–9 — AI helping QA + maintenance

---

*Paraphrased from linked sources. One topic, one place — no duplicate “mindset” or “EDD” sections.*
