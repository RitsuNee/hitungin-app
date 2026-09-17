import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Comment_Key {
  id: UUIDString;
  __typename?: 'Comment_Key';
}

export interface CreateCommentData {
  comment_insert: Comment_Key;
}

export interface CreateCommentVariables {
  content: string;
  taskId: UUIDString;
}

export interface CreateProjectData {
  project_insert: Project_Key;
}

export interface CreateProjectVariables {
  name: string;
  description?: string | null;
}

export interface CreateTaskData {
  task_insert: Task_Key;
}

export interface CreateTaskVariables {
  title: string;
  status: string;
  projectId: UUIDString;
}

export interface CreateTeamMemberData {
  teamMember_insert: TeamMember_Key;
}

export interface CreateTeamMemberVariables {
  projectId: UUIDString;
  role: string;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  email: string;
  displayName: string;
}

export interface DeleteCommentData {
  comment_delete?: Comment_Key | null;
}

export interface DeleteCommentVariables {
  id: UUIDString;
}

export interface DeleteProjectData {
  project_delete?: Project_Key | null;
}

export interface DeleteProjectVariables {
  id: UUIDString;
}

export interface DeleteTaskData {
  task_delete?: Task_Key | null;
}

export interface DeleteTaskVariables {
  id: UUIDString;
}

export interface DeleteTeamMemberData {
  teamMember_delete?: TeamMember_Key | null;
}

export interface DeleteTeamMemberVariables {
  projectId: UUIDString;
}

export interface DeleteUserData {
  user_delete?: User_Key | null;
}

export interface GetCommentData {
  comment?: {
    content: string;
    createdAt?: TimestampString | null;
    author: {
      displayName: string;
    };
  };
}

export interface GetCommentVariables {
  id: UUIDString;
}

export interface GetCurrentUserData {
  user?: {
    email: string;
    displayName: string;
    avatarUrl?: string | null;
  };
}

export interface GetProjectData {
  project?: {
    name: string;
    description?: string | null;
    deadline?: TimestampString | null;
    owner: {
      displayName: string;
    };
  };
}

export interface GetProjectVariables {
  id: UUIDString;
}

export interface GetTaskData {
  task?: {
    title: string;
    status: string;
    dueDate?: TimestampString | null;
    project: {
      name: string;
    };
  };
}

export interface GetTaskVariables {
  id: UUIDString;
}

export interface GetTeamMemberData {
  teamMember?: {
    role: string;
  };
}

export interface GetTeamMemberVariables {
  projectId: UUIDString;
  userId: UUIDString;
}

export interface ListCommentsData {
  comments: ({
    content: string;
    author: {
      displayName: string;
    };
  })[];
}

export interface ListCommentsVariables {
  taskId: UUIDString;
}

export interface ListProjectsData {
  projects: ({
    id: UUIDString;
    name: string;
    deadline?: TimestampString | null;
  } & Project_Key)[];
}

export interface ListTasksData {
  tasks: ({
    id: UUIDString;
    title: string;
    status: string;
  } & Task_Key)[];
}

export interface ListTasksVariables {
  projectId: UUIDString;
}

export interface ListTeamMembersData {
  teamMembers: ({
    user: {
      displayName: string;
    };
    role: string;
  })[];
}

export interface ListTeamMembersVariables {
  projectId: UUIDString;
}

export interface ListUsersData {
  users: ({
    id: UUIDString;
    displayName: string;
    avatarUrl?: string | null;
  } & User_Key)[];
}

export interface Project_Key {
  id: UUIDString;
  __typename?: 'Project_Key';
}

export interface Task_Key {
  id: UUIDString;
  __typename?: 'Task_Key';
}

export interface TeamMember_Key {
  userId: UUIDString;
  projectId: UUIDString;
  __typename?: 'TeamMember_Key';
}

export interface UpdateCommentData {
  comment_update?: Comment_Key | null;
}

export interface UpdateCommentVariables {
  id: UUIDString;
  content?: string | null;
}

export interface UpdateProjectData {
  project_update?: Project_Key | null;
}

export interface UpdateProjectVariables {
  id: UUIDString;
  name?: string | null;
}

export interface UpdateTaskData {
  task_update?: Task_Key | null;
}

export interface UpdateTaskVariables {
  id: UUIDString;
  status?: string | null;
}

export interface UpdateTeamMemberData {
  teamMember_update?: TeamMember_Key | null;
}

export interface UpdateTeamMemberVariables {
  projectId: UUIDString;
  role: string;
}

export interface UpdateUserData {
  user_update?: User_Key | null;
}

export interface UpdateUserVariables {
  displayName: string;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;
export function updateUser(dc: DataConnect, vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface DeleteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
  operationName: string;
}
export const deleteUserRef: DeleteUserRef;

export function deleteUser(): MutationPromise<DeleteUserData, undefined>;
export function deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface GetCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
  operationName: string;
}
export const getCurrentUserRef: GetCurrentUserRef;

