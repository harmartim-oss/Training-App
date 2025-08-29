/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { ODDILogo, QRCodeIcon } from '../icons';

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
                <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl shadow-sm p-8 text-center">
                    <i className="fas fa-exclamation-triangle text-red-500 text-5xl mb-4"></i>
                    <h2 className="text-2xl font-bold text-text-primary mb-2">Certificate Not Available</h2>
                    <p className="text-text-secondary">You must successfully pass the final assessment before a certificate can be issued.</p>
                </div>
            </section>
        );
    }
    
    const completionDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <section className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
                <div className="bg-card border border-border rounded-xl shadow-sm p-6 sm:p-8">
                     <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-text-primary">Congratulations!</h1>
                        <p className="text-text-secondary">You've earned your certificate. You can print or save it below.</p>
                    </div>
                    
                    <div className="certificate-template p-8 mx-auto flex flex-col" style={{ maxWidth: "800px" }}>
                        <div className="flex justify-between items-start">
                           <div className="text-left">
                               <h1 className="text-3xl font-bold text-gray-800">Certificate of Completion</h1>
                               <p className="text-gray-500">Ontario Digital Defence Institute</p>
                           </div>
                           <ODDILogo className="w-5 h-5" />
                        </div>

                        <div className="my-10 flex-grow text-center flex flex-col justify-center">
                           <p className="text-lg text-gray-600 mb-2">This certifies that</p>
                           <p className="text-4xl font-serif text-blue-800 tracking-wide">{user.fullname}</p>
                           <p className="text-lg text-gray-600 mt-8">has successfully completed the requirements for the designation of</p>
                           <p className="text-2xl font-semibold text-gray-800 mt-2">Ontario Certified Cyber Resilience Professional (OCRP)</p>
                        </div>
                        
                        <div className="flex justify-between items-end mt-auto">
                            <div className="text-left">
                                <QRCodeIcon className="w-5 h-5 text-gray-700" />
                                <p className="text-xs text-gray-400 mt-1">Verify at oddi.ca/verify</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-700 font-semibold border-b-2 border-gray-300 pb-1">Ontario Digital Defence Institute</p>
                                <p className="text-sm text-gray-500 mt-1">Issuing Authority</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-700 font-semibold border-b-2 border-gray-300 pb-1">{completionDate}</p>
                                <p className="text-sm text-gray-500 mt-1">Date of Completion</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-8 no-print">
                        <button onClick={() => window.print()} className="btn-primary py-3 px-8 text-base">
                            <i className="fas fa-print mr-2"></i>Print Certificate
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certificate;