import React from "react";

class FormValidator {
  constructor(options = {}) {
    // Default property values.
    this.fields = {};
    this.visibleFields = [];
    this.errorMessages = {};
    this.serverErrors = options.serverErrors || {};
    this.messagesShown = false;
    // Available rules and their error messages, can be overwritten.
    this.rules = {
      accepted: {
        message: "The :attribute must be accepted.",
        rule: (val) => val === true,
        required: true,
      },
      alpha: {
        message: "The :attribute may only contain letters.",
        rule: (val) => this.helpers.testRegex(val, /^[A-Z]*$/i),
      },
      alpha_space: {
        message: "The :attribute may only contain letters and spaces.",
        rule: (val) => this.helpers.testRegex(val, /^[A-Z\s]*$/i),
      },
      alpha_num: {
        message: "The :attribute may only contain letters and numbers.",
        rule: (val) => this.helpers.testRegex(val, /^[A-Z0-9]*$/i),
      },
      alpha_num_space: {
        message:
          "The :attribute may only contain letters, numbers, and spaces.",
        rule: (val) => this.helpers.testRegex(val, /^[A-Z0-9\s]*$/i),
      },
      alpha_num_dash: {
        message:
          "The :attribute may only contain letters, numbers, and dashes.",
        rule: (val) => this.helpers.testRegex(val, /^[A-Z0-9_-]*$/i),
      },
      alpha_num_dash_space: {
        message:
          "The :attribute may only contain letters, numbers, dashes, and spaces.",
        rule: (val) => this.helpers.testRegex(val, /^[A-Z0-9_-\s]*$/i),
      },
      array: {
        message: "The :attribute must be an array.",
        rule: (val) => Array.isArray(val),
      },
      between: {
        message: "The :attribute must be between :min and :max:type.",
        rule: (val, params) =>
          this.helpers.size(val, params[2]) >= parseFloat(params[0]) &&
          this.helpers.size(val, params[2]) <= parseFloat(params[1]),
        messageReplace: (message, params) =>
          message
            .replace(":min", params[0])
            .replace(":max", params[1])
            .replace(":type", this.helpers.sizeText(params[2])),
      },
      boolean: {
        message: "The :attribute must be a boolean.",
        rule: (val) => val === false || val === true,
      },
      card_exp: {
        message: "The :attribute must be a valid expiration date.",
        rule: (val) =>
          this.helpers.testRegex(
            val,
            /^(([0]?[1-9]{1})|([1]{1}[0-2]{1}))\s?\/\s?(\d{2}|\d{4})$/
          ),
      },
      card_num: {
        message: "The :attribute must be a valid credit card number.",
        rule: (val) =>
          this.helpers.testRegex(val, /^\d{4}\s?\d{4,6}\s?\d{4,5}\s?\d{0,8}$/),
      },
      ip: {
        message: "The :attribute must be a valid IP address.",
        rule: (val) =>
          this.helpers.testRegex(
            val,
            /^([1-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[01]){1}(\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[01])){3}$/
          ),
      },
      currency: {
        message: "The :attribute must be a valid currency.",
        rule: (val) =>
          this.helpers.testRegex(
            val,
            /^[\$£€¥]?(\d{1,3})(\,?\d{3})*\.?\d{0,2}$/
          ),
      },
      email: {
        message: "The :attribute must be a valid email address.",
        rule: (val) =>
          this.helpers.testRegex(
            val,
            /^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
          ),
      },
      in: {
        message: "The selected :attribute must be :values.",
        rule: (val, params) => params.includes(val),
        messageReplace: (message, params) =>
          message.replace(":values", this.helpers.toSentence(params)),
      },
      integer: {
        message: "The :attribute must be an integer.",
        rule: (val) => this.helpers.testRegex(val, /^\-?\d*$/),
      },
      max: {
        message: "The :attribute may not be greater than :max:type.",
        rule: (val, params) =>
          this.helpers.size(val, params[1]) <= parseFloat(params[0]),
        messageReplace: (message, params) =>
          message
            .replace(":max", params[0])
            .replace(":type", this.helpers.sizeText(params[1])),
      },
      min: {
        message: "The :attribute must be at least :min:type.",
        rule: (val, params) =>
          this.helpers.size(val, params[1]) >= parseFloat(params[0]),
        messageReplace: (message, params) =>
          message
            .replace(":min", params[0])
            .replace(":type", this.helpers.sizeText(params[1])),
      },
      not_in: {
        message: "The selected :attribute must not be :values.",
        rule: (val, params) => !params.includes(val),
        messageReplace: (message, params) =>
          message.replace(":values", this.helpers.toSentence(params)),
      },
      not_regex: {
        message: "The :attribute must not match the required pattern.",
        rule: (val, params) =>
          !this.helpers.testRegex(
            val,
            typeof params[0] === "string" || params[0] instanceof String
              ? new RegExp(params[0])
              : params[0]
          ),
      },
      numeric: {
        message: "The :attribute must be a number.",
        rule: (val) => this.helpers.testRegex(val, /^\-?\d*\.?\d+$/),
      },
      positive: {
        message: "The :attribute must be a positive number.",
        rule: (val) =>
          this.helpers.testRegex(val, /^\d*\.?\d+$/) && parseFloat(val) > 0,
      },
      phone: {
        message: "The :attribute must be a valid phone number.",
        rule: (val) =>
          this.helpers.testRegex(
            val,
            /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)$/
          ) && !this.helpers.testRegex(val, /^\b(\d)\1{8,}\b$/),
      },
      regex: {
        message: "The :attribute must match the required pattern.",
        rule: (val, params) =>
          this.helpers.testRegex(
            val,
            typeof params[0] === "string" || params[0] instanceof String
              ? new RegExp(params[0])
              : params[0]
          ),
      },
      required: {
        message: "The :attribute field is required.",
        rule: (val) => !this.helpers.isBlank(val),
        required: true,
      },
      size: {
        message: "The :attribute must be :size:type.",
        rule: (val, params) =>
          this.helpers.size(val, params[1]) == parseFloat(params[0]),
        messageReplace: (message, params) =>
          message
            .replace(":size", params[0])
            .replace(":type", this.helpers.sizeText(params[1])),
      },
      string: {
        message: "The :attribute must be a string.",
        rule: (val) => typeof val === typeof "string",
      },
      typeof: {
        message: "The :attribute is not the correct type of :type.",
        rule: (val, params) => typeof val === typeof params[0],
        messageReplace: (message, params) =>
          message.replace(":type", typeof params[0]),
      },
      url: {
        message: "The :attribute must be a url.",
        rule: (val) =>
          this.helpers.testRegex(
            val,
            /^https?:\/\/[-a-z0-9@:%._\+~#=]{1,256}\.[a-z0-9()]{2,13}\b([-a-z0-9()@:%_\+.~#?&//=]*)$/i
          ),
      },
      file: {
        message: "The :attribute must be a file.",
        rule: (value) => value instanceof File,
      },
      file_type: {
        message: "The :attribute must be a file of type: :values.",
        rule: (value, params) => {
          if (typeof params === "string" || params instanceof String) {
            params = params.split(",").map((item) => item.trim());
          }

          if (!(value instanceof File)) {
            return false;
          }

          if (params.includes("*")) {
            return true;
          }

          const extension = value.name.split(".").pop();

          return params.includes(extension);
        },
        messageReplace: (message, params) =>
          message.replace(":values", this.helpers.toSentence(params)),
      },
      ...(options.validators || {}),
    };

    this.messages = options.messages || {};
    this.className = options.className;
    this.autoForceUpdate = options.autoForceUpdate || false;

    if (options.element === false) {
      this.element = (message) => message;
    } else if (options.hasOwnProperty("element")) {
      this.element = options.element;
    } else {
      this.element = (message, className) =>
        React.createElement(
          "div",
          {
            className:
              "form-vaidator-error " +
              (className || this.className || "text-red-700"),
          },
          message
        );
    }
  }

