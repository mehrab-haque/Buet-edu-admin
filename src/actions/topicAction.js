import axios from 'axios'
import {keys} from "../keys"
export const fetchTopics=(dispatcher,i)=>{
axios.get(`https://0jymup9y4j.execute-api.ap-south-1.amazonaws.com/d/topics/${i}`,{

headers:{
	'authorization':keys.authorization,

}

}).then(res=>{
	dispatcher(topicDispatch(res.data))
}).catch(e=>console.log(e))
}
 
const topicDispatch=data=>{
return {
	type:'fetchTopics',
	data:data
}

}