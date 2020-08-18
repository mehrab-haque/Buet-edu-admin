import axios from "axios"
const topicReducer=(state=null,action)=>{

switch(action.type){

	case 'fetchTopics':
	return action.data;
	default:
	return state;

}}
export default topicReducer;