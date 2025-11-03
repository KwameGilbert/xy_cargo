import React from "react";

const team = [
  // { name: "Bright Asamoah", role: "Founder & CEO", image: null },
  // { name: "Jane Mwansa", role: "Operations Manager", image: null },
  { name: "Brenda Sililo", role: "Customer Support Lead", image: '/images/team_images/customer.jpg' },
  { name: "Precious Ambilikile", role: "Human Resource Manager", image: '/images/team_images/precious.jpg' },
  { name: "Memory Muwowo", role: "Administrator", image: '/images/team_images/administrator.jpg' },
  { name: "Titus Tembo", role: "Operations Manager", image: '/images/team_images/titus.jpg' },
  { name: "Zita Haankombo", role: "Marketing Manager", image: '/images/team_images/marketing.jpg' },
];

const AboutTeam = () => (
  <section className="py-10 bg-gray-50">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Meet Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {team.map((member, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <div className="w-28 h-28 bg-gray-200 rounded-full mb-4 flex items-center justify-center overflow-hidden">
              {member.image ? (
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl text-gray-500 font-bold">{member.name[0]}</span>
              )}
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