import React, { useState } from "react";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

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

  return (
    <div className="contact-page">
      <h1>Contato</h1>
      <h2>Fale com a gente</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="seu nome"
        />
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="seu e-mail"
        />
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          placeholder="assunto"
        />
        <input
          type="file"
          id="file"
          onChange={(event) => setFile(event.target.files[0])}
        />
        <textarea
          id="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="descrição"
        />
        <button type="submit">enviar</button>
      </form>
    </div>
  );
}

export default ContactPage;
