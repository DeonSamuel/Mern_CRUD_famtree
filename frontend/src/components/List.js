import React from 'react';

import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import axios from 'axios';
import { baseURL } from '../utils/constant';

const List = ({ id, task, relation, age, gender, setUpdateUI, updateMode}) => {

const removeTask = () => {
  axios.delete(`${baseURL}/delete/${id}`)
  .then((res) => {
    console.log(res);
    setUpdateUI((prevState) => !prevState);
  });
}

  return (
    <li>
      {task}<br/>
      {relation}<br/>
      {age}<br/>
      {gender}
      <div className='icon_holder'>
        <BiEditAlt className='icon' onClick={() => updateMode(id,task,relation,age,gender)}/>
        <BsTrash className='icon' onClick={removeTask}/>
      </div>
    </li>
  );
}

export default List;
