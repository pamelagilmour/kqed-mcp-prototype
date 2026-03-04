The tsconfig.json file tells TypeScript Compiler how to convert your ts files into js files.
---------------------------------------------------------
Key Settings:
Output Settings:

"outDir": "./dist" - Compiled JavaScript goes into the dist/ folder
"rootDir": "./src" - Your source TypeScript is in src/
"sourceMap": true - Creates debugging maps (helps trace errors back to TypeScript)
Module Settings:

"target": "ES2022" - Use modern JavaScript features (async/await, etc.)
"module": "Node16" - Compatible with Node.js ES modules
"moduleResolution": "Node16" - How TypeScript finds imported files
Code Quality:

"strict": true - Enables all strict type-checking (catches bugs early!)
"forceConsistentCasingInFileNames": true - Prevents case-sensitivity issues
What Gets Compiled:

"include": ["src/**/*"] - Only compile files in src/
"exclude": ["node_modules", "dist"] - Ignore dependencies and compiled code
-----------------------------------------------------------
TypeScript has a designated compiler called TypeScript Compiler aka `tsc`.

`tsc` was installed when you run `npm install` (see devDependencies).
It then reads your .ts files,
checks for type errors,
then outputs plain JavaScript .js files.
-----------------------------------------------------------
To further clarify,

When you run `npm run build`,
the `tsc` command from package.json is executed,
which runs `node_modules/.bin/tsc`,

which then reads `tsconfig.json` for settings,
finds all `.ts` files in `src/`,
then compiles them to `.js` files in `dist/`

-----------------------------------------------------------
In Development: You write TypeScript (.ts)
At Compilation: tsc converts to JavaScript (.js)
At Execution: Node.js runs the JavaScript (.js)

Node.js cannot run TypeScript directly - it only understands JavaScript. That's why we need the tsc compiler as a build step.

-----------------------------------------------------------
When you need to rebuild

After editing src/index.ts (the TypeScript source code)

Claude Desktop actually runs dist/index.js (the compiled JavaScript)

When you run npm run build, the TypeScript compiler (tsc) does this:

+ Reads src/index.ts
+ Compiles it to JavaScript
+ Outputs dist/index.js

The Workflow
Edit TypeScript → Build → Claude Desktop Uses Compiled JS
   src/index.ts  → npm run build → dist/index.js


So after EVERY change to your TypeScript code, you need to:

Run npm run build
Restart Claude Desktop (so it picks up the new compiled code)


___________________________________________________________

TypeScript is the "source" (what you write)
JavaScript is the "executable" (what actually runs)
Building is like compiling C code before running it