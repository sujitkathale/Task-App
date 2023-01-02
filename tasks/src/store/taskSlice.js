import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTask,
  deleteAdd,
  editstages,
  editstagesdrag,
  fetchtask,
  updatetask,
} from "../config/MyService";
const initialState = {
  tasks: [],
  message: "",
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // Add_task: (state, action) => {
    //   console.log(action.payload);
    //   state.tasks = [...state.tasks, action.payload];
    // },
    // Fetch_task: (state, action) => {
    //   console.log(action.payload);
    //   state.tasks = action.payload;
    //   //   fetchtask(action.payload).then((res) => {
    //   //     console.log(res.data.data);
    //   //     temp = res.data.data;
    //   //     console.log(state.tasks);
    //   //   });
    // },
  },
  extraReducers: (builder) => {
    // console.log(builder);
    builder
      .addCase(Add_Task.pending, (state) => {
        console.log("add Promise Pending");
      })
      .addCase(Add_Task.fulfilled, (state, action) => {
        console.log(action.payload);
        state.tasks = action.payload;
      })
      .addCase(Add_Task.rejected, (state, action) => {
        state.message = action.payload;
      })

      .addCase(Fetch_Task.pending, (state) => {
        console.log("Fetch Promise Pending");
      })
      .addCase(Fetch_Task.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(Fetch_Task.rejected, (state, action) => {
        state.message = action.payload;
      })

      .addCase(Update_Task.pending, (state) => {
        console.log("Update Promise Pending");
      })
      .addCase(Update_Task.fulfilled, (state, action) => {
        console.log(action.payload);
        let newData = state.tasks.filter((data) => {
          if (data._id == action.payload._id) {
            // state.tasks = action.payload;
            return action.payload;
          } else {
            return data;
          }
        });
        // state.tasks = newData;
      })
      .addCase(Update_Task.rejected, (state, action) => {
        state.message = action.payload;
      })

      .addCase(deleteTask.pending, (state) => {
        console.log("delete Promise Pending");
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        console.log(action.payload);

        var newData = state.tasks.filter((data) => {
          if (data._id !== action.payload) {
            return data;
          }
        });
        state.tasks = newData;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(EditMinus_Stage.pending, (state) => {
        console.log("Stage Minus Promise Pending");
      })
      .addCase(EditMinus_Stage.fulfilled, (state, action) => {
        // state.tasks = action.payload;
        var newData = state.tasks.filter((data) => {
          if (data._id == action.payload.id) {
            data.stages = data.stages - 1;
            return data;
          } else {
            return data;
          }
        });
        state.tasks = newData;
      })
      .addCase(EditMinus_Stage.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(EditAdd_Stage.pending, (state) => {
        console.log("Stage Add Promise Pending");
      })
      .addCase(EditAdd_Stage.fulfilled, (state, action) => {
        // state.tasks = action.payload;
        var newData = state.tasks.filter((data) => {
          if (data._id == action.payload.id) {
            data.stages = data.stages + 1;
            return data;
          } else {
            return data;
          }
        });
        state.tasks = newData;
      })
      .addCase(EditAdd_Stage.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(Drag_Stage.pending, (state) => {
        console.log("Drag Stage Promise Pending");
      })
      .addCase(Drag_Stage.fulfilled, (state, action) => {
        // state.tasks = action.payload;
        var newData = state.tasks.filter((data) => {
          if (data._id == action.payload.id) {
            data.stages = data.stages + 1;
            return data;
          } else {
            return data;
          }
        });
      })
      .addCase(Drag_Stage.rejected, (state, action) => {
        state.message = action.payload;
      });
  },
});

export const { Add_task, Fetch_task } = taskSlice.actions;
export default taskSlice.reducer;

//Create new Task
export const Add_Task = createAsyncThunk("task/add", async (data) => {
  const res = await addTask(data);
  console.log(res.data);
  return res.data;
});

//Fetch Task
export const Fetch_Task = createAsyncThunk("task/fetch", async (email) => {
  const res = await fetchtask(email);
  // console.log(res);
  return email;
});

//Update Task
export const Update_Task = createAsyncThunk("task/update", async (newData) => {
  const { data, id } = newData;
  const res = await updatetask(data, id);
  console.log(res.data);
  return res.data;
});

//Delete Task
export const deleteTask = createAsyncThunk("task/delete", async (id) => {
  const res = await deleteAdd(id);
  console.log(res);
  return res.data;
});

// Previous Stage
export const EditMinus_Stage = createAsyncThunk(
  "taskMinus/stage",
  async (editData) => {
    const res = await editstages(editData);
    console.log(res.data);
    return editData;
  }
);

//Next Stage
export const EditAdd_Stage = createAsyncThunk(
  "taskAdd/stage",
  async (editAddData) => {
    const res = await editstages(editAddData);
    console.log(res.data);
    return editAddData;
  }
);

//Drag & Drop Stage
export const Drag_Stage = createAsyncThunk("dragstage/stage", async (data) => {
  const res = await editstagesdrag(data);
  // console.log(res);
  return data;
});
