# LibraHub

LibraHub is a modern library management web application built with React, TypeScript, Redux Toolkit, and Vite. It allows users to manage books, borrow records, and view summaries with a clean, responsive UI.

## Features

- View, add, edit, and delete books
- Borrow books and track borrow summary
- Responsive design with light/dark mode toggle
- Toast notifications for user feedback
- Modern UI components powered by [shadcn/ui](https://ui.shadcn.com/)
- State management with Redux Toolkit and RTK Query
- TypeScript for type safety

## Tech Stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Router](https://reactrouter.com/)
- [Sonner](https://sonner.emilkowal.ski/) for notifications

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/smanas1/Assignment04-client.git
   cd Assignment04-client
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

4. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

### Build for Production

```sh
npm run build
```

### Lint the code

```sh
npm run lint
```

## API

This client is configured to connect to the backend API at:

```
https://assignment04-server.smanas.net/api
```

You can find the server source at [Assignment04-server](https://github.com/smanas1/Assignment04-server).

## Customization

- **Theme:** Toggle between light, dark, and system themes using the mode toggle in the header.
- **UI Components:** All UI components are customizable and built using [shadcn/ui](https://ui.shadcn.com/).

## License

This project is licensed under the MIT License.

---

**LibraHub** &copy; 2025. All
