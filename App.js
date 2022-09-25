import React, { useState, useEffect } from 'react'
import List from './List'

const getLocal = () => {
  let list = localStorage.getItem('Item')
  if (list) {
    return list = JSON.parse(list)
  } else {
    return []
  }
}

function App() {
  const [item, setItem] = useState('')
  const [replace, setReplace] = useState({ value: '', index1: 0 })
  const [Items, setItems] = useState(getLocal())
  const [flag, setFlag] = useState(false)
  const [alert, setAlert] = useState({ set: false, msg: '', type: '' })

  const handleChange = (additem) => {
    setItem(additem)

  }

  const handleClick = () => {
    if (item) {
      if (flag) {
        setItems(Items.map((prev, index) => {
          console.log("index2", replace.index1)
          if (index === replace.index1) {

            return [Items[index] = item]
          } else {

            return prev
          }
        }))
      } else {
        setItems([...Items, item])
      }
    }
    if (!item) {
      setAlert({ set: true, msg: "Enter an Item", type: 'danger' })
    } else {
      setFlag(false)
      setAlert({ set: true, msg: 'Item Added', type: 'success' })
      setItem('')
    }


  }

  const handleEdit = (item2, index) => {
    setItem(item2)
    setReplace({ value: item2, index1: index })
    console.log("inde", replace.index1)
    setFlag(true)
  }

  const handleDelete = (item, index) => {
    const ele = Items.filter((items, ind) => ind !== index)
    console.log(ele)
    setItems(ele)
    setAlert({ set: true, msg: 'Item Deleted', type: 'danger' })
  }

  const clearAll = () => {
    setItems([])
    setAlert({ set: true, msg: 'Empty list', type: 'danger' })
  }

  useEffect(() => {
    if (alert.set) {
      const ctn = setTimeout(() => {
        setAlert(false)

      }, 1500)
      return () => clearTimeout(ctn)
    }
  }, [alert])

  useEffect(() => {
    localStorage.setItem("Item", JSON.stringify(Items))
  }, [Items])


  return (
    <>

      <div className='content'>
        <h3 className='heading'>grocery bud setup</h3>
        <div className='Itemadded'>

          <p style={alert ? { display: "" } : { display: "none" }} className={alert.type === 'success' ? 'Add' : 'Del'}>{Items.length >= 0 && alert.msg}</p>

        </div>

        <input type='text' placeholder='eg:eggs' className='input' value={item} onChange={(e) => handleChange(e.target.value)} />
        <button type='submit' className='btn' onClick={handleClick} >{flag ? "Edit" : "Add"}</button>

        <article>


          <List list={Items} handleEdit={handleEdit} handleDelete={handleDelete} />

        </article>
        <div className='clearbtndiv'>
          <button type='button' className='clearbtn' onClick={clearAll} style={Items.length > 0 ? { display: "" } : { display: "none" }}>Clear All</button>
        </div>

      </div>

    </>
  )
}

export default App
