import { useRef, useState, useEffect } from "react";

const EMAIL_REGEX = /[a-zA-Z0-9]{3,20}/g;
const PWD_REGEX = /^[a-zA-Z0-9-_]{6,20}$/;

const Register = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);
  const [errorConfirmPass, setErrorConfirmPass] = useState(true);
  const [isDisabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!errorEmail && !errorPassword && !errorConfirmPass) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [errorEmail, errorPassword, errorConfirmPass]);

  const handleEmail = (e: any) => {
    if (e.currentTarget.value.match(EMAIL_REGEX)) {
      setEmail(e.currentTarget.value);
      setErrorEmail(false);
    } else {
      setErrorEmail(true);
    }
  };
  const handlePassword = (e: any) => {
    if (e.currentTarget.value.length > 5) {
      setPassword(e.currentTarget.value);
      setErrorPassword(false);
    } else {
      setErrorPassword(true);
    }
  };
  const handleConfirm = (e: any) => {
    if (e.currentTarget.value.length > 5) {
      setConfirmPass(e.currentTarget.value);
      setErrorConfirmPass(false);
    } else {
      setErrorConfirmPass(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log(emailRef.current?.value);
    //console.log(passRef.current?.value);
    const formData = new FormData(e.currentTarget);
    const [email, password] = [
      formData.get("email")?.toString(),
      formData.get("password")?.toString(),
    ];
    //const formProps = Object.fromEntries(formData);
    console.log(email, password);
  };
  return (
    <>
      Register
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input onChange={handleEmail} ref={emailRef} name="email" />
        <label htmlFor="password">Password</label>
        <input
          onChange={handlePassword}
          ref={passRef}
          name="password"
          type="password"
        />
        <label htmlFor="password">Confirm password</label>
        <input onChange={handleConfirm} name="confirmPass" type="password" />
        <button ref={btnRef} disabled={isDisabled} type="submit">
          Register
        </button>
      </form>
    </>
  );
};
export default Register;
