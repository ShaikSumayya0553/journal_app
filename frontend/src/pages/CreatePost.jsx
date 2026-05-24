import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import Toast from "../components/Toast";

function CreatePost() {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    try {
      const response = await api.post("/posts/create", postData);
      
      setToast({
        message: response.data.message || "Journal entry saved successfully!",
        type: "success",
      });

      // Redirect back to feed after short delay
      setTimeout(() => {
        navigate("/feed");
      }, 1200);
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.error || "Failed to save journal entry. Try again.";
      setToast({
        message: errorMsg,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-5 relative overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none"></div>

      <div className="bg-slate-900/60 backdrop-blur-xl w-full max-w-4xl p-6 md:p-10 rounded-3xl border border-slate-800/80 shadow-2xl z-10 grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Editor Form */}
        <div className="lg:col-span-3 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">New Entry</h1>
            <p className="text-slate-400 text-sm mt-1">Record your thoughts, learnings, or daily activities.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Entry Title
                </label>
                <span className="text-[10px] text-slate-500 font-mono">
                  {postData.title.length} / 100
                </span>
              </div>
              <input
                type="text"
                name="title"
                maxLength="100"
                placeholder="What's on your mind today?"
                value={postData.title}
                onChange={handleChange}
                className="w-full bg-slate-950/80 border border-slate-800 text-white p-3.5 rounded-2xl outline-none transition duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 placeholder-slate-600 font-semibold"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Journal Content
                </label>
                <span className="text-[10px] text-slate-500 font-mono">
                  {postData.content.length} characters
                </span>
              </div>
              <textarea
                rows="8"
                name="content"
                placeholder="Start writing your thoughts here..."
                value={postData.content}
                onChange={handleChange}
                className="w-full bg-slate-950/80 border border-slate-800 text-white p-4 rounded-2xl outline-none transition duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 placeholder-slate-600 leading-relaxed resize-none"
                required
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white py-3.5 rounded-2xl font-semibold shadow-lg shadow-indigo-500/25 transition duration-300 flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  "Save Entry"
                )}
              </button>

              <Link
                to="/feed"
                className="bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white px-6 py-3.5 rounded-2xl font-semibold transition duration-300 border border-slate-700/50 text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* Sidebar Guide */}
        <div className="lg:col-span-2 bg-slate-950/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col justify-between">
          <div className="space-y-5">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Writing Prompts
            </h3>
            
            <ul className="space-y-4 text-slate-400 text-xs leading-relaxed">
              <li className="flex gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>Gratitude:</strong> What are three simple things that brought you joy today?</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>Reflect:</strong> What was the most challenging event today and how did you respond?</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>Goals:</strong> What is one key thing you want to accomplish tomorrow?</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>Free Write:</strong> Don't edit your words; just let your feelings flow onto the page.</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800/80 text-[10px] text-slate-500 leading-normal flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Your journal entries are encrypted and stored in your private MySQL vault. Only you have access to them.</span>
          </div>
        </div>

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

export default CreatePost;