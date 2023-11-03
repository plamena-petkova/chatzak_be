import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import {
  allUsersRoute,
  createAvatarRoute,
  getUserByIdRoute,
  loginRoute,
  registerRoute,
  updateAvatarRoute,
} from "../utils/apiRoutes";
import axios from "axios";

const initialState = {
  user: {},
  allUsers: [],
  contacts: [],
  isLoading: false,
  error: null,
  avatarUrl: "",
  onlineUsers:{},
};

export const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
  const { username, password } = data;
  const response = await axios.post(loginRoute, {
    username,
    password,
  });

  return response.data.user;
 
});

export const register = createAsyncThunk("user/register", async (data) => {
  const { username, password, names, email } = data;

  const response = await axios.post(registerRoute, {
    username,
    password,
    names,
    email,
  });

  return response.data.user;
});

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get(allUsersRoute);
  return response.data.users;
});

export const createAvatar = createAsyncThunk("user/create-avatar", async ({currentUser}) => {

    
  const userId = currentUser._id;
 
  const avatar = `${createAvatarRoute}${currentUser.username}`;

  const newData = { userId, avatar };

  const response = await axios.put(`${updateAvatarRoute}${userId}`, newData);

  return response.data.user;
  }

);

export const updateUsersAvatar = createAsyncThunk(
  "user/update-avatar",
  async ({currentUser, randomNumber}) => {

    const userId = currentUser._id;
    const avatar = `${createAvatarRoute}${randomNumber}`;

    const newData = { userId, avatar };

    const response = await axios.put(`${updateAvatarRoute}${userId}`, newData);

    return response.data.user;
  }
);

export const getUserById = createAsyncThunk("user/get-user", async (userId) => {
  const response = await axios.get(`${getUserByIdRoute}${userId}`);
  return response.data.user;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAvatar: (state, action) => {
      state.avatarUrl = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    logout: (state, action) => {
      state.allUsers = [];
      state.user = {};
      state.contacts = {};
      state.isLoading = false;
      state.avatarUrl = "";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      if (current(state.user)._id) {
        state.allUsers = action.payload.filter(
          (contact) => contact._id !== current(state.user)._id
        );
      }
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

  
    builder.addCase(createAvatar.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createAvatar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.avatarUrl = action.payload;
    });
    builder.addCase(createAvatar.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    
    builder.addCase(updateUsersAvatar.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateUsersAvatar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(updateUsersAvatar.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(getUserById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { logout, setAvatar, setContacts, setErrorClear, setOnlineUsers } = authSlice.actions;

export default authSlice.reducer;
