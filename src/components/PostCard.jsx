import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import appwriteService from "../appwrite/config";

function PostCard({ $id, featureImages, title }) {


  return (
    <Link to={`/post/${$id}`} className="block">
      <div className="bg-gray-100 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300" style={{height :"50vh"}}>
        <div className="w-full h-40 overflow-hidden rounded-xl aspect-video relative">
          
          <img
            src={appwriteService.filePreview(featureImages)}
            alt={title}
            className={`w-full h-full object-cover transition-opacity duration-300 }`
            }
          />
        </div>
        <h2 className="text-lg md:text-xl font-semibold line-clamp-2 mt-2">{title}</h2>
      </div>
    </Link>
  );

  
}

export default PostCard;
