import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button, Select, RTE } from '../index';
import appwriteService from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post = null }) {
    const userData = useSelector(state => state.auth.userData);
    const { register, handleSubmit, watch, control, getValues, setValue } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
        shouldUnregister: true,
    });

    const navigate = useNavigate();


    const submit = async (data) => {
        if (!userData || !userData.$id) {
            console.log("User not logged in — cannot create post");
            return;
        }
        const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;

        if (post) {
            if (file) {
                await appwriteService.deleteFile(post.featureImages);
            }

            const dbpost = await appwriteService.updatePost(post.$id, {
                ...data,
                featureImages: file ? file.$id : post.featureImages,
            });

            if (dbpost) navigate(`/post/${dbpost.$id}`);
        } else {
            const dbpost = await appwriteService.createPost({
                ...data,
                featureImages: file ? file.$id : undefined,
                userId: userData.$id,
            });

            if (dbpost) navigate(`/post/${dbpost.$id}`);
        }
    };

    const slugTransform = useCallback((value) => {
        return value?.trim()
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/\s+/g, '-') || '';
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                const newSlug = slugTransform(value.title);
                if (getValues("slug") !== newSlug) {
                    setValue("slug", newSlug, { shouldValidate: true });
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue, getValues]);

    // console.log("userData is : " , userData);//fine running no need to output
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <div className="mb-4">
                    <div className="block mb-1 bg-white text-black h-7 rounded-r-2xl">Featured Image :</div>
                    <input className=''
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                </div>

                {post && post.featureImages && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.filePreview(post.featureImages)?.href}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select

                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
            <Button type="button" className='m-6' onClick={() => console.log(watch("image"))}>
                  temp check
            </Button>

        </form>
    );
}

export default PostForm;
