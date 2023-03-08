import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import NavBar from "../components/NavBar";

const submitButtonDisabled =
  "bg-gray-400 w-4/12 flex justify-center items-center uppercase my-2 h-10 text-gray-100 text-sm";
const submitButtonNotDisabled =
  "bg-gradient-to-r from-violet-500 to-fuchsia-500 w-4/12 flex justify-center items-center uppercase my-2 h-10 text-gray-100 text-sm";

const inputError =
  "w-full max-w-screen-sm text-sm border-red-400 border h-9 my-3 px-2 h-14 max-md:my-1";
const inputNotError =
  "w-full max-w-screen-sm text-sm border-gray-400 border h-9 my-3 px-2 h-14 max-md:my-1";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [messageError, setMessageError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      name,
      email,
      subject,
      file,
      message,
    });
  };

  const handleName = (event) => {
    setName(event.target.value);
    event.target.value
      ? setNameError("")
      : setNameError("Por favor, digite seu nome");
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
    if (!event.target.value) {
      setEmailError("Por favor, digite seu email");
    } else if (!/\S+@\S+\.\S+/.test(event.target.value)) {
      setEmailError("Por favor, digite um email válido");
    } else {
      setEmailError("");
    }
  };
  const handleSubject = (event) => {
    setSubject(event.target.value);
    event.target.value
      ? setSubjectError("")
      : setSubjectError("Por favor, digite o assunto");
  };
  const handleMessage = (event) => {
    setMessage(event.target.value);
    event.target.value
      ? setMessageError("")
      : setMessageError("Por favor, digite a descrição de sua mensagem");
  };

  useEffect(() => {
    name && email && subject && message && !emailError
      ? setSubmitIsDisabled(false)
      : setSubmitIsDisabled(true);
  }, [name, email, subject, message]);
  return (
    <div>
      <div>
        <Background />
        <NavBar />
      </div>
      <div className="w-screen h-screen flex justify-center items-center flex-col">
        <div className="flex justify-center items-center flex-col filter-none text-gray-100 z-10 h-1/4">
          <h1 className="text-5xl font-normal tracking-widest max-md:text-2xl uppercase">
            Contate-nos
          </h1>
          <h2 className="text-2xl font-light max-md:text-xl">
            Fale com a gente
          </h2>
        </div>
        <div className="bg-white w-full flex flex-col drop-shadow-2xl h-full justify-center max-h-screen max-w-3xl">
          <div className="flex justify-center mx-3">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col mt-4 justify-center items-center w-full h-full max-w-xl"
            >
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleName}
                placeholder="seu nome"
                className={nameError ? inputError : inputNotError}
              />
              {nameError && <div className="text-sm">{nameError}</div>}
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmail}
                placeholder="seu e-mail"
                className={emailError ? inputError : inputNotError}
              />
              {emailError && <div className="text-sm">{emailError}</div>}
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={handleSubject}
                placeholder="assunto"
                className={subjectError ? inputError : inputNotError}
              />
              {subjectError && <div className="text-sm">{subjectError}</div>}
              <label
                htmlFor="file"
                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 w-4/12 flex justify-center items-center uppercase my-2 h-10 text-gray-50 text-sm max-md:my-1"
              >
                Escolher ficheiro
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
              </label>
              <input
                type="file"
                id="file"
                onChange={(event) => setFile(event.target.files[0])}
                className="hidden"
              />
              {file && (
                <div className="text-sm">
                  arquivo escolhido com sucesso! <br></br> {file.name}{" "}
                  <button
                    className=" text-red-500"
                    onClick={(event) => setFile(null)}
                  >
                    X
                  </button>
                </div>
              )}
              <textarea
                id="message"
                value={message}
                onChange={handleMessage}
                placeholder="descrição"
                className="text-sm border border-gray-400 w-full my-3 p-2 max-h-40 h-1/3 max-md:my-1"
              />
              {messageError && <div className="text-sm">{messageError}</div>}
              <button
                className={
                  submitIsDisabled
                    ? submitButtonDisabled
                    : submitButtonNotDisabled
                }
                type="submit"
                disabled={submitIsDisabled}
              >
                enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
