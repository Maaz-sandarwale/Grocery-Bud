import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({ list, handleEdit, handleDelete }) => {

  return (
    <>
      {list.map((item, index) => {
        return (
          <>
            <article className='containers'>
              <p className='list' key={item}>{item}</p>
              <div className='buttons'>
                <button className='edit' onClick={() => handleEdit(item, index)}><FaEdit /></button>
                <button className='delete' onClick={() => handleDelete(item, index)}> <FaTrash /></button>

              </div>

            </article>

          </>


        )
      })}

    </>)
}

export default List
