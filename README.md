# Tenantix

## Links
[Live site link](https://tenantix.web.app/)

[Server side repo link](https://github.com/Yamin39/tenantix-server)

## Overview

- **Project Concept**: Tenantix is a property management platform designed for landlords and tenants to manage rental properties, payments, and communications seamlessly.
- **Problem Solved**: This project streamlines the management of rental properties, providing a central platform for communication, payment processing, and property management tasks.
- **Technologies Used**: HTML, CSS, JavaScript, ReactJS, Firebase, Tailwind CSS, Daisy UI.
- **Best Features**:
  - Admins can control the agreements in the dashboard.
  - Secure online rent payment processing.
  - Admins can add, delete, and update the coupons.
 
## Admin Credentials
Admin email: admin@tenantix.com <br />
Admin pass: 123456Aa

## Setup Process

To run the project locally, follow these steps:

1. **Clone the repository**:
```bash
git clone https://github.com/Yamin39/tenantix-client.git
```

2. **Navigate to the project directory**:
```bash
cd tenantix-client
```

3. **Install dependencies**:
```bash
npm install
```

4. **Add important credentials**: Create a .env.local file and add your Firebase credentials and Stripe publish key.
```javascript
VITE_APIKEY=yourAPIKEY
VITE_AUTHDOMAIN=yourAUTHDOMAIN
VITE_PROJECTID=yourPROJECTID
VITE_STORAGEBUCKET=yourSTORAGEBUCKET
VITE_MESSAGINGSENDERID=yourMESSAGINGSENDERID
VITE_APPID=yourAPPID
VITE_PAYMENT_GATEWAY_PK=yourStripePublishKey
```

5. **Run the project**:
```bash
npm run dev
```
