const formStyles = `
  form {
    padding-top: 6px
  }

  .hs-form-field {
    position: relative;
  }

  label:not(.hs-error-msg) {
    position: absolute;
    display: inline-block;
    background-color: #ffffff;
    padding: 0 4px;
    left: 16px;
    top: -8px;
  }

  label span {
    font-size: 13px;
    line-height: 120%;
    color: #82858c;
    font-family: inherit;
  }

  label span:nth-child(2) {
    color: #00857C;
  }

  .input {
    border: 1px solid #aaafb8;
    border-radius: 4px;
  }

  .hs-input:not([type=file]) {
    font-size: 16px !important;
    line-height: 150% !important;
    padding: 4px 16px !important;
    height: 46px;
    color: #1A1B1C !important;
    background-color: #ffffff;
  }

  input.hs-input.error {
    border: 1px solid #aaafb8;
    border: none;
  }

  .inputs-list list {
    position: relative;
  }

  .hs-error-msg {
    position: absolute;
    left: 8px;
    white-space: nowrap !important;
  }

  .field {
    margin-bottom: 32px;
  }

  .hs-input:not([type=file]) {
    border-color: transparent;
  }

  .actions {
    padding: 0;
    margin-bottom: 0;
  }

  .hs-button {
    border: none !important;
    font-size: 18px !important;
    line-height: 145% !important;
    font-weight: 500 !important;
    box-sizing: border-box !important;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    text-align: center;
    padding: 16px 69px;
    border-radius: 8px;
    transition: all ease 0.3s;
    white-space: nowrap;
    background: #00857C !important;
  }

  .hs-button:hover,
  .hs-button:focus {
    background-color: #27A299 !important;
  }

  .hs-button:active {
    background-color: #00746D !important;
  }

  .hs-main-font-element {
    position: static !important;
  }

  .submitted-message {
    font-size: 18px !important;
    line-height: 24px !important;
    color: #1a1a1a !important;
    font-family: "Neue Haas Unica Pro";

  }
`;

export const hsFormStyles = () => {
  return `
    <style>
      ${formStyles}
    </style>
  `;
};
