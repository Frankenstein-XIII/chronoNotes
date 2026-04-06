# Project Title: ChronoNote TS

A type-safe, full-stack Notes Manager using React, Express, Mongoose, and TypeScript.

## Initial Setup

1. Root: `mkdir chrononote && cd chrononote`

2. Backend:

- `mkdir server && cd server`
- `npm init -y`
- `npm i express mongoose cors dotenv`
- `npm install -D typescript ts-node @types/node @types/express @types/cors nodemon`
- Initialize TS: `npx tsc --init`

3. Frontend:

- `cd .. && npm create vite@latest client -- --template react-ts`
- ` && cd client && npm i axios`

## Phase 1: The Blueprint (Schema & Type System)

1. What? Define the "Source of Truth" for what a Note looks like.
2. Why? TypeScript ensures that the frontend doesn't send "text" when the backend expects "content," preventing runtime crashes.
3. How: Create a shared interface and a Mongoose Schema.
4. Symbolic Annotation:
   - interface INote { title: string; content: string; createdAt: Date; }
   - const NoteSchema = new Schema<INote>({ ... });

## Phase 2: The Gateway (Create & Read)

1. What? Build the API endpoints to save a note to MongoDB and fetch the list.
2. Why? This is the "Minimum Viable Product." Without saving and viewing, the app has no utility.
3. How:
   - Express: router.get('/') calls Note.find(); router.post('/') calls Note.create(req.body).
   - React: Use useEffect to fetch data on mount and a form with useState to post data.
4. Symbolic Annotation:
   - GET /api/notes → res.json(notes)
   - POST /api/notes → body: { title, content }

## Phase 3: The Surgeon (Delete & Update)

1. What? Add the ability to remove or modify existing notes via their unique MongoDB \_id.
2. Why? Users make mistakes or finish tasks; CRUD isn't complete without "U" and "D."
3. How:
   - Backend: router.delete('/:id') and router.patch('/:id').
   - Frontend: Add a trash icon and a "pencil" icon to each note card. Use a modal or inline input for editing.
4. Symbolic Annotation:
   - DELETE /api/notes/:id → Note.findByIdAndDelete(id)
   - PATCH /api/notes/:id → Note.findByIdAndUpdate(id, req.body)

## Phase 4: The Archive (Filtering & Search)

1. What? A search bar to filter notes by title or content in real-time.
2. Why? As the database grows, finding a specific note by scrolling becomes impossible.
3. How:
   - Frontend-only (Easiest): notes.filter(n => n.title.includes(searchQuery)).
   - Backend-assisted (Scalable): Pass a query string like /api/notes?q=work and use Regex in Mongoose.
4. Symbolic Annotation:
   - const filtered = notes.filter(note => note.title.toLowerCase().includes(query))

## Phase 5: The Priority (Pinning Feature)

1. What? A "Pin" toggle to keep specific notes at the top of the list.
2. Why? It adds a layer of organization and moves the project beyond "Basic CRUD."
3. How:
   - Schema: Add isPinned: boolean (default: false).
   - Logic: Sort the array so isPinned: true items appear first.
4. Symbolic Annotation:
   - notes.sort((a, b) => Number(b.isPinned) - Number(a.isPinned))

## Phase 6: The Guard (Validation & Error Handling)

1. What? Strict checks to ensure notes aren't empty and the server doesn't crash on bad IDs.
2. Why? Prevents "ghost" notes (empty title/content) and provides feedback to the user.
3. How: Use try/catch blocks in Express and HTML5 required or Zod validation on the frontend.
4. Symbolic Annotation:
   - if (!title) return res.status(400).json({ message: 'Title is required' })