export function getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;
export function getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface CreateProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
  operationName: string;
}
export const createProjectRef: CreateProjectRef;

export function createProject(vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;
export function createProject(dc: DataConnect, vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;

interface UpdateProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
  operationName: string;
}
export const updateProjectRef: UpdateProjectRef;

export function updateProject(vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;
export function updateProject(dc: DataConnect, vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;

interface DeleteProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
  operationName: string;
}
export const deleteProjectRef: DeleteProjectRef;

export function deleteProject(vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;
export function deleteProject(dc: DataConnect, vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;

interface GetProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProjectVariables): QueryRef<GetProjectData, GetProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetProjectVariables): QueryRef<GetProjectData, GetProjectVariables>;
  operationName: string;
}
export const getProjectRef: GetProjectRef;

export function getProject(vars: GetProjectVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectData, GetProjectVariables>;
export function getProject(dc: DataConnect, vars: GetProjectVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectData, GetProjectVariables>;

interface ListProjectsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProjectsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListProjectsData, undefined>;
  operationName: string;
}
export const listProjectsRef: ListProjectsRef;

export function listProjects(options?: ExecuteQueryOptions): QueryPromise<ListProjectsData, undefined>;
export function listProjects(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListProjectsData, undefined>;

interface CreateTaskRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTaskVariables): MutationRef<CreateTaskData, CreateTaskVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTaskVariables): MutationRef<CreateTaskData, CreateTaskVariables>;
  operationName: string;
}
export const createTaskRef: CreateTaskRef;

export function createTask(vars: CreateTaskVariables): MutationPromise<CreateTaskData, CreateTaskVariables>;
export function createTask(dc: DataConnect, vars: CreateTaskVariables): MutationPromise<CreateTaskData, CreateTaskVariables>;

interface UpdateTaskRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTaskVariables): MutationRef<UpdateTaskData, UpdateTaskVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTaskVariables): MutationRef<UpdateTaskData, UpdateTaskVariables>;
  operationName: string;
}
export const updateTaskRef: UpdateTaskRef;

export function updateTask(vars: UpdateTaskVariables): MutationPromise<UpdateTaskData, UpdateTaskVariables>;
export function updateTask(dc: DataConnect, vars: UpdateTaskVariables): MutationPromise<UpdateTaskData, UpdateTaskVariables>;

interface DeleteTaskRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTaskVariables): MutationRef<DeleteTaskData, DeleteTaskVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteTaskVariables): MutationRef<DeleteTaskData, DeleteTaskVariables>;
  operationName: string;
}
export const deleteTaskRef: DeleteTaskRef;

export function deleteTask(vars: DeleteTaskVariables): MutationPromise<DeleteTaskData, DeleteTaskVariables>;
export function deleteTask(dc: DataConnect, vars: DeleteTaskVariables): MutationPromise<DeleteTaskData, DeleteTaskVariables>;

interface GetTaskRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTaskVariables): QueryRef<GetTaskData, GetTaskVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTaskVariables): QueryRef<GetTaskData, GetTaskVariables>;
  operationName: string;
}
export const getTaskRef: GetTaskRef;

export function getTask(vars: GetTaskVariables, options?: ExecuteQueryOptions): QueryPromise<GetTaskData, GetTaskVariables>;
export function getTask(dc: DataConnect, vars: GetTaskVariables, options?: ExecuteQueryOptions): QueryPromise<GetTaskData, GetTaskVariables>;

interface ListTasksRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTasksVariables): QueryRef<ListTasksData, ListTasksVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTasksVariables): QueryRef<ListTasksData, ListTasksVariables>;
  operationName: string;
}
export const listTasksRef: ListTasksRef;

export function listTasks(vars: ListTasksVariables, options?: ExecuteQueryOptions): QueryPromise<ListTasksData, ListTasksVariables>;
export function listTasks(dc: DataConnect, vars: ListTasksVariables, options?: ExecuteQueryOptions): QueryPromise<ListTasksData, ListTasksVariables>;

interface CreateCommentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCommentVariables): MutationRef<CreateCommentData, CreateCommentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCommentVariables): MutationRef<CreateCommentData, CreateCommentVariables>;
  operationName: string;
}
export const createCommentRef: CreateCommentRef;

export function createComment(vars: CreateCommentVariables): MutationPromise<CreateCommentData, CreateCommentVariables>;
export function createComment(dc: DataConnect, vars: CreateCommentVariables): MutationPromise<CreateCommentData, CreateCommentVariables>;

interface UpdateCommentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCommentVariables): MutationRef<UpdateCommentData, UpdateCommentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateCommentVariables): MutationRef<UpdateCommentData, UpdateCommentVariables>;
  operationName: string;
}
export const updateCommentRef: UpdateCommentRef;

export function updateComment(vars: UpdateCommentVariables): MutationPromise<UpdateCommentData, UpdateCommentVariables>;
export function updateComment(dc: DataConnect, vars: UpdateCommentVariables): MutationPromise<UpdateCommentData, UpdateCommentVariables>;

