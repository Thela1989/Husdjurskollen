import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "@mantine/form";
import { TextInput, Button, PasswordInput } from "@mantine/core";
import { FiArrowRight } from "react-icons/fi";

import { api, setAuthToken } from "../../lib/api";
import ImageUpload from "./ImageUploader";

interface Props {
  mode: "register" | "login" | "edit";
  userId?: number;
  onEditDone?: () => void;
  onRegisterDone?: () => void;
  name?: string;
  email?: string;
}

function UserForm({
  mode,
  userId,
  onEditDone,
  onRegisterDone,
  name = "",
  email = "",
}: Props) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const sharedInputStyles = {
    input: {
      minHeight: "48px",
      borderRadius: "999px",
      backgroundColor: "#fefdf8",
      border: "1px solid #e9e5de",
      color: "var(--color-teal)",
      fontFamily: "var(--font-ui)",
      padding: "0.8rem 1rem",
    },
  };

  const passwordInputStyles = {
    input: {
      minHeight: "48px",
      borderRadius: "999px",
      backgroundColor: "#fefdf8",
      border: "1px solid #e9e5de",
      color: "var(--color-teal)",
      fontFamily: "var(--font-ui)",
      padding: "0.8rem 2.8rem 0.8rem 1rem",
    },
    innerInput: {
      borderRadius: "999px",
      backgroundColor: "transparent",
      color: "var(--color-teal)",
      fontFamily: "var(--font-ui)",
    },
  };

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
        if (onRegisterDone) {
          onRegisterDone();
        } else {
          onEditDone?.();
        }

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
      onRegisterDone?.();
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
      {mode !== "login" && (
        <ImageUpload
          onImageChange={(imageUrl: string) => {
            localStorage.setItem("userAvatar", imageUrl);
          }}
        />
      )}

      {/* Email */}
      <TextInput
        label="E-post"
        styles={sharedInputStyles}
        {...form.getInputProps("email")}
      />

      {/* Lösenord */}
      {mode !== "edit" && (
        <PasswordInput
          label="Lösenord"
          styles={passwordInputStyles}
          {...form.getInputProps("password")}
        />
      )}

      {/* Knapp */}
      <Button
        type="submit"
        className={mode !== "edit" ? "userform-submit-btn" : undefined}
      >
        {mode === "register" && (
          <>
            <span className="userform-submit-text">Registrera</span>
            <FiArrowRight className="userform-submit-icon" aria-hidden="true" />
          </>
        )}
        {mode === "login" && (
          <>
            <span className="userform-submit-text">Logga in</span>
            <FiArrowRight className="userform-submit-icon" aria-hidden="true" />
          </>
        )}
        {mode === "edit" && "Spara"}
      </Button>

      {message && <p>{message}</p>}
    </form>
  );
}

export default UserForm;
