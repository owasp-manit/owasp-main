"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
    FaEye, FaEyeSlash, FaSearch, FaGithub, FaGoogleDrive,
    FaFilePdf, FaExternalLinkAlt, FaTimes, FaPhone, FaUserGraduate, FaCodeBranch
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const AdminDashboard = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [recruits, setRecruits] = useState([]);
    const [selectedRecruit, setSelectedRecruit] = useState(null); // Used for expansion logic

    // Filtering & Sorting
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedVertical, setSelectedVertical] = useState("All");

    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [error, setError] = useState("");

    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/admin`;

    // Load session from cookie on mount
    useEffect(() => {
        const storedPassword = Cookies.get("adminAuth");
        if (storedPassword) {
            setPassword(storedPassword);
            verifyStoredPassword(storedPassword);
        }
    }, []);

    const verifyStoredPassword = async (pwd) => {
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: pwd })
            });
            const data = await res.json();
            if (data.success) {
                setIsAuthenticated(true);
                fetchRecruits(pwd);
            } else {
                Cookies.remove("adminAuth");
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await res.json();
            if (data.success) {
                setIsAuthenticated(true);
                Cookies.set("adminAuth", password, { expires: 1 });
                fetchRecruits(password);
            } else {
                setError("Invalid Password");
            }
        } catch (err) {
            setError("Connection Error");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setPassword("");
        Cookies.remove("adminAuth");
    };

    const fetchRecruits = async (pwd) => {
        try {
            const res = await fetch(`${API_URL}/recruits`, {
                headers: { "x-admin-password": pwd || password },
            });
            const data = await res.json();
            setRecruits(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id, e) => {
        e?.stopPropagation();
        if (!confirm("Are you sure you want to delete this recruit?")) return;
        try {
            await fetch(`${API_URL}/recruits/${id}`, {
                method: "DELETE",
                headers: { "x-admin-password": password },
            });
            setRecruits(recruits.filter((r) => r._id !== id));
            if (selectedRecruit?._id === id) setSelectedRecruit(null);
        } catch (err) {
            console.error(err);
        }
    };

    const startEdit = (recruit, e) => {
        e?.stopPropagation();
        setEditingId(recruit._id);
        setEditFormData(recruit);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditFormData({});
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e?.stopPropagation();
        try {
            const res = await fetch(`${API_URL}/recruits/${editingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-password": password,
                },
                body: JSON.stringify(editFormData),
            });
            const updatedRecruit = await res.json();
            setRecruits(recruits.map((r) => (r._id === editingId ? updatedRecruit : r)));
            setEditingId(null);
        } catch (err) {
            console.error(err);
        }
    };

    // Filter Logic
    const verticals = ["All", "Web Developer", "Executive", "Sponsors Executive", "Graphic Designer", "Content Writer", "Video Editor"];

    const filteredRecruits = recruits.filter((recruit) => {
        const matchesVertical = selectedVertical === "All" || recruit.vertical === selectedVertical;
        const matchesSearch = recruit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            recruit.scholarNumber.includes(searchQuery) ||
            recruit.phoneNumber.includes(searchQuery);
        return matchesVertical && matchesSearch;
    });

    // Toggle expand for Accordion logic
    const toggleExpand = (id, e) => {
        e?.stopPropagation(); // Prevent bubbling if needed
        if (selectedRecruit?._id === id) {
            setSelectedRecruit(null); // Collapse if already open
        } else {
            const recruit = recruits.find(r => r._id === id);
            setSelectedRecruit(recruit); // Expand new
        }
    };

    // Helper to render the expanded details
    const renderDetailSection = (recruit) => (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-white/5 border-t border-white/10"
        >
            <div className="p-6 space-y-6">
                {/* Contact Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                        <p className="text-gray-500 mb-1 font-medium">Scholar Number</p>
                        <p className="text-white font-mono tracking-wide">{recruit.scholarNumber}</p>
                    </div>
                    <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                        <p className="text-gray-500 mb-1 font-medium">Phone Number</p>
                        <p className="text-white font-mono tracking-wide">{recruit.phoneNumber}</p>
                    </div>
                    <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                        <p className="text-gray-500 mb-1 font-medium">Branch/Year</p>
                        <p className="text-white">{recruit.branch} • {recruit.year} Year</p>
                    </div>
                </div>

                {/* Tasks Section */}
                <div>
                    <h4 className="text-sm font-bold text-sky-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                        Task Submissions
                    </h4>
                    <div className="flex flex-wrap gap-4">
                        {recruit.task1Github && (
                            <a href={recruit.task1Github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 border border-white/10 px-4 py-3 rounded-xl transition-all group">
                                <FaGithub className="text-2xl text-white group-hover:text-sky-400" />
                                <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase">Code</p>
                                    <p className="text-sm font-bold text-white">Task 1 Repo</p>
                                </div>
                                <FaExternalLinkAlt className="ml-2 text-gray-600 group-hover:text-white text-xs" />
                            </a>
                        )}
                        {recruit.task1Deployment && (
                            <a href={recruit.task1Deployment} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 border border-white/10 px-4 py-3 rounded-xl transition-all group">
                                <FaExternalLinkAlt className="text-2xl text-sky-500 group-hover:text-sky-400" />
                                <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase">Live</p>
                                    <p className="text-sm font-bold text-white">Task 1 Deploy</p>
                                </div>
                                <FaExternalLinkAlt className="ml-2 text-gray-600 group-hover:text-white text-xs" />
                            </a>
                        )}
                        {recruit.task2Github && (
                            <a href={recruit.task2Github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 border border-white/10 px-4 py-3 rounded-xl transition-all group">
                                <FaGithub className="text-2xl text-white group-hover:text-sky-400" />
                                <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase">Code</p>
                                    <p className="text-sm font-bold text-white">Task 2 Repo</p>
                                </div>
                                <FaExternalLinkAlt className="ml-2 text-gray-600 group-hover:text-white text-xs" />
                            </a>
                        )}
                        {recruit.task2Deployment && (
                            <a href={recruit.task2Deployment} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 border border-white/10 px-4 py-3 rounded-xl transition-all group">
                                <FaExternalLinkAlt className="text-2xl text-sky-500 group-hover:text-sky-400" />
                                <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase">Live</p>
                                    <p className="text-sm font-bold text-white">Task 2 Deploy</p>
                                </div>
                                <FaExternalLinkAlt className="ml-2 text-gray-600 group-hover:text-white text-xs" />
                            </a>
                        )}
                        {recruit.pdfLink && (
                            <a href={recruit.pdfLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 border border-white/10 px-4 py-3 rounded-xl transition-all group">
                                <FaFilePdf className="text-2xl text-red-500 group-hover:text-red-400" />
                                <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase">Document</p>
                                    <p className="text-sm font-bold text-white">Task PDF</p>
                                </div>
                                <FaExternalLinkAlt className="ml-2 text-gray-600 group-hover:text-white text-xs" />
                            </a>
                        )}
                        {recruit.driveLink && (
                            <a href={recruit.driveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 border border-white/10 px-4 py-3 rounded-xl transition-all group">
                                <FaGoogleDrive className="text-2xl text-green-500 group-hover:text-green-400" />
                                <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase">Drive</p>
                                    <p className="text-sm font-bold text-white">Submission Folder</p>
                                </div>
                                <FaExternalLinkAlt className="ml-2 text-gray-600 group-hover:text-white text-xs" />
                            </a>
                        )}
                        {recruit.portfolioLink && (
                            <a href={recruit.portfolioLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 border border-white/10 px-4 py-3 rounded-xl transition-all group">
                                <FaExternalLinkAlt className="text-2xl text-purple-500 group-hover:text-purple-400" />
                                <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase">Portfolio</p>
                                    <p className="text-sm font-bold text-white">Portfolio Link</p>
                                </div>
                                <FaExternalLinkAlt className="ml-2 text-gray-600 group-hover:text-white text-xs" />
                            </a>
                        )}
                        {recruit.posterLink && (
                            <a href={recruit.posterLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 border border-white/10 px-4 py-3 rounded-xl transition-all group">
                                <FaExternalLinkAlt className="text-2xl text-pink-500 group-hover:text-pink-400" />
                                <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase">Design</p>
                                    <p className="text-sm font-bold text-white">Poster Link</p>
                                </div>
                                <FaExternalLinkAlt className="ml-2 text-gray-600 group-hover:text-white text-xs" />
                            </a>
                        )}
                        {!recruit.task1Github && !recruit.driveLink && !recruit.pdfLink && !recruit.portfolioLink && !recruit.posterLink &&
                            <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-gray-500 italic text-sm">
                                No task links submitted for this candidate.
                            </div>
                        }
                    </div>
                </div>
            </div>
        </motion.div>
    );

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
                <div className="glass-card p-8 rounded-xl border border-white/10 max-w-md w-full">
                    <h2 className="text-2xl font-bold mb-6 text-center text-sky-400">Admin Access</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Admin Password"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-sky-500 text-white pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-lg transition-all"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-sky-400">Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors text-sm"
                    >
                        Logout
                    </button>
                </div>

                {/* Filters and Search */}
                <div className="mb-6 space-y-4">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search candidates..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-sky-500 text-white"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {verticals.map(vertical => (
                            <button
                                key={vertical}
                                onClick={() => setSelectedVertical(vertical)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedVertical === vertical
                                    ? "bg-sky-600 text-white"
                                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                                    }`}
                            >
                                {vertical}
                            </button>
                        ))}
                    </div>
                </div>

                {/* DESKTOP VIEW: Table */}
                <div className="hidden md:block overflow-x-auto glass-card rounded-xl border border-white/10">
                    <table className="w-full text-left text-sm text-gray-300">
                        <thead className="bg-white/5 text-xs uppercase font-medium text-gray-400">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Scholar No.</th>
                                <th className="px-6 py-4">Branch</th>
                                <th className="px-6 py-4">Vertical</th>
                                <th className="px-6 py-4">Submitted?</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredRecruits.map((recruit) => (
                                <React.Fragment key={recruit._id}>
                                    <tr
                                        className={`hover:bg-white/5 transition-colors cursor-pointer ${selectedRecruit?._id === recruit._id ? 'bg-white/5' : ''}`}
                                        onClick={(e) => toggleExpand(recruit._id, e)}
                                    >
                                        {editingId === recruit._id ? (
                                            <>
                                                <td className="px-6 py-4"><input name="name" value={editFormData.name} onChange={handleEditChange} onClick={e => e.stopPropagation()} className="bg-transparent border-b border-sky-500 text-white w-full" /></td>
                                                <td className="px-6 py-4"><input name="scholarNumber" value={editFormData.scholarNumber} onChange={handleEditChange} onClick={e => e.stopPropagation()} className="bg-transparent border-b border-sky-500 text-white w-full" /></td>
                                                <td className="px-6 py-4"><input name="branch" value={editFormData.branch} onChange={handleEditChange} onClick={e => e.stopPropagation()} className="bg-transparent border-b border-sky-500 text-white w-full" /></td>
                                                <td className="px-6 py-4"><input name="vertical" value={editFormData.vertical} onChange={handleEditChange} onClick={e => e.stopPropagation()} className="bg-transparent border-b border-sky-500 text-white w-full" /></td>
                                                <td className="px-6 py-4 text-xs">Editing...</td>
                                                <td className="px-6 py-4 text-right space-x-2">
                                                    <button onClick={handleUpdate} className="text-green-400 hover:text-green-300">Save</button>
                                                    <button onClick={cancelEdit} className="text-gray-400 hover:text-gray-300">Cancel</button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-6 py-4 font-medium text-white">{recruit.name}</td>
                                                <td className="px-6 py-4">{recruit.scholarNumber}</td>
                                                <td className="px-6 py-4">{recruit.branch}</td>
                                                <td className="px-6 py-4"><span className="bg-sky-500/10 text-sky-400 px-2 py-1 rounded-full text-xs">{recruit.vertical}</span></td>
                                                <td className="px-6 py-4">
                                                    {(recruit.task1Github || recruit.driveLink || recruit.pdfLink || recruit.portfolioLink) ?
                                                        <span className="text-green-400 text-xs flex items-center gap-1">● Yes</span> :
                                                        <span className="text-gray-500 text-xs">● No</span>
                                                    }
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-2">
                                                    <button onClick={(e) => startEdit(recruit, e)} className="text-sky-400 hover:text-sky-300">Edit</button>
                                                    <button onClick={(e) => handleDelete(recruit._id, e)} className="text-red-400 hover:text-red-300">Delete</button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                    <AnimatePresence>
                                        {selectedRecruit?._id === recruit._id && (
                                            <tr className="bg-black/40">
                                                <td colSpan="6" className="p-0 border-t border-white/5">
                                                    {renderDetailSection(recruit)}
                                                </td>
                                            </tr>
                                        )}
                                    </AnimatePresence>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* MOBILE VIEW: Cards */}
                <div className="md:hidden space-y-4">
                    {filteredRecruits.map((recruit) => (
                        <div
                            key={recruit._id}
                            onClick={(e) => toggleExpand(recruit._id, e)}
                            className={`glass-card rounded-xl border border-white/10 active:scale-[0.99] transition-all cursor-pointer overflow-hidden ${selectedRecruit?._id === recruit._id ? 'border-sky-500/50' : ''}`}
                        >
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{recruit.name}</h3>
                                        <span className="text-sm text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full">{recruit.vertical}</span>
                                    </div>
                                    <div className="flex space-x-3">
                                        <button onClick={(e) => startEdit(recruit, e)} className="text-sky-400"><FaUserGraduate /></button>
                                        {/* Mobile delete button could go here or inside details */}
                                        <button onClick={(e) => handleDelete(recruit._id, e)} className="text-red-400"><FaTimes /></button>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-400">
                                    <p>{recruit.branch} • {recruit.year} Year</p>
                                </div>
                            </div>

                            {/* Expandable Mobile Section */}
                            <AnimatePresence>
                                {selectedRecruit?._id === recruit._id && renderDetailSection(recruit)}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {filteredRecruits.length === 0 && (
                    <div className="text-center py-10 text-gray-500">No candidates found.</div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
