import { useEffect, useState } from "react";
import FormValidator from "utils/validation_rules";

const useValidator = (options = {}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Scroll to first error message on show change
    const firstError = document.querySelector(".form-vaidator-error");

    if (firstError) {
      scrollTo({
        top: firstError.offsetTop - 100,
        behavior: "smooth",
      });
    }
  }, [show, options.serverErrors]);

  const validator = new FormValidator({
    messages: options.messages || {},
    validators: options.validators || {},
    serverErrors: options.serverErrors || {},
  });

  if (
    show ||
    (options.serverErrors && Object.keys(options.serverErrors).length > 0)
  ) {
    validator.showMessages();
  }

  return [validator, setShow];
};

export default useValidator;
