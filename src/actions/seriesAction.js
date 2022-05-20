import axios from 'axios'
import {keys} from "../keys"
export const fetchSerieses=(dispatcher)=>{
axios.get(`https://zo3aw6p85g.execute-api.us-east-2.amazonaws.com/production/admin/getAllSeries`,{

headers:{
	'authorization':keys.authorization,

}

}).then(res=>{
	dispatcher(seriesDispatch(res.data))
	console.log(res.data)
}).catch(e=>console.log(e))
}
 
const seriesDispatch=data=>{
return {
	type:'fetchSerieses',
	data:data
}

}