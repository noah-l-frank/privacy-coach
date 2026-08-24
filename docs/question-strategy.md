# Question Strategy

The follow-up question system is designed to personalize recommendations in a simple and user-friendly way.

## Goal

The goal of the question system is to collect the additional information needed after the local scan to generate meaningful privacy recommendations.

The scan provides technical browser signals, while the follow-up questions provide missing context that cannot be determined from the scan alone.

The final recommendations are derived from both the scan results and the user's answers.

---

## Core Approach

The system uses a **dynamic, step-by-step question flow** instead of showing all questions at once.

This means:

- only one question is shown at a time
- closely related yes/no habits can be grouped into one compact question block
- each answer influences which question comes next
- unnecessary questions are skipped automatically

This approach reduces cognitive load and creates a more natural interaction.

---

## General Principles

- Ask only relevant questions based on detected signals and previous answers
- Keep the number of questions limited and dependent on the scan result and previous answers
- Avoid technical terminology
- Focus on user preferences rather than technical details
- Prioritize clarity and ease of understanding

---

## Question Flow Strategy

The question flow is implemented in the question engine rather than described as a fixed questionnaire in this document.

The engine selects the next question dynamically based on the scan result and the answers already given by the user.

The exact question order and conditions are defined in `src/services/questions/questionFlow.ts`.

The privacy preference question includes a separate `maximum_privacy` option. Cookie guidance is reserved for that strongest preference because stricter cookie blocking can create more compatibility tradeoffs than other recommendations.

The password manager, VPN, and ad blocker prompts are grouped into one `security_tools` block with one yes/no toggle per habit. Each toggle defaults to `no`, and submitting the block writes the existing answer keys used by recommendation rules:

- `password_management`
- `vpn_usage`
- `adblock_usage`

### Question Roles

Not every follow-up question directly affects recommendation rules.

The current question flow includes two roles:

- recommendation-driving questions: used by recommendation rules to generate actionable suggestions
- context-only questions: used to improve contextual feedback in the results view

For example, `search_engine` is currently a context-only question. It contributes to positive findings feedback but does not directly trigger recommendation rules.

## Design Rationale

This approach was chosen because:

- most users are not privacy experts
- long forms reduce completion rates
- step-by-step interaction feels simpler and more engaging

By minimizing complexity while maintaining relevance, the system balances usability and personalization.

---

## Current Scope

The current implementation focuses on a limited set of high-impact scan signals and follow-up questions due to the time constraints of the project.

The question system was designed as a modular rule-based structure, so the flow can be adapted, extended, or refined without changing the overall architecture.

Additional questions and branching conditions can be added by extending the question engine and the related question content files.
