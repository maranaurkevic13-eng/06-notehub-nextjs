'use client';
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";

export default function NotesClient() {
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
        queryKey: ['notes', page, search],
        queryFn: () => fetchNotes(page + 1, 10, search)
    })

    return (
        <div>
            <SearchBox onSearch={(vaule) => { setSearch(vaule); setPage(0) }} />
            {data && data.totalPages > 1 && (
                <Pagination pageCount={data.totalPages} currentPage={page} onPageChange={setPage}/>
            )}
            <button onClick={() => setIsOpen(true)}>Create note +</button>

            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading notes</p>}
            {data && <NoteList notes={data.notes} />}
            
            {isOpen && (
                <Modal onClose={() => setIsOpen(false)}>
                    <NoteForm onClose={() => setIsOpen(false)}/>
                </Modal>
            )}
        </div>
    )
}