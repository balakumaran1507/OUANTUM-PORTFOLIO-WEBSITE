export const FOUNDING_DATE_ISO = '2026-05-24';
export const FOUNDING_DATE_LABEL = '24 May 2026';
export const UDYAM_NUMBER = 'UDYAM-TN-02-0479664';
export const MSME_CERTIFICATE_URL = '/documents/OUANTUM-MSME-Udyam-Registration.pdf';

export const LINKEDIN = {
  balakumaran: 'https://www.linkedin.com/in/balakumaran2005/',
  rahul: 'https://www.linkedin.com/in/rahul1172005/',
  guru: 'https://www.linkedin.com/in/guru-prasanth-5aa373294/',
  sabari: 'https://www.linkedin.com/in/sabari-raja-5a4464330/',
  raghu: 'https://www.linkedin.com/in/raghunandhan-t-aaa678356/',
};

const person = (name: string, jobTitle: string, url: string) => ({
  '@type': 'Person',
  name,
  jobTitle,
  url,
  sameAs: [url],
});

// Structured data only: founder and co-founder roles are deliberately not rendered as page text.
export const organizationPeopleSchema = {
  foundingDate: FOUNDING_DATE_ISO,
  identifier: { '@type': 'PropertyValue', propertyID: 'Udyam Registration Number', value: UDYAM_NUMBER },
  founder: [
    person('Balakumaran D', 'Founder and Director', LINKEDIN.balakumaran),
    person('Rahul', 'Co-Founder and Director', LINKEDIN.rahul),
    person('Sabari Raja', 'Co-Founder and Director', LINKEDIN.sabari),
  ],
  employee: [
    person('Guru Prasanth', 'Chief Technology Officer', LINKEDIN.guru),
    person('Raghu', 'Vice President', LINKEDIN.raghu),
  ],
};
