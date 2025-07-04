import React from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block transition-transform hover:scale-[1.02]">
      <div className="w-full bg-white rounded-xl shadow-sm hover:shadow-md p-4 border border-gray-200">
        <div className="w-full mb-4 overflow-hidden rounded-md">
          <img
            src={appwriteService.getFileDownload(featuredImage)}
            alt={title}
            className="w-full h-48 object-cover"
          />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;