import Card from "components/Common/Card";
import SessionMessage from "components/Common/SessionMessage";
import Button from "components/Common/Button";
import GuestLayout from "components/Layouts/GuestLayout";
import Input from "components/Common/Input";
import Label from "components/Common/Label";
import { useAuth } from "hooks/auth";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import useValidator from "hooks/useValidator";

const Login = () => {
  const { login } = useAuth({
    middleware: "guest",
    redirect: "/dashboard",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);
  const [validator, showValidationMessage] = useValidator({serverErrors: errors});
  const [buttonLoading, setButtonLoading] = useState(false)

  const submitForm = async (event) => {
    event.preventDefault();
    setButtonLoading(true)

    if (!validator.allValid()) {
      showValidationMessage(true);
      setButtonLoading(false)
      if (!errors || errors.length == 0) {
        return;
      }
    }
    
    login({ email, password, setErrors, setStatus });
    setButtonLoading(false)
  };

  return (
    <GuestLayout>
      <Card>
        {/* Session Status */}
        <SessionMessage className="mb-4" status={status} />
        <form onSubmit={submitForm}>
          {/* Email Address */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              value={email}
              className="block mt-1 w-full"
              onChange={(event) => setEmail(event.target.value)}
              autoFocus
            />
            {validator.message("email", email, "required|email", {
              messages: {
                required: "This email field is required",
                email: "The email is not valid",
              },
            })}
          </div>
          {/* Password */}
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              className="block mt-1 w-full"
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
            {validator.message("password", password, "required", {
              messages: {
                required: "This password field is required",
              },
            })}
          </div>
          {/* Remember Me */}
          <div className="block mt-4">
            <label htmlFor="remember_me" className="inline-flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                name="remember"
                className="rounded border-gray-300 text-indigo-600
                shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>
          <div className="flex items-center justify-end mt-4">
            <NavLink
              to="/register"
              className="underline text-sm text-gray-600 hover:text-gray-900"
            >
              Don't have any account?
            </NavLink>
            <Button type="submit" loading={buttonLoading} className="ml-3">
              Login
            </Button>
          </div>
        </form>
      </Card>
    </GuestLayout>
  );
};

export default Login;
