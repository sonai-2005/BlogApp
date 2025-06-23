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
            <div className="w-full py-8 text-center text-white text-xl">
                Loading...
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