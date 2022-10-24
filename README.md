1. clone the repo
### `git clone https://github.com/davesagraf/nestify-frontend.git`

2. install dependencies
### `cd nestify-frontend && npm install`

3. start the app
### `npm run dev`

this will run the app in the development mode.\
Open [http://http://localhost:5173](http://http://localhost:5173) to view it in the browser.

5173 is the default port for the React client with Vite.
You can change these settings for your backend & frontend, if you wish.

4. to run the backend as well, clone:
### `git clone https://github.com/davesagraf/nestify.git`

5. install dependencies:
### `cd nestify && npm install`

6. start the NestJS server in dev mode:
### `npm run start:dev`

7. check proxy and CORS settings for the backend & the frontend:
### in `nestify-frontend/vite.config.ts` add:
server: {
    proxy: {
      "/api": {
        target: "http:your-backend-localhost-URL",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
### in`nestify/src/main.ts` change:
`const app = await NestFactory.create(AppModule);`
### to
`const app = await NestFactory.create(AppModule, { cors: true });`
