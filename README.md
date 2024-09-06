# ProjetNode

Ce projet est une application web représentant un service de réservation de chambre d'hôtel.

L'application est réalisée avec différents outils/frameworks, voici les principaux :
- Express.js
- React.js
- Drizzle
- Socket.io

## Installation :
- Installer node, npm et pnpm : 

    `node install` & `npm install` & `npm install pnpm`

- Installer les dépendances :

    `pnpm install argon2 cookie cookie-parser cors dotenv drizzle-orm ejs express helmet jsonwebtoken multer pg postgres socket.io Winston zod`

- Si vous souhaitez contribuer à ce projet, il faudra aussi installer :

    `pnpm install --save-dev drizzle-kit @types/pg @types/cookie @types/cookie-parser @types/cors @types/express @types/jest @types/jsonwebtoken @types/multer @types/node @types/pg @types/supertest concurrently jest nodemon supertest ts-jest ts-node typescript tsx`

- Pour démarrer l'application, exécuter :

    `pnpm dev`