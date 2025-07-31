import cyberBasics from "../assets/cyberBasics/IMG_5445.png";
import ctf from "../assets/ctf/ctf2.jpg";
import cyberHunter from "../assets/cyberHunter/cyberhntr.jpg";

const EventData = [
  {
    image: cyberBasics,
    name: "CyberBasics 1.0",
    details:
      "A specially designed guest lecture session introducing fundamental cybersecurity concepts to beginners",
    date: "April 12th, 2025",
    time: "10:00 AM",
    link: "/events/CyberBasics",
  },
  {
    image: ctf,
    name: "OWASP MANIT CTF",
    details:
      "Round 1: Online technical quiz ,Round 2: Onsite Jeopardy-style CTF hosted in MANIT NTB",
    date: "April 13th, 2025",
    time: "12:00 PM",
    link: "/events/CaptureTheFlag",
  },
  {
    image: cyberHunter,
    name: "CyberHunter 1.0 – Real World Hacking Game",
    details:
      "Teams solved programming-based riddles to identify hidden bullet coordinates. The team that found all bullet locations and successfully eliminated other teams won the game.",
    date: "April 11th – 13th, 2025",
    time: "12:00 PM - 3:00 PM",
    link: "/events/CyberHunter",
  },
];

export default EventData;
