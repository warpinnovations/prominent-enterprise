import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, mobile } = await request.json();

    // Validate input
    if (!name || !email || !company || !mobile) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn('⚠️  RESEND_API_KEY is not configured! Email will not be sent.');
    }

    // Set up Google Sheets authentication
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Add entry to Google Sheets
    const timestamp = new Date().toISOString();
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:E', // Adjust sheet name if needed
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[timestamp, name, email, company, mobile]],
      },
    });

    // Send confirmation email
    try {
      const emailResult = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: email,
        subject: '🎉 Welcome to The Prominent Waitlist!',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0118; color: #ffffff;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 40px 20px;">
                    <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, rgba(152, 56, 217, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%); border-radius: 24px; border: 1px solid rgba(255, 255, 255, 0.1); overflow: hidden;">
                      <!-- Header -->
                      <tr>
                        <td style="padding: 40px 40px 20px; text-align: center;">
                          <h1 style="margin: 0; font-size: 32px; font-weight: bold; background: linear-gradient(135deg, #9838d9 0%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                            Welcome to The Prominent!
                          </h1>
                        </td>
                      </tr>
                      
                      <!-- Content -->
                      <tr>
                        <td style="padding: 20px 40px;">
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: rgba(255, 255, 255, 0.8);">
                            Hi <strong style="color: #ffffff;">${name}</strong> from <strong style="color: #ffffff;">${company}</strong>,
                          </p>
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: rgba(255, 255, 255, 0.8);">
                            Thank you for joining our waitlist! 🎉 You're now on the list for exclusive early access to The Prominent.
                          </p>
                        </td>
                      </tr>
                      
                      <!-- Benefits -->
                      <tr>
                        <td style="padding: 20px 40px;">
                          <table role="presentation" style="width: 100%; border-collapse: collapse; background: rgba(255, 255, 255, 0.03); border-radius: 16px; padding: 20px;">
                            <tr>
                              <td style="padding: 12px 0;">
                                <div style="display: flex; align-items: center;">
                                  <span style="color: #fbbf24; font-size: 24px; margin-right: 12px;">👑</span>
                                  <div>
                                    <strong style="color: #ffffff; display: block; margin-bottom: 4px;">Early Access</strong>
                                    <span style="color: rgba(255, 255, 255, 0.6); font-size: 14px;">Be the first to experience The Prominent</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 12px 0;">
                                <div style="display: flex; align-items: center;">
                                  <span style="color: #9838d9; font-size: 24px; margin-right: 12px;">🎁</span>
                                  <div>
                                    <strong style="color: #ffffff; display: block; margin-bottom: 4px;">Exclusive Discounts</strong>
                                    <span style="color: rgba(255, 255, 255, 0.6); font-size: 14px;">Waived Installation Fee</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 12px 0;">
                                <div style="display: flex; align-items: center;">
                                  <span style="color: #3b82f6; font-size: 24px; margin-right: 12px;">⚡</span>
                                  <div>
                                    <strong style="color: #ffffff; display: block; margin-bottom: 4px;">Priority Support</strong>
                                    <span style="color: rgba(255, 255, 255, 0.6); font-size: 14px;">Dedicated onboarding assistance</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Next Steps -->
                      <tr>
                        <td style="padding: 20px 40px;">
                          <h3 style="margin: 0 0 16px; font-size: 18px; color: #ffffff;">What happens next?</h3>
                          <ol style="margin: 0; padding-left: 20px; color: rgba(255, 255, 255, 0.8); font-size: 14px; line-height: 1.8;">
                            <li style="margin-bottom: 8px;">Keep an eye on your inbox for updates</li>
                            <li style="margin-bottom: 8px;">We'll notify you as soon as we launch</li>
                            <li style="margin-bottom: 8px;">You'll receive exclusive early-bird pricing</li>
                            <li style="margin-bottom: 8px;">Our team will reach out for personalized onboarding</li>
                          </ol>
                        </td>
                      </tr>
                      
                      <!-- CTA Button -->
                      <tr>
                        <td style="padding: 20px 40px;">
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td style="text-align: center; padding: 20px 0;">
                                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://theprominent.ph'}/payroll" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #9838d9 0%, #7c3aed 100%); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px;">
                                  Try out The Prominent
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                        <td style="padding: 20px 40px 40px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                          <p style="margin: 0; font-size: 12px; color: rgba(255, 255, 255, 0.5);">
                            You're receiving this email because you signed up for The Prominent waitlist.
                          </p>
                          <p style="margin: 8px 0 0; font-size: 12px; color: rgba(255, 255, 255, 0.5);">
                            © 2026 The Prominent. All rights reserved.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
      });
      
    } catch (emailError) {
      console.error('Email send error:', emailError);
      // Continue even if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully added to waitlist!',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
