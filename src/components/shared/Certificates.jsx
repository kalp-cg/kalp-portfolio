import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const Certificates = ({ isResumePage = false }) => {
  const { theme } = useTheme();
  
  const certificates = [
    // HackerRank Certificates
    {
      id: 1,
      title: 'CSS (Basic)',
      type: 'SKILL',
      platform: 'HackerRank',
      bgColor: 'bg-green-500',
      foldedColor: 'bg-green-400',
      iframeUrl: 'https://www.hackerrank.com/certificates/iframe/f0898450a5b6'
    },
    {
      id: 2,
      title: 'Frontend Developer (React)',
      type: 'ROLE',
      platform: 'HackerRank',
      bgColor: 'bg-blue-600',
      foldedColor: 'bg-blue-500',
      iframeUrl: 'https://www.hackerrank.com/certificates/iframe/c1c9bb699c19'
    },
    {
      id: 3,
      title: 'JavaScript (Basic)',
      type: 'SKILL',
      platform: 'HackerRank',
      bgColor: 'bg-green-500',
      foldedColor: 'bg-green-400',
      iframeUrl: 'https://www.hackerrank.com/certificates/iframe/b47073695de5'
    },
    {
      id: 4,
      title: 'JavaScript (Intermediate)',
      type: 'SKILL',
      platform: 'HackerRank',
      bgColor: 'bg-green-500',
      foldedColor: 'bg-green-400',
      iframeUrl: 'https://www.hackerrank.com/certificates/iframe/8dc4425e4d5b'
    },
    {
      id: 5,
      title: 'React (Basic)',
      type: 'SKILL',
      platform: 'HackerRank',
      bgColor: 'bg-green-500',
      foldedColor: 'bg-green-400',
      iframeUrl: 'https://www.hackerrank.com/certificates/iframe/8d26b57bbbc7'
    },
    {
      id: 6,
      title: 'Node.js (Intermediate)',
      type: 'SKILL',
      platform: 'HackerRank',
      bgColor: 'bg-green-500',
      foldedColor: 'bg-green-400',
      iframeUrl: 'https://www.hackerrank.com/certificates/iframe/d1c2c42375e2'
    },
    {
      id: 7,
      title: 'Rest API (Intermediate)',
      type: 'SKILL',
      platform: 'HackerRank',
      bgColor: 'bg-green-500',
      foldedColor: 'bg-green-400',
      iframeUrl: 'https://www.hackerrank.com/certificates/iframe/500f58747a73'
    },
    // Simpli Learn Certificates
    {
      id: 8,
      title: 'Azure Fundamentals',
      type: 'CLOUD',
      platform: 'Simpli Learn',
      bgColor: 'bg-purple-600',
      foldedColor: 'bg-purple-500',
      iframeUrl: 'https://simpli-web.app.link/e/RtEUVFxjxVb'
    },
    {
      id: 9,
      title: 'Introduction to Azure Services',
      type: 'CLOUD',
      platform: 'Simpli Learn',
      bgColor: 'bg-purple-600',
      foldedColor: 'bg-purple-500',
      iframeUrl: 'https://simpli-web.app.link/e/XH83InKjxVb'
    },
    {
      id: 10,
      title: 'GitHub Copilot Fundamentals',
      type: 'AI/TOOL',
      platform: 'Simpli Learn',
      bgColor: 'bg-purple-600',
      foldedColor: 'bg-purple-500',
      iframeUrl: 'https://simpli-web.app.link/e/1yHAesLjxVb'
    },
    {
      id: 11,
      title: 'Gateway Load Balancer',
      type: 'CLOUD',
      platform: 'Simpli Learn',
      bgColor: 'bg-purple-600',
      foldedColor: 'bg-purple-500',
      iframeUrl: 'https://simpli-web.app.link/e/RGGfPcSjxVb'
    },
    // Forage Certificates
    {
      id: 12,
      title: 'Forage Certificate 1',
      type: 'PROJECT',
      platform: 'Forage',
      bgColor: 'bg-orange-500',
      foldedColor: 'bg-orange-400',
      iframeUrl: 'https://res.cloudinary.com/dhyds3low/image/upload/v1754280999/gMTdCXwDdLYoXZ3wG_ifobHAoMjQs9s6bKS_8dK7zfpKsmBnMpAyL_1751459226433_completion_certificate_page-0001_nyahfe.jpg'
    },
    {
      id: 13,
      title: 'Forage Certificate 2',
      type: 'PROJECT',
      platform: 'Forage',
      bgColor: 'bg-orange-500',
      foldedColor: 'bg-orange-400',
      iframeUrl: 'https://res.cloudinary.com/dhyds3low/image/upload/v1754280998/gmf3ypEXBj2wvfQWC_ifobHAoMjQs9s6bKS_8dK7zfpKsmBnMpAyL_1751175474093_completion_certificate_page-0001_yprk1p.jpg'
    }
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Certificate card with folded paper design
  const CertificateCard = ({ cert }) => (
    <motion.div 
      variants={itemVariants}
      className="relative group cursor-pointer"
      onClick={() => {
        if (cert.iframeUrl) {
          window.open(cert.iframeUrl, '_blank');
        }
      }}
    >
      <div className={`relative ${cert.bgColor} rounded-lg p-6 shadow-lg transform transition-transform duration-300 group-hover:scale-105`}>
        {/* Folded corner effect */}
        <div className={`absolute top-0 right-0 w-8 h-8 ${cert.foldedColor} rounded-bl-lg`}></div>
        
        {/* Trophy icon */}
        <div className="flex justify-center mb-4">
          <FaCertificate className="text-white text-3xl" />
        </div>
        
        {/* Certificate title */}
        <h3 className="text-white text-lg font-bold text-center mb-2">
          {cert.title}
        </h3>
        
        {/* Verified text */}
        <p className="text-white text-sm text-center mb-4">
          Verified
        </p>
        
        {/* Type tag */}
        <div className={`absolute bottom-3 right-3 px-2 py-1 rounded text-xs font-medium text-white ${cert.bgColor}`}>
          {cert.type}
        </div>
      </div>
    </motion.div>
  );

  // About page style timeline item
  const CompactTimelineItem = ({ cert }) => (
    <motion.div 
      variants={itemVariants}
      className={`relative pl-10 pb-6 border-l-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} last:border-0`}
    >
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
        <FaCertificate className="text-xs text-white" />
      </div>
      
      <span className="inline-block px-4 py-1 mb-3 text-xs rounded-full bg-primary/10 text-primary font-medium">
        {cert.period}
      </span>
      
      <h4 className={`text-lg font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        {cert.title} - <span className="text-primary">{cert.issuer}</span>
      </h4>
      
      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        {cert.description}
      </p>
      
      {cert.iframeUrl && (
        <div className="mt-4">
          <iframe
            src={cert.iframeUrl}
            title={`${cert.title} Certificate`}
            className="w-full h-48 border-0 rounded-lg"
            allowFullScreen
          />
        </div>
      )}
    </motion.div>
  );

  // For Resume page
  if (isResumePage) {
    // Group certificates by platform
    const groupedCertificates = certificates.reduce((acc, cert) => {
      if (!acc[cert.platform]) {
        acc[cert.platform] = [];
      }
      acc[cert.platform].push(cert);
      return acc;
    }, {});

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { 
              duration: 0.6,
              when: "beforeChildren",
              staggerChildren: 0.1
            }
          }
        }}
      >
        <motion.h2 
          variants={itemVariants} 
          className={`text-2xl font-bold mb-8 flex items-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
        >
          <FaCertificate className="text-primary" />
          Certifications
        </motion.h2>
        
        <div className="space-y-12">
          {Object.entries(groupedCertificates).map(([platform, certs]) => (
            <motion.div key={platform} variants={itemVariants}>
              <h3 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                {platform} Certificates
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {certs.map(cert => (
                  <CertificateCard key={cert.id} cert={cert} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // For About page
  // Group certificates by platform
  const groupedCertificates = certificates.reduce((acc, cert) => {
    if (!acc[cert.platform]) {
      acc[cert.platform] = [];
    }
    acc[cert.platform].push(cert);
    return acc;
  }, {});

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { 
            duration: 0.6,
            when: "beforeChildren",
            staggerChildren: 0.1
          }
        }
      }}
    >
      <h3 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        Certifications
      </h3>
      
      <div className="space-y-8">
        {Object.entries(groupedCertificates).map(([platform, certs]) => (
          <motion.div key={platform} variants={itemVariants}>
            <h4 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              {platform} Certificates
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certs.map((cert) => (
                <CertificateCard key={cert.id} cert={cert} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Certificates; 