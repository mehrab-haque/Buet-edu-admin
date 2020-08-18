import {combineReducers} from "redux"
import loadReducer from "./loadReducer"
import searchReducer from "./searchReducer"
import topicReducer from "./topicReducers"
import seriesReducer from "./seriesReducer"
const allReducers=combineReducers({
loadReducer:loadReducer,
searchReducer:searchReducer,
topicReducer:topicReducer,
seriesReducer:seriesReducer

})

export default allReducers;