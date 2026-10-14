# Privacy Statement

**Last updated:** 10 October 2026

This statement explains what personal data **Noodle Technology, LLC** ("**Noodle LLM**", "**we**", "**us**") collects when you use the Noodle LLM app (the "**App**"), the website at noodlellm.com (the "**Website**"), and our subscription service, and what we do with it. We are the controller of this data.

Contact: Noodle Technology, LLC, at [info@noodletechnology.com](mailto:info@noodletechnology.com).

## The short version

- **What you type stays on your computer.** The App runs AI models on your own machine. Your questions, conversations, documents, folders and the answers the App writes are never sent to us or anyone else. We cannot see them.
- **The App goes online for three things only:** to fetch the list of models, to download the models you choose, and to manage your subscription.
- **We keep only what a subscription needs:** your email address, the name you give at checkout, your subscription details, and the computers your licence is on.
- **Stripe handles payments.** We never see your full card number.
- **No advertising or tracking.** The Website sets no cookies and uses no analytics, and we never sell your data.

## 1. What stays on your computer

The following is stored and processed only on your computer, and never reaches us:

- your prompts, conversations and chat history;
- the files and folders you ask the App about, and the index it builds of them;
- the answers models generate;
- your settings, your downloaded models, and your trial dates.

**Phone remote.** If you switch on the phone remote in the App's settings, the phones you pair can read and add to your conversations. They talk to your computer directly over your own network, every message is encrypted with a key only your computer and that phone hold, and nothing passes through us. It is off until you turn it on, and you can remove a phone at any time.

If you choose to send us some of it, for example by pasting a conversation into a support email, we use it only to help you.

## 2. What we collect, and why

**Using the App without subscribing.** The trial needs no account. While you use it, the App only fetches the catalogue and downloads models (see section 3). Apart from the IP address that every web request carries, no personal data reaches us.

**Subscribing.** When you subscribe, Stripe collects your email address, your payment details and your billing country and postcode, plus the name you type at checkout ("Your name", or "Firm or practice name" on a Practice plan). Stripe passes us your email, that name, and the details of your subscription. We store:

- your email address and an account ID;
- the name you gave at checkout, which the App shows as "Licensed to ...";
- your Stripe customer and subscription IDs, plan, price, billing interval, status and renewal date, and your number if you are one of the first 100 Founding members.

We use this to provide your subscription and licence (legal basis: performance of our contract with you), and to keep the accounting and tax records the law requires (legal obligation).

**Licences and computers.** Each subscription works on a limited number of computers. To enforce this, when the App activates or refreshes your licence it sends our server your licence key, a random ID the App creates when it is installed, and your computer's name, so you can tell your computers apart when signing one out. The random ID is not a hardware fingerprint, and it is not linked to anything else on your computer. We record when each computer was first and last seen. A computer not seen for 60 days stops counting towards your limit. We use this to provide the licence and to stop licences being shared (performance of contract, and our legitimate interest in preventing misuse).

**Signing in on another computer.** If you choose "Already subscribed?", we email a 6-digit code to your subscription email address. The code expires after 10 minutes and works only once. Supabase generates the code, and Resend delivers the email (performance of contract).

**Refunds and disputes.** If a payment is refunded or disputed, we add that subscription's ID to a list of revoked subscriptions. The App downloads this list when it is online, so that a revoked licence stops working (performance of contract, and our legitimate interest in preventing fraud). The list contains only subscription IDs.

**Buying a model.** When you buy a model from an independent creator, Stripe collects the same details as for a subscription. We store your email address, the name you gave at checkout, which model you bought, the price, and a licence key for it (performance of contract, and legal obligation for tax records). We do not give the creator your name or email: they see only that a sale happened, the date and the amount.

**Creators.** If you list a model through our creator portal, we store your email address, the public profile you write (display name, handle and bio, which anyone can see), and the private details you give us so we can pay you: your legal name, country, contact email, how you want to be paid, the email address of your PayPal, Payoneer or Wise account if you choose one, and which tax form applies to you. If you are paid through Stripe, Stripe collects your identity, bank and tax details directly and tells us only whether your account can receive payouts. We also store the model files you upload, your listings, our review decisions and your sales (performance of contract, and legal obligation for tax and payout records). The portal keeps you signed in by storing a sign-in token in your browser's local storage.

