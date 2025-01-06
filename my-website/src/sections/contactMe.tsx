"use client";

import { Stack, SvgIcon, Typography } from "@mui/material";
import { Send01 } from "@untitled-ui/icons-react";
import { Form, Formik } from "formik";
import Swal from "sweetalert2";

import { InputField } from "@/components/inputField";
import { colors } from "@/styles/colors";
import { ContactMeValidation } from "@/validation/contactMe";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

export const ContactMe = () => {
  const [duringSubmission, setDuringSubmission] = useState<boolean>(false);

  async function handleSubmit(values: {
    name: string;
    email: string;
    message: string;
  }) {
    setDuringSubmission(true);
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: `${process.env.NEXT_PUBLIC_CONTACT_ACCESS_TOKEN}`,
        name: values.name,
        email: values.email,
        message: values.message,
      }),
    });
    const result = await response.json();
    if (result.success) {
      Swal.fire({
        title: "Sent! 🥳",
        text: "I'll get back to you as soon as I can. 🙏🏻",
        icon: "success",
      });
      console.log(result);
      setDuringSubmission(false);
    }
  }

  console.log("during submission", duringSubmission);

  return (
    <>
      <Stack
        direction="column"
        spacing={5}
        justifyContent="center"
        alignItems="flex-start"
        sx={{
          backgroundColor: "rgba(98, 149, 132, 0.5)",
          border: `3px solid ${colors.charcoal}`,
          borderRadius: "10px",
          width: "50%",
          padding: 5,
        }}
      >
        <Typography variant="h3" sx={{ textShadow: "2px 2px 4px #000" }}>
          Send me a message!*
        </Typography>
        <Formik
          initialValues={{
            name: "",
            email: "",
            message: "",
          }}
          validationSchema={ContactMeValidation}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {() => (
            <Form>
              <Stack direction="column" spacing={2} sx={{ paddingX: 5 }}>
                <InputField name="Name" type="name" />
                <InputField name="Email" type="email" />
                <InputField
                  name="Message"
                  type="message"
                  as="textarea"
                  styleProps={{ height: 250 }}
                />
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{ paddingTop: 5 }}
                >
                  <LoadingButton
                    type="submit"
                    loading={duringSubmission}
                    variant="outlined"
                    size="large"
                    endIcon={
                      <SvgIcon sx={{ filter: `drop-shadow(1px 1px 2px #000)` }}>
                        <Send01 />
                      </SvgIcon>
                    }
                    sx={{
                      border: `1px solid ${colors.base.darkest}`,
                      backgroundColor: "rgb(56, 116, 120, 0.7)",
                      color: colors.base.lightest,
                      paddingX: 5,
                      textTransform: "capitalize",
                      textShadow: duringSubmission ? null : "1px 1px 1px #000",
                      "&:hover": {
                        backgroundColor: colors.base.dark,
                      },
                    }}
                  >
                    Submit
                  </LoadingButton>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </>
  );
};
