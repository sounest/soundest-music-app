import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Authprovider } from "./Components/context/Auth"; // Path is correct based on your structure
import { PlaylistProvider } from "./Components/context/PlaylistContext";
import { MusicProvider } from "./Components/context/MusicContext";
import { SearchProvider } from "./Components/context/SearchContext";
import { RecentProvider } from "./Components/context/RecentContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authprovider>
      <SearchProvider>
      <RecentProvider>
      <PlaylistProvider>
        <MusicProvider>
          
          <App />
          
        </MusicProvider>
      </PlaylistProvider>
      </RecentProvider>
      </SearchProvider>
    </Authprovider>
  </React.StrictMode>
);
