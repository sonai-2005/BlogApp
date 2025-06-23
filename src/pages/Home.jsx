import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container,PostCard} from '../components'
import { useSelector } from 'react-redux';


function Home() {
    const [posts , setPosts] = useState([]);
    const [loading , setLoading] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);
    useEffect(()=>{
        appwriteService.getPosts([]).then((posts)=>{
        if(posts){
            setPosts(posts.documents);
        }
        setLoading(false);
    })

    } , [])
    if(posts.length===0 && !authStatus){
    return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h2 className="text-2xl font-bold hover:text-gray-500">
                                log in to seee the posts .As i am using the free version . "https://blog-app-git-main-saptarshi-nandis-projects.vercel.app/" only work other links does't support the CORS
                            </h2>
                        </div>
                    </div>
                </Container>
            </div>
        )}
        else if(loading){
        return (//loader...
           <div className="w-full py-8 flex justify-center items-center min-h-[200px]">
  <div className="border-4 border-gray-300 border-t-black w-12 h-12 rounded-full animate-spin"></div>
</div>     
        );
    }
        return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {/* {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))} */}
                    <h2>actually i have not found anything to show in the home now. After new idea i will develop that . For now you can click in the 'all posts' to watch the posts and on the add post to add your favour post</h2>
                </div>
            </Container>
        </div>
    )
}

export default Home