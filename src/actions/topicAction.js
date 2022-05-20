import axios from 'axios'
import {keys} from "../keys"
import {link} from "../base_url"
export const fetchTopics=(dispatcher,slug)=>{
	console.log("link"+link.url)
axios.get('https://zo3aw6p85g.execute-api.us-east-2.amazonaws.com/production/topics/'+slug,{

headers:{
	'authorization':keys.authorization,

}

}).then(res=>{
	dispatcher(topicDispatch(res.data))
	console.log(res.data)
}).catch(e=>console.log(e))
}
 
const topicDispatch=data=>{
return {
	type:'fetchTopics',
	data:data
}

}