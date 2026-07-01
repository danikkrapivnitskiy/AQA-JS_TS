# TypeScript / JS — SDET Cheatsheet (Senior)

Brief reference for technical interviews. Based on the `JSTutorial` / `TSTutorial` course + typical Senior SDET questions.

**Theory & quick reference — this file.** Full code solutions → [INTERVIEW_PREP_ANSWERS.md](./INTERVIEW_PREP_ANSWERS.md)  
**Word:** [SDET_TS_Cheatsheet.docx](./SDET_TS_Cheatsheet.docx) (regenerate: `pandoc SDET_TS_Cheatsheet.md -o SDET_TS_Cheatsheet.docx`)

---

## Table of Contents

| Part | Sections | Topic |
|------|----------|-------|
| **I** | §1–§12 | JavaScript — fundamentals |
| **II** | §13–§19 | Async, Event Loop, Fetch, npm |
| **III** | §20–§21 | JS reference & quick answers |
| **IV** | §22–§24.5, §23b | TypeScript — types, narrowing, unions, utility, generics |
| **V** | §25–§27 | TS practice — map/filter, prototype, recursion |
| **VI** | §27b–§30 | OOP, SOLID, CRUD |
| **VII** | §31–§35 | Enum, traps, design patterns, checklist |

---

# Part I — JavaScript: Fundamentals

## 1. `==` vs `===` and Type Coercion

**❓ Difference between `==` and `===`?**

`==` — loose comparison (type coercion). `===` — strict, no coercion. **Always use `===`.**

```js
5   == '5'          // true  ← coercion
5   === '5'         // false
0   == false        // true
0   === false       // false
''  == false        // true
null == undefined   // true
null === undefined  // false
NaN == NaN          // false
Number.isNaN(NaN)   // true  ← correct NaN check
```

**❓ What will this print?**

```js
console.log(1 + '2');       // '12'
console.log('5' - 3);       // 2
console.log(true + true);   // 2
console.log([] + []);       // ''
console.log([] + {});       // '[object Object]'
```

> ⚠️ `typeof null === 'object'` — historical JS bug. For `null`, use `=== null`.

---

## 2. Pass by Value vs Pass by Reference

```js
// Primitives — by VALUE
let a = 5, b = a; b = 10;
console.log(a); // 5

// Objects/arrays — by REFERENCE
const obj1 = { x: 1 };
const obj2 = obj1;
obj2.x = 99;
console.log(obj1.x); // 99

const arr1 = [1, 2, 3];
const arr2 = arr1;
arr2.push(4);
console.log(arr1); // [1, 2, 3, 4]
```

**Copies:**

```js
const shallow = { ...obj1 };           // shallow
const deep    = structuredClone(obj);  // deep (ES2022)
const arrCopy = [...arr1];             // shallow array copy
```

> ⚠️ `const` does not protect against object mutation — only against reassigning the variable.  
> More on copies: **§12**, arrays — **§26**.

---

## 3. Spread (`...`)

Expands array elements or object properties.

```js
const copy    = [...original];
const all     = [...smoke, ...regression];
const updated = { ...user, age: 31 };
Math.max(...nums);
const merged  = { ...defaults, ...overrides };
```

> ⚠️ Spread is a **shallow copy**. Nested objects remain shared.

---

## 4. Rest (`...`)

Same syntax, opposite action — **collects**.

```js
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, v) => acc + v, 0);
}

const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first=1, rest=[3,4,5]

const { name, ...others } = { name: 'Alex', age: 30, role: 'admin' };
// others = { age: 30, role: 'admin' }
```

> ✅ Spread expands, rest collects. Meaning depends on context.

---

## 5. Regular Functions vs Arrow Functions

| | `function` | `=>` |
|---|---|---|
| `this` | own (depends on call site) | lexical (where defined) |
| `arguments` | available | not available (use rest) |
| `new` | allowed | not allowed |
| hoisting | declaration — yes | no |
| object method | ✅ | ❌ (`this` undefined) |

```js
const obj = {
  name: 'Alex',
  greet: () => console.log(this.name),  // undefined!
  hello() { console.log(this.name); }   // 'Alex' ✓
};

class Timer {
  start() {
    setTimeout(() => console.log(this), 1000);  // this = Timer ✓
  }
}
```

---

## 6. Function Declaration vs Expression

```js
// Declaration — hoisting, can call BEFORE definition
console.log(add(1, 2)); // 3 ✓
function add(a, b) { return a + b; }

// Expression — only the name is hoisted (TDZ for let/const)
console.log(mul(2, 3)); // TypeError
const mul = function(a, b) { return a * b; };
```

---

## 7. `this`

Depends on **how the function is called**:

```js
user.greet();                    // this = user
fn();                            // undefined (strict) / window
say.call({ name: 'Bob' });       // this = passed object
const p = new Person('John');    // this = new object
```

> ⚠️ Destructured method loses `this`: `const { greet } = user; greet();` → `undefined`

---

## 8. Hoisting

```js
console.log(x); var x = 5;     // undefined (not an error)
console.log(y); let y = 10;    // ReferenceError (TDZ)

hello();                       // ✓ declaration hoisted entirely
function hello() {}

greet();                       // TypeError — expression, greet = undefined
var greet = function() {};
```

---

## 9. Scope

