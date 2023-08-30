# RAiD Software Engineering Challenge
https://file.go.gov.sg/ses-swe-homework.pdf

## Tech stack
* Frontend: NextJS (Typescript)
* Backend: ExpressJS (Typescript)
* Database: MongoDB (hosted on Atlas)

## How to run

### Frontend
Edit `src/client/app/constants/constants.ts` to tweak values of constants.


```bash
cd src/client
npm install

# for development
npm run dev     

# for production
npm run build
npm run start
```

### Backend
Add a `.env` file for environment variables. See `.env.sample` for the required variables.

```bash
npm install

# for development
npm run dev     

# for production
npm run build
npm run start
```