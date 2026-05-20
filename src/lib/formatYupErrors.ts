import * as yup from "yup";

/** Maps a Yup validation failure to field → error messages (App Router validators). */
export function formatYupErrors(err: unknown): Record<string, string[]> {
  const error: Record<string, string[]> = {};
  if (!(err instanceof yup.ValidationError)) {
    return error;
  }
  if (err.inner.length > 0) {
    for (const e of err.inner) {
      const path = e.path ?? "_root";
      if (!error[path]) error[path] = [];
      error[path].push(e.message);
    }
  } else if (err.path) {
    if (!error[err.path]) error[err.path] = [];
    error[err.path].push(err.message);
  } else {
    if (!error._root) error._root = [];
    error._root.push(err.message);
  }
  return error;
}
