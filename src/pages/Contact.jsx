import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle } from "lucide-react";

import PageHero from "../components/layout/PageHero";
import { Container, Section, SectionHeading } from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import Accordion from "../components/ui/Accordion";
import { Field, Input, Select, Textarea } from "../components/ui/Form";

import { SITE } from "../data/site";
import { EVENT_TYPES } from "../data/services";
import { FAQS } from "../data/content";
import { PHOTO } from "../data/images";
import { isValidEmail, isValidPhone } from "../lib/utils";

const EMPTY = { name: "", email: "", phone: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    // Clear the error as soon as the visitor starts fixing it.
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!form.email.trim()) next.email = "We need an email to reply to.";
    else if (!isValidEmail(form.email)) next.email = "That email does not look right.";
    if (form.phone.trim() && !isValidPhone(form.phone))
      next.phone = "Please check the phone number.";
    if (!form.message.trim()) next.message = "Let us know how we can help.";
    else if (form.message.trim().length < 10) next.message = "A little more detail, please.";
    return next;
  }

  function onSubmit(e) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    // No backend yet — this is where a POST or email-service call would go.
    setSent(true);
  }

  const details = [
    {
      icon: MapPin,
      label: "Visit",
      lines: [SITE.address.line1, SITE.address.line2],
    },
    {
      icon: Phone,
      label: "Call",
      lines: [SITE.phone],
      href: SITE.phoneHref,
    },
    {
      icon: Mail,
      label: "Email",
      lines: [SITE.email],
      href: SITE.emailHref,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      lines: [SITE.whatsapp],
      href: SITE.whatsappHref,
    },
  ];

  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Say hello"
        title="Come and see the halls"
        lead="Call, message, or send the form below. Someone answers every enquiry within a working day — usually much sooner."
        photo={PHOTO.hallGarden}
      />

      {/* Details */}
      <Section tone="cream">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {details.map((item, i) => {
              const content = (
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blush-50 text-rose-500 transition-colors duration-500 group-hover:bg-rose-500 group-hover:text-white">
                    <item.icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>

                  <span className="mt-5 block text-[0.65rem] uppercase tracking-[0.2em] text-ink-400">
                    {item.label}
                  </span>

                  <span className="mt-2 block text-sm leading-relaxed text-ink-900">
                    {item.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </>
              );

              return (
                <Reveal key={item.label} delay={i * 0.08}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className="group block h-full rounded-4xl border border-cream-200 bg-white p-7 shadow-soft transition-all duration-500 ease-soft hover:-translate-y-1 hover:shadow-soft-lg"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="group h-full rounded-4xl border border-cream-200 bg-white p-7 shadow-soft">
                      {content}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Form + hours */}
      <Section tone="white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow">Send a message</p>
                <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">
                  Tell us what you are planning
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ink-500">
                  For a firm quote with a date attached, use the{" "}
                  <a href="/booking" className="text-rose-600 underline underline-offset-4">
                    booking page
                  </a>{" "}
                  instead — it prices as you go.
                </p>
              </Reveal>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-10 rounded-4xl border border-blush-200 bg-blush-50 p-8 text-center sm:p-12"
                >
                  <CheckCircle2
                    className="mx-auto h-14 w-14 text-rose-500"
                    strokeWidth={1.25}
                  />
                  <h3 className="mt-6 text-2xl">Message sent</h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-500">
                    Thank you, {form.name.split(" ")[0]}. Someone will get back to you
                    on {form.email} within one working day.
                  </p>

                  <Button
                    variant="outline"
                    className="mt-8"
                    onClick={() => {
                      setForm(EMPTY);
                      setSent(false);
                    }}
                  >
                    Send another
                  </Button>
                </motion.div>
              ) : (
                <Reveal delay={0.1}>
                  <form onSubmit={onSubmit} noValidate className="mt-10 space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field label="Your name" htmlFor="name" required error={errors.name}>
                        <Input
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          placeholder="Ayesha Rehman"
                          error={errors.name}
                        />
                      </Field>

                      <Field label="Email" htmlFor="email" required error={errors.email}>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="you@example.com"
                          error={errors.email}
                        />
                      </Field>

                      <Field label="Phone" htmlFor="phone" error={errors.phone} hint="Optional">
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="0300 1234567"
                          error={errors.phone}
                        />
                      </Field>

                      <Field label="Subject" htmlFor="subject">
                        <Select
                          id="subject"
                          name="subject"
                          value={form.subject}
                          onChange={(e) => update("subject", e.target.value)}
                          placeholder="What is it about?"
                          options={[...EVENT_TYPES, "General enquiry"]}
                        />
                      </Field>
                    </div>

                    <Field label="Message" htmlFor="message" required error={errors.message}>
                      <Textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="Rough date, number of guests, and anything you already have in mind."
                        error={errors.message}
                      />
                    </Field>

                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      <Send className="h-4 w-4" strokeWidth={1.5} />
                      Send message
                    </Button>
                  </form>
                </Reveal>
              )}
            </div>

            {/* Hours + map */}
            <Reveal delay={0.15} className="lg:col-span-5">
              <div className="rounded-4xl border border-cream-200 bg-cream-50 p-8">
                <h3 className="flex items-center gap-3 text-xl">
                  <Clock className="h-5 w-5 text-rose-500" strokeWidth={1.5} />
                  Opening hours
                </h3>

                <dl className="mt-6 space-y-3">
                  {SITE.hours.map((row) => (
                    <div
                      key={row.days}
                      className="flex items-baseline justify-between gap-4 border-b border-dashed border-cream-300 pb-3 last:border-0"
                    >
                      <dt className="text-sm text-ink-700">{row.days}</dt>
                      <dd className="shrink-0 text-sm text-ink-400">{row.time}</dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-6 text-sm leading-relaxed text-ink-500">
                  Walk-ins are welcome, but a booked appointment means someone senior
                  will be free to show you round.
                </p>
              </div>

              <div className="mt-6 overflow-hidden rounded-4xl border border-cream-200 shadow-soft">
                <iframe
                  title={`Map showing ${SITE.name}`}
                  src={SITE.mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-72 w-full border-0 sm:h-80"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="blush">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Before you call"
            title="You might find it here"
            lead="The questions that come up on almost every first phone call."
          />

          <Reveal className="mt-12">
            <Accordion items={FAQS.slice(0, 5)} />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
