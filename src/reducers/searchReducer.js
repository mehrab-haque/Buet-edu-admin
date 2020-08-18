const searchReducer=(state="",action)=>{
if(action.type=="search"){
	return {
	...state,
    text:action.text
	}
}
else{
	return state;
}


}
export default searchReducer;