```js
function outer() {
  if (true) {
    var blockVar = 'var';    // visible in outer!
    let blockLet = 'let';    // only inside {} block
  }
  console.log(blockVar);  // ✓
  console.log(blockLet);  // ReferenceError
}
```

> ⚠️ `var` has no block scope. `for (var i...)` — classic trap.

---

## 10. Closure

A function "remembers" variables from its lexical scope.

```js
// Counter — JSTutorial hw_8/task_1
function makeCounter(start = 0) {
  let counter = start;
  return () => {
    console.log(`Function was called ${counter} times`);
    counter++;
  };
}

// var trap in loop → 3 3 3
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Fix: let i or IIFE
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0 1 2
}
```

**Unique random numbers via closure** (`hw_8/task_2`):

```js
function uniqueRandom(n) {
  const seen = new Set();
  return () => {
    if (seen.size === n) return 'All numbers were received';
    let num;
    do { num = Math.floor(Math.random() * n) + 1; } while (seen.has(num));
    seen.add(num);
    return num;
  };
}
```

---

## 11. Callback

A function passed as an argument and invoked later.

```js
function runTest(name: string, onDone: () => void) {
  console.log('Running', name);
  onDone();
}

// Callback hell → solved with Promise / async-await
const token   = await login(user);
const profile = await getProfile(token);
```

**Typing a callback** (`TSTutorial/hw_1/task_2`):

```ts
type NumberPredicate = (n: number) => boolean;

function filter(nums: number[], callback: NumberPredicate): number[] {
  const result: number[] = [];
  for (const n of nums) {
    if (callback(n)) result.push(n);
  }
  return result;
}

filter([1, -5, 2, 3, 4, 133], n => n > 3); // [4, 133]
```

---

## 12. Copying Objects

> Shallow copy of arrays also: **§2**, **§26**.

```js
const c1 = { ...original };              // shallow
const c2 = Object.assign({}, original);  // shallow
const d1 = JSON.parse(JSON.stringify(o)); // deep, but loses Date/Function/undefined
const d2 = structuredClone(original);    // deep — best choice
```

---

## 13. Array Methods — Quick Reference

| Method | Returns | Mutates? | Example |
|--------|---------|----------|---------|
| `map` | new array (same length) | no | `[1,2,3].map(x=>x*2)` → `[2,4,6]` |
| `filter` | new array (≤ length) | no | `.filter(x=>x>1)` |
| `find` | element or `undefined` | no | `.find(x=>x>1)` → `2` |
| `findIndex` | index or `-1` | no | |
| `some` | `boolean` | no | at least one |
| `every` | `boolean` | no | all |
| `forEach` | `undefined` | no | side effects only |
| `reduce` | single value | no | `.reduce((a,x)=>a+x, 0)` |
| `flat(depth?)` | flattened array | no | `[[1],[2]].flat()` → `[1,2]` |
| `includes` | `boolean` | no | |
| `indexOf` | index or `-1` | no | |
| `slice` | partial copy | no | `arr.slice()` = shallow copy |
| `splice` | removed elements | **yes** | mutates original |
| `push/pop/shift/unshift` | — | **yes** | |
| `sort` | sorted array | **yes** | always pass comparator for numbers |
| `at` | element at index | no | `arr.at(-1)` — last element |

> ⚠️ `forEach` → `undefined`, cannot chain. `await` inside `forEach` is ignored — use `for...of` or `Promise.all(arr.map(...))`.

**Patterns from homework:**

```js
// Deduplication — hw_5
const unique = [...new Set(arr)];

// Sum and average — hw_5
const total = prices.reduce((sum, p) => sum + p, 0);
const avg   = total / prices.length;

// Numbers only — hw_5
arr.filter(n => typeof n === 'number' && !Number.isNaN(n));
```

---

# Part II — JavaScript: Async & Runtime

## 14. Promise — States

`pending` → `fulfilled` (resolve) or `rejected` (reject). Transition is **irreversible**.

```js
const p = new Promise((resolve, reject) => {
  ok ? resolve('data') : reject(new Error('fail'));
});

p.then(r => console.log(r))
 .catch(e => console.log(e.message))
 .finally(() => console.log('done'));

async function run() {
  try {
    const result = await p;
  } catch (err) {
    console.log(err.message);
  } finally {
    console.log('done');
  }
}
```

> ✅ `try/catch` catches rejected Promises only with `await`. Without `await` — use `.catch()`.

---

## 15. `Promise.all`, `allSettled`, `race`

```js
// all — parallel, fail-fast (first reject kills everything)
const [u1, u2] = await Promise.all([getUser(1), getUser(2)]);

// allSettled — waits for all, never rejects (hw_9/task_2)
const results = await Promise.allSettled([api1(), api2()]);
results.forEach(r => {
  if (r.status === 'fulfilled') console.log(r.value);
  else console.log(r.reason);
});

// race — first one wins (timeout)
function withTimeout(p, ms) {
  const t = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
  return Promise.race([p, t]);
}
```

> ⚠️ `Promise.all` with 100 requests fails because of one! For partial results — use `allSettled`.

---

## 16. Async / Await

