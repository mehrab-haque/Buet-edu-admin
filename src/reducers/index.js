import {combineReducers} from "redux"
import loadReducer from "./loadReducer"
import searchReducer from "./searchReducer"
import topicReducer from "./topicReducers"
import seriesReducer from "./seriesReducer"
import problemReducer from "./problemReducer"
const allReducers=combineReducers({
loadReducer:loadReducer,
searchReducer:searchReducer,
topicReducer:topicReducer,
seriesReducer:seriesReducer,
problemReducer:problemReducer

})

export default allReducers;