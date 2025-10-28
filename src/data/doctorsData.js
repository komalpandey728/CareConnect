const doctorsData = [
  // 🌿 General Physician / Internal Medicine
  {
    id: 1,
    name: "Dr. Asha Patel",
    specialty: "General Physician / Internal Medicine",
    path: "general-physician",
    experience: "8 years",
    fees: "₹50",
  },
  {
    id: 2,
    name: "Dr. Manoj Deshmukh",
    specialty: "General Physician / Internal Medicine",
    path: "general-physician",
    experience: "12 years",
    fees: "Free",
  },

  // 💆 Dermatology
  {
    id: 3,
    name: "Dr. Neha Khanna",
    specialty: "Dermatology",
    path: "dermatology",
    experience: "7 years",
    fees: "₹30",
  },
  {
    id: 4,
    name: "Dr. Ritesh Gupta",
    specialty: "Dermatology",
    path: "dermatology",
    experience: "10 years",
    fees: "Free",
  },

  // 👩‍⚕️ Obstetrics & Gynecology
  {
    id: 5,
    name: "Dr. Pooja Sharma",
    specialty: "Obstetrics & Gynecology",
    path: "gynecology",
    experience: "9 years",
    fees: "₹40",
  },
  {
    id: 6,
    name: "Dr. Meenal Dubey",
    specialty: "Obstetrics & Gynecology",
    path: "gynecology",
    experience: "14 years",
    fees: "₹50",
  },

  // 🦴 Orthopaedics
  {
    id: 7,
    name: "Dr. Arjun Verma",
    specialty: "Orthopaedics",
    path: "orthopaedics",
    experience: "11 years",
    fees: "₹50",
  },
  {
    id: 8,
    name: "Dr. Rajeev Singh",
    specialty: "Orthopaedics",
    path: "orthopaedics",
    experience: "6 years",
    fees: "Free",
  },

  // 👂 ENT
  {
    id: 9,
    name: "Dr. Sneha Iyer",
    specialty: "ENT",
    path: "ent",
    experience: "8 years",
    fees: "₹40",
  },
  {
    id: 10,
    name: "Dr. Vikram Nair",
    specialty: "ENT",
    path: "ent",
    experience: "10 years",
    fees: "₹50",
  },

  // 🧠 Neurology
  {
    id: 11,
    name: "Dr. S. Krishnan",
    specialty: "Neurology",
    path: "neurology",
    experience: "15 years",
    fees: "₹50",
  },
  {
    id: 12,
    name: "Dr. Anita George",
    specialty: "Neurology",
    path: "neurology",
    experience: "9 years",
    fees: "Free",
  },

  // ❤️ Cardiology
  {
    id: 13,
    name: "Dr. Rohan Kapoor",
    specialty: "Cardiology",
    path: "cardiology",
    experience: "13 years",
    fees: "₹50",
  },
  {
    id: 14,
    name: "Dr. Nidhi Agarwal",
    specialty: "Cardiology",
    path: "cardiology",
    experience: "10 years",
    fees: "Free",
  },

  // 💧 Urology
  {
    id: 15,
    name: "Dr. Karan Bhatia",
    specialty: "Urology",
    path: "urology",
    experience: "11 years",
    fees: "₹30",
  },
  {
    id: 16,
    name: "Dr. Priya Singh",
    specialty: "Urology",
    path: "urology",
    experience: "8 years",
    fees: "Free",
  },

  // 🍽 Gastroenterology
  {
    id: 17,
    name: "Dr. Ravi Mehta",
    specialty: "Gastroenterology / GI Medicine",
    path: "gastroenterology",
    experience: "10 years",
    fees: "₹40",
  },
  {
    id: 18,
    name: "Dr. Alka Sharma",
    specialty: "Gastroenterology / GI Medicine",
    path: "gastroenterology",
    experience: "12 years",
    fees: "₹50",
  },

  // 🧘 Psychiatry
  {
    id: 19,
    name: "Dr. Varun Anand",
    specialty: "Psychiatry",
    path: "psychiatry",
    experience: "9 years",
    fees: "Free",
  },
  {
    id: 20,
    name: "Dr. Kavita Rao",
    specialty: "Psychiatry",
    path: "psychiatry",
    experience: "6 years",
    fees: "₹50",
  },

  // 👶 Paediatrics
  {
    id: 21,
    name: "Dr. Rohit Sharma",
    specialty: "Paediatrics",
    path: "paediatrics",
    experience: "10 years",
    fees: "Free",
  },
  {
    id: 22,
    name: "Dr. Shruti Nair",
    specialty: "Paediatrics",
    path: "paediatrics",
    experience: "8 years",
    fees: "₹50",
  },

  // 🫁 Pulmonology
  {
    id: 23,
    name: "Dr. Sandeep Tiwari",
    specialty: "Pulmonology / Respiratory Medicine",
    path: "pulmonology",
    experience: "9 years",
    fees: "₹50",
  },
  {
    id: 24,
    name: "Dr. Neerja Bajaj",
    specialty: "Pulmonology / Respiratory Medicine",
    path: "pulmonology",
    experience: "12 years",
    fees: "Free",
  },

  // 🔬 Endocrinology
  {
    id: 25,
    name: "Dr. Mehul Joshi",
    specialty: "Endocrinology",
    path: "endocrinology",
    experience: "10 years",
    fees: "₹50",
  },
  {
    id: 26,
    name: "Dr. Tanvi Sharma",
    specialty: "Endocrinology",
    path: "endocrinology",
    experience: "8 years",
    fees: "Free",
  },

  // 💧 Nephrology
  {
    id: 27,
    name: "Dr. Kunal Jain",
    specialty: "Nephrology",
    path: "nephrology",
    experience: "12 years",
    fees: "₹40",
  },
  {
    id: 28,
    name: "Dr. Richa Verma",
    specialty: "Nephrology",
    path: "nephrology",
    experience: "10 years",
    fees: "Free",
  },

  // 🧩 Neurosurgery
  {
    id: 29,
    name: "Dr. Deepak Reddy",
    specialty: "Neurosurgery",
    path: "neurosurgery",
    experience: "14 years",
    fees: "₹50",
  },
  {
    id: 30,
    name: "Dr. Shalini Bhatt",
    specialty: "Neurosurgery",
    path: "neurosurgery",
    experience: "10 years",
    fees: "Free",
  },

  // 🦴 Rheumatology
  {
    id: 31,
    name: "Dr. Amit Sinha",
    specialty: "Rheumatology",
    path: "rheumatology",
    experience: "9 years",
    fees: "₹40",
  },
  {
    id: 32,
    name: "Dr. Leena Das",
    specialty: "Rheumatology",
    path: "rheumatology",
    experience: "Free",
  },

  // 👁 Ophthalmology
  {
    id: 33,
    name: "Dr. Harish Kapoor",
    specialty: "Ophthalmology",
    path: "ophthalmology",
    experience: "8 years",
    fees: "₹50",
  },
  {
    id: 34,
    name: "Dr. Sneha Reddy",
    specialty: "Ophthalmology",
    path: "ophthalmology",
    experience: "10 years",
    fees: "Free",
  },

  // 🩺 Surgical Gastroenterology
  {
    id: 35,
    name: "Dr. Rahul Menon",
    specialty: "Surgical Gastroenterology",
    path: "surgical-gastroenterology",
    experience: "11 years",
    fees: "₹50",
  },
  {
    id: 36,
    name: "Dr. Karuna Das",
    specialty: "Surgical Gastroenterology",
    path: "surgical-gastroenterology",
    experience: "9 years",
    fees: "Free",
  },

  // 🦠 Infectious Disease
  {
    id: 37,
    name: "Dr. Vikas Mehra",
    specialty: "Infectious Disease",
    path: "infectious-disease",
    experience: "10 years",
    fees: "Free",
  },
  {
    id: 38,
    name: "Dr. Neelam Sethi",
    specialty: "Infectious Disease",
    path: "infectious-disease",
    experience: "8 years",
    fees: "₹50",
  },

  // 🩹 General & Laparoscopic Surgeon
  {
    id: 39,
    name: "Dr. Saurabh Jain",
    specialty: "General & Laparoscopic Surgeon",
    path: "laparoscopic-surgeon",
    experience: "12 years",
    fees: "₹50",
  },
  {
    id: 40,
    name: "Dr. Pallavi Gupta",
    specialty: "General & Laparoscopic Surgeon",
    path: "laparoscopic-surgeon",
    experience: "10 years",
    fees: "Free",
  },

  // 🧘 Psychology
  {
    id: 41,
    name: "Dr. Smita Agarwal",
    specialty: "Psychology",
    path: "psychology",
    experience: "9 years",
    fees: "Free",
  },
  {
    id: 42,
    name: "Dr. Rakesh Nair",
    specialty: "Psychology",
    path: "psychology",
    experience: "8 years",
    fees: "₹40",
  },

  // 🎗 Medical Oncology
  {
    id: 43,
    name: "Dr. Abhinav Suri",
    specialty: "Medical Oncology",
    path: "medical-oncology",
    experience: "13 years",
    fees: "₹50",
  },
  {
    id: 44,
    name: "Dr. Preeti Mathur",
    specialty: "Medical Oncology",
    path: "medical-oncology",
    experience: "11 years",
    fees: "Free",
  },

  // 🍬 Diabetology
  {
    id: 45,
    name: "Dr. Meena Iyer",
    specialty: "Diabetology",
    path: "diabetology",
    experience: "10 years",
    fees: "₹30",
  },
  {
    id: 46,
    name: "Dr. Sanjay Tandon",
    specialty: "Diabetology",
    path: "diabetology",
    experience: "8 years",
    fees: "Free",
  },

  // 😁 Dentist
  {
    id: 47,
    name: "Dr. Komal Jha",
    specialty: "Dentist",
    path: "dentist",
    experience: "6 years",
    fees: "₹40",
  },
  {
    id: 48,
    name: "Dr. Rishabh Sharma",
    specialty: "Dentist",
    path: "dentist",
    experience: "8 years",
    fees: "Free",
  },
];

export default doctorsData;