  getErrorMessages() {
    return this.errorMessages;
  }

  showMessages() {
    this.messagesShown = true;
    this.helpers.forceUpdateIfNeeded();
  }

  hideMessages() {
    this.messagesShown = false;
    this.helpers.forceUpdateIfNeeded();
  }

  showMessageFor = (field) => {
    if (!this.visibleFields.includes(field)) {
      this.visibleFields.push(field);
    }
    this.helpers.forceUpdateIfNeeded();
  };

  hideMessageFor = (field) => {
    const index = this.visibleFields.indexOf(field);
    if (index > -1) {
      this.visibleFields.splice(index, 1);
    }
    this.helpers.forceUpdateIfNeeded();
  };

  allValid() {
    for (let key in this.fields) {
      if (this.fieldValid(key) === false) {
        return false;
      }
    }
    return true;
  }

  fieldValid(field) {
    return this.fields.hasOwnProperty(field) && this.fields[field] === true;
  }
  
  resetValidations() {
    this.fields = {};
    this.errorMessages = {};
    this.serverErrors = {};
    this.messagesShown = false;
    this.visibleFields = [];
  }
  
  purgeFields() {
    this.fields = {};
    this.errorMessages = {};
  }

  messageWhenPresent(message, options = {}) {
    if (!this.helpers.isBlank(message) && this.messagesShown) {
      return this.helpers.element(message, options);
    }
  }

