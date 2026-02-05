# Buyers Club Welcome Automation

## Contact Settings
- **Tag**: `buyers-club`
- **Source**: Website form submission

## Welcome Email

**Subject**: Welcome to the Buyers Club - Book Your Intro Call

**Body**:
```
Hey {{contact.first_name}},

Welcome to the Buyers Club! You're now on the inside track for off-market Section 8 deals in Detroit.

Here's what happens next:

📞 **Book Your Intro Call**
To get access to our deal flow, we need to hop on a quick 15-minute call. I'll learn about your investment goals and make sure we're sending you the right opportunities.

👉 **Book your call here**: [CALENDAR_LINK]

💬 **Questions?**
You can text me directly at (734) 205-1701 or just reply to this email.

Talk soon,
Luke Fontaine
The Buyers Club
```

## Welcome SMS

```
Hey {{contact.first_name}}! Welcome to the Buyers Club. To get access to our Section 8 deals, book a quick 15-min intro call: [CALENDAR_LINK] - or just text me back here. - Luke
```

## Workflow Trigger
- **Trigger**: Contact tag added = "buyers-club"
- **Actions**:
  1. Send Welcome Email (immediately)
  2. Wait 2 minutes
  3. Send Welcome SMS

## Calendar
- **Name**: Buyers Club Intro Call
- **Duration**: 15 minutes
- **Assigned to**: Luke Fontaine

## GHL Phone
- (734) 205-1701