```js
const result = getData();        // Promise { pending } — without await!
const result = await getData();  // actual data

// Sequential: 2s + 2s = 4s
const a = await fetch('/api/a');
const b = await fetch('/api/b');

// Parallel: max(2s, 2s) = 2s
const [a, b] = await Promise.all([fetch('/api/a'), fetch('/api/b')]);
```

**`delay` callback** (`hw_9/task_2`):

```js
function delay(callback, ms) {
  setTimeout(callback, ms);
}
delay(() => console.log('hello'), 2000);
```

**Promise with validation** (`hw_9/task_2`):

```js
function addAsync(a, b) {
  return new Promise((resolve, reject) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      reject(new Error('Arguments must be numbers'));
    } else {
      resolve(a + b);
    }
  });
}
```

---

## 17. Event Loop

```js
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
queueMicrotask(() => console.log('4'));
console.log('5');
// Output: 1  5  3  4  2
```

| Queue | Examples | Priority |
|-------|----------|----------|
| Call Stack (sync) | regular code | 1 |
| Microtask | `Promise.then`, `queueMicrotask` | 2 |
| Macrotask | `setTimeout`, `setInterval`, I/O | 3 |

> ⚠️ `setTimeout(fn, 0)` — not "immediate". Waits for microtask queue to drain.

---

## 18. AJAX / Fetch

```js
const res  = await fetch('https://jsonplaceholder.typicode.com/todos');
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const data = await res.json();
const user1 = data.filter(t => t.userId === 1);
```

> ⚠️ `fetch` does **not** throw on 4xx/5xx! Check `res.ok`.

---

## 19. npm scripts — pre/post hooks

```json
{
  "scripts": {
    "pretest":  "npx tsc --noEmit",
    "test":     "playwright test",
    "posttest": "echo 'Cleanup'"
  }
}
```

`npm run test` → `pretest` → `test` → `posttest`

> ⚠️ `yarn` does not run pre/post hooks automatically (unlike npm).

---

# Part III — JavaScript: Reference

## 20. Spread, Rest, Destructuring — Summary

> Spread and Rest in detail: **§3** and **§4**. Below — brief recap + destructuring.

```js
const merged  = [...arr1, ...arr2];
const updated = { ...obj, key: 'new' };
function log(first, ...rest) {}
const { name, role = 'user' } = user;
const { name: userName } = user;       // rename
const [first, , third] = arr;          // skip
let x = 1, y = 2; [x, y] = [y, x];    // swap
```

---

## 21. Quick Answers — Key Questions

| Question | Answer |
|----------|--------|
| `map` vs `forEach`? | `map` → new array. `forEach` → `undefined`, side effects only |
| `==` vs `===`? | Always `===`. Exception: `x == null` checks both `null` AND `undefined` |
| `var` / `let` / `const`? | `var` — function scope. `let`/`const` — block scope + TDZ. `const` — cannot reassign |
| `null` vs `undefined`? | `undefined` — not initialized. `null` — explicit "no value" |
| `typeof` traps? | `typeof null` → `'object'`. `typeof []` → `'object'`. Use `Array.isArray()` |
| `isNaN` vs `Number.isNaN`? | `isNaN('hello')` → `true` (coercion). `Number.isNaN('hello')` → `false`. For NaN — use `Number.isNaN()` |
| `throw` vs `return Error`? | `throw` — interrupts execution. `return new Error()` — just returns an object, not an error |

---

# Part IV — TypeScript: Type System

## 22. `interface` vs `type`

| | `interface` | `type` |
|---|---|---|
| Extension | `extends`, declaration merging | `&` intersection |
| Objects | ✅ idiomatic | ✅ |
| Union | ❌ | ✅ `"a" \| "b"` |
| Tuple | ❌ | ✅ `[string, number]` |
| Primitives | ❌ | ✅ `type ID = string` |
| Classes | `implements` | `implements` (if object-shaped) |

```ts
interface IUser { name: string; }
interface IUser { age: number; } // declaration merging

type Grade = 'junior' | 'middle' | 'senior' | 'lead';
type Callback<T> = (item: T) => boolean;
```

**Declaration merging — extending global or library types:**

```ts
declare global {
  interface Window {
    myTestFlag: boolean;
  }
}
```

`type` aliases **cannot** be merged — redeclaring `type X = ...` is a compile error.

**At the interview:**
- Object / API contract → `interface`
- Union, utility, complex types → `type`

---

## 22b. `interface` vs `abstract class`

| | `interface` | `abstract class` |
|---|---|---|
| What it is | Contract (object shape) | Class with partial implementation |
| At runtime | Erased (TS only) | Exists in JS after compilation |
| Fields with values | ❌ signatures only | ✅ `protected salary = 0` |
| Method implementation | ❌ signatures only | ✅ shared logic in base class |
| Abstract methods | ❌ | ✅ `abstract calculateSalary()` |
| Constructor | ❌ | ✅ |
| Inheritance | `implements` (multiple) | `extends` (single class) |
| Modifiers | no `protected`/`private` | `public` / `protected` / `private` |

