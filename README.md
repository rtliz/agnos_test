# Agnos Test

Agnos Test is a modern Next.js + TypeScript web application for managing patient forms, staff views, and real-time updates via socket.io.

## Features

- Patient form management (create, view, update, submit)
- Staff real-time form view
- Socket.io integration for live updates
- Responsive UI with Tailwind CSS
- API routes for genders, religions, patient forms

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Socket.io
- Axios

## Getting Started

1. **Install dependencies**
   use node 22.15.0
   ```bash
   npm install
   ```
2. **Run development server**
   ```bash
   npm run dev
   npm run socket:start
   ```
3. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/app          # App directory (features, api, shared)
src/app/shared   # Shared components, enums, types, data
src/app/hooks    # Custom React hooks
src/app/lib      # Utility libraries (e.g. socketClient)
src/app/styles   # SCSS/CSS files
public           # Static assets (images, icons)
```

## API Endpoints

- `/api/genders` - Get gender options
- `/api/religions` - Get religion options
- `/api/patient-forms` - Manage patient forms

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run socket:start` - Start socket server

## License

MIT

---

For more information, see the source code or contact the project owner.
