"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "your_service_id",     // 🔁 Replace with yours
        "your_template_id",    // 🔁 Replace with yours
        form.current,
        "your_public_key"      // 🔁 Replace with yours
      )
      .then(
        () => {
          setSent(true);
          setLoading(false);
          form.current.reset();
        },
        (error) => {
          console.error(error.text);
          setLoading(false);
        }
      );
  };

  return (
    <div className="max-w-xl mx-auto bg-zinc-900 p-8 rounded-xl shadow-md text-white">
      <h2 className="text-2xl font-semibold mb-6 text-sky-400">Contact Us</h2>
      <form ref={form} onSubmit={sendEmail} className="space-y-4">
        <input
          type="text"
          name="user_name"
          placeholder="Your Name"
          required
          className="w-full px-4 py-2 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <input
          type="email"
          name="user_email"
          placeholder="Your Email"
          required
          className="w-full px-4 py-2 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <textarea
          name="message"
          rows="4"
          placeholder="Your Message"
          required
          className="w-full px-4 py-2 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {sent && (
          <p className="text-green-400 mt-3">✅ Your message has been sent!</p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
