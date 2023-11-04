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
        state.allProjectsAdmin = action.payload;
    },
    SetAllProjectsAdminFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    CreateProjectSuccess: (state, action) => {
        state.loading = false;
        state.allProjectsAdmin = [action.payload, ...state.requests];
    },
    CreateProjectFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    DeleteProjectSuccess: (state, action) => {
        state.loading = false;
        state.allProjectsAdmin = state.projects.filter(
            (project) => project._id !== action.payload._id
        );
    },
    DeleteProjectFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    EditProjectSuccess: (state, action) => {
        state.loading = false;
        state.allProjectsAdmin = [action.payload, ...state.projects];
    },
    EditProjectFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    dissolveErrors: (state) => {
        state.error = null;
    },
});