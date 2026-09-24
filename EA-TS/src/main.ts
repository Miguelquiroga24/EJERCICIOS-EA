/**
 * SEMINAR 2: TYPESCRIPT DEMO
 * From basic types to Advanced Engineering Patterns
 */

// --- 1. PRIMITIVES & INFERENCE ---
let myName: string = "Aaron"; //
let height: number = 1.78;   //
let isDone: boolean = true;  //

// Type Inference: TS knows this is a number without explicit declaration
let counter = 0; //

// --- 2. FUNCTIONS & OPTIONALITY ---
// Function with default and explicit return type
function greets(name: string = "Roc"): string {
  return `Hello ${name}`;
}

// Function with optional parameter (?)
function addThree(x: number, y: number, z?: number): number {
  return (z !== undefined) ? x + y + z : x + y;
}

// --- 3. INTERFACES ---
interface User {
  readonly id: number; // Cannot be reassigned
  name: string;
  email: string;
  age?: number;        // Optional property
}

// Structural Typing Demo (Duck Typing)
const printUser = (user: User): void => {
  console.log(`User ${user.id}: ${user.name}`);
};

// Valid because it satisfies the "shape" of User
const newUser = { id: 1, name: "Alice", email: "a@test.com", extra: "ignored" };
printUser(newUser);

// --- 4. ADVANCED TYPES (UNIONS & ENUMS) ---
// Union Types: Allowing multiple types for a single variable
let userId: number | string;
userId = 101;
userId = "A101";

enum UserRole { //
  Admin = "ADMIN",
  Editor = "EDITOR",
  User = "USER"
}

let currentUserRole: UserRole = UserRole.Admin;

// --- 5. GENERICS: REUSABLE ENGINEERING ---
// A generic wrapper for API responses
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Usage with the User interface
const response: ApiResponse<User> = {
  data: { id: 2, name: "Bob", email: "b@test.com" },
  status: 200,
  message: "Success"
};

// --- 6. TYPED ASYNCHRONY (THE API BRIDGE) ---
interface ApiUser {
  id: number;
  name: string;
  username: string;
}

async function fetchUser(id: number): Promise<ApiUser> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data: ApiUser = await response.json(); 
  return data;
}

userId = 1;
fetchUser(userId).then(user => console.log(user));


// --- 6. LA COMPARATIVA JS (ON TS ENS SALVA) ---

// En JavaScript (JS)
// function addJS(a, b) { return a + b; }
// addJS(5, "5"); 

// En TypeScript (TS)
function addTS(a: number, b: number): number {
  return a + b;
}
// addTS(5, "5"); // ❌ TS ens dóna error abans d'executar.