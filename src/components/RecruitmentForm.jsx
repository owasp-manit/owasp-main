"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const RecruitmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    branch: "",
    scholarNumber: "",
    vertical: "",
    phoneNumber: "",
    // Dynamic Fields
    task1Github: "",
    task1Deployment: "",
    task2Github: "",
    task2Deployment: "",
    pdfLink: "",
    driveLink: "",
    portfolioLink: "",
    posterLink: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const branches = [
    "Computer Science",
    "Mathematics and Data Science",
    "Electronics and Communication",
    "Electrical",
    "Mechanical",
    "Chemical",
    "Civil",
    "Materials and Metallurgical",
    "Architecture and Planning",
  ];

  const verticals = [
    "Executive",
    "Web Developer",
    "Sponsors Executive",
    "Graphic Designer",
    "Content Writer",
    "Video Editor",
  ];

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required.";
    if (!formData.year) tempErrors.year = "Year is required.";
    if (!formData.branch) tempErrors.branch = "Branch is required.";

    // Scholar Number Validation: 11 digits, starts with 2
    if (!formData.scholarNumber) {
      tempErrors.scholarNumber = "Scholar Number is required.";
    } else if (!/^[2]\d{10}$/.test(formData.scholarNumber)) {
      tempErrors.scholarNumber = "Scholar Number must be 11 digits and start with 2.";
    }

    if (!formData.vertical) tempErrors.vertical = "Vertical is required.";

    // Phone Number Validation: Valid Indian phone number
    if (!formData.phoneNumber) {
      tempErrors.phoneNumber = "Phone Number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
      tempErrors.phoneNumber = "Please enter a valid Indian phone number.";
    }

    // Dynamic Field Validation
    if (formData.vertical === "Web Developer") {
      if (!formData.task1Github) tempErrors.task1Github = "Task 1 Github Link is required.";
      if (!formData.task1Deployment) tempErrors.task1Deployment = "Task 1 Deployment Link is required.";
      // Task 2 is optional for Web Dev
    } else if (formData.vertical === "Executive") {
      if (!formData.task1Github) tempErrors.task1Github = "Task 1 Github Link is required.";
      if (!formData.pdfLink) tempErrors.pdfLink = "Task 2 PDF Link is required.";
    } else if (formData.vertical === "Sponsors Executive") {
      if (!formData.driveLink) tempErrors.driveLink = "Drive Link is required.";
    } else if (formData.vertical === "Graphic Designer") {
      if (!formData.portfolioLink) tempErrors.portfolioLink = "Portfolio Link is required.";
      if (!formData.posterLink) tempErrors.posterLink = "Poster Link is required.";
      if (!formData.driveLink) tempErrors.driveLink = "PDF Drive Link is required.";
    } else if (formData.vertical === "Content Writer") {
      if (!formData.driveLink) tempErrors.driveLink = "Drive Link is required.";
    } else if (formData.vertical === "Video Editor") {
      if (!formData.driveLink) tempErrors.driveLink = "Drive Link is required.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recruitment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Form Submitted:", formData);
          setSubmitted(true);
        } else {
          // Handle specific errors
          if (data.message) {
            // Try to map error to specific field if possible, or show alert
            if (data.message.includes("Scholar Number")) {
              setErrors((prev) => ({ ...prev, scholarNumber: data.message }));
            }
            alert(data.message);
          } else {
            alert("Submission failed. Please try again.");
          }
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Server error. Please try again later.");
      }
    }
  };

  // Helper to render input field
  const renderInput = (name, placeholder, label, required = true) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300 ml-1">
        {label} {required ? "" : "(Optional)"}
      </label>
      <input
        type="text"
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-white/5 border ${errors[name] ? 'border-red-500/50' : 'border-white/10'} rounded-lg focus:outline-none focus:border-sky-500 text-white placeholder-gray-500 transition-colors`}
      />
      {errors[name] && <p className="text-red-400 text-xs ml-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="glass-card p-8 md:p-10 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-10 pointer-events-none"></div>

        <h2 className="text-3xl font-bold mb-8 text-center text-white font-heading">
          Join the <span className="text-sky-400">Team</span>
        </h2>

        {submitted ? (
          <div className="text-center py-10">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-white mb-2">Application Received!</h3>
            <p className="text-gray-300">Thank you for your interest. We'll be in touch soon.</p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  year: "",
                  branch: "",
                  scholarNumber: "",
                  vertical: "",
                  phoneNumber: "",
                  task1Github: "",
                  task1Deployment: "",
                  task2Github: "",
                  task2Deployment: "",
                  pdfLink: "",
                  driveLink: "",
                  portfolioLink: "",
                  posterLink: "",
                });
                setErrors({});
              }}
              className="mt-6 text-sky-400 hover:text-sky-300 underline cursor-pointer"
            >
              Submit another response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-lg focus:outline-none focus:border-sky-500 text-white placeholder-gray-500 transition-colors`}
                />
                {errors.name && <p className="text-red-400 text-xs ml-1">{errors.name}</p>}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  maxLength="10"
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.phoneNumber ? 'border-red-500/50' : 'border-white/10'} rounded-lg focus:outline-none focus:border-sky-500 text-white placeholder-gray-500 transition-colors`}
                />
                {errors.phoneNumber && <p className="text-red-400 text-xs ml-1">{errors.phoneNumber}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Scholar Number */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Scholar Number</label>
                <input
                  type="text"
                  name="scholarNumber"
                  value={formData.scholarNumber}
                  onChange={handleChange}
                  placeholder="25xxxxxxxxx"
                  maxLength="11"
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.scholarNumber ? 'border-red-500/50' : 'border-white/10'} rounded-lg focus:outline-none focus:border-sky-500 text-white placeholder-gray-500 transition-colors`}
                />
                {errors.scholarNumber && <p className="text-red-400 text-xs ml-1">{errors.scholarNumber}</p>}
              </div>

              {/* Year */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.year ? 'border-red-500/50' : 'border-white/10'} rounded-lg focus:outline-none focus:border-sky-500 text-white transition-colors appearance-none cursor-pointer`}
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="" className="bg-zinc-900 text-gray-500">Select Year</option>
                  {[1, 2, 3, 4, 5].map((y) => (
                    <option key={y} value={y} className="bg-zinc-900 text-white">
                      {y === 1 ? '1st' : y === 2 ? '2nd' : y === 3 ? '3rd' : `${y}th`} Year
                    </option>
                  ))}
                </select>
                {errors.year && <p className="text-red-400 text-xs ml-1">{errors.year}</p>}
              </div>
            </div>

            {/* Branch */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Branch</label>
              <div className="relative">
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.branch ? 'border-red-500/50' : 'border-white/10'} rounded-lg focus:outline-none focus:border-sky-500 text-white transition-colors appearance-none cursor-pointer`}
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="" className="bg-zinc-900 text-gray-500">Select Branch</option>
                  {branches.map((b) => (
                    <option key={b} value={b} className="bg-zinc-900 text-white">
                      {b}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                </div>
              </div>
              {errors.branch && <p className="text-red-400 text-xs ml-1">{errors.branch}</p>}
            </div>

            {/* Vertical */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Interested Vertical</label>
              <div className="relative">
                <select
                  name="vertical"
                  value={formData.vertical}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.vertical ? 'border-red-500/50' : 'border-white/10'} rounded-lg focus:outline-none focus:border-sky-500 text-white transition-colors appearance-none cursor-pointer`}
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="" className="bg-zinc-900 text-gray-500">Select Vertical</option>
                  {verticals.map((v) => (
                    <option key={v} value={v} className="bg-zinc-900 text-white">
                      {v}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                </div>
              </div>
              {errors.vertical && <p className="text-red-400 text-xs ml-1">{errors.vertical}</p>}
            </div>

            {/* Dynamic Fields Section */}
            {formData.vertical && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-6 pt-4 border-t border-white/10"
              >
                <h3 className="text-lg font-semibold text-sky-400">Task Submission</h3>

                {formData.vertical === 'Web Developer' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderInput("task1Github", "https://github.com/...", "Task 1 Github Link", true)}
                      {renderInput("task1Deployment", "https://...", "Task 1 Deployment Link", true)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderInput("task2Github", "https://github.com/...", "Task 2 Github Link", false)}
                      {renderInput("task2Deployment", "https://...", "Task 2 Deployment Link", false)}
                    </div>
                  </>
                )}

                {formData.vertical === 'Executive' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderInput("task1Github", "https://github.com/...", "Task 1 Github Link", true)}
                    {renderInput("pdfLink", "https://drive.google.com/...", "Task 2 PDF Link", true)}
                  </div>
                )}

                {formData.vertical === 'Sponsors Executive' && (
                  renderInput("driveLink", "https://drive.google.com/...", "Drive Link", true)
                )}

                {formData.vertical === 'Graphic Designer' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderInput("portfolioLink", "https://...", "Portfolio Link", true)}
                      {renderInput("posterLink", "https://...", "Poster Link", true)}
                    </div>
                    {renderInput("driveLink", "https://drive.google.com/...", "PDF Drive Link", true)}
                  </div>
                )}

                {formData.vertical === 'Content Writer' && (
                  renderInput("driveLink", "https://drive.google.com/...", "Drive Link", true)
                )}

                {formData.vertical === 'Video Editor' && (
                  renderInput("driveLink", "https://drive.google.com/...", "Drive Link", true)
                )}

              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold py-3.5 rounded-lg shadow-lg hover:shadow-sky-500/20 transition-all duration-300 transform"
            >
              Submit Application
            </motion.button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RecruitmentForm;
