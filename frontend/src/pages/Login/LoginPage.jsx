import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authentication";
import { getUserByEmail } from "../../services/user";
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

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const token = await login(email, password);
      const data = await getUserByEmail(email);
      localStorage.setItem("token", token);
      navigate(
        `/portfolio/${data.user.firstname}-${
          data.user.lastname
        }-${data.user._id.slice(-6)}`
      );
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <>
      <div className="w-screen h-screen border border-black flex">
        <div className="w-1/2 h-full border border-black"></div>
        <div className="w-1/2 p-10">
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <FieldGroup>
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
                  </Field>
                  <FieldGroup>
                    <Field>
                      <Button
                        role="submit-button"
                        id="submit"
                        type="submit"
                        value="Submit"
                      >
                        Login
                      </Button>
                      <FieldDescription className="px-6 text-center">
                        Dont have an account?
                        <Button
                          variant={"link"}
                          onClick={() => navigate("/signup")}
                        >
                          Sign in
                        </Button>
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
