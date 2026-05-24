import axios from "axios";
import type { Note } from "../types/note";

const API_URL = 'https://notehub-public.goit.study/api/notes'
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const headers = {
  Authorization: `Bearer ${token}`,
};

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
    page: number,
    perPage: number,
    search?: string): Promise<FetchNotesResponse>=> {
    const res = await axios.get<FetchNotesResponse>(API_URL, {
        headers,
        params: {page, perPage, search}
    })
        return res.data
}

export const createNote = async (note: Omit<Note, "id">): Promise<Note> => {
    const res = await axios.post<Note>(API_URL, note, {headers})
    return res.data;
}

export const deleteNote = async (id: string): Promise<Note> => {
    const res = await axios.delete<Note>(`${API_URL}/${id}`, {headers});
    return res.data;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(`${API_URL}/${id}`, { headers });
  return res.data;
}