```ts
// TSTutorial/hw_2/task_1
interface Person {
  name: string;
  surname: string;
  experienceYears: number;
  getDetails(): string;  // contract
}

abstract class Employee implements Person {
  protected salary = 0;  // shared state — only in class

  constructor(public name: string, public surname: string, public experienceYears: number) {
    this.salary = this.calculateSalary();  // shared logic in base
  }

  protected abstract calculateSalary(): number;  // children implement
  abstract getDetails(): string;
}

class Developer extends Employee {
  constructor(name: string, surname: string, years: number, private language: 'ts' | 'js') {
    super(name, surname, years);
  }
  protected calculateSalary() { return this.experienceYears * 1000; }
  getDetails() { return `${this.name}, dev, ${this.language}, $${this.salary}`; }
}
```

**When to use what:**
- `interface` — API contract, Page Object, "object must have these methods"
- `abstract class` — shared logic + different behavior in subclasses
- `interface` vs `type` — about typing; `interface` vs `abstract class` — about contract vs inheritance with code

> **Parameter properties:** `constructor(private language: 'ts' | 'js')` — TS automatically creates field `this.language` and assigns the value.

---

## 23. Type Narrowing & Working with Objects

Union / `unknown` → TS doesn't know which fields exist → **narrow** with runtime checks or build types from objects at compile-time.

> **`typeof` — two meanings:** `typeof x` in **code** (runtime, string) vs `typeof x` in **type position** (compile-time). **`in`** too: `'key' in obj` (runtime) vs `K in keyof T` (mapped type).

### 23.1 Tool Map

| Tool | Where | Purpose | Narrows type? |
|------|-------|---------|---------------|
| `typeof x` | runtime | primitives, `function` | yes |
| `Array.isArray(x)` | runtime | array vs object | yes |
| `x instanceof C` | runtime | class / `Date` / `Error` | yes |
| `'key' in obj` | runtime | property exists on union object | yes |
| `obj is T` | TS syntax | custom type guard | yes |
| `keyof T` | compile-time | union of type keys | no (builds type) |
| `typeof value` | compile-time | type of a const value | no (builds type) |
| `Object.keys/values/entries` | runtime | iterate object | weakly (see §23.4) |

### 23.2 Runtime Guards

**`typeof`** — primitives + functions (`TSTutorial/hw_1` union):

```ts
function pad(value: string | number) {
  if (typeof value === 'string') return value.padStart(2);
  return String(value).padStart(2);
}
```

Traps: `typeof null === 'object'`, `typeof [] === 'object'` → for arrays use `Array.isArray()`.

**`'key' in obj`** + **`obj is T`** — object unions (`TSTutorial/hw_1/task_1`):

```ts
interface ItEmployee { name: string; grade: Grade; projectNames: string[]; }
interface IEmployee { name: string; salary: number; }

function isItEmployee(obj: ItEmployee | IEmployee): obj is ItEmployee {
  return 'projectNames' in obj;
}

function getEmployeeInfo(employee: ItEmployee | IEmployee) {
  if (isItEmployee(employee)) {
    console.log(employee.projectNames, employee.grade);
  } else {
    console.log(employee.salary);
  }
}

function isString(x: unknown): x is string {
  return typeof x === 'string';
}
```

> `obj is T` works only if the return type is `x is SomeType`.

**`instanceof`** — classes:

```ts
if (err instanceof Error) console.log(err.message);
```

**Discriminated union** — narrow by shared field (without `in`):

```ts
type Result = { status: 'ok'; data: string } | { status: 'error'; message: string };
if (result.status === 'ok') console.log(result.data);
```

**API test results — discriminated union with `statusCode`** (SDET API testing):

```ts
type ApiSuccess<T> = { status: 'ok'; data: T };
type ApiFailure = { status: 'error'; message: string; statusCode: number };
type ApiResult<T> = ApiSuccess<T> | ApiFailure;

function handleResult<T>(result: ApiResult<T>): T {
  if (result.status === 'ok') {
    return result.data;       // TS knows: data exists
  }
  throw new Error(`${result.statusCode}: ${result.message}`);
}
```

All variants share a literal **`status`** field — that is the discriminant.

**`unknown`** — narrow before use (§23b):

```ts
const raw: unknown = JSON.parse('{}');
if (typeof raw === 'object' && raw !== null && 'id' in raw) { /* ... */ }
```

> ⚠️ **`as SomeType` is an anti-pattern** — `as` tells the compiler "trust me" **without runtime proof**. If you're wrong, bugs slip through silently.
>
> ```ts
> const data = JSON.parse('{}') as User; // compiles, but data may not be User
> ```
>
> **Prefer:** type guard (`obj is User`), discriminated union, or schema validation (zod). Use `as` only when you have **external proof** (e.g. after a runtime check).

### 23.3 Compile-time: `keyof` and `typeof`

```ts
interface IEmployee { name: string; salary: number; isManager: boolean; }
const QA = { name: 'QA', salary: 2000, isManager: true } as const;

type EmployeeKeys = keyof IEmployee;   // 'name' | 'salary' | 'isManager'
type QaType       = typeof QA;         // { readonly name: ...; ... }
type QaKeys       = keyof typeof QA;   // 'name' | 'salary' | 'isManager'
```

**Mapped type** — `in` in type position (not runtime!):

```ts
type ReadonlyAll<T> = { readonly [K in keyof T]: T[K] };
```

Link to utility types → §24 (`Pick`, `Omit`, `Record`). Indexed access `T[K]` → §24.5.

### 23.4 `Object.keys` / `values` / `entries` / `fromEntries`

Runtime iteration (`JSTutorial` HW, `TSTutorial/hw_1/task_2`):

