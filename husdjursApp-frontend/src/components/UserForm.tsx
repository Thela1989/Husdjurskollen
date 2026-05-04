import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useForm } from "@mantine/form";
import { TextInput, Button, Title, PasswordInput } from "@mantine/core";

import { api, setAuthToken } from "../lib/api";

interface Props {
  mode: "register" | "login" | "edit";
  userId?: number;
  onEditDone?: () => void;
  name?: string;
  email?: string;
}

function UserForm({ mode, userId, onEditDone, name = "", email = "" }: Props) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: name,
      email: email,
      password: "",
    },
  });
  const handleSubmit = form.onSubmit(async (values) => {
    try {
      if (mode === "edit" && userId) {
        await api.put(`/users/${userId}`, {
          name: values.name,
          email: values.email,
        });
        setMessage("Användare uppdaterad ✅");
      }

      if (mode === "register") {
        console.log("SKICKAR:", values);
        const res = await api.post("/auth/register", {
          name: values.name,
          email: values.email,
          password: values.password,
        });

        setAuthToken(res.data.token);

        navigate("/account");
      }

      if (mode === "login") {
        const res = await api.post("/auth/login", {
          email: values.email,
          password: values.password,
        });

        setAuthToken(res.data.token);
        setMessage("Inloggad ✅");
      }

      onEditDone?.();
    } catch (error) {
      console.error(error);
      setMessage("Något gick fel ❌");
    }
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm">
      <h2>
        {mode === "register" && "Registrera"}
        {mode === "login" && "Logga in"}
        {mode === "edit" && "Redigera användare"}
      </h2>

      {/* Namn */}
      {mode !== "login" && (
        <TextInput label="Namn" {...form.getInputProps("name")} />
      )}

      {/* Email */}
      <TextInput label="E-post" {...form.getInputProps("email")} />

      {/* Lösenord */}
      {mode !== "edit" && (
        <PasswordInput label="Lösenord" {...form.getInputProps("password")} />
      )}

      {/* Knapp */}
      <Button type="submit">
        {mode === "register" && "Registrera"}
        {mode === "login" && "Logga in"}
        {mode === "edit" && "Spara"}
      </Button>

      {message && <p>{message}</p>}
    </form>
  );
}

export default UserForm;
