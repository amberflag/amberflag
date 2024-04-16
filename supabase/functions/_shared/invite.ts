import { html } from 'html'
import { thanks } from './components/thanks.ts'
import { footer } from './components/footer.ts'
import { spacer } from './components/spacer.ts'

export const invite = (projectName: string) => {
  const greetins = html`<h3 style="padding: 20px 20px 0px 20px;">👋 Hello,</h3>`

  return html`<body
    style="background-color: rgb(245 245 245);border-radius: 0.5rem;"
  >
    ${greetins}
    <p style="padding-left: 10px">
      You have been invited to
      <a href="https://amberflag.vercel.app">Amber flag</a> to the project
      ${projectName}.
    </p>
    ${thanks} ${spacer} ${footer}
  </body>`
}
