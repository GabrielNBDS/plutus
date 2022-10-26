import { start } from 'turbolinks'

start()

document.addEventListener('turbolinks:load', function (event) {
  for (let form of document.querySelectorAll('form[method=get]:not([data-remote=true])')) {
    form.addEventListener('submit', function (event) {
      event.preventDefault()
      const entries = [...new FormData(event.target).entries()]
      const actionUrl = new URL(event.target.action)
      const currentUrl = new URL(location.href)
      // if pathname not changed, hand over per parameter to next page.
      if (actionUrl.pathname === currentUrl.pathname && currentUrl.searchParams.has('per')) {
        actionUrl.searchParams.set('per', currentUrl.searchParams.get('per'))
      }
      entries.forEach((entry) => actionUrl.searchParams.append(...entry))
      Turbolinks.visit(actionUrl.toString())
    })
  }
})
