
import {keys} from "../keys"
import firebase from "../firebase"
export const fetchProblems=(dispatcher)=>{
    firebase.firestore().collection('problem').where("draft","==",false).get().then(res=>{
	dispatcher(topicDispatch(res.data))
}).catch(e=>console.log(e))
}
 
const topicDispatch=data=>{
return {
	type:'fetchProblems',
	data:data
}

}