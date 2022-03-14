import { createSlice } from '@reduxjs/toolkit'



const todoSlice = createSlice({
  name: "todos",
  initialState: {
    tasks: [],
    taskID: 1
  },
  reducers: {

    setTask(state, action) {
 
     state.tasks=[]  //here   action.payload is returning array
      state.tasks.push(...action.payload)
    },
    setTaskId(state, action) {
      state.taskID = action.payload
    }
  }
})

export const { setTask, setTaskId } = todoSlice.actions
export default todoSlice.reducer