**Support.** If you email us, we keep your message and our reply so we can help you (legitimate interest).

**Server logs.** When the App or your browser contacts our servers or our providers' servers, those servers log your IP address and the time of the request, as almost every web server does. These logs are used for security and to fix problems (legitimate interest).

We do not use your data for advertising, we do not sell or "share" it as California law defines that word, and we do not make decisions about you that are based solely on automated processing and have legal or similarly significant effects.

## 3. What the App sends, and where

- **Model catalogue**, from Cloudflare R2 storage. The request carries nothing about you except what any web request carries (IP address and software version).
- **Model downloads**, from Hugging Face, which hosts the model files. Hugging Face receives your IP address and the file you requested, and acts as an independent controller under [its own privacy policy](https://huggingface.co/privacy).
- **Subscription and licence requests**, to our backend on Supabase, carrying the data described in section 2.
- **Subscribing and managing billing**, which happens in your web browser on Stripe's pages.

Internet research, if it is ever added to the App, will be off unless you turn it on, because a search query contains your words.

## 4. The Website

The Website is a static site hosted on GitHub Pages. It sets no cookies and uses no analytics or advertising tags. If you pick a language, your choice is saved in your browser's local storage so the Website remembers it; it is never sent to us. GitHub, as the host, receives your IP address and the pages you request (see [GitHub's privacy statement](https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement)). App installers are downloaded from GitHub too. Stripe's checkout and billing pages set their own cookies, which are needed for payments and fraud prevention.

## 5. Who we share data with

We share personal data only with these service providers. They process it on our behalf and under contract:

- **Stripe** (payments, subscriptions, invoices, customer portal). Stripe is also an independent controller for its own fraud prevention and legal duties ([Stripe privacy policy](https://stripe.com/privacy)).
- **Supabase** (our database and sign-in codes), with data stored in the western United States (Oregon).
- **Resend** (delivers sign-in code emails; it sees the email address and the code).
- **PayPal, Payoneer or Wise**, if a creator chooses to be paid that way: we give them the creator's payout email and the amount.
- **GitHub** (hosts the Website and the installer downloads).
- **Cloudflare** (hosts the model catalogue, stores the model files creators upload, and routes support emails sent to `info@noodletechnology.com`).

We may also disclose data to professional advisers, when the law requires it, to protect our rights or the safety of others, or to a buyer if our business is sold, in which case we will tell you.

## 6. International transfers

Some of these providers process data in the United States or other countries outside the UK and the EEA. Where they do, we rely on adequacy decisions, such as the EU-US Data Privacy Framework and its UK Extension, or on Standard Contractual Clauses (with the UK Addendum). You can ask us for a copy of the safeguards.

## 7. How long we keep it

- **Subscription records and the name given at checkout:** while your subscription is active, then 6 years for tax and accounting.
- **Creator profiles and payout details:** while you have a creator account, then 6 years for tax and accounting. If you ask us to delete a listing, we delete its files, except files people have already bought, which we keep so they can download them again.
- **Computer records:** while your subscription is active, then 12 months.
- **Sign-in codes:** 10 minutes, or until used.
- **Support emails:** 2 years after the conversation ends.
- **Server logs:** as long as each provider keeps them, typically no more than 90 days.

## 8. Security

Connections are encrypted. Our database restricts each record to its owner, and licence keys are signed with a private key held only on our server. Because your conversations and documents never leave your computer, keeping them safe depends on keeping that computer secure.

## 9. Your rights

Depending on where you live, you can ask to access, correct, delete or receive a copy of your personal data, to restrict or object to how we use it, and to withdraw any consent you have given. Email [info@noodletechnology.com](mailto:info@noodletechnology.com) from your subscription email address. We will reply within one month, or sooner if your local law requires it.

You can also complain to a data protection authority. In the UK, that is the Information Commissioner's Office ([ico.org.uk](https://ico.org.uk)). In the EU, it is the authority in the country where you live. Residents of California and other US states with privacy laws have the rights to know, correct and delete, and we will not treat you differently for using them.

## 10. Children

The Service is not for children under 16, and we do not knowingly collect their data.

## 11. Changes

If we change this statement, we will update the date at the top. If the change is significant, we will also tell subscribers by email or in the App.
