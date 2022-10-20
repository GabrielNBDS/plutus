export default function (path: string) {
  return async ({ view }) => {
    return view.render(path)
  }
}