```ts
Object.keys(obj).forEach(k => { /* k: string */ });
Object.values(obj).forEach(v => { /* ... */ });
for (const [key, value] of Object.entries(obj)) {
  console.log(`key = ${key}, value = ${value}`);
}

// count values by typeof — hw_1/task_2
Object.values(object).filter(entry => typeof entry === type).length;
```

| API | Returns | Gotcha |
|-----|---------|--------|
| `Object.keys(obj)` | `string[]` | not `keyof T[]` |
| `Object.values(obj)` | `T[keyof T][]` | union of field values |
| `Object.entries(obj)` | `[string, T[keyof T]][]` | key is always `string` |
| `Object.fromEntries(pairs)` | `Record<string, T>` | duplicates — last wins (§25) |

Enum / test data (`Automation/.../getRandomValue.ts`):

```ts
const values = Object.values(MyEnum);
```

### 23.5 When to Use What

```
Primitive union?     → typeof
Object union?        → shared field (status) OR 'field' in obj OR custom is
Class?               → instanceof
Array?               → Array.isArray
unknown / JSON?      → typeof + null-check + 'prop' in obj
Need type from const?→ typeof obj / as const
Need type keys?      → keyof T (+ Pick/Omit, §24)
Iterate object in JS?→ Object.entries / keys / values
```

**Anti-patterns:** `as Type` instead of guard; `'key' in obj` for primitives; `Object.keys` ≠ `keyof T`.

---

## 23b. Union & Type Transformations

**Union** — "one or the other":

```ts
type Grade = 'junior' | 'middle' | 'senior';
type Employee = ItEmployee | IEmployee;  // → narrowing §23
```

**Intersection** — combine types (`&`):

```ts
type AdminUser = UserType & { role: 'admin' };
```

| | Union `\|` | Intersection `&` |
|---|---|---|
| Meaning | **or** — one of the types | **and** — all requirements combined |
| Use case | `ItEmployee \| IEmployee` | extend a base type with extra fields |
| Objects | must narrow before access | merged shape |

| Transformation | Syntax | Where |
|----------------|--------|-------|
| Utility | `Partial` / `Pick` / `Omit` / `Readonly` / `Record` | §24 |
| Keys / typeof | `keyof T`, `typeof obj` | §23.3 |
| By index | `T[K]`, `IUserSettingsMapper[T]` | §24.5 |
| Narrowing | `typeof`, `in`, `obj is T` | §23.2 |
| Assertion | `value as Type` | only if certain; prefer guard |
| `unknown` vs `any` | `unknown` — narrow first; `any` — disables checks | prefer `unknown` |

**`never` type + `assertNever` exhaustiveness pattern:**

| Type | Meaning | Safe to use without checks? |
|------|---------|----------------------------|
| `any` | Disables type checking | Yes (but you lose safety) |
| `unknown` | "I don't know the type yet" | No — must narrow first |
| `never` | "This value never exists" / unreachable | N/A |

```ts
function assertNever(x: never): never {
  throw new Error(`Unexpected value: ${x}`);
}

type Status = 'ok' | 'error';
function handle(s: Status) {
  switch (s) {
    case 'ok': return;
    case 'error': return;
    default: return assertNever(s); // compile error if case missing
  }
}
```

**Rule:** prefer `unknown` over `any`. Use `never` for impossible states and exhaustiveness checks.

```ts
type Status = 'ok' | 'error';
// discriminated union — narrow by status → §23.2
```

---

## 24. Utility Types

```ts
interface IEmployee { name: string; salary: number; isManager: boolean; }

type PartialEmp  = Partial<IEmployee>;
type NameSalary  = Pick<IEmployee, 'name' | 'salary'>;
type WithoutMgr  = Omit<IEmployee, 'isManager'>;
type ReadonlyEmp = Readonly<IEmployee>;
type Dict        = Record<string, number | string | boolean>;
```

| Utility | What it does | Example |
|---------|-------------|---------|
| `Partial<T>` | all fields optional | `update(id, patch: Partial<T>)` |
| `Pick<T, K>` | **keeps** only keys K | `Pick<IEmployee, 'name' \| 'salary'>` |
| `Omit<T, K>` | **removes** keys K | `Omit<IEmployee, 'isManager'>` |
| `Readonly<T>` | all fields readonly | cannot reassign |
| `Record<K, V>` | object with keys K and values V | `Record<string, number>` |

`keyof` / `typeof` / `Object.*` → §23.

**Mapped types — custom definitions:**

```ts
type ReadonlyAll<T> = { readonly [K in keyof T]: T[K] };

type OptionalAll<T> = { [K in keyof T]?: T[K] };
```

Built-in utilities are mapped types under the hood: `Partial<T> = { [P in keyof T]?: T[P] }`, `Readonly<T> = { readonly [P in keyof T]: T[P] }`.

**Generic Storage** (`TSTutorial/hw_3/task_2`):

```ts
class Storage<T extends { id: number }> {
  private items: T[] = [];
  add(item: Omit<T, 'id'> | T): void { /* auto-id if missing */ }
  update(id: number, patch: Partial<T>): void { /* merge */ }
  remove(id: number): void { /* filter */ }
  getById(id: number): T | undefined { /* find */ }
  getAll(): T[] { return [...this.items]; }
}
```

