import { html } from 'html'
const pageRedirect = Deno.env.get('PAGE_REDIRECT')

export const footer = html`<a
  href="${pageRedirect}"
  style="text-decoration: none;"
>
  <div
    style="background-color: black; padding: 2px 0px 0px 2px; display:flex; justify-content:center; align-items: center;  border-bottom-left-radius: 0.5rem;border-bottom-right-radius: 0.5rem; "
  >
    <h3
      style="color: rgb(161 161 170); font-weight: 600;letter-spacing: 0.025em; margin-right:4px"
    >
      Powered by
    </h3>
    <h3 style="color: white; font-weight: 600;letter-spacing: 0.05em;">
      AmberFlag
    </h3>
  </div>
</a>`
