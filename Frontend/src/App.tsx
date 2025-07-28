import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// User-side components
import Chill from "./Components/TopHits/Chill";
import FeelGood from "./Components/TopHits/FeelGood";
import Party from "./Components/TopHits/Party";
import Podcast from "./Components/TopHits/Podcast";
import Relax from "./Components/TopHits/Relax";
import Romance from "./Components/TopHits/Romance";
import Navbar from "./Components/Header,Footer/Navbar";
import Home from "./Components/genral/Home";
import Fav from "./Components/Fav,Playlist/Recent";
import Playlist from "./Components/Fav,Playlist/Playlist";
import Login from "./Components/Form/Login";
import Signinartist from "./Components/Form/Signinartist";
import Register from "./Components/Form/Register";
import Loginartist from "./Components/Form/Loginartist";
import UploadSongArtist from "./Components/Form/UploadSongArtist";
import MusicPlayer from "./Components/genral/Musicplayer";
import Footer from "./Components/Header,Footer/Footer";
import Contact from "./Components/Form/Cotact";
import OtpVerification from "./Components/Form/OtpVerification";
import Userprofile from "./Components/genral/Userprofile";
import ArtistProfile from "./Components/genral/ArtistProfile";
import Setting from "./Components/genral/Setting";
import Song from "./Components/genral/Song";
import Yourplaylist from "./Components/Fav,Playlist/Yourplaylist";
import About from "./Components/genral/Aboutus";
import Error from "./Components/genral/Error";
import ProtectedRoute from "./Components/ProtectedRoute";
import SearchResults from "./Components/genral/SearchResults";
import ArtistSongs from "./Components/genral/ArtistSongs";
import ForgotPassword from "./Components/Form/ForgotPassword";
import ResetPassword from "./Components/Form/ResetPassword";
import Recent from "./Components/Fav,Playlist/Recent";
import Rapsong from "./Components/genral/Rapsong"
import Trendingsong from "./Components/genral/Trendingsong"
// ✅ Admin Pages
import AdminDashboard from "./Admin/AdminDashboard";
import AdminUsers from "./Admin/AdminUser";
import AdminArtist from "./Admin/AdminArtist";
import AdminContact from "./Admin/AdminContact";

import Admin from "./Admin/Admin";
import Lovesong from "./Components/genral/Lovesong";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* ===================== AUTH & GENERAL ===================== */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Emailotp" element={<OtpVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ===================== USER SIDE ROUTES ===================== */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recent"
          element={
            <ProtectedRoute>
              <Recent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlist"
          element={
            <ProtectedRoute>
              <Playlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fav"
          element={
            <ProtectedRoute>
              <Fav />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chill"
          element={
            <ProtectedRoute>
              <Chill />
            </ProtectedRoute>
          }
        />
        <Route
          path="/good"
          element={
            <ProtectedRoute>
              <FeelGood />
            </ProtectedRoute>
          }
        />
        <Route
          path="/party"
          element={
            <ProtectedRoute>
              <Party />
            </ProtectedRoute>
          }
        />
        <Route
          path="/podcast"
          element={
            <ProtectedRoute>
              <Podcast />
            </ProtectedRoute>
          }
        />
        <Route
          path="/relax"
          element={
            <ProtectedRoute>
              <Relax />
            </ProtectedRoute>
          }
        />
        <Route
          path="/romance"
          element={
            <ProtectedRoute>
              <Romance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signinartist"
          element={
            <ProtectedRoute>
              <Signinartist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loginartist"
          element={
            <ProtectedRoute>
              <Loginartist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userprofile"
          element={
            <ProtectedRoute>
              <Userprofile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/artistprofile"
          element={
            <ProtectedRoute>
              <ArtistProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/setting"
          element={
            <ProtectedRoute>
              <Setting />
            </ProtectedRoute>
          }
        />
        <Route
          path="/allsongs"
          element={
            <ProtectedRoute>
              <Song />
            </ProtectedRoute>
          }
        />
        <Route
          path="/yoursong"
          element={
            <ProtectedRoute>
              <Yourplaylist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/aboutus"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchResults />
            </ProtectedRoute>
          }
        />
        <Route
          path="/artistsong"
          element={
            <ProtectedRoute>
              <ArtistSongs />
            </ProtectedRoute>
          }
        />

          <Route
          path="/Lovesong"
          element={
            <ProtectedRoute>
              <Lovesong />
            </ProtectedRoute>
          }
        />

         <Route
          path="/Rapsong"
          element={
            <ProtectedRoute>
              <Rapsong />
            </ProtectedRoute>
          }
        />
      
      <Route
          path="/Trendingsong"
          element={
            <ProtectedRoute>
              <Trendingsong />
            </ProtectedRoute>
          }
        />

        {/* ===================== ADMIN ROUTES ===================== */}
        <Route path="/admin"  element={<Admin/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
       <Route path="/admin/artists" element={<AdminArtist />} />
        <Route path="/admin/contacts" element={<AdminContact />} /> *
        <Route path="/admin/songs" element={<UploadSongArtist />} />

        {/* ===================== 404 ===================== */}
        <Route path="*" element={<Error />} />
      </Routes>

      <MusicPlayer />
      <Footer />
    </Router>
  );
}

export default App;
