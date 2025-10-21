import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validatePassword } from "../../utils/password";

import { signup } from "../../services/authentication";

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
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">
        Firstname:
      </label>
      <input
        placeholder="Enter Your Firstname"
        id="firstname"
        type="text"
        value={firstname}
        onChange={handleFirstNameChange}
        required
      />
      <label htmlFor="lastname">
        Lastname:
      </label>
      <input
        placeholder="Enter Your Lastname"
        id="lastname"
        type="text"
        value={lastname}
        onChange={handleLastNameChange}
        required
      />
      <label htmlFor="email">
        Email:
      </label>
      <input
        placeholder="Enter Your Email"
        id="email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <label htmlFor="password">
        Password:
      </label>
      <input
        placeholder="Enter Your Password"
        id="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        minLength={8}
        maxLength={16}
        required
      />
      <label htmlFor="confirm">
        Confirm Password:
      </label>
      <input
        placeholder="Enter Your Confirm Password"
        id="confirm"
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        required
      />
      <div className="card-body border border-white-300 rounded-box my-2 p-4 max-w-[19.5rem] h-25">
      <h4 className="card-title text-sm m-0.5">Password Requirements:</h4>
      <ul className="list-disc list-outside text-xs pl-4 m-0.5 text-left">
        <li>Minimum 8 characters, maximum 16 characters</li>
        <li>At least 1 capital letter</li>
        <li>At least 1 number</li>
        <li>At least 1 special character</li>
      </ul>
      </div> 
      <div className="flex justify-center mt-4">
          <input
            role="submit-button"
            id="submit"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </>
  );
}