---

## 24.5. Generics 101

**Why:** one piece of code works with different types without `any`.

```ts
// 1. Basic generic — TSTutorial/hw_2/task_1
function getFirstElement<T>(array: T[]): T {
  return array[0];
}
getFirstElement([1, 2, 3]);    // T = number
getFirstElement(['a', 'b']);   // T = string

// 2. Multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

// 3. Constraint — T is not arbitrary, must match shape X (full Storage → §24)
// class Storage<T extends { id: number }> { ... }

// 3b. T extends UserType — T can be UserType or any extended type
type UserType = { id: number; name: string; email: string };

type AdminUser = UserType & { role: 'admin' };
type GuestUser = UserType & { role: 'guest' };

function getDisplayName<T extends UserType>(user: T): string {
  return `${user.name} <${user.email}>`;  // TS knows: T has id, name, email
}

function findById<T extends UserType>(users: T[], id: number): T | undefined {
  return users.find(u => u.id === id);
}

const admins: AdminUser[] = [
  { id: 1, name: 'Alex', email: 'a@test.com', role: 'admin' },
];
findById(admins, 1);        // T = AdminUser ✓
getDisplayName(admins[0]);   // T = AdminUser ✓
// findById([{ id: 1 }], 1); // ❌ error: missing name, email

// 4. Generic type alias
type ApiResponse<T> = { data: T; status: number };
type Callback<T> = (item: T) => boolean;

// 5. Mapped type + indexed access — different settings per enum (enterprise)
enum USER_TYPES { ADMIN = 'admin', MANAGER = 'manager', CUSTOMER = 'customer' }

interface IUserSettingsMapper {
  [USER_TYPES.ADMIN]:    { canDeleteUsers: boolean; maxProjects: number };
  [USER_TYPES.MANAGER]:  { teamId: string; canApprove: boolean };
  [USER_TYPES.CUSTOMER]: { marketingEmails: boolean };
}

function setSettings<T extends USER_TYPES>(
  userType: T,
  settings: IUserSettingsMapper[T],  // settings type depends on userType
): void {}

setSettings(USER_TYPES.ADMIN, { canDeleteUsers: true, maxProjects: 1 }); // ✅
// setSettings(USER_TYPES.ADMIN, { marketingEmails: true });             // ❌ field from CUSTOMER
```

> `IUserSettingsMapper[T]` — **indexed access type**: correlated arguments without `any` and without overload. Useful for roles, test data, API payloads.

**3 rules for the interview:**

1. `<T>` — type placeholder, substituted at call site
2. `<T extends X>` — constraint: T must match shape X
3. Generics are **erased** at compile time — no generics in compiled JS

**Letters (conventional, not dogma):**

| | Usually |
|---|--------|
| `T` | input type (array element, object) |
| `U` | output type (`map` result) |
| `K` | key |
| `V` | value |

```ts
// T and U can differ — map changes element type
function myMap<T, U>(arr: T[], cb: (v: T, i: number) => U): U[] { ... }
myMap([1, 2, 3], n => String(n));  // T=number, U=string → string[]
```

> **map callback:** type describes 3 args `(value, index, arr)`, but you can write `(num, index) => ...` — extra args ignored at call site. `TCallback` = `MapCallback` — same thing (§25).

---

# Part V — TypeScript: Practice

## 25. Generics & Custom `map` / `filter`

```ts
// TSTutorial/hw_2/task_2
type MapCallback<T, U> = (value: T, index: number, arr: T[]) => U;

function myMap<T, U>(array: T[], callback: MapCallback<T, U>): U[] {
  const result: U[] = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}

myMap([1, 2, 3, 4, 5], (n, i) => n * i); // [0, 2, 6, 12, 20]

function myFilter<T>(array: T[], predicate: (item: T) => boolean): T[] {
  const result: T[] = [];
  for (const item of array) {
    if (predicate(item)) result.push(item);
  }
  return result;
}
```

**`generateObject` from pairs** (`hw_2/task_2`):

```ts
function generateObject<T>(pairs: [string, T][]): Record<string, T> {
  return Object.fromEntries(pairs); // last key wins
}

// preparation: type TCallback<T,U> = MapCallback<T,U>
// fn(array, (num, index) => num * index) → T=number, U=number
```

---

## 26. Extending `Array` / Custom `copy`

```ts
// Shallow copy — preferred
const copy1 = [...arr];
const copy2 = arr.slice();
const copy3 = Array.from(arr);

// Custom copy via prototype (know for interview, use cautiously in prod!)
Array.prototype.copy = function() {
  return [...this];
};

// Extending String — JSTutorial hw_8/task_3
String.prototype.removeSpecialCharacters = function() {
  return this.replace(/[^a-zA-Z0-9]/g, '');
};
```

> ⚠️ Mutating global prototypes can break iteration. In tests, prefer pure functions.

---

## 27. Recursion

**Digital root** (`JSTutorial/hw_5/task_3`):

```js
function sumOfDigits(number) {
  if (number < 10) return number;
  const sum = String(number).split('').reduce((s, d) => s + +d, 0);
  return sumOfDigits(sum);
}
sumOfDigits(19); // 1+9=10 → 1+0=1
```

**Template:**

