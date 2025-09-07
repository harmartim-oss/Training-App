/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { ODDILogo, QRCodeIcon, XCircleIcon } from '../icons';

interface User {
    fullname: string;
    organizationName: string;
}

interface Progress {
     assessment: { passed: boolean };
}

interface CertificateProps {
    user: User;
    progress: Progress;
}

const Certificate: React.FC<CertificateProps> = ({ user, progress }) => {
    
    if (!progress.assessment.passed) {
        return (
            <section className="animate-fade-in">
                <div className="max-w-4xl mx-auto bg-surface border border-border p-8 text-center">
                    <XCircleIcon className="w-16 h-16 text-red mx-auto mb-4" />
                    <h2 className="text-2xl font-bold font-mono text-text-primary mb-2 uppercase">Certificate Not Available</h2>
                    <p className="text-text-secondary">You must successfully pass the final assessment before a certificate can be issued.</p>
                </div>
            </section>
        );
    }
    
    const completionDate = new Date().toLocaleDateString('en-CA');
    const certificateId = `OCRP-${Date.now().toString(36).toUpperCase()}`;
    
    const handleShareLinkedIn = () => {
        const url = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=Ontario%20Certified%20Cyber%20Resilience%20Professional%20(OCRP)&organizationName=Ontario%20Digital%20Defence%20Institute&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${window.location.origin}/verify/${certificateId}`;
        window.open(url, '_blank');
    };

    const handleShareTwitter = () => {
        const text = `🎓 Proud to announce I've earned my Ontario Certified Cyber Resilience Professional (OCRP) designation from @ODDIInstitute! Ready to defend Ontario's digital landscape. #Cybersecurity #Privacy #OCRP`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const handleCopyLink = async () => {
        const shareUrl = `${window.location.origin}/verify/${certificateId}`;
        try {
            await navigator.clipboard.writeText(shareUrl);
            // Could add a toast notification here
            alert('Certificate verification link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    const handleDownloadPDF = () => {
        // This would integrate with a PDF generation service
        console.log('PDF download functionality would be implemented here');
        alert('PDF download feature coming soon!');
    };

    return (
        <section className="animate-fade-in">
            <div className="max-w-5xl mx-auto">
                 <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold font-mono text-text-primary uppercase">Congratulations!</h1>
                    <p className="text-text-secondary mt-2">You've earned your certificate. You can print or save it below.</p>
                </div>
                
                <div className="certificate-template professional-certificate p-8 mx-auto flex flex-col" style={{ maxWidth: "800px", minHeight: "565px" }}>
                    {/* Professional Header with Enhanced Styling */}
                    <div className="certificate-header flex justify-between items-start border-b-2 border-primary pb-6 mb-6">
                       <div className="text-left">
                           <h1 className="text-3xl font-bold font-mono text-primary tracking-wider mb-2">CERTIFICATE OF COMPLETION</h1>
                           <div className="border-l-4 border-primary pl-4">
                               <p className="text-text-primary font-mono font-semibold text-lg">Ontario Digital Defence Institute</p>
                               <p className="text-text-secondary font-mono text-sm">Cybersecurity Excellence Since 2024</p>
                           </div>
                       </div>
                       <div className="text-right">
                           <ODDILogo className="w-16 h-16 text-primary mb-2" />
                           <p className="text-xs text-text-secondary font-mono">Certificate ID: {certificateId}</p>
                       </div>
                    </div>

                    {/* Enhanced Main Content */}
                    <div className="certificate-content my-10 flex-grow text-center flex flex-col justify-center">
                       <div className="mb-8">
                           <p className="text-lg text-text-secondary mb-4 font-mono uppercase tracking-wider">This certifies that</p>
                           <div className="certificate-name-container">
                               <p className="text-5xl text-text-primary tracking-wide font-mono font-bold certificate-name">{user.fullname}</p>
                               <div className="certificate-name-underline"></div>
                           </div>
                       </div>
                       
                       <div className="mt-8">
                           <p className="text-lg text-text-secondary mb-4 font-mono uppercase tracking-wider">has successfully completed the requirements for the designation of</p>
                           <div className="designation-container">
                               <p className="text-3xl font-bold text-primary mt-4 font-mono tracking-wider certificate-designation">
                                   Ontario Certified Cyber Resilience Professional
                               </p>
                               <p className="text-2xl font-bold text-accent font-mono tracking-widest">(OCRP)</p>
                           </div>
                       </div>
                       
                       <div className="mt-8 certificate-skills">
                           <p className="text-sm text-text-secondary font-mono mb-2">Demonstrating expertise in:</p>
                           <div className="flex justify-center flex-wrap gap-2">
                               <span className="skill-tag">Privacy Law (PIPEDA/MFIPPA)</span>
                               <span className="skill-tag">Cybersecurity Frameworks</span>
                               <span className="skill-tag">AI Governance</span>
                               <span className="skill-tag">Data Management</span>
                           </div>
                       </div>
                    </div>
                    
                    {/* Enhanced Footer */}
                    <div className="certificate-footer flex justify-between items-end mt-auto border-t-2 border-primary pt-6 text-xs font-mono uppercase">
                        <div className="text-left">
                            <p className="text-text-secondary mb-1">Issuing Authority</p>
                            <p className="text-text-primary font-bold tracking-wider text-sm">Ontario Digital Defence Institute</p>
                            <p className="text-text-secondary text-xs mt-1">{user.organizationName}</p>
                        </div>
                        <div className="text-center">
                             <QRCodeIcon className="w-10 h-10 text-primary mx-auto mb-2" />
                             <p className="text-text-secondary">Verify at</p>
                             <p className="text-primary font-semibold">oddi.ca/verify/{certificateId}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-text-secondary mb-1">Date of Completion</p>
                           <p className="text-text-primary font-bold text-sm">{completionDate}</p>
                           <p className="text-text-secondary text-xs mt-1">Valid Indefinitely</p>
                        </div>
                    </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="certificate-actions text-center mt-8 no-print">
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        <button 
                            onClick={() => window.print()} 
                            className="btn-primary py-3 px-6 text-base flex items-center gap-2"
                        >
                            🖨️ Print Certificate
                        </button>
                        <button 
                            onClick={handleDownloadPDF}
                            className="btn-secondary py-3 px-6 text-base flex items-center gap-2"
                        >
                            📄 Download PDF
                        </button>
                        <button 
                            onClick={handleCopyLink}
                            className="btn-secondary py-3 px-6 text-base flex items-center gap-2"
                        >
                            🔗 Copy Verification Link
                        </button>
                    </div>
                    
                    <div className="social-sharing">
                        <p className="text-text-secondary text-sm mb-4">Share your achievement:</p>
                        <div className="flex justify-center gap-4">
                            <button 
                                onClick={handleShareLinkedIn}
                                className="social-share-btn linkedin-btn flex items-center gap-2 px-4 py-2 rounded-lg font-semibold"
                            >
                                💼 Add to LinkedIn
                            </button>
                            <button 
                                onClick={handleShareTwitter}
                                className="social-share-btn twitter-btn flex items-center gap-2 px-4 py-2 rounded-lg font-semibold"
                            >
                                🐦 Share on Twitter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certificate;