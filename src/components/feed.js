import React from 'react';
import {Link} from "react-router-dom";
import TagList from "./tagList";

const Feed = ({articles}) => {



    return (
        <div>
            {articles.map((article, index) => (

                <div className="card-block" key={index}>
                    <div className="card-header">
                        <Link
                            to={`/profiles/${article.author.username}`}>
                            <img
                                className='avatar'
                                src={article.author.image}
                                alt=""
                            />
                        </Link>
                        &nbsp;
                        <Link
                            to={`/profiles/${article.author.username}`}>
                            {article.author.username}
                        </Link>
                    </div>
                    <div className="card" key={index}>

                        <Link to={`/articles/${article.slug}`}>
                            <h4 className="card-title">
                                {article.title}
                            </h4>
                            <h6 className="card-subtitle mb-2 text-muted">{article.createdAt}</h6>
                            <p className="card-text">
                                {article.description}
                            </p>
                            <span>Read more...</span>

                            <TagList tags={article.tagList}/>
                        </Link>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default Feed
