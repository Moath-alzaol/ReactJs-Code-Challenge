import React, { useEffect, useRef, useState } from "react";
import { Container, Skeleton } from "@mui/material";
import PostCard from "../blocks/PostCard";
import { postService } from "../../services/postService";
import AddPost from "../blocks/AddPost";
import { displayAlert } from "../../utils/misc";

function Home() {
    const [posts, setPosts] = useState([]);
    const [isLoader, setIsLoader] = useState(true);
    const [isDataChanged, setisDataChanged] = useState(false);
    const isFirstTime = useRef(true);

    useEffect(() => {
        if (isFirstTime.current) {
            getPosts();
        } else {
            let posts = JSON.parse(localStorage.getItem("posts"));
            setPosts(posts);
            setisDataChanged(false);
        }
    }, [isDataChanged]);

    // get all posts start
    const getPosts = async () => {
        const { success, data } = await postService.getPosts();
        if (!success) return;
        localStorage.setItem("posts", JSON.stringify(data));
        isFirstTime.current = false;
        setPosts(data);
        setIsLoader(false);
    };
    // get all posts end

    // delete post  start
    const deletePost = async (postId) => {
        displayAlert("Warning", "Are you Sure To Delete This Post?!", "warning", ["Cancle", "Yes"]).then(async (confirm) => {
            if (confirm) {
                const { success } = await postService.deletePost(postId);
                if (!success) return;
                let postsFromLocalStorg = JSON.parse(localStorage.getItem("posts"));

                let newPosts = postsFromLocalStorg.filter(({ id }) => id !== postId);
                localStorage.setItem("posts", JSON.stringify(newPosts));
                displayAlert("Done", "Post has been deleted !", "success");
                dataChanged();
            }
        });
    };
    // delete post  end

    /// update post start
    const updatePost = async (postData, postId) => {
        await postService.updatePost(postData, postId);

        let postsFromLocalStorg = JSON.parse(localStorage.getItem("posts"));

        let currentPostindex = postsFromLocalStorg.findIndex(({ id }) => id === postId);
        postsFromLocalStorg[currentPostindex] = postData;
        localStorage.setItem("posts", JSON.stringify(postsFromLocalStorg));

        setisDataChanged(true);
        await displayAlert("Done", "Post has been Updated Successfully", "success");
    };

    const dataChanged = () => setisDataChanged(true);

    return (
        <div className="home">
            <Container>
                {/* logout button start  */}
                <button
                    className="submit-button logout-button"
                    onClick={() => {
                        localStorage.removeItem("currentUser");
                        window.location.href = "/login";
                    }}
                >
                    Logout
                </button>
                {/* logout button end  */}

                <AddPost refetchData={dataChanged} />
                {isLoader ? (
                    <>
                        <Skeleton variant="rectangular" height={130} style={{ marginBottom: "15px" }} />
                        <Skeleton variant="rectangular" height={130} style={{ marginBottom: "15px" }} />
                        <Skeleton variant="rectangular" height={130} style={{ marginBottom: "15px" }} />
                        <Skeleton variant="rectangular" height={130} style={{ marginBottom: "15px" }} />
                        <Skeleton variant="rectangular" height={130} style={{ marginBottom: "15px" }} />
                        <Skeleton variant="rectangular" height={130} style={{ marginBottom: "15px" }} />
                    </>
                ) : (
                    posts?.map((item, index) => {
                        return <PostCard key={index} data={item} deletePost={deletePost} updatePost={updatePost} />;
                    })
                )}
            </Container>
        </div>
    );
}

export default Home;
