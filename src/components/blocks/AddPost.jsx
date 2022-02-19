import { CircularProgress, Grid } from "@mui/material";
import React, { useState } from "react";
import { postService } from "../../services/postService";
import { displayAlert } from "../../utils/misc";
import TextInput from "./TextInput";

function AddPost({ refetchData }) {
    const [fields, setFields] = useState({ title: "", body: "" });
    const [isLoader, setIsLoader] = useState(false);
    // handle fields change start
    const onFieldsChange = (name, value) => {
        setFields({
            ...fields,
            [name]: value,
        });
    };
    // handle fields change end

    // add post start
    const submitPost = async () => {
        setIsLoader(true);
        if (fields.title && fields.body) {
            //>: add post to api data
            const { success } = await postService.addPost({
                title: fields.title,
                body: fields.body,
                userId: JSON.parse(localStorage.getItem("currentUser")).id,
            });
            if (!success) return;

            //>: add post to localStorge data
            let postsFromLocalStorg = JSON.parse(localStorage.getItem("posts"));
            let newPosts = [
                {
                    id: Math.random(),
                    title: fields.title,
                    body: fields.body,
                    userId: JSON.parse(localStorage.getItem("currentUser")).id,
                },
                ...postsFromLocalStorg,
            ];
            localStorage.setItem("posts", JSON.stringify(newPosts));

            displayAlert("Done", "Post Has Been Addedd Successfully ", "success");
            setFields({ title: "", body: "" });
            refetchData();
        } else {
            displayAlert("Error", "Please Fill All Fields", "error");
        }
        setIsLoader(false);
    };
    // add post end

    return (
        <div className="add-post-card">
            <Grid container justifyContent="space-between">
                {/* title input start  */}
                <Grid xs={12} item>
                    <TextInput
                        className="post-title"
                        name="title"
                        label={null}
                        placeholder="Title"
                        value={fields.title}
                        onFieldChange={onFieldsChange}
                    />
                </Grid>
                {/* title input end  */}

                {/* Post Body input start  */}
                <Grid xs={12} item>
                    <TextInput
                        name="body"
                        label={null}
                        placeholder="What's on your mind?"
                        value={fields.body}
                        onFieldChange={onFieldsChange}
                        isTextArea
                    />
                </Grid>
                {/* Post Body input end  */}

                {/* add post button start  */}
                <Grid xs={4} item onClick={submitPost}>
                    <button className="submit-button">{isLoader ? <CircularProgress color="inherit" /> : "Add post"}</button>
                </Grid>
                {/* add post button end  */}
            </Grid>
        </div>
    );
}

export default AddPost;
