import React from "react";

const team = [
  { name: "Bright Asamoah", role: "Founder & CEO", image: null },
  { name: "Jane Mwansa", role: "Operations Manager", image: null },
  { name: "Chanda Phiri", role: "Customer Support Lead", image: null },
];

const AboutTeam = () => (
  <section className="py-10 bg-gray-50">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Meet Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {team.map((member, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
              {/* Placeholder for image */}
              <span className="text-2xl text-gray-500 font-bold">{member.name[0]}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutTeam;
