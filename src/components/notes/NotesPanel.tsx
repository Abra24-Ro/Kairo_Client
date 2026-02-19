import type { Task } from "@/types";
import { AddNoteForm } from "./AddNoteForm";
import { NoteDetail } from "./NoteDetail";
import { useState } from "react";
import { ChevronDown, ChevronUp, StickyNote } from "lucide-react";

type NotesPanelProps = {
  notes: Task["notes"];
};

export const NotesPanel = ({ notes }: NotesPanelProps) => {
  const [openNotes, setOpenNotes] = useState(true);

  return (
    <section className="space-y-4">
      {/* Header */}
      <button
        onClick={() => setOpenNotes(!openNotes)}
        className="
          w-full flex items-center justify-between
          text-sm font-semibold text-gray-700
          hover:text-indigo-600 transition
        "
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <StickyNote className="h-4 w-4" />
          Notas ({notes.length})
        </div>

        {openNotes ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {openNotes && (
        <>
          {/* Form */}
          <AddNoteForm />

          {/* Notes List */}
          <div className="relative space-y-0">
            {notes.length > 0 ? (
              notes.map((note, index) => (
                <NoteDetail 
                  key={note._id} 
                  note={note} 
                  isLast={index === notes.length - 1}
                />
              ))
            ) : (
              <p className="text-sm text-gray-500 pl-6">
                No hay notas todavía.
              </p>
            )}
          </div>
        </>
      )}
    </section>
  );
};