import {useEffect, useMemo, useRef, useState} from "react";
import "../App.css";
import {usePosts} from "../hooks/usePost";
import {getPageCount, getPagesArray} from "../components/utils/pages";
import {useFetching} from "../hooks/useFetching";
import PostService from "../api/PostService";
import ModalWindow from "../components/ModalWindow/ModalWindow";
import PostForm from "../components/PostForm/PostForm";
import PostFilter from "../components/PostFilter/PostFilter";
import PostList from "../components/PostList/PostList";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/UI/Pagination/Pagination";
import Button from "../components/UI/Button/Button";
import {useObserver} from "../hooks/useObserver";
import Select from "../components/UI/Select/Select";


function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef()

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false)
    }

    const removePost = (postId) => {
        setPosts(posts.filter(p => p.id !== postId))
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            <Button style={{marginTop: "30px"}} onClick={() => setModal(true)}>
                Создать пост
            </Button>
            <ModalWindow visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </ModalWindow>
            <hr style={{margin: '15px 0'}}/>
            <div>
                <PostFilter
                    filter={filter}
                    setFilter={setFilter}
                />
                <Select
                    value={limit}
                    onChange={value => setLimit(value)}
                    defaultValue="Кол-во элементов на странице"
                    options={[
                        {value: 5, name: '5'},
                        {value: 10, name: '10'},
                        {value: 15, name: '15'},
                        {value: 20, name: '20'},
                        {value: -1, name: 'Все'},
                    ]}/>
            </div>
            {postError &&
            <h1>Произошла ошибка - ${postError}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title='JS'/>
            <div ref={lastElement} style={{height: 20, background: 'red'}}/>
            {isPostsLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
            }
            <Pagination page={page} totalPages={totalPages} changePage={changePage}/>
        </div>
    );
}

export default Posts;
