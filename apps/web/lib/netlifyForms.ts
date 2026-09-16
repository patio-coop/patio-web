export type FormSubmissionState = "idle" | "submitting" | "success" | "error";

export async function submitNetlifyForm(form: HTMLFormElement) {
  const body = new URLSearchParams();

  new FormData(form).forEach((value, key) => {
    if (typeof value === "string") {
      body.append(key, value);
    }
  });

  const response = await fetch("/__forms.html", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`Form submission failed with status ${response.status}`);
  }
}
