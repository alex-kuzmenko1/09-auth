import axios from "axios";
import { User } from "@/types/user";
import { Note } from "@/types/note";

const baseURL = "https://notehub-api.goit.study";

export const serverApi = {
  async getUserFromServer(cookiesHeader?: string): Promise<User | null> {
    try {
      const res = await axios.get(`${baseURL}/users/me`, {
        headers: { Cookie: cookiesHeader ?? '' },
        withCredentials: true,
      });
      return res.data as User;
    } catch (error) {
      console.error("Get user from server error:", error);
      return null;
    }
  },

  async getSession(cookiesHeader?: string): Promise<User | null> {
    try {
      const res = await axios.get(`${baseURL}/auth/session`, {
        headers: { Cookie: cookiesHeader ?? '' },
        withCredentials: true,
      });
      return res.data.user || res.data || null;
    } catch (error) {
      console.error("Get session from server error:", error);
      return null;
    }
  },

  async getNotesServer(
    cookiesHeader?: string,
    params?: Record<string, string | number | boolean>
  ): Promise<Note[]> {
    try {
      const res = await axios.get(`${baseURL}/notes`, {
        headers: { Cookie: cookiesHeader ?? '' },
        withCredentials: true,
        params,
      });
      return res.data as Note[];
    } catch (error) {
      console.error("Get notes from server error:", error);
      return [];
    }
  },

  async fetchNoteByIdServer(id: string, cookiesHeader?: string): Promise<Note | null> {
    try {
      const res = await axios.get(`${baseURL}/notes/${id}`, {
        headers: { Cookie: cookiesHeader ?? '' },
        withCredentials: true,
      });
      return res.data as Note;
    } catch (error) {
      console.error("Fetch note by id server error:", error);
      return null;
    }
  },
};
