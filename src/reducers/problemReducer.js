
const problemReducer=(state=null,action)=>{

switch(action.type){

	case 'fetchProblems':
	return action.data;
	default:
	return state;

}}
export default problemReducer;