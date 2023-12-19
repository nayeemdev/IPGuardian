import Card from 'components/Common/Card'
import Button from 'components/Common/Button'
import GuestLayout from 'components/Layouts/GuestLayout'
import Input from 'components/Common/Input'
import Label from 'components/Common/Label'
import { useAuth } from 'hooks/auth'
import { useState } from 'react'
import {NavLink} from 'react-router-dom';
import useValidator from "hooks/useValidator";

const Register = () => {
  const { register } = useAuth({
    middleware: 'guest',
    redirect: '/dashboard'
  })

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([])
  const [validator, showValidationMessage] = useValidator({serverErrors: errors});
  const [buttonLoading, setButtonLoading] = useState(false)

  const submitForm = event => {
    event.preventDefault()
    setButtonLoading(true)
    
    if (!validator.allValid()) {
      showValidationMessage(true);
      setButtonLoading(false)
      if (!errors || errors.length == 0) {
        return;
      }
    }
    
    register({ name, email, password, password_confirmation, setErrors })
    setButtonLoading(false)
  }

  return (
    <GuestLayout>
      <Card>
        <form onSubmit={submitForm}>
          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              className="block mt-1 w-full"
              onChange={event => setName(event.target.value)}
              autoFocus
            />
            {validator.message("name", name, "required", {
              messages: {
                required: "This name field is required",
              },
            })}
          </div>
          {/* Email Address */}
          <div className="mt-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              value={email}
              className="block mt-1 w-full"
              onChange={event => setEmail(event.target.value)}
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
              onChange={event => setPassword(event.target.value)}
              autoComplete="new-password"
            />
            {validator.message("password", password, "required|min:8", {
              messages: {
                required: "This password field is required",
                min: "The password must be at least 8 characters",
              },
            })}
          </div>
          {/* Confirm Password */}
          <div className="mt-4">
            <Label htmlFor="password_confirmation">
                Confirm Password
            </Label>
            <Input
              id="password_confirmation"
              type="password"
              value={password_confirmation}
              className="block mt-1 w-full"
              onChange={event =>
                setPasswordConfirmation(event.target.value)
              }
            />
            {validator.message("password_confirmation", password_confirmation, "required", {
              messages: {
                required: "This password confirmation field is required"
              },
            })}
          </div>
          <div className="flex items-center justify-end mt-4">
            <NavLink
              to="/login"
              className="underline text-sm text-gray-600 hover:text-gray-900"
            >
                Already registered?
            </NavLink>
            <Button type="submit" loading={buttonLoading} className="ml-4">Register</Button>
          </div>
        </form>
      </Card>
    </GuestLayout>
  )
}

export default Register
