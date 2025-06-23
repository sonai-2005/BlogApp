import React, { useEffect, useState } from 'react'
import { PostCard, Container } from '../components'
import appwriteService from "../appwrite/config"
function AllPost() {
    const [posts, setposts] = useState([]);
     const [loading, setLoading] = useState(true);
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setposts(posts.documents);
        }
         setLoading(false); 
    })
     }, [])
    
    if (loading) {
        return (
            <div className="w-full py-8 flex justify-center items-center min-h-[200px]">
  <div className="border-4 border-gray-300 border-t-black w-12 h-12 rounded-full animate-spin"></div>
</div>

        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className="flex flex-wrap">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    ) : (
                        <div className="text-white text-xl">No posts found.</div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;