  check(inputValue, validations, options = {}) {
    if (!Array.isArray(validations)) {
      validations = validations.split("|");
    }
    var rules = options.validators
      ? {
          ...this.rules,
          ...options.validators,
        }
      : this.rules;
    for (let validation of validations) {
      let [value, rule, params] = this.helpers.normalizeValues(
        inputValue,
        validation
      );
      if (!this.helpers.passes(rule, value, params, rules)) {
        return false;
      }
    }
    return true;
  }

  message(field, inputValue, validations, options = {}) {
    this.errorMessages[field] = null;
    this.fields[field] = true;

    options.serverError = this.serverErrors[field] || false;

    if (!Array.isArray(validations)) {
      validations = validations.split("|");
    }
    var rules = options.validators
      ? {
          ...this.rules,
          ...options.validators,
        }
      : this.rules;
    for (let validation of validations) {
      let [value, rule, params] = this.helpers.normalizeValues(
        inputValue,
        validation
      );
      if (
        !this.helpers.passes(rule, value, params, rules) ||
        options.serverError
      ) {
        this.fields[field] = false;
        let message =
          options.serverError ||
          this.helpers.message(rule, field, options, rules);

        if (params.length > 0 && rules[rule].hasOwnProperty("messageReplace")) {
          message = rules[rule].messageReplace(message, params);
        }

        this.errorMessages[field] = message;
        if (this.messagesShown || this.visibleFields.includes(field)) {
          return this.helpers.element(message, options);
        }
      }
    }
  }

  helpers = {
    parent: this,

    passes(rule, value, params, rules) {
      if (!rules.hasOwnProperty(rule)) {
        console.error(
          `Rule Not Found: There is no rule with the name ${rule}.`
        );
        return true;
      }
      if (!this.isRequired(rule, rules) && this.isBlank(value)) {
        return true;
      }
      return rules[rule].rule(value, params, this.parent) !== false;
    },

    isRequired(rule, rules) {
      return rules[rule].hasOwnProperty("required") && rules[rule].required;
    },

    isBlank(value) {
      return (
        typeof value === "undefined" ||
        value === null ||
        this.testRegex(value, /^[\s]*$/)
      );
    },

    normalizeValues(value, validation) {
      return [
        this.valueOrEmptyString(value),
        this.getValidation(validation),
        this.getOptions(validation),
      ];
    },

    getValidation(validation) {
      if (
        validation === Object(validation) &&
        !!Object.keys(validation).length
      ) {
        return Object.keys(validation)[0];
      } else {
        return validation.split(":")[0];
      }
    },

    getOptions(validation) {
      if (
        validation === Object(validation) &&
        !!Object.values(validation).length
      ) {
        var params = Object.values(validation)[0];
        return Array.isArray(params) ? params : [params];
      } else {
        var params = validation.split(":");
        return params.length > 1 ? params[1].split(",") : [];
      }
    },

    valueOrEmptyString(value) {
      return typeof value === "undefined" || value === null ? "" : value;
    },

    toSentence(arr) {
      return (
        arr.slice(0, -2).join(", ") +
        (arr.slice(0, -2).length ? ", " : "") +
        arr.slice(-2).join(arr.length > 2 ? ", or " : " or ")
      );
    },

    testRegex(value, regex) {
      return value.toString().match(regex) !== null;
    },

    forceUpdateIfNeeded() {
      if (this.parent.autoForceUpdate) {
        this.parent.autoForceUpdate.forceUpdate();
      }
    },

    message(rule, field, options, rules) {
      options.messages = options.messages || {};
      var message =
        options.messages[rule] ||
        options.messages.default ||
        this.parent.messages[rule] ||
        this.parent.messages.default ||
        rules[rule].message;
      return message.replace(":attribute", this.humanizeFieldName(field));
    },

    humanizeFieldName(field) {
      return field
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/_/g, " ")
        .toLowerCase();
    },

    element(message, options) {
      var element = options.element || this.parent.element;
      return element(message, options.className);
    },

    size(val, type) {
      if (type === "string" || type === undefined || type === "array") {
        return val.length;
      } else if (type === "num") {
        return parseFloat(val);
      }
    },

    sizeText(type) {
      if (type === "string" || type === undefined) {
        return " characters";
      } else if (type === "array") {
        return " elements";
      } else {
        return "";
      }
    },
  };
}

export default FormValidator;
