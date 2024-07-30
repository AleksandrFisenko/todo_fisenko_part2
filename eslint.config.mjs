import globals from "globals";
import pluginJs from "@eslint/js";

import _ from 'lodash';


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "script"}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  _
];