
# GitIgnore Generator with Gemini API

A blazing fast React + TypeScript application built using **Vite** that helps you generate `.gitignore` files based on selected technologies. Powered by **Gemini API**, optimized with **react-window** for performance, and enhanced by **custom hooks**, **debouncing**, and **local storage** support.

---

##  Features

- **Smart Technology Selection**  
  Easily search and select from a large list of technologies.

- **Gemini AI Integration**  
  Uses Google’s Gemini API to intelligently generate `.gitignore` files.

- **Custom React Hooks**  
  Clean, modular, and reusable logic built into hooks.

- **Performance Optimized**  
  Uses `react-window` for virtualization and rendering large lists efficiently.

- **Local Storage Support**  
  Remembers your selections even after a page refresh.

- **Debounced Search**  
  Instant and efficient search without overloading the API.

- **Copy & Download Gitignore**  
  View generated `.gitignore`, copy to clipboard, or download as a `.txt` file.


---

##  Installation

```bash
# Clone the repo
git clone [https://github.com/seeranjeeviramavel/gitignore-generator)]https://github.com/seeranjeeviramavel/gitignore-generator)
cd gitignore-generator

# Install dependencies
npm install
```

---

## Usage

```bash
# Run the app
npm run dev
```

1. Use the search bar to find and select technologies.
2. The Gemini API will generate the appropriate `.gitignore` content.
3. View the content in a code block.
4. You can **copy** it or **download** it as a `.txt` file.

---


---

## Environment Variables

Create a `.env` file in the root:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```


## Acknowledgements

- [Google Gemini API](https://ai.google.dev/)
- [react-window](https://react-window.vercel.app/)
- [TanStack React Query](https://tanstack.com/query/latest)
