# TODO: Add prefers-reduced-motion support to all animations in style.css

## Overview
Add `@media (prefers-reduced-motion: reduce)` blocks to disable animations for users who prefer reduced motion. This ensures accessibility without impacting existing functionality.

## Completed Tasks
- [x] Change mobile menu to left-sliding drawer (full-screen, no blur/border-radius/box-shadow) to match Sid Thailand style

## Steps
- [x] Add prefers-reduced-motion for dropdownFadeIn (dropdown-menu)
- [x] Add prefers-reduced-motion for fadeInUp in customer-approach section
- [x] Add prefers-reduced-motion for scroll-left in scrolling-text
- [x] Add prefers-reduced-motion for fadeInDown in filter-box
- [x] Add prefers-reduced-motion for fadeInUp in property-card
- [x] Add prefers-reduced-motion for fadeIn in contact-section
- [ ] Add prefers-reduced-motion for slideUp in contact-form
- [ ] Add prefers-reduced-motion for fadeDown in career-section
- [ ] Add prefers-reduced-motion for slideInLeft in career-form
- [ ] Add prefers-reduced-motion for slideInRight in job-card
- [ ] Add prefers-reduced-motion for fadeInUp in leadership-section (.animated class)
- [ ] Verify all changes and ensure no impact on existing code
