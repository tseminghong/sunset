/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import { LucideIcon } from "lucide-react";

export interface Resource {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  accent: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  RESOURCES = 'resources',
  ABOUT = 'about',
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  day: string;
  genre: string;
}
