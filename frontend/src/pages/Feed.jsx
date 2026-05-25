import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Toast from "../components/Toast";

function Feed() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const userName = localStorage.getItem("journal_user_name") || "Journaler";

  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts/all");
      setPosts(response.data);
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.error || "Failed to load journal entries.";
      setToast({
        message: errorMsg,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPosts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("journal_token");
    localStorage.removeItem("journal_user_name");
    setToast({
      message: "Logged out successfully!",
      type: "success",
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date helper
  const formatDate = (isoString) => {
    if (!isoString) return "Recently";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 md:p-10 relative overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto z-10 relative">
        {/* Navigation Bar */}
        <header className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between mb-8 shadow-xl">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent tracking-tight">
              My Journal
            </h1>
          </div>

          <div className="flex gap-2 sm:gap-3">
            <Link
              to="/create"
              className="bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 sm:px-5 sm:py-2.5 rounded-2xl font-semibold transition-all duration-300 shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 flex items-center gap-2"
              title="New Entry"
            >
              <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">New Entry</span>
            </Link>

            <button
              onClick={handleLogout}
              className="bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white p-2.5 sm:px-5 sm:py-2.5 rounded-2xl font-semibold transition duration-300 border border-slate-700/50 flex items-center gap-2"
              title="Logout"
            >
              <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Welcome Section & Statistics */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 bg-gradient-to-r from-slate-900 to-indigo-950 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-indigo-400 text-sm font-semibold uppercase tracking-wider">Dashboard</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 leading-tight">
                Hello, {userName}!
              </h2>
              <p className="text-slate-400 mt-2 text-sm sm:text-base leading-relaxed">
                "Journaling is like whispering to one's self and listening at the same time." Capture your memories, feelings, and goals securely.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link 
                to="/create"
                className="bg-white hover:bg-slate-100 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition duration-300"
              >
                Write thoughts
              </Link>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-3xl shadow-xl flex flex-col justify-between">
            <h3 className="text-slate-400 font-semibold uppercase text-xs tracking-wider">Your Stats</h3>
            <div className="my-4 grid grid-cols-2 gap-4">
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                <span className="text-slate-500 text-xs block">Total Entries</span>
                <span className="text-3xl font-extrabold text-white mt-1 block">{posts.length}</span>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                <span className="text-slate-500 text-xs block">Streak</span>
                <span className="text-3xl font-extrabold text-indigo-400 mt-1 block">
                  {posts.length > 0 ? "🔥 Live" : "0 days"}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 italic">
              Keep writing daily to sharpen your self-awareness and focus.
            </p>
          </div>
        </section>

        {/* Toolbar: Search and Filter */}
        <section className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search journals by title or contents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-white pl-11 pr-4 py-3 rounded-2xl outline-none transition duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 placeholder-slate-500"
            />
          </div>
          <div className="text-slate-400 text-sm">
            Showing <strong className="text-white">{filteredPosts.length}</strong> of {posts.length} entries
          </div>
        </section>

        {/* Journal Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 text-sm mt-4">Loading your private vault...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="bg-slate-900/30 border border-slate-800/80 rounded-3xl p-12 text-center max-w-xl mx-auto shadow-lg">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto text-slate-600 mb-4 border border-slate-800">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {searchQuery ? "No entries match search" : "No entries yet"}
            </h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              {searchQuery 
                ? "Try searching for a different keyword or view all your logs."
                : "Your journal is currently empty. Capture your first thought now and look back on it later!"}
            </p>
            {!searchQuery && (
              <Link
                to="/create"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl font-bold transition duration-300"
              >
                Create your first post
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl shadow-lg hover:border-slate-700/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <span className="text-slate-500 font-mono text-xs">
                      #{post.id}
                    </span>
                    <span className="bg-indigo-950 text-indigo-400 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-indigo-900/60">
                      Personal
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 tracking-tight line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap line-clamp-5">
                    {post.content}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-slate-500 text-xs">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default Feed;