const loadReducer=(state=true,action)=>{

switch(action.type){

	case 'loading_complete':
	return false
	default :
	return state
}

}
export default loadReducer;