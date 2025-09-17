/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';

export interface QuickHelp {
  id: string;
  title: string;
  content: string;
  category: 'concept' | 'example' | 'template' | 'reference' | 'troubleshooting';
  moduleId?: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedReadTime: number; // in minutes
  relatedTerms: string[];
  usageCount: number;
  lastUpdated: Date;
}

export interface QuickReference {
  id: string;
  term: string;
  definition: string;
  context: string;
  examples: string[];
  relatedTerms: string[];
  moduleId?: string;
}

interface JustInTimeLearningProps {
  isVisible: boolean;
  onClose: () => void;
  currentContext?: {
    moduleId?: string;
    section?: string;
    concept?: string;
  };
}

const JustInTimeLearning: React.FC<JustInTimeLearningProps> = ({
  isVisible,
  onClose,
  currentContext
}) => {
  const [activeTab, setActiveTab] = useState<'quick-help' | 'reference' | 'templates' | 'search'>('quick-help');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickHelp, setQuickHelp] = useState<QuickHelp[]>([]);
  const [quickReference, setQuickReference] = useState<QuickReference[]>([]);
  const [filteredContent, setFilteredContent] = useState<QuickHelp[]>([]);

  // Mock data - in real implementation, this would come from an API
  useEffect(() => {
    const mockQuickHelp: QuickHelp[] = [
      {
        id: 'help1',
        title: 'PIPEDA vs MFIPPA: Quick Comparison',
        content: `**PIPEDA** (Federal):
- Applies to private sector organizations
- Express/implied consent required
- Cross-border transfers allowed with safeguards
- Enforced by Privacy Commissioner of Canada

**MFIPPA** (Ontario Municipal):
- Applies to municipalities and local agencies
- Statutory authority for collection
- Canadian storage required (s.30.1)
- Enforced by IPC Ontario`,
        category: 'reference',
        moduleId: 'module1',
        tags: ['PIPEDA', 'MFIPPA', 'Comparison', 'Basics'],
        difficulty: 'beginner',
        estimatedReadTime: 2,
        relatedTerms: ['Privacy Law', 'Jurisdiction', 'Compliance'],
        usageCount: 156,
        lastUpdated: new Date('2025-01-15')
      },
      {
        id: 'help2',
        title: 'Privacy Breach Notification Template',
        content: `**Immediate Actions (First 24 Hours):**
1. Contain the breach
2. Assess the scope and impact
3. Document everything
4. Notify key stakeholders

**Notification Requirements:**
- IPC Ontario: If risk of significant harm
- Affected individuals: Clear, plain language
- Timeline: As soon as reasonably possible

**Template Elements:**
- What happened
- What information was involved
- What we're doing about it
- What you can do
- How to contact us`,
        category: 'template',
        moduleId: 'module1',
        tags: ['Breach', 'Notification', 'Template', 'Emergency'],
        difficulty: 'intermediate',
        estimatedReadTime: 3,
        relatedTerms: ['Incident Response', 'Crisis Management', 'Communication'],
        usageCount: 89,
        lastUpdated: new Date('2025-01-12')
      },
      {
        id: 'help3',
        title: 'AI Risk Assessment Quick Checklist',
        content: `**Pre-Implementation Questions:**
□ What decision does the AI system make?
□ Who is affected by these decisions?
□ What data does it use?
□ How transparent is the decision-making process?
□ What are the potential harms?

**Risk Levels:**
- **High Risk**: Impacts fundamental rights, employment, access to services
- **Medium Risk**: Automated decision-making with human oversight
- **Low Risk**: Limited impact, transparent processes

**Mitigation Strategies:**
- Human oversight requirements
- Regular algorithm audits
- Bias testing and correction
- Clear appeal processes`,
        category: 'concept',
        moduleId: 'module3',
        tags: ['AI', 'Risk Assessment', 'Governance', 'Checklist'],
        difficulty: 'advanced',
        estimatedReadTime: 4,
        relatedTerms: ['Artificial Intelligence', 'Algorithm', 'Ethics'],
        usageCount: 67,
        lastUpdated: new Date('2025-01-10')
      },
      {
        id: 'help4',
        title: 'Data Classification Made Simple',
        content: `**Classification Levels:**

**🔴 Confidential (Restricted)**
- Personal information, financial data
- Requires encryption, access controls
- Examples: SIN, health records, financial data

**🟡 Internal Use**
- Business information, internal policies
- Staff access only, no public disclosure
- Examples: HR policies, budget drafts

**🟢 Public**
- Information available to everyone
- No special protection required
- Examples: Published reports, contact info

**Quick Test:** Ask yourself:
- Who can see this?
- What's the impact if leaked?
- What protection does it need?`,
        category: 'concept',
        moduleId: 'module4',
        tags: ['Data Classification', 'Security', 'Information Management'],
        difficulty: 'beginner',
        estimatedReadTime: 2,
        relatedTerms: ['Data Protection', 'Information Security', 'Access Control'],
        usageCount: 134,
        lastUpdated: new Date('2025-01-14')
      },
      {
        id: 'help5',
        title: 'Incident Response Roles & Responsibilities',
        content: `**Incident Commander**
- Overall response coordination
- Communication with leadership
- Resource allocation decisions

**Technical Lead**
- System isolation and analysis
- Evidence preservation
- Recovery planning

**Communications Lead**
- Stakeholder notifications
- Media relations (if needed)
- Documentation coordination

**Legal/Privacy Officer**
- Regulatory requirements
- Breach notification decisions
- Risk assessment

**Quick Reference:**
- Small incidents: Technical Lead + Privacy Officer
- Major incidents: Full team activation
- Always document first, investigate second`,
        category: 'troubleshooting',
        moduleId: 'module2',
        tags: ['Incident Response', 'Roles', 'Organization', 'Crisis'],
        difficulty: 'intermediate',
        estimatedReadTime: 3,
        relatedTerms: ['Crisis Management', 'Team Coordination', 'Emergency Response'],
        usageCount: 78,
        lastUpdated: new Date('2025-01-13')
      }
    ];

    const mockReference: QuickReference[] = [
      {
        id: 'ref1',
        term: 'Personal Information',
        definition: 'Information about an identifiable individual, including name, address, phone number, email, financial information, and any other information that can identify a person.',
        context: 'Used in privacy legislation to define what information requires protection.',
        examples: [
          'Full name and address',
          'Email address and phone number',
          'Employee ID number',
          'Photos that show faces',
          'IP addresses in some contexts'
        ],
        relatedTerms: ['Privacy', 'PIPEDA', 'MFIPPA', 'Data Protection'],
        moduleId: 'module1'
      },
      {
        id: 'ref2',
        term: 'Circle of Care',
        definition: 'The healthcare providers involved in providing care to a specific patient, who may share personal health information without explicit consent for treatment purposes.',
        context: 'Specific to PHIPA (health information) in Ontario.',
        examples: [
          'Doctor sharing patient info with nurse',
          'Hospital sharing records with specialist',
          'Pharmacy accessing prescription history'
        ],
        relatedTerms: ['PHIPA', 'Health Information', 'Consent', 'Treatment'],
        moduleId: 'module1'
      },
      {
        id: 'ref3',
        term: 'Algorithm',
        definition: 'A set of rules or instructions given to a computer or AI system to help it learn how to make decisions or solve problems.',
        context: 'Central to AI governance and understanding automated decision-making.',
        examples: [
          'Credit scoring systems',
          'Resume screening tools',
          'Recommendation engines',
          'Fraud detection systems'
        ],
        relatedTerms: ['Artificial Intelligence', 'Machine Learning', 'Automation', 'Decision Making'],
        moduleId: 'module3'
      }
    ];

    setQuickHelp(mockQuickHelp);
    setQuickReference(mockReference);
    setFilteredContent(mockQuickHelp);
  }, []);

  // Filter content based on current context and search query
  useEffect(() => {
    let filtered = quickHelp;

    // Filter by current module if available
    if (currentContext?.moduleId) {
      filtered = filtered.filter(help => 
        help.moduleId === currentContext.moduleId || 
        help.tags.some(tag => tag.toLowerCase().includes(currentContext.moduleId?.toLowerCase() || ''))
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(help =>
        help.title.toLowerCase().includes(query) ||
        help.content.toLowerCase().includes(query) ||
        help.tags.some(tag => tag.toLowerCase().includes(query)) ||
        help.relatedTerms.some(term => term.toLowerCase().includes(query))
      );
    }

    setFilteredContent(filtered);
  }, [quickHelp, searchQuery, currentContext]);

  const getCategoryIcon = (category: QuickHelp['category']) => {
    switch (category) {
      case 'concept': return '💡';
      case 'example': return '📝';
      case 'template': return '📋';
      case 'reference': return '📚';
      case 'troubleshooting': return '🔧';
      default: return '❓';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-white p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">⚡ Just-in-Time Learning</h2>
            <p className="text-primary-light text-sm">Quick help when you need it most</p>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-primary-light text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Context Banner */}
        {currentContext && (
          <div className="bg-blue-50 border-b border-blue-200 p-3">
            <div className="flex items-center gap-2 text-sm text-blue-800">
              <span>🎯</span>
              <span>
                {currentContext.moduleId && `Module: ${currentContext.moduleId.replace('module', 'Module ')}`}
                {currentContext.section && ` • Section: ${currentContext.section}`}
                {currentContext.concept && ` • Concept: ${currentContext.concept}`}
              </span>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-border bg-background">
          {[
            { id: 'quick-help', label: 'Quick Help', icon: '🚀' },
            { id: 'reference', label: 'Reference', icon: '📖' },
            { id: 'templates', label: 'Templates', icon: '📄' },
            { id: 'search', label: 'Search', icon: '🔍' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'search' && (
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for concepts, examples, templates..."
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="absolute left-3 top-3 text-text-muted">🔍</span>
              </div>
            </div>
          )}

          {(activeTab === 'quick-help' || activeTab === 'search') && (
            <div className="space-y-4">
              {filteredContent.map((help) => (
                <div key={help.id} className="bg-background border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getCategoryIcon(help.category)}</span>
                      <h3 className="text-lg font-semibold text-text-primary">{help.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(help.difficulty)}`}>
                        {help.difficulty}
                      </span>
                      <span className="text-xs text-text-muted">⏱️ {help.estimatedReadTime}min</span>
                    </div>
                  </div>
                  
                  <div className="prose prose-sm max-w-none text-text-primary mb-4">
                    <div dangerouslySetInnerHTML={{ __html: help.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {help.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>Used {help.usageCount} times</span>
                    <span>Updated {help.lastUpdated.toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reference' && (
            <div className="space-y-4">
              {quickReference.map((ref) => (
                <div key={ref.id} className="bg-background border border-border rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{ref.term}</h3>
                  <p className="text-text-secondary mb-3">{ref.definition}</p>
                  
                  <div className="mb-3">
                    <h4 className="font-medium text-text-primary mb-2">Context:</h4>
                    <p className="text-sm text-text-secondary">{ref.context}</p>
                  </div>
                  
                  <div className="mb-3">
                    <h4 className="font-medium text-text-primary mb-2">Examples:</h4>
                    <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                      {ref.examples.map((example, index) => (
                        <li key={index}>{example}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {ref.relatedTerms.map((term) => (
                      <span key={term} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-4">
              {filteredContent.filter(help => help.category === 'template').map((template) => (
                <div key={template.id} className="bg-background border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">📋</span>
                      <h3 className="text-lg font-semibold text-text-primary">{template.title}</h3>
                    </div>
                    <button className="btn-primary text-sm">
                      Copy Template
                    </button>
                  </div>
                  
                  <div className="prose prose-sm max-w-none text-text-primary mb-4">
                    <div dangerouslySetInnerHTML={{ __html: template.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredContent.length === 0 && (
            <div className="text-center py-8">
              <span className="text-4xl mb-4 block">🔍</span>
              <h3 className="text-lg font-semibold text-text-primary mb-2">No content found</h3>
              <p className="text-text-secondary">Try adjusting your search terms or browse different categories.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-background border-t border-border p-4">
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <div className="flex items-center gap-4">
              <span>💡 Tip: Use keywords from the current lesson</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Need more help?</span>
              <button className="text-primary hover:underline">Contact Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JustInTimeLearning;