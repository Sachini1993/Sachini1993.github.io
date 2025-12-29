# Contact Form Email Setup Guide

## ✅ What I've Set Up

Your contact form is now configured to send emails to **vibodhasachini0@gmail.com** using Formspree (a free email service for contact forms).

## 🚀 How to Activate Email Functionality

### Option 1: Formspree (RECOMMENDED - Already Configured)

I've already added Formspree to your contact form. You just need to verify your email address:

#### Steps:
1. **Upload your portfolio** to any web hosting (GitHub Pages, Netlify, etc.)
2. **Fill out the contact form** on your live website (submit a test message)
3. **Check your email** (vibodhasachini0@gmail.com) - You'll receive a verification email from Formspree
4. **Click the verification link** in the email
5. **Done!** All future form submissions will be sent to your Gmail

#### What Happens:
- When someone fills out your contact form, you'll receive an email at vibodhasachini0@gmail.com
- The email will contain:
  - Name
  - Email address
  - Phone number
  - Subject
  - Message

#### Formspree Features (Free Plan):
- ✅ 50 submissions per month (free)
- ✅ Email notifications
- ✅ Spam filtering
- ✅ No coding required
- ✅ Works instantly after verification

---

### Option 2: EmailJS (Alternative - More Customization)

If you want more control over email templates:

#### Setup Steps:

1. **Sign up at EmailJS:**
   - Go to https://www.emailjs.com/
   - Create a free account
   - Free plan: 200 emails/month

2. **Add Email Service:**
   - Go to Email Services
   - Click "Add New Service"
   - Select "Gmail"
   - Click "Connect Account" and authorize your Gmail (vibodhasachini0@gmail.com)

3. **Create Email Template:**
   - Go to Email Templates
   - Click "Create New Template"
   - Use this template:
   ```
   New Contact Form Submission

   From: {{name}}
   Email: {{email}}
   Phone: {{phone}}
   Subject: {{subject}}

   Message:
   {{message}}
   ```

4. **Get Your Credentials:**
   - Note your Service ID
   - Note your Template ID
   - Note your Public Key (from Account page)

5. **Update the HTML Form:**
   Replace the form action in index.html:
   ```html
   <form action="#" class="contact_form" id="contactForm">
   ```

6. **Update script.js:**
   Add EmailJS library before closing </body> tag in index.html:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   <script>
       (function(){
           emailjs.init("YOUR_PUBLIC_KEY");
       })();
   </script>
   ```

   Then update the form submission code in script.js:
   ```javascript
   if (contactForm) {
       contactForm.addEventListener('submit', async function(e) {
           e.preventDefault();
           
           const submitButton = contactForm.querySelector('.btn-submit');
           submitButton.disabled = true;
           submitButton.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
           
           try {
               await emailjs.sendForm(
                   'YOUR_SERVICE_ID',
                   'YOUR_TEMPLATE_ID',
                   contactForm
               );
               
               showNotification('Message sent successfully!', 'success');
               contactForm.reset();
           } catch (error) {
               showNotification('Failed to send message. Please try again.', 'error');
           } finally {
               submitButton.disabled = false;
               submitButton.innerHTML = '<i class="bx bx-send"></i> Send Message';
           }
       });
   }
   ```

---

### Option 3: Netlify Forms (If Hosting on Netlify)

If you deploy to Netlify:

1. **Update the form tag in index.html:**
   ```html
   <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" class="contact_form" id="contactForm">
       <input type="hidden" name="form-name" value="contact">
       <!-- rest of form fields -->
   </form>
   ```

2. **Configure Email Notifications:**
   - Go to Netlify Dashboard
   - Site Settings → Forms → Form notifications
   - Add email notification to vibodhasachini0@gmail.com

---

## 🎯 My Recommendation: Use Formspree (Already Set Up!)

**Why Formspree is the best choice for you:**

✅ **Already configured** - No additional setup needed
✅ **Simple verification** - Just one click
✅ **Free** - 50 submissions/month is plenty for a portfolio
✅ **Spam protection** - Built-in spam filtering
✅ **No maintenance** - Just works
✅ **Professional** - Used by thousands of developers

**Just follow these 3 steps:**
1. Upload your website
2. Submit a test form
3. Click the verification link in your email

That's it! 🎉

---

## 📧 Testing the Contact Form

### Before Going Live:
1. Use a local server (not just opening HTML file)
2. Fill out all fields
3. Check console for errors

### After Going Live:
1. Fill out the form with your own details
2. Check your email (vibodhasachini0@gmail.com)
3. Click the Formspree verification link
4. Test again to confirm emails are arriving

---

## 🔧 Troubleshooting

### "Emails not arriving"
- ✅ Check spam folder
- ✅ Verify you clicked the Formspree verification link
- ✅ Make sure website is live (not localhost)
- ✅ Check Formspree dashboard for submissions

### "Form not submitting"
- ✅ Check browser console for errors
- ✅ Make sure all required fields are filled
- ✅ Verify internet connection

### "Verification email not received"
- ✅ Check spam/junk folder
- ✅ Wait 5-10 minutes (sometimes delayed)
- ✅ Submit the form again

---

## 📱 What Emails Look Like

When someone submits your contact form, you'll receive:

```
Subject: New submission from [Your Website]

Name: John Doe
Email: john@example.com
Phone: +123456789
Subject: Job Opportunity

Message:
Hi Sachini, I came across your portfolio and I'm impressed 
with your experience. We have a QA Engineer position...
```

---

## 💡 Pro Tips

1. **Set up email filters** in Gmail to organize portfolio inquiries
2. **Create an auto-response template** for quick replies
3. **Check spam folder regularly** in the first few days
4. **Monitor Formspree dashboard** to see submission stats
5. **Upgrade to paid plan** if you get more than 50 inquiries/month (good problem!)

---

## 📊 Current Setup Summary

- **Service:** Formspree
- **Email:** vibodhasachini0@gmail.com
- **Form Endpoint:** Already configured in HTML
- **Monthly Limit:** 50 submissions (free)
- **Spam Protection:** ✅ Enabled
- **Status:** Ready to activate (needs verification)

---

## 🎉 You're All Set!

Your contact form will work perfectly once you:
1. Deploy your website
2. Submit one test message
3. Click the verification link

Need help? Let me know! 😊
