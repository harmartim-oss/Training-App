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

    return (
        <section className="animate-fade-in">
            <div className="max-w-5xl mx-auto">
                 <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold font-mono text-text-primary uppercase">Congratulations!</h1>
                    <p className="text-text-secondary mt-2">You've earned your certificate. You can print or save it below.</p>
                </div>
                
                <div className="certificate-template p-8 mx-auto flex flex-col" style={{ maxWidth: "800px", minHeight: "565px" }}>
                    <div className="flex justify-between items-start border-b border-border pb-4">
                       <div className="text-left">
                           <h1 className="text-3xl font-bold font-mono text-primary tracking-wider">CERTIFICATE OF COMPLETION</h1>
                           <p className="text-text-secondary font-mono">Ontario Digital Defence Institute</p>
                       </div>
                       <ODDILogo className="w-10 h-10 text-primary" />
                    </div>

                    <div className="my-10 flex-grow text-center flex flex-col justify-center">
                       <p className="text-lg text-text-secondary mb-2 font-mono uppercase">This certifies that</p>
                       <p className="text-4xl text-text-primary tracking-wide font-mono">{user.fullname}</p>
                       <p className="text-lg text-text-secondary mt-8 font-mono uppercase">has successfully completed the requirements for the designation of</p>
                       <p className="text-2xl font-semibold text-primary mt-2 font-mono tracking-wider">Ontario Certified Cyber Resilience Professional (OCRP)</p>
                    </div>
                    
                    <div className="flex justify-between items-end mt-auto border-t border-border pt-4 text-xs font-mono uppercase">
                        <div className="text-left">
                            <p className="text-text-secondary">Issuing Authority</p>
                            <p className="text-text-primary font-semibold tracking-wider">Ontario Digital Defence Institute</p>
                        </div>
                        <div className="text-center">
                             <QRCodeIcon className="w-8 h-8 text-text-primary mx-auto" />
                             <p className="text-text-secondary mt-1">Verify at oddi.ca/verify</p>
                        </div>
                        <div className="text-right">
                           <p className="text-text-secondary">Date of Completion</p>
                           <p className="text-text-primary font-semibold">{completionDate}</p>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-8 no-print">
                    <button onClick={() => window.print()} className="btn-primary py-3 px-8 text-base">
                        Print Certificate
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Certificate;