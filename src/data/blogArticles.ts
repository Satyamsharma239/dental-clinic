export interface BlogArticle {
  slug: string;
  category: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  introduction: string;
  sections: { heading: string; body: string }[];
  keyPoints: string[];
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'first-dental-visit',
    category: 'Your first visit',
    title: 'What to expect at a dental consultation',
    summary: 'A first visit is a chance to discuss your concerns, understand your options, and make a plan together.',
    image: '/images/dental-tools.webp',
    imageAlt: 'Dental instruments arranged in a clean treatment room',
    introduction: 'A useful consultation starts with your concerns. Sharing what has been bothering you, your relevant health history, and what you hope to achieve helps your dentist make the conversation more useful.',
    sections: [
      { heading: 'Start with your questions', body: 'It is fine to bring notes or ask the clinician to explain something again. Tell the team if you feel anxious or need extra time to feel comfortable.' },
      { heading: 'Understand the findings', body: 'Your dentist will examine your oral health and explain any findings in plain language. If treatment is suggested, ask what the options are and why one may be appropriate for you.' },
      { heading: 'Decide on next steps', body: 'Discuss the expected sequence, aftercare, and costs before making a decision. You should leave with a clearer understanding of your choices, not pressure to begin care before you are ready.' },
    ],
    keyPoints: ['Share your dental and medical history', 'Ask about options, costs, and aftercare', 'Take time to decide what feels right'],
  },
  {
    slug: 'clear-aligner-questions',
    category: 'Orthodontics',
    title: 'Considering clear aligners? Questions worth asking',
    summary: 'Suitability, follow-up, daily wear, and retention all matter in an aligner conversation.',
    image: '/images/aligners.webp',
    imageAlt: 'Clear dental aligners displayed for a consultation',
    introduction: 'Clear aligners are one way to move teeth, but they are not right for every bite or treatment goal. An orthodontic assessment can help you understand the options for your own situation.',
    sections: [
      { heading: 'Ask about suitability', body: 'Ask your orthodontist to explain the findings, the goals of treatment, and whether aligners or another approach may be considered.' },
      { heading: 'Know the routine', body: 'Before starting, talk through daily wear, cleaning, what to do if a tray feels uncomfortable or does not fit, and how often progress will be reviewed.' },
      { heading: 'Plan beyond the last tray', body: 'Teeth can shift after active treatment. Ask about retainers and follow-up so you know how your result will be monitored over time.' },
    ],
    keyPoints: ['Confirm suitability after an assessment', 'Understand wear and review expectations', 'Discuss retainers before treatment begins'],
  },
  {
    slug: 'calmer-dental-visits',
    category: 'Comfort & care',
    title: 'How to make a dental visit feel more manageable',
    summary: 'A few small steps can help you feel more informed and in control during an appointment.',
    image: '/images/hero-patient.webp',
    imageAlt: 'Dentist discussing care with a patient',
    introduction: 'If dental visits make you nervous, you are not alone. Letting the clinic know in advance gives the team a chance to understand what would help you feel more at ease.',
    sections: [
      { heading: 'Agree on communication', body: 'Ask the clinician to explain each step before it begins. You can also agree on a signal to pause so you know how to get the team’s attention.' },
      { heading: 'Ask about comfort', body: 'Share what has or has not helped during previous visits, and ask what comfort options may be appropriate for the planned care.' },
      { heading: 'Take the time you need', body: 'You can ask questions, request a short break, or take time to consider a treatment plan. Care should be a conversation.' },
    ],
    keyPoints: ['Mention anxiety when booking', 'Agree on a simple pause signal', 'Ask questions and request breaks when needed'],
  },
  {
    slug: 'everyday-brushing',
    category: 'Everyday oral health',
    title: 'A practical guide to your daily brushing routine',
    summary: 'Build a consistent brushing habit and ask your dental team what technique suits your needs.',
    image: '/images/dental-tools.webp',
    imageAlt: 'Dental care tools used to support an oral hygiene routine',
    introduction: 'A steady home-care routine is an important part of looking after your teeth and gums. Your dentist or hygienist can tailor advice to your mouth, dexterity, and any dental work you have.',
    sections: [
      { heading: 'Focus on consistency', body: 'Brush regularly and give attention to all tooth surfaces and the gumline. Use a technique and brush type that your dental professional recommends for you.' },
      { heading: 'Do not overlook the spaces between teeth', body: 'Ask whether floss, interdental brushes, or another tool is best for the spaces between your teeth. The right size and technique can vary.' },
      { heading: 'Get personalised advice', body: 'If brushing causes discomfort or bleeding, mention it at your next appointment rather than changing your routine based on guesswork.' },
    ],
    keyPoints: ['Make oral care a consistent daily habit', 'Ask how to clean between your teeth', 'Seek personalised advice if you notice changes'],
  },
  {
    slug: 'bleeding-gums',
    category: 'Gum health',
    title: 'Bleeding gums: what to discuss with your dentist',
    summary: 'Bleeding can have different causes; a dental professional can assess what is happening.',
    image: '/images/smiling-patient.webp',
    imageAlt: 'Patient smiling during a dental visit',
    introduction: 'Noticing blood when brushing or cleaning between teeth can be concerning. It is worth discussing persistent or recurring bleeding with a dental professional, who can assess your gums and offer advice for your situation.',
    sections: [
      { heading: 'Notice when it happens', body: 'Make a note of how often you see bleeding, whether a particular area is affected, and whether you have noticed other changes. This context can help your clinician.' },
      { heading: 'Keep up gentle cleaning', body: 'Avoid aggressive brushing. Ask your dental team to demonstrate a suitable brushing and interdental-cleaning technique rather than stopping oral hygiene altogether.' },
      { heading: 'Arrange an assessment', body: 'A dental examination can help identify possible causes and whether any care or follow-up is appropriate. Seek prompt advice if symptoms are severe or worsening.' },
    ],
    keyPoints: ['Track recurring symptoms and where they occur', 'Ask for a demonstration of your cleaning technique', 'Arrange a dental assessment for persistent bleeding'],
  },
  {
    slug: 'child-first-dental-visit',
    category: 'Family dentistry',
    title: 'Helping a child feel ready for a first dental visit',
    summary: 'A calm, age-appropriate introduction can make the appointment feel more familiar.',
    image: '/images/consultation.webp',
    imageAlt: 'A welcoming dental consultation space',
    introduction: 'A child’s first dental visit is an opportunity to get comfortable with the clinic and talk about looking after their teeth. A positive, unhurried introduction can help make the experience more familiar.',
    sections: [
      { heading: 'Talk about the visit simply', body: 'Use calm, clear words to explain that the dentist will count or look at their teeth. Avoid promising that nothing will happen; instead, explain that the team will tell them what to expect.' },
      { heading: 'Bring useful context', body: 'Let the clinic know about your child’s health history, sensory needs, or concerns before the appointment. Familiar comfort items may also help, if the clinic allows them.' },
      { heading: 'Make room for questions', body: 'Give your child time to ask questions and praise their effort. The dental team can guide you on age-appropriate home care and follow-up.' },
    ],
    keyPoints: ['Explain the visit in simple, reassuring language', 'Share health and comfort needs ahead of time', 'Ask for guidance on age-appropriate home care'],
  },
  {
    slug: 'dental-emergency',
    category: 'When to seek care',
    title: 'A tooth problem feels urgent: what information to share',
    summary: 'Clear details about symptoms and timing help the clinic understand your concern.',
    image: '/images/hero-patient.webp',
    imageAlt: 'Patient speaking with a dental professional',
    introduction: 'A sudden tooth problem can be stressful. When contacting a dental clinic, a few clear details can help the team understand your concern and advise on an appropriate next step.',
    sections: [
      { heading: 'Describe what changed', body: 'Explain when the problem began, where you feel it, and whether it is getting better, worse, or staying the same. Mention any injury or recent dental treatment.' },
      { heading: 'Share other symptoms', body: 'Tell the clinic if you have swelling, fever, difficulty swallowing, or feel unwell. Severe or rapidly worsening symptoms may need urgent medical attention.' },
      { heading: 'Follow professional guidance', body: 'Avoid trying unverified treatments or placing medication directly on a tooth or gum. Contact a dental professional for advice tailored to your symptoms.' },
    ],
    keyPoints: ['Note when symptoms began and what changed', 'Mention swelling, fever, or feeling unwell', 'Seek urgent help for severe or rapidly worsening symptoms'],
  },
  {
    slug: 'after-dental-treatment',
    category: 'Aftercare',
    title: 'After dental treatment: making sense of your aftercare',
    summary: 'Know whom to contact, what guidance to follow, and when to ask for help.',
    image: '/images/dental-tools.webp',
    imageAlt: 'Dental instruments in a treatment setting',
    introduction: 'Aftercare depends on the procedure and your individual health. Before leaving, make sure you understand the instructions your clinician gives you and how to get in touch if you have a concern.',
    sections: [
      { heading: 'Confirm your instructions', body: 'Ask what to expect as you recover, whether there are activities or foods to avoid, and how to care for the treated area. Follow the advice given for your specific procedure.' },
      { heading: 'Know what to do if something changes', body: 'Ask which symptoms should prompt a call to the clinic and how to reach the team outside your appointment. Do not rely on general online advice for procedure-specific care.' },
      { heading: 'Keep your follow-up', body: 'If a review appointment is recommended, attend it or contact the clinic to reschedule. Follow-up helps your clinician check healing and answer further questions.' },
    ],
    keyPoints: ['Keep the written aftercare instructions handy', 'Ask how to contact the clinic with concerns', 'Attend recommended follow-up appointments'],
  },
  {
    slug: 'dental-crown-basics',
    category: 'Restorative dentistry',
    title: 'Dental crowns: useful questions before treatment',
    summary: 'Understand why a crown is suggested, what alternatives exist, and what maintenance involves.',
    image: '/images/aligners.webp',
    imageAlt: 'Dental model used to explain restorative treatment options',
    introduction: 'A dental crown is one restorative option a dentist may discuss. The recommendation depends on an examination and the condition of the tooth, so it is useful to understand the reasoning and alternatives for your case.',
    sections: [
      { heading: 'Ask why it is being recommended', body: 'Ask your dentist to explain the tooth’s condition, the goal of a crown, and whether other options may be suitable. You can request that the findings be shown or explained in plain language.' },
      { heading: 'Understand the process', body: 'Discuss the expected appointments, materials that may be considered, and what to expect during recovery. Details vary according to the tooth and treatment plan.' },
      { heading: 'Talk about care and follow-up', body: 'Ask how to care for the restored tooth, what signs should prompt a call, and whether any follow-up is recommended.' },
    ],
    keyPoints: ['Understand the reason for the recommendation', 'Discuss alternatives and treatment steps', 'Ask about maintenance and follow-up'],
  },
];
