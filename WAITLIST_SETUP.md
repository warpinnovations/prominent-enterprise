# Waitlist Integration Setup Guide

## Overview
The waitlist form now saves entries to Google Sheets and sends confirmation emails via Resend.

## Required Environment Variables

Add these to your `.env.local` file:

```env
# Resend Email API
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Google Sheets API
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id

# Site URL (for email links)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Setup Instructions

### 1. Resend Email Setup

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Verify your domain or use the default `onboarding@resend.dev` for testing
4. Add `RESEND_API_KEY` and `RESEND_FROM_EMAIL` to your `.env.local`

### 2. Google Sheets Setup

#### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "The Prominent Waitlist" (or any name you prefer)
4. Add column headers in Row 1:
   - Column A: `Timestamp`
   - Column B: `Name`
   - Column C: `Email`
   - Column D: `Company`
   - Column E: `Mobile`
5. Copy the Sheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
   - The `SHEET_ID` is the long string between `/d/` and `/edit`

#### Step 2: Create a Service Account
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select an existing one)
3. Enable the Google Sheets API:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create a Service Account:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Fill in the service account details
   - Click "Create and Continue"
   - Skip optional steps and click "Done"
5. Create a Key:
   - Click on the newly created service account
   - Go to the "Keys" tab
   - Click "Add Key" → "Create New Key"
   - Choose "JSON" format
   - Download the JSON file

#### Step 3: Share Sheet with Service Account
1. Open your Google Sheet
2. Click "Share" button
3. Add the service account email (from the JSON file, looks like: `xxx@xxx.iam.gserviceaccount.com`)
4. Give it "Editor" permissions
5. Uncheck "Notify people" and click "Share"

#### Step 4: Add Credentials to .env.local
From the downloaded JSON file:
- Copy `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- Copy `private_key` → `GOOGLE_PRIVATE_KEY` (keep the quotes and line breaks as `\n`)
- Add your `SHEET_ID` → `GOOGLE_SHEET_ID`

Example:
```env
GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service@project-123456.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...your key...xyz\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID="1aBcD2eFgH3iJkL4mNoPqRsTuVwXyZ"
```

### 3. Testing

1. Start your development server: `npm run dev` or `yarn dev`
2. Navigate to `/waitlist`
3. Fill out the form and submit
4. Check:
   - Google Sheet for new entry
   - Email inbox for confirmation email
   - Browser console for any errors

## Troubleshooting

### Google Sheets Errors
- **403 Forbidden**: Make sure you shared the sheet with the service account email
- **404 Not Found**: Check your `GOOGLE_SHEET_ID` is correct
- **401 Unauthorized**: Verify your credentials are correct in `.env.local`

### Email Errors
- **API Key Invalid**: Check your Resend API key
- **Email Not Sent**: Verify your domain or use `onboarding@resend.dev` for testing
- **From Email**: Make sure the from email matches your verified domain in Resend

### Environment Variables
- Make sure `.env.local` is in your project root
- Restart your dev server after adding environment variables
- Don't commit `.env.local` to git (it should be in `.gitignore`)

## Email Template
The confirmation email includes:
- Welcome message with user's name and company
- List of exclusive perks (Early Access, Discounts, Priority Support)
- What happens next (4 steps)
- CTA button to try the prototype
- Beautiful branded design matching your site

## Sheet Structure
Each submission creates a row with:
- Timestamp (ISO format)
- Name
- Email
- Company Name
- Mobile Number

You can easily export this to CSV or connect to other tools for further processing.
