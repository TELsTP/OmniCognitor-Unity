import React from 'react';
import { motion } from 'motion/react';
import { Shield, CheckCircle2, Award, User, Cpu, Calendar, Hash } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CoAccreditationCertificateProps {
  certificateId?: string;
  accreditationLevel?: number;
  clinicalDomain?: string;
  aiConfidenceScore?: number;
  issuedDate?: string;
  architectHandshake?: string;
  doctorValidation?: 'Pending' | 'Verified' | 'Overridden';
  sessionId?: string;
  className?: string;
}

export const CoAccreditationCertificate: React.FC<CoAccreditationCertificateProps> = ({
  certificateId = "CERT-MNGJVG8B-S7OR",
  accreditationLevel = 3,
  clinicalDomain = "Clinical Decision Support",
  aiConfidenceScore = 96,
  issuedDate = "2026-04-01",
  architectHandshake = "Nakamitshe-Telstp-235153",
  doctorValidation = "Pending",
  sessionId = "assist-1775078418407-58ud9h8oqs2",
  className
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "relative w-full max-w-4xl aspect-[1.414/1] bg-[#0A0E1A] border-2 border-[#D4AF37]/30 rounded-lg p-12 overflow-hidden shadow-2xl",
        className
      )}
      id="co-accreditation-certificate"
    >
      {/* Decorative Border */}
      <div className="absolute inset-4 border border-[#D4AF37]/20 rounded-sm pointer-events-none" />
      <div className="absolute inset-6 border-2 border-emerald-500/20 rounded-sm pointer-events-none" />
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-blue-500/5 to-transparent blur-3xl" />

      {/* Header */}
      <div className="relative z-10 text-center space-y-2 mb-12">
        <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.4em]">TELsTP — Telemedicine & Life-Science Technology Platform</p>
        <h1 className="text-5xl font-black text-white tracking-tight">Co-Accreditation Certificate</h1>
        <p className="text-blue-200/40 text-xs font-bold uppercase tracking-widest">AI-Human Collaborative Clinical Decision Support</p>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-y-12 gap-x-16">
        {/* Left Column */}
        <div className="space-y-8">
          <div className="space-y-1">
            <p className="text-blue-200/30 text-[10px] font-black uppercase tracking-widest">Certificate ID</p>
            <p className="text-white font-mono text-lg tracking-wider">{certificateId}</p>
          </div>

          <div className="space-y-1">
            <p className="text-blue-200/30 text-[10px] font-black uppercase tracking-widest">Clinical Domain</p>
            <p className="text-white font-bold text-lg">{clinicalDomain}</p>
          </div>

          <div className="space-y-1">
            <p className="text-blue-200/30 text-[10px] font-black uppercase tracking-widest">Egyptian MOH Guidelines</p>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <p className="text-emerald-400 font-black text-sm uppercase italic">Included</p>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-blue-200/30 text-[10px] font-black uppercase tracking-widest">Session ID</p>
            <p className="text-blue-200/60 font-mono text-[10px]">{sessionId}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="space-y-1">
            <p className="text-blue-200/30 text-[10px] font-black uppercase tracking-widest">Accreditation Level</p>
            <p className="text-emerald-400 font-black text-2xl">Level {accreditationLevel}</p>
          </div>

          <div className="space-y-1">
            <p className="text-blue-200/30 text-[10px] font-black uppercase tracking-widest">AI Confidence Score</p>
            <div className="flex items-center gap-4">
              <p className="text-blue-400 font-black text-3xl">{aiConfidenceScore}%</p>
              <div className="flex-1 h-2 bg-blue-900/30 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${aiConfidenceScore}%` }}
                  className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-blue-200/30 text-[10px] font-black uppercase tracking-widest">Doctor Validation</p>
            <p className="text-white font-bold text-lg">{doctorValidation} Doctor Review</p>
          </div>

          <div className="space-y-1">
            <p className="text-blue-200/30 text-[10px] font-black uppercase tracking-widest">Issued</p>
            <p className="text-white font-bold">{issuedDate}</p>
          </div>
        </div>
      </div>

      {/* Footer Handshake */}
      <div className="absolute bottom-16 left-0 w-full text-center">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10">
          <Shield className="w-3 h-3 text-emerald-400" />
          <p className="text-[10px] font-black text-emerald-400/80 uppercase tracking-[0.2em]">
            Architect Handshake: <span className="text-white">{architectHandshake}</span> — Verified
          </p>
        </div>
      </div>

      {/* Legal Footer */}
      <div className="absolute bottom-8 left-12 right-12 flex justify-between items-end opacity-30">
        <p className="text-[8px] text-blue-200/60 max-w-md leading-tight">
          This certificate validates AI-human co-accredited clinical decision support. Not a medical license or diagnosis.
          HIPAA-compliant • Egyptian Data Protection Law 151/2020 • TELsTP Non-Profit Initiative
        </p>
        <div className="flex gap-4">
          <Award className="w-4 h-4 text-[#D4AF37]" />
          <Cpu className="w-4 h-4 text-blue-400" />
        </div>
      </div>

      {/* Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
        <Shield className="w-[500px] h-[500px] text-white" />
      </div>
    </motion.div>
  );
};
