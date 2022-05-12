import { useState } from 'react';
import { signIn, signUp } from './services/fetch-utils.js';

export default function AuthPage({ setUser }) {
  // you'll need to track the form state of the email and password
  const [formEmailSignIn, setFormEmailSignIn] = useState();
  const [formPasswordSignIn, setFormPasswordSignIn] = useState();
  const [formEmailSignUp, setFormEmailSignUp] = useState();
  const [formPasswordSignUp, setFormPasswordSignUp] = useState();

  async function handleSignIn(e) {
    e.preventDefault();
    // sign the user in using the form state
    const currUser = await signIn(formEmailSignIn, formPasswordSignIn);
    // set the user in App.js state using the correct prop callback. If you did the ternary right in App.js, this should automatically redirect the user to the board game list
    setUser(currUser);
  }

  async function handleSignUp(e) {
    e.preventDefault();
    // sign the user up using the form state
    const currUser = await signUp(formEmailSignUp, formPasswordSignUp);
    // set the user in App.js state using the correct prop callback. If you did the ternary right in App.js, this should automatically redirect the user to the board game list
    setUser(currUser);
  }

  return (
    <div className="auth">
      <h1>
        <em>Boardzo</em>
      </h1>
      {/* on submit, sign the user in using the function defined above */}
      <form>
        <label onSubmit={handleSignIn}>
          Email
          {/* on change, update the form state for email */}
          <input
            required
            type="email"
            name="email"
            value={formEmailSignIn}
            onChange={(e) => setFormEmailSignIn(e.target.value)}
          />
        </label>
        <label>
          Password
          {/* on change, update the form state for password */}
          <input
            required
            type="password"
            name="password"
            value={formPasswordSignIn}
            onChange={(e) => setFormPasswordSignIn(e.target.value)}
          />
        </label>
        {/* on clicking sign in, sign the user in using the function defined above */}
        <button onClick={handleSignIn}>Sign In</button>
      </form>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          {/* on change, update the form state for email */}
          <input
            required
            type="email"
            name="email"
            value={formEmailSignUp}
            onChange={(e) => setFormEmailSignUp(e.target.value)}
          />
        </label>
        <label>
          Password
          {/* on change, update the form state for password */}
          <input
            required
            type="password"
            name="password"
            value={formPasswordSignUp}
            onChange={(e) => setFormPasswordSignUp(e.target.value)}
          />
        </label>
        {/* on clicking sign up, sign the user up using the function defined above */}
        <button onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  );
}
