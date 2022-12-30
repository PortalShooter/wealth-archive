const styles = `
  body {
    --color-green: #00857C;
    --color-teal: #75DBD3;
    --color-dark-gray: #696C71;
    --easeOutExpo: cubic-bezier(0.16, 1, 0.3, 1);
    --transparent: rgba(255, 255, 255, 0);
    --btn-border-color-normal: var(--color-green);
    --btn-bg-color-normal: var(--color-green);
    --btn-border-color-hover: #00655E;
    --btn-bg-color-hover: #00655E;
    --btn-color-hover: #ffffff;
    --btn-border-color-active: #00534F;
    --btn-bg-color-active: #00534F;
    --btn-color-active: #ffffff;
    --btn-border-color-focus-visible: var(--color-green);
    --btn-bg-color-focus-visible: var(--color-green);
    --btn-color-focus-visible: #ffffff;
  }

  .hs-form {
    display: flex;
    gap: 20px;
    justify-content: space-between;
   }

  .hs_email {
    flex-grow: 1;
  }

  .hs-button {
    font-family: "Neue Haas Unica Pro";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    text-align: center;
    font-feature-settings: "liga" off;
    font-weight: 500;
    box-sizing: border-box;
    position: relative;
    padding: 10px 20px 14px;
    min-width: 185px;
    border-radius: 8px;
    border: 1px solid var(--btn-border-color-normal) !important;
    background-color: var(--btn-bg-color-normal) !important;
    color: var(--btn-color-normal);
    outline: none;
    transition: background-color 0.5s var(--easeOutExpo), color 0.5s var(--easeOutExpo);
    width: 100%;
    height: 48px;
  }

  .hs-button:hover {
    border-color: var(--btn-border-color-hover) !important;
    background-color: var(--btn-bg-color-hover) !important;
    color: var(--btn-color-hover) !important;
  }

  .hs-button:active {
    border-color: var(--btn-border-color-active) !important;
    background-color: var(--btn-bg-color-active) !important;
    color: var(--btn-color-active) !important;
  }

  .hs-button:focus-visible {
    border-color: var(--btn-border-color-focus-visible) !important;
    background-color: var(--btn-bg-color-focus-visible) !important;
    color: var(--btn-color-focus-visible) !important;
  }


  .actions {
    margin: 0;
    padding: 0;
    transform: translate(-3px, 3px);
    position: relative;
  }

  .actions::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 8px;
    box-shadow: 0 0 0 3px #75DBD3;
    opacity: 0;
    transition-duration: 0.5s;
    transition-timing-function: var(--easeOutExpo);
    transition-property: opacity;
  }

  .actions:focus-within::before {
    opacity: 1;
  }

  label {
    display: none
  }

  .hs-error-msgs li {
    position: relative;
  }

  label.hs-error-msg {
    display: block;
    position: relative;
    top: 8px;
    left: 0;
    font-family: "Neue Haas Unica Pro", sans-serif;
    font-size: 13px;
    line-height: 16px;
    color: #D90B1C;
  }

  .input {
    padding-top: 3px;
    padding-left: 3px;
  }

  .input input {
    display: block;
    width: 100%;
    border: 1px solid var(--color-dark-gray);
    padding: 11px 15px 12px !important;
    color: var(--color-dark-gray);
    height: auto;
    border-radius: 8px;
    outline: none;
    font-size: 16px;
    line-height: 1.4;
    transition: border-color 0.5s var(--easeOutExpo), box-shadow 0.5s var(--easeOutExpo);
    box-shadow: 0 0 0 3px var(--transparent);
    -webkit-box-shadow: 0 0 0 3px var(--transparent);
    background-color: white !important;
  }

  .input input:hover {
    border-color: var(--color-green);
  }

  .input input:focus-visible {
    border-color: var(--transparent);
    box-shadow: 0 0 0 3px var(--color-teal) !important;
    -webkit-box-shadow: 0 0 0 3px var(--color-teal) !important;
  }

  .input input::placeholder {
    color: var(--color-dark-gray);
    opacity: .9;
  }

  .submitted-message {
    display: none !important;
  }
`

export default styles;
