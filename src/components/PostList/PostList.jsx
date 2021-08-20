import React from 'react';
import Post from "../Post";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import "./PostList.css";

const  PostList = ({posts, title, remove}) => {

    if(!posts.length){
        return (
            <h1 style={{textAlign: 'center'}}>Нет постов</h1>
        )
    }

    return (
        <div>
            <h1>{title}</h1>
            <TransitionGroup>
                {posts.map((el, index) =>
                    <CSSTransition
                        key={el.id}
                        timeout={500}
                        classNames="post"
                    >
                        <Post remove={remove} number={index + 1} props={el}/>
                    </CSSTransition>

                )}
            </TransitionGroup>
        </div>
    );
};

export default PostList;
