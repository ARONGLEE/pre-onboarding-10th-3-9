import { TodoData } from './todo';
import { SearchData } from './search';

export type GetTodosResponse = TodoData[];

export type CreateTodoResponse = TodoData;

export type DeleteTodoResponse = null;

export type GetSearchResponse = SearchData;
