import axios from 'axios'
import { GET_PROFILE, PROFILE_LOADED, GET_ERRORS , CLEAR_CURRENT_PROFILE, SET_CURRENT_USER} from './types'

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading())
  axios.get('/api/profile').then(res => dispatch({
    type: GET_PROFILE,
    payload: res.data
  })).catch(err => dispatch({
    type: GET_PROFILE,
    payload: {}
  }))
}

export const setProfileLoading =() => {
  return {
    type: PROFILE_LOADED
  }
}

export const clearProfile = () =>{
return {
  type: CLEAR_CURRENT_PROFILE
}  
}
export const createProfile = (profileData, history) =>dispatch => {
  axios.post('/api/profile', profileData)
  .then(res => history.push('/dashboard'))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload:err.response.data
  }))
}
export const deleteAccount = () => dispatch => {
  if(window.confirm('Are you sure about this')){
    axios.delete('/api/profile').then(res => dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    })).catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
  }
}
export const addExperience = (expData, history) => dispatch => {
  axios.post('/api/profile/experience', expData).then(res => history.push('/dashboard'))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}