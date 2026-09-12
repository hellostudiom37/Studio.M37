"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSeCZDCDTNAu2JShGlDjgtk_3Ql5jf5V5mpY5vvWGe5CFtJ1JA/formResponse";

const OTHER = "__other_option__";

type FieldDef =
  | { kind: "text" | "email" | "textarea"; name: string; label: string; required: boolean; helper?: string; rows?: number }
  | { kind: "radio" | "checkbox"; name: string; label: string; required: boolean; options: string[]; hasOther?: boolean };

const FIELDS: FieldDef[] = [
  { kind: "text", name: "entry.1088061951", label: "Full name", required: true },
  { kind: "text", name: "entry.1093106282", label: "Business / project name", required: false },
  { kind: "email", name: "entry.1820806974", label: "Email address", required: true },
  { kind: "text", name: "entry.1482755668", label: "Website URL", required: false },
  { kind: "text", name: "entry.509350352", label: "Instagram handle", required: false },
  { kind: "text", name: "entry.1099666523", label: "Where are you based (country & city)", required: true },
  {
    kind: "checkbox",
    name: "entry.546361128",
    label: "Which services are you interested in?",
    required: true,
    options: ["Logo Design", "Mini Brand", "Brand Identity", "Design Extras"],
    hasOther: true,
  },
  {
    kind: "textarea",
    name: "entry.300867732",
    label: "Briefly describe your project",
    helper: "What's the general brief & vision, what're you hoping we achieve?",
    required: true,
    rows: 4,
  },
  {
    kind: "textarea",
    name: "entry.794611815",
    label: "Do you have any visual inspiration?",
    helper: "Link a Pinterest board or a document, if you have one.",
    required: true,
    rows: 3,
  },
  {
    kind: "text",
    name: "entry.526477315",
    label: "Roughly, how much are you planning to invest in your project (EUR)?",
    required: true,
  },
  {
    kind: "textarea",
    name: "entry.518985280",
    label: "Do you have a deadline for this project?",
    required: true,
    rows: 2,
  },
  {
    kind: "radio",
    name: "entry.1997163622",
    label:
      "Are you happy for us to contact you via email within the next 2–3 working days to discuss your enquiry on a quick discovery call?",
    required: true,
    options: ["Yes", "No"],
  },
  {
    kind: "checkbox",
    name: "entry.1819721041",
    label: "How did you hear about us?",
    required: true,
    options: ["Google", "Instagram", "TikTok", "Referral"],
    hasOther: true,
  },
];

const inputClasses =
  "w-full rounded-lg border border-black/15 bg-white px-4 py-3 font-light-brand text-black placeholder:text-black/30 outline-none transition-colors focus:border-black";

export default function EnquiryForm() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [otherText, setOtherText] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const setValue = (name: string, value: string) => setValues((v) => ({ ...v, [name]: value }));

  const toggleCheckbox = (name: string, option: string) => {
    setValues((v) => {
      const current = v[name] ? v[name].split("␟") : [];
      const next = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      return { ...v, [name]: next.join("␟") };
    });
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    const params = new URLSearchParams();
    for (const field of FIELDS) {
      if (field.kind === "checkbox") {
        const selected = values[field.name] ? values[field.name].split("␟") : [];
        for (const option of selected) {
          if (option === OTHER) {
            params.append(field.name, OTHER);
            params.append(`${field.name}.other_option_response`, otherText[field.name] ?? "");
          } else {
            params.append(field.name, option);
          }
        }
      } else if (field.kind === "radio") {
        const selected = values[field.name];
        if (selected === OTHER) {
          params.append(field.name, OTHER);
          params.append(`${field.name}.other_option_response`, otherText[field.name] ?? "");
        } else if (selected) {
          params.append(field.name, selected);
        }
      } else {
        params.append(field.name, values[field.name] ?? "");
      }
    }

    try {
      await fetch(FORM_ACTION, { method: "POST", mode: "no-cors", body: params });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start gap-3 py-12"
      >
        <span className="font-display text-3xl italic text-black">Thank you.</span>
        <p className="font-light-brand max-w-md text-black/70">
          Your enquiry is in. We reply to every one within 2–3 working days — talk soon.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      {FIELDS.map((field) => (
        <div key={field.name} className="flex flex-col gap-2">
          <label className="font-semibold-brand text-black">
            {field.label}
            {field.required && <span className="text-black/40"> *</span>}
          </label>
          {"helper" in field && field.helper && (
            <p className="font-light-brand -mt-1 text-sm text-black/50">{field.helper}</p>
          )}

          {(field.kind === "text" || field.kind === "email") && (
            <input
              type={field.kind}
              required={field.required}
              value={values[field.name] ?? ""}
              onChange={(e) => setValue(field.name, e.target.value)}
              className={inputClasses}
            />
          )}

          {field.kind === "textarea" && (
            <textarea
              required={field.required}
              rows={field.rows ?? 3}
              value={values[field.name] ?? ""}
              onChange={(e) => setValue(field.name, e.target.value)}
              className={`${inputClasses} resize-y`}
            />
          )}

          {field.kind === "radio" && (
            <div className="flex flex-wrap gap-3">
              {[...field.options, ...(field.hasOther ? ["Other"] : [])].map((option) => {
                const optionValue = option === "Other" ? OTHER : option;
                const selected = values[field.name] === optionValue;
                return (
                  <button
                    type="button"
                    key={option}
                    onClick={() => setValue(field.name, optionValue)}
                    className={`rounded-full border px-5 py-2 font-light-brand text-sm transition-colors ${
                      selected
                        ? "border-black bg-black text-offwhite"
                        : "border-black/20 text-black hover:border-black"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
              {field.hasOther && values[field.name] === OTHER && (
                <input
                  type="text"
                  placeholder="Please specify"
                  value={otherText[field.name] ?? ""}
                  onChange={(e) => setOtherText((v) => ({ ...v, [field.name]: e.target.value }))}
                  className={`${inputClasses} basis-full`}
                />
              )}
            </div>
          )}

          {field.kind === "checkbox" && (
            <div className="flex flex-wrap gap-3">
              {[...field.options, ...(field.hasOther ? ["Other"] : [])].map((option) => {
                const optionValue = option === "Other" ? OTHER : option;
                const selected = (values[field.name] ?? "").split("␟").includes(optionValue);
                return (
                  <button
                    type="button"
                    key={option}
                    onClick={() => toggleCheckbox(field.name, optionValue)}
                    className={`rounded-full border px-5 py-2 font-light-brand text-sm transition-colors ${
                      selected
                        ? "border-black bg-black text-offwhite"
                        : "border-black/20 text-black hover:border-black"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
              {field.hasOther && (values[field.name] ?? "").split("␟").includes(OTHER) && (
                <input
                  type="text"
                  placeholder="Please specify"
                  value={otherText[field.name] ?? ""}
                  onChange={(e) => setOtherText((v) => ({ ...v, [field.name]: e.target.value }))}
                  className={`${inputClasses} basis-full`}
                />
              )}
            </div>
          )}
        </div>
      ))}

      {status === "error" && (
        <p className="font-light-brand text-sm text-red-600">
          Something went wrong sending that — please try again, or email us directly at{" "}
          <a href="mailto:hellostudio.m37@gmail.com" className="underline">
            hellostudio.m37@gmail.com
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center self-start rounded-full bg-black px-8 py-3.5 font-light-brand text-sm uppercase tracking-[0.1em] text-offwhite transition-colors hover:bg-blue hover:text-black disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
