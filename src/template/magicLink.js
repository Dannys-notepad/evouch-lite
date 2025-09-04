exports.magicLinkTemp = (name, magicLink) => {
    return `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Magic Login Link | Evouch Lite</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc;">
  
  <!-- Outer wrapper table for background -->
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8fafc; padding: 20px 0;">
    <tr>
      <td align="center">
        
        <!-- Main container -->
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0; overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #6366f1; background-image: linear-gradient(135deg, #6366f1 0%, #1e40af 100%); padding: 40px 30px 30px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0 0 10px 0; font-size: 28px; font-weight: 700; color: #ffffff;">Evouch Lite</h1>
              <p style="margin: 0; font-size: 18px; font-weight: 500; color: #ffffff;">🔐 Secure Login Request</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px; color: #1e293b;">
              
              <!-- Greeting -->
              <p style="margin: 0 0 25px 0; font-size: 18px; font-weight: 500; color: #1e293b;">
                Hello <span style="color: #6366f1; font-weight: 600;">${name}</span>,
              </p>
              
              <!-- Main message -->
              <p style="margin: 0 0 25px 0; font-size: 16px; line-height: 1.7; color: #475569;">
                You requested to sign in to your <strong style="color: #6366f1;">Evouch Lite</strong> account. We've generated a secure magic link just for you.
              </p>
              
              <!-- Button container -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background-color: #6366f1; border-radius: 8px; padding: 0;">
                          <a href="${magicLink}" style="display: inline-block; padding: 16px 32px; background-color: #6366f1; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; border: none;">
                            🚀 Sign In Securely
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Security notice -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 30px 0; background-color: #f0fdf4; border: 1px solid #10b981; border-radius: 8px;">
                <tr>
                  <td style="padding: 20px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="30" style="vertical-align: top; padding-right: 12px;">
                          <span style="font-size: 20px;">🛡️</span>
                        </td>
                        <td>
                          <p style="margin: 0; color: #059669; font-weight: 500; font-size: 14px;">
                            This link is encrypted and can only be used once for your security.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Expiry warning -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 30px 0; background-color: #fffbeb; border: 1px solid #f59e0b; border-radius: 8px;">
                <tr>
                  <td style="padding: 20px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="30" style="vertical-align: top; padding-right: 12px;">
                          <span style="font-size: 20px;">⏰</span>
                        </td>
                        <td>
                          <p style="margin: 0; color: #d97706; font-weight: 500; font-size: 14px;">
                            <strong>Important:</strong> This magic link will expire in 5 minutes for your security.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Additional info -->
              <p style="margin: 0 0 25px 0; font-size: 16px; line-height: 1.7; color: #475569;">
                If you didn't request this login, please ignore this email. Your account remains secure.
              </p>
              
              <!-- Fallback link -->
              <p style="margin: 0 0 25px 0; font-size: 14px; line-height: 1.6; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 20px;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${magicLink}" style="color: #6366f1; word-break: break-all;">${magicLink}</a>
              </p>
              
              <!-- Signature -->
              <div style="margin-top: 30px; padding-top: 25px; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0; color: #475569; font-style: italic; font-size: 16px;">
                  Stay secure and productive,<br>
                  <strong style="color: #1e293b;">The Evouch Lite Team</strong>
                </p>
              </div>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px; text-align: center; font-size: 14px; color: #64748b; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 10px 0;">
                © ${new Date().getFullYear()} <strong style="color: #1e293b;">Evouch Lite</strong>. All rights reserved.
              </p>
              <p style="margin: 0; color: #64748b;">
                Need assistance? Our support team is here to help.
              </p>
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
  
</body>
</html>
    `
}