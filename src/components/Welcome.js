import React from "react"
import {useSelector} from "react-redux"
const Welcome=(props)=>{

return (
<div class="alert alert-success alert-dismissible fade show" role="alert">
 <strong>Welcome Admin to the {props.message} list </strong>

  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
	)

}
export default Welcome;