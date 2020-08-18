import axios from "axios"
const seriesReducer=(state=null,action)=>{

switch(action.type){

	case 'fetchSerieses':
	return action.data;
	default:
	return state;

}}
export default seriesReducer;