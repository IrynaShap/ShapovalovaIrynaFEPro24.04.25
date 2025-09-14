import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  title: Yup.string().trim().min(5, 'Мінімум 5 символів').required('Required'),
  description: Yup.string().trim().min(5, 'Мінімум 5 символів').required('Required'),
});

export default function TaskForm({ initialTask, onSubmit, onCancel, isSubmitting }) {
  const formik = useFormik({
    initialValues: initialTask || { title: '', description: '' },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await onSubmit(values);
      resetForm();
    },
  });

  useEffect(() => {
    if (!initialTask) return;
  }, [initialTask]);

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700">Назва</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Введіть назву завдання"
          className="mt-1 block w-full rounded-lg border border-slate-300 bg-white/80 p-2.5 text-slate-800 placeholder-slate-400 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title ? (
          <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
        ) : null}
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700">Опис</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          placeholder="Введіть опис завдання"
          className="mt-1 block w-full rounded-lg border border-slate-300 bg-white/80 p-2.5 text-slate-800 placeholder-slate-400 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <p className="mt-1 text-sm text-red-600">{formik.errors.description}</p>
        ) : null}
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!formik.isValid || !formik.dirty || isSubmitting}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
        >
          {initialTask ? 'Оновити' : 'Зберегти'}
        </button>
        {initialTask ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-slate-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            Скасувати
          </button>
        ) : null}
      </div>
    </form>
  );
}


