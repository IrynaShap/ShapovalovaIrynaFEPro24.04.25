export default function TaskList({ items, onView, onEdit, onDelete }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => {
        const id = item._id || item.id;
        return (
          <li key={id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white/70 p-3 shadow-sm backdrop-blur">
            <span className="truncate pr-3 font-medium text-slate-800">{item.title}</span>
            <div className="flex shrink-0 items-center gap-2">
              <button className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-sky-700" onClick={() => onView(item)}>View</button>
              <button className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-amber-600" onClick={() => onEdit(item)}>Edit</button>
              <button className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-rose-700" onClick={() => onDelete(id)}>Delete</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}


