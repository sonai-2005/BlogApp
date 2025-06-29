import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading , setloading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            
            appwriteService.getPost(slug).then((post) => {
                if(post.featureImages)setloading(false);
                if (post) {setPost(post);
                
               // console.log(post.featureImages);
              //  console.log(appwriteService.filePreview(post.featureImages));
                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featureImages);
                navigate("/");
            }
        });
    };
    const loader=()=>{
        if(!loading)return(<div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                     <img
                        src={appwriteService.filePreview(post.featureImages)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                   
                </div>)
        else return(
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                     <div className="border-4 border-gray-300 border-t-black w-12 h-12 rounded-full animate-spin flex items-center justify-center">
  <span className="sr-only">Loading...</span>
</div>



                   
                </div>
        )
        
    }
    return post ? (
        <div>
        <div className="py-8">
            <Container>
                {/*<div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                     <img
                        src={appwriteService.filePreview(post.featureImages)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                   
                </div> */}
                {loader()}
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
         {isAuthor && (
                        <div className="m-5">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
        </div>
    ) : null;
}