import CommentCards from './CommentCards';

const CommentList = ({ comments }) => {
    console.log(`comments: >>> ${comments}`);
    return (
        <div className="BookList-items">
            {
                comments?.map(comment => (<CommentCards comment={comment} key={Math.random() * 2} />))
            }
        </div>
    );
}

export default CommentList;