import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validatePassword } from "../../utils/password";
import { signup } from "../../services/authentication";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SignupPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords Do Not Match");
      }

      validatePassword(password);
      await signup(firstname, lastname, email, password);
      navigate("/login");
    } catch (err) {
      console.error(err);
      navigate("/signup");
    }
  }

  function handleFirstNameChange(event) {
    setFirstname(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastname(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }

  return (
    <>
      <div className="w-screen h-screen border border-black flex">
        <div className="w-1/2 h-full border border-black"></div>
        <div className="w-1/2 p-10">
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your information below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">First Name</FieldLabel>
                  <Input
                    placeholder="Enter Your Firstname"
                    id="firstname"
                    type="text"
                    value={firstname}
                    onChange={handleFirstNameChange}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="name">Last Name</FieldLabel>
                  <Input
                    placeholder="Enter Your Lastname"
                    id="lastname"
                    type="text"
                    value={lastname}
                    onChange={handleLastNameChange}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    placeholder="Enter Your Email"
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  <FieldDescription>
                    We&apos;ll use this to contact you. We will not share your
                    email with anyone else.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    placeholder="Enter Your Password"
                    id="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    minLength={8}
                    maxLength={16}
                    required
                  />
                  <FieldDescription className="grid">
                    <p>Minimum 8 characters, maximum 16 characters.</p>
                    <p>At least 1 capital letter.</p>
                    <p>At least 1 number.</p>
                    <p>At least 1 special character.</p>
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    placeholder="Enter Your Confirm Password"
                    id="confirm"
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                  <FieldDescription>
                    Please confirm your password.
                  </FieldDescription>
                </Field>
                <FieldGroup>
                  <Field>
                    <Button
                      role="submit-button"
                      id="submit"
                      type="submit"
                      value="Submit"
                    >
                      Create Account
                    </Button>
                    <FieldDescription className="px-6 text-center">
                            Already have an account? <Button variant={'link'} onClick={() => navigate('/login')}>Log in</Button>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
      </div>
    </>
  );
}
