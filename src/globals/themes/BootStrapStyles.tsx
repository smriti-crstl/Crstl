import styled from "styled-components";

const BootStrapFormStyles = styled.div`
  @font-face {
    font-family: "Glyphicons Halflings";
    src: url("/fonts/glyphicons-halflings-regular.eot");
    src: url("/fonts/glyphicons-halflings-regular.eot?#iefix")
        format("embedded-opentype"),
      url("/fonts/glyphicons-halflings-regular.woff2") format("woff2"),
      url("/fonts/glyphicons-halflings-regular.woff") format("woff"),
      url("/fonts/glyphicons-halflings-regular.ttf") format("truetype"),
      url("/fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular")
        format("svg");
  }

  fieldset {
    min-width: 0;
    padding: 0;
    margin: 0;
    border: 0;
  }
  legend {
    display: block;
    width: 100%;
    padding: 0;
    margin-bottom: 20px;
    font-size: 21px;
    line-height: inherit;
    color: #333333;
    border: 0;
    border-bottom: 1px solid #e5e5e5;
  }
  /* label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
  } */
  input[type="search"] {
    box-sizing: border-box;
    -webkit-appearance: none;
    appearance: none;
  }
  input[type="radio"],
  input[type="checkbox"] {
    margin: 4px 0 0;
    margin-top: 1px;
    line-height: normal;
  }
  input[type="radio"][disabled],
  input[type="checkbox"][disabled],
  input[type="radio"].disabled,
  input[type="checkbox"].disabled,
  fieldset[disabled] input[type="radio"],
  fieldset[disabled] input[type="checkbox"] {
    cursor: not-allowed;
  }
  input[type="file"] {
    display: block;
  }
  input[type="range"] {
    display: block;
    width: 100%;
  }
  select[multiple],
  select[size] {
    height: auto;
  }
  input[type="file"]:focus,
  input[type="radio"]:focus,
  input[type="checkbox"]:focus {
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
  }
  output {
    display: block;
    padding-top: 7px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555555;
  }

  .form-control {
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555555;
    background-color: #ffffff;
    background-image: none;
    border: 1px solid #cccccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    -webkit-transition: border-color ease-in-out 0.15s,
      -webkit-box-shadow ease-in-out 0.15s;
    -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  }
  .form-control:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(102, 175, 233, 0.6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(102, 175, 233, 0.6);
  }
  .form-control::-moz-placeholder {
    color: #999999;
    opacity: 1;
  }
  .form-control:-ms-input-placeholder {
    color: #999999;
  }
  .form-control::-webkit-input-placeholder {
    color: #999999;
  }
  .form-control::-ms-expand {
    background-color: transparent;
    border: 0;
  }
  .form-control[disabled],
  .form-control[readonly],
  fieldset[disabled] .form-control {
    background-color: #eeeeee;
    opacity: 1;
  }
  .form-control[disabled],
  fieldset[disabled] .form-control {
    cursor: not-allowed;
  }
  textarea.form-control {
    height: auto;
  }
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    input[type="date"].form-control,
    input[type="time"].form-control,
    input[type="datetime-local"].form-control,
    input[type="month"].form-control {
      line-height: 34px;
    }
    input[type="date"].input-sm,
    input[type="time"].input-sm,
    input[type="datetime-local"].input-sm,
    input[type="month"].input-sm,
    .input-group-sm input[type="date"],
    .input-group-sm input[type="time"],
    .input-group-sm input[type="datetime-local"],
    .input-group-sm input[type="month"] {
      line-height: 30px;
    }
    input[type="date"].input-lg,
    input[type="time"].input-lg,
    input[type="datetime-local"].input-lg,
    input[type="month"].input-lg,
    .input-group-lg input[type="date"],
    .input-group-lg input[type="time"],
    .input-group-lg input[type="datetime-local"],
    .input-group-lg input[type="month"] {
      line-height: 46px;
    }
  }

  .form-group {
    margin-bottom: 15px;
  }
  .radio,
  .checkbox {
    position: relative;
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .radio.disabled label,
  .checkbox.disabled label,
  fieldset[disabled] .radio label,
  fieldset[disabled] .checkbox label {
    cursor: not-allowed;
  }
  .radio label,
  .checkbox label {
    min-height: 20px;
    padding-left: 20px;
    margin-bottom: 0;
    font-weight: 400;
    cursor: pointer;
  }

  .radio input[type="radio"],
  .radio-inline input[type="radio"],
  .checkbox input[type="checkbox"],
  .checkbox-inline input[type="checkbox"] {
    position: absolute;
    margin-top: 4px;
    margin-left: -20px;
  }

  .radio + .radio,
  .checkbox + .checkbox {
    margin-top: -5px;
  }
  .radio-inline,
  .checkbox-inline {
    position: relative;
    display: inline-block;
    padding-left: 20px;
    margin-bottom: 0;
    font-weight: 400;
    vertical-align: middle;
    cursor: pointer;
  }
  .radio-inline.disabled,
  .checkbox-inline.disabled,
  fieldset[disabled] .radio-inline,
  fieldset[disabled] .checkbox-inline {
    cursor: not-allowed;
  }
  .radio-inline + .radio-inline,
  .checkbox-inline + .checkbox-inline {
    margin-top: 0;
    margin-left: 10px;
  }
  .form-control-static {
    min-height: 34px;
    padding-top: 7px;
    padding-bottom: 7px;
    margin-bottom: 0;
  }
  .form-control-static.input-lg,
  .form-control-static.input-sm {
    padding-right: 0;
    padding-left: 0;
  }
  .input-sm {
    height: 30px;
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 3px;
  }
  select.input-sm {
    height: 30px;
    line-height: 30px;
  }
  textarea.input-sm,
  select[multiple].input-sm {
    height: auto;
  }
  .form-group-sm .form-control {
    height: 30px;
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 3px;
  }
  .form-group-sm select.form-control {
    height: 30px;
    line-height: 30px;
  }
  .form-group-sm textarea.form-control,
  .form-group-sm select[multiple].form-control {
    height: auto;
  }
  .form-group-sm .form-control-static {
    height: 30px;
    min-height: 32px;
    padding: 6px 10px;
    font-size: 12px;
    line-height: 1.5;
  }
  .input-lg {
    height: 46px;
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.3333333;
    border-radius: 6px;
  }
  select.input-lg {
    height: 46px;
    line-height: 46px;
  }

  textarea.input-lg,
  select[multiple].input-lg {
    height: auto;
  }
  .form-group-lg .form-control {
    height: 46px;
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.3333333;
    border-radius: 6px;
  }
  .form-group-lg select.form-control {
    height: 46px;
    line-height: 46px;
  }
  .form-group-lg textarea.form-control,
  .form-group-lg select[multiple].form-control {
    height: auto;
  }
  .form-group-lg .form-control-static {
    height: 46px;
    min-height: 38px;
    padding: 11px 16px;
    font-size: 18px;
    line-height: 1.3333333;
  }
  .has-feedback {
    position: relative;
  }
  .has-feedback .form-control {
    padding-right: 42.5px;
  }
  .form-control-feedback {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    display: block;
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    pointer-events: none;
  }
  .input-lg + .form-control-feedback,
  .input-group-lg + .form-control-feedback,
  .form-group-lg .form-control + .form-control-feedback {
    width: 46px;
    height: 46px;
    line-height: 46px;
  }
  .input-sm + .form-control-feedback,
  .input-group-sm + .form-control-feedback,
  .form-group-sm .form-control + .form-control-feedback {
    width: 30px;
    height: 30px;
    line-height: 30px;
  }
  .has-success .help-block,
  .has-success .control-label,
  .has-success .radio,
  .has-success .checkbox,
  .has-success .radio-inline,
  .has-success .checkbox-inline,
  .has-success.radio label,
  .has-success.checkbox label,
  .has-success.radio-inline label,
  .has-success.checkbox-inline label {
    color: #3c763d;
  }
  .has-success .form-control {
    border-color: #3c763d;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  }
  .has-success .form-control:focus {
    border-color: #2b542c;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;
  }
  .has-success .input-group-addon {
    color: #3c763d;
    background-color: #dff0d8;
    border-color: #3c763d;
  }
  .has-success .form-control-feedback {
    color: #3c763d;
  }
  .has-warning .help-block,
  .has-warning .control-label,
  .has-warning .radio,
  .has-warning .checkbox,
  .has-warning .radio-inline,
  .has-warning .checkbox-inline,
  .has-warning.radio label,
  .has-warning.checkbox label,
  .has-warning.radio-inline label,
  .has-warning.checkbox-inline label {
    color: #8a6d3b;
  }
  .has-warning .form-control {
    border-color: #8a6d3b;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  }
  .has-warning .form-control:focus {
    border-color: #66512c;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;
  }
  .has-warning .input-group-addon {
    color: #8a6d3b;
    background-color: #fcf8e3;
    border-color: #8a6d3b;
  }
  .has-warning .form-control-feedback {
    color: #8a6d3b;
  }
  .has-error .help-block,
  .has-error .control-label,
  .has-error .radio,
  .has-error .checkbox,
  .has-error .radio-inline,
  .has-error .checkbox-inline,
  .has-error.radio label,
  .has-error.checkbox label,
  .has-error.radio-inline label,
  .has-error.checkbox-inline label {
    color: #a94442;
  }

  .has-error .form-control {
    border-color: #a94442;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  }
  .has-error .form-control:focus {
    border-color: #843534;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;
  }
  .has-error .input-group-addon {
    color: #a94442;
    background-color: #f2dede;
    border-color: #a94442;
  }
  .has-error .form-control-feedback {
    color: #a94442;
  }
  .has-feedback label ~ .form-control-feedback {
    top: 25px;
  }
  .has-feedback label.sr-only ~ .form-control-feedback {
    top: 0;
  }
  .help-block {
    display: block;
    margin-top: 5px;
    margin-bottom: 10px;
    color: #737373;
  }

  @media (min-width: 768px) {
    .form-inline .form-group {
      display: inline-block;
      margin-bottom: 0;
      vertical-align: middle;
    }
    .form-inline .form-control {
      display: inline-block;
      width: auto;
      vertical-align: middle;
    }
    .form-inline .form-control-static {
      display: inline-block;
    }
    .form-inline .input-group {
      display: inline-table;
      vertical-align: middle;
    }
    .form-inline .input-group .input-group-addon,
    .form-inline .input-group .input-group-btn,
    .form-inline .input-group .form-control {
      width: auto;
    }
    .form-inline .input-group > .form-control {
      width: 100%;
    }
    .form-inline .control-label {
      margin-bottom: 0;
      vertical-align: middle;
    }
    .form-inline .radio,
    .form-inline .checkbox {
      display: inline-block;
      margin-top: 0;
      margin-bottom: 0;
      vertical-align: middle;
    }
    .form-inline .radio label,
    .form-inline .checkbox label {
      padding-left: 0;
    }
    .form-inline .radio input[type="radio"],
    .form-inline .checkbox input[type="checkbox"] {
      position: relative;
      margin-left: 0;
    }
    .form-inline .has-feedback .form-control-feedback {
      top: 0;
    }
  }

  .form-horizontal .radio,
  .form-horizontal .checkbox,
  .form-horizontal .radio-inline,
  .form-horizontal .checkbox-inline {
    padding-top: 7px;
    margin-top: 0;
    margin-bottom: 0;
  }
  .form-horizontal .radio,
  .form-horizontal .checkbox {
    min-height: 27px;
  }
  .form-horizontal .form-group {
    margin-right: -15px;
    margin-left: -15px;
  }
  @media (min-width: 768px) {
    .form-horizontal .control-label {
      padding-top: 7px;
      margin-bottom: 0;
      text-align: right;
    }
  }
  .form-horizontal .has-feedback .form-control-feedback {
    right: 15px;
  }
  @media (min-width: 768px) {
    .form-horizontal .form-group-lg .control-label {
      padding-top: 11px;
      font-size: 18px;
    }
  }
  @media (min-width: 768px) {
    .form-horizontal .form-group-sm .control-label {
      padding-top: 6px;
      font-size: 12px;
    }
  }
`;

