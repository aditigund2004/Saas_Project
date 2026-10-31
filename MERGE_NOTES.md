# Merge Notes

- Base project: `url-features` (overall application shell, non-patient features, and styling retained).
- Integrated patient portal additions from `feature-Abhishek-changes`:
  - Health packages
  - Medication reminders and dose tracking
  - Family members and family health records
  - Patient clinic inquiries/queries
  - Expanded patient dashboard and profile features
  - Supporting patient demo data and utility components
- Added patient portal routes and navigation links.
- Resolved existing Git conflict-marker sections in the base source by retaining the base (`HEAD`) side.
- Dependencies were not bundled. Run `npm install` and then `npm run build` locally.
