import { Property } from "./propertyStore";
import { formatCurrencyINR } from "./units";

export function exportPropertyPresentation(property: Property) {
  // Generate a formatted presentation text / HTML deck downloadable as PPT or presentation
  const title = property.title;
  const content = `
================================================================================
                    PROPSYNC PROPERTY INVESTMENT MEMORANDUM
                      Properties · People · Progress
================================================================================

PROPERTY TITLE:
  ${title}

STATUS:
  ${property.status.toUpperCase()}

LOCATION & ADDRESS:
  ${property.location}
  Locality: ${property.locality} | District: ${property.district} | PIN: ${property.pinCode}
  GPS Coordinates: ${property.coordinates.lat}° N, ${property.coordinates.lng}° E

KEY COMMERCIALS:
  Total Super Built-up Area: ${property.areaSqft.toLocaleString()} sq ft (${property.areaSqyd.toLocaleString()} sq yd)
  Rent / Price: ₹${property.rentPerSqft} / sq ft / month
  Total Monthly Outflow: ${formatCurrencyINR(property.rentPerSqft * property.areaSqft)} / month
  Security Deposit: ${property.securityDeposit}
  Maintenance Charges: ₹${property.maintenance} / sq ft / month
  Lease Term: ${property.leaseTerm}
  Lock-in Period: ${property.lockInPeriod}
  Land Use Classification: ${property.landUse}

BUILDING SPECIFICATIONS:
  Building Name: ${property.buildingName}
  Building Age / Stage: ${property.buildingAge}
  Total Storeys: ${property.totalFloors} floors
  Listed By: ${property.listedBy}

KEY HIGHLIGHTS:
${property.highlights.map((h) => `  * ${h}`).join("\n")}

FLOOR BREAKDOWN:
${property.floors.map((f) => `  - ${f.floor}: Carpet ${f.carpetAreaSqft.toLocaleString()} sq ft | Built-up ${f.builtUpAreaSqft.toLocaleString()} sq ft | ₹${f.rentPerSqft}/sqft | ${f.availability} | Facilities: ${f.facilities}`).join("\n")}

AMENITIES & INFRASTRUCTURE:
${property.amenities.map((a) => `  [✓] ${a}`).join("   ")}

STATUTORY COMPLIANCE & LEGAL CLEARANCES:
${property.complianceDocs.map((c) => `  - ${c.name} (${c.type}): ${c.status.toUpperCase()}${c.validUntil ? ` (Valid Until: ${c.validUntil})` : ""}${c.docNumber ? ` [Ref: ${c.docNumber}]` : ""} - ${c.remarks}`).join("\n")}

POINT OF CONTACT:
${property.contacts.map((contact) => `  - ${contact.name} (${contact.role}): ${contact.phone}${contact.email ? ` | ${contact.email}` : ""}`).join("\n")}

--------------------------------------------------------------------------------
CONFIDENTIAL — Generated via PropSync Real Estate Management System
Digitally timestamped: ${new Date().toLocaleString()}
--------------------------------------------------------------------------------
`;

  // Create downloadable file
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `PropSync_${property.title.replace(/[^a-zA-Z0-9]/g, "_")}_Presentation.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
