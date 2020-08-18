import React from "react" 
import "../App.css"
class Pagination extends React.Component{
constructor(props){
	super(props);
}
render(){
const pageNumbers=[]
for(let i=1;i<=Math.ceil(this.props.totalPosts/this.props.postsPerPage);i++){

	pageNumbers.push(i);
}
return(

<ul className="nav mt-5 ">
{pageNumbers.map(number=>{
return(
<li  key={number} className="page-item plist pl-2">
<a id="page" onClick={()=>{this.props.paginate(number)}}  className="page-link bg-dark ">{number}</a>

</li>
	)

})}
</ul>


	)

}}
export default Pagination;