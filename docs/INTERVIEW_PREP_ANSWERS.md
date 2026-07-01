# SDET Interview Prep — Solutions & Scenarios

**Cheatsheet (theory, tables, checklist):** [SDET_TS_Cheatsheet.md](./SDET_TS_Cheatsheet.md)  
**Assignments (tasks to practice):** [INTERVIEW_PREP_ASSIGNMENTS.md](./INTERVIEW_PREP_ASSIGNMENTS.md)  
**Word:** [INTERVIEW_PREP_ANSWERS.docx](./INTERVIEW_PREP_ANSWERS.docx) (regenerate: `pandoc INTERVIEW_PREP_ANSWERS.md -o INTERVIEW_PREP_ANSWERS.docx`)

This file contains **full code solutions** and **senior scenario answers only**.  
Theory lives in the cheatsheet — no duplication.

**Difficulty:** ⭐⭐ live coding · ⭐⭐⭐ system design

---

## Table of contents

| Part | Topic | Cheatsheet |
|------|--------|------------|
| [B](#part-b--typescript-homework-solutions) | TS HW 1–4 full solutions | §22–§27 |
| [C](#part-c--capstone--system-design) | Pizzeria, indexed access, state machine tests | §28, §34 |
| [D](#part-d--senior-sdet-scenarios) | API client, builders, mocking, immutability | §29, §34 |
| [H](#part-h--javascript-homework-solutions) | JS HW algorithms & patterns (full code) | §30, §33 |
| [Appendix A](#appendix-a--promiseall-polyfill) | `Promise.all` polyfill | §15, §35 |

---

## Part B — TypeScript Homework Solutions

### Task 1 — Employee model (`TSTutorial/homeworks/hw_1/task_1.ts`)

```ts
export interface ItEmployee {
  name: string;
  surname: string;
  readonly salary: number;
  grade: Grade;
  occupation: OCCUPATION;
  address?: IAddress;
  projectNames: string[];
}

type Grade = 'junior' | 'middle' | 'senior' | 'lead';

enum OCCUPATION {
  DEVELOPER = 'Developer',
  QA = 'Qa',
  SCRUM_MASTER = 'SCRUM_MASTER',
}

interface IAddress {
  country: string;
  street: string;
  house: string;
  flat: number;
}

export const itEmployee: ItEmployee = {
  name: 'Js',
  surname: 'TSov',
  salary: 100_000,
  grade: 'junior',
  occupation: OCCUPATION.SCRUM_MASTER,
  projectNames: ['Nothing', 'Meeting', 'Break'],
};

interface IEmployee {
  name: string;
  surname: string;
  readonly salary: number;
  address: string;
}

function isItEmployee(obj: ItEmployee | IEmployee): obj is ItEmployee {
  return 'projectNames' in obj;
}

function getEmployeeInfo(employee: IEmployee | ItEmployee): void {
  const base = `${employee.name} ${employee.surname} — salary ${employee.salary}$`;
  if (isItEmployee(employee)) {
    console.log(
      `${base}, grade ${employee.grade}, occupation ${employee.occupation}, projects: ${employee.projectNames.join(', ')}`
    );
  } else {
    console.log(`${base}, address: ${employee.address}`);
  }
}
```

---

### Task 2 — `getCountTypeOf` & `filter` (`TSTutorial/homeworks/hw_1/task_2.ts`)

```ts
type CustomerObject = Record<string, string | number | boolean>;
type TypeCount = { string: number; number: number; boolean: number };
type NumberPredicate = (n: number) => boolean;

function countKeys(object: CustomerObject, type: 'string' | 'number' | 'boolean'): number {
  return Object.values(object).filter((v) => typeof v === type).length;
}

function getCountTypeOf(input: CustomerObject | CustomerObject[]): TypeCount {
  const objects = Array.isArray(input) ? input : [input];
  return objects.reduce(
    (acc, obj) => ({
      string: acc.string + countKeys(obj, 'string'),
      number: acc.number + countKeys(obj, 'number'),
      boolean: acc.boolean + countKeys(obj, 'boolean'),
    }),
    { string: 0, number: 0, boolean: 0 }
  );
}

function filter(array: number[], callback: NumberPredicate): number[] {
  const result: number[] = [];
  for (const n of array) {
    if (callback(n)) result.push(n);
  }
  return result;
}

// filter([1, -5, 2, 3, 4, 133], (n) => n > 3);   // [4, 133]
// filter([1, -5, 2, 3, 4, 133], (n) => n % 2 === 0); // [2, 4]
```

---

### Task 3 — `getFirstElement` (`TSTutorial/homeworks/hw_2/task_1.ts`)

```ts
function getFirstElement<T>(array: T[]): T {
  return array[0];
}
```

---

### Task 4 — Abstract Employee hierarchy (`TSTutorial/homeworks/hw_2/task_1.ts`)

```ts
interface Person {
  name: string;
  surname: string;
  experienceYears: number;
  getDetails(): string;
}

abstract class Employee implements Person {
  protected salary = 0;

  constructor(
    public name: string,
    public surname: string,
    public experienceYears: number
  ) {
    this.salary = this.calculateSalary();
  }

  protected abstract calculateSalary(): number;
  abstract getDetails(): string;
}

type TPreferred = 'scrum' | 'kanban';
type TProgrammingLanguage = 'js' | 'ts' | 'java' | 'python';

class Manager extends Employee {
  constructor(
    name: string,
    surname: string,
    experienceYears: number,
    private preferred: TPreferred
  ) {
    super(name, surname, experienceYears);
  }

  protected calculateSalary(): number {
    return this.experienceYears * 500;
  }

  getDetails(): string {
    return `My name is ${this.name} ${this.surname}, I am manager with ${this.experienceYears} years of experience in ${this.preferred} and ${this.salary}$ salary.`;
  }
}

class Developer extends Employee {
  constructor(
    name: string,
    surname: string,
    experienceYears: number,
    private programmingLanguage: TProgrammingLanguage
  ) {
    super(name, surname, experienceYears);
  }

  protected calculateSalary(): number {
    return this.experienceYears * 1000;
  }

  getDetails(): string {
    return `My name is ${this.name} ${this.surname}, I am software developer with ${this.experienceYears} years of experience in ${this.programmingLanguage} and ${this.salary}$ salary.`;
  }
}
```

---

### Task 5 — Generic `map` (`TSTutorial/homeworks/hw_2/task_2.ts`)

```ts
type MapCallback<T, U> = (value: T, index: number, arr: T[]) => U;

function map<T, U>(array: T[], callback: MapCallback<T, U>): U[] {
  const result: U[] = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}

// map([1, 2, 3, 4, 5], (num, index) => num * index); // [0, 2, 6, 12, 20]
```

---

### Task 6 — `generateObject` (`TSTutorial/homeworks/hw_2/task_2.ts`)

```ts
type KeyValuePairs<T> = [string, T][];
type ObjectFromPairs<T> = Record<string, T>;

function generateObject<T>(pairs: KeyValuePairs<T>): ObjectFromPairs<T> {
  return Object.fromEntries(pairs); // last duplicate key wins
}

// generateObject([["1", 1], ["2", 2], ["4", 4], ["4", 5]]);
// → { '1': 1, '2': 2, '4': 5 }
```

---

### Task 7 — Utility type drill (`TSTutorial/homeworks/hw_3/task_1.ts`)

```ts
interface IEmployee {
  name: string;
  salary: number;
  isManager: boolean;
}

const QA: IEmployee = {
  name: 'QA',
  salary: 2000,
  isManager: true,
};

// 1. Union of IEmployee keys
type EmployeeKeys = keyof IEmployee;
// 'name' | 'salary' | 'isManager'

// 2. Keys of the QA object
type QaKeys = keyof typeof QA;
// 'name' | 'salary' | 'isManager'

// 3. Type of the QA object
type UserType = typeof QA;
// { name: string; salary: number; isManager: boolean }

// 4. All fields optional
type PartialEmployee = Partial<IEmployee>;
// { name?: string; salary?: number; isManager?: boolean }

// 5. Pick name and salary only
type NameAndSalary = Pick<IEmployee, 'name' | 'salary'>;
// { name: string; salary: number }

// 6. All fields except isManager
type EmployeeWithoutManagerFlag = Omit<IEmployee, 'isManager'>;
// { name: string; salary: number }

// 7. All fields readonly
type ReadonlyEmployee = Readonly<IEmployee>;
// { readonly name: string; readonly salary: number; readonly isManager: boolean }

// 8. Array of objects with string keys and primitive values
type Value = number | string | boolean;
type FlexibleRecord = Record<string, Value>;
// { [key: string]: number | string | boolean }
```

---

### Task 8 — `Storage<T>` (`TSTutorial/homeworks/hw_3/task_2.ts`)

```ts
class Storage<T extends { id: number }> {
  private storage: T[] = [];

  constructor(items?: T[]) {
    if (items) this.storage = [...items];
  }

  add(item: T): void;
  add(item: Omit<T, 'id'>): void;
  add(item: Omit<T, 'id'> | T): void {
    if ('id' in item && item.id !== undefined) {
      this.storage.push(item as T);
    } else {
      const entity = { id: this.generateId(), ...item } as T;
      this.storage.push(entity);
    }
  }

  update(id: number, patch: Partial<Omit<T, 'id'>>): void {
    const index = this.storage.findIndex((item) => item.id === id);
    if (index === -1) throw new Error(`Entity with id ${id} not found`);
    this.storage[index] = { ...this.storage[index], ...patch };
  }

  remove(id: number): void {
    this.storage = this.storage.filter((item) => item.id !== id);
  }

  getById(id: number): T {
    const item = this.storage.find((e) => e.id === id);
    if (!item) throw new Error(`Entity with id ${id} not found`);
    return item;
  }

  getAll(): T[] {
    return [...this.storage];
  }

  private generateId(): number {
    if (this.storage.length === 0) return 1;
    return Math.max(...this.storage.map((item) => item.id)) + 1;
  }
}
```

---

## Part C — Capstone & System Design

### Task 9 — Indexed access `IUserSettingsMapper[T]`

```ts
enum USER_TYPES {
  ADMIN = 'admin',
  MANAGER = 'manager',
  CUSTOMER = 'customer',
}

interface IUserSettingsMapper {
  [USER_TYPES.ADMIN]: { canDeleteUsers: boolean; maxProjects: number };
  [USER_TYPES.MANAGER]: { teamId: string; canApprove: boolean };
  [USER_TYPES.CUSTOMER]: { marketingEmails: boolean };
}

function setSettings<T extends USER_TYPES>(
  userType: T,
  settings: IUserSettingsMapper[T]
): void {
  console.log(userType, settings);
}

setSettings(USER_TYPES.ADMIN, { canDeleteUsers: true, maxProjects: 5 });
setSettings(USER_TYPES.MANAGER, { teamId: 'qa-1', canApprove: true });
setSettings(USER_TYPES.CUSTOMER, { marketingEmails: false });

// setSettings(USER_TYPES.ADMIN, { marketingEmails: true }); // ❌ compile error
```

`IUserSettingsMapper[T]` ties the enum value to the correct settings shape — no overloads, no `any`.

---

### Task 10 — Pizzeria architecture (`TSTutorial/homeworks/hw_4/`)

#### File roles

| File | Role | Pattern |
|------|------|---------|
| `Enums.ts` | Single source of truth for statuses, payment methods, sizes | Constants / enum |
| `Types.ts` | Contracts: `IOrder`, `IMeal`, `IOrderMealObject` | Interface segregation |
| `Meals.ts` | Domain pricing: abstract `Meal` → `Coffee`, `Pizza` | Template Method + Strategy |
| `Order.ts` | Cart: create orders, merge meals per customer | Factory / aggregation |
| `OrderService.ts` | Status transitions, revenue, queue management | State machine |
| `Pizzeria.ts` | Public facade for the restaurant | Facade + composition |
| `RunningClass.ts` | Demo / integration script | Entry point (like a spec file) |

#### Data flow

```
RunningClass → Order.makeOrder() → Pizzeria.addOrders()
  → OrderService (status queue) → Pizzeria.prepareOrder() / takeTheOrder()
```

#### Status flow (State pattern)

```
PROCESSING ──→ IN_PROGRESS ──→ COMPLETED ──→ DELIVERED
     │
     └──→ PENDING ──→ IN_PROGRESS (when kitchen is busy)
```

- `setStatusToAddedOrders()` — first order goes `PROCESSING → IN_PROGRESS`; next orders go `PROCESSING → PENDING`
- `setPreparedOrderStatusAndTakeInProgressAnother()` — `IN_PROGRESS → COMPLETED`, then promote next `PROCESSING` or `PENDING`
- `setDeliveredStatusToCompletedOrder()` — `COMPLETED → DELIVERED`

#### OOP pillars in hw_4

| Pillar | Example |
|--------|---------|
| **Encapsulation** | `OrderService` private `orders`; `Pizzeria` hides `OrderService` |
| **Inheritance** | `Coffee extends Meal`, `Pizza extends Meal` |
| **Polymorphism** | `meal.calculatePrice()` — different logic per subclass |
| **Abstraction** | `abstract class Meal`, `IMeal` interface |
| **Composition** | `Pizzeria` **has-a** `OrderService` (not is-a) |

---

### State machine — test case design (10 cases)

| # | Scenario | Setup | Action | Expected |
|---|----------|-------|--------|----------|
| 1 | Single order happy path | 1 order `PROCESSING` | `prepareOrder()` → `takeTheOrder()` | `DELIVERED`, revenue updated |
| 2 | First order auto-promoted | Add 1 order | `addOrders()` | Status becomes `IN_PROGRESS` |
| 3 | Second order queued | 2 orders added | `addOrders()` | First `IN_PROGRESS`, second `PENDING` |
| 4 | Prepare completes first | 2 orders, first in progress | `prepareOrder()` | First `COMPLETED`, second `IN_PROGRESS` |
| 5 | Take delivers completed | Order `COMPLETED` | `takeTheOrder()` | Status `DELIVERED`, payment logged |
| 6 | No completed order | Only `IN_PROGRESS` orders | `takeTheOrder()` | Throws: no `COMPLETED` order |
| 7 | Remove by id | Order exists | `removeOrder(id)` | Order removed from list |
| 8 | Remove missing id | Invalid id | `removeOrder(999)` | Logs not found, list unchanged |
| 9 | Revenue calculation | 3 orders various prices | `getTotalRevenue()` | Sum of all order prices formatted |
| 10 | Merge meals same customer | Same customer, 2 meals | `makeOrder()` twice | One order, combined price & items |

---

### Playwright / Jest — mock `fetch` snippets

**Jest:**

```ts
const mockTodos = [{ userId: 1, id: 1, title: 'Test', completed: false }];

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => mockTodos,
  }) as jest.Mock;
});

afterEach(() => jest.restoreAllMocks());

test('filters todos by userId', async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await res.json();
  expect(data.filter((t: { userId: number }) => t.userId === 1)).toHaveLength(1);
});
```

**Playwright (`page.route`):**

```ts
await page.route('**/todos', (route) =>
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([
      { userId: 1, id: 1, title: 'Buy milk', completed: false },
      { userId: 2, id: 2, title: 'Walk dog', completed: true },
    ]),
  })
);

await page.goto('/dashboard');
await expect(page.getByText('Buy milk')).toBeVisible();
await expect(page.getByText('Walk dog')).not.toBeVisible();
```

---

## Part D — Senior SDET Scenarios

### D1 — Generic `ApiClient<T>`

```ts
interface ApiClientConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

class ApiClient {
  constructor(private config: ApiClientConfig) {}

  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${this.config.baseUrl}${path}`, {
      headers: this.config.headers,
    });
    if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
    return res.json() as Promise<T>;
  }

  async post<T, B>(path: string, body: B): Promise<T> {
    const res = await fetch(`${this.config.baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...this.config.headers },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
    return res.json() as Promise<T>;
  }
}

// Usage in tests
type User = { id: number; name: string };
const api = new ApiClient({ baseUrl: 'https://api.test.com' });
const user = await api.get<User>('/users/1');
```

**SDET takeaway:** generic `T` keeps response typing at the call site; inject `baseUrl` / headers for env switching (staging vs prod).

---

### D2 — Safe `JSON.parse` with `unknown`

```ts
function isUser(value: unknown): value is { id: number; name: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof (value as { id: unknown }).id === 'number' &&
    'name' in value &&
    typeof (value as { name: unknown }).name === 'string'
  );
}

function parseUser(json: string): { id: number; name: string } {
  const raw: unknown = JSON.parse(json);
  if (!isUser(raw)) throw new Error('Invalid user payload');
  return raw;
}

// ❌ Anti-pattern: JSON.parse('{}') as User — compiles, no runtime proof
```

---

### D3 — `ItEmployeeBuilder` (Builder pattern)

```ts
class ItEmployeeBuilder {
  private employee: Partial<ItEmployee> = { projectNames: [] };

  withName(name: string): this {
    this.employee.name = name;
    return this;
  }

  withSurname(surname: string): this {
    this.employee.surname = surname;
    return this;
  }

  withSalary(salary: number): this {
    this.employee.salary = salary;
    return this;
  }

  withGrade(grade: Grade): this {
    this.employee.grade = grade;
    return this;
  }

  withOccupation(occupation: OCCUPATION): this {
    this.employee.occupation = occupation;
    return this;
  }

  withProject(name: string): this {
    this.employee.projectNames!.push(name);
    return this;
  }

  build(): ItEmployee {
    const { name, surname, salary, grade, occupation, projectNames } = this.employee;
    if (!name || !surname || salary === undefined || !grade || !occupation) {
      throw new Error('Missing required fields');
    }
    return { name, surname, salary, grade, occupation, projectNames: projectNames ?? [] };
  }
}

const dev = new ItEmployeeBuilder()
  .withName('Alex')
  .withSurname('Test')
  .withSalary(90000)
  .withGrade('senior')
  .withOccupation(OCCUPATION.DEVELOPER)
  .withProject('E2E Suite')
  .build();
```

---

### D4 — Immutable enterprise CRUD

```js
function findNextId(enterprises) {
  const ids = enterprises.flatMap((e) => [e.id, ...e.departments.map((d) => d.id)]);
  return Math.max(0, ...ids) + 1;
}

function findDepartment(enterprises, deptId) {
  for (const ent of enterprises) {
    const dept = ent.departments.find((d) => d.id === deptId);
    if (dept) return dept;
  }
  return null;
}

// Never mutate in place — return new arrays/objects
function addEnterprise(enterprises, name) {
  return [...enterprises, { id: findNextId(enterprises), name, departments: [] }];
}

function addDepartment(enterprises, enterpriseId, deptName) {
  return enterprises.map((ent) =>
    ent.id !== enterpriseId
      ? ent
      : {
          ...ent,
          departments: [
            ...ent.departments,
            { id: findNextId(enterprises), name: deptName, employees_count: 0 },
          ],
        }
  );
}

function deleteDepartment(enterprises, deptId) {
  return enterprises.map((ent) => ({
    ...ent,
    departments: ent.departments.filter(
      (d) => !(d.id === deptId && d.employees_count === 0)
    ),
  }));
}

function moveEmployees(enterprises, fromDeptId, toDeptId) {
  const fromDept = findDepartment(enterprises, fromDeptId);
  if (!fromDept) throw new Error('Source department not found');
  const count = fromDept.employees_count;
  return enterprises.map((ent) => ({
    ...ent,
    departments: ent.departments.map((d) => {
      if (d.id === fromDeptId) return { ...d, employees_count: 0 };
      if (d.id === toDeptId) return { ...d, employees_count: d.employees_count + count };
      return d;
    }),
  }));
}
```

**SDET takeaway:** immutable updates make test assertions predictable (`expect(state).toEqual(expected)`).

---

### D5 — `throw` vs `return null` vs `Result`

| Approach | When | Example |
|----------|------|---------|
| **`throw`** | Unexpected / unrecoverable in caller | `getById` in `Storage` — missing entity breaks flow |
| **`return null`** | Expected "not found" is normal | `getEmployeeInfo(name)` — name may not exist |
| **`Result<T, E>`** | API layer — caller decides | Discriminated union `{ status: 'ok'; data: T } \| { status: 'error'; message: string }` |

```ts
type ApiSuccess<T> = { status: 'ok'; data: T };
type ApiFailure = { status: 'error'; message: string; statusCode: number };
type ApiResult<T> = ApiSuccess<T> | ApiFailure;

function handleResult<T>(result: ApiResult<T>): T {
  if (result.status === 'ok') return result.data;
  throw new Error(`${result.statusCode}: ${result.message}`);
}
```

**Rule:** `return new Error('...')` is **not** throwing — it returns an Error object and continues execution.

---

### D6 — Mock `fetch` in tests

See [Playwright / Jest snippets](#playwright--jest--mock-fetch-snippets) in Part C.

Additional pattern — stub per test:

```ts
test('handles 404', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 404 });
  await expect(fetchUser(1)).rejects.toThrow('404');
});
```

---

### D7 — `pick` utility (without lodash)

```ts
function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) result[key] = obj[key];
  }
  return result;
}

const user = { id: 1, name: 'Alex', email: 'a@test.com', role: 'admin' };
const publicProfile = pick(user, ['id', 'name']);
// { id: 1, name: 'Alex' }
```

Use in tests to strip sensitive fields before snapshot comparison.

---

### D8 — `DeepPartial<T>`

```ts
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type Config = {
  api: { baseUrl: string; timeout: number };
  auth: { token: string };
};

const overrides: DeepPartial<Config> = {
  api: { timeout: 5000 }, // baseUrl optional at every level
};

function mergeConfig(base: Config, patch: DeepPartial<Config>): Config {
  return {
    api: { ...base.api, ...patch.api },
    auth: { ...base.auth, ...patch.auth },
  };
}
```

Useful for test fixtures with partial overrides.

---

### D9 — `Storage` method overload

```ts
class Storage<T extends { id: number }> {
  add(item: T): void;
  add(item: Omit<T, 'id'>): void;
  add(item: Omit<T, 'id'> | T): void {
    // runtime: 'id' in item ? push as-is : generate id
  }
}
```

Overload signatures document intent at compile time; single implementation handles both cases. Use `Omit<T, 'id'>` for items without id, `Partial<T>` for updates.

---

### D10 — Page Object: `interface` vs `abstract class`

| | `interface ILoginPage` | `abstract class BasePage` |
|---|---|---|
| **Runtime** | Erased — no JS output | Exists — can hold shared logic |
| **Use when** | Multiple unrelated implementations (Playwright, mobile, API-only stub) | Shared locators, `goto()`, wait helpers |
| **SDET choice** | Contract for DI / mocking | Base class with `constructor(protected page: Page)` |

```ts
// Interface — swap implementations in fixtures
interface ILoginPage {
  login(email: string, password: string): Promise<void>;
}

// Abstract class — shared wait + navigation
abstract class BasePage {
  constructor(protected page: Page) {}
  async goto(path: string) {
    await this.page.goto(path);
    await this.page.waitForLoadState('networkidle');
  }
}

class LoginPage extends BasePage implements ILoginPage {
  private emailInput = this.page.getByLabel('Email');
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
  }
}
```

**Rule:** depend on `ILoginPage` in tests (Dependency Inversion); extend `BasePage` for shared behavior.

---

## Part H — JavaScript Homework Solutions

### H1 — Enterprise CRUD helpers (`JSTutorial/homeworks/hw_7/task_2.js`)

```js
const enterprises = [
  {
    id: 1,
    name: 'Enterprise 1',
    departments: [
      { id: 2, name: 'QA Department', employees_count: 10 },
      { id: 3, name: 'Marketing', employees_count: 20 },
      { id: 4, name: 'Administration', employees_count: 15 },
    ],
  },
  {
    id: 5,
    name: 'Enterprise 2',
    departments: [
      { id: 6, name: 'Development', employees_count: 50 },
      { id: 7, name: 'Marketing', employees_count: 20 },
      { id: 8, name: 'Safety', employees_count: 5 },
    ],
  },
];

function countEmployees(departments) {
  return departments.reduce((sum, d) => sum + d.employees_count, 0);
}

function printEnterprises(company) {
  company.forEach((enterprise) => {
    const total = countEmployees(enterprise.departments);
    console.log(`${enterprise.name} (${total} employees)`);
    enterprise.departments.forEach((dept) =>
      console.log(`- ${dept.name} (${dept.employees_count} employees)`)
    );
  });
}

function findEnterpriseByDeptKey(company, key) {
  for (const enterprise of company) {
    const dept = enterprise.departments.find(
      (d) => d.id === key || d.name === key
    );
    if (dept) return enterprise.name;
  }
  return null;
}

function getEnterpriseName(key) {
  return findEnterpriseByDeptKey(enterprises, key);
}

function nextId(company) {
  const ids = company.flatMap((e) => [e.id, ...e.departments.map((d) => d.id)]);
  return Math.max(...ids) + 1;
}

function addEnterprise(name) {
  enterprises.push({ id: nextId(enterprises), name, departments: [] });
}

function addDepartment(enterpriseId, deptName) {
  const enterprise = enterprises.find((e) => e.id === enterpriseId);
  if (!enterprise) throw new Error('Enterprise not found');
  enterprise.departments.push({
    id: nextId(enterprises),
    name: deptName,
    employees_count: 0,
  });
}

function editEnterprise(id, newName) {
  const enterprise = enterprises.find((e) => e.id === id);
  if (!enterprise) throw new Error('Enterprise not found');
  enterprise.name = newName;
}

function editDepartment(id, newName) {
  for (const enterprise of enterprises) {
    const dept = enterprise.departments.find((d) => d.id === id);
    if (dept) {
      dept.name = newName;
      return;
    }
  }
  throw new Error('Department not found');
}

function deleteEnterprise(id) {
  const index = enterprises.findIndex((e) => e.id === id);
  if (index !== -1) enterprises.splice(index, 1);
}

function deleteDepartment(id) {
  for (const enterprise of enterprises) {
    const dept = enterprise.departments.find((d) => d.id === id);
    if (dept && dept.employees_count === 0) {
      enterprise.departments = enterprise.departments.filter((d) => d.id !== id);
      return;
    }
  }
  throw new Error('Cannot delete: department not found or has employees');
}

function moveEmployees(fromDeptId, toDeptId) {
  let count = 0;
  for (const enterprise of enterprises) {
    for (const dept of enterprise.departments) {
      if (dept.id === fromDeptId) {
        count = dept.employees_count;
        dept.employees_count = 0;
      }
    }
  }
  for (const enterprise of enterprises) {
    for (const dept of enterprise.departments) {
      if (dept.id === toDeptId) dept.employees_count += count;
    }
  }
}
```

---

### H2 — Map lookup (`JSTutorial/homeworks/hw_5/task_1.js`)

```js
function getEmployeeInfo(name) {
  if (typeof name !== 'string') {
    throw new Error('Name must be a string');
  }

  const names = ['Andy', 'Garfield', 'Tom', 'Jerry', 'Buggy'];
  const salaries = [12, 15, 9, 18, 24];
  const info = new Map();

  for (let i = 0; i < names.length; i++) {
    if (names[i] === name) {
      info.set(names[i], salaries[i]);
      return info;
    }
  }

  return null; // not throw — "not found" is expected
}
```

---

### H3 — Palindrome (`JSTutorial/homeworks/hw_4/task_2.js`)

```js
function isPalindrome(word) {
  const normalized = word.toLowerCase();
  return normalized === normalized.split('').reverse().join('');
}

// isPalindrome('anna');    // true
// isPalindrome('notAnna'); // false
```

---

### H4 — Set dedup (`JSTutorial/homeworks/hw_4/task_2.js`)

```js
function uniqueValues(array) {
  if (!Array.isArray(array)) throw new Error('Expected an array');
  return [...new Set(array)];
}

// uniqueValues([1, 3, 5, 3, 1, 6, 10]); // [1, 3, 5, 6, 10]
```

---

### H5 — Bracket stack validation (`JSTutorial/homeworks/hw_5/task_2.js`)

```js
function hasBalancedBrackets(nested) {
  const flat = nested.flat(Infinity);
  let stack = 0;

  for (const symbol of flat) {
    if (symbol === '(') stack++;
    else if (symbol === ')') stack--;
    else throw new Error(`Unexpected symbol: ${symbol}`);
    if (stack < 0) return false;
  }

  return stack === 0;
}

// hasBalancedBrackets([[['(']], ')', '(', ')', ')', ['(', ['('], [')']]]); // true
// hasBalancedBrackets(['(', ')', ')']); // false
```

---

### H6 — Quadratic equation (`JSTutorial/homeworks/hw_1/task_2.js`)

```js
function solveQuadratic(a, b, c, label) {
  const discriminant = b ** 2 - 4 * a * c;

  if (discriminant < 0) {
    console.log(`Equation ${label}: no real roots`);
    return;
  }

  const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
  const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);

  if (discriminant === 0) {
    console.log(`Answer for equation ${label}: ${x1}`);
  } else {
    console.log(`Answer for equation ${label}: ${x1} and ${x2}`);
  }
}

// x² - 6x + 9 = 0  → one root: 3
solveQuadratic(1, -6, 9, 1);

// x² - 4x - 5 = 0  → two roots: 5 and -1
solveQuadratic(1, -4, -5, 2);
```

---

### H7 — Digital root recursion (`JSTutorial/homeworks/hw_4/task_3.js`)

```js
function digitalRoot(number) {
  if (number < 10) return number;
  const sum = String(number)
    .split('')
    .reduce((acc, digit) => acc + Number(digit), 0);
  return digitalRoot(sum);
}

// digitalRoot(19); // 1+9=10 → 1+0=1 → 1
```

---

### H8 — Find missing number (`JSTutorial/homeworks/hw_5/task_3.js`)

```js
function findMissingNumber(arr) {
  const n = arr.length + 1;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = [...new Set(arr)].reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
}

// findMissingNumber([3, 1, 4, 2, 6, 7, 8]); // 5
```

---

### H9 — Byte converter (`JSTutorial/homeworks/hw_3/task_2.js`)

```js
const UNITS = ['bytes', 'KB', 'MB', 'GB', 'TB'];

function convertBytes(bytes) {
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < UNITS.length - 1) {
    value /= 1024;
    unitIndex++;
  }

  return `${value.toFixed(1)} ${UNITS[unitIndex]}`;
}

// convertBytes(16565846); // '15.8 MB'
```

---

### H10 — Prototype extension (`JSTutorial/homeworks/hw_8/task_3.js`)

```js
String.prototype.removeSpecialCharacters = function () {
  return this.replace(/[^a-zA-Z0-9]/g, '');
};

// 'HE!!LL??OO'.removeSpecialCharacters(); // 'HELLO'
```

> Prefer pure functions in production tests — mutating global prototypes affects all code.

---

### H11 — `Object.values` / `Object.entries` notes (`JSTutorial/homeworks/hw_6/task_1.js`)

```js
const characters = [
  { name: 'Barney', age: 36 },
  { name: 'Fred', age: 40 },
  { name: 'Jack', age: 50 },
];

// Keys
characters.forEach((obj) => Object.keys(obj).forEach((key) => console.log(key)));

// Values
characters.forEach((obj) => Object.values(obj).forEach((val) => console.log(val)));

// Entries — for...of (preferred)
for (const obj of characters) {
  for (const [key, value] of Object.entries(obj)) {
    console.log(`key = ${key}, value = ${value}`);
  }
}

// Count values by typeof — used in TS hw_1/task_2
function countByType(object, type) {
  return Object.values(object).filter((v) => typeof v === type).length;
}
```

| API | Returns | Gotcha |
|-----|---------|--------|
| `Object.keys(obj)` | `string[]` | not `keyof T[]` in TS |
| `Object.values(obj)` | array of values | union of field types |
| `Object.entries(obj)` | `[string, value][]` | key is always `string` |
| `Object.fromEntries(pairs)` | object | duplicate keys — last wins |

---

### H12 — Input validation pattern

```js
function assertString(value, paramName) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new TypeError(`${paramName} must be a non-empty string`);
  }
}

function assertArray(value, paramName) {
  if (!Array.isArray(value)) {
    throw new TypeError(`${paramName} must be an array`);
  }
}

function assertNumber(value, paramName) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new TypeError(`${paramName} must be a valid number`);
  }
}

// Apply at public function boundaries — fail fast with meaningful errors
function getEmployeeInfo(name) {
  assertString(name, 'name');
  // ... lookup logic
}
```

---

### H13 — Closure counter (`JSTutorial/homeworks/hw_8/task_1.js`)

```js
function createCounter(start = 0) {
  let count = start;
  return function counter() {
    console.log(`Function was called ${count} times`);
    count++;
  };
}

const counter = createCounter(0);
counter(); // Function was called 0 times
counter(); // Function was called 1 times
counter(); // Function was called 2 times
```

---

### H14 — Promise async exercises (`JSTutorial/homeworks/hw_9/`)

```js
// 1. setTimeout
setTimeout(() => console.log('After 2 seconds'), 2000);

// 2–4. Promise with then / catch / finally
const successPromise = Promise.resolve('success');
const failPromise = Promise.reject('failed');

successPromise
  .then((result) => console.log(result))
  .catch((err) => console.log(err))
  .finally(() => console.log('finally'));

failPromise
  .then((result) => console.log(result))
  .catch((err) => console.log(err))
  .finally(() => console.log('finally'));

// 5. async resolvePromise with try/catch/finally
async function resolvePromise(promise) {
  try {
    const result = await promise;
    console.log(result);
  } catch (error) {
    console.log(`Failed due to ${error}`);
  } finally {
    console.log('Finished working with promise');
  }
}

await resolvePromise(successPromise);
await resolvePromise(failPromise);

// delay(callback, ms)
function delay(callback, ms) {
  setTimeout(callback, ms);
}

// addAsync — reject if not numbers
function addAsync(a, b) {
  return new Promise((resolve, reject) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      reject(new Error('Arguments must be numbers'));
    } else {
      resolve(a + b);
    }
  });
}

// Promise.all vs allSettled
const p1 = new Promise((r) => setTimeout(() => r('3s done'), 3000));
const p2 = new Promise((r) => setTimeout(() => r('5s done'), 5000));

const [r1, r2] = await Promise.all([p1, p2]);
console.log(r1, r2);

const settled = await Promise.allSettled([p1, p2]);
settled.forEach((r) =>
  r.status === 'fulfilled' ? console.log(r.value) : console.log(r.reason)
);
```

---

### H15 — Fetch todos (`JSTutorial/homeworks/hw_10/api.js`)

```js
const url = 'https://jsonplaceholder.typicode.com/todos';

// async/await + try/catch
async function fetchTodosByUserId(userId) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data.filter((todo) => todo.userId === userId);
  } catch (error) {
    console.log(`Failed due to ${error}`);
    return [];
  }
}

// .then chain
function fetchTodosByUserIdThen(userId) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => data.filter((todo) => todo.userId === userId))
    .catch((error) => {
      console.log(`Failed due to ${error}`);
      return [];
    });
}

fetchTodosByUserId(1);
fetchTodosByUserIdThen(1);
```

---

## Appendix A — Promise.all polyfill

```js
function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const items = Array.from(iterable);
    if (items.length === 0) {
      resolve([]);
      return;
    }

    const results = new Array(items.length);
    let remaining = items.length;

    items.forEach((item, index) => {
      Promise.resolve(item).then(
        (value) => {
          results[index] = value;
          remaining--;
          if (remaining === 0) resolve(results);
        },
        (reason) => reject(reason) // fail-fast on first rejection
      );
    });
  });
}

// Usage
const [a, b] = await promiseAll([
  Promise.resolve(1),
  Promise.resolve(2),
]);
// a === 1, b === 2
```

Key behaviors matching native `Promise.all`:
- Accepts iterable of thenables
- Preserves result order (not completion order)
- Fail-fast — first rejection rejects the whole promise
- Empty iterable resolves to `[]`

---

## Related homework paths

| Task | Path |
|------|------|
| TS HW 1 Task 1 | `TSTutorial/homeworks/hw_1/task_1.ts` |
| TS HW 1 Task 2 | `TSTutorial/homeworks/hw_1/task_2.ts` |
| TS HW 2 Task 1 | `TSTutorial/homeworks/hw_2/task_1.ts` |
| TS HW 2 Task 2 | `TSTutorial/homeworks/hw_2/task_2.ts` |
| TS HW 3 Task 1 | `TSTutorial/homeworks/hw_3/task_1.ts` |
| TS HW 3 Task 2 | `TSTutorial/homeworks/hw_3/task_2.ts` |
| TS HW 4 (Pizzeria) | `TSTutorial/homeworks/hw_4/` |
| JS HW 1 Task 2 (quadratic) | `JSTutorial/homeworks/hw_1/task_2.js` |
| JS HW 3 Task 2 (bytes) | `JSTutorial/homeworks/hw_3/task_2.js` |
| JS HW 4 (strings) | `JSTutorial/homeworks/hw_4/task_2.js`, `task_3.js` |
| JS HW 5 (arrays) | `JSTutorial/homeworks/hw_5/task_2.js`, `task_3.js` |
| JS HW 6 (objects) | `JSTutorial/homeworks/hw_6/task_1.js` |
| JS HW 7 Task 2 (enterprise) | `JSTutorial/homeworks/hw_7/task_2.js` |
| JS HW 8 Task 1 (closure) | `JSTutorial/homeworks/hw_8/task_1.js` |
| JS HW 8 Task 3 (prototype) | `JSTutorial/homeworks/hw_8/task_3.js` |
| JS HW 9 (promises) | `JSTutorial/homeworks/hw_9/additional.js` |
| JS HW 10 (fetch) | `JSTutorial/homeworks/hw_10/api.js` |

---

## Coverage map (Cheatsheet → Answers)

| Cheatsheet section | Answers part |
|--------------------|--------------|
| §1–§12 JS fundamentals | Part H (H3–H6, H11–H12) |
| §13–§19 Async, fetch, Event Loop | Part H (H14–H15), Appendix A |
| §22–§24.5 TS types, utility, generics | Part B (Tasks 1–8), Part C (Task 9) |
| §25–§27 map/filter, recursion | Part B (Tasks 5–6), Part H (H7) |
| §27b–§28 OOP pillars, Pizzeria | Part B (Task 4), Part C (Task 10) |
| §29 SOLID | Part D (D10) |
| §30 CRUD | Part H (H1–H2), Part D (D4) |
| §33 Homework patterns | Part H (H1–H10) |
| §34 Design patterns | Part C (Task 10), Part D (D3, D9–D10) |
| §35 Checklist (Promise.all polyfill) | Appendix A |

---

*Senior SDET · Solutions & Scenarios · EN v3*