const BootStrapButtonStyles = styled.div`
  .btn {
    display: inline-block;
    margin-bottom: 0;
    font-weight: normal;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .btn:focus,
  .btn:active:focus,
  .btn.active:focus,
  .btn.focus,
  .btn:active.focus,
  .btn.active.focus {
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
  }
  .btn:hover,
  .btn:focus,
  .btn.focus {
    color: #333333;
    text-decoration: none;
  }
  .btn:active,
  .btn.active {
    background-image: none;
    outline: 0;
    -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  }
  .btn.disabled,
  .btn[disabled],
  fieldset[disabled] .btn {
    cursor: not-allowed;
    filter: alpha(opacity=65);
    opacity: 0.65;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  a.btn.disabled,
  fieldset[disabled] a.btn {
    pointer-events: none;
  }
  .btn-default {
    color: #333333;
    background-color: #ffffff;
    border-color: #cccccc;
  }
  .btn-default:focus,
  .btn-default.focus {
    color: #333333;
    background-color: #e6e6e6;
    border-color: #8c8c8c;
  }
  .btn-default:hover {
    color: #333333;
    background-color: #e6e6e6;
    border-color: #adadad;
  }
  .btn-default:active,
  .btn-default.active,
  .open > .dropdown-toggle.btn-default {
    color: #333333;
    background-color: #e6e6e6;
    background-image: none;
    border-color: #adadad;
  }
  .btn-default:active:hover,
  .btn-default.active:hover,
  .open > .dropdown-toggle.btn-default:hover,
  .btn-default:active:focus,
  .btn-default.active:focus,
  .open > .dropdown-toggle.btn-default:focus,
  .btn-default:active.focus,
  .btn-default.active.focus,
  .open > .dropdown-toggle.btn-default.focus {
    color: #333333;
    background-color: #d4d4d4;
    border-color: #8c8c8c;
  }
  .btn-default.disabled:hover,
  .btn-default[disabled]:hover,
  fieldset[disabled] .btn-default:hover,
  .btn-default.disabled:focus,
  .btn-default[disabled]:focus,
  fieldset[disabled] .btn-default:focus,
  .btn-default.disabled.focus,
  .btn-default[disabled].focus,
  fieldset[disabled] .btn-default.focus {
    background-color: #ffffff;
    border-color: #cccccc;
  }
  .btn-default .badge {
    color: #ffffff;
    background-color: #333333;
  }
  .btn-primary {
    color: #ffffff;
    background-color: #337ab7;
    border-color: #2e6da4;
  }
  .btn-primary:focus,
  .btn-primary.focus {
    color: #ffffff;
    background-color: #286090;
    border-color: #122b40;
  }
  .btn-primary:hover {
    color: #ffffff;
    background-color: #286090;
    border-color: #204d74;
  }
  .btn-primary:active,
  .btn-primary.active,
  .open > .dropdown-toggle.btn-primary {
    color: #ffffff;
    background-color: #286090;
    background-image: none;
    border-color: #204d74;
  }
  .btn-primary:active:hover,
  .btn-primary.active:hover,
  .open > .dropdown-toggle.btn-primary:hover,
  .btn-primary:active:focus,
  .btn-primary.active:focus,
  .open > .dropdown-toggle.btn-primary:focus,
  .btn-primary:active.focus,
  .btn-primary.active.focus,
  .open > .dropdown-toggle.btn-primary.focus {
    color: #ffffff;
    background-color: #204d74;
    border-color: #122b40;
  }
  .btn-primary.disabled:hover,
  .btn-primary[disabled]:hover,
  fieldset[disabled] .btn-primary:hover,
  .btn-primary.disabled:focus,
  .btn-primary[disabled]:focus,
  fieldset[disabled] .btn-primary:focus,
  .btn-primary.disabled.focus,
  .btn-primary[disabled].focus,
  fieldset[disabled] .btn-primary.focus {
    background-color: #337ab7;
    border-color: #2e6da4;
  }
  .btn-primary .badge {
    color: #337ab7;
    background-color: #ffffff;
  }
  .btn-success {
    color: #ffffff;
    background-color: #5cb85c;
    border-color: #4cae4c;
  }
  .btn-success:focus,
  .btn-success.focus {
    color: #ffffff;
    background-color: #449d44;
    border-color: #255625;
  }
  .btn-success:hover {
    color: #ffffff;
    background-color: #449d44;
    border-color: #398439;
  }
  .btn-success:active,
  .btn-success.active,
  .open > .dropdown-toggle.btn-success {
    color: #ffffff;
    background-color: #449d44;
    background-image: none;
    border-color: #398439;
  }
  .btn-success:active:hover,
  .btn-success.active:hover,
  .open > .dropdown-toggle.btn-success:hover,
  .btn-success:active:focus,
  .btn-success.active:focus,
  .open > .dropdown-toggle.btn-success:focus,
  .btn-success:active.focus,
  .btn-success.active.focus,
  .open > .dropdown-toggle.btn-success.focus {
    color: #ffffff;
    background-color: #398439;
    border-color: #255625;
  }
  .btn-success.disabled:hover,
  .btn-success[disabled]:hover,
  fieldset[disabled] .btn-success:hover,
  .btn-success.disabled:focus,
  .btn-success[disabled]:focus,
  fieldset[disabled] .btn-success:focus,
  .btn-success.disabled.focus,
  .btn-success[disabled].focus,
  fieldset[disabled] .btn-success.focus {
    background-color: #5cb85c;
    border-color: #4cae4c;
  }
  .btn-success .badge {
    color: #5cb85c;
    background-color: #ffffff;
  }
  .btn-info {
    color: #ffffff;
    background-color: #5bc0de;
    border-color: #46b8da;
  }
  .btn-info:focus,
  .btn-info.focus {
    color: #ffffff;
    background-color: #31b0d5;
    border-color: #1b6d85;
  }
  .btn-info:hover {
    color: #ffffff;
    background-color: #31b0d5;
    border-color: #269abc;
  }
  .btn-info:active,
  .btn-info.active,
  .open > .dropdown-toggle.btn-info {
    color: #ffffff;
    background-color: #31b0d5;
    background-image: none;
    border-color: #269abc;
  }
  .btn-info:active:hover,
  .btn-info.active:hover,
  .open > .dropdown-toggle.btn-info:hover,
  .btn-info:active:focus,
  .btn-info.active:focus,
  .open > .dropdown-toggle.btn-info:focus,
  .btn-info:active.focus,
  .btn-info.active.focus,
  .open > .dropdown-toggle.btn-info.focus {
    color: #ffffff;
    background-color: #269abc;
    border-color: #1b6d85;
  }
  .btn-info.disabled:hover,
  .btn-info[disabled]:hover,
  fieldset[disabled] .btn-info:hover,
  .btn-info.disabled:focus,
  .btn-info[disabled]:focus,
  fieldset[disabled] .btn-info:focus,
  .btn-info.disabled.focus,
  .btn-info[disabled].focus,
  fieldset[disabled] .btn-info.focus {
    background-color: #5bc0de;
    border-color: #46b8da;
  }
  .btn-info .badge {
    color: #5bc0de;
    background-color: #ffffff;
  }
  .btn-warning {
    color: #ffffff;
    background-color: #f0ad4e;
    border-color: #eea236;
  }
  .btn-warning:focus,
  .btn-warning.focus {
    color: #ffffff;
    background-color: #ec971f;
    border-color: #985f0d;
  }
  .btn-warning:hover {
    color: #ffffff;
    background-color: #ec971f;
    border-color: #d58512;
  }
  .btn-warning:active,
  .btn-warning.active,
  .open > .dropdown-toggle.btn-warning {
    color: #ffffff;
    background-color: #ec971f;
    background-image: none;
    border-color: #d58512;
  }
  .btn-warning:active:hover,
  .btn-warning.active:hover,
  .open > .dropdown-toggle.btn-warning:hover,
  .btn-warning:active:focus,
  .btn-warning.active:focus,
  .open > .dropdown-toggle.btn-warning:focus,
  .btn-warning:active.focus,
  .btn-warning.active.focus,
  .open > .dropdown-toggle.btn-warning.focus {
    color: #ffffff;
    background-color: #d58512;
    border-color: #985f0d;
  }
  .btn-warning.disabled:hover,
  .btn-warning[disabled]:hover,
  fieldset[disabled] .btn-warning:hover,
  .btn-warning.disabled:focus,
  .btn-warning[disabled]:focus,
  fieldset[disabled] .btn-warning:focus,
  .btn-warning.disabled.focus,
  .btn-warning[disabled].focus,
  fieldset[disabled] .btn-warning.focus {
    background-color: #f0ad4e;
    border-color: #eea236;
  }
  .btn-warning .badge {
    color: #f0ad4e;
    background-color: #ffffff;
  }
  .btn-danger {
    color: #ffffff;
    background-color: #d9534f;
    border-color: #d43f3a;
  }
  .btn-danger:focus,
  .btn-danger.focus {
    color: #ffffff;
    background-color: #c9302c;
    border-color: #761c19;
  }
  .btn-danger:hover {
    color: #ffffff;
    background-color: #c9302c;
    border-color: #ac2925;
  }
  .btn-danger:active,
  .btn-danger.active,
  .open > .dropdown-toggle.btn-danger {
    color: #ffffff;
    background-color: #c9302c;
    background-image: none;
    border-color: #ac2925;
  }
  .btn-danger:active:hover,
  .btn-danger.active:hover,
  .open > .dropdown-toggle.btn-danger:hover,
  .btn-danger:active:focus,
  .btn-danger.active:focus,
  .open > .dropdown-toggle.btn-danger:focus,
  .btn-danger:active.focus,
  .btn-danger.active.focus,
  .open > .dropdown-toggle.btn-danger.focus {
    color: #ffffff;
    background-color: #ac2925;
    border-color: #761c19;
  }
  .btn-danger.disabled:hover,
  .btn-danger[disabled]:hover,
  fieldset[disabled] .btn-danger:hover,
  .btn-danger.disabled:focus,
  .btn-danger[disabled]:focus,
  fieldset[disabled] .btn-danger:focus,
  .btn-danger.disabled.focus,
  .btn-danger[disabled].focus,
  fieldset[disabled] .btn-danger.focus {
    background-color: #d9534f;
    border-color: #d43f3a;
  }
  .btn-danger .badge {
    color: #d9534f;
    background-color: #ffffff;
  }
  .btn-link {
    font-weight: 400;
    color: #337ab7;
    border-radius: 0;
  }
  .btn-link,
  .btn-link:active,
  .btn-link.active,
  .btn-link[disabled],
  fieldset[disabled] .btn-link {
    background-color: transparent;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .btn-link,
  .btn-link:hover,
  .btn-link:focus,
  .btn-link:active {
    border-color: transparent;
  }
  .btn-link:hover,
  .btn-link:focus {
    color: #23527c;
    text-decoration: underline;
    background-color: transparent;
  }
  .btn-link[disabled]:hover,
  fieldset[disabled] .btn-link:hover,
  .btn-link[disabled]:focus,
  fieldset[disabled] .btn-link:focus {
    color: #777777;
    text-decoration: none;
  }
  .btn-lg {
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.3333333;
    border-radius: 6px;
  }
  .btn-sm {
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 3px;
  }
  .btn-xs {
    padding: 1px 5px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 3px;
  }
  .btn-block {
    display: block;
    width: 100%;
  }
  .btn-block + .btn-block {
    margin-top: 5px;
  }
  input[type="submit"].btn-block,
  input[type="reset"].btn-block,
  input[type="button"].btn-block {
    width: 100%;
  }
  .clearfix:before,
  .clearfix:after,
  .form-horizontal .form-group:before,
  .form-horizontal .form-group:after {
    display: table;
    content: " ";
  }
  .clearfix:after,
  .form-horizontal .form-group:after {
    clear: both;
  }
  .center-block {
    display: block;
    margin-right: auto;
    margin-left: auto;
  }
  .pull-right {
    float: right !important;
  }
  .pull-left {
    float: left !important;
  }
  .hide {
    display: none !important;
  }
  .show {
    display: block !important;
  }
  .invisible {
    visibility: hidden;
  }
  .text-hide {
    font: 0;
    color: transparent;
    text-shadow: none;
    background-color: transparent;
    border: 0;
  }
  .hidden {
    display: none !important;
  }
  .affix {
    position: fixed;
  }
`;

export { BootStrapFormStyles, BootStrapButtonStyles };
