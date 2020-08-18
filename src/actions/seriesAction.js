import axios from 'axios'
import {keys} from "../keys"
export const fetchSerieses=(dispatcher,i)=>{
axios.get(`https://0jymup9y4j.execute-api.ap-south-1.amazonaws.com/d/topic/${i}`,{

headers:{
	'authorization':keys.authorization,

}

}).then(res=>{
	dispatcher(seriesDispatch(res.data))
}).catch(e=>console.log(e))
}
 
const seriesDispatch=data=>{
return {
	type:'fetchSerieses',
	data:data
}

}