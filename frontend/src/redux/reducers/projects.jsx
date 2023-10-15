import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    projects: [],
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
    CreateProjectSuccess: (state, action) => {
        state.loading = false;
        state.projects = [action.payload, ...state.requests];
    },
    CreateProjectFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    DeleteProjectSuccess: (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter(
            (project) => project._id !== action.payload._id
        );
    },
    DeleteProjectFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    EditProjectSuccess: (state, action) => {
        state.loading = false;
        state.projects = [action.payload, ...state.projects];
    },
    EditProjectFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    dissolveErrors: (state) => {
        state.error = null;
    },
});