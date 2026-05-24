function PostCard({ post }) {

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition duration-300">

      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {post.title}
      </h2>

      <p className="text-gray-600 leading-7">
        {post.content}
      </p>

      <div className="mt-5 text-gray-400 text-sm">
        Posted on {post.date}
      </div>

    </div>
  );
}

export default PostCard;