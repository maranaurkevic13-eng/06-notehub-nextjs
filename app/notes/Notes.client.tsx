"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/types/note";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
   queryKey: ["notes", page, debouncedSearch],
   queryFn: () => fetchNotes(page, 10, debouncedSearch),
  });


  return (
    <div>
      <SearchBox onSearch={(value) => { setSearch(value); setPage(1); }} />
      {data && data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={page - 1}
          onPageChange={(selected) => setPage(selected + 1)}
        />
      )}
      <button onClick={() => setIsOpen(true)}>Create note +</button>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}
      {data && <NoteList notes={data.notes} />}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
