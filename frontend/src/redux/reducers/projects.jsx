import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    projects: [],
    allProjects: [],
    allProjectsAdmin: [],
    postSuccess: false,
}

export const projectsReducer = createReducer(initialState, {
    SetProjects: (state) => {
        state.loading = true;
    },
    SetProjectsSuccess: (state, action) => {
        state.loading = false;
        state.projects = action.payload;
    },
    SetProjectsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    SetAllProjectsSuccess: (state, action) => {
        state.loading = false;
        state.allProjects = action.payload;
    },
    SetAllProjectsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    SetAllProjectsAdminSuccess: (state, action) => {
        state.loading = false;
    },
    SetAllProjectsAdminFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    CreateProjectSuccess: (state, action) => {
        state.loading = false;
    },
    CreateProjectFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    DeleteProjectSuccess: (state, action) => {
        state.loading = false;
    },
    DeleteProjectFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    EditProjectSuccess: (state, action) => {
        state.loading = false;
    },
    EditProjectFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    dissolveErrors: (state) => {
        state.error = null;
    },
});