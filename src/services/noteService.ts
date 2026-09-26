import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const noteApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
  totalNotes: number;
}

export interface CreateNotePayload {
  title: string;
  content?: string;
  tag: NoteTag;
}

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const response = await noteApi.get<FetchNotesResponse>("/notes", { params });
  return response.data;
};

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const response = await noteApi.post<Note>("/notes", payload);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await noteApi.delete<Note>(`/notes/${id}`);
  return response.data;
};