```ts
function recurse(input: T): R {
  if (baseCondition) return baseValue;  // base case
  return recurse(smallerInput);         // recursive step
}
```

---

# Part VI — OOP & Architecture

## 27b. 4 Pillars of OOP

| Pillar | Essence | Course example |
|--------|---------|----------------|
| **Encapsulation** | Hide internal state, access via methods | `protected salary`, `private language`, `#username` in JS |
| **Inheritance** | Reuse and extend base class | `Developer extends Employee`, `Coffee extends Meal` |
| **Polymorphism** | One interface — different behavior in subclasses | `Manager` and `Developer` calculate `calculateSalary()` and `getDetails()` differently |
| **Abstraction** | Hide details, work through contract | `interface Person`, `abstract class Employee`, `abstract class Meal` |

```ts
// Polymorphism — one call, different result
const people: Person[] = [new Developer(...), new Manager(...)];
people.forEach(p => console.log(p.getDetails())); // each has its own output

// Encapsulation in JS — hw_8/task_1
class User {
  name = 'Egor';
  #username = 'JSov';           // private field — inaccessible outside
  sayHi() { return `Hello from ${this.name} ${this.#username}`; }
}
```

**Composition vs inheritance:**
- **Inheritance** — `is-a`: `Developer is an Employee`
- **Composition** — `has-a`: `Pizzeria` **contains** `OrderService` (§28, hw_4)

> Full `interface` + `abstract class` + subclasses example → **§22b**

---

## 28. OOP in TypeScript

> Full `Person` → `Employee` → `Developer` example: **§22b**. Below — brief reminder + modifiers.

```ts
// TSTutorial/hw_2/task_1 — brief
abstract class Employee implements Person {
  protected salary = 0;
  constructor(public name: string, public experienceYears: number) {
    this.salary = this.calculateSalary();
  }
  protected abstract calculateSalary(): number;
  abstract getDetails(): string;
}

class Developer extends Employee {
  constructor(name: string, years: number, private lang: 'ts' | 'js') {
    super(name, years);
  }
  protected calculateSalary() { return this.experienceYears * 1000; }
  getDetails() { return `${this.name}, dev, ${this.lang}, $${this.salary}`; }
}
```

**Modifiers:** `public` (default) · `protected` (class + subclasses) · `private` / `#field` · `readonly`

**Pizzeria** (`TSTutorial/hw_4`) — `Meal` → `Coffee`/`Pizza`, `Order`, `OrderService`, `Pizzeria` — composition + order state machine. Patterns → §34.

---

## 29. SOLID — Brief for SDET

| Principle | Essence | Page Object / test example |
|-----------|---------|---------------------------|
| **S** Single Responsibility | one class — one reason to change | One page class = one page/section. Split `LoginPage` from `DashboardPage` |
| **O** Open/Closed | extend, don't modify | Extend via composition (`BasePage` + mixins), not copy-paste selectors. New `LoginPage extends BasePage` |
| **L** Liskov Substitution | subclass replaces parent | Subclass pages honor base contract — `navigate()` always returns ready page. `Developer extends Employee` without surprises |
| **I** Interface Segregation | small interfaces | Small interfaces: `IHasSubmit`, `IHasTable` — don't force unused methods. `IMeal.calculatePrice()` separate from `IOrder` |
| **D** Dependency Inversion | depend on abstractions | Tests depend on `ILoginPage` interface, not concrete Playwright locators. Inject `page` in constructor. API client through interface, not hardcoded fetch |

---

## 30. CRUD Pattern

**Enterprise CRUD** (`JSTutorial/hw_6/task_2`):

```
Read    → getEnterpriseName(id | deptName)
Create  → addEnterprise, addDepartment
Update  → editEnterprise, editDepartment
Delete  → deleteEnterprise, deleteDepartment (only if employees_count === 0)
Extra   → moveEmployees(fromId, toId)
```

**Generic Storage** (`TSTutorial/hw_3/task_2`): `add` · `getById` · `getAll` · `update` · `remove`

**`Map` lookup** (`preparation/task_1`):

```ts
function getEmployeeInfo(name: string): Map<string, number> | null {
  const info = new Map<string, number>();
  for (let i = 0; i < names.length; i++) {
    if (name === names[i]) info.set(names[i], salaries[i]);
  }
  return info.size ? info : null;  // not return new Error()!
}
```

---

# Part VII — Reference & Checklist

## 31. Enum vs Union Type

```ts
enum OrderStatus { PENDING = 'Pending', COMPLETED = 'Completed' }
type Grade = 'junior' | 'middle' | 'senior' | 'lead';
```

| | `enum` | union `'a' \| 'b'` |
|---|---|---|
| Runtime | exists in JS | erased at compile time |
| Tree-shaking | worse (numeric enum) | better |
| Interview | know both | string union — modern default |

---

## 32. Common TS Traps

```ts
readonly salary: number;           // cannot reassign
throw new Error('Not found');     // ✅ interrupts flow
return new Error('Not found');    // ❌ not throw, broken type

Number.isInteger(5);              // needs lib ES2015+ in tsconfig

// unknown vs any → §23.2, §23b
const raw: unknown = JSON.parse('{}');
if (typeof raw === 'object' && raw !== null && 'id' in raw) { /* narrowing */ }
```

---

## 33. Homework Patterns

