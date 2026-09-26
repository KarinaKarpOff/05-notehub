import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "../../services/noteService";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import css from "./App.module.css";

const App: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSearchChange = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 500);

  const onInputChange = (value: string) => {
    setSearch(value);
    handleSearchChange(value);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={onInputChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <main>
        {isLoading && <p>Loading notes...</p>}
        {isError && <p>Error loading notes!</p>}
        {data && <NoteList notes={data.notes} />}
      </main>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default App;
