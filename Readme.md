``` a) Type command:-
npm init -y
b) Add express server using command:-
npm i express @types/express
c) Add the typescript using dev dependencies using command:-
npm install typescript @types/node --save-dev
d) Then to create the tsconfig.json file type :-
npx tsc --init --rootDir src --outDir build --esModuleInterop \
 --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true
e) we have to add all our source code in src folder
f) Make sure our tsconfig.json only include this line code below:-
{
"compilerOptions": {
"target": "es5",
"module": "commonjs",
"lib": ["es6"],
"allowJs": true,
"outDir": "build",
"rootDir": "src",
"strict": true,
"noImplicitAny": true,
"esModuleInterop": true,
"resolveJsonModule": true
}
}

g) To install nodemon with typescript :-
npm install --save-dev ts-node nodemon
h) To configure the nodemon to the project create one nodemon.config file and add the line of code :-
{
"watch": ["src"],
"ext": ".ts,.js",
"ignore": [],
"exec": "npx ts-node ./src/index.ts"
}
```