> Full solutions → [INTERVIEW_PREP_ANSWERS.md Part H](./INTERVIEW_PREP_ANSWERS.md#part-h--javascript-homework-solutions)

```js
// Palindrome — hw_4 → ANSWERS H3
w === w.split('').reverse().join('');

// Unique values — hw_4/hw_5 → ANSWERS H4
[...new Set(arr)];

// Bracket validation — hw_5 (stack + flat) → ANSWERS H5
// Quadratic — hw_1: (-b ± √D) / 2a → ANSWERS H6
// Closure counter — hw_8 → ANSWERS Part F
// Promise + finally — hw_9 → ANSWERS Part G
// fetch + filter userId — hw_10 → ANSWERS Part G
// Digital root recursion — §27 → ANSWERS H7
// Enterprise CRUD — §30 → ANSWERS H1
// Map lookup — §30 → ANSWERS H2
```

---

## 34. Design Patterns — Theory

A **pattern** is a proven solution to a common design problem. At Senior SDET interviews they more often ask **meaning** and **where you've seen it**, not implementation by heart.

> **Don't confuse:** **GoF Decorator** (wrapper around object) ≠ **TS decorator** (`@logStep` — metadata/method wrapper syntax).

### Creational

| Pattern | Essence | Example / SDET |
|---------|---------|----------------|
| **Singleton** | One instance per application | `pageFactory` — one object with all Page Objects; config/env |
| **Factory Method** | Parent decides **which subclass** to create | `new Coffee(...)` / `new Pizza(...)` instead of if/else by type (`hw_4`) |
| **Abstract Factory** | Family of related objects | UI factory + API client factory for one environment |
| **Builder** | Step-by-step assembly of complex object | `ItEmployeeBuilder` — fluent API, optional fields |

### Structural

| Pattern | Essence | Example / SDET |
|---------|---------|----------------|
| **Adapter** | Incompatible interface → the one you need | Wrapper over legacy API / third-party SDK in test client |
| **Decorator** | Add behavior **without** changing class | GoF: `LoggedPage extends/wraps BasePage`. TS: `@logStep` around method |
| **Facade** | Simple API over complex subsystem | `OrderService` / `Pizzeria` hide `Order`, `Meal`, statuses (`hw_4`) |
| **Proxy** | Substitute with same interface | Mock/stub instead of real API; `page.route()` intercepts network |

### Behavioral

| Pattern | Essence | Example / SDET |
|---------|---------|----------------|
| **Strategy** | Interchangeable algorithms | `calculatePrice()` for `Coffee` vs `Pizza` — different logic, one call (`hw_4`) |
| **Template Method** | Skeleton in base, details in subclasses | `abstract Meal.calculatePrice()` + shared `getMealInfo()` (`hw_4`) |
| **State** | Behavior changes with **object state** | `OrderService`: `PROCESSING → IN_PROGRESS → COMPLETED → DELIVERED` (`hw_4`) |
| **Observer** | Subscribers react to events | Reporter/listener on test steps; event bus in CI |
| **Command** | Action as object (undo, queue) | Scenario step queue; retry individual command |

### Test Automation Patterns (not GoF, but asked at interviews)

| Pattern | Essence |
|---------|---------|
| **Page Object** | Page = class with locators and actions; test doesn't know selectors |
| **Fixture / DI** | Dependencies (page, user, api) come from outside — Playwright `test.extend` |
| **Factory (test data)** | `getRandomEnumValue`, builders — reproducible data |
| **CRUD** | Create / Read / Update / Delete on collection — §30, `Storage` |

### How to Answer at the Interview

1. **Name** → **why** → **example from code**
2. Singleton vs static: singleton — **controlled** single instance; static class — no inheritance/interface
3. Strategy vs State: Strategy — **choose** algorithm externally; State — object **changes** behavior when state changes
4. Factory vs Builder: factory — **which type** to create; builder — **how to assemble** one complex object
5. Composition vs inheritance: prefer **has-a** for utilities; **is-a** when subclass is the same entity (`Meal → Pizza`) — §27b

---

## 35. Pre-Interview Checklist

- [ ] Event Loop: explain `1 5 3 4 2`
- [ ] 4 OOP pillars + example from hw_2 (§27b)
- [ ] `interface` vs `type` vs `abstract class` (§22, §22b)
- [ ] Write your own `map` / `filter` with generics
- [ ] `Promise.all` polyfill → [ANSWERS Appendix A](./INTERVIEW_PREP_ANSWERS.md#appendix-a--promiseall-polyfill)
- [ ] Mapped type `IUserSettingsMapper[T]` — tie enum to settings (§24.5)
- [ ] `typeof` / `in` / `is` / `Object.entries` — §23
- [ ] Union + `Partial`/`Pick`/`Omit` (§23b, §24)
- [ ] `unknown` vs `any` (§23b, §32)
- [ ] Design patterns: Singleton, Factory, Strategy, State, Template Method — §34
- [ ] SOLID with Page Object example (§29)
- [ ] CRUD on nested objects
- [ ] Recursion with base case
- [ ] `throw` vs `return null`
- [ ] Shallow vs deep copy
- [ ] `Promise.all` vs `allSettled`
- [ ] Why `fetch` doesn't throw on 404

---

*Senior SDET · TypeScript / JavaScript Cheatsheet · EN v1*
