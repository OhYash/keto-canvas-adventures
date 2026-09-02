---
title: "Building INR Finance Compass: Public Devlog & Status"
date: "2026-09-02"
readTime: "6 min read"
summary: "A live build log and architecture audit of INR Finance Compass, a self-hosted personal finance engine with atomic ledger balances and zero external APIs."
tags: ["Build Log", "Personal Finance", "Supabase", "React", "TypeScript", "Architecture"]
---

# Building INR Finance Compass: Public Devlog & Status

Most personal finance apps suffer from one of three structural flaws: they demand read access to your bank accounts via invasive Account Aggregators or SMS scrapers, they enforce US-centric monthly credit workflows where Indian multi-currency and domestic banking realities are an afterthought, or they store your net worth on someone else's cloud infrastructure.

I started building **INR Finance Compass** to solve this permanently for my own finances.

The mandate is simple: a self-hosted, personal finance tracker designed from the ground up for INR-primary multi-currency management. Zero external APIs required. Powered by Supabase (PostgreSQL with strict Row Level Security) and React 18. Owned entirely by the user.

This page is a **living build log and public status tracker**. As new architecture lands, invariants solidify, and milestones ship, I update this log directly.

---

## 1. Current Build Status (Live Snapshot)

Here is where the codebase stands as of **September 2026**:

| Metric / Dimension | Current State | Detail |
| :--- | :--- | :--- |
| **Release Phase** | **Active Alpha (Feature-Complete Core)** | Full account CRUD, transactions, statement import, and passbook audit live |
| **Automated Tests** | **544 passing across 42 suites** | 99.5% library unit test coverage + Supabase RPC integration test harness |
| **Compiler & Lint** | **Clean (0 errors, 0 warnings)** | Strict TypeScript (`noImplicitAny`, strict nulls) + ESLint CI gate |
| **Live Dev Preview** | **Deployed on Surge** | [finance-compass-dev.surge.sh](https://finance-compass-dev.surge.sh/) |
| **Backend & DB** | **Supabase Cloud / Postgres 15** | Row-Level Security (`auth.uid()`) on all 12 tables, PL/pgSQL atomic RPCs |

---

## 2. Interface Previews

Below are visual snapshots of the system interface. The UI is designed for high information density, fast scanning, and keyboard-first entry using Tailwind CSS and shadcn/ui primitives.

![INR Finance Compass – Real-time Net Worth & Ledger Dashboard](/images/posts/inr-finance-compass/dashboard-preview.svg)

> *Figure 1: The primary dashboard view — liquid balances vs true net worth, credit card liability tracking, point-in-time net worth trend, and statement-anchored account cards.*

![High-Density Transactions Passbook with Balance Gap Detection](/images/posts/inr-finance-compass/transactions-passbook.svg)

> *Figure 2: The high-density passbook — statement narration vs user remarks separation, anchor balance tracking, and real-time ledger gap discrepancy monitoring.*

---

## 3. Core Architectural Invariants

A finance tracker that produces inaccurate math or silently drifts from reality is worse than a spreadsheet. To prevent drift, I designed the system around six non-negotiable architectural invariants:

### Invariant 1: Ledger-Derived Balances via Atomic RPCs
Account balances are never stored as mutable numbers in the database. All balance changes are derived directly from transactions via the `accounts_with_balance` view. Every mutation executes through atomic PL/pgSQL stored procedures (`create_transaction_with_balance_update`, `bulk_create_transactions`, `update_*`, `delete_*`). A PostgreSQL trigger strictly rejects any direct `UPDATE` or `INSERT` targeting `accounts.balance`.

### Invariant 2: Ground-Truth Bank Balance Anchoring
Bank statements provide ground truth. When importing or entering transactions, the statement balance is recorded on the transaction (`transactions.balance`). The ledger calculation engine (`account_derived_balance`) anchors to the latest verified statement balance and replays subsequent transactions from that anchor point. This isolates historical data entry gaps and prevents balance drift.

### Invariant 3: Discrepancy & Balance Gap Detection
If a transaction is missing or an opening balance was entered incorrectly, the system shouldn't silently shrug. The discrepancy engine (`src/lib/balanceGaps.ts`) compares calculated running totals against the recorded bank statement anchor balances. If an unaccounted difference exists, an inline alert is surfaced in the passbook table and the Dashboard Notification panel with exact account attribution.

```typescript
// Discrepancy calculation isolated from UI search slices
export function detectBalanceGaps(
  transactions: TransactionWithBalance[],
  account: Account
): BalanceGap[] {
  // Evaluates statement anchor points against derived running sum
  // Surfaces discrepancies without polluting client filter results
}
```

### Invariant 4: Polymorphic Bank Statement Importers
Different Indian banks format statements unpredictably. Some output reverse-chronological CSVs; others use Excel files with merged title banners and summary footer rows. 

I built an object-oriented statement importer hierarchy (`BaseBankImporter`, `IndusIndImporter`, `HdfcImporter`, and `GenericImporter`) managed by a `BankImporterRegistry`. It handles CSV, TSV, and Excel (`.xlsx`), strips decorative headers/footers, maps custom columns, and enforces deterministic monotonic intra-day timestamping so transactions retain their exact statement sequence.

### Invariant 5: Clean Separation of Narration vs. Remarks
Bank statement narrations (`UPI/Blinkit/Groceries/984210/ICICI...`) are noisy but essential for auditing. User notes ("Weekly grocery run") are contextual. 

In earlier versions, these fought for the same field. The system now separates them completely:
- `transactions.description` stores the immutable raw statement narration.
- `transactions.remarks` stores user notes, rendered as a subtle contextual subtitle beneath the narration.
- `transactions.payee` is strictly reserved for actual counterparties, preventing regex heuristics from polluting the payee database.

### Invariant 6: True Linked Transfers
Transfers between accounts are modeled as linked two-leg pairs (`create_transfer`). Both legs must sum to zero. When viewing monthly spending on the Dashboard, transfer transactions are automatically excluded so moving money between your savings account and cash wallet does not register as phantom expenditure.

---

## 4. What Shipped Recently (August – September 2026)

Recent development sprints have focused on performance, ledger integrity, and statement import automation:

- **Passbook UX & Performance Overhaul**: Replaced heavy DOM-nested Radix Tooltips with native title attributes, memoized table row components, cached `Intl.NumberFormat` formatters, added a pulsing table skeleton loader during fetch, and isolated discrepancy detection from client-side search filters.
- **HDFC & IndusInd Statement Engines**: Added dedicated importer presets with automatic header detection, currency parsing, and credit/debit sign normalization.
- **Anchor-Aware Net Worth Trend**: Replaced naive cumulative sum charts with point-in-time net worth calculation (`computeNetWorthHistory`) that steps account balances across statement anchor points accurately.
- **Hook Contract Normalization**: Standardized user-scoping (`.eq('user_id', user.id)`) and hard `{ count: 'exact' }` rowcount delete assertions across all 8 data hooks to prevent silent false-positive toasts.
- **Smart Pre-commit DX**: Configured local pre-commit hooks running type checks, linting, and targeted unit tests in under 3 seconds before each commit.

---

## 5. Upcoming Roadmap & Next Milestones

Here is what is currently queued on the product roadmap:

### 1. Bank Statement Reconciliation Workflow
A dedicated workflow to mark accounts "reconciled as of Date D = ₹X" against real bank statements. Features an automated diff-to-statement counter, uncategorized balancing adjustments for small discrepancies, and the ability to lock historical reconciled periods against accidental edits.

### 2. First-Class Indian Instrument Accounts
Expanding beyond liquid bank accounts to track long-term Indian investment instruments:
- **Provident Funds & Pension**: EPF (Employee Provident Fund), PPF, and NPS (National Pension System).
- **Market Assets**: Mutual Funds, Equities / Stocks, and Sovereign Gold Bonds / Physical Gold.
- **Fixed Income**: Fixed Deposits (FD) and Recurring Deposits (RD).

Valuations will be maintained via a deliberate monthly valuation ritual rather than brittle live API scraping, keeping the system 100% offline-capable and API-independent.

### 3. Portfolio Analytics & Allocation
Building on `src/lib/portfolio.ts` to compute true annualized returns (XIRR), equity-to-debt asset allocation percentages, and asset drift without providing algorithmic "financial advice".

### 4. Category Budget Caps with Threshold Alerts
Per-category spending limits per period with progress bars and threshold notifications (e.g. alert when dining exceeds 80% of budget) without the friction of zero-sum envelope budgeting.

---

## 6. How to Follow & Inspect

- **Live Preview Build**: [finance-compass-dev.surge.sh](https://finance-compass-dev.surge.sh/)
- **Source Architecture**: React 18, TypeScript, Vite, Supabase, Tailwind CSS, shadcn/ui.
- **Updates**: This devlog will be updated as major architectural milestones and version releases land. If you have questions about the ledger architecture or self-hosting setup, feel free to reach out via the [Contact](/contact) section.
