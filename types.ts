import React from 'react';

export type ViewState = 'INTRO' | 'ENVELOPE' | 'OPENING' | 'DASHBOARD';

export interface SectionContent {
  id: string;
  title: string;
  type: 'info' | 'timeline' | 'gallery' | 'rsvp' | 'faq' | 'attire' | 'minigames';
}

export interface TimelineItem {
  time: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface FaqItem {
  question: string;
  answer: string;
}