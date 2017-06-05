import { combineReducers } from 'redux'
import api from './api'
import search from './search'

const reducers = combineReducers({
  api,
  search,
})

export default reducers;
