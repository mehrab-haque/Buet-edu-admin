import React,{useState} from "react"
import MDEditor,{commands} from '@uiw/react-md-editor';
import {useParams} from "react-router-dom"
const Tutorial = (props) => {
    const [des,setDes]=useState('');
const {id}=useParams();
    return ( 
    <div>
        <h3>Tutorial Markdown for series-id {id} </h3>
      <MDEditor
            className="mt-10"
            value={des}
            onChange={setDes}
            height='500'
            commands={[
              commands.title,
              commands.bold,
              commands.italic,
              commands.strikethrough,
              commands.hr,
              commands.orderedListCommand,
              commands.unorderedListCommand,
              commands.code,
              commands.image,
              commands.link,
              commands.quote,
              commands.divider,
              commands.codeEdit,
              commands.codeLive,
              commands.codePreview
            ]}

            />


    </div> );
}
 
export default Tutorial;