interface DeleteCommentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCommentVariables): MutationRef<DeleteCommentData, DeleteCommentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteCommentVariables): MutationRef<DeleteCommentData, DeleteCommentVariables>;
  operationName: string;
}
export const deleteCommentRef: DeleteCommentRef;

export function deleteComment(vars: DeleteCommentVariables): MutationPromise<DeleteCommentData, DeleteCommentVariables>;
export function deleteComment(dc: DataConnect, vars: DeleteCommentVariables): MutationPromise<DeleteCommentData, DeleteCommentVariables>;

interface GetCommentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCommentVariables): QueryRef<GetCommentData, GetCommentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCommentVariables): QueryRef<GetCommentData, GetCommentVariables>;
  operationName: string;
}
export const getCommentRef: GetCommentRef;

export function getComment(vars: GetCommentVariables, options?: ExecuteQueryOptions): QueryPromise<GetCommentData, GetCommentVariables>;
export function getComment(dc: DataConnect, vars: GetCommentVariables, options?: ExecuteQueryOptions): QueryPromise<GetCommentData, GetCommentVariables>;

interface ListCommentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCommentsVariables): QueryRef<ListCommentsData, ListCommentsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListCommentsVariables): QueryRef<ListCommentsData, ListCommentsVariables>;
  operationName: string;
}
export const listCommentsRef: ListCommentsRef;

export function listComments(vars: ListCommentsVariables, options?: ExecuteQueryOptions): QueryPromise<ListCommentsData, ListCommentsVariables>;
export function listComments(dc: DataConnect, vars: ListCommentsVariables, options?: ExecuteQueryOptions): QueryPromise<ListCommentsData, ListCommentsVariables>;

interface CreateTeamMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTeamMemberVariables): MutationRef<CreateTeamMemberData, CreateTeamMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTeamMemberVariables): MutationRef<CreateTeamMemberData, CreateTeamMemberVariables>;
  operationName: string;
}
export const createTeamMemberRef: CreateTeamMemberRef;

export function createTeamMember(vars: CreateTeamMemberVariables): MutationPromise<CreateTeamMemberData, CreateTeamMemberVariables>;
export function createTeamMember(dc: DataConnect, vars: CreateTeamMemberVariables): MutationPromise<CreateTeamMemberData, CreateTeamMemberVariables>;

interface UpdateTeamMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTeamMemberVariables): MutationRef<UpdateTeamMemberData, UpdateTeamMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTeamMemberVariables): MutationRef<UpdateTeamMemberData, UpdateTeamMemberVariables>;
  operationName: string;
}
export const updateTeamMemberRef: UpdateTeamMemberRef;

export function updateTeamMember(vars: UpdateTeamMemberVariables): MutationPromise<UpdateTeamMemberData, UpdateTeamMemberVariables>;
export function updateTeamMember(dc: DataConnect, vars: UpdateTeamMemberVariables): MutationPromise<UpdateTeamMemberData, UpdateTeamMemberVariables>;

interface DeleteTeamMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTeamMemberVariables): MutationRef<DeleteTeamMemberData, DeleteTeamMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteTeamMemberVariables): MutationRef<DeleteTeamMemberData, DeleteTeamMemberVariables>;
  operationName: string;
}
export const deleteTeamMemberRef: DeleteTeamMemberRef;

export function deleteTeamMember(vars: DeleteTeamMemberVariables): MutationPromise<DeleteTeamMemberData, DeleteTeamMemberVariables>;
export function deleteTeamMember(dc: DataConnect, vars: DeleteTeamMemberVariables): MutationPromise<DeleteTeamMemberData, DeleteTeamMemberVariables>;

interface GetTeamMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTeamMemberVariables): QueryRef<GetTeamMemberData, GetTeamMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTeamMemberVariables): QueryRef<GetTeamMemberData, GetTeamMemberVariables>;
  operationName: string;
}
export const getTeamMemberRef: GetTeamMemberRef;

export function getTeamMember(vars: GetTeamMemberVariables, options?: ExecuteQueryOptions): QueryPromise<GetTeamMemberData, GetTeamMemberVariables>;
export function getTeamMember(dc: DataConnect, vars: GetTeamMemberVariables, options?: ExecuteQueryOptions): QueryPromise<GetTeamMemberData, GetTeamMemberVariables>;

interface ListTeamMembersRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTeamMembersVariables): QueryRef<ListTeamMembersData, ListTeamMembersVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTeamMembersVariables): QueryRef<ListTeamMembersData, ListTeamMembersVariables>;
  operationName: string;
}
export const listTeamMembersRef: ListTeamMembersRef;

export function listTeamMembers(vars: ListTeamMembersVariables, options?: ExecuteQueryOptions): QueryPromise<ListTeamMembersData, ListTeamMembersVariables>;
export function listTeamMembers(dc: DataConnect, vars: ListTeamMembersVariables, options?: ExecuteQueryOptions): QueryPromise<ListTeamMembersData, ListTeamMembersVariables>;

