import React, { useEffect, useState } from "react";
import {
    Avatar,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    IconButton,
    Collapse,
    Typography,
    Menu,
    MenuItem,
    Grid,
    CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TextInput from "./TextInput";
import { postService } from "../../services/postService";
import { displayAlert } from "../../utils/misc";

function PostCard({ data: { userId, title, body, id: postId }, updatePost, deletePost }) {
    const [author, setAuthor] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [fields, setFields] = useState({ title, body });
    const [isLoader, setIsLoader] = useState(false);

    const open = Boolean(anchorEl);

    useEffect(() => {
        let users = JSON.parse(localStorage.getItem("users"));
        let currentAuthor = users?.find(({ id }) => id === userId);
        setAuthor(currentAuthor);
        getPostComments();
    }, []);

    // get comments start
    const getPostComments = async () => {
        const { success, data } = await postService.getPostComments(postId);
        if (!success) return;
        setComments(data);
    };

    // handle fields change start
    const onFieldsChange = (name, value) => {
        setFields({
            ...fields,
            [name]: value,
        });
    };
    // handle fields change end

    // for collapse start
    const ExpandMore = styled((props) => {
        const { showComments, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, showComments }) => ({
        transform: !showComments ? "rotate(0deg)" : "rotate(180deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    }));
    // for collapse end

    // for dropdown list start
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // for dropdown list end

    return (
        <Card className={`post-card ${isEdit ? "post-card-edit" : ""}`}>
            {/* author name  and avatar start  */}
            <CardHeader
                sx={{ color: "#696969" }}
                avatar={
                    <Avatar sx={{ bgcolor: "#8bc34a" }} aria-label="recipe">
                        {author?.name?.at(0)}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="more" onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={<h3>{author.name}</h3>}
            />
            {/* author name  and avatar end  */}

            {/* post dropdown list start  */}
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem
                    onClick={() => {
                        if (isEdit) {
                            setIsEdit(false);
                            setAnchorEl(null);
                        } else {
                            setFields({
                                title,
                                body,
                            });
                            setIsEdit(true);
                            setAnchorEl(null);
                        }
                    }}
                >
                    {isEdit ? "Close" : "Edit"}
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setAnchorEl(null);
                        deletePost(postId);
                    }}
                >
                    Delete
                </MenuItem>
            </Menu>

            <CardContent>
                {isEdit ? (
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

                        {/* update post button start  */}
                        <Grid xs={4} item>
                            <button
                                className="submit-button"
                                onClick={async () => {
                                    if (fields.title && fields.body) {
                                        setAnchorEl(null);
                                        setIsLoader(true);

                                        await updatePost(
                                            {
                                                id: postId,
                                                title: fields.title,
                                                body: fields.body,
                                                userId: JSON.parse(localStorage.getItem("currentUser")).id,
                                            },
                                            postId
                                        );
                                        setIsEdit(false);
                                    } else {
                                        displayAlert("Error", "Please Fill All Fields", "error");
                                    }
                                    setIsLoader(false);
                                }}
                            >
                                {isLoader ? <CircularProgress color="inherit" /> : "Edit Post"}
                            </button>
                        </Grid>
                        {/* update post button end  */}
                    </Grid>
                ) : (
                    <>
                        {/* post title and body start  */}
                        <Typography variant="h5">{title}</Typography>
                        <Typography variant="body1">{body}</Typography>
                        {/* post title and body end  */}
                    </>
                )}
            </CardContent>

            {/* comments toggle button start  */}
            <CardActions disableSpacing>
                <ExpandMore onClick={() => setShowComments(!showComments)}>
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            {/* comments toggle button end  */}

            {/* comments start  */}
            <Collapse in={showComments} timeout="auto" unmountOnExit>
                <CardContent className="post-card__comment">
                    <Typography variant="h6">Comments</Typography>

                    {comments?.map(({ body, email, id, name }) => {
                        return (
                            <React.Fragment key={id}>
                                <CardHeader
                                    sx={{ color: "#696969" }}
                                    avatar={
                                        <Avatar sx={{ bgcolor: "#10489b" }} aria-label="recipe">
                                            {email?.at(0)}
                                        </Avatar>
                                    }
                                    title={<h4>{email}</h4>}
                                />
                                <Typography paragraph className="post-card__comment-body">
                                    {body}
                                </Typography>
                            </React.Fragment>
                        );
                    })}
                </CardContent>
            </Collapse>
            {/* comments end  */}
        </Card>
    );
}

export default PostCard;
