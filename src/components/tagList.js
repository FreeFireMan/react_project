import React from "react";


const TagList = ({tags}) => {
    console.log("tags");
    console.log(tags);
    return (
        <ul className='col-md-6'>
            {tags.map(tag =>
                (
                    <li
                        key={tag}
                        className='badge badge-pill badge-info'
                    >
                        {tag}
                    </li>
                )
            )}
        </ul>

    )
}

export default TagList
