import React from 'react';
import "../styles/Post.css"
import Button from "./UI/Button/Button.jsx";
import {useHistory} from "react-router-dom";

const Post = ({props, number, remove}) => {

    const router = useHistory()

    return (
        <div className="post">
            <h5 style={{marginRight: "10px"}}>{props.id}</h5>
            <div>
                <h3>
                    {props.title}
                </h3>
                <span> {props.body} </span>
            </div>
            <div className="post__btns">
                <Button onClick={() => router.push(`/posts/${props.id}`)}>
                    Открыть
                </Button>
                <Button onClick={() => remove(props.id)}>
                    Удалить пост
                </Button>
            </div>
        </div>
    );
};

export default Post;
