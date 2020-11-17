import axios from 'axios'
import {keys} from "../keys"
export const fetchSerieses=(dispatcher)=>{
axios.get(`https://0jymup9y4j.execute-api.ap-south-1.amazonaws.com/d/admin/getAllSeries`,{

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