# Data Classification Matrix

Ontario data classification framework with security requirements for each classification level.

## Classification Levels

### Level 1: Public
**Definition**: Information intended for public disclosure

**Examples**:
- Published reports
- Marketing materials
- Public website content

**Security Requirements**:
- No special handling required
- Standard backup procedures
- Public accessibility allowed

### Level 2: Internal
**Definition**: Information for internal use only

**Examples**:
- Internal policies
- Employee directories
- Meeting minutes (non-sensitive)

**Security Requirements**:
- Access limited to employees
- Standard encryption for transmission
- Controlled sharing externally

### Level 3: Confidential
**Definition**: Sensitive information requiring protection

**Examples**:
- Employee personal information
- Financial records
- Vendor contracts

**Security Requirements**:
- Access on need-to-know basis
- Encryption at rest and in transit
- Multi-factor authentication
- Audit logging
- Non-disclosure agreements for external sharing

### Level 4: Restricted
**Definition**: Highly sensitive information with severe impact if disclosed

**Examples**:
- Social insurance numbers
- Health information
- Trade secrets
- Law enforcement data

**Security Requirements**:
- Strict access controls
- Strong encryption (AES-256)
- Enhanced monitoring
- Secure disposal required
- Privacy impact assessment
- Executive approval for access

## Classification Decision Tree

```
Does the information contain personal information?
├─ Yes: Is it sensitive personal information (health, financial, SIN)?
│   ├─ Yes: RESTRICTED
│   └─ No: CONFIDENTIAL
└─ No: Is unauthorized disclosure harmful to organization?
    ├─ Yes: CONFIDENTIAL or INTERNAL
    └─ No: INTERNAL or PUBLIC
```

## Handling Requirements by Classification

| Activity | Public | Internal | Confidential | Restricted |
|----------|--------|----------|--------------|------------|
| **Email** | Allowed | Allowed | Encrypt | Encrypt + MFA |
| **Printing** | Allowed | Allowed | Watermark | Prohibited or Watermark |
| **Storage** | Standard | Standard | Encrypted | Encrypted + Access Log |
| **Sharing** | Open | Internal only | NDA required | Executive approval |
| **Disposal** | Standard | Standard | Secure shred | Certified destruction |
| **Retention** | As needed | Per schedule | Per schedule | Per schedule + Audit |

---

**Version**: 1.0  
**Last Updated**: December 2025
