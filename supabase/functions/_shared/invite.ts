import { html } from 'html'

export const invite = (projectName: string) => {
  return html` <body
    style="
	      background-color: rgb(245 245 245);
	      border-radius: 0.5rem;"
  >
    <div
      style="
		      display: flex;
		      align-items: center;
          background-color: rgb(55, 62, 65);
          border-top-right-radius: 5rem;
  		    border-bottom-right-radius: 5rem;
          padding-left: 15px;
          gap: 8px;
          height: 48px"
    >
      <div>💛</div>
      <div
        style="
            color: white;
            font-size: 20px;
            font-weight: 500;
            line-height: 32px;"
      >
        Amber Flag
      </div>
    </div>
    <h3 style="padding: 0px 20px 0px 20px;">👋 Hello,</h3>
    <p style="padding-left: 10px">
      You have been invited to
      <a
        style="
            color: #e5b700;
            font-weight: 900;"
        href="https://amberflag.vercel.app"
      >
        Amber flag
      </a>
      to the project ${projectName}.
    </p>
    <div
      style="
          display: flex;
          justify-content: center;
          align-items: center;
          letter-spacing: 0.1em;"
    >
      <div style="font-size: 2rem; margin-right: 5px">🤩</div>
      <p>Thank you.</p>
    </div>
    <div style="height: 1rem;"></div>
    <a href="https://amberflag.vercel.com" style="text-decoration: none;">
      <div
        style="background-color: rgb(55, 62, 65); padding: 2px 0px 0px 2px; display:flex; justify-content:center; align-items: center;  border-bottom-left-radius: 0.5rem;border-bottom-right-radius: 0.5rem; "
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
    </a>
  </body>`
}
