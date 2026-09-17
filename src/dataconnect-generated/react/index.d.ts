import { CreateUserData, CreateUserVariables, UpdateUserData, UpdateUserVariables, DeleteUserData, GetCurrentUserData, ListUsersData, CreateProjectData, CreateProjectVariables, UpdateProjectData, UpdateProjectVariables, DeleteProjectData, DeleteProjectVariables, GetProjectData, GetProjectVariables, ListProjectsData, CreateTaskData, CreateTaskVariables, UpdateTaskData, UpdateTaskVariables, DeleteTaskData, DeleteTaskVariables, GetTaskData, GetTaskVariables, ListTasksData, ListTasksVariables, CreateCommentData, CreateCommentVariables, UpdateCommentData, UpdateCommentVariables, DeleteCommentData, DeleteCommentVariables, GetCommentData, GetCommentVariables, ListCommentsData, ListCommentsVariables, CreateTeamMemberData, CreateTeamMemberVariables, UpdateTeamMemberData, UpdateTeamMemberVariables, DeleteTeamMemberData, DeleteTeamMemberVariables, GetTeamMemberData, GetTeamMemberVariables, ListTeamMembersData, ListTeamMembersVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useUpdateUser(options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;
export function useUpdateUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;

export function useDeleteUser(options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;
export function useDeleteUser(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;

export function useGetCurrentUser(options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;
export function useGetCurrentUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;

export function useListUsers(options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;
export function useListUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;

export function useCreateProject(options?: useDataConnectMutationOptions<CreateProjectData, FirebaseError, CreateProjectVariables>): UseDataConnectMutationResult<CreateProjectData, CreateProjectVariables>;
export function useCreateProject(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProjectData, FirebaseError, CreateProjectVariables>): UseDataConnectMutationResult<CreateProjectData, CreateProjectVariables>;

export function useUpdateProject(options?: useDataConnectMutationOptions<UpdateProjectData, FirebaseError, UpdateProjectVariables>): UseDataConnectMutationResult<UpdateProjectData, UpdateProjectVariables>;
export function useUpdateProject(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProjectData, FirebaseError, UpdateProjectVariables>): UseDataConnectMutationResult<UpdateProjectData, UpdateProjectVariables>;

export function useDeleteProject(options?: useDataConnectMutationOptions<DeleteProjectData, FirebaseError, DeleteProjectVariables>): UseDataConnectMutationResult<DeleteProjectData, DeleteProjectVariables>;
export function useDeleteProject(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteProjectData, FirebaseError, DeleteProjectVariables>): UseDataConnectMutationResult<DeleteProjectData, DeleteProjectVariables>;

export function useGetProject(vars: GetProjectVariables, options?: useDataConnectQueryOptions<GetProjectData>): UseDataConnectQueryResult<GetProjectData, GetProjectVariables>;
export function useGetProject(dc: DataConnect, vars: GetProjectVariables, options?: useDataConnectQueryOptions<GetProjectData>): UseDataConnectQueryResult<GetProjectData, GetProjectVariables>;

export function useListProjects(options?: useDataConnectQueryOptions<ListProjectsData>): UseDataConnectQueryResult<ListProjectsData, undefined>;
export function useListProjects(dc: DataConnect, options?: useDataConnectQueryOptions<ListProjectsData>): UseDataConnectQueryResult<ListProjectsData, undefined>;

export function useCreateTask(options?: useDataConnectMutationOptions<CreateTaskData, FirebaseError, CreateTaskVariables>): UseDataConnectMutationResult<CreateTaskData, CreateTaskVariables>;
export function useCreateTask(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTaskData, FirebaseError, CreateTaskVariables>): UseDataConnectMutationResult<CreateTaskData, CreateTaskVariables>;

export function useUpdateTask(options?: useDataConnectMutationOptions<UpdateTaskData, FirebaseError, UpdateTaskVariables>): UseDataConnectMutationResult<UpdateTaskData, UpdateTaskVariables>;
export function useUpdateTask(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTaskData, FirebaseError, UpdateTaskVariables>): UseDataConnectMutationResult<UpdateTaskData, UpdateTaskVariables>;

export function useDeleteTask(options?: useDataConnectMutationOptions<DeleteTaskData, FirebaseError, DeleteTaskVariables>): UseDataConnectMutationResult<DeleteTaskData, DeleteTaskVariables>;
export function useDeleteTask(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTaskData, FirebaseError, DeleteTaskVariables>): UseDataConnectMutationResult<DeleteTaskData, DeleteTaskVariables>;

export function useGetTask(vars: GetTaskVariables, options?: useDataConnectQueryOptions<GetTaskData>): UseDataConnectQueryResult<GetTaskData, GetTaskVariables>;
export function useGetTask(dc: DataConnect, vars: GetTaskVariables, options?: useDataConnectQueryOptions<GetTaskData>): UseDataConnectQueryResult<GetTaskData, GetTaskVariables>;

export function useListTasks(vars: ListTasksVariables, options?: useDataConnectQueryOptions<ListTasksData>): UseDataConnectQueryResult<ListTasksData, ListTasksVariables>;
export function useListTasks(dc: DataConnect, vars: ListTasksVariables, options?: useDataConnectQueryOptions<ListTasksData>): UseDataConnectQueryResult<ListTasksData, ListTasksVariables>;

export function useCreateComment(options?: useDataConnectMutationOptions<CreateCommentData, FirebaseError, CreateCommentVariables>): UseDataConnectMutationResult<CreateCommentData, CreateCommentVariables>;
export function useCreateComment(dc: DataConnect, options?: useDataConnectMutationOptions<CreateCommentData, FirebaseError, CreateCommentVariables>): UseDataConnectMutationResult<CreateCommentData, CreateCommentVariables>;

export function useUpdateComment(options?: useDataConnectMutationOptions<UpdateCommentData, FirebaseError, UpdateCommentVariables>): UseDataConnectMutationResult<UpdateCommentData, UpdateCommentVariables>;
export function useUpdateComment(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateCommentData, FirebaseError, UpdateCommentVariables>): UseDataConnectMutationResult<UpdateCommentData, UpdateCommentVariables>;

export function useDeleteComment(options?: useDataConnectMutationOptions<DeleteCommentData, FirebaseError, DeleteCommentVariables>): UseDataConnectMutationResult<DeleteCommentData, DeleteCommentVariables>;
export function useDeleteComment(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteCommentData, FirebaseError, DeleteCommentVariables>): UseDataConnectMutationResult<DeleteCommentData, DeleteCommentVariables>;

export function useGetComment(vars: GetCommentVariables, options?: useDataConnectQueryOptions<GetCommentData>): UseDataConnectQueryResult<GetCommentData, GetCommentVariables>;
export function useGetComment(dc: DataConnect, vars: GetCommentVariables, options?: useDataConnectQueryOptions<GetCommentData>): UseDataConnectQueryResult<GetCommentData, GetCommentVariables>;

export function useListComments(vars: ListCommentsVariables, options?: useDataConnectQueryOptions<ListCommentsData>): UseDataConnectQueryResult<ListCommentsData, ListCommentsVariables>;
export function useListComments(dc: DataConnect, vars: ListCommentsVariables, options?: useDataConnectQueryOptions<ListCommentsData>): UseDataConnectQueryResult<ListCommentsData, ListCommentsVariables>;

export function useCreateTeamMember(options?: useDataConnectMutationOptions<CreateTeamMemberData, FirebaseError, CreateTeamMemberVariables>): UseDataConnectMutationResult<CreateTeamMemberData, CreateTeamMemberVariables>;
export function useCreateTeamMember(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTeamMemberData, FirebaseError, CreateTeamMemberVariables>): UseDataConnectMutationResult<CreateTeamMemberData, CreateTeamMemberVariables>;

export function useUpdateTeamMember(options?: useDataConnectMutationOptions<UpdateTeamMemberData, FirebaseError, UpdateTeamMemberVariables>): UseDataConnectMutationResult<UpdateTeamMemberData, UpdateTeamMemberVariables>;
export function useUpdateTeamMember(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTeamMemberData, FirebaseError, UpdateTeamMemberVariables>): UseDataConnectMutationResult<UpdateTeamMemberData, UpdateTeamMemberVariables>;

export function useDeleteTeamMember(options?: useDataConnectMutationOptions<DeleteTeamMemberData, FirebaseError, DeleteTeamMemberVariables>): UseDataConnectMutationResult<DeleteTeamMemberData, DeleteTeamMemberVariables>;
export function useDeleteTeamMember(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTeamMemberData, FirebaseError, DeleteTeamMemberVariables>): UseDataConnectMutationResult<DeleteTeamMemberData, DeleteTeamMemberVariables>;

export function useGetTeamMember(vars: GetTeamMemberVariables, options?: useDataConnectQueryOptions<GetTeamMemberData>): UseDataConnectQueryResult<GetTeamMemberData, GetTeamMemberVariables>;
export function useGetTeamMember(dc: DataConnect, vars: GetTeamMemberVariables, options?: useDataConnectQueryOptions<GetTeamMemberData>): UseDataConnectQueryResult<GetTeamMemberData, GetTeamMemberVariables>;

export function useListTeamMembers(vars: ListTeamMembersVariables, options?: useDataConnectQueryOptions<ListTeamMembersData>): UseDataConnectQueryResult<ListTeamMembersData, ListTeamMembersVariables>;
export function useListTeamMembers(dc: DataConnect, vars: ListTeamMembersVariables, options?: useDataConnectQueryOptions<ListTeamMembersData>): UseDataConnectQueryResult<ListTeamMembersData, ListTeamMembersVariables>;
